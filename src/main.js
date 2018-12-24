let down = {};
let records = [];

let handleKeyDown = event => {
  let key = event.which || event.keyCode;
  down[key] = true;
  checkRecords(event, key);
};

let handleKeyUp = event => {
  let key = event.which || event.keyCode;
  down[key] = false;
};

let handleWindowBlur = () => {
  down = {};
};

let checkRecords = (event, input) => {
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

/**
 * @export
 */
let keybinds = (downKeys, pressKey, handle) => {
  records.push([downKeys, pressKey, handle]);
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  window.addEventListener("blur", handleWindowBlur);
  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);
    window.removeEventListener("blur", handleWindowBlur);
  };
};
