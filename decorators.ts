export function timeFunction(fn: (...args: any[]) => any) {
  if (typeof fn !== "function") {
    throw new Error("This decorator can only be applied to a function.");
  }
  return function (...args: any[]) {
    console.time(fn.name);
    const result = fn.apply(this, args);
    console.timeEnd(fn.name);
    return result;
  };
}

// The generic type T captures the type of the class being decorated.
export function logInstanceCreation<T extends new (...args: any[]) => {}>(
  OriginalClass: T,
  { kind, name }: ClassDecoratorContext
) {
  if (kind !== "class") {
    throw new Error("This decorator can only be applied to a class.");
  }
  const nameString = String(name); // name is a Symbol
  return class extends OriginalClass {
    constructor(...args: any[]) {
      super(...args);
      const time = new Date().toLocaleTimeString();
      console.log(`${nameString} instance created at ${time}.`);
    }
  };
}

export function logInitialFieldValue(
  value: any,
  { kind, name }: ClassFieldDecoratorContext
) {
  if (kind !== "field") {
    throw new Error("This decorator can only be applied to a class field.");
  }
  const nameString = String(name); // name is a Symbol
  console.log(`The initial value of the ${nameString} property is "${value}".`);
}

export function logAccess(
  target: any,
  { kind, name }: ClassAccessorDecoratorContext
) {
  if (kind !== "accessor") {
    throw new Error(
      "This decorator can only be applied to " +
        'a property with the "accessor" keyword.'
    );
  }
  const nameString = String(name); // name is a Symbol
  return {
    get() {
      const value = target.get.call(this);
      console.log(`Getting ${nameString} property value ${value}.`);
      return value;
    },
    set(value: unknown) {
      console.log(`Setting ${nameString} property to ${value}.`);
      target.set.call(this, value);
    },
  };
}

export function timeMethod(
  originalMethod: (...args: any[]) => any,
  { kind, name }: ClassMethodDecoratorContext
) {
  if (kind !== "method") {
    throw new Error("This decorator can only be applied to a method.");
  }
  const nameString = String(name); // name is a Symbol

  return function (...args: any[]) {
    console.time(nameString);
    const result = originalMethod.call(this, ...args);
    console.timeEnd(nameString);
    return result;
  };
}
