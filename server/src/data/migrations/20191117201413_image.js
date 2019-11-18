
exports.up = function(knex, Promise) {
    return knex.schema.createTable('image', function (table) {
          table.increments('id').primary()
          table.string('url')       
          table.integer('id_product')
          table.string('product_no').unique().notNullable()
        }) 
};
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('image')
};
