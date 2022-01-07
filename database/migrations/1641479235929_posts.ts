import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Posts extends BaseSchema {
    protected tableName = "posts";

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id");
            table.text("text").notNullable();
            table.integer("thread_id").unsigned().notNullable().references("threads.id").onDelete("RESTRICT");
            table.integer("user_id").unsigned().notNullable().references("users.id").onDelete("CASCADE");
            table.timestamp("created_at", {useTz: true}).defaultTo(this.now());
            table.timestamp("updated_at", {useTz: true}).defaultTo(this.now());
        });
    }

    public async down() {
        this.schema.dropTable(this.tableName);
    }
}
