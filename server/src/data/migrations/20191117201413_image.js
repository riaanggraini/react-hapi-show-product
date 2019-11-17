
exports.up = function(knex, Promise) {
    return knex.schema.createTable('image', function (table) {
          table.increments('id').primary()
          table.string('url')       
          table.integer('id_product')
        })
     
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('image')
};
