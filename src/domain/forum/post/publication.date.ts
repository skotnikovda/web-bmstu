export default class PublicationDate {
  private _value: Date;

  constructor(value: Date) {
    this._value = value;
  }

  get value(): Date {
    return this._value;
  }
}
