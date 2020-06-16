var endpoint = "https://tatika.herokuapp.com/";
console.log("tatika funcionando");
function gerar_estatisticas(){
    var acao = document.getElementById("nome_da_acao").value;


    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", endpoint+ "get-variation/"+acao, false); // false for synchronous request
    
    xmlHttp.send(null);
    var variation = JSON.parse(xmlHttp.response);
    

    var compra25 = document.querySelector("#compra75");
    var compra50 = document.querySelector("#compra50");
    var compra75 = document.querySelector("#compra25");

    var venda25 = document.querySelector("#venda75");
    var venda50 = document.querySelector("#venda50");
    var venda75 = document.querySelector("#venda25");

    var up25 = document.querySelector("#up75");
    var up50 = document.querySelector("#up50");
    var up75 = document.querySelector("#up25");

    var down25 = document.querySelector("#down75");
    var down50 = document.querySelector("#down50");
    var down75 = document.querySelector("#down25");

    var acaoNode = document.querySelector("#acao");



    dados= JSON.parse(JSON.stringify(variation));
    console.log(dados);
   
    
    var compra25Text = document.createTextNode(dados[0]['75%'] +" (- "+Math.round(dados[1]['25%'])+"%)");
    compra25.replaceChild(compra25Text, compra25.childNodes[0]);

    var compra50Text = document.createTextNode(dados[0]['50%'] +" (- "+Math.round(dados[1]['50%'])+"%)");
    compra50.replaceChild(compra50Text, compra50.childNodes[0]);

    var compra75Text = document.createTextNode(dados[0]['25%'] +" (- "+Math.round(dados[1]['75%'])+"%)");
    compra75.replaceChild(compra75Text, compra75.childNodes[0]);


    var venda25Text = document.createTextNode(dados[2]['75%'] +" (+ "+Math.round(dados[3]['25%'])+"%)");
    venda25.replaceChild(venda25Text, venda25.childNodes[0]);

    var venda50Text = document.createTextNode(dados[2]['50%'] +" (+ "+Math.round(dados[3]['50%'])+"%)");
    venda50.replaceChild(venda50Text, venda50.childNodes[0]);

    var venda75Text =  document.createTextNode(dados[2]['25%'] +" (+ "+Math.round(dados[3]['75%'])+"%)");
    venda75.replaceChild(venda75Text, venda75.childNodes[0]);
    

    var down25Text = document.createTextNode(Math.round(dados[1]['25%'])+"%");
    down25.replaceChild(down25Text, down25.childNodes[0]);

    var down50Text = document.createTextNode(Math.round(dados[1]['50%'])+"%");
    down50.replaceChild(down50Text, down50.childNodes[0]);

    var down75Text = document.createTextNode(Math.round(dados[1]['75%'])+"%");
    down75.replaceChild(down75Text, down75.childNodes[0]);

    var up25Text = document.createTextNode(Math.round(dados[3]['25%'])+"%");
    up25.replaceChild(up25Text, up25.childNodes[0]);

    var up50Text = document.createTextNode(Math.round(dados[3]['50%'])+"%");
    up50.replaceChild(up50Text, up50.childNodes[0]);

    var up75Text = document.createTextNode(Math.round(dados[3]['75%'])+"%");
    up75.replaceChild(up75Text, up75.childNodes[0]);


    var acaoText = document.createTextNode(acao);
    acaoNode.replaceChild(acaoText, acaoNode.childNodes[0]);
}


var ctx = document.getElementById("AreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Earnings",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
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
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '$' + number_format(value);
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
          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});
