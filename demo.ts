import {
  logAccess,
  logInitialFieldValue,
  logInstanceCreation,
  timeFunction,
  timeMethod,
} from "./decorators";

//TODO: Show passing arguments to decorators.

// The @ syntax cannot be used to apply a decorator to a function.
export function add(n1: number, n2: number) {
  return n1 + n2;
}
// However, a decorator can be explicitly called to create a new function.
const timedAdd = timeFunction(add);
console.log("sum =", timedAdd(1, 2));

@logInstanceCreation
export class MyClass {
  @logInitialFieldValue
  sport = "football";

  // The "accessor" keyword create auto-accessors.
  // It is defined in the TC39 "Decorators" proposal
  // which is at stage 3 as of 12/23/2025.
  // See https://github.com/tc39/proposal-decorators#class-auto-accessors.
  //@logAccess
  //accessor count = 0;
  count = 0;

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
