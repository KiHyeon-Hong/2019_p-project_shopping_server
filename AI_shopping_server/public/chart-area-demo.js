// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
Chart.defaults.global.animation.duration = 2500;

var labels = []
var data = []
var maxTicksLimit = 7

// 페이지에서 값 가져오기
function getOrder() {
  suffix="";

  data = $("#data")[0].value
  labels = $("#labels")[0].value
  var dataSetParse = JSON.parse(data);
  var labelsSetParse = JSON.parse(labels);

  console.log(typeof labelsSetParse[0])


  data=[]
  labels=[]
  //라벨 파싱
  //데이터 파싱
  for(var i=0;i<dataSetParse.length;i++){
    // var temp = dataSetParse[i]
    data.push(dataSetParse[i])
    labels.push(labelsSetParse[i].substr(0,10))
  }

  //라벨 갯수 세팅
 

  // 이거는 따로따로오오오
  // data = $("#data")[0].value
  // var dataSetParse = JSON.parse(data);

  // console.log(dataSetParse[0])


  // data=[]
  // labels=[]
  // //라벨 파싱
  // //데이터 파싱
  // for(var i=0;i<dataSetParse.length;i++){
  //   labels.push(dataSetParse[i].ym)
  //   data.push(dataSetParse[i].totalPrice)
  // }

  // console.log(labels)
  // console.log(data)

return
  var dataSetParse = JSON.parse(data[0]);

  console.log(dataSetParse)

  return
// 첫번째놈 그래프로 그리기 == 데이터 덮어쓰기
  var dataSet = $("input[name=dataSet]")[0].value;
  var dataSetParse = JSON.parse(dataSet);
  console.log(dataSetParse)


  var firstItemIndex =$("#content input[type=hidden]")[0].value;
  var input = dataSetParse[firstItemIndex]

  data= input.ddata;
  labels = input.dlabel;
  hoverLabel = input.dname
}

//첫화면 초기화
getOrder();












function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

var pointBackgroundColors = [];
var pointBorderColor = [];
// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: "",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: pointBackgroundColors,
      pointBorderColor: pointBorderColor,
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: data,
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: maxTicksLimit
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '' + number_format(value) +'원';
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + '' + number_format(tooltipItem.yLabel)+'원';
        }
      }
    }
  }
});

for (i = 0; i < myLineChart.data.datasets[0].data.length-1; i++) {
    pointBackgroundColors.push("rgba(78, 115, 223, 1)");
    pointBorderColor.push("rgba(78, 115, 223, 1)")
}
pointBackgroundColors.push("red");
pointBorderColor.push("#fc4e03")
myLineChart.update();
console.log(myLineChart.data.datasets[0])
