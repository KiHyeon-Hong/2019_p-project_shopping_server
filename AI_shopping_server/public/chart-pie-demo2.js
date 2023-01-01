// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
Chart.defaults.global.animation.duration = 2500;


// 유형비

var data = []


// 페이지에서 값 가져오기
function getOrder() {
  suffix="";

  data = $("#typedata")[0].value
  var dataSetParse = JSON.parse(data);

  console.log(dataSetParse[0])


  data=[]
  //라벨 파싱
  //데이터 파싱
  for(var i=0;i<dataSetParse.length;i++){
    data.push(dataSetParse[i])
  }
  console.log(data)

return
}

//첫화면 초기화
getOrder();




// Pie Chart Example
var ctx = document.getElementById("myPieChart2");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["구매자", "판매자"],
    datasets: [{
      data: data,
      backgroundColor: ['#e0dfe8','#4f4e52'],
      hoverBackgroundColor: ['#cac9d1','#2d2c2e'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
