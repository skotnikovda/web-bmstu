import Entity from 'core/entity';
import ID from './member/id';
import Name from './member/name';
import Birthday from './member/birthday';
import Props from './member/props';

export default class Member extends Entity<ID, Props> {
  constructor(props: Props, id?: ID) {
    super(props, id);
  }

  get name(): Name {
    return this._props.name;
  }

  get birthday(): Birthday {
    return this._props.birthday;
  }
}
