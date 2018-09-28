// var http = require('./src/api/api.base.js');
var request = require('request');
var crypto = require('crypto')
import axios from "axios";
var fs = require('fs')
function sleep(time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  })
}
function requestwiwj(ID) {
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
            "floorNo": result.houseinfo.buildingfloor,
            "totalFloor": result.houseinfo.houseallfloor,
            'floor': result.houseinfo.floorStr.split('/')[0],
            "logoPic": result.houseinfo.imgurl,
            "layoutPic": layoutPic,
            "roomPic": roomPic,
            "agentName": result.houseinfo.webHousePlList[0].username,
            "agentTel": result.houseinfo.webHousePlList[0].handset,
            "agentPic": result.houseinfo.webHousePlList[0].header
          }
          console.log(jsonObj)
          let hash = crypto.createHmac('sha1', 'Kodczy3lmh').update(JSON.stringify(jsonObj)).digest('hex')
          axios.post('http://api.test.toutiaofangchan.com/woiwoj/houseimport', jsonObj,
            {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': hash
              },
            }).then(response => {
              if (response.data.status === 200) {
                resolve(response.data)
              }
              if (response.data.code !== 0) {
                reject(response.data)
              } else {
                resolve(response.data)
              }
            }).catch(error => {
              reject(error.response.data)
            })
        } catch (error) {
          console.log(error)
          let s = Object.assign({ code: 100004, data: '', msg: '' }, error)
          reject(s)
        }
      } else {
        reject({ code: 100004, data: '', msg: '爬虫报错' })
      }
    })
  })
}


async function requestWiwjIdList(page) {
  let formList = {
    page: page,
    pcount: 15
  }
  request.post({
    url: 'https://appapi.5i5j.com/appapi/exchange/1/v1/prolist',
    formData: formList,
    headers: {
      'User-Agent': '5i5jAPP/3.0.6 (iPhone; iOS 10.3.2; Scale/3.00)',
      'Content-Type': 'application/json;charset=UTF-8',
      'appId': 'com.wawj.app.t',
      'deviceId': 'E9DDCECE-E3E7-44EF-80A0-40842EC5557E',
      'Host': 'appapi.5i5j.com'
    }
  }, async function (error, response, body) {
    if (!error) {
        let list = JSON.parse(body).data.list
        for (let i = 0; i < list.length; i++) {
          const element = list[i];
          console.log("into", element.housesid)          
          let res 
          try {
          res = await requestwiwj(element.housesid)
          console.log(res)
            
          } catch (error) {
          console.log(error)
          }
          await sleep(2000)
        }
        console.log('此页完成')
        console.log(`存入${list.length}条房源`)
      if (list.length>0) {
        console.log('有下一页')
        page++
        console.log('7秒后开始爬下一页')
        console.log('下一页是:',page)
        await sleep(7000)
        await setImmediate(requestWiwjIdList,page)
      }else{
        console.log("爬取结束")
      }
    } else {
      console.log(error)
    }
  })
}

// function requestList(params) {
//   requestWiwjIdList(2)
// }
// requestWiwjIdList(1)
// https://bj.5i5j.com/ershoufang/36266083.html
requestwiwj(40185188).then(res=>{
  console.log(res)
}).catch(err=>{
  console.log(err)
})
