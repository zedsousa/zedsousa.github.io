//var endpoint = "http://localhost:8080/";
var endpoint = "http://localhost:3883/";

var setores, predicao, municipios, mapa_normal;
var tipo_mapa = 'roads';
var mapPredicao = L.geoJson();

//Estilo das predições
function style(feature) {


    return {


        fillColor: feature.properties.fill,
        weight: 2,
        opacity: 0.5,
        color: feature.properties.stroke,
        fillOpacity: 0.5
    };
}
//Estilo das sub-areas
function styleSetores(feature) {
    return {
        fillColor: feature.properties.fill,
        weight: 2,
        opacity: 0,
        color: feature.properties.stroke,
        fillOpacity: 0.1
    };
}
//criação do mapa com as variáveis iniciais
var map = L.map(document.getElementById('map'), {
    center: [-5.806772, -36.609787],
    zoom: 8

});
//imagens base do mapa

var nightmap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'),
    daymap   = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png');

//imagem padrão do mapa
daymap.addTo(map);

function setShift(){
    var shift = document.getElementById("shift").value;
    if(shift == 'day'){
        map.removeLayer(daymap);
        map.addLayer(nightmap);
        document.getElementById("shift").value = 'night';
    }else{
        map.removeLayer(nightmap);
        map.addLayer(daymap);
        document.getElementById("shift").value = 'day';
    }
    //gerarGraficoPizza();
    //gerarGraficoBarras();
    getGeojson();
}
function mostraBolinha(){
    var loading = document.querySelector("#preload");
    loading.style.display = "block"
}
function escondeBolinha(){
    var loading = document.querySelector("#preload");
    loading.style.display = "none"
}
function gerar_predicao(){
    
    mostraBolinha();
    gerarGraficoPizza();
    gerarGraficoBarras();
    getGeojson();
    escondeBolinha();
}









function getGeojson() {
    //colate os valores atuais dos filtros

    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;
    var shift = document.getElementById("shift").value;
    var category = document.getElementById("category").value;
    var tipo_mapa = document.getElementById("tipo_mapa").value;

    //realiza as requisições que retornam  a predição e as subáreas

    var xmlHttp = new XMLHttpRequest();


    //xmlHttp.open("GET", endpoint+"preditivo/get-prediction/"+category+"@"+shift+"/"+year+"/"+month+"/map", false); // false for synchronous request
    xmlHttp.open("GET", endpoint+"new_get_contour/"+category+"@"+shift+"/"+year+"/"+month+"/map", false); // false for synchronous request
    xmlHttp.send(null);
    var response2 = JSON.parse(xmlHttp.response);

    //xmlHttp.open("GET", endpoint+ "preditivo/get-prediction/"+category+"@"+shift+"/"+year+"/"+month+"/roads", false); // false for synchronous request
    xmlHttp.open("GET", endpoint+ "new_get_contour/"+category+"@"+shift+"/"+year+"/"+month+"/roads", false); // false for synchronous request
    xmlHttp.send(null);
    var response = JSON.parse(xmlHttp.response);



    //xmlHttp.open("GET", endpoint+"preditivo/get-rank/"+category+"@"+shift+"/"+year+"/"+month+"/segmentos", false); // false for synchronous request
    xmlHttp.open("GET", endpoint+"get_rank/"+category+"@"+shift+"/"+year+"/"+month+"/segmentos", false); // false for synchronous request
    xmlHttp.send(null);
    var response3 = JSON.parse(xmlHttp.response);



    if (response.status !== 500) {
        //gerarGraficoPizza();
        //gerarGraficoBarras();
        document.getElementById("erro-dados").style.display = "none";
        document.getElementById("erro-conexao").style.display = "none";

        map.removeLayer(mapPredicao);
        map.removeLayer(geojson);
        mapa_normal = response2;
        predicao = response;
        if (tipo_mapa=='roads'){
            mapPredicao = L.geoJson(predicao, {style: style, onEachFeature: onEachFeature}).addTo(map);
        }
        else{
            mapPredicao = L.geoJson(mapa_normal, {style: style}).addTo(map);
        }



        var ranking =  JSON.parse(JSON.stringify(response3));


        ranking = ranking[0];
        // ranking das subáreas
        var listaSegmentos = document.querySelector(".list-group");
        listaSegmentos.innerHTML = '';

        for (var i = 0 ; i<6; i++) {
            var segmento = ranking[i];
            var local = segmento.Rodovia + ": "+segmento.Segmento;
            var setorElement = document.createElement('li');

            var setorText = document.createTextNode(local);
            var valorElement = document.createElement('span');
            var valorText = document.createTextNode(1+i+"º");
            setorElement.setAttribute('class', "list-group-item d-flex justify-content-between align-items-center");
            valorElement.setAttribute('class', "badge badge-primary badge-pill");
            setorElement.appendChild(setorText);
            valorElement.appendChild(valorText);
            setorElement.appendChild(valorElement);
            listaSegmentos.appendChild(setorElement);
        }



        return xmlHttp.responseText;
    } else {
        if (response.message.indexOf("O sistema não pode encontrar o arquivo especificado") !== -1) {
            document.getElementById("erro-dados").style.display = "block";
            window.setTimeout(temporizadorErroDados, 5000);
        } else {
            document.getElementById("erro-conexao").style.display = "block";
            window.setTimeout(temporizadorErroConexao, 5000);
        }
    }
    gerarGraficoBarras();
    console.log("gerando gráficos")
    gerarGraficoPizza();
}


//funções do hover das subáreas
function highlightFeature(e) {
    var layer = e.target;



    info.update(layer.feature.properties);
}
function resetHighlight(e) {


    info.update();
}

var geojson;

geojson = L.geoJson(setores);

//função do zoom das subáreas

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//comportamentos das subáreas
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        /*click: zoomToFeature*/
    });
}

//definição do estilo e comportamentos das subáreas
geojson = L.geoJson(setores, {
    style: styleSetores,
    onEachFeature: onEachFeature
}).addTo(map);


//pop-up do nome das subáreas
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<span>Rodovia </span>' +(props ?
        '<b>' + props.Rodovia + '</b><br />'+'<span>Segmento </span>'+'<b>'+props.Segmento+ '</b>'
        : '          ');
};

info.addTo(map);


//legenda
var data = [10]

var width = 70,
    height = 245;

var svg = d3.select(".map_legend").append("svg")
    .attr("width", width)
    .attr("height", height);

var gradientBox = 0;

var y = d3.scaleLinear()
    .domain(d3.extent(data))
    .range([0, height]);

var gradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "100%")
    .attr("y2", "0%");

gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#3388BD")
    .attr("stop-opacity", 0.9);
gradient.append("stop")
    .attr("offset", "10%")
    .attr("stop-color", "#3388BD")
    .attr("stop-opacity", 0.9);
gradient.append("stop")
    .attr("offset", "20%")
    .attr("stop-color", "#34BBBF")
    .attr("stop-opacity", 0.9);
gradient.append("stop")
    .attr("offset", "30%")
    .attr("stop-color", "#35C295")
    .attr("stop-opacity", 0.9);
gradient.append("stop")
    .attr("offset", "40%")
    .attr("stop-color", "#36C465")
    .attr("stop-opacity", 0.9);
gradient.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "#39C737")
    .attr("stop-opacity", 0.9);
gradient.append("stop")
    .attr("offset", "60%")
    .attr("stop-color", "#A2CC3A")
    .attr("stop-opacity", 0.9);
gradient.append("stop")
    .attr("offset", "70%")
    .attr("stop-color", "#CEC53B")
    .attr("stop-opacity", 0.9);

gradient.append("stop")
    .attr("offset", "80%")
    .attr("stop-color", "#D1943C")
    .attr("stop-opacity", 0.9);

gradient.append("stop")
    .attr("offset", "90%")
    .attr("stop-color", "#D3623D")
    .attr("stop-opacity", 0.9);

gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#D63E4F")
    .attr("stop-opacity", 0.9);

svg.append("rect")
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("width", 22)
    .attr("height", height)
    .attr("stroke", "rgba(99, 114, 130, 0.16)")
    .attr("stroke-width", "1")
    .style("fill", "url(#gradient)");
svg.insert("g", ".ticks-group")
    .attr("class", "ticks")
    .attr("transform", "translate(" + 40 + ",0)")
    .selectAll("ticks")
    .data(y.ticks(4))
    .enter().append("text")
    .attr("y", y)
    .text(function(d) { return d; });
var maplegend = d3.select(".map_legend").append("p");
maplegend.attr("class", "signal_legend").text("-");

console.log("LEGENDA");




