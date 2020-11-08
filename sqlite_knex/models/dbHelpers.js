const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development)

module.exports = {
    add,
    find, 
    findById,
    remove, 
    update,
    addOrder,
    findPrice,
    findCustomerOrders,
    addFeedback
}

// CRUD operations
async function add(table, info) {
    const [id] = await db(table).insert(info)
    return id
}

function find(table) {
    let record = db(table)
    return record
}

function findById(table, id) {
    let record = db(table)
    .where({id : id})
    .first()
    return record
}

function remove(table, id) {
    let record = db(table)
                    .where({id : id})
                    .delete()
    return record
}

async function update(table, id, changes) {
    return db(table)
            .where({id})
            .update(changes)
            .then(() => {
                return findById(id)
            })  
        }


async function addOrder(order, customer_id) {
    const [id] = await db("orders")
                        .where({customer_id : customer_id})
                        .insert(order)
    return findById("orders", id)
}


async function addFeedback(feedback, customer_id, order_id) {
    const [id] = await db("feedback")
                        .insert(feedback)
    return findById("feedback", id)
}

async function findPrice(item) {
    const record = await db("menu as m").where({menu_item : item}).first().select("m.price")
    return record
}

function findCustomerOrders(id) {
    return db("customerInfo")
        .join("orders", "customerInfo.id", "orders.customer_id")
        .select(
            "customerInfo.id as customerID",
            "customerInfo.name as name",
            "orders.ord_id as ordID",
            "orders.menu_item as item",
            "orders.price as price"
        )
}

