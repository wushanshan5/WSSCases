// pages/index/index.js
function randomNum(num, max) {
	var randomNumArr = [];
	var ranArr = [];
	for (var i = 0; i < max; i++) {
		ranArr[i] = i;
	}
	for (var ran = 0; ran < num; ran++) {
		var ranLen = Math.floor(Math.random() * max);
		randomNumArr.push(ranArr[ranLen]);
		max--;
		ranArr.splice(ranLen, 1);
	}
	return randomNumArr;
}
Page({
	data: {
		swiperInfo : null,
		songType1 : null,
		songType11 : null,
		songType2 : null,
		songType25 : null,
		msg:null,
		msgTrue : false
	},

	onReady: function () {
		var that = this;
		
		//调用接口填充到swiper中
		wx.request({
			url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=21&size=30&offset=0',
			success : function(res){
				var arr = randomNum(4,res.data.song_list.length);
				var songArr = [];
				for(var i=0;i<arr.length;i++) {
					songArr.push(res.data.song_list[arr[i]]);
				}
				that.setData({
					swiperInfo : songArr
				});
			},
			fail: function (err) {
				
			},
			complete : function(res){
				if(res.errMsg != "request:ok") {
					that.setData({
						msg: JSON.stringify(res)+"由于url不在域名列表内，请开启调试！！！",
						msgTrue : true
					});
				}
				
			}
		});
		//调用接口填充到list上
		wx.request({
			url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=10&offset=0',
			success : function(res){
				that.setData({
					songType1: res.data.song_list
				});
			}
		});
		wx.request({
			url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=11&size=10&offset=0',
			success: function (res) {
				that.setData({
					songType11: res.data.song_list
				});
			}
		});
		wx.request({
			url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=2&size=10&offset=0',
			success: function (res) {
				that.setData({
					songType2: res.data.song_list
				});
			}
		});
		wx.request({
			url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=25&size=10&offset=0',
			success: function (res) {
				that.setData({
					songType25: res.data.song_list
				});
			}
		});

	},
	onShow: function () {
	
	},
	onPullDownRefresh: function () {
	
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
	
	},
	swiperPlay : function(e){
		var current = e.currentTarget;
		//点击对应的音乐，跳转播放界面
		wx.setStorage({
			key: 'songid',
			data: current.dataset.songid
		})
		wx.navigateTo({
			url: '../playing/playing'
		})
	},
	singerClassify : function(){
		wx.navigateTo({
			url: '../singerClassify/singerClassify'
		})
	},
	searching : function(e){
		var that = this;
		wx.getStorage({
			key: 'value',
			success: function(res) {
				wx.setStorage({
					key: 'value',
					data: res.data.trim()
				})
				wx.navigateTo({
					url: '../search/search',
				})
			},
		})
		
	},
	inputBlur : function(e){
		if(e.detail.value != "") {
			wx.setStorage({
				key: 'value',
				data: e.detail.value,
			})
		}
	}

  
})