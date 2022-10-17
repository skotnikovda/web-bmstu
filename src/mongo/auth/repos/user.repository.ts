import IUserRepository from 'domain/auth/repos/user.repository.interface';
import DomainUser from 'domain/auth/user';
import PersistenceUser from 'persistence/user';
import UserModel from 'mongo/auth/models/user.model';
import UserMapper from 'persistence/mappers/user.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserRepository implements IUserRepository {
  private usersToCreate: DomainUser[] = [];
  private usersToUpdate: DomainUser[] = [];

  async commit(): Promise<void> {
    this.commitCreated();
    this.commitUpdated();
  }

  async createOne(user: DomainUser): Promise<void> {
    this.usersToCreate.push(user);
  }

  async readOne(username: string): Promise<DomainUser> {
    let user = this.readCreated(username);
    if (user) {
      return user;
    }
    let userDoc = await UserModel.findOne({ username: username });
    if (userDoc) {
      let user = UserMapper.toDomain(userDoc);
      this.usersToUpdate.push(user);
      return user;
    }
    return null;
  }

  readCreated(username: string): DomainUser {
    for (let user of this.usersToCreate) {
      if (user.username.value == username) {
        return user;
      }
    }
  }

  async commitCreated(): Promise<void> {
    let usersToCreate: PersistenceUser[] = [];
    for (let user of this.usersToCreate) {
      usersToCreate.push(UserMapper.toPersistence(user));
    }
    this.usersToCreate = [];
    await UserModel.insertMany(usersToCreate);
  }

  async commitUpdated(): Promise<void> {
    for (let user of this.usersToUpdate) {
      let userDoc = UserMapper.toPersistence(user);
      await UserModel.updateOne({ id: userDoc.id }, userDoc);
    }
    this.usersToUpdate = [];
  }
}
