// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
Chart.defaults.global.animation.duration = 2500;

// ???

var data = []


// ????? ? ????
function getOrder() {
  suffix="";

  data = $("#genderdata")[0].value
  var dataSetParse = JSON.parse(data);

  console.log(dataSetParse[0])


  data=[]
  //?? ??
  //??? ??
  for(var i=0;i<dataSetParse.length;i++){
    data.push(dataSetParse[i])
  }
  console.log(data)

return
}

//??? ???
getOrder();


// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["남", "여"],
    datasets: [{
      data: data,
      backgroundColor: [ '#5b4beb','#f04de8'],
      hoverBackgroundColor: [ '#5143d1','#d645cf'],
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
