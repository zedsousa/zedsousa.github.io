var endpoint = "http://localhost:8084/";

// MENU
function gerarGraficoPizza(){
	var date = new Date();
	var day = date.getDay();

	var month = document.getElementById("month").value;
	var year = document.getElementById("year").value;
	var shift = document.getElementById("shift").value;
	var category = document.getElementById("category").value;

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
	    	var response = JSON.parse(xhr.response);
	    	var horarios = [];
			var dados = [];

			switch(day) {
				case 0:
					var response = JSON.parse(xhr.response).domingo;
					break;
				case 1:
					var response = JSON.parse(xhr.response).segunda;
					break;
				case 2:
					var response = JSON.parse(xhr.response).terca;
					break;
				case 3:
					var response = JSON.parse(xhr.response).quarta;
					break;
				case 4:
					var response = JSON.parse(xhr.response).quinta;
					break;
				case 5:
					var response = JSON.parse(xhr.response).sexta;
					break;
				case 6:
					var response = JSON.parse(xhr.response).sabado;
					break;
			}
			if(shift == "day"){
				horarios = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
				for(var i=6;i<18;i++){
					dados.push(response[i]);

				}


			}else if(shift == "night"){
				horarios = ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00'];
				for(var i=18; i<24;i++){
					dados.push(response[i]);
				}
				for(var i=0; i<6;i++){
					dados.push(response[i]);
				}
			}

	    	if(shift == "day"){
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
		    	            backgroundColor: ['#FEA47F', '#25CCF7', '#EAB543', '#55E6C1', '#F97F51', '#1B9CFC', '#F8EFBA', '#58B19F', '#2C3A47',
		    	                '#3B3B98', '#BDC581', '#527318'],
		    	            data: dados
		    	        }]
		    	    },
		    	    options: {
	    	            title: {
	    	                display: true,
	    	                text: 'Horários das Ocorrências - Média'
	    	            },
	    	            responsive: true,
	    	            maintainAspectRatio: false
	    	        }
		    	});
	    	} else if(shift == "night") {
	    		$("#pizza").empty();
	        	var canvas = $("<canvas></canvas>", {
	    	      id: 'schedule-night'
	    	    });
	        	$("#pizza").append(canvas);
	    		var ctx = document.getElementById('schedule-night').getContext('2d');
		    	var chart = new Chart(ctx, {
		    	    type: 'pie',
		    	        data: {
		    	        labels: horarios,
		    	        datasets: [{
		    	            backgroundColor: ['#0010FF', '#006EFF', '#00BDFF', '#00F9FF', '#3AFFFF', '#00EAFF', '#47FFFF', '#00EAFF', '#009EFF',
		    	                '#0059FF', '#002FFF', '#000BFF'],
		    	            data: dados
		    	        }]
		    	    },
		    	    options: {
	    	            title: {
	    	                display: true,
	    	                text: 'Horários das Ocorrências - Média'
	    	            },
	    	            responsive: true,
	    	            maintainAspectRatio: false
	    	        }
		    	});
	    	}
	    }
	}
	xhr.open('GET', endpoint + "ocorrencia/horario_ocorrencias/" + category, true);
	xhr.send(null);
}

gerarGraficoPizza();

function gerarGraficoBarras(){
	var month = document.getElementById("month").value;
	var year = document.getElementById("year").value;
	var shift = document.getElementById("shift").value;
	var category = document.getElementById("category").value;

	// Gráfico 1

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
	    	var response = JSON.parse(xhr.response);
	    	var dados = [];
	    	dados.push(response.domingo.qtd);
	    	dados.push(response.segunda.qtd);
	    	dados.push(response.terca.qtd);
	    	dados.push(response.quarta.qtd);
	    	dados.push(response.quinta.qtd);
	    	dados.push(response.sexta.qtd);
	    	dados.push(response.sabado.qtd);
	    	
	    	$("#bars").empty();
	    	var canvas = $("<canvas></canvas>", {
		      id: 'weekly'
		    });
	    	$("#bars").append(canvas);
	    	
	    	var ctx = document.getElementById('weekly').getContext('2d');
	    	
	    	var chart = new Chart(ctx, {
	    	    type: 'bar',
	    	        data: {
	    	        labels: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
	    	        datasets: [{
	    	            label: "Ocorrências",
	    	            backgroundColor: ['#0010FF', '#0010FF', '#0010FF', '#0010FF', '#0010FF', '#0010FF', '#0010FF'],
	    	            data: dados
	    	        }]
	    	    },
	    	        options: {
	    	            legend: {
	    	                display: false,
	    	            },
	    	            title: {
	    	                display: true,
	    	                text: 'Ocorrências - Mês Passado'
	    	            },
	    	            responsive: true,
	    	            maintainAspectRatio: false
	    	        }
	    	});
	    }
	}
	
	var turno;
	if(shift == "day"){
		turno = "dia";
	} else if(shift == "night"){
		turno = "noite";
	}
	
	var mes = month+1;

	xhr.open('GET', endpoint + "ocorrencia/estatistica_semana/" + year + "/" + mes + "/" + category + "/" + turno, true);
	xhr.send(null);
}

gerarGraficoBarras();

// Gráfico 2
