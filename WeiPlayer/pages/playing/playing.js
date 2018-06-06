// pages/playing/playing.js
//获取音频上下文
var audioCtx = wx.createInnerAudioContext();
function controlTime (wholeSec) {
	//控制时间格式的方法 wholeSec为总秒数，ele为要设置格式的标签
	//00:00
	wholeSec = Math.floor(wholeSec);
	var minTen, minPer, secTen, secPer;
	minTen = Math.floor(wholeSec / 60 / 10);
	minPer = Math.floor(wholeSec / 60) % 10;
	secTen = Math.floor((wholeSec - (minTen * 60 * 10 + minPer * 60)) / 10);
	secPer = wholeSec % 10;
	return "" + minTen + minPer + ":" + secTen + secPer;
};
//处理歌词的方法
function handleLyrics(str){
	if(str !== undefined) {
		var arr = [];
		arr = str.split("]");
		for (var i = 0; i < arr.length; i++) {
			arr[i] = arr[i].slice(0, -9);
		}
		return arr;
	}
}
Page({
	data: {
		audioSrc : null,
		songid : "",
		songPic : "",
		singerid : "",
		time : 0,
		title : "",
		author : "",
		currentTime : "00:00",
		lyrics : "",
		duration: "00:00",
		playIcon: "icon-play",
		timePercent: 0,
		//定时器
		playingTimer: null,
	},
	onLoad: function (options) {
		var that = this;
		wx.getStorage({
			key: 'songid',
			success: function (res) {
				that.setData({
					songid: res.data
				});
			}
		});
	},
	onReady: function () {
		//在ready中请求，否则songid为空
		var that = this;
		wx.request({
			url: "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=" + that.data.songid,
			success: function (res) {
				audioCtx.src = res.data.bitrate.show_link;
				audioCtx.autoplay = true;
				that.setData({
					audioSrc: res.data.bitrate.show_link,
					songPic: res.data.songinfo.pic_radio,
					title: res.data.songinfo.title,
					author: res.data.songinfo.author,
					duration: controlTime(audioCtx.duration),
					singerid: res.data.songinfo.ting_uid
				});
				wx.request({
					url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid='+that.data.songid,
					success : function(res){
						if (res.data.lrcContent) {
							that.setData({
								lyrics: handleLyrics(res.data.lrcContent)
							});
						}
					}
				});
			}
		});		
		//设置定时器
		that.data.playingTimer = setInterval(function(){
			that.setData({
				time : that.data.time+1,
				currentTime: controlTime(that.data.time),
				duration: controlTime(audioCtx.duration),
				timePercent: that.data.time/Math.floor(audioCtx.duration)*100
			});
		},1000);
		audioCtx.onPlay(function(){
			 console.log("正在播放")
			 that.setData({
				 playIcon: "icon-play",
				 duration: controlTime(audioCtx.duration)
			 });
		});
		audioCtx.onPause(function(){
			console.log("暂停");
			console.log(that.data.time)
			console.log(Math.floor(audioCtx.duration))
			if (that.data.time >= Math.floor(audioCtx.duration)) {
				console.log(1)
				clearInterval(that.data.playingTimer);
				that.setData({
					time: Math.floor(audioCtx.duration),
					currentTime : controlTime(Math.floor(audioCtx.duration)),
					playIcon: "icon-pause",
					timePercent: 100,
					playIcon: "icon-pause"
				});
			}
		});
		audioCtx.onStop(function(){
			console.log("停止");
			if (that.data.time >= Math.floor(audioCtx.duration)) {
				that.setData({
					playIcon: "icon-pause",
					timePercent: 100,
					playIcon: "icon-pause"
				});
				clearInterval(that.data.playTimer);
			}
		});
	},
	onShow: function () {
		
	},
	onHide : function(){
		
	},
	onLaunch : function(){
		
	},
	onUnload : function(){
		audioCtx.stop();
	},
	playing : function(){
		var that = this;
		if (that.data.playIcon == "icon-play") {
			that.setData({
				playIcon: "icon-pause"
			});
			audioCtx.pause();
			clearInterval(that.data.playingTimer);
		} else {
			that.setData({
				playIcon: "icon-play"
			});
			audioCtx.play();
			if (that.data.time >= Math.floor(audioCtx.duration)) {
				that.setData({
					time: 0,
					currentTime: "00:00",
					timePercent: 0
				});
				clearInterval(that.data.playingTimer);
				that.data.playingTimer = setInterval(function () {
					that.setData({
						time: that.data.time + 1,
						currentTime: controlTime(that.data.time),
						timePercent: that.data.time / Math.floor(audioCtx.duration) * 100
					});
				}, 1000);
			} else {
				clearInterval(that.data.playingTimer);
				that.data.playingTimer = setInterval(function () {
					that.setData({
						time: that.data.time + 1,
						currentTime: controlTime(that.data.time),
						timePercent: that.data.time / Math.floor(audioCtx.duration) * 100
					});
				}, 1000);
			}
		}
	},
	singInfo : function(e){
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