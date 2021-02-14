/**
 * @FileName 	commUtil.js
 * @author 		ljpark
 * @Date 		2021.02.14
 * @Description 공통
 * @History
 * DATE			AUTHOR		NOTE	
 * -------------------------------------------------
 * 2021.02.14	ljpark		신규
 */

var _commUtils = {
	stripXSS : function(value) {
		if (typeof value == "undefined" || value == "") return;
		
		value = value.replace("\0", ""); // null문자 방지
		value = value.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">"); // HTML언어 특수문자를 '<', '>'로 변경
		value = value.replace(/&quot;/gi, "\""); // HTML언어 특수문자를 더블쿼테이션(")로 변경
		value = value.replace(/&apos;/gi, "\'");// HTML언어 특수문자를 싱글쿼테이션(')로 변경
		value = value.replace(/&amp;/gi, "&");   // HTML언어 특수문자를 &로 변경
		return value;
	},
	htmlspecialchars : function(value) { // XSS 20200813 by ljpark
		if (typeof value == "undefined" || value == "") return;
		
		value = value.replace("\0", ""); // null문자 방지
		value = value.replace(/</g, "&lt;").replace(/>/gi, "&gt;"); // '<', '>' 특수문자 HTML언어로 변경
		value = value.replace(/"/g, "&quot;"); // 더블쿼테이션(") 특수문자 HTML언어로 변경
		value = value.replace(/'/g, "&apos;"); // 싱글쿼테이션(') 특수문자 HTML언어로 변경
		value = value.replace(/&/g, "&amp;");  // & 특수문자 HTML언어로 변경
		return value;
	},
	setVal : function(formId, elName, value){
		//console.log(formId+ ',' + elName + ',' + value);
		/*if(typeof(elName) != "string"){
			return;
		}*/
		
		var el = $("#"+formId+" [name=" + elName + "]");

		if(el.is("select")){
			$("#"+formId+" [name='" + elName + "']").val(value).prop("selected", true);
		}else if(el.is(":checkbox") || el.is(":radio")){ 
			$("#"+formId+" [name='" + elName + "']").prop("checked", false);
			$("#"+formId+" [name='" + elName + "']"+"[value='" + value + "']").prop("checked", true);
		}else { // text, hidden, textarea
			$("#"+formId+" [name='" + elName + "']").val(value);
		}
	},
	numberWithCommas : function(x) { // 통화형식 : 세자리마다 콤마
		if(x == undefined || x ==null){
			return "";
		}
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	removeCommas : function(x) { // 통화형식 제거 (수정시 적용!)
		x = x + "";
		return x.replace(/,/g,"");
	},
	getCodes : function(objs,grpCd) {
		console.log("grpCd : " + grpCd); 
		var returnVal = [];
		var urlT = "/common/codes/" + grpCd;
		$.ajax({
			url : urlT,
			type : "GET",
			datatype : "JSON",
			//async : false,
			success : function(list) {
				$.each(objs, function(index, item){
					//console.log(item);
					$(item).find("option").remove();
					$(item).append("<option value=''>선택</option>");
					returnVal.push({ text: '선택', value: '' });
					for (var i=0; i<dataT.length; i++) {
						var text = dataT[i].cdNm;
						var value = dataT[i].cd;
						var option = "<option value='"+value+"'>"+text+"</option>";
						$(item).append(option);
						
						returnVal.push({ text: text, value: value });
					}
				});
			},
			error : function(request, error) {
				if (request.status == 401) { alert("세션이 종료되었습니다.(세션유지시간 : 30분)"); window.location.href = "/login/actionLogout.do"; return; }  // 2019.11.13 추가 by ljpark
				console.log("message: " + request.responseText + ", error:" + error);
			}
		});

		return returnVal;
	}
}