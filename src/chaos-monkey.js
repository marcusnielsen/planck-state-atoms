import Rx from "rxjs";

const replayAllRec = (buttons, replays, prevTimestamp, index) => {
  const replay = replays[index];
  const { timestamp, componentIndex, actionName } = replay;
  const action = buttons[componentIndex].actions[actionName];

  // NOTE: Only replay actions. Some actionStreams are reactions and does/should not have an action.
  // All reactions will happen any way.
  setTimeout(() => {
    if (action) {
      action();
    }
    if (index < replays.length - 1) {
      replayAllRec(buttons, replays, timestamp, index + 1);
    }
  }, timestamp - prevTimestamp);
};

export const makeReplayStream = props => {
  const { actionsLog, buttons } = props;
  const replays = actionsLog
    .split("\n")
    .filter(row => row && !row.includes(".js:"))
    .map(row => {
      const [indexAndAction, timestamp] = row.split("T");
      const [componentIndex, actionName] = indexAndAction.split("#");
      return {
        timestamp,
        componentIndex,
        actionName
      };
    });

  replayAllRec(buttons, replays, replays[0].timestamp, 0);
};

window.makeReplayStream = makeReplayStream;

export const makeChaosMonkey = props => {
  const { buttons } = props;

  const actionStreams = [].concat(
    ...buttons.map((b, i) =>
      Object.entries(b.actionStreams).map(([key, val]) =>
        val.map(() => `${i}#${key}T${Date.now()}`)
      )
    )
  );

  const allActionsStream = Rx.Observable.merge(...actionStreams);

  allActionsStream.forEach(data => console.log(data));

  const actionsLog = localStorage.getItem("actionsLog");

  if (actionsLog) {
    makeReplayStream({ actionsLog: actionsLog.replace(/;/g, "\n"), buttons });
  } else {
    allActionsStream.forEach(data => {
      localStorage.setItem(
        "actionsLog",
        (localStorage.getItem("actionsLog") || "") + ";" + data
      );
    });
    // const actions = [].concat(...buttons.map(b => Object.values(b.actions)));

    // Rx.Observable.interval(2000).forEach(() => {
    //   const actionIndex = Math.floor(Math.random() * actions.length);
    //   actions[actionIndex]();
    // });
  }
};
