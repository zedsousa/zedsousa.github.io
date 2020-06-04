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
    compra25.removeChild(compra25.childNodes[0])
    compra25.appendChild(compra25Text);

    var compra50Text = document.createTextNode(dados[0]['50%']);
    compra50.removeChild(compra50.childNodes[0])
    compra50.appendChild(compra50Text);

    var compra75Text = document.createTextNode(dados[0]['25%']);
    compra75.removeChild(compra75.childNodes[0])
    compra75.appendChild(compra75Text);


    var venda25Text = document.createTextNode(dados[2]['75%']);
    venda25.removeChild(venda25.childNodes[0])
    venda25.appendChild(venda25Text);

    var venda50Text = document.createTextNode(dados[2]['50%']);
    venda50.removeChild(venda50.childNodes[0])
    venda50.appendChild(venda50Text);

    var venda75Text = document.createTextNode(dados[2]['25%']);
    venda75.removeChild(venda75.childNodes[0])
    venda75.appendChild(venda75Text);
    

}


