// pages/singerClassify/singerClassify.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		A : "",
		B : "",
		C : "",
		D : "",
		E : "",
		F : "",
		G : "",
		H : "",
		I : "",
		J : "",
		K : "",
		L : "",
		M : "",
		N : "",
		O : "",
		P : "",
		Q : "",
		R : "",
		S : "",
		T : "",
		U : "",
		V : "",
		W : "",
		X : "",
		Y : "",
		Z : "",
		other : "",
		offset: 0 
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		wx.request({
			url: 'http://114.67.144.118:6589/artist/list',
			success: function(res){
				that.setData({
					A: res.data.data["A"],
					B: res.data.data["B"],
					C: res.data.data["C"],
					D: res.data.data["D"],
					E: res.data.data["E"],
					F: res.data.data["F"],
					G: res.data.data["G"],
					H: res.data.data["H"],
					I: res.data.data["I"],
					J: res.data.data["J"],
					K: res.data.data["K"],
					L: res.data.data["L"],
					M: res.data.data["M"],
					N: res.data.data["N"],
					O: res.data.data["O"],
					P: res.data.data["P"],
					Q: res.data.data["Q"],
					R: res.data.data["R"],
					S: res.data.data["S"],
					T: res.data.data["T"],
					U: res.data.data["U"],
					V: res.data.data["V"],
					W: res.data.data["W"],
					X: res.data.data["X"],
					Y: res.data.data["Y"],
					Z: res.data.data["Z"],
					other: res.data.data["other"]
				});
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		
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
	
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
	
	},
	singerTap : function(e){
		var current = e.currentTarget;
		//点击歌手名，跳转歌手信息页
		wx.setStorage({
			key: 'singerid',
			data: current.dataset.singerid
		});
		wx.navigateTo({
			url: '../singer/singer',
		});
	},
	scrollto : function(e){
		var that = this;
		var current = e.currentTarget.dataset.index;
		var str = "#"+current;
		const query = wx.createSelectorQuery();
		query.select(str).boundingClientRect(function (rect) {
			that.data.offset += rect.top;
			wx.pageScrollTo({
				scrollTop: that.data.offset,
			})
		}).exec();
	}
})