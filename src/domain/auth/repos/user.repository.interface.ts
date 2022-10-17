import User from 'domain/auth/user';

export default interface IUserRepository {
  createOne(user: User): Promise<void>;
  readOne(username: string): Promise<User>;
  commit(): Promise<void>;
}
