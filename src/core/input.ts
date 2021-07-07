import {ProcyonType} from '../types';

export class Input {
  name: string;
  type: ProcyonType;

  constructor(_name: string, type: ProcyonType) {
    this.name = _name;
    this.type = type;
  }
}

export default function input(_name: string, type: ProcyonType) {
  return new Input(_name, type);
}
