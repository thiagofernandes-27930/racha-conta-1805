

// >>>>>>>>>>>>>  ESTRUTURA DE PERSISTENCIA PRE DEFINIDAS  <<<<<<<<<<<<

	var membros = [];
	var comanda = [];

	var checkIn = { //Controla o dados de Check-in atual do app
		idUsuario : 0,
		nomeUsuario : "",
		idEstabelecimento : 0,
		logoEstabelecimento : "",
		nomeEstabelecimento : "",
		idMesa : 0,
		idComanda : 0,
		status : false
	}
	
	var controleId = { //Objeto que controla os ID de registros chaves do App
		idUsuario : 0,
		idMembro : 1,
		idEstabelecimento : 0,
		idMesa : 0,
		idComanda : 0,
		idCardapio : 0,
		idItem : 0
	}

	var estabelecimento = [
	{
		idEstabelecimento : 1,
		nomeEstabelecimento : "LANCHONETE BROCA GORDA",
		logoEstabelecimento : "img/lg-01.png"
	},
	{
		idEstabelecimento : 2,
		nomeEstabelecimento : "ESPETOS BAR ",
		logoEstabelecimento : "img/lg-02.png"
	}
	];
	
	var mesas = [
	{
		idEstabelecimento : 1,
		idMesa : 1,
		numeroPesoas : 2,
		statusMesa : true
	},
	{
		idEstabelecimento : 1,
		idMesa : 2,
		numeroPesoas : 2,
		statusMesa : false
	},
	{
		idEstabelecimento : 1,
		idMesa : 3,
		numeroPesoas : 4,
		statusMesa : true
	},
	{
		idEstabelecimento : 1,
		idMesa : 4,
		numeroPesoas : 4,
		statusMesa : true
	},
	{
		idEstabelecimento : 1,
		idMesa : 5,
		numeroPesoas : 6,
		statusMesa : false
	},
	{
		idEstabelecimento : 2,
		idMesa : 6,
		numeroPesoas : 2,
		statusMesa : false
	},
	{
		idEstabelecimento : 2,
		idMesa : 7,
		numeroPesoas : 2,
		statusMesa : true
	},
	{
		idEstabelecimento : 2,
		idMesa : 8,
		numeroPesoas : 2,
		statusMesa : true
	},
	{
		idEstabelecimento : 2,
		idMesa : 9,
		numeroPesoas : 4,
		statusMesa : false
	},
	{
		idEstabelecimento : 2,
		idMesa : 10,
		numeroPesoas : 4,
		statusMesa : true
	},
	{
		idEstabelecimento : 2,
		idMesa : 11,
		numeroPesoas : 4,
		statusMesa : false
	},
	{
		idEstabelecimento : 2,
		idMesa : 12,
		numeroPesoas : 4,
		statusMesa : true
	},
	{
		idEstabelecimento : 2,
		idMesa : 13,
		numeroPesoas : 8,
		statusMesa : true
	},
	{
		idEstabelecimento : 2,
		idMesa : 14,
		numeroPesoas : 8,
		statusMesa : true
	},
	{
		idEstabelecimento : 2,
		idMesa : 15,
		numeroPesoas : 8,
		statusMesa : false
	},
	{
		idEstabelecimento : 2,
		idMesa : 16,
		numeroPesoas : 10,
		statusMesa : false
	},
	{
		idEstabelecimento : 2,
		idMesa : 17,
		numeroPesoas : 10,
		statusMesa : true
	},
	{
		idEstabelecimento : 2,
		idMesa : 18,
		numeroPesoas : 20,
		statusMesa : true
	}
	]
	
	var produtos = [
	{	
		idEstabelecimento : 1,
		idCategoria: 1,
		nomeCategoria: "Bebidas",
		idProduto: 1,
		nomeProduto: "Coca-Cola",
		descricaoProduto : "Refrigerante de cola-cola de 600ml",
		valorProduto: 7.50,
		endImg: "img/bd-01.png"
	},
	{	
			idEstabelecimento : 1,
			idCategoria: 1,
			nomeCategoria: "Bebidas", 
			idProduto: 2,
			nomeProduto: "Guaraná",
			descricaoProduto : "Refrigerante de guaraná em lata de 310ml",
			valorProduto: 6.50,
			endImg : "img/bd-05.jpg"
	},
	{	
			idEstabelecimento : 1,
			idCategoria: 1,
			nomeCategoria: "Bebidas",
			idProduto: 3,
			nomeProduto: "Suco",
			descricaoProduto : "Suco de Laranja natural adoçado de 500ml",
			valorProduto : 4.50,
			endImg : "img/bd-03.jpg"
	},
	{
			
			idEstabelecimento : 1,
			idCategoria: 2,
			nomeCategoria: "Lanches",
			idProduto: 4,
			nomeProduto: "Cheese Burguer",
			descricaoProduto: "Burguer de 180g com queijo prato, mix de alface, tomate e cebola roxa.",
			valorProduto: 19.00,
			endImg: "img/lc-01.jpg"

		
	},
	{	
			idEstabelecimento : 1,
			idCategoria: 2,
			nomeCategoria: "Lanches",
			idProduto: 5,
			nomeProduto: "Double Trouble",
			descricaoProduto: "Burguer de 120g, um com queijo cheddar, alface, tomate e cebola roxas e molho barbecue.",
			valorProduto: 26.00,
			endImg: "img/lc-02.jpg"
		
		
	},
	{	
			idEstabelecimento : 1,
			idCategoria: 2,
			nomeCategoria: "Lanches",
			idProduto: 6,
			nomeProduto: "Hot Dog",
			descricaoProduto: "Hot Dog com Bacon e cheddar.",
			valorProduto: 19.90,
			endImg: "img/lc-04.png"		
	},
	{	
			idEstabelecimento : 1,
			idCategoria: 2,
			nomeCategoria: "Lanches",
			idProduto: 7,
			nomeProduto: "Pizza",
			descricaoProduto: "Calabresa com borda recheada.",
			valorProduto: 20.00,
			endImg: "img/lc-05.png"
		
	},
	{	
			idEstabelecimento : 1,
			idCategoria: 2,
			nomeCategoria: "Lanches",
			idProduto: 8,
			nomeProduto: "Dog Chilli",
			descricaoProduto: "Hot Dog com carne moída com cheddar.",
			valorProduto: 19.90,
			endImg: "img/lc-06.jpg"
		
	},
	{	
			idEstabelecimento : 1,
			idCategoria: 3,
			nomeCategoria: "Refeições",
			idProduto: 9,
			nomeProduto: "Frango Empanado",
			descricaoProduto: "Arroz, feijão e salada.",
			valorProduto: 14.00,
			endImg: "img/rf-02.jpg" 
		
	},
	{	
			idEstabelecimento : 1,
			idCategoria: 3,
			nomeCategoria: "Refeições",
			idProduto: 10,
			nomeProduto: "Bife Acebolado",
			descricaoProduto: "Arroz, feijão, salada e batata frita.",
			valorProduto: 14.00,
			endImg: "img/rf-03.jpg"
		
	},
	{	
			idEstabelecimento : 1,
			idCategoria: 3,
			nomeCategoria: "Refeições",
			idProduto: 11,
			nomeProduto: "Peixe Frito",
			descricaoProduto: "Arroz, feijão, salada, vinagrete e batata frita.",
			valorProduto: 19.90,
			endImg: "img/rf-04.jpg" 
		
	},
	{	
			idEstabelecimento : 1,
			idCategoria: 4,
			nomeCategoria: "Sobremesas",
			idProduto: 12,
			nomeProduto: "Pudim de Leite Condensado",
			descricaoProduto: "Deliciosamente aerado, feito com leite condensado de qualidade e um toque final de chantilly.",
			valorProduto: 7.50,
			endImg: "img/sb-01.jpg"
		
	},
	{	
			idEstabelecimento : 1,
			idCategoria: 4,
			nomeCategoria: "Sobremesas",
			idProduto: 13,
			nomeProduto: "Mousse de Chocolate",
			descricaoProduto: "Chocolate meio amargo com um leve toque de conhaque e chantilly.",
			valorProduto: 8.50,
			endImg: "img/sb-02.jpg" 
		
	},
	{	
			idEstabelecimento : 1,
			idCategoria: 4,
			nomeCategoria: "Sobremesas",
			idProduto: 14,
			nomeProduto: "Sorvete",
			descricaoProduto: "O verdadeiro e delicioso Napolitano.",
			valorProduto: 6.50,
			endImg: "img/sb-03.jpg"
		
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 1,
			nomeCategoria: "Bebidas",
			idProduto: 15,
			nomeProduto : "Coca-Cola",
			descricaoProduto : "Refrigerante de cola-cola de 600ml",
			valorProduto : 7.50,
			endImg : "img/bd-01.png"
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 1,
			nomeCategoria: "Bebidas",
			idProduto: 16,
			nomeProduto: "Fanta Laranja",
			descricaoProduto: "Refrigerante de laranja em lata de 310ml",
			valorProduto: 6.50,
			endImg: "img/bd-04.jpg"
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 1,
			nomeCategoria: "Bebidas",
			idProduto: 17,
			nomeProduto: "Suco",
			descricaoProduto: "Suco de morango natural adoçado de 500ml",
			valorProduto: 4.50,
			endImg: "img/bd-09.jpg"
	},
	
	{	
			idEstabelecimento : 2,
			idCategoria: 1,
			nomeCategoria: "Bebidas",
			idProduto: 18,
			nomeProduto: "Cerveja",
			descricaoProduto: "Cerveja gelada de 600ml. Bebida alcóolica com venda exclusiva para pessoas acima de 18 anos.",
			valorProduto: 7.50,
			endImg: "img/bd-06.jpg"
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 1,
			nomeCategoria: "Bebidas",
			idProduto: 19,
			nomeProduto: "Whisky",
			descricaoProduto: "Doses.Bebida alcóolica com venda exclusiva para pessoas acima de 18 anos.",
			valorProduto: 6.00,
			endImg: "img/bd-07.jpg"
	},
	

	{	
			idEstabelecimento : 2,
			idCategoria: 5,
			nomeCategoria: "Petiscos",
			idProduto: 20,
			nomeProduto: "Fritas com Bacon",
			descricaoProduto: "Batata frita com tiras de bacon, gratinadas ao forno,com queijo cheddar e queijo parmessão ralado..",
			valorProduto: 17.90,
			endImg: "img/pt-001.jpg"
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 5,
			nomeCategoria: "Petiscos",
			idProduto: 21,
			nomeProduto: "Batata Frita",
			descricaoProduto: "Acompanhada com molho rosé.",
			valorProduto: 10.00,
			endImg: "img/pt-002.jpg"
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 5,
			nomeCategoria: "Petiscos",
			idProduto: 22,
			nomeProduto: "Macaxeira Frita",
			descricaoProduto: "Tradicional macaxeira frita com manteiga.",
			valorProduto: 11.00,
			endImg: "img/pt-003.jpg"
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 5,
			nomeCategoria: "Petiscos",
			idProduto: 23,
			nomeProduto: "Camarão Empanado",
			descricaoProduto: "Camarão empanado com molho tártaro.",
			valorProduto: 34.90,
			endImg: "img/pt-004.jpg"
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 5,
			nomeCategoria: "Petiscos",
			idProduto: 24,
			nomeProduto: "Tirinhas de Peixe",
			descricaoProduto: "Tiras de peixe com molho Rosé.",
			valorProduto: 24.90,
			endImg: "img/pt-005.jpg"
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 6,
			nomeCategoria: "Espetos",
			idProduto: 25,
			nomeProduto: "Espetinho de Carne",
			descricaoProduto: "Acompanha arroz, feijão tropero, vinagrete e farofa.",
			valorProduto: 24.90,
			endImg: "img/sp-01.jpg"
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 6,
			nomeCategoria: "Espetos",
			idProduto: 26,
			nomeProduto: "Espetinho de Frango",
			descricaoProduto: "Acompanha arroz, feijão tropero, vinagrete e farofa.",
			valorProduto: 24.90,
			endImg: "img/sp-02.png"
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 6,
			nomeCategoria: "Espetos",
			idProduto: 27,
			nomeProduto: "Espetinho de Calabresa",
			descricaoProduto: "Acompanha arroz, feijão tropero, vinagrete e farofa.",
			valorProduto: 24.90,
			endImg: "img/sp-03.jpg"
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 6,
			nomeCategoria: "Espetos",
			idProduto: 28,
			nomeProduto: "Espetinho de Misto",
			descricaoProduto: "Acompanha arroz, feijão tropero, vinagrete e farofa.",
			valorProduto: 24.90,
			endImg: "img/sp-04.jpg"
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 6,
			nomeCategoria: "Espetos",
			idProduto: 29,
			nomeProduto: "Espetinho de Picanha",
			descricaoProduto: "Acompanha arroz, feijão tropero, vinagrete e farofa.",
			valorProduto: 24.90,
			endImg: "img/sp-05.jpg"
	},
	{	
			idEstabelecimento : 2,
			idCategoria: 6,
			nomeCategoria: "Espetos",
			idProduto: 30,
			nomeProduto: "Espetinho de Filé Mignon",
			descricaoProduto: "Acompanha arroz, feijão tropero, vinagrete e farofa.",
			valorProduto: 24.90,
			endImg: "img/sp-06.jpg"
	} 
	];

