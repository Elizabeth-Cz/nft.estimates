import {
  DocumentType,
  getModelForClass,
  ReturnModelType,
} from "@typegoose/typegoose";
import { BeAnObject } from "@typegoose/typegoose/lib/types";
import { Entity } from "../entities/entity";
import moment from "moment";
import { DateFormat } from "../toolset/dateTime";
import { FilterQuery } from "mongoose";

interface Newable {
  new (...args: any[]): any;
}

export class BaseRepository<
  DATA_TYPE extends Entity,
  CLASS_TYPE extends Newable
> {
  public model: ReturnModelType<CLASS_TYPE, BeAnObject>;

  constructor(Class: CLASS_TYPE) {
    this.model = getModelForClass(Class);
  }

  public async updateByFields(
    fields: Array<keyof DATA_TYPE>,
    instance: DATA_TYPE,
    createIfNew: boolean = true
  ) {
    const filter: Partial<InstanceType<CLASS_TYPE>> = fields.reduce(
      (prev, item) => ({
        ...prev,
        [item]: instance[item],
      }),
      {}
    );
    await this.update(filter, instance, createIfNew);
  }

  public async update(
    filter: FilterQuery<CLASS_TYPE>,
    instance: DATA_TYPE,
    createIfNew: boolean = true
  ) {
    instance.updated = moment().format(DateFormat.FULL);
    await this.model.updateOne(filter, instance, { upsert: createIfNew });
  }

  public async createMany(documents: DATA_TYPE[]) {
    const now = moment().format(DateFormat.FULL);
    documents.forEach((doc) => (doc.created = now));
    await this.model.insertMany(documents);
  }

  public async createOne(document: DATA_TYPE) {
    document.created = moment().format(DateFormat.FULL);
    await this.model.create(document);
  }

  public async saveMany(documents: DocumentType<DATA_TYPE>[]) {
    await this.model.bulkSave(documents);
  }

  //
  // public async updateMany(documents: DATA_TYPE[], fields: string[]) {
  //   await syncForEach(documents, async (doc) => {
  //     const filter = fields.reduce<Record<string, keyof DATA_TYPE>>((prev, item) => ({
  //       ...prev,
  //       [item]: doc[item]
  //     }), {})
  //     // await this.update(doc);
  //   })
  // }

  public getOne(query: FilterQuery<CLASS_TYPE>): Promise<DATA_TYPE | void> {
    return new Promise<DATA_TYPE>((resolve, reject) =>
      this.model
        .find(query)
        .limit(1)
        .exec((err: Error | null, item: any) => {
          if (err) {
            console.log("Error:", err);
            reject(err);
          } else {
            resolve(item[0] || null);
          }
        })
    );
  }

  public getMany(query: FilterQuery<CLASS_TYPE>) {
    return this.model.find(query).exec(); /*(err, items: any[]) => {
        if (err) {
          console.log("Error:", err);
          reject(err);
        } else {
          resolve(items || []);
        }
      })
    );*/
  }
}
