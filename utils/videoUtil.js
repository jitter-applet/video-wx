function uploadVideo() {
  var me = this;
  wx.chooseVideo({
    sourceType: ['album'],
    success: function(res) {
      console.log("res==>", res);
      var duration = res.duration;
      var tmpHeight = res.height;
      var tmpWidth = res.width;
      var tmpVideoUrl = res.tempFilePath;
      var tmpCoverUrl = res.thumbTempFilePath;
      if (duration > 10) {
        wx.showToast({
          title: '视频长度不能超过10秒...',
          icon: 'none',
          duration: 2500
        })
      } else {
        //TODO 打开选择bgm页面
        wx.navigateTo({
          url: `../chooseBgm/chooseBgm?duration=${duration}&tmpHeight=${tmpHeight}&tmpWidth=${tmpWidth}&tmpVideoUrl=${tmpVideoUrl}&tmpCoverUrl=${tmpCoverUrl}`
        })
      }
    }
  })
}

module.exports = {
  uploadVideo: uploadVideo
}