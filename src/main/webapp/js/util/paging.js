/**
 * @FileName 	paging.js
 * @author 		ljpark
 * @Date 		2021.02.07
 * @Description 페이징처리
 */
//paging option
var _paging = {
	paginationOptions : {
		totalItems : 0,
		itemsPerPage : 20,
		visiblePages : 10,
		page : 1,
		centerAlign : false,
		firstItemClassName : '',
		lastItemClassName : '',
		template : {
			page : '<a href="#">{{page}}</a>',
			currentPage : '<strong>{{page}}</strong>',
			moveButton : '<a href="#" class="direction {{type}}">' + '<span class="tui-ico-{{type}}">{{type}}</span>' + '</a>',
			disabledMoveButton : '<a href="#" class="direction {{type}} disable ">' + '<span></span>' + '</a>',
			moreButton : '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' + '<spanclass="tui-ico-ellip">...</span>' + '</a>'
		}
	}
}