/*
	PROJETO RACHA Contas
	TURMA: Analise e Desenvolvimento de Sistema - Noite 2018.1
	PROFESSOR: Adalberto

	Versão do Arquivo: 1.0
	Data Atualização: 27/03/2048

*/

appARachaConta.controller('ctrlAutenticar', function($scope,rachaContaService) {


// >>>>>>>>>>>>>  VARIAVEIS DE VALORES FUNÇOES DE CONTROLE  <<<<<<<<<<<<
	$scope.titulo="Bem Vindos";
	$scope.rLine1 = "UNANMA Turma de Análise e Desenvolvimento de Sistemas";
	$scope.rLine2 = "2018.1 - Noite (Joel, Marcela, Thiago e Márcio)";
	$scope.nome = "";
	$scope.email = "";
	$scope.senha = "";
	$scope.confirmaSenha = "";
	$scope.codigoEstabelecimento = "1";


	$scope.usuario = []; //Array dados de cadastro do usuário


	$scope.limpaCampo = function(){ //Limpa os dados dos formulários
		$scope.nome = undefined;
		$scope.email = undefined;
		$scope.senha = undefined;
		$scope.confirmaSenha = undefined;
		rachaContaService.displayMensagem("F.LimpaCampo: ","Campos resetados com sucesso");
	}

//---------------------------FIM-----------------------------------------

// >>>>>>>>>>>>>  VARIAVEIS e FUNÇÕES DE CONTROLE DE TELA E MENSAGEM  <<<<<<<<<<<<

	//Status inicial das telas
	$scope.exibirTelaMae = true;
	$scope.exibirCabecalho = true;
	$scope.exibirTelaInicial = true;
	$scope.exibirBotoesLogin = true;
	$scope.exibirRodape = true;
	$scope.exibirTelaCadastroConta = false;
	$scope.exibirTelaLogin = false;
	$scope.exibirTelacheckInEstabelecimento = false;
	$scope.exibirLeitorQrCode = false;
	$scope.exibirMsgRodape = true;

	rachaContaService.displayMensagem = function(titulo, mensagem){
		console.log(titulo + ": " + mensagem);
	}

	$scope.abrirTelaLoguin = function(){ //Abri a tela Autenticacao Email e Senha
		$scope.exibirTelaInicial = true
		$scope.exibirBotoesLogin = false;
		$scope.exibirTelaLoguin = true;
		$scope.exibirTelaCadastroConta = false
		$scope.titulo="Autenticação";
		$scope.email = "joel@dellmicro.com.br";
		$scope.senha = "123456";
	}

	$scope.abrirTelaAutencicarEstabelecimento = function(){ //Falta complementar
		$scope.exibirTelaInicial = true
		$scope.exibirBotoesLogin = false;
		$scope.exibirTelaLoguin = false;
		$scope. exibirTelacheckInEstabelecimento = true;
		$scope.exibirLeitorQrCode = false;
		$scope.titulo = "Estabelecimento";
		$scope.msgRodape = "Usuario: JOEL CARVALHO";


	}

	$scope.abriTelaCadstroConta = function(){ //Abre a tela para Cadastro de novos usuário ou contas
		$scope.titulo="Cadastro de Contas";
		$scope.exibirTelaInicial = false;
		$scope.nome = "JOEL CARVALHO";
		$scope.email = "joel@dellmicro.com.br";
		$scope.senha = "123456";
		$scope.confirmaSenha = "123456";
		$scope.exibirTelaCadastroConta = true;

	}

	$scope.cancelarTela = function(){ //Cancelas as telas abertas e retorna a tela inicial do aplicativo
		$scope.limpaCampo();
		$scope.exibirTelaInicial = true;
		$scope.exibirBotoesLogin = true;
		$scope.exibirTelaLoguin = false;
		$scope.exibirTelaCadastroConta = false;
		$scope.exibirTelacheckInEstabelecimento = false;
		$scope.exibirLeitorQrCode = false;
		$scope.exibirMsgRodape = true;
		$scope.titulo="Bem Vindos";
		$scope.msgRodape="UNANMA Turma de Análise e Desenvolvimento de Sistemas 2018.1 - Noite (Joel, Marcela, Thiago e Márcio)";
		rachaContaService.displayMensagem("F.CancelarTela: ","Tela cancelada, retorno a tela inicial");
	}


//---------------------------FIM-----------------------------------------

// >>>>>>>>>>>>>  FUNÇÕES DE INTERAÇÃO DE EVENTOS GN-CLICK  <<<<<<<<<<<<

	$scope.cadastrarContaUsuario = function(){ //Executa os processos de prévios e grava os dados na persistencia
		if(!checkCadastroUsuario()){ //Confere se o formuário foi preenchido
			rachaContaService.displayMensagem("ATENÇÃO: ","Preencha todos os campos");


		}else if(!rachaContaService.persistenciaExiste("usuarioSTR")){ //Confere a exixtencia da persistencia 'usuarioSTR'
			var objetoItem = { //Cria o objetoItem a ser adicionado como registro no arry
				IdUsuario : rachaContaService.novoId("idUsuario"),
				nome : $scope.nome,
				email : $scope.email,
				senha : $scope.senha
			}
			$scope.usuario.push(objetoItem); //Adicona um novo registro ao array
			rachaContaService.gravaObjetoLocalStorage($scope.usuario,"usuarioSTR"); //Grava a persistencia 'usuarioSTR'
			controleId.idUsuario++;
			rachaContaService.gravaObjetoLocalStorage(controleId,"controleIdSTR");
			rachaContaService.displayMensagem("PARABÉNS: ","O primeiro usuário gravado com sucesso");
			$scope.abrirTelaLoguin();

		}else if(!dadoExiste($scope.email,"usuarioSTR")){ //Confere se a conta de E-mail já está cadastrada na persistencia 'usuarioSTR'
			rachaContaService.displayMensagem("ERRO: ","O email digitado não está cadastrado");
			var objetoItem = { //Cria o objetoItem a ser adicionado como registro no arry
				IdUsuario : rachaContaService.novoId("idUsuario"),
				nome : $scope.nome,
				email : $scope.email,
				senha : $scope.senha
			}
			$scope.usuario.push(objetoItem); //Adicona um novo registro ao array
			rachaContaService.gravaObjetoLocalStorage($scope.usuario,"usuarioSTR"); //Grava a persistencia 'usuarioSTR'
			controleId.idUsuario++;
			rachaContaService.gravaObjetoLocalStorage(controleId,"controleIdSTR");
			rachaContaService.displayMensagem("PARABÉNS: ","O usuário foi adicionado com sucesso");
			$scope.abrirTelaLoguin();

		}else{
			rachaContaService.displayMensagem("ERRO2: ","O email digitado já está cadastrado");
		}
	}

	$scope.autenticarConta = function (e_mailUs, senhaUs){ //Executa processos previous para autenticar a conta do usuario

		if (!rachaContaService.persistenciaExiste("usuarioSTR")){ //Verifica se a persistencia existe
			rachaContaService.displayMensagem("ERRO: ","Persistencia não existe, crie uma conta de usuário.");
			return;
		}

		if (!checkFormularioLoguin()){ //Confere o preenchimento do formulario de loguin
			rachaContaService.displayMensagem("ERRO: ","Preencha todos os campos");
		}else if(!(contaUsuario = dadoExiste(e_mailUs,"usuarioSTR"))){ //Confere a existencia da conta do usuário e retorna FALSE caso não existe ou o objeto CONTA_USUARIO caso exista
			rachaContaService.displayMensagem("ERRO: ","Conta não existe");
		} else{
			if (senhaUs == contaUsuario.senha){ //Confere a senha digitada com a senha da conta do usuário
				msgRodape = contaUsuario.nome;
				checkIn.idUsuario = contaUsuario.IdUsuario;
				checkIn.nomeUsuario = contaUsuario.nome;
				$scope.abrirTelaAutencicarEstabelecimento(); //Abre a tela para cheguim do estabelecimento
			}else{
				rachaContaService.displayMensagem("ERRO: ","Senha invalida!!!");
			}
		}
	}

	$scope.autenticarEstabelecimento = function (id_Estabelecimento){ //Executa os procedimentos prévios para autenticar o estabelecimento
		if (!checkFormularioEstabelecimento(id_Estabelecimento)){ //Confere o preenchimento do formulário estabelecimento
			rachaContaService.displayMensagem("ERRO: ","Preencha o código do estabelecimento");
		}else{
			for (idx in estabelecimento){
				if (estabelecimento[idx].idEstabelecimento == id_Estabelecimento){
					checkIn.idEstabelecimento = estabelecimento[idx].idEstabelecimento;
					checkIn.nomeEstabelecimento = estabelecimento[idx].nomeEstabelecimento;
					checkIn.logoEstabelecimento =  estabelecimento[idx].logoEstabelecimento;
					var objetoItem = {
						idMembro : checkIn.idUsuario,
						nomeMembro : checkIn.nomeUsuario,
						consumo : 0,
						taxaServico : 0,
						valorTotal : 0
					}
					membros.push(objetoItem);
					rachaContaService.gravaObjetoLocalStorage(membros,"membrosSTR");
					//>>>>>>>> DEFINIR SE A COMANDA ABERTA <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
					rachaContaService.gravaObjetoLocalStorage(checkIn,"checkInSTR");
					rachaContaService.gravaObjetoLocalStorage(mesas,"mesasSTR");
					controleId.idMembro = 1;
					rachaContaService.gravaObjetoLocalStorage(controleId,"controleIdSTR");
					if (rachaContaService.persistenciaExiste("comandaSTR")){
						var arrayLimpo = [];
						rachaContaService.gravaObjetoLocalStorage(arrayLimpo,"comandaSTR")
					}
					rachaContaService.irPara("comanda.html");
					return;
				}
			}
			rachaContaService.displayMensagem("ERRO: ","Estabelecimento não cadastrado.");
		}
	}


//---------------------------FIM-----------------------------------------


// >>>>>>>>>>>>>  FUNÇÕES DE VERIFICAÇÃO DE DADOS E ARQUIVOS <<<<<<<<<<<<

	checkCadastroUsuario = function(){ //Confere os dados digitados do formulario e retorna true ou false
		if ($scope.nome == undefined){
			rachaContaService.displayMensagem("Campo Nome","Preenchimento Obrigatório");
			return false;
		} else if($scope.email == undefined){
			rachaContaService.displayMensagem("Campo E-Mail","Preenchimento Obrigatório");
			return false;
		}else if($scope.senha == undefined){
			rachaContaService.displayMensagem("Campo Senha","Preenchimento Obrigatório");
			return false;
		}else if($scope.confirmaSenha == undefined){
			rachaContaService.displayMensagem("Campo Confirma Senha","Preenchimento Obrigatório");
			return false;
		}else if($scope.senha != $scope.confirmaSenha){
			rachaContaService.displayMensagem("ERRO SENHAS","Senhas digitadas não conferem");
			return false;
		}else{
			return true
		}
	}



	dadoExiste = function(dado,nomeArquivoSTR){ //Confere se dado informado existe na persistencia
		$scope.usuario = rachaContaService.recuperaObjetoLocalStorage(nomeArquivoSTR);
		for (idx in $scope.usuario){
			if($scope.usuario[idx].email == dado){
				var contaUsuario ={
					IdUsuario : $scope.usuario[idx].IdUsuario,
					nome : $scope.usuario[idx].nome,
					email : $scope.usuario[idx].email,
					senha : $scope.usuario[idx].senha
				}
				return contaUsuario;
				//return true;
			}
		}
		return false;
	}

	checkFormularioLoguin = function (){
		if($scope.email == undefined){
			rachaContaService.displayMensagem("Campo E-Mail","Preenchimento Obrigatório");
			return false;
		}else if($scope.senha == undefined){
			rachaContaService.displayMensagem("Campo Senha","Preenchimento Obrigatório");
			return false;
		}else{
			return true;
		}
	}

	checkFormularioEstabelecimento = function(id_Estabelecimento){

		if (id_Estabelecimento == undefined){
			return false;
		} else{
			return true;
		}
	}
//---------------------------FIM-----------------------------------------

});

