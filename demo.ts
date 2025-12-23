import {
  logAccess,
  logInitialFieldValue,
  logInstanceCreation,
  timeMethod,
} from "./decorators";

//TODO: Show passing arguments to decorators.

@logInstanceCreation
export class MyClass {
  @logInitialFieldValue
  sport = "football";

  // The "accessor" keyword create auto-accessors.
  // It is defined in the TC39 "Decorators" proposal
  // which is at stage 3 as of 12/23/2025.
  // See https://github.com/tc39/proposal-decorators#class-auto-accessors.
  @logAccess
  accessor count = 0;

  @timeMethod
  increment() {
    this.count++;
    console.log("count =", this.count);
  }

  log() {
    console.log("MyClass.log: count =", this.count);
  }
}

const mc = new MyClass();
mc.increment();
mc.increment();
mc.log();
