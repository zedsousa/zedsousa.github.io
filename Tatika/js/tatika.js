var endpoint = "https://tatika.herokuapp.com/";
console.log("tatika funcionando");
function gerar_estatisticas(){
    var abertura = document.getElementById("valor_de_abertura").value;
    var acao = document.getElementById("nome_da_acao").value;


    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", endpoint+ "up-csv/"+abertura, false); // false for synchronous request
    xmlHttp.send(null);
    var response = JSON.parse(xmlHttp.response);

    var compra25 = document.querySelector("#compra25");
    var compra50 = document.querySelector("#compra50");
    var compra75 = document.querySelector("#compra75");

    var venda25 = document.querySelector("#venda25");
    var venda50 = document.querySelector("#venda50");
    var venda75 = document.querySelector("#venda75");



    dados= JSON.parse(JSON.stringify(response));
    console.log(dados);
    
    var compra25Text = document.createTextNode(dados[0]['75%']);
    compra25.replaceChild(compra25Text, compra25.childNodes[0]);

    var compra50Text = document.createTextNode(dados[0]['50%']);
    compra50.replaceChild(compra50Text, compra50.childNodes[0]);

    var compra75Text = document.createTextNode(dados[0]['25%']);
    compra75.replaceChild(compra75Text, compra75.childNodes[0]);


    var venda25Text = document.createTextNode(dados[2]['75%']);
    venda25.replaceChild(venda25Text, venda25.childNodes[0]);

    var venda50Text = document.createTextNode(dados[2]['50%']);
    venda50.replaceChild(venda50Text, venda50.childNodes[0]);

    var venda75Text = document.createTextNode(dados[2]['25%']);
    venda75.replaceChild(venda75Text, venda75.childNodes[0]);
    

}


