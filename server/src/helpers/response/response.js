import * as message from './message'
import { HTTP_CODE }from './http-code'

export const success = (reply, key, data) => {
    const resp = {
        meta : {
            message : message.ok(key),
            status : "SUCCESS",
        },
        data
    }
    return reply.response(resp).code(HTTP_CODE.SUCCESS.OK.code)
} 

