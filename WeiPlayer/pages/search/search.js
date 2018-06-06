// pages/search/search.js
Page({
	data: {
		value : "",
		songs : "",
		albums : "",
		artists : ""

	},
	onLoad: function (options) {
		var that = this;
		wx.getStorage({
			key: 'value',
			success: function(res) {
				that.setData({
					value: res.data
				});
			}
		});
	},
	onReady: function () {
		var that = this;
		wx.request({
			url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query=' + that.data.value,
			success: function (res) {
				if(res.data.song) {
					that.setData({
						songs: res.data.song
					});
				}
				if(res.data.album) {
					that.setData({
						albums: res.data.album
					});
				}
				if(res.data.artist) {
					that.setData({
						artists: res.data.artist
					});
				}
			},
			fail : function(err){
				console.log(err)
			}
		})
	},

	onShow: function () {
	
	},


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
	
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
	
	},
	playsong : function(e){
		var current = e.currentTarget;
		//点击歌手名，跳转歌手信息页
		wx.setStorage({
			key: 'songid',
			data: current.dataset.songid
		});
		wx.navigateTo({
			url: '../playing/playing',
		});
	},
	getsingerinfo : function(e){
		var current = e.currentTarget;
		//点击歌手名，跳转歌手信息页
		wx.setStorage({
			key: 'singerid',
			data: current.dataset.singerid
		});
		wx.navigateTo({
			url: '../singer/singer',
		});
	}
})