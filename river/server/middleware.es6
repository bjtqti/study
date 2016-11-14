'use strict'

export async function constants(ctx,next){
    if(process.env.HMR_ENABLED){
        ctx.state.baseURL = ctx.request.protocol+"://"+require("../task/helper").getLanIP()
    }
    await next()
}