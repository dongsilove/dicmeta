<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
//========================================
// @brief 데이터사전 > 도메인 
//========================================
// @history 
//  	2021.02.09 박이정(마인드원) 최초작성
//========================================
%>
<!DOCTYPE html>
<html lang="ko">
<jsp:include page="/WEB-INF/jsp/layout/header.jsp"/>
<script src="/js/domains.js"></script>
<body>
    <div class="bg"></div>
    <div class="wrap">
        <jsp:include page="/WEB-INF/jsp/layout/top.jsp"/>
        <jsp:include page="/WEB-INF/jsp/layout/menu.jsp"/>

        <div class="container">
		
            <div class="title"><h1>도메인</h1></div>
            <div class="container_inner user_wrap">
                <h4> :: </h4>
                <div class="user_form">
                <form name="editForm" method="post" action="">
					<input type="hidden" name="nmode" value="">
					<input type="hidden" name="pk" value="">
					<input type="hidden" name="page" value="">
                    <table class="edit_table">
                        <colgroup>
                            <col style="width:15%">
                            <col style="auto">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th><label for="domainSn">도메인 일련번호</label></th>
                            <td><input type="text" name="domainSn" id="domainSn" value="" readonly ></td>
                        </tr>
                        <tr>
                            <th class="required"><label for="domainCl">도메인 분류</label></th>
                            <td>
                                <select name="domainCl" id="domainCl" required></select>
                            </td>
                        </tr>
                        <tr>
                            <th class="required"><label for="domainExprsnNm">도메인표현명</label></th>
                            <td><input type="text" name="domainExprsnNm" id="domainExprsnNm"  value="" ></td>
                        </tr>
                        <tr>
                            <th class="required"><label for="domainNm">도메인명</label></th>
                            <td><input type="text" name="domainNm" id="domainNm"  value="" ></td>
                        </tr>
                        <tr>
                            <th class="required"><label for="domainEnAbbr">도메인영문약어</label></th>
                            <td><input type="text" name="domainEnAbbr" id="domainEnAbbr"  value="" ></td>
                        </tr>
                        <tr>
                            <th class="required"><label for="domainEnNm">도메인영문명</label></th>
                            <td><input type="text" name="domainEnNm" id="domainEnNm"  value="" style="width:100%"></td>
                        </tr>
                        <tr>
                            <th><label for="domainDc">도메인설명</label></th>
                            <td><textarea name="domainDc" id="domainDc"  value="" style="width:100%;"></textarea>
                        </tr>
                        <tr>
                            <th class="required"><label for="dataType">데이터타입</label></th>
                            <td><input type="text" name="dataType" id="dataType"  value="" ></td>
                        </tr>
                        <tr>
                            <th><label for="dataLt">데이터길이</label></th>
                            <td><input type="text" name="dataLt" id="dataLt"  value="" ></td>
                        </tr>
                        <tr>
                            <th><label for="dcmlpointLt">소수점길이</label></th>
                            <td><input type="text" name="dcmlpointLt" id="dcmlpointLt"  value="" ></td>
                        </tr>
                        <tr>
                            <th><label for="exprsnFom">표현형식</label></th>
                            <td><input type="text" name="exprsnFom" id="exprsnFom"  value="" style="width:100%"></td>
                        </tr>
                        <tr>
                            <th><label for="unit">단위</label></th>
                            <td><input type="text" name="unit" id="unit"  value="" ></td>
                        </tr>
                        <tr>
                            <th><label for="permValDc">허용값설명</label></th>
                            <td><input type="text" name="permValDc" id="permValDc"  value="" style="width:100%"></td>
                        </tr>
                        <tr>
                            <th><label for="registId">등록아이디</label></th>
                            <td><input type="text" name="registId" id="registId"  value=""></td>
                        </tr>
                        <tr>
                            <th><label for="registDt">등록일시</label></th>
                            <td><input type="text" name="registDt" id="registDt"  value=""></td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="btn_user_form_wrap">
                        <input class="btn_user_modify" type="button" value="저장" >
                        <input class="btn_user_delete" type="button" value="삭제" >									
						<input class="btn_user_submit" type="button" value="취소" onClick="history.back();">
                    </div>
                
                </form>
                </div>
            </div>
        </div><!--//user_info-->
    </div><!--//wrap-->

<script>

</script>

</body>
</html>