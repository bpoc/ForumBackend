import {DateTime} from "luxon";
import {BaseModel, BelongsTo, belongsTo, column} from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import Thread from "App/Models/Thread";

export default class Post extends BaseModel {
    @column({isPrimary: true})
    public id: number;

    @column()
    public text: string;

    @column()
    public userId: number;

    @column()
    public threadId: number;

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime;

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime;

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>;

    @belongsTo(() => Thread)
    public thread: BelongsTo<typeof Thread>;
}
