import Rx from "rxjs";
import * as casual from "casual-browserify";

const flattenComponentTreeRec = (path, node) => {
  if (!node.children) {
    return { [path]: node };
  }

  return {
    [path]: node,
    ...Object.entries(node.children).reduce(
      (acc, [key, childNode]) => ({
        ...acc,
        ...flattenComponentTreeRec(`${path}_${key}`, childNode)
      }),
      {}
    )
  };
};

const replayAllRec = (flattenedComponents, replays, prevTimestamp, index) => {
  const replay = replays[index];
  const { timestamp, path, actionName, data } = replay;
  const action = flattenedComponents[path].actions[actionName];

  // NOTE: Only replay actions. Some actionStreams are reactions and does/should not have an action.
  // All reactions will happen any way.
  setTimeout(() => {
    if (action) {
      action(data);
    }
    if (index < replays.length - 1) {
      replayAllRec(flattenedComponents, replays, timestamp, index + 1);
    }
  }, timestamp - prevTimestamp);
};

export const makeReplayStream = props => {
  const { actionsLog, flattenedComponents } = props;
  const replays = actionsLog
    .split("\n")
    .filter(row => row && !row.includes(".js:"))
    .map(row => {
      const [indexAndAction, timestamp] = row.split("T");
      const [path, actionNameAndData] = indexAndAction.split("#");
      const [actionName, jsonData] = actionNameAndData.split(">");
      const data = jsonData ? JSON.parse(jsonData) : undefined;

      return {
        timestamp,
        path,
        actionName,
        data
      };
    });

  replayAllRec(flattenedComponents, replays, replays[0].timestamp, 0);
};

export const makeChaosMonkey = app => {
  const flattenedComponents = flattenComponentTreeRec("app", app);

  const actionStreams = [].concat(
    ...Object.entries(flattenedComponents).map(([path, component]) =>
      Object.entries(component.actionStreams).map(([key, val]) =>
        val.map(
          data => `${path}#${key}>${JSON.stringify(data || "")}T${Date.now()}`
        )
      )
    )
  );

  const allActionsStream = Rx.Observable.merge(...actionStreams);

  const actionsLog = localStorage.getItem("actionsLog");

  if (actionsLog) {
    makeReplayStream({
      actionsLog: actionsLog.replace(/;/g, "\n"),
      flattenedComponents
    });
  } else {
    allActionsStream.forEach(data => {
      console.log(data);
      localStorage.setItem(
        "actionsLog",
        (localStorage.getItem("actionsLog") || "") + ";" + data
      );
    });

    const toArgument = actionDefinition => {
      switch (actionDefinition.type) {
        case "undefined":
          return undefined;
        case "words":
          return casual.words(casual.integer(0, actionDefinition.max));
        case "integer":
          return casual.integer(actionDefinition.from, actionDefinition.to);
        case "error":
          return casual.sentence;
        default:
          throw new Error(
            `No such actionDefinition.type [${actionDefinition.type}].`
          );
      }
    };

    // NOTE: This is the chaos monkey
    const actionsAndArguments = [].concat(
      ...Object.values(flattenedComponents).map(c =>
        Object.entries(c.actions).map(
          ([key, action]) =>
            console.log("c", c) || {
              action,
              argument: toArgument(c.actionDefinitions[key])
            }
        )
      )
    );

    console.log(actionsAndArguments);

    Rx.Observable.interval(500).forEach(() => {
      const actionIndex = Math.floor(
        Math.random() * actionsAndArguments.length
      );

      actionsAndArguments[actionIndex].action(
        actionsAndArguments[actionIndex].argument
      );
    });
  }
};
