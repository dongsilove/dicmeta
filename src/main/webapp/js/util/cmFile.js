/*******************
 * cmFile 첨부파일
 * 2020.05.22 박이정(마인드원)
 *******************/

var cmFile = {
		
	getCmFile : function(_tblNm,_tblSn){ 
		var dfd = $.Deferred();
		var param = {tblNm : _tblNm, tblSn:_tblSn};
		$.ajax({
	    	url: "/sply/cmfile/getCmFile",
	    	type : "POST",
	    	data: JSON.stringify(param),
	    	dataType : "json",
	    	contentType : "application/json;charset=UTF-8",
	    	success: function (result) {
	    		console.log(result);
	    		if(!result.data) { 
	    			return dfd.reject();
	    		} else {
	    			return dfd.resolve(result.data);
	    		}
	        }
			,error : function(request, error) {
				return dfd.reject();
				alert("message: " + request.responseText + ", error:" + error);
			}
		});
		return dfd.promise();
	},
	fileDownload : function (savePath,saveFileNm,realFileNm) {
		if(savePath!=null&&saveFileNm!=null&&realFileNm!=null){
			location.href = "/sply/cmfile/fileDownload?savePath="+savePath+"&saveFileNm="+saveFileNm+"&realFileNm="+realFileNm;
		}
	},
	//개별 다운로드 
	fn_fileDownload : function(_url) {
		$.fileDownload( _url,{
			httpMethod: "GET",
			successCallback: function (url) {
			},
			failCallback: function(responseHtml, url) {
				alert('파일 다운로드 실패!\n관리자에게 문의 주세요.');
			}
		});
	}
	
}



function fileUploadForm(){
	$("#fileDiv").empty();
	$("#fileDiv").append('<input type="file" name="files[]" id="file_input" multiple="multiple" data-jfiler-limit="3"/>' );
	$('#file_input').filer({
		showThumbs: true,
		addMore: false,
		allowDuplicates: false,
		captions: {
            button: "파일 선택",
            feedback: "",
            feedback2: "개의 파일이 선택되었습니다.",
            drop: "Drop file here to Upload",
            removeConfirmation: "삭제하시겠습니까?",
            errors: {
                filesLimit: "{{fi-limit}}개 파일까지 업로드 가능합니다.",
                filesType: "Only Images are allowed to be uploaded.",
                filesSize: "{{fi-name}} is too large! Please upload file up to {{fi-fileMaxSize}} MB.",
                filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB.",
                folderUpload: "You are not allowed to upload folders."
            }
        }
	});
}

function fileDownloadForm(file) {
	var layout = "";
	layout +='<a class="pop_btn" onclick="fileDownload(\''+file.savePath+'\',\''+file.saveFileNm+'\',\''+file.realFileNm+'\')">'+file.realFileNm+'</a>';
	return layout;
}



function getfileSize(x) {
	if(x==0){
		return x;
	}
	var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
	var e = Math.floor(Math.log(x) / Math.log(1024));
	return (x / Math.pow(1024, e)).toFixed(2) + " " + s[e];
};
