# Keybinds

#### What

Multi-key keybindings. Creates only two event listeners ever (keyup, keydown). Easily add Emacs-like (or other) keybindings to your JavaScript applications.

#### Why

I've made bad versions of this ~20 times. Time to put it on NPM.

#### How

`$ npm i -s keybinds`

and

```javascript
import { listen, unlisten } from "keybinds";

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
```
