import convert from 'xml2json'
import * as productModules from '../modules/elevenia/product'
import knex from '../helpers/knex'
import {productRepository, imageRepository } from '../data/repository'

const insertDb = async(el, detail, trx)=>{
    const product = {
        product_no : el.prdNo,
        name : el.prdNm,
        price : el.selPrc,
        description : detail.htmlDetail
    }   
   const insertProduct = await productRepository.upsertProduct(trx, product) 
   console.log(insertProduct)
  
}
const saveAllProductInDB = async()=>{
    try{
        let page = 1
        let products = await productModules.product(page)
        products =  convert.toJson(products.data);

        products = JSON.parse(products)
        const data = products.Products.product

     await knex.transaction(async (trx) => {
        const allProducts = data.map(async(el)=>{

            let detail = await productModules.detailProduct(el.prdNo)
            detail =  convert.toJson(detail.data);
            detail = JSON.parse(detail)

            const result = await insertDb(el, detail.Product,trx)
            // return JSON.parse(result)
            // console.log(JSON.parse(result))
        })
        return await Promise.all(allProducts)
    })
    }catch(err){
        console.log(err)
    }
}
// saveAllProductInDB()

export {
    saveAllProductInDB
}