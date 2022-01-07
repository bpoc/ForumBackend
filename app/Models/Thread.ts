import {DateTime} from "luxon";
import {BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany} from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import Topic from "App/Models/Topic";
import Post from "App/Models/Post";

export default class Thread extends BaseModel {
    @column({isPrimary: true})
    public id: number;

    @column()
    public name: string;

    @column()
    public userId: number;

    @column()
    public topicId: number;

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime;

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime;

    @belongsTo(() => User, {foreignKey: "userId"})
    public user: BelongsTo<typeof User>;

    @belongsTo(() => Topic, {foreignKey: "topicId"})
    public topic: BelongsTo<typeof Topic>;

    @hasMany(() => Post)
    public posts: HasMany<typeof Post>;
}
