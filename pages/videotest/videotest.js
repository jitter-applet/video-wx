const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    serverUrl: app.serverUrl,
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 2
      }]
  },
  bindplay:function(){
    
  },
  bindpause:function(){

  }

 
})