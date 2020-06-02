var endpoint = "https://tatika.herokuapp.com/";
console.log("tatika funcionando");
function gerar_estatisticas(){
    var abertura = document.getElementById("valor_de_abertura").value;
    var acao = document.getElementById("nome_da_acao").value;


    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", endpoint+ "up-csv/"+abertura, false); // false for synchronous request
    xmlHttp.send(null);
    var response = JSON.parse(xmlHttp.response);

    // var compra25 = document.querySelector("#compra25");
    // var compra50 = document.querySelector("#compra50");
    // var compra75 = document.querySelector("#compra75");

    // var venda25 = document.querySelector("#venda25");
    // var venda50 = document.querySelector("#venda50");
    // var venda75 = document.querySelector("#venda75");

    dados= JSON.parse(JSON.stringify(response));
    console.log(dados);

}


