import { Image, } from '../models'

const upsertImage = async(trx, data)=>{
   const insert = await Image.upsert(trx, data)
   return insert 
}
export {
    upsertImage
}