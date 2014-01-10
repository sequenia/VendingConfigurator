$(document).ready(function()
{
	var element = document.getElementById("converter-container"); 
    var clarity = new Clarity(element);

    angular.bootstrap(document.getElementById('app'), ['ProductionApp']);
    angular.bootstrap(document.getElementById('converter'), ['ConverterApp']);
});
