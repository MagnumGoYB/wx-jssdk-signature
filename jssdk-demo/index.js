const url = encodeURIComponent(location.href.split('#')[0])
const appId = 'wxbf6835191052bdee'
const appSecret = 'e85fe81cb0b2c2ca66322c82b02a318b'

fetch(
  `http://127.0.0.1:3003/api/signature?url=${url}&appId=${appId}&appSecret=${appSecret}`
)
  .then((res) => res.json())
  .then((res) => {
    const configDiv = document.querySelector('#config')
    configDiv.innerHTML = JSON.stringify(res, null, 2)

    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.appId, // 必填，公众号的唯一标识
      timestamp: +res.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.nonceStr, // 必填，生成签名的随机串
      signature: res.signature, // 必填，签名
      jsApiList: [] // 必填，需要使用的JS接口列表
    })

    wx.ready(function () {
      console.log('ready')
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    })
  })
