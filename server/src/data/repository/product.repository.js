import { Image, Product } from '../models'

// const getProduct = async(trx = null, page, size)=>{
//     const select = ["product.id", 'name', 'description', 'price', 'url']
//     const where = {}
//     const resp = await Product(trx, where, select)
//     .leftJoin('image', 'image.id_product', 'product.id')
// }

const upsertProduct = async(trx, data)=>{
   const insert = await Product.upsert(trx, data)
   return insert 
}
export {
    upsertProduct
}