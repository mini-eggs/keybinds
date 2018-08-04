# Keybinds

#### Why

I've made bad versions of this ~20 times. Time to put it on NPM.

#### How

`$ npm i -s keybinds`

and

```javascript
import KeyBinds from "keybinds";

KeyBinds([], 65, () => {
  console.log("a");
});

KeyBinds([20], 65, () => {
  console.log("ctrl+a");
});

KeyBinds([20, 18], 65, () => {
  console.log("ctrl+alt+a");
});

let destroy;

destroy = KeyBinds([], 83, () => {
  console.log("s - destroy");
  destroy && destroy();
  destroy = undefined;

  setTimeout(() => {
    console.log("trying again!");
    KeyBinds([], 65, () => {
      console.log("a - and we're back!");
    });
  }, 1000);
});
```
