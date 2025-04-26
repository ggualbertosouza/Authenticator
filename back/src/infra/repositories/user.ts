import { inject } from "inversify";
import { Db, Collection, ObjectId } from "mongodb";
import { Injectable } from "../../presentation/https/utils/inversify";

import { UserJSON } from "../../domain/entities/types";
import { IUserRepository } from "../../domain/repositories/user";

@Injectable({ key: MongoDbUserRepository })
class MongoDbUserRepository implements IUserRepository {
  private readonly collection: Collection;

  constructor(@inject("mongoDbConnection") db: Db) {
    this.collection = db.collection("users");
  }

  createId(id?: string): string {
    if (!id) return new ObjectId().toHexString();
    if (ObjectId.isValid(id)) return id;
    return new ObjectId().toHexString();
  }

  public async create(userData: UserJSON): Promise<{ id: string } | null> {
    const userToInsert = { ...userData, _id: new ObjectId(userData.id) };
    const result = await this.collection.insertOne(userToInsert);

    if (result.acknowledged) return { id: result.insertedId.toHexString() };

    return null;
  }

  findById(id: string): Promise<UserJSON | null> {
    throw new Error("Method not implemented.");
  }

  findByEmail(email: string): Promise<UserJSON | null> {
    throw new Error("Method not implemented.");
  }
  update(id: string, userData: Partial<UserJSON>): Promise<UserJSON | null> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<boolean | null> {
    throw new Error("Method not implemented.");
  }
}

export default MongoDbUserRepository;
