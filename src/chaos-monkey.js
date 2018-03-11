import Rx from "rxjs";

export const makeReplayStream = props => {
  const { actionLog, buttons } = props;

  const result = actionLog
    .split("\n")
    .filter(row => row && !row.includes(".js:"))
    .map(row => {
      const [indexAndAction, timestamp] = row.split("T");
      const [index, action] = indexAndAction.split("#");
      return {
        delay: timestamp,
        index,
        action
      };
    })
    .map(a => console.log(a) || a)
    .forEach(props => {
      const action = buttons[props.index].actions[props.action];
      if (!action) {
        // It's an actionStream without an action. It will happen by itself.
        return;
      }
      action();
    });
};

window.makeReplayStream = makeReplayStream;

export const makeChaosMonkey = props => {
  const { buttons } = props;

  const actions = [].concat(...buttons.map(b => Object.values(b.actions)));

  Rx.Observable.interval(2000).forEach(() => {
    const actionIndex = Math.floor(Math.random() * actions.length);
    actions[actionIndex]();
  });

  const actionStreams = [].concat(
    ...buttons.map((b, i) =>
      Object.entries(b.actionStreams).map(([key, val]) =>
        val.map(() => `${i}#${key}T${Date.now()}`)
      )
    )
  );

  Rx.Observable.merge(...actionStreams).forEach(data => console.log(data));
};
