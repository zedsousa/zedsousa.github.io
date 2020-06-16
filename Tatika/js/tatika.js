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

