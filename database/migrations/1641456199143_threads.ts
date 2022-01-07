import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Threads extends BaseSchema {
    protected tableName = "threads";

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id");
            table.string("name").notNullable();
            table.integer("user_id").unsigned().notNullable().references("users.id");
            table.integer("topic_id").unsigned().notNullable().references("topics.id");
            table.timestamp("created_at", {useTz: true}).defaultTo(this.now());
            table.timestamp("updated_at", {useTz: true}).defaultTo(this.now());
        });
    }

    public async down() {
        this.schema.dropTable(this.tableName);
    }
}
