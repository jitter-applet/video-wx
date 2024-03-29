//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    totalPage: 1,
    page: 1,
    videoList: [],
    screenWidth: 350,
    serverUrl: "",
    searchContent: "",

  },



  onLoad: function(params) {
    var me = this;
    var screenWidth = wx.getSystemInfoSync().screenWidth;
    me.setData({
      screenWidth: screenWidth
    });

    var searchContent = params.search;
    var isSaveRecord = params.isSaveRecord;
    if (isSaveRecord == null || isSaveRecord == '' || isSaveRecord == undefined) {
      isSaveRecord = 0;
    }
    me.setData({
      searchContent: searchContent
    })
    //获取当前的分页数
    var page = me.data.page;
    me.getAllVideoList(page, isSaveRecord);
  },
  getAllVideoList: function(page, isSaveRecord) {
    var serverUrl = app.serverUrl
    var me = this;
    wx.showLoading({
      title: '请等待，加载中...,',
    });
    var searchContent = me.data.searchContent;
    wx.request({
      url: serverUrl + '/video/showAll?page=' + page + "&isSaveRecord=" + isSaveRecord,
      method: 'POST',
      data: {
        videoDesc: searchContent
      },
      success: function(res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        console.log(res.data);
        //判断当前page是否是第一页，如果是第一页，那么设置 videoList为空
        if (page === 1) {
          me.setData({
            videoList: []
          })
        }
        var videoList = res.data.data.rows;
        var newVideoList = me.data.videoList;
        me.setData({
          videoList: newVideoList.concat(videoList),
          page: page,
          totalPage: res.data.data.total,
          serverUrl: serverUrl
        })
      }
    })
  },
  onReachBottom: function() {
    var me = this;
    var currentPage = me.data.page;
    var totalPage = me.data.totalPage;
    //判断当前页数和总页数是否相等，如果相等则无需查询
    if (currentPage === totalPage) {
      wx.showToast({
        title: '已经没有视频啦~~~',
        icon: 'none'
      })
      return;
    }
    var page = currentPage + 1;
    me.getAllVideoList(page, 0);
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    this.getAllVideoList(1, 0);
  },
  showVideoInfo: function(e) {
    var me = this;
    var videoList = me.data.videoList;
    console.log('heh', e)
    var arrindex = e.target.dataset.arrindex;
    //arrindex 是用户点击的那个一个视频的下标
    var videoInfo = JSON.stringify(videoList[arrindex]);
    console.log('heh', videoInfo)
    wx.redirectTo({
      url: '../videoInfo/videoInfo?videoInfo=' + videoInfo,
    })
  }
})