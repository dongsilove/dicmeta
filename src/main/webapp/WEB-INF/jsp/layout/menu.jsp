<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
        <div class="sidebar">
            <div class="logo">
                <a href="#"><img src="/images/mindone.png" alt="logo"></a>
                <div class="about"><span>BA2</span> 박이정</div><!-- 화면width 줄어들면 보인다 -->
            </div>
            <ul>
                <li><a href="#">데이터사전</a>
                    <ul class="depth">
                        <li class="on"><a href="/govword_list"><i class="fas fa-book"></i>행정단어</a></li><!-- fas fa-edit -->
                        <li><a href="/domain_list"><i class="far fa-square"></i>도메인</a></li><!-- far fa-window-maximize -->
                        <li><a href="/word_list"><i class="fas fa-cube"></i>단어</a></li><!-- fas fa-address-book, far fa-file-word-->
                        <li><a href="/term_list"><i class="fas fa-cubes"></i>용어</a></li>
                    </ul>
                </li>
                <li><a href="#">관리도구</a>
                    <ul class="depth">
                        <li><a href="/user_list"><i class="fas fa-user"></i>직원정보</a></li>
                        <li><a href="/dept_list"><i class="fas fa-address-book"></i>부서정보</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="m_page"><!-- 화면width 줄어들면 보인다 -->
			    <li><a href="mypage.php">내정보수정</a></li>
			    <li><a href="logout.php">로그아웃</a></li>
		    </ul>
        </div><!--//sidebar-->
