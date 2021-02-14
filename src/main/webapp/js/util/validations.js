/*
 * Jquery validation 설정
 * /js/lib/jquery/dist/jquery.validate.min.js 필요
 */
$.extend($.validator.messages, {
	required : "필수 입력값입니다.",
	remote : "항목을 수정하세요.",
	email : "유효하지 않은 E-Mail주소입니다.",
	url : "유효하지 않은 URL입니다.",
	date : "올바른 날짜를 입력하세요.",
	dateISO : "올바른 날짜(YYYY-MM-DD)를 입력하세요.", // YYYY-MM-DD 형태의 날짜
	number : "유효한 숫자가 아닙니다.", // 모든 숫자 (음수, 소수)
	digits : "숫자만 입력 가능합니다.", // 0-9 숫자
	creditcard : "신용카드 번호가 바르지 않습니다.",
	equalTo : "같은 값을 다시 입력하세요.",
	extension : "올바른 확장자가 아닙니다.",
	maxlength : $.validator.format("{0}자를 넘을 수 없습니다."),
	minlength : $.validator.format("{0}자 이상 입력하세요."),
	rangelength : $.validator.format("문자 길이가 {0} 에서 {1} 사이의 값을 입력하세요."),
	range : $.validator.format("{0} 에서 {1} 사이의 값을 입력하세요."),
	max : $.validator.format("{0} 이하의 값을 입력하세요."),
	min : $.validator.format("{0} 이상의 값을 입력하세요."),
	minByteLength : $.validator.format("{0}자 이상 입력하세요."),
	dateChk : $.validator.format("시작일이 종료일보다 클 수 없습니다."),
	numChk : $.validator.format("시작숫자가 종료숫자보다 클 수 없습니다."),
	dateChk2 : $.validator.format("시작일이 종료일보다 클 수 없습니다."), // 시작일 쪽에 추가
	numChk2 : $.validator.format("시작숫자가 종료숫자보다 클 수 없습니다."), // 시작숫자 쪽에 추가
	maxByteLength : $.validator.format("{0}자를 넘을 수 없습니다."),
	rangeByteLength : $.validator.format("문자 길이가 {0} 에서 {1} 사이의 값을 입력하세요."),
	time : $.validator.format("올바른 시간(HH:MM)을 입력하세요.")
});


$.validator.setDefaults({
	ignoreTitle : true,
	onkeyup : false,
	onclick : false,
	onfocusout : false,
	showErrors : function(errorMap, errorList) {
		if (this.numberOfInvalids()) {
			alert($("label[for=" + errorList[0].element.id + "]").text()
					+ " : " + errorList[0].message);
			errorList[0].element.focus(); // errorList[0].element는 dom object임
		}
	}
});

/* input 파일사이즈 체크 */
$.validator.addMethod('fileSize', function(value, element, param) {
	return this.optional(element)
			|| (element.files[0].size <= (param * 1000000))
});

/* 날짜 비교 */
$.validator.addMethod("dateChk", function(value, element, param) {
	var result = new Date(value) > new Date($('#' + param).val()) ? false
			: true;
	return result;
});

/* 날짜 비교 : 범위의 to 데이터가 없더라도 true */
$.validator.addMethod("dateChk2", function(value, element, param) {
	if (isEmpty($('#' + param).val()))
		return true;
	var result = new Date(value) > new Date($('#' + param).val()) ? false
			: true;
	return result;
});

/* 숫자 범위 비교 */
$.validator.addMethod("numChk", function(value, element, param) {
	var _from = value * 1;
	var _to = $('#' + param).val() * 1;
	var result = _from > _to ? false : true;
	return result;
});

/* 숫자 범위 비교 : 범위의 to 데이터가 없더라도 true */
$.validator.addMethod("numChk2", function(value, element, param) {
	if (isEmpty($('#' + param).val())) {
		return true;
	}
	var _from = value * 1;
	var _to = $('#' + param).val() * 1;
	var result = _from > _to ? false : true;
	return result;
});

/* 문자열의 Byte 길이를 반환 */
String.prototype.getByteLength = function() {
	// for(b=i=0;c=this.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
	for (b = i = 0; c = this.charCodeAt(i++); b += c >> 11 ? 2 : c >> 7 ? 2 : 1)
		;
	return b;
};

/* 한글, 영어를 체크하여 계산된 바이트 길이를 최소 길이와 비교 */
$.validator.addMethod('minByteLength', function(value, element, param) {
	var nMin = param;
	var nBytes = $.type(value) !== "string" ? 0 : value.getByteLength(); // 문자열의
																			// Byte
																			// 길이를
																			// 반환(한글은
																			// 2byte이며
																			// 영숫자는
																			// 1byte)
	return this.optional(element) || (nBytes === 0 || nBytes >= nMin);
});

/* 한글, 영어를 체크하여 계산된 바이트 길이를 최대 길이와 비교 */
$.validator.addMethod('maxByteLength', function(value, element, param) {
	var nMax = param;
	var nBytes = $.type(value) !== "string" ? 0 : value.getByteLength(); // 문자열의
																			// Byte
																			// 길이를
																			// 반환(한글은
																			// 2byte이며
																			// 영숫자는
																			// 1byte)
	return this.optional(element) || (nBytes === 0 || nBytes <= nMax);
});

/* 한글, 영어를 체크하여 계산된 바이트 길이를 최소 길이와 최대 길이 비교 */
$.validator.addMethod('rangeByteLength', function(value, element, params) {
	var nMin = params.min;
	var nMax = params.max;
	var nBytes = $.type(value) !== "string" ? 0 : value.getByteLength(); // 문자열의
																			// Byte
																			// 길이를
																			// 반환(한글은
																			// 2byte이며
																			// 영숫자는
																			// 1byte)
	return this.optional(element)
			|| (nBytes === 0 || (nBytes >= nMin && nBytes <= nMax));

});

/* 시간 포맷 체크 hh:mm */
$.validator.addMethod('time', function(value, element, param) {
	return value == '' || value.match(/^([01][0-9]|2[0-3]):[0-5][0-9]$/);
});

/* 한글, 영어를 체크하여 계산된 바이트 길이를 최소 길이와 최대 길이 비교 */
$.validator.addMethod('rangeByteLength', function(value, element, params) {
	var nMin = params.min;
	var nMax = params.max;
	var nBytes = $.type(value) !== "string" ? 0 : value.getByteLength(); // 문자열의
																			// Byte
																			// 길이를
																			// 반환(한글은
																			// 2byte이며
																			// 영숫자는
																			// 1byte)
	return this.optional(element)
			|| (nBytes === 0 || (nBytes >= nMin && nBytes <= nMax));

});

String.prototype.string = function(len) {
	var s = '', i = 0;
	while (i++ < len) {
		s += this;
	}
	return s;
};
String.prototype.zf = function(len) {
	return "0".string(len - this.length) + this;
};
Number.prototype.zf = function(len) {
	return this.toString().zf(len);
};
String.prototype.date = function() {
	return this.replace(/[-/:.\s]/gi, "")
};