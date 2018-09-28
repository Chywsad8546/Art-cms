// import {requestMaiTian} from "./request"
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
import axios from "axios";
var request = require('request');
var crypto = require('crypto')
const key = 'Phrw3a0bfu'
app.use(bodyParser());

//error处理
const errorHandler = async (ctx, next) => {
  try {
    await next()

  } catch (err) {
    ctx.response.status = 200
    console.log("错误捕获", err)
    ctx.response.body = err
    ctx.app.emit('error', err, ctx)
  }
}


app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});
router.get('/spider/Maitian', async (ctx, next) => {
  console.log(ctx.query)
  let res = await requestMaiTian(ctx.query.id)
  ctx.body = Object.assign({}, { code: 0, msg: '', data: res.res })
});
router.get('/spider/Woai', async (ctx, next) => {
  console.log(ctx.query)
  let res = await requestWoAi(ctx.query.id)
  console.log("正确")
  console.log(res)
  ctx.body = Object.assign({ code: 0, msg: '', data: '' }, res)
});
router.get('/spider/wiwj', async (ctx, next) => {
  console.log(ctx.query)
  let res = await requestwiwj(ctx.query.id)
  console.log("正确")
  console.log(res)
  ctx.body = Object.assign({ code: 0, msg: '', data: '' }, res)
});
app.use(errorHandler)
app.use(router.routes());
app.on('error', function (err) {
  console.log('app.js onError, error: ', err.msg || err.message)
  console.log(err)
})
app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})

function requestMaiTian(ID) {
  console.log('ID', ID)
  return new Promise((resolve, reject) => {
    request({
      url: `https://app.maitian.cn/service/HouseSecond/Detail?HouseCode=${ID}`,
      headers: {
        'User-Agent': 'MaiTian/2.4.0 (iPhone; iOS 10.3.2; Scale/3.00)',
        'Authorization': 'Basic ios_ad9a3d13a089df11ef95448e02d19e12'
      }
    }, function (error, response, body) {
      if (!error) {
        try {
          let info = JSON.parse(body)
          info = info.data
          console.log(info)
          let layoutPic = []
          let roomPic = []
          if (info.HousePicList.length) {
            info.HousePicList.forEach(element => {
              if (element.PicType === '户型') {
                layoutPic.push('http://img.maitian.cn' + element.NormalPicUrl)
              } else {
                roomPic.push('http://img.maitian.cn' + element.NormalPicUrl)
              }
            });
          }
          let outPic = []
          if (info.CommunityInfo.CommunityInfo.CommunityList.length) {
            info.CommunityInfo.CommunityInfo.CommunityList.forEach(x => {
              outPic.push('http://img.maitian.cn' + x.CommunityPicUrl)
            })
          }
          let forward = ''
          if (info.Direction) {
            if (forward === '东') {
              forward = 1
            }
            if (forward === '西') {
              forward = 2
            }
            if (forward === '南') {
              forward = 3
            }
            if (forward === '北') {
              forward = 4
            }
            if (forward === '东南') {
              forward = 5
            }
            if (forward === '西南') {
              forward = 6
            }
            if (forward === '东北') {
              forward = 7
            }
            if (forward === '西北') {
              forward = 8
            }
            if (forward === '东西') {
              forward = 9
            }
            if (forward === '南北') {
              forward = 10
            }
            if (forward === '其他') {
              forward = 11
            }
          }
          let tags = []
          if (info.HouseInfo.DisplayTag.length) {
            info.HouseInfo.DisplayTag.forEach(x => {
              if (x.TagName === '近地铁') {
                tags.push(1)
              }
              if (x.TagName === '近公园') {
                tags.push(2)
              }
              if (x.TagName === '随时看') {
                tags.push(3)
              }
              if (x.TagName === '满五年') {
                tags.push(4)
              }
              if (x.TagName === '满二年') {
                tags.push(5)
              }
              if (x.TagName === '唯一') {
                tags.push(6)
              }
              if (x.TagName === '贷款未清') {
                tags.push(7)
              }
              if (x.TagName === '急售房') {
                tags.push(8)
              }
              if (x.TagName === '行家独家') {
                tags.push(9)
              }
            });
          }
          let jsonObj = {
            "fangyuanId": info.HouseInfo.HouseCode,
            "houseTitle": info.HouseTitle,
            "houseDesc": info.HouseDescription,
            "buildArea": info.HouseInfo.AreaSize,
            "projName": info.CommunityInfo.CommunityInfo.CommunityName,
            "address": info.CommunityInfo.CommunityInfo.Address,
            "district": info.CommunityInfo.CommunityInfo.LoopLineOption,
            "circle": info.CommunityInfo.CommunityInfo.CycleName,
            "year": info.CommunityInfo.CommunityInfo.BuildYear,
            "price": info.HouseInfo.PriceTotal,
            "tags": tags,
            "forward": forward,
            "room": info.HouseInfo.Layout[0] || 0,
            "hall": info.HouseInfo.Layout[1] || 0,
            "kitchen": info.HouseInfo.Layout[2] || 0,
            "toilet": info.HouseInfo.Layout[3] || 0,
            "balcony": info.HouseInfo.Layout[4] || 0,
            'floor': info.HouseInfo.Floor.split('/')[0] || 0,
            "totalFloor": info.HouseInfo.Floor.split('/')[1].replace(/[^0-9]/ig, "") || 0,
            "logoPic": 'http://img.maitian.cn' + info.DefaultPic,
            "layoutPic": layoutPic,
            "roomPic": roomPic,
            "outPic": outPic,
            "agentName": info.CommunityInfo.CommunityInfo.BrokerName,
            "agentTel": info.CommunityInfo.CommunityInfo.Phone,
          }
          console.log(jsonObj)
          let hash = crypto.createHmac('sha1', key).update(JSON.stringify(jsonObj)).digest('hex')
          axios.post('http://api.test.toutiaofangchan.com/tuitui99/houseimport', jsonObj,
            {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': hash
              },

            }).then(response => {
              console.log('111')
              console.log(response.data)
              if (response.data.status === 200) {
                resolve(response.data)
              }
              if (response.data.code !== 0) {
                reject(response.data)
              } else {
                resolve(response.data)
              }
            }).catch(error => {
              console.log("error")
              reject(error.response.data)
            })
        } catch (error) {
          let s = Object.assign({ code: 100004, data: '', msg: '' }, error)
          reject(s)
        }

      } else {
        console.log('err2')
        reject(error)
      }
    })
  })
}

function requestWoAi(ID) {
  console.log('ID', ID)
  let formData = {
    hid: ID
  };
  return new Promise((resolve, reject) => {
    request.post({
      url: 'https://appapi.5i5j.com/appapi/exchange/1/v1/allinfo',
      formData: formData,
      headers: {
        'User-Agent': '5i5jAPP/3.0.6 (iPhone; iOS 10.3.2; Scale/3.00)',
        'Content-Type': 'application/json;charset=UTF-8',
        'appId': 'com.wawj.app.t',
        'Host': 'appapi.5i5j.com'
      }
    }, async function (error, response, body) {
      if (!error) {
        try {
          let price = JSON.parse(body).data.houseinfo.price
          console.log(price)
          if (!price) {
            console.log("没有价格")
            reject({ code: 100004, data: '', msg: '没有价格' })
          }
          console.log({
            sourceHouseId: formData.hid,
            price: price
          })
          let hash1 = crypto.createHmac('sha1', 'Kodczy3lmh').update(JSON.stringify({
            sourceHouseId: formData.hid,
            price: price
          })).digest('hex')
          console.log(hash1)
          axios.post('http://api.test.toutiaofangchan.com/woiwoj/updateHousePrice', {
            sourceHouseId: formData.hid,
            price: price
          }, {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': hash1
              }
            }).then(response => {
              console.log('111')
              console.log(response.data)
              if (response.data.status === 200) {
                resolve(response.data)
              }
              if (response.data.status === 601) {
                reject({ msg: response.data.error, data: '', code: 100004 })
              }
            }).catch(error => {
              console.log("error")
              reject({ msg: '失败', data: '', code: 100004 })
            })
        } catch (error) {
          reject({ msg: '失败', data: '', code: 100004 })
        }
      } else {
        console.log(error)
        reject({ code: 100004, data: '', msg: '爬虫报错' })
      }
    })
  })
}

function requestwiwj(ID) {
  console.log('ID', ID)
  let formData = {
    hid: ID
  };
  return new Promise((resolve, reject) => {
    request.post({
      url: 'https://appapi.5i5j.com/appapi/exchange/1/v1/allinfo',
      formData: formData,
      headers: {
        'User-Agent': '5i5jAPP/3.0.6 (iPhone; iOS 10.3.2; Scale/3.00)',
        'Content-Type': 'application/json;charset=UTF-8',
        'appId': 'com.wawj.app.t',
        'Host': 'appapi.5i5j.com'
      }
    }, async function (error, response, body) {
      if (!error) {
        try {
          let result = JSON.parse(body).data
          console.log(result)
          let forward = 11
          if (result.houseinfo.heading) {
            if (result.houseinfo.heading === '东') {
              forward = 1
            }
            if (result.houseinfo.heading === '西') {
              forward = 2
            }
            if (result.houseinfo.heading === '南') {
              forward = 3
            }
            if (result.houseinfo.heading === '北') {
              forward = 4
            }
            if (result.houseinfo.heading === '东南') {
              forward = 5
            }
            if (result.houseinfo.heading === '西南') {
              forward = 6
            }
            if (result.houseinfo.heading === '东北') {
              forward = 7
            }
            if (result.houseinfo.heading === '西北') {
              forward = 8
            }
            if (result.houseinfo.heading === '东西') {
              forward = 9
            }
            if (result.houseinfo.heading === '南北') {
              forward = 10
            }
            if (result.houseinfo.heading === '其他') {
              forward = 11
            }
          }
          let tags = []
          if (result.houseinfo.tagwall.length) {
            result.houseinfo.tagwall.forEach(x => {
              if (x === '近地铁') {
                tags.push(1)
              }
              if (x === '近公园') {
                tags.push(2)
              }
              if (x === '随时看') {
                tags.push(3)
              }
              if (x === '满五年') {
                tags.push(4)
              }
              if (x === '满二年') {
                tags.push(5)
              }
              if (x === '唯一') {
                tags.push(6)
              }
              if (x === '贷款未清') {
                tags.push(7)
              }
              if (x === '急售房') {
                tags.push(8)
              }
              if (x === '行家独家') {
                tags.push(9)
              }
            });
          }
          let propertyRight = 8
          if (result.houseinfo.rightprop) {
            switch (result.houseinfo.rightprop) {
              case '已购公房':
                propertyRight = 1;
                break;
              case '商品房':
                propertyRight = 2;
                break;
              case '空置房':
                propertyRight = 3;
                break;
              case '经济适用房':
                propertyRight = 4;
                break;
              case '使用权房':
                propertyRight = 5;
                break;
              case '央产':
                propertyRight = 6;
                break;
              case '按经济试用住房管理的房屋':
                propertyRight = 7;
                break;
              default:
                propertyRight = 8;
                break;
            }
          }
          let lookTime = 4
          if (result.houseinfo.lookTime) {
            switch (result.houseinfo.rightprop) {
              case '随时看房':
                lookTime = 1;
                break;
              case '时间不限':
                lookTime = 1;
                break;
              case '周一到周五':
                lookTime = 2;
                break;
              case '周六日':
                lookTime = 3;
                break;
              case '电话预约':
                lookTime = 4;
                break;
              default:
                lookTime = 4;
                break;
            }
          }
          let layoutPic = []
          let roomPic = []
          if (result.houseinfo.imgs.length) {
            result.houseinfo.imgs.forEach(x => {
              if (x.indexOf('shinei') > 0) {
                roomPic.push(x)
              }
              if (x.indexOf('huxing') > 0) {
                layoutPic.push(x)
              }
            });
          }
          let jsonObj = {
            "fangyuanId": result.houseinfo.housesid,
            "houseTitle": result.houseinfo.housetitle,
            "houseDesc": result.houseinfo.memo,
            "buildArea": result.houseinfo.buildarea,
            "loupanId": result.community.communityid,
            "projName": result.houseinfo.communityname,
            "address": result.community.address,
            "district": result.community.qyname,
            "circle": result.community.sqname,
            "year": result.houseinfo.buildyear,
            "price": result.houseinfo.price,
            "accessory": result.houseinfo.rim,
            "traffic": result.houseinfo.traffic,
            "tags": tags,
            "tagStrArray": result.houseinfo.tagwall,
            "round": result.houseinfo.rim,
            "forward": forward,
            "propertyRight": propertyRight,
            "lookTime": lookTime,
            "room": result.houseinfo.bedroom,
            "hall": result.houseinfo.livingroom,
            "toilet": result.houseinfo.toilet,
            "floorNo":result.houseinfo.buildingfloor,
            "totalFloor": result.houseinfo.houseallfloor,
            'floor': result.houseinfo.floorStr.split('/')[0],
            "logoPic": result.houseinfo.imgurl,
            "layoutPic": layoutPic,
            "roomPic": roomPic,
            "agentName": result.houseinfo.webHousePlList?result.houseinfo.webHousePlList[0].username:'',
            "agentTel": result.houseinfo.webHousePlList?result.houseinfo.webHousePlList[0].handset:'',
            "agentPic": result.houseinfo.webHousePlList?result.houseinfo.webHousePlList[0].header:''
          }
          console.log(jsonObj)
          let hash = crypto.createHmac('sha1', 'koNdevH2sUxb2Y').update(JSON.stringify(jsonObj)).digest('hex')
          axios.post('http://house.3rd.api.toutiaofangchan.com/woiwoj/houseimport', jsonObj,
            {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': hash
              },
            }).then(response => {
              console.log('111')
              console.log(response.data)
              if (response.data.status === 200) {
                resolve(response.data)
              }
              if (response.data.code !== 0) {
                reject(response.data)
              } else {
                resolve(response.data)
              }
            }).catch(error => {
              console.log("error")
              reject(error.response.data)
            })
        } catch (error) {
          let s = Object.assign({ code: 100004, data: '', msg: '' }, error)
          reject(s)
        }
      } else {
        console.log(error)
        reject({ code: 100004, data: '', msg: '爬虫报错' })
      }
    })
  })
}