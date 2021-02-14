/**
 * @FileName 	gridUtil.js
 * @author 		yjkim@mind-one.co.kr
 * @Date 		2020.06.24
 * @Description 그리드 공통 모듈
 * @History
 * DATE			AUTHOR		NOTE	
 * -------------------------------------------------
 * 2020.06.24	yjkim		신규
 * 
 * -------------------------------------------------
 * * 버전 4.13.0 확인 *
 * https://nhn.github.io/tui.grid/4.13.0/
 */

/**
 * Grid 공통 객체
 */
var commonGrid = {

    /**
     * 생성한 그리드 객체를 담는 부분
     */
    gridObject: {},

    /**
     * 그리드 생성
     * @param gridId (div id)
     * @param header 그리드 header 배열
     * @param option 그리드 설정 값 객체
     * @param data 그리드 데이터 배열
     */
    drawGrid: function(gridId, header, option, data) {
    	
        var headers = parseGrid.parseHeader(header);
		var options = parseGrid.parseOption(gridId, option);
		
        this.gridObject[gridId] = new tui.Grid({
            el: document.getElementById(gridId),
            scrollX: options.scrollX,
            scrollY: options.scrollY,
            header: options.complexHeader,
            columns: headers,
            data: data,
            rowHeaders: options.rowHeaders,
            width: options.width,
            minRowHeight: options.rowHeight,
            bodyHeight: options.bodyHeight,
            minBodyHeight: 40,
            columnOptions: options.columnOptions,
            treeColumnOptions: options.treeColumnOptions,
            pageOptions: options.pageOptions,
            treeColumnOptions: options.treeColumnOptions,
            editingEvent: 'click',
            selectionUnit: 'row',
            summary: options.summary,
        });
        
        // 그리드 생성 후 summary 진행
        // (기본 제공 데이터에 한계가 있어, 데이터를 가져와서 공식 적용하기 위함) 
        if( !isEmpty(options.summary) ) {
        	this.setSummary(gridId, options.summary.field);
        }

        //tui.Grid.applyTheme('clean');
    },

    /**
     * ajax를 통한 데이터 세팅 (GET)
     * @param gridId
     * @param url 데이터 가져올 url
     * @param param 넘길 파라미터
     */
    setDataByAjax: function(gridId, url, param) {
    	
    	var list = [];
        commonAjax.getAjax(url, param, function(data) {
        	list = data.list;
        	
        	// tree 구조의 컬럼이 있는지 확인
        	var headers = commonGrid.getAllHeader(gridId);
        	var treeYn = false;
        	for( var i in headers ) {
        		if( !isEmpty(headers[i].tree) ) {
        			treeYn = true;
        			break;
        		}
        	}
        	
        	// tree 그리드면 데이터 가공
        	if( treeYn ) {
        		var treeData = [];
        		for( var i in list ) {
        			parseGrid.parseTreeData(treeData, list[i]);
        		}
        		list = treeData;
        	}
        	
        	commonGrid.setData(gridId, list);
        }, false);
        
        return list;
    },

    /**
     * 전체 데이터 재설정
     * @param gridId
     * @param data 그리드에 세팅할 데이터
     */
    setData: function(gridId, data) {
    	if( !(data instanceof Array) ) {
    		data = [data];
    	}

		commonGrid.rowEditMode(gridId);
        this.gridObject[gridId].resetData(data);
    },

    /**
     * 모든 컬럼(header) 재설정
     * @param gridId
     * @param headers 그리드 헤더 속성
     */
    setHeader: function(gridId, headers) {
        for( var i in headers ) {
            headers[i].width = headers[i].baseWidth;
        } 
        this.gridObject[gridId].setColumns(headers);
    },
    
    /**
     * 복합 헤더 재설정
     * @param gridId
     * @param complexHeader 복합 헤더 속성
     */
    setComplexHeader: function(gridId, complexHeader) {
    	var options = {
			complexColumns: []
    	};
    	for( var i in complexHeader) {
			var item = complexHeader[i];
			options.complexColumns.push({
				header: item.text,
				name: item.field,
				childNames: item.childFields
			});
		} 
    	this.gridObject[gridId].setHeader(options);
    },

    /**
     * 새로운 행 추가 (첫번째 행에 추가 후 편집모드 실행)
     * @param gridId
     * @param row 추가할 행의 데이터
     */
    appendRow: function(gridId, row) {
        this.gridObject[gridId].appendRow(row, {
            at: 0, // 첫 번째 행에 추가
            focus: true
        });
        
        // 첫 번째 행 편집모드
        this.rowEditMode(gridId, this.getFocusedData(gridId).rowKey, customEdit.editList[gridId]);
    },

    /**
     * 데이터 추가 (기존 데이터 아래쪽에 이어붙이기)
     * @param gridId
     * @param data 추가할 데이터
     */
    appendData: function(gridId, data) {
        if( !(data instanceof Array) ) {
            data = [data];
        }
        this.gridObject[gridId].appendRows(data);
    },
    
    /**
     * 특정 row 컬럼에 값 추가
     * @param gridId
     * @param rowKey
     * @param columnName
     * @param value
     * @returns
     */
    setValue: function(gridId, rowKey, columnName, value) {
    	this.gridObject[gridId].setValue(rowKey, columnName, value);
    },

    /**
     * 체크된 row 삭제
     * @param gridId
     */
    removeCheckRow: function(gridId) {
        this.gridObject[gridId].removeCheckedRows();
    },
    
    /**
     * 체크된 row 가져오기
     * @param gridId
     */
    getCheckRow: function(gridId) {
    	return this.gridObject[gridId].getCheckedRows();
    },

    /**
     * 특정 값 가져오기
     * @param gridId
     * @param rowKey 가져올 값의 row 번호
     * @param columnName 가져올 값의 컬럼 명
     */
    getCellValue: function(gridId, rowKey, columnName) {
        return this.gridObject[gridId].getValue(rowKey, columnName);
    },

    /**
     * 그리드의 전체 데이터 가져오기
     * @param gridId
     */
    getData: function(gridId) {
        return this.gridObject[gridId].getData();
    },

    /**
     * 특정 row 데이터 가져오기
     * @param gridId
     * @param rowKey 가져올 row의 row 번호
     */
    getRowData: function(gridId, rowKey) {
        return this.gridObject[gridId].getRow(rowKey);
    },

    /**
     * 전체 컬럼(헤더) 가져오기
     * @param gridId
     */
    getAllHeader: function(gridId) {
        return this.gridObject[gridId].getColumns();
    },

    /**
     * 특정 컬럼(헤더)의 모든 데이터 가져오기
     * @param gridId
     * @param columnName 컬럼 명
     */
    getHeaderData: function(gridId, columnName) {
        return this.gridObject[gridId].getColumnValues(columnName);
    },

    /**
     * 포커스 되어있는 값 가져오기
     * @param gridId
     */
    getFocusedData: function(gridId) {
        return this.gridObject[gridId].getFocusedCell();
    },
    
    /**
     * 수정된 row의 데이터 가져오기
     * @param gridId
     */
    getUpdateData: function(gridId) {
    	this.gridObject[gridId].blur(); // 블러처리 해줘야 수정중인 셀도 가져옴
    	
    	return this.gridObject[gridId].getModifiedRows().updatedRows;
    },

    /**
     * 그리드에 summary 설정
     * @param gridId
     * @param obj
     * @returns
     */
    setSummary: function(gridId, obj) {
    	for( var key in obj ) {
    		this.gridObject[gridId].setSummaryColumnContent(
    			key, parseGrid.parseSummary(gridId, key, obj[key])
    		);
    	}
    },

    /**
     * 특정 셀의 배경 색상 지정
     * @param gridId
     * @param rowKey 색상 지정할 셀의 row 번호
     * @param columnName 색상 지정할 컬럼 명
     * @param colorClassName 색상 값의 class name (.className.tui-grid-cell 이름으로 css에 선언)
     * ex) 
        .gridCellBlue.tui-grid-cell {
          background-color: #ffc2f0;
        }
     */
    setCellColor: function(gridId, rowKey, columnName, colorClassName) {
        this.gridObject[gridId].addCellClassName(rowKey, columnName, colorClassName);
    },

    /*
     * 특정 셀에 포커스 효과
     * @param gridId
     * @param rowKey 포커스 지정할 셀의 row 번호
     * @columnName 포커스 지정할 셀의 컬럼 명
     */
    focusCell: function(gridId, rowKey, columnName) {
        this.gridObject[gridId].focus(rowKey, columnName);
    },

    /**
     * 특정 row 수정 버튼 이벤트
     * @param gridId
     * @param rowKey 수정할 row 번호
     * @param editColumnList 수정할 컬럼명 목록
     */
    rowEditMode: function(gridId, rowKey, editColumnList) {
        var focusColumnName = '';
        var cols = commonGrid.getAllHeader(gridId);
        for( var i in cols ) {
            if( $.inArray(cols[i].name, editColumnList) > -1 ) {
                if( isEmpty(focusColumnName) ) {
                    focusColumnName = cols[i].name;
                }
                cols[i].renderer = {
                    type: CustomEditorRenderer
                }
                
                cols[i].relations = cols[i].editor.options.relation;
            }
        }

        customEdit.editRowKey[gridId] = rowKey;
        commonGrid.setHeader(gridId, cols);
        commonGrid.focusCell(gridId, rowKey, focusColumnName);  
        
    },

    /**
     * 수정 후 저장 이벤트
     * @param gridId
     * @param rowKey 수정한 row 번호
     * @param event 저장 함수
     */
    rowSaveMode: function(gridId, rowKey, event) {
        var cols = commonGrid.getAllHeader(gridId);

        var row = commonGrid.getRowData(gridId, rowKey);
        var flag = event(row); // validation 실패하면 false가 넘어옴
        
        // validation 통과했으면 edit false 모드로 변경
        if( isEmpty(flag) || flag ) {
        	customEdit.editRowKey[gridId] = '';
            commonGrid.setHeader(gridId, cols);
        }
    },
    
    /**
     * 그리드 row 클릭 이벤트
     * @param gridId
     * @param fn_event 이벤트 함수
     */
    clickEvent: function(gridId, fn_event) {
    	this.gridObject[gridId].blur();
    	
    	this.gridObject[gridId].on('click', function(ev) {
    		var rowData = commonGrid.getRowData(gridId, ev.rowKey);
    		if( !isEmpty(rowData) ) {
    			fn_event(rowData);
    		}
    	});
    },
    
    /**
     * 그리드 validate 실행 
     * @param gridId
     * @param rules
     * @param data
     * @returns
     */
    validate: function(gridId, rules, data) {
    	
    	if( !(data instanceof Array) ) {
    		data = [data];
    	}
    	
    	for( var i in data ) {
			var flag = validateData(rules, data[i], function(msg, columnName) { // util.js
	    		alert(msg);
	    		commonGrid.focusCell(gridId, data[i].rowKey, columnName);
	    	});
			
			if( !flag ) {
				return flag;
			}
		}
    	
    	return flag;
    },

};

/**
 * toast grid용 데이터로 변환
 */
var parseGrid = {

    /**
     * Header의 column 설정 속성
     * @param header header 속성
     */
    parseHeader: function(header) {
        var headers = [];
        if( isEmpty(header) ) {
            return headers;
        }

        header.forEach( function(item) {

            // editor 속성 (text, password, select, radio, checkbox, date)
            if( !isEmpty(item.editor) ) {  

            	// datepicker
                if( item.editor == 'date' ) {

                	item.editor = {
                        type: 'datePicker',
                        options: {
                        	format: 'yyyy-MM-dd'
                        }
                    };
                	
                } else {
                    item.editor = {
                        type: item.editor
                    };
                }
                
                if( !isEmpty(item.codeList) ) {

                    item.editor.options = {
                        listItems: item.codeList
                    };
                    item.valueFormat = 'listItemText';
                    
                    // select간 relation 맺기
                    if( !isEmpty(item.targetSelect) ) { 
                    	var obj = item.targetSelect;
                    	var target = Object.keys(obj)[0];
                    	var targetCode = obj[target];
                    	
                    	// rowEditMode 에서 설정
                    	item.editor.options.relation = [{
                    		targetNames: [target],
                    		listItems: function listItem(data) {
                    			if( !isEmpty(data) && !isEmpty(data.value) ) {
                    				return targetCode(data.value);
                    			}
                				return [{text:'선택',value:''}];
                    		}
                    	}];
                    }
                    
                // select간 relation이 맺어진 경우
                } else if( item.editor.type == 'select' ) {
                	item.editor.options = {
                        listItems: []
                    };
                }
            }
        	
        	// 수정버튼 처리
        	if( item.field == 'editBtn' ) {

                // 수정버튼 생성하는 renderer 속성
        		item.renderer = {
                    type: customEdit.editButton,
                    event: item.saveEvent
                };
        	}

            headers.push( { 
                header: item.text, 
                name: item.field, 
                align: isEmpty(item.align)?'center':item.align,
                width: item.width,
                hidden: item.hidden,
                defaultValue: item.defaultValue,
                editor: item.editor,
                formatter: item.valueFormat,
                renderer: item.renderer,
                validation: item.validation,
                whiteSpace: 'pre-wrap'
            } );
        });
        
        return headers;
    },

    /**
     * 전체 속성 처리
     * @param option 그리드 속성
     */
    parseOption: function(gridId, option) {
    	var options = {};
    	
    	if( isEmpty(option) ) {
    		option = {};
    	}
			
    	// grid option (화면에 따라 gird 사이즈 변경)
		if( isEmpty(option.gridWidth) ) {
			option.gridWidth = $("#"+gridId).width();
		}
		if( isEmpty(option.headerHeight) ) {
			option.headerHeight = 40;
		}
		if( isEmpty(option.summaryHeight) ) {
			option.summaryHeight = 0;
		}
		if( isEmpty(option.bodyHeight) ) {
			option.bodyHeight = $("#"+gridId).height() - option.headerHeight - option.summaryHeight - (!isEmpty(option.perPage) ? 50 : 0);
		}
    	options.width = option.gridWidth;
    	options.rowHeight = option.rowHeight;
    	options.bodyHeight = option.bodyHeight;
    	options.scrollX = option.scrollX;
    	options.scrollY = option.scrollY;
    	
    	// rowHeaders (checkbox, rowNum)
    	options.rowHeaders = [];
    	if( !isEmpty(option.showCheckbox) && option.showCheckbox ) {
    		options.rowHeaders.push('checkbox');
    	}
    	if( !isEmpty(option.showRowNum) && option.showRowNum ) {
    		options.rowHeaders.push('rowNum');
    	}
    	
    	// complex header
    	options.complexHeader = {
    		height: option.headerHeight,
    		complexColumns: []
    	};
    	if( !isEmpty(option.complexHeader) ) {
    		for( var i in option.complexHeader) {
    			var item = option.complexHeader[i];
    			options.complexHeader.complexColumns.push({
    				header: item.text,
    				name: item.field,
    				childNames: item.childFields
    			});
    		} 
    	}
        
    	// column option
    	options.columnOptions = {
    		resizable: true,
    		frozenCount: option.frozenCount // 고정 열
    	}
    	
    	// summary setting (기본설정으로 그리드 생성 후 결과 값은 재처리)
		options.summary = {
			height: option.summaryHeight,
			columnContent: {},
			field: {}
		}
    	if( !isEmpty(option.summaryField) ) {
    		options.summary.field = option.summaryField; // 그리드 생성 후 별도로 진행
    	}
    	
    	// pagenation
    	if( !isEmpty(option.perPage) ) {
	    	options.pageOptions = {
	    		perPage: option.perPage,
	    		useClient: true // 사용자 임의의 api
	    	};
    	}
    	
    	// tree 구조
    	if( !isEmpty(option.treeColumn) ) {
    		options.treeColumnOptions = {
    			name: option.treeColumn
    		};
    	}
    	
        return options;
    },
    
    /**
     * summary template 결과 처리
     * @param gridId
     * @param key 필드명
     * @param value 입력한 결과
     */
    parseSummary: function(gridId, key, value) {
    	return {
			template: function(summary) {

	    		var dataList = commonGrid.getHeaderData(gridId, key);
			    
		    	// sum, min, max, cnt, avg, stdev(표준편차)
				var resultStr = "";
				
				var str = value.split(/{|}/); // {}로 묶인 값
				for( var s in str ) {
					switch(str[s]) {
						case "cnt": resultStr += calculator.count(dataList); break; // 개수
						case "sum": resultStr += calculator.sum(dataList); break; // 합계
						case "min": resultStr += calculator.min(dataList); break; // 최소
						case "max": resultStr += calculator.max(dataList); break; // 최대
						case "avg": resultStr += calculator.average(dataList); break; // 평균
						case "stdev": resultStr += calculator.standardDeviation(dataList); break; // 표준편차
						default: resultStr += str[s];
					}
				}
				
				return resultStr;
			}
		};
    },
    
    /**
     * ajax를 통해 얻은 데이터를 tree 형식에 맞게 재구성
     * @param treeData  결과 담는 배열
     * @param row  for문을 통해 가져온 row
     */
    parseTreeData: function(treeData, row) {
    	var level = row.level;
    	if( level > 1 ) {
    		
    		var data = treeData;
    		for( var i=0; i<level-1; i++ ) {
    			var lastData = data[data.length-1];
    			if( isEmpty(lastData._children) ) {
    				lastData._attributes = {
    					expanded: true
    				};
    				lastData._children = [];
    			}
    			data = lastData._children;
    		}
    		data.push(row);
    		
    	} else {
    		treeData.push(row);
    	}
    	return treeData;
    }

};



// 수정관련 데이터 변수
var customEdit = {
    
    // 수정 적용할 rowKey
    editRowKey: {}, 
    
    // 수정할 컬럼 목록
    editList: {},
    
    /**
     * 수정 버튼 커스텀 (수정버튼->저장버튼 변환)
     */
    editButton: function(props) {
    	var gridId = props.grid.el.id;
        var editList = customEdit.editList[gridId];
        
        // option 설정된 컬럼 editList에 추가
        if( isEmpty(editList) ) {
    		var columns = commonGrid.getAllHeader(gridId);
    		editList = [];
    		for( var i in columns ) {
    			if( !isEmpty(columns[i].editor) ) {
    				editList.push(columns[i].name);
    			}
    		}
    		customEdit.editList[gridId] = editList;
    		commonGrid.rowEditMode(gridId, '', editList);
        }
        
        var customEditList = customEdit.editList[gridId];
        var customEditRowKey = customEdit.editRowKey[gridId];

        var el = document.createElement('button');
        el.className = 'btn_type default in-grid';
        
        // '수정' -> '저장'으로 변경
        if( !isEmpty( customEditRowKey ) && props.rowKey == customEditRowKey ) {
        	var clickEvent = props.columnInfo.renderer.event;
            el.innerHTML = '저장';
            el.classList.remove('edit');
            el.onclick = function() {
                commonGrid.rowSaveMode(gridId, props.rowKey, clickEvent);
            };

        // default '수정' 버튼
        } else {
            el.innerHTML = '수정';
            el.classList.add('edit');
            el.onclick = function() {
                commonGrid.rowEditMode(gridId, props.rowKey, customEditList);
            };
        }

        this.el = el;
    }
};
customEdit.editButton.prototype.getElement = function() {
    return this.el;
};
customEdit.editButton.prototype.render = function(props) {
	this.el.value = props.value;
};

/**
 * 특정 row에 대한 editor 모드 (input box 생성)
 */
function CustomEditorRenderer(props) {
	
    var gridId = props.grid.el.id;
    var editRowKey = customEdit.editRowKey[gridId];
    var editList = customEdit.editList[gridId];
    var el = '';

    // 수정할 row에 input tag 생성
    var option = props.columnInfo.editor.options;
    if (!isEmpty(editRowKey) && props.rowKey == editRowKey) {
    	
        // input box / select box 생성
        var element = 'select';
        if( option.type=='text' || option.type=='password' || props.columnInfo.editor.type.name == 'DatePickerEditor' ) {
        	element = 'input';
        }
        el = document.createElement(element);
        el.style.padding = '6px 7px';
        el.style.margin = 'auto 5px';
        el.style.border = 'solid 1px #ddd';

        // input text
        if( option.type == 'text' ) {
            el.type = 'text';
            el.style.width = 'calc(90%)';

            this.el = el;
            this.render(props);

        // input password
        } else if( option.type == 'password' ) {
        	el.type = 'password';
            el.style.width = 'calc(90%)';

            this.el = el;
            this.render(props);
           
        // input date
        } else if(props.columnInfo.editor.type.name == 'DatePickerEditor') {
            el.type = 'text';
            el.style.width = 'calc(90%)';
        	el.className = 'datepicker';
        	
            this.el = el;
            this.render(props);

        // select option
        } else {
            el.style.width = 'calc(80%)';
            
            var list = option.listItems.length==0 ? option.relationListItemMap : option.listItems;
            
            var selectList = [];
        	if( list instanceof Array ) {
        		selectList = list;
        	} else {
        		for( var i in list ) {
        			selectList = selectList.concat(list[i]); // relation select
        		}
        	}
        	
            for( var i in selectList ) {
                var selectOption = document.createElement('option');
                selectOption.text  = selectList[i].text;
                selectOption.value = selectList[i].value;
                
                if( selectList[i].value == props.value ) {
                    selectOption.selected = true;
                }
                el.add(selectOption);
            }
            
            this.el = el;
            
        }

    // 수정할 row가 아니면 editable false
    } else {
        el = document.createElement('div');
        el.className = 'tui-grid-cell-content';
        
        this.el = el;
        if( option.type == 'text' || props.columnInfo.editor.type.name == 'DatePickerEditor' ) {
            this.divRender(props.value);
            
        } else if ( option.type == 'password') {
            this.divPasswordRender(props.value);
            
        } else {
            var list = option.listItems.length==0 ? option.relationListItemMap : option.listItems;
            this.divTextRender(props.value, list);
        }
    }

    // 수정하지 않는 row의 edit mode 비활성화
    var viewData = props.grid.store.data.viewData;
    for( var i in viewData ) {
    	if( typeof(viewData[i]) != 'function' && 
    			( !isEmpty(viewData[i].valueMap) && (isEmpty(editRowKey) 
    					|| ( !isEmpty(editRowKey) && viewData[i].rowKey != props.rowKey && props.rowKey == editRowKey) )) ) {
			for( var j in editList ) {
				viewData[i].valueMap[editList[j]].editable = false;
			}
    	}
    }
}
CustomEditorRenderer.prototype.getElement = function() {
    return this.el;
}
CustomEditorRenderer.prototype.getValue = function() {
	return this.el.value;
}
CustomEditorRenderer.prototype.render = function(props) {
    this.el.value = props.value;
}
CustomEditorRenderer.prototype.divRender = function(value) {
    this.el.innerHTML = value;
}
CustomEditorRenderer.prototype.divPasswordRender = function(value) {
	this.el.innerHTML = value.replace(/\S/g,"*"); // 길이만큼 *로 변환
}
// select 값에 text 값 넣기
CustomEditorRenderer.prototype.divTextRender = function(value, list) {
	var selectList = [];
	if( list instanceof Array ) {
		selectList = list;
	} else {
		for( var i in list ) {
			selectList = selectList.concat(list[i]); // relation select
		}
	}
	
    for( var i in selectList ) {
        if( selectList[i].value == value && !isEmpty(selectList[i].value) ) {
            this.el.innerHTML = selectList[i].text;
        }
    }
}



/* 
 **** Grid Manual **** (tui grid 4.13.0)
 
 1. 그리드 생성
 commonGrid.drawGrid(gridId, header, option, data);
	 - gridId : grid가 들어갈 div 아이디 (필수)
	 - header : 그리드 헤더 값 (필수)
		 header = [
			{
				text: '제목', // 필수
				field: 'title' // 필수
				editor: 'text' // (선택) 해당 컬럼을 수정할 경우 필수 -> text, password, date, select, radio, checkbox
				codeList: 
					* commonSelectBox.getGridByAjax(url, param, textColumn, valueColumn) // (선택) editor가 select, radio, checkbox의 경우 필수 (공통코드 아닌 select 예시)
					* commonSelectBox.getGridByCode("cmmnCd") // (선택) editor가 select, radio, checkbox의 경우 필수 (공통코드 예시)
					* commonSelectBox.getGridByData(dataList, textColumn, valueColumn) // (선택) 데이터를 그리드 select에 맞게 수정
					* => '선택'이 나오지 않게 하려면 맨 뒤 파라미터에 true 넣어서 보내기
				targetSelect: { // (선택) 해당 필드의 값에 따라 다른 필드가 변경될 경우 변경될 필드명과 목록을 리턴해주고, 변경되는 필드는 editor: 'select'만 기입
					변경될필드명 : function(value) { return codeList; }
				}
				required: true // (선택) 수정 시 필수 입력해야하는 경우 // commonGrid.validate로 대체
				type: 'string' or 'number' // (선택) 수정 시 데이터 타입 // commonGrid.validate로 대체
				align: 'left' or 'center' or 'right' // (선택) 기본으로 센터
				width: 80 // (선택) 해당 컬럼 너비
				hidden: true // (선택) 해당 컬럼 숨기기 (주로 pk)
				defaultValue: '' // (선택) 값이 없을 때 기본 값 지정
				valueFormat: function(data) { // (선택) 값 형태 (값에 이미지 오는 경우 : return '<img src=""/>')
					return data.value;
				}
			},
			{
				text: '수정'
				field: 'editBtn' // row 기준 수정할 경우 필수로 추가 (editBtn 바꾸지 않기)
				saveEvent: function(rowData) {
					// 저장 로직 구현
				}
			}
		 ]
	 - option : 그리드 설정 값 (선택)
		 option = {
			showCheckbox: true // (선택) 처음 컬럼에 체크박스
			showRowNum: true // (선택) 처음 컬럼에 넘버
			scrollX: false // (선택) x축 스크롤 비활성화
			scrollY: false // (선택) y축 스크롤 비활성화
			rowHeight: '' // (선택) 한 row 높이
			headerHeight: '' // (선택) 헤더 높이 (complexHeader 설정시 사용)
			complexHeader: [ // (선택) 복합 헤더가 있을 경우 설정
				{
					text: '',
					field: '',
					childFields: [] // 자식으로 들어갈 필드명
				}
			],
			frozenCount: 1 // (선택) 좌측 고정시킬 컬럼 개수
			summaryHeight: '' // (선택) summary 설정시 높이 필수로 추가
			summaryField: { // (선택) summary 설정시 필드와 출력할 결과 입력
				설정할필드명: 표출할값 
					* 표출할 값 : String 형태, <br>로 개행, 
					* {} 안에 sum, cnt, min, max, avg, stdev(표준편차) 입력해 결과값 표출
			  		(예시 : "{cnt}<br>{max}<br>{min}<br>{avg}")
			}
		 }
	 - data : 그리드 출력 데이터 배열 (선택)
 
 2-1. 그리드 데이터 세팅
 commonGrid.setData(gridId, data);
 
 2-2. ajax로 가져온 데이터 세팅
 commonGrid.setDataByAjax(gridId, url, param); // data 반환됨
 
 
 // 그리드에 summary 추가 (그리드 옵션에 summaryHeight 지정해야 표출됨)
 commonGrid.setSummary(gridId, summary);
	 summary = {
		설정할필드명: 표출할값
	 }
	  * 표출할 값 : String 형태, <br>로 개행, 
	  * {} 안에 sum, cnt, min, max, avg, stdev(표준편차) 입력해 결과값 표출
	  (예시 : "{cnt}<br>{max}<br>{min}<br>{avg}")
	  
	  
 // 그리드 rowData 유효성검사
 commonGrid.validate(gridId, rules, rowData)
 	- rules: form validate rules와 같은 방식으로 설정 
 	- (required, maxByteLength, dateISO, digits, number) -> util.js의 validateData 참고
 
 // 그리드 복합 헤더 재설정
 commonGrid.setComplexHeader(gridId, complexHeader) 
  
 // 그리드에 행 추가 (첫번째 행에 추가 후 편집모드)
 commonGrid.appendRow(gridId, row)
 
 // 기존데이터에 다른 데이터 추가
 commonGrid.appendData(grid, data)
 
 // 체크 row 삭제
 commonGrid.removeCheckRow(gridId)
 
 // 특정 값 가져오기
 commonGrid.getCellValue(gridId, rowKey, columnName)
 
 // 전체 데이터 가져오기
 commonGrid.getData(gridId)
 
 // 특정 row 가져오기
 commonGrid.getRowData(gridId, rowKey)
 
 // 전체 헤더 값 가져오기
 commonGrid.getAllHeader(gridId)
 
 // 특정 컬럼의 모든 데이터 가져오기
 commonGrid.getHeaderData(gridId, columnName)
 
 // 포커스된 값 가져오기
 commonGrid.getFocusedData(gridId)
 
 // 수정된 row 가져오기
 commonGrid.getUpdateData(gridId)
 
 // 특정 셀에 포커스 효과
 commonGrid.focusCell(gridId, rowKey, columnName)
 
 // 특정 row 수정가능한 상태로 만들기 (수정버튼 클릭)
 commonGrid.rowEditMode(gridId, rowKey, editColumnList)
 
 // 그리드 cell click 이벤트
 commonGrid.clickEvent(gridId, function(rowData) {})
 
 */
