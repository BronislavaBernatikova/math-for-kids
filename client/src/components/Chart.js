import React from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';

Charts(FusionCharts);

var myDataSource = {
        "chart": {
            "caption": "Student's recent quiz results",
                "subcaption": "Last ten days",
                "xaxisname": "Days",
                "yaxisname": "Right Answers %",
                "numberprefix": "$",
                "theme": "ocean"
        },
            "categories": [{
            "category": [{
                "label": "Jan"
            }, {
                "label": "Feb"
            }, {
                "label": "Mar"
            }, {
                "label": "Apr"
            }, {
                "label": "May"
            }, {
                "label": "Jun"
            }, {
                "label": "Jul"
            }, {
                "label": "Aug"
            }, {
                "label": "Sep"
            }, {
                "label": "Oct"
            }, {
                "label": "Nov"
            }, {
                "label": "Dec"
            }]
        }],
            "dataset": [{
            "seriesname": "Actual Revenue",
                "data": [{
                "value": "16000"
            }, {
                "value": "20000"
            }, {
                "value": "18000"
            }, {
                "value": "19000"
            }, {
                "value": "15000"
            }, {
                "value": "21000"
            }, {
                "value": "16000"
            }, {
                "value": "20000"
            }, {
                "value": "17000"
            }, {
                "value": "25000"
            }, {
                "value": "19000"
            }, {
                "value": "23000"
            }]
        }, {
            "seriesname": "Projected Revenue",
                "renderas": "line",
                "showvalues": "0",
                "data": [{
                "value": "15000"
            }, {
                "value": "16000"
            }, {
                "value": "17000"
            }, {
                "value": "18000"
            }, {
                "value": "19000"
            }, {
                "value": "19000"
            }, {
                "value": "19000"
            }, {
                "value": "19000"
            }, {
                "value": "20000"
            }, {
                "value": "21000"
            }, {
                "value": "22000"
            }, {
                "value": "23000"
            }]
        }, {
            "seriesname": "Profit",
                "renderas": "area",
                "showvalues": "0",
                "data": [{
                "value": "4000"
            }, {
                "value": "5000"
            }, {
                "value": "3000"
            }, {
                "value": "4000"
            }, {
                "value": "1000"
            }, {
                "value": "7000"
            }, {
                "value": "1000"
            }, {
                "value": "4000"
            }, {
                "value": "1000"
            }, {
                "value": "8000"
            }, {
                "value": "2000"
            }, {
                "value": "7000"
            }]
        }]
    };

    const chartConfigs = {
            id: "revenue-profits-chart",
            renderAt: "revenue-profits-chart-container",
            type: "mscombi2d",
            width: 600,
            height: 400,
            dataFormat: "json",
            dataSource: myDataSource
        };

function Chart(props) {

  return(
    <ReactFC {...chartConfigs} />
  )
}
export default Chart;
