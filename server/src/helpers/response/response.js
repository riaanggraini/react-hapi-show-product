import * as message from './message'
import { HTTP_CODE }from './http-code'

export const success = (reply, key, data, meta = {}) => {
    let resp = {
        meta : {
            message : message.ok(key),
            status : "success",
        },
        data
    }
    resp.meta = { ...resp.meta, ...meta }
    return reply.response(resp).code(HTTP_CODE.SUCCESS.OK.code)
} 

export const internalServerError = (reply, key, data, meta = {}) => {
    let resp = {
        meta : {
            message : message.somethingWentWrong(key),
            status : "error",
        },
        data
    }
    resp.meta = { ...resp.meta, ...meta }
    return reply.response(resp).code(HTTP_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.code)
} 
export const notFound = (reply, key, data, meta = {}) => {
    let resp = {
        meta : {
            message : message.notfound(key),
            status : "error",
        },
        data
    }
    // resp.meta = { ...resp.meta, ...meta }
    return reply.response(resp).code(HTTP_CODE.CLIENT_ERROR.NOT_FOUND.code)
} 



