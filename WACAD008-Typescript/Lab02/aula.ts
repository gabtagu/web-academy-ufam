type stringOrNumber = string | number;

type stringorNumberArray = (string | number)[];

const addAll = (a: number, b: number, c?: number): number => {
  if (typeof c !== "undefined") {
    return a + b + c;
  }
  return a + b;
};

const createErro = (errMsg: string): never => {
  throw new Error(errMsg);
};

const numberOrString = (value: number | string): string => {
  if (typeof value === "number") {
    return `O número é ${value}`;
  }
  if (typeof value === "string") {
    return `O texto é ${value}`;
  }
  return createErro("Valor deve ser número ou texto");
};

//POO

class User {
  constructor(
    private id: number,
    public name: string,
    public age: number,
    protected email: string
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.email = email;
  }
}
