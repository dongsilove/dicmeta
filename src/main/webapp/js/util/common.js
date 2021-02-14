/**
 * @FileName 	common.js
 * @author 		yjkim@mind-one.co.kr
 * @Date 		2020.06.24
 * @Description 공통 모듈 (문자열, 숫자, 날짜 등)
 */

/**
 * 문자열이 비어있는지 확인 후 boolean 리턴
 * @param str
 * @returns
 */
function isEmpty(str) {
	if(typeof str == "undefined" || str == null || str === "") {
		return true;
	}
	
	return false;
}

/**
 * 문자열의 앞, 뒤 공백 제거
 * @param str
 * @returns
 */
function trimSide(str) {
	if( isEmpty(str) ) {
		return;
	}
	return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

/**
 * 문자열의 모든 공백 제거
 * @param str
 * @returns
 */
function trim(str) {
	if( isEmpty(str) ) {
		return;
	}
	return str.replace(/\s/g, '');
}

/**
 * 문자열의 특정 문자 대체
 * @param str
 * @param before
 * @param after
 * @returns
 */
function replaceAll(str, before, after) {
	if( isEmpty(str) ) {
		return ""
	}
	return str.split(before).join(after);
}

/**
 * null인 값을 특정 값으로 변경
 * @param str
 * @param defaultVal
 * @returns
 */
function nvl(str, defaultVal) {
	var defaultValue = "";

	if(typeof defaultVal != 'undefined') {
		defaultValue = defaultVal;
	}
	
	if( isEmpty(str) ) {
		return defaultValue;
	}

	return str;
}

/**
 * 배열 중복 제거
 * @param arr
 * @returns
 */
function removeArrayDuplicates(arr) {
	return arr.filter(function(item, pos, self) {
		return self.indexOf(item) == pos;
	});
}

/**
 * array에서 index로 요소 제거
 * @param arr
 * @param idx
 * @returns
 */
function removeArrayWithIndex(arr, idx) {
	if (idx > -1)
		arr.splice(idx, 1)
	return arr;
}

/**
 * array에서 값이 없는 항목 제거
 * @param arr
 * @returns
 */
function removeArrayWithNull(arr) {
	return arr.filter( function(data) {
		if( !isEmpty(data) )
			return true;
	});
}

/**
 * 숫자 오름차순 정렬 및 중복값 제거
 * 
 * @param arr
 * @returns
 */
function sortReduceNumber(arr) {
	var returnArr = arr.slice().sort(function(a, b) {
		return a - b;
	}).reduce(function(a, b) {
		if (a.slice(-1)[0] !== b)
			a.push(b);
		return a;
	}, []);

	return returnArr;
}

/**
 * 첫번째 글자 대문자로 변경
 * @param value
 * @returns
 */
function upperFirstLetter(value) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * 카멜표기법 -> 언더바(대문자)
 * @param str
 * @returns
 */
function camelToUnderBar(str) {
	var result = str.replace(/([A-Z])/g, function(arg){
        return "_"+arg;
	});
	
	return result.toUpperCase();
}

/**
 * 숫자 3자리마다 콤마 찍기
 * @param num
 * @returns
 */
function insertCommaToNumber(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 숫자 콤마 제거
 * @param num
 * @returns
 */
function removeCommaToNumber(num) {
	return num.toString().replace(/[^\d]+/g, '');
}


/**
 * 계산 함수
 */
var calculator = {
	
	/**
	 * 개수
	 * (zeroYn false면 0 대신 공백 반환)
	 */
	count: function(oriList, zeroYn) {
		var list = removeArrayWithNull(oriList);
		var count = list.length;
		count = count==0 ? '':count;
		
		if( zeroYn && isEmpty(count) ) {
			count = 0;
		}
		
		return count;
	},

	/**
	 * 최소값
	 * (zeroYn false면 0 대신 공백 반환)
	 */
	min: function(oriList, zeroYn) {
		var list = removeArrayWithNull(oriList);
		var min = list.length==0?'':Math.min.apply(null, list);
		
		if( zeroYn && isEmpty(min) ) {
			min = 0;
		}
		
		return min;
	},

	/**
	 * 최대값
	 * (zeroYn false면 0 대신 공백 반환)
	 */
	max: function(oriList, zeroYn) {
		var list = removeArrayWithNull(oriList);
		var max = list.length==0?'':Math.max.apply(null, list);
		
		if( zeroYn && isEmpty(max) ) {
			max = 0;
		}
		
		return max;
	},

	/**
	 * 합계
	 * (zeroYn false면 0 대신 공백 반환)
	 */
	sum: function(oriList, zeroYn) {
		var list = removeArrayWithNull(oriList);
		
		var sum = 0;
		for( var i in list ) {
			sum += list[i];
		}
		sum = list.length==0?'':sum;
		
		if( zeroYn && isEmpty(sum) ) {
			sum = 0;
		}
		
		return sum;
	},

	/**
	 * 평균 = 변량의 합/개수
	 * (zeroYn false면 0 대신 공백 반환)
	 */
	average: function(list, zeroYn) {
		var sum = this.sum(list);
		var count = this.count(list);
		var average = 0;
		if( !isEmpty(count) ) {
			average = sum/count;
		}
		average = isEmpty(count)?'':average.toFixed(2);

		if( zeroYn && isEmpty(average) ) {
			average = Number(0).toFixed(2);
		}
		
		return average;
	},

	/**
	 * 편차 = 변량-평균
	 */
	deviationList: function(list) {
		var average = this.average(list);
		var devList = [];
		for( var i in list ) {
			devList[i] = list[i] - average;
		}
		return devList;
	},
	
	/**
	 * 편차제곱 = 편차*편차
	 */
	deviationSquaredList: function(list) {
		var devSqList = [];
		for( var i in list ) {
			devSqList[i] = list[i] * list[i];
		}
		return devSqList;
	},
	
	/**
	 * 분산 = 편차제곱의 평균
	 */
	variance: function(list) {
		var sum = this.sum(list);
		var count = this.count(list);
		var average = sum/count;
		
		return average;
	},
	
	/**
	 * 표준편차 = 분산의 제곱근
	 * (zeroYn false면 0 대신 공백 반환)
	 */
	standardDeviation: function(oriList, zeroYn) {
		var list = removeArrayWithNull(oriList);
		var stdev = 0;
		
		if( list.length != 0 ) {
			var devList = this.deviationList(list); // 편차
			var devSqList = this.deviationSquaredList(devList); // 편차제곱
			var variance = this.variance(devSqList); // 분산
			
			stdev = Math.sqrt(variance).toFixed(2); // 표준편차
		}
		stdev = list.length==0?'':stdev;
		
		if( zeroYn && isEmpty(stdev) ) {
			stdev = 0;
		}
		
		return stdev;
	},

	/**
	 * 몇% 값
	 */
	percentValue: function(oriList, percent, zeroYn) {
		var sum = this.sum(oriList, true);
		var value = sum * percent / 100;
		value = value==0?'':value;
		
		if( zeroYn && isEmpty(value) ) {
			value = 0;
		}
		return value;
	},
		
};


/**
 * 날짜를 yyyy-mm-dd 형태로 변환
 * @param dateVal
 * @returns
 */
function getDateStr(dateVal) {
	var date = isEmpty(dateVal) ? new Date : dateVal;
	
	var year  = date.getFullYear();
	var month = (date.getMonth()+1)>=10?(date.getMonth()+1):"0"+(date.getMonth()+1);
	var day   = date.getDate()>=10?date.getDate():"0"+date.getDate();
	
	return year + "-" + month + "-" + day;
}

/**
 * 한달 전 날짜 yyyy-mm-dd 형태로 반환
 * @param dateVal
 * @returns
 */
function getLastMonthDate(dateVal) {
	var date = dateVal;
	var month = date.getMonth();
	date.setMonth(month-1);
	
	return getDateStr(date);
}

/**
 * 7일 전 날짜 yyyy-mm-dd 형태로 반환
 * @param dateVal
 * @returns
 */
function getLastWeekDate(dateVal) {
	var date = dateVal;
	var day = date.getDate();
	date.setDate(day-7);
	
	return getDateStr(date);
}

/**
 * 검색 조건 날짜 세팅 (오늘)
 * @param dateId  input id
 * @returns
 */
function setSearchDate(dateId) {
	var today = new Date();
	var nowDate = getDateStr(today);
	
	$("#"+dateId).val(nowDate);
}

/**
 * 검색 조건 세팅 (오늘 날짜 기준으로 7일 전)
 * @param fromDateId  input id
 * @param toDateId  input id
 * @returns
 */
function setSearchDateWeek(fromDateId, toDateId) {
	var today = new Date();
	var nowDate = getDateStr(today);
	var lastDate = getLastWeekDate(today);
	
	$("#"+fromDateId).val(lastDate);
	$("#"+toDateId).val(nowDate);
}

/**
 * 검색 조건 세팅 (오늘 날짜 기준으로 한달 전)
 * @param fromDateId  input id
 * @param toDateId  input id
 * @returns
 */
function setSearchDateMonth(fromDateId, toDateId) {
	var today = new Date();
	var nowDate = getDateStr(today);
	var lastDate = getLastMonthDate(today);
	
	$("#"+fromDateId).val(lastDate);
	$("#"+toDateId).val(nowDate);
}



/**
 * 로그인 쿠기 관련
 */
function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}
function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}
function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}

