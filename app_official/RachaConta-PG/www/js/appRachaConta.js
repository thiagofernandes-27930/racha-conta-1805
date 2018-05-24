var appARachaConta = angular.module('appRachaConta',[]);

appARachaConta.service('rachaContaService', function() { //Tornando as funçoes disponiveis para todos os controles por referencia

// >>>>>>>>>>>>>  FUNÇÕES GRAVAÇÃO DE PERSISTENCIA  <<<<<<<<<<<<

	//RECEBE O SCOPE.OBJETO E NOME_DO_ARQUIVO_STR A SER GRAVADO NO LOCAL STORAGE E CHAMA AS FUNÇOES DO PROCESSO
	this.gravaObjetoLocalStorage = function(scopeObjeto, nomeArquivoSTR){ 
		this.gravarPersistenciaSTR(this.criaObjetoSTR(this.criarObjetoJSON(scopeObjeto)),nomeArquivoSTR);
	}
	
	//RECEBE O SCOPE.OBJETO E RETORNA OBJETO_JSON
	this.criarObjetoJSON = function (objeto){
		var objetoJSON = {
			conteudo : objeto
		}
		return objetoJSON;
	}
	
	//RECEBE OJSERO_JSON E RETORNA OBJETO_STR
	this.criaObjetoSTR = function (objeto_JSON){ 
	var objetoSTR = JSON.stringify(objeto_JSON); //Serealiza o objetoJSON
		return objetoSTR;
	}
	
	//RECEBE O OBJETO_STR E O NOME_DO_ARQUIVO_STR E GRAVA NO LOCAL STORAGE
	this.gravarPersistenciaSTR = function (objeto_STR, nomedaPersistenciaSTR){
		localStorage.setItem(nomedaPersistenciaSTR,objeto_STR); //Grava o objetoSTR no localStorage
	}
//---------------------------FIM-----------------------------------------



// >>>>>>>>>>>>>  FUNÇÕES DE RECUPERAÇÃO DE PERSISTENCIA <<<<<<<<<<<<

	this.recuperaObjetoLocalStorage = function(nomeArquivoSTR){ //Recebe o nome do objetoSTR armazenado e retorna o objetoJSON
		return this.recuperaObjetoJSON((this.recuperaPersistencia(nomeArquivoSTR)));
	}
	
	this.recuperaPersistencia = function(nomeObjetoSTR){ //Recupera e retorna o objetoSTR do local storage
		var objetoSTR = localStorage.getItem(nomeObjetoSTR);
		return objetoSTR;
	}
	
	this.recuperaObjetoJSON = function(objeto_STR){ //Recebe o objetoSTR e retorno o objetoJSON
		var objetoJSON = JSON.parse(objeto_STR);
		return objetoJSON.conteudo;
	}
//---------------------------FIM-----------------------------------------



// >>>>>>>>>>>>>  VARIAVEIS DE VALORES FUNÇOES DE CONTROLE  <<<<<<<<<<<<

	this.novoId = function(id_Controle){ //Calcula o novo ID para os registros chaves do App apartir persistencia controleIdSTR
		if (!this.persistenciaExiste("controleIdSTR")){
			this.gravaObjetoLocalStorage(controleId,"controleIdSTR");
			return controleId.idUsuario + 1;
		}else{
			controleId = this.recuperaObjetoLocalStorage("controleIdSTR");
			switch (id_Controle){
				case "idUsuario": {
					return controleId.idUsuario + 1;
					break;
				}
				case "idMembro": {
					return controleId.idMembro + 1;
					break;
				}
				case "idComanda" : {
					return controleId.idComanda + 1;
					break;
				}
				case "idItem" : {
					return controleId.idItem + 1;
					break;
				}
			}
		}
	}
	
	this.displayMensagem = function(titulo, mensagem){
		alert(titulo + ": " + mensagem);
		//console.log(titulo + ": " + mensagem);
	}

	this.irPara = function(url_Destino){
		window.location.href=url_Destino; 
	}
//---------------------------FIM-----------------------------------------



// >>>>>>>>>>>>>  FUNÇÕES DE VERIFICAÇÃO DE DADOS E ARQUIVOS <<<<<<<<<<<<

	this.persistenciaExiste = function(nomeDaPersistencia){ //Confere a existencia da persistencia e retorna true se existir ou false se não existor
		var objetoSTR = localStorage.getItem(nomeDaPersistencia);
		return objetoSTR!=null;
	}
});


	
	

