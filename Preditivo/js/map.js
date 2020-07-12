var endpoint = "http://localhost:8084/";

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
        opacity: 0.5,
        color: feature.properties.stroke,
        fillOpacity: 0.1
    };
}
//criação do mapa com as variáveis iniciais
var map = L.map(document.getElementById('map'), {
    center: [-5.836500, -35.203254],
    zoom: 15.5

});
//imagem base do mapa
var basemap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {});
basemap.addTo(map);

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
    gerarGraficoPizza();
    gerarGraficoBarras();
    getGeojson();
}

var nightmap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'),
    daymap   = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png');

function destroymap(){
    map.off();
    map.remove();
}

var predicao = null;
var mapPredicao = L.geoJson(predicao, {style: style}).addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.3
    });

    info.update(layer.feature.properties);
}
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}
var geojson;
// ... our listeners
geojson = L.geoJson(setores);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(setores, {
    style: styleSetores,
    onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Setor</h4>' +(props ?
        '<b>' + props.local + '</b><br />'  + ' '
        : ''); ;
};

info.addTo(map);

function temporizadorErroDados(){
    document.getElementById("erro-dados").style.display = "none";
}

function temporizadorErroConexao(){
    document.getElementById("erro-conexao").style.display = "none";
}

function destruirLayer(geo){
    map.removeLayer(mapPredicao);
    map.removeLayer(geojson);
}
var setores = { "type": "FeatureCollection", "features": [ { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "CB" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20270049571991, -5.842508982125744 ], [ -35.20139157772064, -5.842508982125744 ], [ -35.20139157772064, -5.840875994728329 ], [ -35.20270049571991, -5.840875994728329 ], [ -35.20270049571991, -5.842508982125744 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "Mata dos Saguis": "" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20135939121246, -5.8425410014388595 ], [ -35.20186364650726, -5.842535664886818 ], [ -35.20168662071228, -5.843378839481662 ], [ -35.20052790641785, -5.843490906895501 ], [ -35.20048499107361, -5.841937970734072 ], [ -35.20135939121246, -5.841937970734072 ], [ -35.20135939121246, -5.8425410014388595 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Setor 4" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20043671131134, -5.842935906150291 ], [ -35.19922971725464, -5.842935906150291 ], [ -35.19922971725464, -5.841932634176267 ], [ -35.20043671131134, -5.841932634176267 ], [ -35.20043671131134, -5.842935906150291 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "ECT" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.199830532073975, -5.843570955034518 ], [ -35.198537707328796, -5.843709705115019 ], [ -35.198537707328796, -5.843138694947912 ], [ -35.199825167655945, -5.843138694947912 ], [ -35.199830532073975, -5.843570955034518 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "CT" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19921362400054, -5.843074656388166 ], [ -35.19845187664032, -5.843074656388166 ], [ -35.19845187664032, -5.842508982125744 ], [ -35.19921362400054, -5.842508982125744 ], [ -35.19921362400054, -5.843074656388166 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Dep. Arquitetura" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19919753074646, -5.842476962810783 ], [ -35.19843578338623, -5.842476962810783 ], [ -35.19843578338623, -5.841932634176267 ], [ -35.19919753074646, -5.841932634176267 ], [ -35.19919753074646, -5.842476962810783 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Setor 3" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20110189914703, -5.841911287944538 ], [ -35.19987344741821, -5.8418952782701945 ], [ -35.19986808300018, -5.841334939379918 ], [ -35.19964277744293, -5.841318929689098 ], [ -35.19964814186096, -5.84033700111083 ], [ -35.19988954067229, -5.840347674256834 ], [ -35.20110189914703, -5.840347674256834 ], [ -35.20110189914703, -5.841911287944538 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "nPITI" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19792079925537, -5.842759800029599 ], [ -35.19737899303436, -5.842759800029599 ], [ -35.19737899303436, -5.842311529654307 ], [ -35.19792079925537, -5.842311529654307 ], [ -35.19792079925537, -5.842759800029599 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "DCA" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19779205322266, -5.843042637105571 ], [ -35.19709467887879, -5.843042637105571 ], [ -35.19709467887879, -5.842775809679236 ], [ -35.19779205322266, -5.842775809679236 ], [ -35.19779205322266, -5.843042637105571 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Núcleo de Tecnologia" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.197346806526184, -5.842695761426534 ], [ -35.197041034698486, -5.842701097977074 ], [ -35.197046399116516, -5.842989271630456 ], [ -35.19585013389587, -5.84296258889101 ], [ -35.19585013389587, -5.842695761426534 ], [ -35.19585013389587, -5.842034028765936 ], [ -35.197346806526184, -5.842034028765936 ], [ -35.197346806526184, -5.842695761426534 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "NUPEG" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19679963588714, -5.8436083108288255 ], [ -35.19676208496094, -5.843800426302905 ], [ -35.19637048244476, -5.843709705115019 ], [ -35.195844769477844, -5.843437541463146 ], [ -35.195308327674866, -5.842594366956695 ], [ -35.195817947387695, -5.842621049713698 ], [ -35.195817947387695, -5.843005281273529 ], [ -35.19679963588714, -5.8430159543686555 ], [ -35.19679963588714, -5.8436083108288255 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Dep. Geologia" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.1961612701416, -5.842002009423814 ], [ -35.19516885280609, -5.842002009423814 ], [ -35.19516885280609, -5.841222871534579 ], [ -35.1961612701416, -5.841222871534579 ], [ -35.1961612701416, -5.842002009423814 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "DFTE" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.198038816452026, -5.841991336309374 ], [ -35.19620954990387, -5.841991336309374 ], [ -35.19620954990387, -5.841318929689098 ], [ -35.198038816452026, -5.841318929689098 ], [ -35.198038816452026, -5.841991336309374 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "DIMAP" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19842505455017, -5.8418952782701945 ], [ -35.198081731796265, -5.8418952782701945 ], [ -35.198081731796265, -5.841116140232454 ], [ -35.19842505455017, -5.841116140232454 ], [ -35.19842505455017, -5.8418952782701945 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "SINFO" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19901514053345, -5.84188994171197 ], [ -35.19844651222229, -5.84188994171197 ], [ -35.19844651222229, -5.841222871534579 ], [ -35.19901514053345, -5.841222871534579 ], [ -35.19901514053345, -5.84188994171197 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "CCET" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19961595535278, -5.841073447705919 ], [ -35.199605226516724, -5.841318929689098 ], [ -35.199556946754456, -5.841297583433961 ], [ -35.199556946754456, -5.841729844941867 ], [ -35.199058055877686, -5.841735181501606 ], [ -35.199047327041626, -5.841169505886061 ], [ -35.19846796989441, -5.84121219840528 ], [ -35.19846260547638, -5.841052101441431 ], [ -35.19802808761597, -5.841073447705919 ], [ -35.19802808761597, -5.840561137133582 ], [ -35.19905269145965, -5.840577146846054 ], [ -35.199068784713745, -5.840353010829727 ], [ -35.19961595535278, -5.840347674256808 ], [ -35.19961595535278, -5.841073447705919 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Setor 2" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.1979798078537, -5.841180179016174 ], [ -35.19588232040405, -5.841180179016174 ], [ -35.19588232040405, -5.839862045909101 ], [ -35.1979798078537, -5.839862045909101 ], [ -35.1979798078537, -5.841180179016174 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Lab. Química 1" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19885957241058, -5.840561137133582 ], [ -35.19801735877991, -5.840529117707251 ], [ -35.19801735877991, -5.839856709331512 ], [ -35.19885957241058, -5.839856709331512 ], [ -35.19885957241058, -5.840561137133582 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Instituo Internacional de Física" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.195855498313904, -5.840513107993405 ], [ -35.1952064037323, -5.840513107993405 ], [ -35.19545316696167, -5.839883392218944 ], [ -35.195855498313904, -5.839862045909101 ], [ -35.195855498313904, -5.840513107993405 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Setor 5" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19817292690277, -5.838821412317886 ], [ -35.19791543483734, -5.838810739142837 ], [ -35.19791543483734, -5.8390775684581415 ], [ -35.19644558429718, -5.839056222117587 ], [ -35.19646167755127, -5.838607948778208 ], [ -35.196805000305176, -5.838068952978633 ], [ -35.1972770690918, -5.837508610261092 ], [ -35.19816219806671, -5.837519283460948 ], [ -35.19817292690277, -5.838821412317886 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Biblioteca CCHLA" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19885420799255, -5.839765987504742 ], [ -35.197556018829346, -5.8397393046117125 ], [ -35.197577476501465, -5.8391362708904495 ], [ -35.19795298576355, -5.839141607474907 ], [ -35.19794762134551, -5.838853431841835 ], [ -35.19885420799255, -5.838853431841835 ], [ -35.19885420799255, -5.839765987504742 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Reitoria" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20236790180206, -5.840582483416785 ], [ -35.20123064517975, -5.840582483416785 ], [ -35.20123064517975, -5.838559919470568 ], [ -35.20187437534332, -5.838629295135836 ], [ -35.2018529176712, -5.839114924552146 ], [ -35.20236253738403, -5.839157617227951 ], [ -35.20236790180206, -5.840582483416785 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "NUPLAM" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.203837752342224, -5.84074791708402 ], [ -35.20277559757233, -5.840801282772715 ], [ -35.202791690826416, -5.839328387898663 ], [ -35.20456194877624, -5.839237665986323 ], [ -35.203837752342224, -5.84074791708402 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Biblioteca Central" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.199562311172485, -5.840299645098323 ], [ -35.19892394542694, -5.840299645098323 ], [ -35.19892394542694, -5.838928144057223 ], [ -35.199562311172485, -5.838928144057223 ], [ -35.199562311172485, -5.840299645098323 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Centro de Convivência" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20090341567993, -5.840294308524908 ], [ -35.199583768844604, -5.840294308524908 ], [ -35.199583768844604, -5.838549246290546 ], [ -35.20090341567993, -5.838549246290546 ], [ -35.20090341567993, -5.840294308524908 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "setor 1" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20121455192565, -5.838522563339579 ], [ -35.19900977611541, -5.838522563339579 ], [ -35.19900977611541, -5.836958940193821 ], [ -35.20011484622955, -5.837028316057276 ], [ -35.20121455192566, -5.837038989266279 ], [ -35.20121455192565, -5.838522563339579 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Pista de Atletismo" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20124673843384, -5.8368361982605 ], [ -35.20111262798309, -5.8369909598241785 ], [ -35.20076930522919, -5.8370016330338945 ], [ -35.20045816898346, -5.836980286614258 ], [ -35.200297236442566, -5.8368308616540965 ], [ -35.200324058532715, -5.835384639445491 ], [ -35.200839042663574, -5.835261897167462 ], [ -35.201284289360046, -5.835443342264618 ], [ -35.20124673843384, -5.8368361982605 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Dep. Ed.Física" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20244836807251, -5.837038989266279 ], [ -35.20143449306488, -5.837038989266279 ], [ -35.20143449306488, -5.835683490097024 ], [ -35.20244836807251, -5.835683490097024 ], [ -35.20244836807251, -5.837038989266279 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Dep. Fisioterapia" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20028114318847, -5.835400649305859 ], [ -35.19993245601654, -5.835416659165782 ], [ -35.19989490509033, -5.83519785770739 ], [ -35.20020604133606, -5.834893670172136 ], [ -35.20070493221282, -5.834856313796778 ], [ -35.20067811012268, -5.835229877438342 ], [ -35.20041525363922, -5.835283243652529 ], [ -35.20028114318847, -5.835400649305859 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Ginasinho" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19977152347565, -5.836302537368391 ], [ -35.19912242889404, -5.836302537368391 ], [ -35.19912242889404, -5.83550738169665 ], [ -35.19977152347565, -5.83550738169665 ], [ -35.19977152347565, -5.836302537368391 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "NEI" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20619809627533, -5.837599332453384 ], [ -35.205795764923096, -5.837599332453384 ], [ -35.2054899930954, -5.837183077567901 ], [ -35.20564556121826, -5.836692109869708 ], [ -35.206348299980164, -5.836868217897881 ], [ -35.20619809627533, -5.837599332453384 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Biblioteca Escola de Música" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.207083225250244, -5.837850152555601 ], [ -35.20627319812775, -5.837738084013162 ], [ -35.20635902881622, -5.836873554503928 ], [ -35.207083225250244, -5.836873554503928 ], [ -35.207083225250244, -5.837850152555601 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Capela Ecumênica do Campus" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20888030529022, -5.837545966459699 ], [ -35.20823657512665, -5.837545966459699 ], [ -35.20823657512665, -5.8368895643217655 ], [ -35.20888030529022, -5.8368895643217655 ], [ -35.20888030529022, -5.837545966459699 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Praça Cívica" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.21043598651886, -5.838298426501232 ], [ -35.209293365478516, -5.838143665298623 ], [ -35.20962595939637, -5.83694826698329 ], [ -35.210784673690796, -5.837353848840374 ], [ -35.21043598651886, -5.838298426501232 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Comperve" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.21198630332947, -5.834146542192109 ], [ -35.21125674247742, -5.834285294606526 ], [ -35.21131038665771, -5.833853027356167 ], [ -35.2119755744934, -5.833671581744372 ], [ -35.21198630332947, -5.834146542192109 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "DDRH" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.210784673690796, -5.835283243652529 ], [ -35.210537910461426, -5.835357956343856 ], [ -35.210586190223694, -5.83591296459632 ], [ -35.21000146865845, -5.83591296459632 ], [ -35.210049748420715, -5.835165837974607 ], [ -35.21063446998596, -5.834813620793313 ], [ -35.210784673690796, -5.835283243652529 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "DEART" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.211777091026306, -5.835566084502916 ], [ -35.21063446998596, -5.835918301211464 ], [ -35.2106237411499, -5.83536329296428 ], [ -35.21087050437927, -5.835299253515798 ], [ -35.21067202091218, -5.834680205136554 ], [ -35.2116322517395, -5.834440056874391 ], [ -35.211777091026306, -5.835566084502916 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "INPE" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20942211151123, -5.836099746096171 ], [ -35.209046602249146, -5.836099746096171 ], [ -35.209046602249146, -5.835512718315662 ], [ -35.20942211151123, -5.835512718315662 ], [ -35.20942211151123, -5.836099746096171 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "SEDIS" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.209019780159, -5.8365533580509705 ], [ -35.2082633972168, -5.8365533580509705 ], [ -35.2082633972168, -5.836009023661165 ], [ -35.209019780159, -5.836009023661165 ], [ -35.209019780159, -5.8365533580509705 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "DMP" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20522177219391, -5.838261070352788 ], [ -35.20392894744873, -5.838261070352788 ], [ -35.20392894744873, -5.837695391229193 ], [ -35.20522177219391, -5.837695391229193 ], [ -35.20522177219391, -5.838261070352788 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "SEPA" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19896149635315, -5.838784056204314 ], [ -35.19823729991912, -5.838784056204314 ], [ -35.19823729991912, -5.838346455831288 ], [ -35.19896149635315, -5.838346455831288 ], [ -35.19896149635315, -5.838784056204314 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "CCSA" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19896686077118, -5.838266406945592 ], [ -35.19820511341095, -5.838266406945592 ], [ -35.19820511341095, -5.837519283460948 ], [ -35.19896686077118, -5.837519283460948 ], [ -35.19896686077118, -5.838266406945592 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "loal": "Ginásio" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.202818512916565, -5.835651470391987 ], [ -35.20186364650726, -5.835651470391987 ], [ -35.20186364650726, -5.8349043434217736 ], [ -35.202818512916565, -5.8349043434217736 ], [ -35.202818512916565, -5.835651470391987 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "UATR" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.204288363456726, -5.83453611619162 ], [ -35.203655362129204, -5.83453611619162 ], [ -35.203655362129204, -5.834055819441044 ], [ -35.204288363456726, -5.834055819441044 ], [ -35.204288363456726, -5.83453611619162 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Residência 1 e 4" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20501792430877, -5.833207294176312 ], [ -35.20428299903869, -5.833207294176312 ], [ -35.204325914382935, -5.832198668135084 ], [ -35.20501792430877, -5.831969192115814 ], [ -35.20501792430877, -5.833207294176312 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Instituto do Cérebro" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.205586552619934, -5.833217967458074 ], [ -35.20490527153015, -5.8344880865350985 ], [ -35.20447611808776, -5.8342852946065396 ], [ -35.204331278800964, -5.834392027209652 ], [ -35.20427763462066, -5.8342052451408755 ], [ -35.204363465309136, -5.833965096675323 ], [ -35.204089879989624, -5.833858363990928 ], [ -35.20427763462066, -5.8332393140209495 ], [ -35.20506620407104, -5.833260660583023 ], [ -35.20505547523498, -5.8329884918558506 ], [ -35.2052217721939, -5.832999165141747 ], [ -35.20523250102996, -5.8330898880637605 ], [ -35.205586552619934, -5.833217967458074 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "IMD" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20586550235748, -5.832897768917412 ], [ -35.205060839653015, -5.832940462066725 ], [ -35.20505547523498, -5.831985202073684 ], [ -35.20566165447235, -5.83178240924013 ], [ -35.20586550235748, -5.832897768917412 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Dep. nutrição" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20300626754761, -5.834877660297277 ], [ -35.20223379135132, -5.834877660297277 ], [ -35.20223379135132, -5.834215918403605 ], [ -35.20300626754761, -5.834215918403605 ], [ -35.20300626754761, -5.834877660297277 ] ] ] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20167589187622, -5.835208530951241 ], [ -35.20073711872101, -5.835208530951241 ], [ -35.20076394081116, -5.834488086535073 ], [ -35.20167589187622, -5.833991779843216 ], [ -35.20167589187622, -5.835208530951241 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Núcleo de Yoga" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20192801952362, -5.834845640546211 ], [ -35.20169734954834, -5.834845640546211 ], [ -35.20169734954834, -5.833938413506095 ], [ -35.20192801952362, -5.833938413506095 ], [ -35.20192801952362, -5.834845640546211 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Escola de Enfermagem" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.202206969261155, -5.834514769678119 ], [ -35.201938748359666, -5.834504096421064 ], [ -35.201954841613755, -5.833628888650732 ], [ -35.20234644412994, -5.833602205465537 ], [ -35.20234644412994, -5.833997116476642 ], [ -35.20261466503142, -5.833991779843228 ], [ -35.20260393619536, -5.834199908509421 ], [ -35.202206969261155, -5.834194571877917 ], [ -35.202206969261155, -5.834514769678119 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "Restaurante" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.20411670207977, -5.8335755222790695 ], [ -35.20319402217865, -5.833612878739755 ], [ -35.20319402217865, -5.832823055898285 ], [ -35.20418643951416, -5.832823055898285 ], [ -35.20411670207977, -5.8335755222790695 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "LAUT" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19743800163269, -5.843341483672075 ], [ -35.197073221206665, -5.843341483672075 ], [ -35.197073221206665, -5.8430960025755585 ], [ -35.19743800163269, -5.8430960025755585 ], [ -35.19743800163269, -5.843341483672075 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "LAMP" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.19749701023102, -5.843645666620602 ], [ -35.19722878932953, -5.843645666620602 ], [ -35.19722878932953, -5.843357493305059 ], [ -35.19749701023102, -5.843357493305059 ], [ -35.19749701023102, -5.843645666620602 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "CTEC" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.198355317115784, -5.842589030405137 ], [ -35.19839823246001, -5.842882540665011 ], [ -35.1981085538864, -5.842973261986939 ], [ -35.198108553886414, -5.843341483672075 ], [ -35.19795835018158, -5.843715041655903 ], [ -35.197690129280076, -5.843522926152486 ], [ -35.19781351089476, -5.843144031494229 ], [ -35.19781351089476, -5.842786482778715 ], [ -35.19794762134552, -5.84279181932839 ], [ -35.19795835018158, -5.84266907867308 ], [ -35.198355317115784, -5.842589030405137 ] ] ] } }, { "type": "Feature", "properties": { "stroke": "#555555", "stroke-width": 2, "stroke-opacity": 1, "fill": "#555555", "fill-opacity": 0.5, "local": "NUPPRAR" }, "geometry": { "type": "Polygon", "coordinates": [ [ [ -35.199835896492004, -5.841863258920133 ], [ -35.199583768844604, -5.841863258920133 ], [ -35.199583768844604, -5.841361622196918 ], [ -35.199835896492004, -5.841361622196918 ], [ -35.199835896492004, -5.841863258920133 ] ] ] } } ] };
function getGeojson() {
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;
    var shift = document.getElementById("shift").value;
    var category = document.getElementById("category").value;

    var somePrediction = category + "@" + shift + "-" + year + "-" + month;
    console.log(somePrediction);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", endpoint + "ocorrencia/retorna_predicao/" + somePrediction, false); // false for synchronous request
    xmlHttp.send(null);
    var response = JSON.parse(xmlHttp.response);
    console.log("response: " + response.toString());
    var xmlHttp2 = new XMLHttpRequest();
    xmlHttp2.open("GET", endpoint + "ocorrencia/retorna_predicao/setores" + somePrediction, false); // false for synchronous request
    xmlHttp2.send(null);
    var response2 = JSON.parse(xmlHttp2.response);
    console.log("response2: " + response2.toString());

    if (response.status !== 500) {
        gerarGraficoPizza();
        gerarGraficoBarras();
        document.getElementById("erro-dados").style.display = "none";
        document.getElementById("erro-conexao").style.display = "none";

        destruirLayer();
        setores = response2;
        var listaSetores = document.querySelector(".list-group");
        listaSetores.innerHTML = '';
        var setoresFeatures = setores.features;
        var locais = [], valores = [], valoresOrdenados = [];
        for (feature of setoresFeatures) {
            var local = feature.properties.local;
            var valor = feature.properties.Prediction;


            if (local != null) {
                locais.push(local);
                valores.push(valor);
                valoresOrdenados.push(valor);

            }

        }
        valoresOrdenados.sort(function (a, b) {
            return b - a
        });
        for (var i = 0; i < 10; i++) {
            var valor = valoresOrdenados[i];
            var indice = valores.indexOf(valor);
            var local = locais[indice]
            var setorElement = document.createElement('li');

            var setorText = document.createTextNode(local);
            var valorElement = document.createElement('span');
            var valorText = document.createTextNode(i+1+"º");

            setorElement.setAttribute('class', "list-group-item d-flex justify-content-between align-items-center");
            valorElement.setAttribute('class', "badge badge-primary badge-pill");
            setorElement.appendChild(setorText);
            valorElement.appendChild(valorText);
            setorElement.appendChild(valorElement);
            listaSetores.appendChild(setorElement);
        }


        predicao = response;
        mapPredicao = L.geoJson(predicao, {style: style}).addTo(map);
        geojson = L.geoJson(setores, {
            style: styleSetores,
            onEachFeature: onEachFeature
        }).addTo(map);

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
}