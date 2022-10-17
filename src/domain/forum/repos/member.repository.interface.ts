import Member from 'domain/forum/member';

export default interface IUserRepository {
  createOne(member: Member): Promise<void>;
  readOne(id: string): Promise<Member>;
  commit(): Promise<void>;
}
