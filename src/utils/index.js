import queryString from 'query-string'
let rootUrl = 'https://www.fastmock.site/mock/748709824d6ac5d1310da8c965b85514/api'


let myFetch = {
    get(url,queryParams){
        url = rootUrl+url
        if(queryString){
            url += "?"+queryString.stringify(queryString);
        }
        console.log(url)
        return fetch(url)
                .then(res=>res.json())
    },
    post(url,body){
        return fetch(rootUrl+url,{
            method:'POST',
            headers:{
                "Accept":'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        })
            .then(res=>res.json())
            
    }
}

export {myFetch};