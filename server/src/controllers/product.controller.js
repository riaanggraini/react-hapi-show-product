import convert from 'xml2json'
import {response} from '../helpers'
import * as productModules from '../modules/elevenia/product'
import knex from '../helpers/knex'
import {productRepository, imageRepository } from '../data/repository'

const getProductById = (trx, id) => productRepository.getProductById(trx, id)

const insertDb = async(el, detail, trx)=>{
    const product = {
        product_no : el.prdNo,
        name : el.prdNm,
        price : parseInt(el.selPrc, 10),
        description : detail.htmlDetail,
        sku_product : el.sellerPrdCd
    }   
    let data = {
        table: 'product',
	    object: product,
	    constraint: '(product_no)',
    }
    const insertProduct = await productRepository.upsertProduct(trx, data) 
    const image = {
        url : detail.prdImage01,
        id_product : insertProduct.id,
        product_no : el.prdNo,
    }
    data.table = 'image',
    data.object = image,
    data.constraint = '(product_no)'
    const insertImage = await imageRepository.upsertImage(trx, data)
    return insertImage
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

            await insertDb(el, detail.Product,trx)  
        })
        return await Promise.all(allProducts)
    })
    }catch(err){
        console.log(err, "test")
    }
}

const getSingleProduct = async(req, res)=>{
    try{
        const { params } = req 
        const productById = await getProductById(null, params.id)
        
        if(productById.length === 0) return response.notFound(res, 'product', [])

        return response.success(res, 'get product', productById[0])
    }catch(err){
        return response.internalServerError(res, 'while trying to get product', [])
    }
}
const getProducts = async(req, res)=>{
    try{
        const { query } = req 

        const queries = {
            page : query.page || 1,
            size : query.size || 10
        }
        const data = await productRepository.getProduct(null, queries.page , query.size)
        return response.success(res, 'get products', data.data, data.meta)
    }catch(err){
        return response.internalServerError(res, 'while trying to get products', [])
    }
}
const updateProduct = async(req, res)=>{
    try{
        const { params , payload} = req 
    
        const productById = await getProductById(null, params.id)
        
        if(productById.length === 0) return response.notFound(res, 'product', [])

        const data = {
            name : payload.name,
            price : parseInt(payload.price, 10),
            description : payload.description
        }
        await productRepository.updateProduct(null, params.id, data)

        const resp = await productRepository.getProductById(null, params.id)

        return response.success(res, 'update product', resp[0])

    }catch(err){
        return response.internalServerError(res, 'while trying to update product', [])
    }
}
const deleteProduct = async(req, res)=>{
    try{
        const { params } = req 
    
        const productById = await getProductById(null, params.id)
        
        if(productById.length === 0) return response.notFound(res, 'product', [])

        await productRepository.destroyProduct(null, params.id)

        return response.success(res, 'delete product', [])        
    }catch(err){
        return response.internalServerError(res, 'while trying to delete product', [])
    }
}
export {
    getProducts,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    saveAllProductInDB
}