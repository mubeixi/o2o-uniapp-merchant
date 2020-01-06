const compare_obj = (obj1, obj2) => {
	for (var i in obj1) {
		if (!obj1.hasOwnProperty(i)) continue;
		if (!obj2.hasOwnProperty(i) || obj1[i] != obj2[i]) {
			return false
		}
	}
	return true

}

const findArrayIdx = (arr, key_val_arr, full = false) => {


	for (var i in arr) {
		if (typeof arr[i] != 'object') continue

		//用来比较对象
		if (compare_obj(key_val_arr, arr[i])) {
			if (!full) return i;
			return { val: arr[i], idx: i }
		}

	}
	return false
}

Component({
	pageLifetimes: {
		show() {
			console.log(2222222222222222,wx.getStorageSync('tabkey'))
			let idx = wx.getStorageSync('tabkey')
			if(!idx)idx=0

			this.setData({
				selected: idx
			})
			console.log(this.getTabBar())
			// if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			// 	this.setData({
			// 		selected: idx
			// 	})
			// }
		}
	},
	data: {
		selected: 0,
		color: "#7A7E83",
		selectedColor: "#3cc51f",
		list: [{
			pagePath: "pages/index/index",
			iconPath: "/static/tabbar/home.png",
			selectedIconPath: "/static/tabbar/homeCheck.png",
			text: "首页"
		}
		]
	},
	attached() {},
	methods: {
		switchTab(e) {
			const data = e.currentTarget.dataset
			let url = data.path
			//let idx = findArrayIdx(this.data.list, { pagePath:url})
			wx.setStorageSync('tabkey', data.index)
			if(url[0]!='/'){
				url = '/'+url
			}
			wx.switchTab({
				url
			})
			this.setData({
				selected: data.index
			})
		}
	}
})
