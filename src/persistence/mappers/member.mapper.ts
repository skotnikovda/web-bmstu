import PersistenceMember from 'persistence/member';
import DomainMember from 'domain/forum/member';
import MemberID from 'domain/forum/member/id';
import Name from 'domain/forum/member/name';
import Birthday from 'domain/forum/member/birthday';
import MemberProps from 'domain/forum/member/props';

export default class MemberMapper {
  public static toDomain(model: PersistenceMember): DomainMember {
    let props: MemberProps = {
      name: new Name(model.name),
      birthday: new Birthday(model.birthday),
    };
    let id: MemberID = new MemberID(model.id);
    return new DomainMember(props, id);
  }
  public static toPersistence(member: DomainMember): PersistenceMember {
    return {
      id: member.id.value,
      name: member.name.value,
      birthday: member.birthday.value,
    };
  }
}
