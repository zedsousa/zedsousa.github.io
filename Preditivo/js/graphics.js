//var endpoint = "http://localhost:8080/";
var endpoint = "http://localhost:3883/";

function gerarGraficoPizza(dia) {
    var date = new Date();
    if(dia>=0){
        var day = dia;
    }else{
        var day = date.getDay();
        var dia = day;

    }

    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;
    var shift = document.getElementById("shift").value;
    var category = document.getElementById("category").value;


    var xmlHttp = new XMLHttpRequest();
    //xmlHttp.open("GET", endpoint+"preditivo/get-statistics/"+category+"/hours_of_day", false); // false for synchronous request
    xmlHttp.open("GET", endpoint+"get_statistics/"+category+"/hours_of_day", false); // false for synchronous request
    xmlHttp.send(null);
    var statistic = JSON.parse(xmlHttp.response);
    var dias = statistic.dias;
    console.log(statistic);
    console.log(dias);
    var dias_semana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    var horarios = [ '0h', '01h', '02h', '03h', '04h', '05h', '06h', '07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h','18h', '19h', '20h', '21h', '22h', '23h'];
    var dados = [];
    var response = dias[day];

    for (var i = 0; i < 24; i++) {
        if(response[i]!=undefined){
            dados.push(response[i].toFixed(2));
            console.log(response[i].toFixed(2)+"%");

        }else{
            dados.push(0);

        }

    }

    $("#pizza").empty();
    var canvas = $("<canvas></canvas>", {
        id: 'schedule-day'
    });
    $("#pizza").append(canvas);
    var ctx = document.getElementById('schedule-day').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: horarios,
            datasets: [{
                label: "Hora",
                backgroundColor: ['#FEA47F', '#25CCF7', '#EAB543', '#55E6C1', '#F97F51', '#1B9CFC', '#F8EFBA', '#58B19F', '#2C3A47',
                    '#3B3B98', '#BDC581', '#527318','#FEA47F', '#25CCF7', '#EAB543', '#55E6C1', '#F97F51', '#1B9CFC', '#F8EFBA', '#58B19F', '#2C3A47',
                    '#3B3B98', '#BDC581', '#527318'],
                data: dados
            }]
        },
        options: {
            legend: {
                display: false
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function(tooltipItem, data) {
                        return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                    }
                }
            },
            title: {
                display: true,

                text: 'Horários dos Acidentes - '+dias_semana[dia],
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });


}

gerarGraficoPizza();

function gerarGraficoBarras(){
    var category = document.getElementById("category").value;

    // Gráfico 1

    var xmlHttp = new XMLHttpRequest();
    //xmlHttp.open("GET", endpoint+"preditivo/get-statistics/"+category+"/days_of_week", false); // false for synchronous request
    xmlHttp.open("GET", endpoint+"get_statistics/"+category+"/days_of_week", false); // false for synchronous request

    xmlHttp.send(null);
    var statistic = JSON.parse(xmlHttp.response);
    console.log(statistic);


            var dados = [];
            dados.push(statistic.domingo);
            dados.push(statistic.segunda);
            dados.push(statistic.terca);
            dados.push(statistic.quarta);
            dados.push(statistic.quinta);
            dados.push(statistic.sexta);
            dados.push(statistic.sabado);


            $("#bars").empty();
            var canvas = $("<canvas></canvas>", {
              id: 'weekly'
            });
            $("#bars").append(canvas);

            var ctx = document.getElementById('weekly').getContext('2d');

            var chart = new Chart(ctx, {
                type: 'bar',
                    data: {
                    labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
                    datasets: [{
                        label: "Acidentes",
                        backgroundColor: ['#0010FF', '#0010FF', '#0010FF', '#0010FF', '#0010FF', '#0010FF', '#0010FF'],
                        data: dados
                    }]
                },
                    options: {
                        onClick: barClickEvent,
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: 'Número de acidentes por dia da semana'
                        },
                        responsive: true,
                        maintainAspectRatio: false
                    }
            });
}

gerarGraficoBarras();

function barClickEvent(event, array){
    gerarGraficoPizza(array[0]._index);
    console.log(array[0]._index);
}

// Gráfico 2
// MENU
