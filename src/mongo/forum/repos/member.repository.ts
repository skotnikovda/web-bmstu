import IMemberRepository from 'domain/forum/repos/member.repository.interface';
import DomainMember from 'domain/forum/member';
import PersistenceMember from 'persistence/member';
import MemberModel from 'mongo/forum/models/member.model';
import MemberMapper from 'persistence/mappers/member.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class MemberRepository implements IMemberRepository {
  private membersToCreate: DomainMember[] = [];
  private membersToUpdate: DomainMember[] = [];

  async commit(): Promise<void> {
    this.commitCreated();
    this.commitUpdated();
  }

  async createOne(member: DomainMember): Promise<void> {
    this.membersToCreate.push(member);
  }

  async readOne(id: string): Promise<DomainMember> {
    let member = this.readCreated(id);
    if (member) {
      return member;
    }
    let memberDoc = await MemberModel.findOne({ id: id });
    if (memberDoc) {
      let member = MemberMapper.toDomain(memberDoc);
      this.membersToUpdate.push(member);
      return member;
    }
    return null;
  }

  readCreated(id: string): DomainMember {
    for (let member of this.membersToCreate) {
      if (member.id.value == id) {
        return member;
      }
    }
  }

  async commitCreated(): Promise<void> {
    let membersToCreate: PersistenceMember[] = [];
    for (let member of this.membersToCreate) {
      membersToCreate.push(MemberMapper.toPersistence(member));
    }
    this.membersToCreate = [];
    await MemberModel.insertMany(membersToCreate);
  }

  async commitUpdated(): Promise<void> {
    for (let member of this.membersToUpdate) {
      let memberDoc = MemberMapper.toPersistence(member);
      await MemberModel.updateOne({ id: memberDoc.id }, memberDoc);
    }
    this.membersToUpdate = [];
  }
}
