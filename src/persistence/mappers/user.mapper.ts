import PersistenceUser from 'persistence/user';
import DomainUser from 'domain/auth/user';
import UserID from 'domain/auth/user/id';
import Username from 'domain/auth/user/name';
import Password from 'domain/auth/user/password';
import UserProps from 'domain/auth/user/props';

export default class UserMapper {
  public static toDomain(model: PersistenceUser): DomainUser {
    let props: UserProps = {
      username: new Username(model.username),
      password: new Password(model.password),
    };
    let id: UserID = new UserID(model.id);
    return new DomainUser(props, id);
  }
  public static toPersistence(user: DomainUser): PersistenceUser {
    return {
      id: user.id.value,
      username: user.username.value,
      password: user.password.value,
    };
  }
}
