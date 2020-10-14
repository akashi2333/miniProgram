let net = require("../../utils/require.js")
let api = require("../../utils/api.js")
let app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    isSearch: false,
    cities: [],
    tempArray: [],
		inside_btn_font: "#FFFFFF",
		inside_btn_bg: "#7377FF",
		outside_btn_font: "#7377FF",
		outside_btn_bg: "#FFFFFF",
		user_location: '正在获取位置',
		searchInput: '请输入城市名或拼音',
		popularCity: [
			{
				city: "WuHan",
			},
			{
				city: "WenZhou",
			},
			{
				city: "WenZhou",
			},
			{
				city: "WenZhou",
			}

		],
		loading: true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this
		var locationInfo = {
			"latitude": '',
			"longitude": ''
		}
		wx.getLocation({
			type: 'gcj02',
			altitude: false,
			success: (result) => {
				locationInfo["latitude"] = result.latitude
				locationInfo["longitude"] = result.longitude
				api.reverseGeocoder(locationInfo).then(res => {
					console.log(res)
					this.setData({
						user_location: res.result.address_component.city
					})
				})
			},
			fail: () => { },
			complete: () => {
			}
		});
		wx.getStorage({
			key: '1',
			success: (result) => {
				this.setData({
					cities: result.data
				})
			},
			fail: function (e) {
				console.log(e)
				api.getCities(1).then(res => {
					that.setData({
						cities: res.data
					})
					wx.setStorage({
						key: '1',
						data: res.data
					});
				})
			}
		});
		wx.getStorage({
			key: '0',
			success: (result) => {

			},
			fail: function (e) {
				console.log(e)
				api.getCities(0).then(res => {
					console.log(res)
					wx.setStorage({
						key: '0',
						data: res.data
					});
				})
			}
		});

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.setData({
			loading: false
		})
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
	 * 自定义函数
	 */
	/**
	 * 切换到境内页面
	 */
	to_inside: function () {
		this.setData({
			inside_btn_font: "#FFFFFF",
			inside_btn_bg: "#7377FF",
			outside_btn_font: "#7377FF",
			outside_btn_bg: "#FFFFFF"
		})
		wx.getStorage({
			key: '1',
			success: (result) => {
				console.log(result)
				this.setData({
					cities: result.data,
					tempArray: []
				})
			}
		});

	},
	/**
	 * 切换到境外页面
	 */
	to_outside: function () {
		this.setData({
			outside_btn_font: "#FFFFFF",
			outside_btn_bg: "#7377FF",
			inside_btn_font: "#7377FF",
			inside_btn_bg: "#FFFFFF"
		})
		wx.getStorage({
			key: '0',
			success: (result) => {
				this.setData({
					cities: result.data,
					tempArray: []
				})
			}
		});
	},
	/**
	 * 键盘确认事件
	 */
	confirmSearch: function (e) {
		var searchResult = []
		var temp = this.data.cities
		// console.log(this.data.cities)
		this.data.cities.forEach(element => {
			// console.log(element)
			if (element.city.indexOf(e.detail.value) != -1) {
				console.log(element)
				searchResult.push(element)
			}
		});
		// console.log(searchResult)
		this.setData({
			tempArray: temp,
			cities: searchResult
		})

	},
	/**
	 * 开始输入事件
	 */
	startSearch: function () {
		var temp = this.data.tempArray
		// console.log(temp)
		// console.log(this.data.cities)
		if (temp.length != 0) {
			this.setData({
				cities: temp
			})
		}
		// console.log(this.data.cities)
		this.setData({
			isSearch: true,
			searchInput: ''
		})
	},
	exitSearch: function () {

		this.setData({
			isSearch: false,
			searchInput: '请输入城市名或拼音'
		})
	},
	/**
	 * 选择城市，并跳转回上一个界面
	 */
	selectCity: function (e) {
		console.log(e)
		var result;
		if (e.currentTarget.dataset.city) {
			result = {
        "userCity": e.currentTarget.dataset.city,
        'city': e.currentTarget.dataset.city
			}
		} else {
      result = {
        "userCity": this.data.user_location,
        'city': this.data.user_location
			}
    }
		console.log(app.globalData)
		//当前页面
		let pages = getCurrentPages();

		//上一页面
		let prevPage = pages[pages.length - 2];

		//将数值信息赋值给上一页面cityItem变量
		prevPage.setData({
			user_address: result.city,
			userCity: result.userCity
		});
		console.log(result)
		wx.navigateBack({
			delta: 1
		});
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

	}
})