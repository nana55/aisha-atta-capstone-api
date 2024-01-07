exports.up = function (knex) {
    return knex.schema
            .createTable("progress", (table) => {  
            table.increments("id").primary();
            table
                .integer("user_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .integer("goal_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("goals")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.integer("percentage").notNullable().defaultTo(10);  
            table.timestamp("created_at").defaultTo(knex.fn.now());
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable("progress");
};
