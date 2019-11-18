import { Product } from '../models'
import knex from '../../helpers/knex'

const getProduct = async(trx = null, page, size)=>{

    var offset = parseInt(page - 1) * size;
    const select = ["product.id", 'name', 'description', 'price', 'image.url']
    const where = {}
    const total = await knex.count('* as count').from("product").first()
    const resp = await Product.find(trx, where, select)
    .leftJoin('image', 'image.id_product', 'product.id').offset(offset).limit(size)

    const data = {
        meta : {
            total_rows : parseInt(total.count, 10),
            current_page :parseInt(page, 10),
            total_page : Math.ceil(parseInt(total.count, 10) / size)
        },
        data : resp
    }
    return data
}
const upsertProduct = async(trx, data)=>{
   const insert = await Product.upsert(trx, data)
   return insert 
}
const updateProduct = async(trx, id, data)=>{
    const update = await Product.update(trx, id, data)
    return update
}
const destroyProduct = async(trx, id)=>{
    const destroy = await Product.destroy(trx, id)
    return destroy
}
const getProductById = async(trx, id)=>{
    const select = ["product.id", 'name', 'description', 'price', 'image.url']
    const resp = await Product.find(trx, {'product.id': id }, select)
    .leftJoin('image', 'image.id_product', 'product.id')
    return resp
}
export {
    upsertProduct,
    getProduct,
    updateProduct,
    destroyProduct,
    getProductById
}