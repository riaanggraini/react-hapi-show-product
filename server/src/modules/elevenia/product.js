import {get} from '../../helpers/axios'
import config from 'config'

const header = {
    openapikey : config.get('thirdParty.elevenia.openapikey')
}

export const product =async (page)=>{
    try{
        const url = `${config.get('thirdParty.elevenia.baseUrl')}prodservices/product/listing?page=${page} `
        const resp = await get(header, url)
        return resp
    }catch(err){
        throw err
    }   
}

export const detailProduct = async(productNo)=>{
    try{
        const url = `${config.get('thirdParty.elevenia.baseUrl')}prodservices/product/details/${productNo}`
        const resp = await get(header, url)
        return resp
    }catch(err){
        throw err
    }  
}