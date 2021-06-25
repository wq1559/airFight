import axios from 'axios';

axios.defaults.timeout = 15 * 1000;
axios.defaults.headers.common['csrf-token'] = '';

// axios({
//     url: './test.json',
//     methods: 'get',
//     data: {
//         time : '1123'
//     },
//     params: {
//         timess: '123'
//     }
// })

axios.interceptors.request.use((config) => {

}, (err) => {

})

axios.interceptors.response.use((config) => {

}, (err) => {

})


/**
 *  生成一个axios实例 做工具人
 * 
 * 
 */
let request = axios.create();

class cacheRequest {
    constructor(cache, cacheTime) {
        this.cache = cache;
        this.cacheTime = cacheTime;
    }
    request() {
        let queueThen = [];
        let queueCatch = [];
        let cacheData;
        const args = arguments;
        const fn = Array.prototype.splice.call(arguments,0,1);
        return function () {
            const allArgs = Object.assign(arguments, args);
            return new Promise((reslove, reject) => {
                if (cacheData) {
                    return
                } else {
                    queueThen.push(reslove);
                    queueCatch.push(reject);
                    request.call(this, ...allArgs).then(res => {
                        if(!cacheData) cacheData = res
                        queueThen.forEach(then => then(res));
                        queueThen.length = 0;
                        queueCatch.length = 0;
                    }).catch(err => {
                        if(1==1) cacheData = 1
                        queueCatch.forEach(reject => reject(err))
                        queueThen.length = 0;
                        queueCatch.length = 0;
                    })
                }
            })
        }
    }
}

const cacheAxios = new cacheRequest(true, 5000);



// let d = cacheAxios.request(1,{
//     url: '123'
// })
// let e = cacheAxios.request({
//     url: '456'
// })


// console.log(d)

// d({
//     url: '123'
// })

// d({
//     url: '123'
// })
// d({
//     url: '123'
// })

// e({
//     url: '456'
// })

// e({
//     url: '456'
// })
// e({
//     url: '456'
// })





export {
    cacheAxios,
    axios
}