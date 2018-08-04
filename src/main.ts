class KeyBinds {
  private static instance: KeyBinds;

  private down: {
    [key: string]: boolean;
  } = {};

  private records: Array<{
    down: Array<number>;
    press: number;
    handle: Function;
  }> = [];

  constructor() {
    this.setupListener();
  }

  public static main(down: Array<number>, press: number, handle: Function) {
    if (!KeyBinds.instance) {
      KeyBinds.instance = new KeyBinds();
    }
    KeyBinds.instance.records.push({ down, press, handle });
    return () => KeyBinds.instance.destroy();
  }

  private setupListener() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  private destroy() {
    delete KeyBinds.instance;
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const key = event.which || event.keyCode;
    this.down[key] = true;
    this.checkRecords(event, key);
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    const key = event.which || event.keyCode;
    this.down[key] = false;
  };

  private checkRecords(event: KeyboardEvent, input: number) {
    const downKeys = Object.keys(this.down).filter(key => this.down[key]);

    // O^2, yes!
    for (let record of this.records) {
      let isDown = true;

      for (let key of record.down) {
        isDown = this.down[key];
      }

      if (
        isDown &&
        record.press === input &&
        downKeys.length === record.down.length + 1 // because the input is down, duh!
      ) {
        record.handle(event);
      }
    }
  }
}

export default KeyBinds.main;
