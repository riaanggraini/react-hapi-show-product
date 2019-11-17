import {response} from '../helpers'
import {productLogic} from '../logic'

const getProduct = async(request, reply) =>{
    try{
        const data = await productLogic.saveAllProductInDB()
        return data
    }catch(err){

    }
}
getProduct()

export {
    getProduct
}