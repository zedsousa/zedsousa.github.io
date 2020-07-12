//var endpoint = "http://localhost:8080/";
endpoint = ENDPOINT_CAMPUS_SEGURO;

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var hours = date.getHours();

document.getElementById("year").value = year;
document.getElementById("month").value = month;
document.getElementById("shift").value = "day";
document.getElementById("category").value = "default";
/*
//cartao programa
var xmlHttp = new XMLHttpRequest();
//xmlHttp.open( "GET", endpoint + "/ocorrencia/retorna-cartao-programa", false );
xmlHttp.responseType="text";
xmlHttp.open( "GET", endpoint+"/ocorrencia/retorna-cartao-programa", true );
xmlHttp.send( null );
//var response = JSON.parse(xmlHttp.response);
var response = JSON.parse("{\"cartaoPrograma\":[[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"Setor 5\",\"\",\"setor 1\",\"\",\"\",\"\"],[\"CCSA\",\"\",\"\",\"\",\"\",\"Residência 1 e 4\",\"\",\"DMP\",\"SEPA\",\"Setor 3\",\"Reitoria\",\"Setor 4\",\"\",\"Reitoria\",\"Reitoria\",\"Biblioteca Central\",\"setor 1\",\"SEPA\",\"\",\"IMD\",\"Biblioteca Central\",\"Residência 1 e 4\",\"Reitoria\",\"DMP\"],[\"CB\",\"\",\"\",\"\",\"\",\"\",\"\",\"NUPLAM\",\"nPITI\",\"IMD\",\"Setor 4\",\"\",\"\",\"Reitoria\",\"IMD\",\"DMP\",\"Biblioteca Central\",\"Biblioteca CCHLA\",\"setor 1\",\"Setor 5\",\"\",\"setor 1\",\"Reitoria\",\"Reitoria\"],[\"Lab. Química 1\",\"\",\"\",\"\",\"\",\"\",\"\",\"Setor 3\",\"Centro de Convivência\",\"NUPEG\",\"Setor 2\",\"Reitoria\",\"\",\"Reitoria\",\"Setor 5\",\"Residência 1 e 4\",\"\",\"Lab. Química 1\",\"\",\"IMD\",\"CB\",\"\",\"\",\"Reitoria\"],[\"Reitoria\",\"Reitoria\",\"\",\"\",\"\",\"\",\"\",\"Residência 1 e 4\",\"\",\"Centro de Convivência\",\"Setor 5\",\"Residência 1 e 4\",\"\",\"DMP\",\"IMD\",\"IMD\",\"Reitoria\",\"Setor 3\",\"SEPA\",\"IMD\",\"\",\"\",\"Reitoria\",\"\"],[\"ECT\",\"\",\"\",\"\",\"\",\"\",\"\",\"setor 1\",\"CB\",\"DMP\",\"DMP\",\"\",\"\",\"CCET\",\"\",\"Centro de Convivência\",\"CT\",\"\",\"IMD\",\"DMP\",\"IMD\",\"\",\"Reitoria\",\"Reitoria\"],[\"\",\"Reitoria\",\"\",\"\",\"\",\"Residência 1 e 4\",\"\",\"\",\"\",\"DMP\",\"CB\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"Núcleo de Yoga\",\"Reitoria\",\"\",\"\"]]}");
console.log(response);

var date = new Date();
var timeline = document.querySelector(".timeline");
var day  = date.getDay();
console.log(day);
var horas  = response.cartaoPrograma[day];
console.log(horas);

for (var i =0; i<24; i++){
	if (horas[i]!=""){
		var eventoElement = document.createElement('li');
		var setorText = document.createTextNode(horas[i]);
		var setorElement = document.createElement('a');
		var horaText = document.createTextNode(i+"h00");
		var horaElement = document.createElement('a');

		setorElement.setAttribute('href', '#');
		horaElement.setAttribute('href', '#');

		setorElement.appendChild(setorText);
		horaElement.appendChild(horaText);

		horaElement.setAttribute("class", "float-right")
		eventoElement.appendChild(setorElement);
		eventoElement.appendChild(horaElement);
		timeline.appendChild(eventoElement);

	}

}*/

getGeojson();