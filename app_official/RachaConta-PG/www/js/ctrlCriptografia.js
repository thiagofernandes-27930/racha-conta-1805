/*
EQUIPE
	Joel Carvalho
	Marcela Oliveira
	Thiago Fernades
	Marcio Coelho
*/

appARachaConta.controller('ctrlCriptografia', function($scope,rachaContaService) {
	
	$scope.entradaDados = "";
	$scope.resultado = ""
	
	
	$scope.criptografar = function(dados_Entrada){
		$scope.resultado = "";
		var texto = dados_Entrada;
		var array = texto.split('');
		for (idx in array){
			 $scope.resultado = $scope.resultado + retoraLetra(array[idx]);
		}
	}

	$scope.descriptografar = function (dados_Entrada){
		$scope.resultado = "";
		var texto2 = dados_Entrada;
		var array2 = texto2.split('');
		for (idx in array2){
			 $scope.resultado = $scope.resultado + retoraCrip(array2[idx]);
		}
	}
	
	retoraLetra = function(letra){
		switch (letra) {
				case "a": {
					return "z";
					break;
				}
				case "b": {
					return "y";
					break;
				}
				case "c": {
					return "x";
					break;
				}
				case "d": {
					return "w";
					break;
				}
				case "e": {
					return "v";
					break;
				}
				case "f": {
					return "u";
					break;
				}
				case "g": {
					return "t";
					break;
				}
				case "h": {
					return "s";
					break;
				}
				case "i": {
					return "r";
					break;
				}
				case "j": {
					return "q";
					break;
				}
				case "k": {
					return "p";
					break;
				}
				case "l": {
					return "o";
					break;
				}
				case "m": {
					return "n";
					break;
				}
				case "n": {
					return "m";
					break;
				}
				case "o": {
					return "l";
					break;
				}
				case "p": {
					return "k";
					break;
				}
				case "q": {
					return "j";
					break;
				}
				case "r": {
					return "i";
					break;
				}
				case "s": {
					return "h";
					break;
				}
				case "t": {
					return "g";
					break;
				}
				case "u": {
					return "f";
					break;
				}
				case "v": {
					return "e";
					break;
				}
				case "w": {
					return "d";
					break;
				}
				case "x": {
					return "c";
					break;
				}
				case "y": {
					return "b";
					break;
				}
				case "z": {
					return "a";
					break;
				}
				case "ç": {
					return "@";
					break;
				}
			}
	}
	
	retoraCrip = function(letra){
		switch (letra) {
				case "z": {
					return "a";
					break;
				}
				case "y": {
					return "b";
					break;
				}
				case "x": {
					return "c";
					break;
				}
				case "w": {
					return "d";
					break;
				}
				case "v": {
					return "e";
					break;
				}
				case "u": {
					return "f";
					break;
				}
				case "t": {
					return "g";
					break;
				}
				case "s": {
					return "h";
					break;
				}
				case "r": {
					return "i";
					break;
				}
				case "q": {
					return "j";
					break;
				}
				case "p": {
					return "k";
					break;
				}
				case "o": {
					return "l";
					break;
				}
				case "n": {
					return "m";
					break;
				}
				case "m": {
					return "n";
					break;
				}
				case "l": {
					return "o";
					break;
				}
				case "k": {
					return "p";
					break;
				}
				case "j": {
					return "q";
					break;
				}
				case "i": {
					return "r";
					break;
				}
				case "h": {
					return "s";
					break;
				}
				case "g": {
					return "t";
					break;
				}
				case "f": {
					return "u";
					break;
				}
				case "e": {
					return "v";
					break;
				}
				case "d": {
					return "w";
					break;
				}
				case "c": {
					return "x";
					break;
				}
				case "b": {
					return "y";
					break;
				}
				case "a": {
					return "z";
					break;
				}
				case "@": {
					return "ç";
					break;
				}
			}
	}
});