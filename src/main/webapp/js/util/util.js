/**
 * @FileName 	util.js
 * @author 		yjkim@mind-one.co.kr
 * @Date 		2020.06.24
 * @Description 공통 모듈 (ajax, code, menu 등)
 * 작성일			작성자					작성내용
 * 2021.01.25	ewon@mind-one.co.kr 	시스템 구분에 따른 메뉴 조회
 */


/*
 * Ajax 공통
 */
var commonAjax = {

	/**
	 * get 타입 ajax (return되는 데이터는 async가 false일때만 받을 수 있음)
	 * @param url 보낼 url 
	 * @param param 파라미터 (serializeArray()로 받아 처리)
	 * @param successCallBack 통신 성공 후 콜백 함수 
	 * @param async 비동기 여부 (default: true)
	 */
	getAjax: function(url, param, successCallBack, async) {
		return this.sendAjax('GET', url, param, successCallBack, async);
	},

	/**
	 * post 타입 ajax  
	 * @param url 보낼 url 
	 * @param param 파라미터 (serializeArray()로 받아 처리)
	 * @param successCallBack 통신 성공 후 콜백 함수 
	 * @param async 비동기 여부 (default: true)
	 */
	postAjax: function(url, param, successCallBack, async) {
		this.sendAjax('POST', url, param, successCallBack, async);
	},
	
	putAjax: function(url, param, successCallBack, async) {
		this.sendAjax('PUT', url, param, successCallBack, async);
	},
	
	deleteAjax: function(url, param, successCallBack, async) {
		this.sendAjax('DELETE', url, param, successCallBack, async);
	},

	/**
	 * ajax 요청 시작 
	 * @param type http 메소드 
	 * @param url 보낼 url 
	 * @param param 보낼 파라미터 데이터
	 * @param successCallBack 통신 성공 후 콜백 함수 
	 * @param errorCallBack 통신 실패 후 콜백 함수 
	 * @param async 비동기 여부 (default: true)
	 */
	sendAjax: function(type, url, param, successCallBack, async) {
		var result = [];

		if( isEmpty(async) ) {
			async = true;
		}
		
		// 날짜에서 '-' 제거 => formData(param) 을 serializeArray()로 받아 처리 
		if( param instanceof Array ) {
			for( var i in param ) {
				
				// form obj
				if( !isEmpty(param[i].name) && param[i].name.slice(-2) == "Dt" ) {
					param[i].value = replaceAll(param[i].value, "-", "");
				
				// list obj
				} else if ( isEmpty(param[i].name) ) {
					
					for( var key in param[i] ) {
						if( key.slice(-2) == "Dt" ) {
							param[i][key] = replaceAll(param[i][key], "-", "");
						}
					}
					
				}
			}
		} else {
			for(var key in param ) {
				if( key.slice(-2) == "Dt" ) {
					param[key] = replaceAll(param[key], "-", "");
				}
			}
		}
		
		var contentType = "application/x-www-form-urlencoded; charset=UTF-8";
		if( type == "POST" || type == "PUT" || ( type == "DELETE" && !isEmpty(param) ) ) {
			contentType = "application/json; charset=UTF-8";
			param = JSON.stringify(param);
		}

		//삭제 시 한번 더 물어보기 20.12.31 Wonlee 추가
		if(type == "DELETE"){
			if(!confirm("내용을 삭제하시겠습니까?"))
			{
				return false;
			}
		}
		
		$.ajax({
			url : url,
			type : type,
			data : param,
			dataType : 'json',
			async : async,
			contentType: contentType,
			success : function(data) {
				result = data;
				
				// message 발생
				if( data.resultCode == 500 ) {
					alert("처리 중 문제가 발생했습니다.");
					
				} else if( data.resultCode == 200 && type != "GET" ) {
					var msg = "";
					switch(type) {
						case "POST": msg = "저장되었습니다."; break;
						case "PUT": msg = "수정되었습니다."; break;
						case "DELETE": msg = "삭제되었습니다."; break;
					}
					alert(msg);
				}
				
				if( !isEmpty(successCallBack) ) {
					successCallBack(data);
				}
			},
			error : function(request, error) {
				alert("message: " + request.responseText + "\nerror:" + error);
			}
		});
		
		return result;
	}

}


/**
 * 공통코드 관련 
 */
var commonCode = {
	
	/**
	 * 전체 공통코드 리스트 리턴
	 */
	getAllCodeList: function() {
		var codeList = [];
		commonAjax.getAjax("/common/code", '', function(data) {
			codeList = data.list;
		}, false);
		
		return codeList;
	},
	
	/**
	 * 특정 그룹 코드 리턴
	 */
	getGrpCodeList: function(grpCd) {
		// 낙타표기법을 언더바로 변환
		grpCd = camelToUnderBar(grpCd);
		var allCodeList = this.getAllCodeList();
		
		return codeList = allCodeList.filter(function(list) {
			if( list.grpCd == grpCd )
				return true;
		});
	}
	
}


/**
 * select box 관련 함수
 */
var commonSelectBox = {
	
	/**
	 * 그리드 select box 세팅 - 공통코드
	 * @param grpCd  공통코드 그룹
	 * @param emptyYn 선택 유무 (default false)
	 */
	getGridByCode: function(grpCd, emptyYn) {
		var list = commonCode.getGrpCodeList(grpCd);
		
		var gridCodeList = [];
		
		if( isEmpty(emptyYn) || !emptyYn ) {
			gridCodeList.push({
				text: '선택',
				value: ''
			});
		}
		
		for( var i in list ) {
			gridCodeList.push({
				text: list[i].cdNm,
				value: list[i].cmmnCd
			});
		}
		
		return gridCodeList;
	},
		
	/**
	 * 그리드 select box 세팅 - ajax 호출
	 * @param url  ajax url
	 * @param param  ajax param
	 * @param text  표출할 값에 대한 컬럼명
	 * @param value  실제 값에 대한 컬럼명
	 * @param emptyYn 선택 유무 (default false)
	 */
	getGridByAjax: function(url, params, text, value, emptyYn) {
		var gridSelectList = [];
		
		commonAjax.getAjax(url, params, function(data) {
			var list = data.list;
			
			if( isEmpty(emptyYn) || !emptyYn ) {
				gridSelectList.push({
					text: '선택',
					value: ''
				});
			}
			
			for( var i in list ) {
				gridSelectList.push({
					text: list[i][text],
					value: list[i][value]
				});
			}
			
		}, false);
		
		return gridSelectList;
	},
	
	/**
	 * 그리드 select box 세팅 - 데이터
	 * @param list  가져온 데이터 리스트
	 * @param text  표출할 값에 대한 컬럼명
	 * @param value  실제 값에 대한 컬럼명
	 * @param emptyYn 선택 유무 (default false)
	 */
	getGridByData: function(list, text, value, emptyYn) {
		var gridSelectList = [];
		
		if( isEmpty(emptyYn) || !emptyYn ) {
			gridSelectList.push({
				text: '선택',
				value: ''
			});
		}
		
		for( var i in list ) {
			gridSelectList.push({
				text: list[i][text],
				value: list[i][value]
			});
		}

		return gridSelectList;
	},
	
	/**
	 * 화면 select box 세팅 - 공통코드
	 * @param selectId  option 추가할 select tag 아이디
	 * @param grpCd  공통코드 그룹
	 * @param emptyYn 선택 유무 (default false)
	 */
	setOptionByCode: function(selectId, grpCd, emptyYn) {
		var list = commonCode.getGrpCodeList(grpCd);

		var optionStr = emptyYn ? '' : '<option value="">선택</option>';
		for( var i in list ) {
			optionStr += '<option value="'+list[i].cmmnCd+'">'+list[i].cdNm+'</option>';
		}
		
		$("#"+selectId).html(optionStr);
	},
	
	/**
	 * 화면 select box 세팅 - ajax 호출
	 * @param selectId  option 추가할 select tag 아이디
	 * @param url  ajax url
	 * @param param  ajax param
	 * @param text  표출할 값에 대한 컬럼명
	 * @param value  실제 값에 대한 컬럼명
	 * @param emptyYn 선택 유무 (default false)
	 */
	setOptionByAjax: function(selectId, url, param, text, value, emptyYn) {
		var dataList = []; 
		commonAjax.getAjax(url, param, function(data) {
			dataList = data.list;
			
			var optionStr = emptyYn ? '' : '<option value="">선택</option>';
			for( var i in dataList ) {
				optionStr += '<option value="'+dataList[i][value]+'">'+dataList[i][text]+'</option>';
			}

			$("#"+selectId).html(optionStr);
		}, false);
		
		return dataList;
	},

	/**
	 * 화면 select box 세팅 - 데이터 세팅
	 * @param selectId  option 추가할 select tag 아이디
	 * @param dataList  넣을 데이터
	 * @param text  표출할 값에 대한 컬럼명
	 * @param value  실제 값에 대한 컬럼명
	 * @param emptyYn 선택 유무 (default false)
	 */
	setOptionByData: function(selectId, dataList, text, value, emptyYn) {
		
		var optionStr = emptyYn ? '' : '<option value="">선택</option>';
		for( var i in dataList ) {
			optionStr += '<option value="'+dataList[i][value]+'">'+dataList[i][text]+'</option>';
		}

		$("#"+selectId).html(optionStr);
	}
	
};


/**
 * 좌측 출력 메뉴 목록 조회
 * @returns
 */

function selectMenuList() {
	var menuList = [];
	commonAjax.getAjax("/common/menu", {eprssAt: 'Y'}, function(data) {
		menuList = data.list;
	}, false);
	return menuList;
}


function selectTapList() {
	var tapList = [];
	commonAjax.getAjax("/common/menu", {eprssAt: 'N'}, function(data) {
		tapList = data.list;
	}, false);
	
	return tapList;
}

/**
 * 20.01.12 Wonlee 추가
 * 좌측 출력 구분 메뉴 불러오기
 * @returns
 */
function selectDivisionMenuList(){
	var menuList = [];
	commonAjax.getAjax("/common/menu/division", {eprssAt: 'Y'}, function(data) {
		menuList = data.list;
	}, false);
	
	return menuList;
}


/**
 * 2depth, 3depth 메뉴의 1depth 메뉴 ID 조회 
 * @param curMenuId
 * @returns
 */
function findTopMenuId(curMenuId) {
	var upperMenuSn = '';
	
	//21.01.25 wonlee 시스템 구분에 따른 메뉴 조회
	//var menuList = selectMenuList();
	var menuList = selectDivisionMenuList();
	for( var i in menuList ) {
		if( menuList[i].menuId == curMenuId ) {
			upperMenuSn = menuList[i].upperMenuSn;
			break;
		}
	}

	return findUpperMenuId(menuList, upperMenuSn);
}
function findUpperMenuId(menuList, menuSn) {
	var upperMenuSn = '';
	var menuId = '';
	for( var i in menuList ) {
		if( menuList[i].menuSn == menuSn ) {
			upperMenuSn = menuList[i].upperMenuSn;
			menuId = menuList[i].menuId;
			break;
		}
	}

	if( isEmpty(upperMenuSn) ) {
		return menuId;
	} else {
		return findUpperMenuId(menuList, upperMenuSn);
	}
}

/**
 * 진단항목코드 값을 radar 차트 데이터로 변경
 * @param data
 * @returns
 */
function convertDgnItmCdToRadar(data) {
	var arr = new Array();
	for(var v in data) {
		if( v.startsWith('di') ) {
			switch(data[v]) {
				case "RS01": arr.push(3); break;
				case "RS02": arr.push(2); break;
				case "RS03": arr.push(1); break;
				default:	 arr.push(0);
			}
		}
	}
	return arr;
}

/**
 * 그리드에 표출할 진단항목코드 이미지
 * @param data
 * @returns
 */
function sttusDiagnosisGridImage(data) {
	var image = '';
	switch(data.value) {
		case "RS01": // 좋음
			image = "icon_light_green";
			break;
		case "RS02": // 보통
			image = "icon_light_yellow";
			break;
		case "RS03": // 나쁨
			image = "icon_light_red";
			break;
		default:
			image = "icon_light_gray";
	}
	
	return '<img src="/images/style/' + image + '.png"/>';
}


/**
 * 모달창 열기
 * @param modalUrl
 * @param width
 * @param height
 * @returns
 */
function openModal(modalUrl, width, height) {
	var modal = $(".modal");
	modal.remove();
	
	var width  = isEmpty(width) ? '1400' : width;
	var height = isEmpty(height) ? '800' : height;
	
	modal.load(modalUrl);
	modal.width(width);
	modal.height(height);
	modal.bPopup({});
}

/**
 * 모달창 닫기
 * @param modalId
 * @returns
 */
function closeModal() {
	$(".modal").bPopup().close();
}




/**
 * Data Validation Check (직접 생성, grid 사용)
 * @param rules
 * @param data
 * @param failFunc
 * @returns validation 실패 후 실행할 함수
 */
function validateData(rules, data, failFunc) {
	var flag = true;
	var msg = '';
	
	for( var key in data ) {
		if( !isEmpty(rules[key]) ) {
			var value = data[key];
			var rule = rules[key];
		
			// 필수 여부
			if( flag && !isEmpty(rule.required) ) {
				flag = isEmpty(String(value).trim()) || String(value).trim() == 'null' ? false : true;
				msg = "필수 입력값입니다.";
			}
			
			if(  !isEmpty(value) ) {
				
				// 문자열 Byte 최대 용량
				if( flag && !isEmpty(rule.maxByteLength) ) {
					flag = value.length > rule.maxByteLength ? false : true; 
					msg = rule.maxByteLength+"자를 넘을 수 없습니다.";
				}
				
				//문자열 길이 20.12.31 Wonlee 추가
				if( flag && !isEmpty(rule.maxLength) ) {
					flag = value.length > rule.maxLength ? false : true; 
					msg = rule.maxLength+"자를 넘을 수 없습니다.";
				}
				
				// 날짜 YYYY-MM-DD 형태
				if( flag && !isEmpty(rule.dateISO) ) {
					// /[0-9]{4}-[0-9]{2}-[0-9]{2}/ // => yyyy-mm-dd 형태
					var dateReg = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/; // => 유효 날짜인지도 체크
					flag = !dateReg.test(value) ? false : true;
					msg = "올바른 날짜(YYYY-MM-DD)를 입력하세요.";
				}
				
				// 숫자(정수) 여부
				if( flag && !isEmpty(rule.digits) ) {
					var numReg = /^[-|+]?\d+$/;
					flag = !numReg.test(value) ? false : true;
					msg = "숫자(정수)만 입력 가능합니다.";
	
					// 길이 체크
					if( flag ) {
						flag = value.length > 10 ? false : true;
						msg = "숫자 10자를 넘을 수 없습니다.";
					}
				}
				
				// 숫자(실수) 여부
				if( flag && !isEmpty(rule.number) ) {
					var numReg = /^[-|+]?\d+\.?\d*$/;
					flag = !numReg.test(value) ? false : true;
					msg = "유효한 숫자가 아닙니다.";
					
					// 길이 체크
					if( flag ) {
						var numArr = String(value).split(".");
						for( var i in numArr ) {
							flag = numArr[i].length > 15 ? false : true;
						}
						msg = "정수 15자, 소수점 15자를 넘을 수 없습니다.";
					}
				}
			}
			
			if( !flag ) {
				if( !isEmpty(failFunc) ) { // validation 실패 후 실행할 함수
					failFunc(msg, key);
				}
				return flag;
			}
			
		}
	}
	
	return flag;
}

