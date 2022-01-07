import {DateTime} from "luxon";
import {BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany} from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import Thread from "App/Models/Thread";

export default class Topic extends BaseModel {
    @column({isPrimary: true})
    public id: number;

    @column()
    public name: string;

    @column()
    public description: string;

    @column()
    public userId: number;

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime;

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime;

    @belongsTo(() => User, {serializeAs: "user"})
    public user: BelongsTo<typeof User>;

    @hasMany(() => Thread)
    public threads: HasMany<typeof Thread>;
}
