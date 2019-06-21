(function() {
	var myCanvas = document.getElementById('myCanvas')
	var ctx = myCanvas.getContext('2d')
	// 设置关卡
	// scrollBar 转动球的数量 waitBar 等待球的数量 speed 转动的速度

	var leaveArr = [{
		scrollBar: 3,
		waitBar: 5,
		speed: 200
	}, {
		scrollBar: 4,
		waitBar: 6,
		speed: 180
	}, {
		scrollBar: 5,
		waitBar: 5,
		speed: 160
	}, {
		scrollBar: 6,
		waitBar: 5,
		speed: 140
	}, {
		scrollBar: 7,
		waitBar: 5,
		speed: 120
	}, {
		scrollBar: 8,
		waitBar: 5,
		speed: 100
	}, {
		scrollBar: 10,
		waitBar: 10,
		speed: 80
	}]
	// 每一关的速度
	var speed = leaveArr[getQueryString() - 1].speed
	// 封装获取url参数
	function getQueryString() {
		return location.search.split('=')[1]
	}
	//getQueryString()
	// 设置滚动球
	var scrollBarArr = []
	// 转动球的数量
	var scrollBarNum = leaveArr[getQueryString() - 1].scrollBar
	for(var i = 0; i < scrollBarNum; i++) {
		var angle = 360 / scrollBarNum * i
		scrollBarArr.push({
			angle: angle,
			content: ''
		})

	}

	// 设置等待球
	var waitBarArr = []
	// 等待球的数量
	var waitBarNum = leaveArr[getQueryString() - 1].waitBar
	for(var i = 0; i < waitBarNum; i++) {
		waitBarArr.push({
			angle: '',
			content: i + 1
		})
	}

	// 绘制中间的大圆
	function drawBig() {
		ctx.save()
		ctx.beginPath()
		ctx.arc(400, 200, 50, 0, Math.PI * 2)
		ctx.closePath()
		ctx.fillStyle = 'white'
		ctx.fill()
		ctx.restore()
		// 绘制关卡
		ctx.save()
		ctx.translate(400, 200)
		ctx.font = '60px 微软雅黑'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillStyle = 'gold'
		ctx.fillText(getQueryString(), 0, 0)
		ctx.restore()

	}

	// 绘制滚动球

	function drawScroll() {
		for(var i = 0; i < scrollBarArr.length; i++) {
			scrollBarArr[i].angle += 10
			if(scrollBarArr[i].angle >= 360) {
				scrollBarArr[i].angle = 0
			}
			//		console.log(scrollBarArr[i])
			// 绘制线
			ctx.save()
			ctx.translate(400, 200)
			ctx.rotate(Math.PI / 180 * scrollBarArr[i].angle)
			ctx.beginPath()
			ctx.moveTo(0, 0)
			ctx.lineTo(0, -150)
			ctx.closePath()
			ctx.strokeStyle = 'white'
			ctx.stroke()
			ctx.restore()
			// 绘制球
			ctx.save()
			ctx.translate(400, 200)
			ctx.rotate(Math.PI / 180 * scrollBarArr[i].angle)
			ctx.beginPath()
			ctx.arc(0, -150, 10, 0, Math.PI * 2)
			ctx.closePath()
			ctx.fillStyle = 'white'
			ctx.fill()
			ctx.restore()
			// 绘制文字
			ctx.save()
			ctx.translate(400, 200)
			ctx.rotate(Math.PI / 180 * scrollBarArr[i].angle)
			ctx.font = '18px 微软雅黑'
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'
			ctx.fillStyle = 'black'
			ctx.fillText(scrollBarArr[i].content, 0, -150)
			ctx.restore()
		}
	}

	// 绘制等待球
	function drawWait() {
		for(var i = 0; i < waitBarArr.length; i++) {
			// 绘制圆
			ctx.save()
			ctx.translate(400, 200)
			ctx.beginPath()
			ctx.arc(0, 200 + 30 * i, 10, 0, Math.PI * 2)
			ctx.closePath()
			ctx.fillStyle = 'white'
			ctx.fill()
			ctx.restore()
			// 绘制文字
			ctx.save()
			ctx.translate(400, 200)
			ctx.font = '18px 微软雅黑'
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'
			ctx.fillStyle = 'black'
			ctx.fillText(waitBarArr[i].content, 0, 200 + 30 * i)
			ctx.restore()
		}
	}
	// 滚动球旋转
	setInterval(function() {
		ctx.clearRect(0, 0, 800, 380)
		drawScroll()
		drawBig()
	}, speed)
	// 页面点击
	document.onclick = function() {
		var obj = waitBarArr.shift()
		obj.angle = 170
		//	console.log(waitBarArr)
		ctx.clearRect(0, 380, 800, 400)
		drawWait()
		scrollBarArr.push(obj)
		// 闯关成功
		if(waitBarArr.length == 0) {
			alert('闯关成功')
			setTimeout(function() {
				location.href = 'index.html?leave=' + (+getQueryString() + 1)
			}, 200)
			return
		}
		var flag = false
		// 闯关失败
		for(var i = 0; i < scrollBarArr.length; i++) {
			for(var j = 0; j < scrollBarArr.length; j++) {
				if(i != j) {
					if(scrollBarArr[i].angle > scrollBarArr[j].angle - 10 && scrollBarArr[i].angle < scrollBarArr[j].angle + 10) {
						flag = true
					}
				}
			}
		}
		if(flag) {
			alert('闯关失败')
			setTimeout(function() {
				location.href = 'index.html?leave=' + 1
			}, 200)
		}
	}

	function init() {
		drawScroll()
		drawBig()
		drawWait()
	}
	init()
}())