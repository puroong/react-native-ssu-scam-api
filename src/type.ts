export interface LoginForm {
  username: string;
  password: string;
}

export class Cookie {
  constructor(public key: string, public value: string) {}
  toString() {
    return `${this.key}=${this.value}`;
  }
}
