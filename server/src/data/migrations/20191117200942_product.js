
exports.up = function(knex, Promise) {
    return knex.schema.createTable('product', function(table) {
          table.increments('id').primary()
          table.string('name')       
          table.string('sku_product').unique().notNullable()
          table.string('description')
          table.decimal('price', 6, 2)
          table.integer('product_no')
        })
};

exports.down = function(knex, Promise) {
    return  knex.schema.dropTable('product')
      
};
