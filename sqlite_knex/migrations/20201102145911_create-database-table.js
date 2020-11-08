
exports.up = function(knex) {
    return knex.schema.createTable('customerInfo', (tbl) => {
        tbl.increments()
        tbl.string('type', 30)
            .notNullable()
        tbl.string('name', 30)
            .notNullable()
        tbl.string('drink', 128)
            .notNullable()
        tbl.string('food', 128)
            .notNullable()
      
    }).createTable('orders', (tbl) => {   
        tbl.increments()
        tbl.string("date_time")
        tbl.integer("ord_id")
            .notNullable()
        tbl.string("menu_item", 255)
            .notNullable()
        tbl.string("tone",20)
            .notNullable()
        tbl.integer("num_customers")
            .notNullable()
        tbl.float("price")
            .notNullable()
        tbl.string("bill_type", 20)
            .notNullable()
        // {
        //     "ord_id":  ,
        //     "menu_item": ,
        //     "tone": ,
        //     "num_customers": ,
        //     "bill_type": 
        // }
        tbl.integer("customer_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("customerInfo")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")

    }).createTable('menu', (tbl) => {
        tbl.increments()
        tbl.string("menu_item", 255)
            .notNullable()
        tbl.float("price")
            .notNullable()
        tbl.integer("acceptability", 10)
            .notNullable()
        tbl.integer("fridge")
            .notNullable()

    }).createTable('feedback', (tbl) => {
        tbl.increments()
        tbl.string("feedback", 400)
            .notNullable()

        tbl.integer("customer_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("customerInfo")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")

        tbl.integer("order_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("orders")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    });
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("customerInfo").dropTableIfExists("orders")
                        .dropTableIfExists("menu").dropTableIfExists("feedback")
};
