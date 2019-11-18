
exports.up = function(knex, Promise) {
    return knex.schema.createTable('product', function(table) {
          table.increments('id').primary()
          table.string('name')       
          table.string('sku_product')
          table.text('description')
          table.integer('price')
          table.string('product_no').unique().notNullable()
        })
};

exports.down = function(knex, Promise) {
    return  knex.schema.dropTable('product')
      
};
