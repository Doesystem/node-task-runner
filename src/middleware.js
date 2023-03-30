exports.initialResponse = function(req, res, next){
	res.jsondata = {
		status: {
			code: 0,
			message: ''
		}
	}
	next()
}

exports.setJsonResponse = function (req, res){
	res.json(res.jsondata)
}

exports.errorToShow = function (error, req, res, next){
	if (error.type === 'forgot-pass-confirm-invalid'){
		res.jsondata.status.code = -1
		res.jsondata.status.message = 'ไม่พบ Confirm Key นี้ในระบบโปรดตรวจสอบ Email'
	}
	else if (error.type === 'forgot-pass-email-invalid'){
		res.jsondata.status.code = -1
		res.jsondata.status.message = 'ไม่พบ Email นี้ในระบบโปรดตรวจสอบ Email'
	}
	else if (error.type === 'register-not-confirm'){
		res.jsondata.status.code = -1
		res.jsondata.status.message = 'ไม่เจอข้อมูลการยืนยันตัวตน โปรดตรวจสอบลิ้งของการยืนยันตัวตน การยืนยันตัวตนไม่สามารถใช้ลิ้งซ้ำได้'
	}
	else if (error.type === 'register-have-email'){
		res.jsondata.status.code = -1
		res.jsondata.status.message = 'email ของคุณได้ลงทะเบียนกับเว็บไซต์แล้วโปรดไปที่การเข้าสู่ระบบ'
	}
	else if (error.type === 'captcha-exception'){
		res.jsondata.status.code = -1
		res.jsondata.status.message = 'ไม่สามารถลงทะเบียนได้ โปรดเช็ค captcha'
	}
	else if (error.type === 'adm-exception'){
		res.jsondata.status.code = -2
		res.jsondata.status.message = 'is not admin'
	}
	else if (error.type === 'jwt-exception'){
		res.jsondata.status.code = -2
		res.jsondata.status.message = 'token not verify'
	}
	else {
		res.jsondata.status.code = -1
		res.jsondata.status.message = error.message
	}

	res.json(res.jsondata)
	next()
}