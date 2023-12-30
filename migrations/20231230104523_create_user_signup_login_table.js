exports.up = function (knex) {
    return knex.schema
        .createTable("users", (table) => {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.string("email").notNullable();
            table.string("username").notNullable();
            table.string("password").notNullable();
            table.string("avatar").defaultTo("https://pub-static.fotor.com/assets/projects/pages/7252c2b86395453a836cdd57b13b3d39/600w/fotor-7c742084acd7491aae9923279bdc3218.jpg");
            table.timestamp("created_at").defaultTo(knex.fn.now());
        })
        .createTable("goals", (table) => {
            table.increments("id").primary();
            table.string("description").notNullable();
            table.string("image");
            table
                .integer("user_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.string("category").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
        })
        .createTable("comments", (table) => {
            table.increments("id").primary();
            table.string("comment").notNullable();
            table
                .integer("user_comment_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .integer("goals_comment_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("goals")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("created_at").defaultTo(knex.fn.now());
        })
        .createTable("likes", (table) => {
            table.increments("id").primary();
            table
                .integer("user_like_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .integer("goals_like_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("goals")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.integer("count");
        })
        .createTable("stars", (table) => {
            table.increments("id").primary();
            table
                .integer("user_star_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .integer("goals_star_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("goals")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.integer("count");
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users").dropTable("goals").dropTable("comments").dropTable("likes").dropTable("stars");
};
