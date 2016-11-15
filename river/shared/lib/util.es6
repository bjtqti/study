'use strict'
import reqwest from "reqwest";

const util = {
    apiRequest(url,param,options={
            method:"get",
            type:"json"
    }) {
        options = Object.assign({},options,{
            url,
            data:param
        });
        return reqwest(options);
    },
    fetchAPI(url,param,options={
        method:"GET"
    }){
        if(options.method === "GET"){
            var queryParam = [];
            for(let key in param){
                queryParam.push(`${key}=${param[key]}`)
            }
            queryParam = queryParam.join("&");
            url += `?${queryParam}`;
        }else{
            options.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            options.body = JSON.stringify(param);
        }
        return fetch(url,options).then((response)=>{
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then((json)=>{
            return json
        })
    }
}

export default util;