import Entity from 'core/entity';
import UserID from './user/id';
import Username from './user/name';
import Password from './user/password';
import UserProps from './user/props';

export default class User extends Entity<UserID, UserProps> {
  constructor(props: UserProps, id?: UserID) {
    super(props, id);
  }

  get username(): Username {
    return this._props.username;
  }

  get password(): Password {
    return this._props.password;
  }
}
