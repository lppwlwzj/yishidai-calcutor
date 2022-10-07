// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: 'calc-8guz5613ee562b39'
})
const db = cloud.database().collection("user");
// 云函数入口函数
exports.main = async (event, context) => {
    let {nickname,code} = event
    const {errCode,phoneInfo} = await cloud.openapi.phonenumber.getPhoneNumber({
        code
    })
    if(errCode === 0) {
        db.where({
            phoneNumber:phoneInfo.phoneNumber
        }).get().then(res=> {
         console.log('result',res)
            if(res.data.length === 0) {
                db.add({
                    data:{
                        nickname,
                        phoneNumber:phoneInfo.phoneNumber
                    }
                })
            }
            return {
                errCode,
                phoneInfo
            }
        }).catch(()=> {
            return {
                errCode:-1
            }
        })
     } else {
        return {
            errCode:-1
        }
    }
    
    // let { OPENID, APPID } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
    // let sum = a + b
  
    // return {
    //   OPENID,
    //   APPID,
    //   sum
    // }
  }
  
