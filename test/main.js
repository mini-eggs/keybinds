import { listen, unlisten } from "../";

let unlistenA = listen([], 65, () => {
  console.log("a");
});

listen([17], 65, () => {
  console.log("ctrl+a");
  unlistenA();
});

listen([17, 18], 65, () => {
  console.log("ctrl+alt+a");
  unlisten();
});
