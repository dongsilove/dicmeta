/**
 * @FileName 	chartUtil.js
 * @author 		yjkim@mind-one.co.kr
 * @Date 		2020.09.28
 * @Description 차트 공통 모듈
 * @History
 * DATE			AUTHOR		NOTE	
 * -------------------------------------------------
 * 2020.09.28	yjkim		신규
 * 
 * -------------------------------------------------
 * https://echarts.apache.org/examples/en/
 */


var commonChart = {
		
	/**
	 * 생성한 차트 객체 담는 부분
	 */
	chartObject: {},
	
	/**
	 * 
	 * @param chartId
	 * @param type 차트 종류 (line, bar, radar)
	 * @param xData 기준 x축
	 * @param yData 값
	 * @param option (선택) 추가되는 옵션 있을 때 사용 예정
	 */
	drawChart: function(chartId, type, option, data) {
		
		this.chartObject[chartId] = echarts.init( document.getElementById(chartId) );

		var options = parseChart.parseOption(type, option);
		var datas = parseChart.parseDataXY(type, data, options);
		
		if( type == 'radar' ) {
			this.drawRadarChart(chartId, options, datas);
		} else {
			this.drawDefaultChart(chartId, type, options, datas);
		}
		
	},
		
	/**
	 * 기본 차트(line, bar 등) 생성
	 */
	drawDefaultChart: function(chartId, type, options, data) {
		var xData = isEmpty(data)?[]:data.x;
		var yData = isEmpty(data)?[]:data.y;
		
		this.chartObject[chartId].setOption({
			xAxis: {
				type: 'category', // value, category, time, log
				data: xData,
				boundaryGap: options.boundaryGap
			},
			yAxis: options.yAxis,
			legend: options.legend,
			tooltip: {
				trigger: 'axis'
			},
			series: yData,
			grid: {
				top: '5%',
		        left: '10%',
		        right: '15%',
		        bottom: '5%',
		        containLabel: true
			}
		});
		
	},
	
	/**
	 * Radar 차트 생성
	 */
	drawRadarChart: function(chartId, options, data) {
		this.chartObject[chartId].setOption({
			radar: options.header,
			series: data
		});
	},
	
	/**
	 * ajax를 통한 데이터 세팅 (GET)
     * @param chartId
     * @param url 데이터 가져올 url
     * @param param 넘길 파라미터
	 */
	setDataByAjax: function(chartId, url, param, column) {
		
		commonAjax.getAjax(url, param, function(data) {
        	var list = data.list;

        	commonChart.setData(chartId, list, column);
        });
	},

	/**
	 * 차트에 데이터 세팅
	 * @param chartId
	 * @param data
	 * @param column  '':[] 형태로 x축의 key 값과 y축의 value 배열 (컬럼명)
	 */
	setData: function(chartId, data, column) {
		
		var options = this.chartObject[chartId].getOption();
		var resultData = parseChart.parseAjaxData(options, data, column);
		
		this.chartObject[chartId].setOption( resultData );
	},
	
	/**
	 * legend 값 세팅
	 * @param chartId
	 * @param legendData 배열
	 */
	setLegend: function(chartId, legendData) {
		var option = {
			legend: {
				data: legendData,
		        orient: 'vertical',
		        right: 30,
		        bottom: '50%'
			}
		};
		
		this.chartObject[chartId].setOption( option );
	}
	
};


/**
 * echarts용 데이터로 변환
 */
var parseChart = { 
		
	parseOption: function(type, option) {
		var options = {};
		var optionYn = !isEmpty(option);
		
		options.boundaryGap = true; // x축 경계에 값
		options.markLine = {}; // line: 최대 최소 평균 / scatter: 기준 값
		
		options.yAxis = {
	        splitLine: {show: false},
			type: 'value' // value, category, time, log
		}
		if( optionYn && !isEmpty(option.minY) ) {
			options.yAxis.min = option.minY;
		}
		if( optionYn && !isEmpty(option.maxX) ) {
			options.yAxis.max = option.maxY;
		}
		
		options.legend = {}
		if( optionYn && !isEmpty(option.legend) ) {
			options.legend = {
				data: option.legend,
		        orient: 'vertical',
		        right: 30,
		        bottom: '50%'
			}
		}
		
		if( type == 'radar' ) {
			options.header = {};
			if( optionYn && !isEmpty(option.header) ) {
				var header = [];
				for( var i in option.header ) {
					header.push({
						text: option.header[i],
						max: isEmpty(option.max)?1:option.max
					});
				}
				options.header = {
					indicator: header,
		            splitNumber: isEmpty(option.max)?1:option.max
				}
			}
			
		} else if( type == 'scatter' ) {
			options.boundaryGap = false;
			
			var markLine = {};
			if( optionYn && !isEmpty(option.markLine) ) {
				markLine = {
					lineStyle: {
				        type: 'solid'
				    },
				    data: [[{
					        coord: option.markLine.min,
					        symbol: 'none'
				    	}, {
					        coord: option.markLine.max,
					        symbol: 'none'
				    }]]
				}
			}
			options.markLine = markLine;
			
		} else {
			options.boundaryGap = false;
			if( type == 'bar' ) {
				options.boundaryGap = true;
			}
			
			var markLine = [];
			if( optionYn && !isEmpty(option.markLine) ) {
				if( option.markLine.min ) {
					markLine.push({
						type: 'min', 
						label: {formatter: '최소: {c}'}
					});
				}
				if( option.markLine.max ) {
					markLine.push({
						type: 'max', 
						label: {formatter: '최대: {c}'}
					});
				}
				if( option.markLine.avg ) {
					markLine.push({
						type: 'average', 
						label: {formatter: '평균: {c}'}
					});
				}
			}
			options.markLine = {
				data: markLine
			};
		}
		
		return options;
	},
	
	parseDataXY: function(type, data, options) {
		var datas = {};
		
		// radar chart
		if( type == 'radar' ) {
			var value = [];
			if( !isEmpty(data) ) {
				value = data;
			}
			datas = {
				type: type,
				areaStyle: {},
				data: [{
					value: value
				}]
			}
			
		// scatter chart
		} else if( type == 'scatter' ) {
			datas.y = [];
			if( !isEmpty(data) ) {
				datas.y.push({
					type: type,
					data: data,
					markLine: options.markLine
				});
			}
			
		// line, bar, ... chart
		} else {
			datas.x = [];
			datas.y = [];
			if( isEmpty(data) ) {
				datas.y.push({
					type: type,
					barWidth: '30px',
					data: [],
					markLine: options.markLine
				});
				return datas;
			}
			
			if( !isEmpty(data.x) ) {
				datas.x = data.x;
			}
			if( !isEmpty(data.y) ) {
				
				for( var i in data.y ) {
					if( !(data.y[i] instanceof Array) ) {
						datas.y.push({
							name: isEmpty(options.legend.data)?'':options.legend.data[i],
							type: type,
							barWidth: '30px',
							data: data.y,
							markLine: options.markLine
						});
						break;
					}
					datas.y.push({
						name: isEmpty(options.legend.data)?'':options.legend.data[i],
						type: type,
						barWidth: '30px',
						data: data.y[i],
						markLine: options.markLine
					});
				}
				
			}
		}
		
		return datas;
	},

	/**
	 * 차트 타입에 맞는 데이터 형태로 변환
	 * @param options
	 * @param data
	 * @param column  x축의 key 값과 y축의 value 배열
	 * @returns
	 */
	parseAjaxData: function(options, data, column) {
		var datas = {};
		
		var type = options.series[0].type;
		var markLine = options.series[0].markLine;
		var legend = [];
		if( !isEmpty(options.legend[0]) ) {
			legend = options.legend[0].data;
		}
		
		// radar chart
		if( type == 'radar') {
			datas = {
				series: {
					data: [{
						value: data
					}]
				}
			};
			
		// line, bar, scatter.. chart
		} else {
			
			var xData = new Array();
			var yData = new Array();
			
			var key = Object.keys(column)[0]; // x축 컬럼명
			var arr = column[key]; // y축 컬럼명
			var tempData = new Array();
			data.forEach( function(item) {
				xData.push( item[key] ); // x축 데이터 
				
				for( var i in arr ) {
					if( isEmpty(tempData[i]) ) {
						tempData[i] = new Array();
					}
					tempData[i].push( item[arr[i]] );
				}
			});
			
			for( var d in tempData ) {
				yData.push({
					name: isEmpty(legend)?'':legend[d],
					type: type, 
					data: tempData[d],
					markLine: markLine
				});
			}
			
			datas = {
				xAxis: {
					data: xData
				},
				series: yData
			};
		}
		
		return datas;
	}
};

/* 
 **** Chart Manual ****
 
 1. 차트 생성 (div size가 지정되어야함)
 commonChart.drawChart(chartId, type, option, data)
	 - chartId : chart가 들어갈 div 아이디 (필수)
	 - type : 차트 타입 (필수) -> line, bar, scatter, radar 등..
	 - option : 차트 설정 값 (선택, radar는 필수)
		 ## line or bar 차트
			 option = {
				minY: 0 // y축 최소 값
				maxY: 100 // y축 최소 값
				legend: [''] // 범례 지정
				markLine: { // 라인 차트 -> min, max, avg 선 표시
					min: true
					max: true
					avg: true
				}
			 }
		 ## scatter 차트
			 option = {
				minY: 0 // y축 최소 값
				maxY: 100 // y축 최소 값
				legend: [''] // 범례 지정
				markLine: { // 스케터 차트 -> 분포에 대한 라인 표시
					min: ['x', y] // 최소 x, y축 값
					max: ['x', y] // 최대 x, y축 값
				}
			 }
		 ## radar 차트 (필수)
			 option = {
				header: ['',''] // radar 기준 타이틀
				max: 5 // radar 최상위 max 값
			 }
	 - data : 차트 출력 데이터 값 (선택)
		 ## line or bar 차트
			 data = {
				x: ['']
				y: [[],[]] // 라인이 여러개일 경우 배열 안에 배열
			 }
		 ## scatter 차트
			 data = [
				[x, y] // 뿌려질 데이터의 x, y축 값
			 ]
		 ## radar 차트
		 	data = ['', '', ''] // 그릴 데이터 값
 
 2-1. 차트 데이터 세팅
 commonChart.setData(chartId, data, column);
	 - column : 차트에 표현할 컬럼
		 column = {
			x축컬럼: ['y축컬럼','y축컬럼']
		 }
		 ## radar 차트
		 	data = ['', '', ''] // data에만 순서대로 값 넣고 column 지정x
 
 2-2. ajax로 가져온 데이터 세팅
 commonChart.setDataByAjax(gridId, url, param, column);
 	- column : 2-1과 동일
 
 */
