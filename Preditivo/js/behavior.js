var endpoint = "http://localhost:8084/";

function openMenu(){
	$("#option-menu").removeClass("btn-outline-dark");
	$("#option-menu").addClass("btn-dark");
	$("#option-estatisticas").removeClass("btn-dark");
	$("#option-estatisticas").addClass("btn-outline-dark");
	document.getElementById("menu").style.display = "block";
	document.getElementById("estatisticas").style.display = "none";
}

function openEstatisticas(){
	$("#option-menu").removeClass("btn-dark");
	$("#option-menu").addClass("btn-outline-dark");
	$("#option-estatisticas").removeClass("btn-outline-dark");
	$("#option-estatisticas").addClass("btn-dark");
	document.getElementById("menu").style.display = "none";
	document.getElementById("estatisticas").style.display = "block";
}

//switch
const toggle = document.querySelector('.toggle-input');
const initialState = localStorage.getItem('toggleState') == 'true';
toggle.checked = initialState;

toggle.addEventListener('change', function() {
	localStorage.setItem('toggleState', toggle.checked);
});