appARachaConta.controller('ctrlCardapio', function($scope, rachaContaService) {
	
// >>>>>>>>>>>>>  VARIAVEIS DE VALORES FUNÇOES DE CONTROLE  <<<<<<<<<<<<
	$scope.titulo="Cardápio";
	$scope.tamanhoLogo = "60%";
	$scope.quantidade = 1;
	$scope.total = 0.0;
	$scope.tela = 1;
	var Partilha = 1;

	var partilhaConta = [];	
	var itemPartilha = {
		idMembro : 0,
		nomeMembro : "",
		valorIndividualPartilha : 0
	}

	$scope.detalheItem = {
		idProduto:0,
		nomeProduto: "",
		descricaoProduto :"",
		valorProduto: 0,
		endImg : ""
	}

	var itemComanda = {
		idComanda : 0,
		idMembro : 0,
		nomeMembro : "",
		idProduto : 0,
		nomeProduto : "",
		valorProduto : "",
		quantidadeProduto : 0,
		totalProduto : 0,
		valorIndividual : 0,
		tipoPartilha : 0,
		idItem : 0
	}

	$scope.membrosSelecionados = [];

	$scope.lsComanda = [];

	var categorias = [];
//	$scope.lsCategorias = [];
	
	
	//$scope.lsDetalheCategoria = [];
	
//---------------------------FIM-----------------------------------------





// >>>>>>>>>>>>>  VARIAVEIS e FUNÇÕES DE CONTROLE DE TELA E MENSAGEM  <<<<<<<<<<<<
	$scope.exibirCabecalho = true;
	$scope.exibirTelaCategoria = true;	
	$scope.exibirTelaProdutos = false;
	$scope.exibirTelaProduto = false;
	$scope.exibirListaPartilha = false;
	$scope.exibirExtrato = false,

//---------------------------FIM-----------------------------------------







// >>>>>>>>>>>>>  FUNÇÕES DE INTERAÇÃO DE EVENTOS GN-CLICK  <<<<<<<<<<<<
	
	$scope.voltar = function(){
		switch ($scope.tela){
			case 1:{
				rachaContaService.irPara("comanda.html");
				break;
			}
			case 2:{

				$scope.exibirCabecalho = true;
				$scope.exibirTelaCategoria = true;	
				$scope.exibirTelaProdutos = false;
				$scope.exibirTelaProduto = false;
				$scope.exibirListaPartilha = false;
				$scope.exibirExtrato = false,
				$scope.tela = 1;
				$scope.titulo="Cardápio";
				break;
			}
			case 3:{
				$scope.exibirCabecalho = true;
				$scope.exibirTelaCategoria = false;	
				$scope.exibirTelaProdutos = true;
				$scope.exibirTelaProduto = false;
				$scope.exibirListaPartilha = false;
				$scope.exibirExtrato = false,
				$scope.tela = 2;
				$scope.titulo="Cardápio";
				break;
			}
		}
	}
		
	$scope.adicionarComanda = function(){

		var idItem = rachaContaService.novoId("idItem");
		var r = 0;
				
		if (!checkIn.status){ //Checa se há comanda em aberto
			rachaContaService.displayMensagem("ERRO: ","Para fazer pedidos selecione uma mesa e abra sua comanda.")
			return;
		}
		
		switch (Partilha){ //preenche o array 'partilhaConta' conforme o tipo de partilha selecionada
			case 1 : { //Individual
				var objetoItem = {
					idMembro : membros[0].idMembro,
					nomeMembro : membros[0].nomeMembro,
					valorIndividual : $scope.total
				}
				r = $scope.total;
				console.log("r1: " + r);
				r += membros[0].consumo;
				console.log("r2: " + r);
				partilhaConta.push(objetoItem);
				console.log("m1: " + membros[0].consumo);
				membros[0].consumo = r;
				console.log("m2: " + membros[0].consumo);
				rachaContaService.gravaObjetoLocalStorage(membros,"membrosSTR");
				break;
			}
			case 2 : { //Coletivo
				for (idx in membros) {
					var objetoItem = {
						idMembro : membros[idx].idMembro,
						nomeMembro : membros[idx].nomeMembro,
						valorIndividual : parseFloat(($scope.total / membros.length).toFixed(2))
					}
					partilhaConta.push(objetoItem);
					membros[idx].consumo = membros[idx].consumo + objetoItem.valorIndividual;
					rachaContaService.gravaObjetoLocalStorage(membros,"membrosSTR");
				}
				break;
			}
			case 3 : { //Seletivo
				for (idx in partilhaConta){
					partilhaConta[idx].valorIndividual = parseFloat(($scope.total / partilhaConta.length).toFixed(2))
				}
				break;
			}
		}

		if(!rachaContaService.persistenciaExiste("comandaSTR")){
			for (idx in partilhaConta){
				var objetoItem = {
					idComanda : checkIn.idComanda,
					idMembro : partilhaConta[idx].idMembro,
					nomeMembro : partilhaConta[idx].nomeMembro,
					idProduto : $scope.detalheItem.idProduto,
					nomeProduto : $scope.detalheItem.nomeProduto,
					valorProduto : $scope.detalheItem.valorProduto,
					quantidadeProduto : $scope.quantidade,
					totalProduto : $scope.total,
					valorIndividual : partilhaConta[idx].valorIndividual,
					tipoPartilha : Partilha,
					idItem : idItem
				}
				comanda.push(objetoItem);
				for(idxx in membros){
					if(membros[idxx].idMembro == partilhaConta[idx].idMembro && Partilha == 3){
						membros[idxx].consumo = membros[idxx].consumo + objetoItem.valorIndividual;
						rachaContaService.gravaObjetoLocalStorage(membros,"membrosSTR");
						break;
					}
				}
			}
		}else{
			comanda = rachaContaService.recuperaObjetoLocalStorage("comandaSTR")
			for (idx in partilhaConta){
				var objetoItem = {
					idComanda : checkIn.idComanda,
					idMembro : partilhaConta[idx].idMembro,
					nomeMembro : partilhaConta[idx].nomeMembro,
					idProduto : $scope.detalheItem.idProduto,
					nomeProduto : $scope.detalheItem.nomeProduto,
					valorProduto : $scope.detalheItem.valorProduto,
					quantidadeProduto : $scope.quantidade,
					totalProduto : $scope.total,
					valorIndividual : partilhaConta[idx].valorIndividual,
					tipoPartilha : Partilha,
					idItem : idItem
				}
				comanda.push(objetoItem);
				for(idxx in membros){
					if(membros[idxx].idMembro == partilhaConta[idx].idMembro && Partilha == 3){
						membros[idxx].consumo += objetoItem.valorIndividual;
						rachaContaService.gravaObjetoLocalStorage(membros,"membrosSTR");
						break;
					}
				}
			}
		}
		controleId.idItem = idItem;
		rachaContaService.gravaObjetoLocalStorage(comanda,"comandaSTR");
		rachaContaService.gravaObjetoLocalStorage(controleId,"controleIdSTR");
		partilhaConta = [];	
		rachaContaService.displayMensagem("PARABÉNS!!!","Pedido realizado com sucesso.")
		$scope.exibirCabecalho = true;
		$scope.titulo="Extrato";
		$scope.exibirTelaProduto = false;
		$scope.exibirExtrato = true,
		comanda = rachaContaService.recuperaObjetoLocalStorage("comandaSTR");

		$scope.lsComanda = objetoItem;

	}

	
	$scope.abrirCateg = function (){
		rachaContaService.irPara("cardapio.html");
	}	
		

	$scope.abrirMenu = function (){
		rachaContaService.irPara("comanda.html");

	}	

	$scope.listarCategorias = function (){ //Carrega a lista de categorias do estabelecimento: TELA-01
		checkIn = rachaContaService.recuperaObjetoLocalStorage("checkInSTR");
		membros = rachaContaService.recuperaObjetoLocalStorage("membrosSTR");
		controleId = rachaContaService.recuperaObjetoLocalStorage("controleIdSTR");
		for (idx in produtos){
			if(produtos[idx].idEstabelecimento == checkIn.idEstabelecimento){
				if(categorias.length == 0){
					var objetoitem = {
						nomeCategoria: produtos[idx].nomeCategoria,
						idCategoria : produtos[idx].idCategoria,
						idProduto : produtos[idx].idProduto
					}
					categorias.push(objetoitem);
				}else if (!categoriaExiste(produtos[idx].nomeCategoria)) {
					var objetoitem = {
						nomeCategoria: produtos[idx].nomeCategoria,
						idCategoria : produtos[idx].idCategoria,
						idProduto : produtos[idx].idProduto
					}
					categorias.push(objetoitem);
				}
			}
			} 
		$scope.lsCategorias = categorias;
	}

	$scope.abrirListaProdutos = function(ls_item){
		var listarCategoria = [];
		$scope.lsListarProdutos = [];
		$scope.tela = 2;
		
		for (idx in produtos){
			if(produtos[idx].idEstabelecimento == checkIn.idEstabelecimento && produtos[idx].idCategoria == ls_item.idCategoria){
				var objetoItem = {
					idProduto: produtos[idx].idProduto,
					nomeProduto: produtos[idx].nomeProduto,
					descricaoProduto : produtos[idx].descricaoProduto,
					valorProduto: produtos[idx].valorProduto,
					endImg : produtos[idx].endImg,
					idEstabelecimento : produtos[idx].idEstabelecimento,
					idCategoria : produtos[idx].idCategoria
				}
				listarCategoria.push(objetoItem);
				//$scope.titulo= produtos[idx].nomeCategoria;
			}
		}
		$scope.lsListarProdutos = listarCategoria;
		$scope.exibirTelaProdutos = true;			
		$scope.exibirTelaCategoria = false;
	}

	$scope.abrirTelaProduto = function (ls_item){ //Abrir a tela 03
		$scope.tela = 3;
		for (idx in produtos){
			if(produtos[idx].idEstabelecimento == ls_item.idEstabelecimento && produtos[idx].idCategoria == ls_item.idCategoria && produtos[idx].idProduto == ls_item.idProduto){
				$scope.detalheItem.idProduto = produtos[idx].idProduto;
				$scope.detalheItem.nomeProduto = produtos[idx].nomeProduto;
				$scope.detalheItem.descricaoProduto = produtos[idx].descricaoProduto;
				$scope.detalheItem.valorProduto = produtos[idx].valorProduto;
				$scope.detalheItem.endImg = produtos[idx].endImg;
				$scope.total = produtos[idx].valorProduto;
				break;
			}
		}
		$scope.exibirTelaProduto = true;
		$scope.exibirTelaProdutos = false;
	} 
	
	$scope.tipoPartilha = function(id_partilha){
		Partilha = id_partilha;
		switch (Partilha){
			case 3 :{
				$scope.lsMembros = membros;
				$scope.exibirListaPartilha = true;
				break;
			} default :{
				$scope.exibirListaPartilha = false;
				break;
			}
		}
		
	}

	$scope.partilhaSeletiva = function(id_Membro){ 
		for(idxx in partilhaConta){ //conferir se o membro existe em partilhaConta
			if (partilhaConta[idxx].idMembro == id_Membro){
				partilhaConta.splice(idxx, 1);
				return;
			}
		}

		for (idx in membros){ //Localiza o membro referenciado em id_Membro
			if (membros[idx].idMembro == id_Membro){ 
				var objetoItem = {
					idMembro : membros[idx].idMembro,
					nomeMembro : membros[idx].nomeMembro,
					valorIndividual : 0
				}
				partilhaConta.push(objetoItem)
				return;
			}
			
		}
	}



//---------------------------FIM-----------------------------------------





// >>>>>>>>>>>>>  FUNÇÕES DE VERIFICAÇÃO DE DADOS E ARQUIVOS <<<<<<<<<<<<

categoriaExiste = function(nome_Categoria){ 
	for(idxx in categorias){
		if (categorias[idxx].nomeCategoria == nome_Categoria){
			return true;
		}
	} 
	return false;
}

	
//---------------------------FIM-----------------------------------------





// >>>>>>>>>>>>>  FUNÇÕES DE CÁLCULOS DE VALORES <<<<<<<<<<<<
	
$scope.calQtd = function(){ //Cálcula o valor do produto e a quantidade
	$scope.total = $scope.detalheItem.valorProduto * $scope.quantidade;
	console.log($scope.detalheItem.valorProduto * $scope.quantidade);
}

	
});
