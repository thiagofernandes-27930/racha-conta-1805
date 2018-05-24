appARachaConta.controller('ctrlComanda', function($scope,rachaContaService) {


// >>>>>>>>>>>>>  VARIAVEIS DE VALORES FUNÇOES DE CONTROLE  <<<<<<<<<<<<

	//Variáveis de valores
	$scope.titulo="Comanda";
	$scope.rLine1 = "UNANMA Turma de Análise e Desenvolvimento de Sistemas";
	$scope.rLine2 = "2018.1 - Noite (Joel, Marcela, Thiago e Márcio)";
	$scope.botao = "Adicionar";
	$scope.botao2 = "Abrir Comanda";
	$scope.botao3 = "Fechar Comanda";
	$scope.nomeMembro = undefined;
	$scope.idMesaCheck = 0;
	$scope.logo = "";
	//var editaDados = false;
	var editarItemMembro = [];
	var comanda = [];


	//Arreio de Dados
	$scope.lsMembros = [];
	//$scope.lsComanda = [];
	//$scope.lsMesas = [];
	
//---------------------------FIM-----------------------------------------



// >>>>>>>>>>>>>  VARIAVEIS e FUNÇÕES DE CONTROLE DE TELA E MENSAGEM  <<<<<<<<<<<<

	//Status inicial das telas
	$scope.exibirTelaComanda = true;
	$scope.exibirTelaCadastroMembro = false;
	$scope.exibirTelaCheckInMesa = false;
	$scope.exibirTelaExtrato = false;
	$scope.exibirTelaComandaFinilizada = false;
	$scope.telaPagamentoInformado = false;
	$scope.exibirSubtelaLsComanda = true;
	
	$scope.abrirTelaCadastroMembro = function(){
		$scope.exibirTelaComanda = false;
		$scope.exibirTelaCheckInMesa = false;
		$scope.exibirTelaExtrato = false;
		$scope.exibirTelaCadastroMembro = true;
		$scope.lsMembros = membros;
	}
	
	$scope.abrirTelaCheckInMesa = function(){
		//lsMesas = [];
		$scope.lsMesas = [];
		mesas = rachaContaService.recuperaObjetoLocalStorage("mesasSTR")
		for(idx in mesas){
			if (mesas[idx].idEstabelecimento == checkIn.idEstabelecimento && mesas[idx].statusMesa == true){
				var objetoItem = {
					idEstabelecimento : mesas[idx].idEstabelecimento,
					idMesa : mesas[idx].idMesa,
					numeroPesoas : mesas[idx].numeroPesoas,
					statusMesa : false
				}
				$scope.lsMesas.push(objetoItem);
			}
		}

		//$scope.lsMesas = mesas;
		$scope.exibirTelaComanda = false;
		$scope.exibirTelaCadastroMembro = false;
		$scope.exibirTelaExtrato = false;
		$scope.exibirTelaCheckInMesa = true;
	}

	$scope.abrirTelaExtrato = function (){
		$scope.totalExtrato = 0;

		if(!checkIn.status){
			rachaContaService.displayMensagem("ATENÇÃO!","Não há uma comanda aberta.");
			return;
		}

		$scope.exibirTelaComanda = false;
		$scope.exibirTelaCadastroMembro = false;
		$scope.exibirTelaExtrato = true;
		$scope.exibirTelaCheckInMesa = false;
		$scope.exibirSubtelaLsComanda = true;
		
		//Filtra a lista de produtos da comanda
		comanda = rachaContaService.recuperaObjetoLocalStorage("comandaSTR");
		$scope.lsMembros = rachaContaService.recuperaObjetoLocalStorage("membrosSTR")
		$scope.lsComanda = [];
		var lsComandaTotal = [];

		for (idx in comanda){ 
			if (idx == 0){
				var objetoItem = {
					idItem : comanda[idx].idItem,
					idProduto : comanda[idx].idProduto,
					nomeProduto : comanda[idx].nomeProduto,
					valor : comanda[idx].valorProduto,
					quantidade : comanda[idx].quantidadeProduto,
					total : comanda[idx].totalProduto
				}
				lsComandaTotal.push(objetoItem);
			} else{

				if (!produtoExiste(lsComandaTotal,comanda[idx].idItem)){
					var objetoItem = {
						idItem : comanda[idx].idItem,
						idProduto : comanda[idx].idProduto,
						nomeProduto : comanda[idx].nomeProduto,
						valor : comanda[idx].valorProduto,
						quantidade : comanda[idx].quantidadeProduto,
						total : comanda[idx].totalProduto
					}
					lsComandaTotal.push(objetoItem);
				}
				
			}
		}
		$scope.lsComanda = lsComandaTotal

		
		for (idx in  membros){
			$scope.totalExtrato += membros[idx].valorTotal;
		}
	}
	
//---------------------------FIM-----------------------------------------




// >>>>>>>>>>>>>  FUNÇÕES DE INTERAÇÃO DE EVENTOS GN-CLICK  <<<<<<<<<<<<

	$scope.adicionarMembros = function(){ //Adiciona membros para participar da partilha
		switch ($scope.botao){
			case "Adicionar" : {
				if ($scope.nomeMembro == undefined){
					rachaContaService.displayMensagem("ERRO: ","Preencha o nome do membro");
				}else{
					var objetoItem = {
						idMembro : rachaContaService.novoId("idMembro"),
						nomeMembro : $scope.nomeMembro,
						consumo : 0,
						taxaServico : 0,
						valorTotal : 0
					}
					membros.push(objetoItem);
					//$scope.lsMembros.push(objetoItem);
					$scope.nomeMembro = undefined;
					controleId.idMembro = controleId.idMembro + 1;
					rachaContaService.gravaObjetoLocalStorage(controleId,"controleIdSTR");
					rachaContaService.gravaObjetoLocalStorage(membros, "membrosSTR");
					$scope.lsMembros = membros;
				}
				break;
			}
			case "Editar" : {
				for (idx in membros){
					if (membros[idx].nomeMembro == editarItemMembro.nomeMembro){
						membros[idx].nomeMembro = $scope.nomeMembro;
					}
				}
				$scope.botao = "Adicionar";
				$scope.lsMembros = membros;
				break;
			}
		}
	}
	
	$scope.voltar = function(){
		$scope.exibirTelaComanda = true;
		$scope.exibirTelaCadastroMembro = false;
		$scope.exibirTelaCheckInMesa = false;
		$scope.exibirTelaExtrato = false;
		$scope.exibirTelaComandaFinilizada = false;
		$scope.telaPagamentoInformado = false;
		$scope.idMesaCheck = 0;
	}
	
	$scope.editarMembro = function(item){
		//console.log("R: " + item.idMembro);
		if (item.idMembro == 1){
			rachaContaService.displayMensagem("ERRO: ","Não é possível editar o Administrador da conta.");
			return;
		}else{
			//editaDados = true;
			editarItemMembro = item;
			$scope.nomeMembro = editarItemMembro.nomeMembro;
			$scope.botao = "Editar";
		}
	}

	$scope.definirMesa = function (id_mesa){
		$scope.idMesaCheck = id_mesa;
		console.log("Mesa: " + $scope.idMesaCheck);
	}

	$scope.abrirComanda = function (id_Mesa){
		if ($scope.idMesaCheck == 0){
			rachaContaService.displayMensagem("ATENÇÃO: ","Não há mesa selecionada.")
			return;
		} else if (checkIn.status){
			rachaContaService.displayMensagem("ATENÇÃO: ","Você já possui uma comanda em aberto.")
			return;
		}

		checkIn.idMesa = $scope.idMesaCheck
		checkIn.idComanda = rachaContaService.novoId("idComanda");
		checkIn.status = true;
		controleId.idComanda = checkIn.idComanda;
		for (idx in mesas){
			if (mesas[idx].statusMesa == id_Mesa){
				mesas[idx].statusMesa = true
				break;
			}
		}
		rachaContaService.gravaObjetoLocalStorage(controleId,"controleIdSTR");
		rachaContaService.gravaObjetoLocalStorage(checkIn,"checkInSTR");
		rachaContaService.gravaObjetoLocalStorage(mesas,"mesasSTR");
		$scope.voltar();
		rachaContaService.displayMensagem("PARABÉNS!: ","Sua comanda foi aberta com o número: " + controleId.idComanda + " e a mesa foi escolhida foi: " + checkIn.idMesa)
	}

	$scope.finalizarComanda = function(){

		controleId.idMembro = 1;
		controleId.idMesa = 0;
		controleId.idComanda = 0;
		controleId.idCardapio = 0;
		controleId.idItem = 0;
		rachaContaService.gravaObjetoLocalStorage(comanda,"comandaSTR");

		checkIn.idMesa = 0;
		checkIn.status = false;
		
		rachaContaService.gravaObjetoLocalStorage(checkIn,"checkInSTR");
		
		localStorage.removeItem("comandaSTR");
		
		$scope.exibirTelaExtrato = false;
		$scope.exibirTelaComandaFinilizada = true;
		$scope.exibirSubtelaLsComandav=false;
		$scope.lsMembros = rachaContaService.recuperaObjetoLocalStorage("membrosSTR");
	}

	$scope.sairSistema = function(){
		localStorage.removeItem("checkInSTR");
		localStorage.removeItem("mesasSTR");
		localStorage.removeItem("membrosSTR");

		rachaContaService.irPara("index.html");

	}
	
	 $scope.abrirCardapio = function(){
		rachaContaService.irPara("cardapio.html");
	 }

	 $scope.informarPagamento = function (){
		 $scope.exibirSubtelaLsComanda = false;
		 $scope.telaPagamentoInformado = true;

	 }

	 $scope.excluirMembro = function(id_membro){
		 for (idx in membros){
			if(membros[idx].idMembro == id_membro){
				if(membros[idx].consumo == 0){
					console.log(id_membro);
					membros.splice(idx,1);
					break;
				}else{
					rachaContaService.displayMensagem("ERRO:","Não é possivel excluir membro com consumo.");
					break;
				}
				
			}
		 } 
		 
		$scope.lsMembros = membros;
		rachaContaService.gravaObjetoLocalStorage(membros,"membrosSTR")
	 }
	
//---------------------------FIM-----------------------------------------


// >>>>>>>>>>>>>  FUNÇÕES DE VERIFICAÇÃO DE DADOS E ARQUIVOS <<<<<<<<<<<<

	$scope.carregarDados = function(){
		checkIn = rachaContaService.recuperaObjetoLocalStorage("checkInSTR");
		membros = rachaContaService.recuperaObjetoLocalStorage("membrosSTR");
		for (idx in membros){
			membros[idx].taxaServico = membros[idx].consumo * 0.1;
			membros[idx].valorTotal = membros[idx].taxaServico + membros[idx].consumo;
		}
		rachaContaService.gravaObjetoLocalStorage(membros,"membrosSTR");
		//membros = rachaContaService.recuperaObjetoLocalStorage("membrosSTR");
		controleId = rachaContaService.recuperaObjetoLocalStorage("controleIdSTR");
		mesas = rachaContaService.recuperaObjetoLocalStorage("mesasSTR");
		$scope.logo = checkIn.logoEstabelecimento;
	}

	produtoExiste = function(objeto_array,id_Item){
		var r = false;
		for(idxx in objeto_array){
			if (objeto_array[idxx].idItem == id_Item){
				r = true;
				break;
			}
		}
		return r;
	}

//---------------------------FIM-----------------------------------------
});