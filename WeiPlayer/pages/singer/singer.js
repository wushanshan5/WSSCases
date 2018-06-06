// pages/singer/singer.js
Page({
	data: {
		singerid : "",
		singerPic : "",
		singerInfo : "",
		singerName : "",
		singerCompany : "",
		singerConstellation : "",
		singerCountry : "",
		singerHeight : "",
		singerWeight : "",
		singerSongs : [],
		introHide: "hide",
		listHide: "",
		informationHide: "hide",
		currentInfo1: "current-info",
		currentInfo2: "",
		currentInfo3: "",
		offset : 0
	},
	onLoad: function (options) {
		var that = this;
		wx.getStorage({
			key: 'singerid',
			success: function (res) {
				that.setData({
					singerid: res.data
				});
			}
		});
	},
	onReady: function () {
		//在ready中请求，否则songid为空
		var that = this;
		wx.request({
			url: "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.artist.getInfo&tinguid=" + that.data.singerid,
			success: function (res) {
				var arr = res.data.intro.split("\n");
				that.setData({
					singerPic: res.data.avatar_big,
					singerInfo: arr,
					singerName: res.data.name,
					singerCompany: res.data.company,
					singerConstellation: res.data.constellation,
					singerCountry: res.data.country,
					singerHeight: res.data.stature,
					singerWeight: res.data.weight,
				});
				wx.request({
					url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid=' + that.data.singerid +'&limits=10&use_cluster=1&order=2&offset='+that.data.offset*10,
					success: function (res) {
						that.setData({
							singerSongs: res.data.songlist,
							offset : that.data.offset+1
						});
					}
				});
			}
		});		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
	
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
	
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
	
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
	
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		var that = this;
		console.log("触底了");
		wx.request({
			url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid=' + that.data.singerid + '&limits=10&use_cluster=1&order=2&offset=' + that.data.offset * 10,
			success: function (res) {
				that.setData({
					singerSongs: that.data.singerSongs.concat(res.data.songlist),
					offset: that.data.offset + 1
				});
			}
		});
	},
	infotap1 : function(){
		this.setData({
			introHide: "hide",
			listHide: "",
			informationHide: "hide",
			currentInfo1: "current-info",
			currentInfo2: "",
			currentInfo3: ""
		});
	},
	infotap2 : function(){
		this.setData({
			introHide: "",
			listHide: "hide",
			informationHide: "hide",
			currentInfo1: "",
			currentInfo2: "current-info",
			currentInfo3: ""
		});
	},
	infotap3 : function(){
		this.setData({
			introHide: "hide",
			listHide: "hide",
			informationHide: "",
			currentInfo1: "",
			currentInfo2: "",
			currentInfo3: "current-info"
		});
	},
	songPlay : function(e){
		var current = e.currentTarget;
		//点击对应的音乐，跳转播放界面
		wx.setStorage({
			key: 'songid',
			data: current.dataset.songid
		})
		wx.navigateTo({
			url: '../playing/playing'
		})
	}
})