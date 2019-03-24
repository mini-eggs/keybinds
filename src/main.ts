type eventKey = number|string;
type map = {[index: number]: boolean, [index: string]: boolean};
type record = [Array<number>, number, Function];

let down: map = {};
let records: Array<record> = [];

let handleKeyDown = (event: KeyboardEvent) => {
  let key: eventKey = event.which || event.keyCode;
  down[key] = true;
  checkRecords(event, key);
};

let handleKeyUp = (event: KeyboardEvent) => {
  let key: eventKey = event.which || event.keyCode;
  down[key] = false;
};

let handleWindowBlur = () => {
  down = {};
};

let checkRecords = (event: KeyboardEvent, input: eventKey) => {
  let downKeys = Object.keys(down).filter(key => down[key]);

  // O^2, yes!
  for (let i in records) {
    let [currentDown, currentPress, currentHandle] = records[i];
    let isDown = true;

    for (let e in currentDown) {
      isDown = down[currentDown[e]];
    }

    if (
      isDown &&
      currentPress === input &&
      downKeys.length === currentDown.length + 1 // because the input is down, duh!
    ) {
      currentHandle(event);
    }
  }
};

let listen = (downKeys: Array<number>, pressKey: number, handle: Function) => {
  let key = records.length;
  records.push([downKeys, pressKey, handle]);
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  window.addEventListener("blur", handleWindowBlur);
  return () => records.splice(key, 1);
};

let unlisten = () => {
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("keyup", handleKeyUp);
  window.removeEventListener("blur", handleWindowBlur);
};

export {listen,unlisten};
