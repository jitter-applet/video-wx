//app.js
App({
  // sourceUrl: "http://zzuisa.cn/video",
  serverUrl: "http://zzuisa.cn/video",
  // serverUrl: "http://192.168.101.184:8080",
  //serverUrl: "http://192.168.43.248:8081",
  // serverUrl: "10.117.139.16",
  userInfo: null,
  setGlobalUserInfo: function(user) {
    wx.setStorageSync("userInfo", user);
  },
  getGlobalUserInfo: function() {
    return wx.getStorageSync("userInfo");
  }
})