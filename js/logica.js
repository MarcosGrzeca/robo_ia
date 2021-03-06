var vetor = [];
var nroLinhas = 7;
var nroColunas = 9;
var numeroRuas = 9;
var ruas = [];
var texto;
var ruas_sujas = [];
var robos = [];
var pessoas = [];
var solucaoProlog = new Array();
var cidadeAtual = "P";
var camihoRoboTeste;
var ultimoKey;
var pessoaRemover;

function iniciarPlanejamento() {
	cidadeAtual = $("#tamanhoCidade").val();
	
	inicializarVetor();
	popularRobosPessoas();
	montarTabuleiro();


	$("#telaInicial").hide();
	$("#jogo").show();

	montarProlog();
	comunicarComServidor();
}

function popularRobosPessoas() {
	var nroTotalRForca = $("#nroRobosForca").val();
	var nroTotalRResgate = $("#nroRobosResgate").val();
	var nroTotalPFeridas = $("#nroPessoasFeridas").val();
	var nroTotalPMortas = $("#nroPessoasMortas").val();
	var nroTotalPSaudaveis = $("#nroPessoasSaudaveis").val();
	var nroTotalAlagamentos = $("#nroAlagamentos").val();
	var nroTotalEscombros = $("#nroEscombros").val();

	var i = 1, linha, coluna;

	for (i = 1; i <= nroTotalAlagamentos; i++) {
		var achou = false;
		while (achou == false) {
			linha = Math.floor((Math.random() * nroLinhas) + 0);
			coluna = Math.floor((Math.random() * nroColunas) + 0);

			if (ruas[linha][coluna] > 0) {
				if (vetor[linha][coluna] != "AL") {
	 	 			vetor[linha][coluna] = "AL";
		 			achou = true;
		 		}
			}
		}
	}


	for (i = 1; i <= nroTotalEscombros; i++) {
		var achou = false;
		while (achou == false) {
			linha = Math.floor((Math.random() * nroLinhas) + 0);
			coluna = Math.floor((Math.random() * nroColunas) + 0);

			if (ruas[linha][coluna] >0) {
				if (vetor[linha][coluna] != "E") {
					vetor[linha][coluna] = "E";
		 			achou = true;
		 		}
			}
		}
	}

	for (i = 1; i <= nroTotalRResgate; i++) {
		var achou = false;
		while (achou == false) {
			linha = Math.floor((Math.random() * nroLinhas) + 0);
			coluna = Math.floor((Math.random() * nroColunas) + 0);

			if (ruas[linha][coluna] >0) {
				var jaExiste = false;
				$.each(robos, function(key, value) {
					if (key > 0) {
						if (linha == value.Y && coluna == value.X) {
							jaExiste = true;
						}
					}
				});
				if (!jaExiste) {
					adicionarRobo("R", linha, coluna);
	 				achou = true;
	 			}
			}
		}
	}

	for (i = 1; i <= nroTotalRForca; i++) {
		var achou = false;
		while (achou == false) {
			linha = Math.floor((Math.random() * nroLinhas) + 0);
			coluna = Math.floor((Math.random() * nroColunas) + 0);

			if (ruas[linha][coluna] >0) {
				var jaExiste = false;
				$.each(robos, function(key, value) {
					if (key > 0) {
						if (linha == value.Y && coluna == value.X) {
							jaExiste = true;
						}
					}
				});
				if (!jaExiste) {
					adicionarRobo("F", linha, coluna);
	 				achou = true;
	 			}
			}
		}
	}

//	adicionarRobo("F", 3, 6);
//	vetor[7][4] = "E";
	/*adicionarRobo("R", 2, 2);
	adicionarPessoa("F", 1, 7);
	nroTotalPFeridas = 0;
	*/
	for (i = 1; i <= nroTotalPFeridas; i++) {
		var achou = false;
		while (achou == false) {
			linha = Math.floor((Math.random() * nroLinhas) + 0);
			coluna = Math.floor((Math.random() * nroColunas) + 0);

			if (ruas[linha][coluna] >0) {
				var jaExiste = false;
				$.each(pessoas, function(key, value) {
					if (key > 0) {
						if (linha == value.Y && coluna == value.X) {
							jaExiste = true;
						}
					}
				});
				if (!jaExiste) {
					adicionarPessoa("F", linha, coluna);
	 				achou = true;
	 			}
			}
		}
	}

	for (i = 1; i <= nroTotalPSaudaveis; i++) {
		var achou = false;
		while (achou == false) {
			linha = Math.floor((Math.random() * nroLinhas) + 0);
			coluna = Math.floor((Math.random() * nroColunas) + 0);

			if (ruas[linha][coluna] >0) {
				var jaExiste = false;
				$.each(pessoas, function(key, value) {
					if (key > 0) {
						if (linha == value.Y && coluna == value.X) {
							jaExiste = true;
						}
					}
				});
				if (!jaExiste) {
					adicionarPessoa("S", linha, coluna);
	 				achou = true;
	 			}
			}
		}
	}

	for (i = 1; i <= nroTotalPMortas; i++) {
		var achou = false;
		while (achou == false) {
			linha = Math.floor((Math.random() * nroLinhas) + 0);
			coluna = Math.floor((Math.random() * nroColunas) + 0);

			if (ruas[linha][coluna] >0) {
				var jaExiste = false;
				$.each(pessoas, function(key, value) {
					if (key > 0) {
						if (linha == value.Y && coluna == value.X) {
							jaExiste = true;
						}
					}
				});
				if (!jaExiste) {
					adicionarPessoa("M", linha, coluna);
	 				achou = true;
	 			}
			}
		}
	}
}

function inicializarVetor() {
	var i, j;
	robos[0] = {};
	pessoas[0] = {};
	
	/*for (i = 0; i < nroLinhas; i++) {
		vetor[i] = [];
		for (j = 0; j < nroColunas; j++) {
			vetor[i][j] = "R";
		}	
	}*/

	
	//Declarção ruas

	//Cidade pequena


	$("#div_resultado").css("height", "453px");


	if (cidadeAtual == "P") {

		nroLinhas = 9;
		nroColunas = 8;
		numeroRuas = 6;
	

		for (i = 0; i < nroLinhas; i++) {
			vetor[i] = [];
			for (j = 0; j < nroColunas; j++) {
				vetor[i][j] = "R";
			}	
		}

		for (i = 0; i < 20; i++) {
			ruas[i] = [];
			for (j = 0; j < 20; j++) {
				ruas[i][j] = 0;
			}
		}

	

		ruas[1][2] = 1;
		ruas[1][3] = 1;
		ruas[1][4] = 1;
		ruas[1][5] = 1;
		ruas[1][6] = 1;
		ruas[1][7] = 1;
		
		ruas[2][2] = 2;
		ruas[3][2] = 2;
		ruas[4][2] = 2;
		ruas[5][2] = 2;
		ruas[6][2] = 2;
		ruas[7][2] = 2;
		ruas[8][2] = 2;

		ruas[4][0] = 3;	
		ruas[4][1] = 3;
		ruas[4][3] = 3;
		ruas[4][4] = 3;
		ruas[4][5] = 3;
		ruas[4][7] = 3;

		ruas[7][0] = 4;	
		ruas[7][1] = 4;
		ruas[7][2] = 4;
		ruas[7][3] = 4;
		ruas[7][4] = 4;
		ruas[7][5] = 4;
		ruas[7][6] = 4;
		ruas[7][7] = 4;

		ruas[2][6] = 5;	
		ruas[3][6] = 5;
		ruas[4][6] = 5;
		ruas[5][6] = 5;
		ruas[6][6] = 5;
		ruas[8][6] = 5;


		vetor[0][0] = "AB";
		vetor[0][1] = "G"; 
		vetor[0][2] = "C"; 
		vetor[0][3] = "C"; 
		vetor[0][4] = "C"; 
		vetor[0][5] = "C"; 
		vetor[0][6] = "C"; 
		vetor[0][7] = "C"; 

		vetor[1][0] = "G";
		vetor[1][1] = "G";
		
		vetor[2][0] = "C";
		vetor[2][1] = "C";
		vetor[2][3] = "C";
		vetor[2][4] = "C";
		vetor[2][5] = "C";
		vetor[2][7] = "C";
			

		vetor[3][0] = "C";
		vetor[3][1] = "C";
		vetor[3][3] = "C";
		vetor[3][4] = "C";
		vetor[3][5] = "C";
		vetor[3][7] = "C";

		vetor[5][0] = "C";
		vetor[5][1] = "C";
		vetor[5][3] = "H";	
		vetor[5][4] = "G";
		vetor[5][5] = "G";
		vetor[5][7] = "C";

		vetor[6][0] = "C";
		vetor[6][1] = "C";
		vetor[6][3] = "G";
		vetor[6][4] = "G";
		vetor[6][5] = "G";
		vetor[6][7] = "C";

		vetor[8][0] = "I1";
		vetor[8][1] = "I2";
		vetor[8][3] = "C";
		vetor[8][4] = "C";
		vetor[8][5] = "C";
		vetor[8][7] = "C";

	} else if (cidadeAtual == "M") {

		nroLinhas = 9;
		nroColunas = 13;
		numeroRuas = 10;
	

		for (i = 0; i < nroLinhas; i++) {
			vetor[i] = [];
			for (j = 0; j < nroColunas; j++) {
				vetor[i][j] = "R";
			}	
		}

		for (i = 0; i < 20; i++) {
			ruas[i] = [];
			for (j = 0; j < 20; j++) {
				ruas[i][j] = 0;
			}
		}


		ruas[3][0] = 1;
		ruas[3][1] = 1;
		ruas[3][2] = 1;
		ruas[3][3] = 1;
		ruas[3][4] = 1;
		ruas[3][5] = 1;
		ruas[3][6] = 1;
		ruas[3][7] = 1;
		ruas[3][8] = 1;
		ruas[3][9] = 1;
		ruas[3][10] = 1;
		ruas[3][11] = 1;
		ruas[4][0] = 1;
		ruas[5][0] = 1;
		ruas[6][0] = 1;

		ruas[7][0] = 2;
		ruas[7][1] = 2;
		ruas[7][2] = 2;
		ruas[7][3] = 2;
		ruas[7][4] = 2;
		ruas[7][5] = 2;
		ruas[7][6] = 2;
		ruas[7][7] = 2;
		ruas[7][8] = 2;
		ruas[7][9] = 2;
		ruas[7][10] = 2;
		ruas[7][11] = 2;
		ruas[7][12] = 2;
		
		ruas[0][0] = 3;
		ruas[0][1] = 3;
		ruas[0][2] = 3;
		ruas[1][2] = 3;
		ruas[2][2] = 3;
		
		ruas[4][2] = 4;
		ruas[5][2] = 4;
		ruas[6][2] = 4;
		ruas[8][2] = 4;

		ruas[0][5] = 5;
		ruas[1][5] = 5;
		ruas[2][5] = 5;
		ruas[4][5] = 5;
		ruas[5][5] = 5;
		ruas[6][5] = 5;
		ruas[8][5] = 5;

		ruas[4][9] = 6;
		ruas[5][9] = 6;
		ruas[6][9] = 6;
		ruas[4][10] = 6;
		ruas[5][10] = 6;
		ruas[6][10] = 6;

		ruas[8][9] = 7;
		ruas[8][10] = 7;
		
		ruas[0][6] = 8;
		ruas[0][7] = 8;
		ruas[0][8] = 8;
		ruas[0][9] = 8;
		ruas[0][10] = 8;
		ruas[0][11] = 8;
		ruas[0][12] = 8;

		ruas[1][8] = 9;
		ruas[2][8] = 9;

		ruas[1][11] = 10;
		ruas[2][11] = 10;


		vetor[0][3] = "C";
		vetor[0][4] = "C"; 
		vetor[1][0] = "C"; 
		vetor[1][1] = "C"; 
		vetor[1][3] = "C";
		vetor[1][4] = "C";
		vetor[1][6] = "C";
		vetor[1][7] = "C";
		vetor[1][9] = "C";
		vetor[1][10] = "C";
		vetor[1][12] = "C";
	
		vetor[2][0] = "C";
		vetor[2][1] = "C";
		vetor[2][3] = "C";
		vetor[2][4] = "C";
		vetor[2][6] = "C";
		vetor[2][7] = "C";
		vetor[2][9] = "C";
		vetor[2][10] = "C";
		vetor[2][12] = "C";

		vetor[3][12] = "C";


		vetor[4][1] = "C";
		vetor[4][3] = "C";
		vetor[4][4] = "C";
		vetor[4][6] = "H";
		vetor[4][7] = "G";
		vetor[4][8] = "G";
		vetor[4][11] = "AB";
		vetor[4][12] = "G";


		vetor[5][1] = "C";
		vetor[5][3] = "C";
		vetor[5][4] = "C";
		vetor[5][6] = "G";
		vetor[5][7] = "G";
		vetor[5][8] = "G";
		vetor[5][11] = "G";
		vetor[5][12] = "G";


		vetor[6][1] = "C";
		vetor[6][3] = "I1";
		vetor[6][4] = "I2";
		vetor[6][6] = "C";
		vetor[6][7] = "C";
		vetor[6][8] = "C";
		vetor[6][11] = "C";
		vetor[6][12] = "C";


		vetor[8][0] = "C";
		vetor[8][1] = "C";
		vetor[8][3] = "C";
		vetor[8][4] = "C";
		vetor[8][6] = "C";
		vetor[8][7] = "C";
		vetor[8][8] = "C";
		vetor[8][11] = "C";
		vetor[8][12] = "C";
	} else if (cidadeAtual == "G") {

		$("#div_resultado").css("height", "515px");



		nroLinhas = 10;
		nroColunas = 14;
		numeroRuas = 11
	

		for (i = 0; i < nroLinhas; i++) {
			vetor[i] = [];
			for (j = 0; j < nroColunas; j++) {
				vetor[i][j] = "R";
			}	
		}

		for (i = 0; i < 20; i++) {
			ruas[i] = [];
			for (j = 0; j < 20; j++) {
				ruas[i][j] = 0;
			}
		}


		ruas[2][0] = 1;
		ruas[2][1] = 1;
		ruas[2][2] = 1;
		ruas[2][3] = 1;
		ruas[2][4] = 1;
		ruas[2][5] = 1;
		ruas[2][6] = 1;
		ruas[2][7] = 1;
		ruas[2][8] = 1;
		ruas[2][9] = 1;
		ruas[2][10] = 1;
		ruas[2][11] = 1;
		ruas[2][12] = 1;
		ruas[2][13] = 1;

		
		ruas[5][0] = 2;
		ruas[5][1] = 2;
		ruas[5][2] = 2;
		ruas[5][3] = 2;
		ruas[5][4] = 2;
		ruas[5][5] = 2;
		ruas[5][6] = 2;
		ruas[5][7] = 2;
		ruas[5][8] = 2;
		ruas[5][9] = 2;
		ruas[5][10] = 2;
		ruas[5][11] = 2;
		ruas[5][12] = 2;
		ruas[5][13] = 2;


		ruas[9][0] = 3;
		ruas[9][1] = 3;
		ruas[9][2] = 3;
		ruas[9][3] = 3;
		ruas[9][4] = 3;
		ruas[9][5] = 3;
		ruas[9][6] = 3;
		ruas[9][7] = 3;


		ruas[6][7] = 4;
		ruas[7][7] = 4;
		ruas[8][7] = 4;

		ruas[7][8] = 5;
		ruas[7][9] = 5;
		ruas[7][10] = 5;
		ruas[7][11] = 5;
		ruas[7][12] = 5;
		ruas[7][13] = 5;

		ruas[0][3] = 6;
		ruas[1][3] = 6;
		ruas[3][3] = 6;
		ruas[4][3] = 6;
		ruas[6][3] = 6;
		ruas[7][3] = 6;
		ruas[8][3] = 6;

		ruas[6][1] = 7;
		ruas[7][1] = 7;
		ruas[8][1] = 7;


		ruas[0][6] = 8;
		ruas[1][6] = 8;
		ruas[3][6] = 8;
		ruas[4][6] = 8;


		ruas[3][9] = 9;
		ruas[4][9] = 9;

		ruas[6][12] = 10;
		ruas[8][12] = 10;
		ruas[9][12] = 10;
		ruas[9][13] = 10;

		ruas[0][9] = 11;
		ruas[0][10] = 11;
		ruas[0][11] = 11;
		ruas[0][12] = 11;
		ruas[1][12] = 11;
		ruas[3][12] = 11;
		ruas[4][12] = 11;

		vetor[0][0] = "H";
		vetor[0][1] = "G";
		vetor[0][2] = "G";
		vetor[0][4] = "C";
		vetor[0][5] = "C";
		vetor[0][7] = "C";
		vetor[0][8] = "C";
		vetor[0][13] = "C";

		vetor[1][0] = "G";
		vetor[1][1] = "G";
		vetor[1][2] = "G";
		vetor[1][4] = "C";
		vetor[1][5] = "C";
		vetor[1][7] = "C";
		vetor[1][8] = "C";
		vetor[1][9] = "C";
		vetor[1][10] = "C";
		vetor[1][11] = "C";
		vetor[1][13] = "C";


		vetor[3][0] = "AB";
		vetor[3][1] = "G";
		vetor[3][2] = "C";
		vetor[3][4] = "C";
		vetor[3][5] = "C";
		vetor[3][7] = "C";
		vetor[3][8] = "C";
		vetor[3][10] = "C";
		vetor[3][11] = "C";
		vetor[3][13] = "C";


		vetor[4][0] = "G";
		vetor[4][1] = "G";
		vetor[4][2] = "C";
		vetor[4][4] = "C";
		vetor[4][5] = "C";
		vetor[4][7] = "C";
		vetor[4][8] = "C";
		vetor[4][10] = "C";
		vetor[4][11] = "C";
		vetor[4][13] = "C";
		
		//vetor[5][14] = "C";


		vetor[6][0] = "C";
		vetor[6][2] = "C";
		vetor[6][4] = "C";
		vetor[6][5] = "C";
		vetor[6][6] = "C";
		vetor[6][8] = "I1";
		vetor[6][9] = "I2";
		vetor[6][10] = "C";
		vetor[6][11] = "C";
		vetor[6][13] = "C";



		vetor[7][0] = "C";
		vetor[7][2] = "C";
		vetor[7][4] = "C";
		vetor[7][5] = "C";
		vetor[7][6] = "C";
		

		vetor[8][0] = "C";
		vetor[8][2] = "C";
		vetor[8][4] = "C";
		vetor[8][5] = "C";
		vetor[8][6] = "C";
		vetor[8][8] = "C";
		vetor[8][9] = "C";
		vetor[8][10] = "C";
		vetor[8][11] = "C";
		vetor[8][13] = "C";

		vetor[9][8] = "C";
		vetor[9][9] = "C";
		vetor[9][10] = "C";
		vetor[9][11] = "C";
		


	}

	/*

	adicionarRobo("R", 6, 5);
	adicionarRobo("F", 5, 1);
	//adicionarRobo("R", 3, 5);
	adicionarRobo("F", 6, 5);


//	adicionarPessoa("F", 0, 0);
	adicionarPessoa("S", 1, 2);
	adicionarPessoa("M", 1, 6);
	adicionarPessoa("F", 2, 3);
	adicionarPessoa("S", 6, 2);
	adicionarPessoa("M", 6, 6);
	adicionarPessoa("F", 4, 8);


	vetor[0][2] = "C";
	vetor[0][3] = "AL"; 
	vetor[0][4] = "C"; 
	vetor[0][6] = "C"; 
	vetor[0][8] = "C"; 

	vetor[1][0] = "AB";
	vetor[1][2] = "E";
	
	vetor[1][3] = "AL";
	vetor[1][7] = "AL";
	vetor[1][8] = "AL";
	



	vetor[2][0] = "G";
	vetor[2][1] = "E";
	vetor[2][2] = "C";

	vetor[2][4] = "H";
	vetor[2][5] = "G";
	vetor[2][6] = "G";
	vetor[2][8] = "C";
		

	vetor[3][0] = "G";
	vetor[3][1] = "AL";
	vetor[3][2] = "AL";
	vetor[3][4] = "G";
	vetor[3][5] = "G";
	vetor[3][6] = "G";
	vetor[3][8] = "C";

	vetor[4][0] = "G";
	vetor[4][2] = "C";
//	vetor[4][4] = "G";
//	vetor[4][5] = "G";
	vetor[4][6] = "E";
	vetor[4][7] = "E";
	
	
	vetor[5][0] = "";
	vetor[5][2] = "E";
	vetor[5][2] = "C";
	vetor[5][3] = "E";	
	vetor[5][4] = "C";
	vetor[5][5] = "C";
	vetor[5][6] = "C";
	vetor[5][7] = "AL";
//	vetor[5][8] = "I";

	vetor[6][1] = "E";
	vetor[6][2] = "AL";
	vetor[6][3] = "AL";
	vetor[6][4] = "E";
	vetor[6][5] = "E";
	vetor[6][6] = "AL";
//	vetor[6][7] = "AL";

	vetor[6][7] = "I1";
	vetor[6][8] = "I2";*/
}

function adicionarPessoa(tipo, Y, X) {
	var pessoa = {"tipo" : tipo, "Y" : Y, "X" : X};
	pessoas.push(pessoa);
}

function adicionarRobo(tipo, Y, X) {
	var robo = {"tipo" : tipo, "Y" : Y, "X" : X};
	robos.push(robo);
}

function conexaoBemSucedida() {

	$("#telaInicial").hide();
	$("#jogo").show();
//	ws.send("ESTABELECIDA");
}

function erroConexao(erro) {
	alert(erro);
}

function montarTabuleiro(){	
	var i;
	$("#tabuleiro").html("");
	for (i=0; i<nroLinhas; i++){
		$("#tabuleiro").append("<tr id='espaco_" + i + "'></tr>");
		for (j=0; j<nroColunas; j++){
		var tmp = i + " = " + j;
			var t = "td_espaco_" + i + "_" + j;
			var img = "imagens/casas/1433722577_kfm_home2a.jpg";
			$("#espaco_" + i).append("<td id='" + t+ "' class='tab_tds espaco' ></td>");
			if (ruas[i][j] > 0) {
				$("#" + t).addClass("rua_" + ruas[i][j]);
			}
		}
	}

	for (i=0; i<nroLinhas; i++){
		for (j=0; j<nroColunas; j++){
			var t = "td_espaco_" + i + "_" + j;
			if (vetor[i][j] == "C") {
				$("#" + t).addClass("casa grama");

				var img = 'imagens/casas/House-icon.png';


				var random = Math.floor((Math.random() * 7) + 1);
				if (random == 1) {
					img = 'imagens/casas/2-Hot-Home-icon.png';					
				} else if (random == 2) {
					img = 'imagens/casas/1433722577_kfm_home2a.jpg';					
				} else if (random == 3) {
					img = 'imagens/casas/1433722596_home.png';					
				} else if (random == 4) {
					img = 'imagens/casas/1433722623_go-home.png';					
				} else if (random == 5) {
					img = 'imagens/casas/1433722652_Home.png';					
				} else if (random == 6) {
					img = 'imagens/casas/1433722635_property.png';					
				} else if (random == 7) {
					img = 'imagens/casas/House-icon.png';
				}
				$("#" + t).html("<img src='" + img + "'/>");
			} else 	if (vetor[i][j] == "G") {
				$("#" + t).addClass("grama");
			} else 	if (vetor[i][j] == "H") {
				$("#" + t).addClass("grama hospital");
				$("#" + t).removeClass("tab_tds");
				$("#" + t).html("<img src='imagens/hospital3.png' style='position: absolute ! important;'>");

				var t1 = "td_espaco_" + i + "_" + (j + 1);
				$("#" + t1).removeClass("tab_tds");
				t1 = "td_espaco_" + i + "_" + (j + 2);
				$("#" + t1).removeClass("tab_tds");
				t1 = "td_espaco_" + (i + 1) + "_" + (j + 1);
				$("#" + t1).removeClass("tab_tds");
				t1 = "td_espaco_" + (i + 1) + "_" + (j);
				$("#" + t1).removeClass("tab_tds");
				t1 = "td_espaco_" + (i + 1) + "_" + (j + 2);
				$("#" + t1).removeClass("tab_tds");
			} else 	if (vetor[i][j] == "AB") {
				$("#" + t).addClass("abrigo grama");
				$("#" + t).html("<img src='imagens/abrigo.png' style='position: absolute ! important;'>");
				var t1 = "td_espaco_" + i + "_" + (j + 1);
				$("#" + t1).removeClass("tab_tds");
				t1 = "td_espaco_" + (i + 1) + "_" + (j);
				$("#" + t1).removeClass("tab_tds");
				t1 = "td_espaco_" + (i + 1) + "_" + (j + 1);
				$("#" + t1).removeClass("tab_tds");
			} else 	if (vetor[i][j] == "I1") {
				$("#" + t).addClass("iml_inicio");
				$("#" + t).html("<img src='imagens/diogo2/iml/i1.png' />");
			} else 	if (vetor[i][j] == "I2") {
				$("#" + t).addClass("iml_fim");
				$("#" + t).html("<img src='imagens/diogo2/iml/i2.png' />");
			} else 	if (vetor[i][j] == "AL") {
				$("#" + t).html($("#" + t).html() + "<div class='objetos alagamento'><img src='imagens/diogo/alagamento_6.png'></div>");
			} else 	if (vetor[i][j] == "E") {
				$("#" + t).html($("#" + t).html() + "<div class='objetos escombro'><img src='imagens/diogo/escombros2.png'></div>");
			}
		}
	}

	$.each(robos, function(key, value) {
		if (key > 0) {
			var t = "td_espaco_" + value.Y + "_" + value.X;
			if (value.tipo == "R") {
				$("#" + t).html($("#" + t).html() + getHtmlRoboResgate());
			}
			if (value.tipo == "F") {
				$("#" + t).html($("#" + t).html() + getHtmlRoboForca());
			}
			$("#" + t).addClass("robo_" + key);
		}
	});

	$.each(pessoas, function(key, value) {
		if (key > 0) {
			var t = "td_espaco_" + value.Y + "_" + value.X;
			$("#" + t).addClass("pessoa_" + key);
			if (value.tipo == "S") {
				$("#" + t).html($("#" + t).html() + "<div class='objetos pessoas div_img_pessoa_" + key + "'><img class='img_pessoa' src='imagens/pessoas/accept-female-user-icon.png'/></div>");
			}
			if (value.tipo == "F") {
				$("#" + t).html($("#" + t).html() + "<div class='objetos pessoas div_img_pessoa_" + key + "'><img class='img_pessoa' src='imagens/pessoas/female-user-search-icon.png'/></div>");
			}
			if (value.tipo == "M") {
				$("#" + t).html($("#" + t).html() + "<div class='objetos pessoas div_img_pessoa_" + key + "'><img class='img_pessoa' src='imagens/pessoas/remove-female-user-icon.png'/></div>");
			}
		}
	});
}

function montarProlog() {
	texto = "";
	ruas_sujas = [];

	for (i=0; i<nroLinhas; i++){
		for (j=0; j<nroColunas; j++){
			if (vetor[i][j] == "E") {
				if ($.inArray(ruas[i][j], ruas_sujas) == -1) {
					ruas_sujas.push(ruas[i][j]);
				}
				adicionarTexto("given(tsunami,local(escombro, rua" + ruas[i][j] + ")).", "S");
			}

		}
	}

	for (i=0; i<nroLinhas; i++){
		for (j=0; j<nroColunas; j++){
			if (vetor[i][j] == "AL") {
				if ($.inArray(ruas[i][j], ruas_sujas) == -1) {
					ruas_sujas.push(ruas[i][j]);
				}
				adicionarTexto("given(tsunami,local(alagamento, rua" + ruas[i][j] + ")).", "S");
			}

		}
	}


	var ruas_limpas = [];
	for (i=1; i<=numeroRuas; i++){
		if ($.inArray(i, ruas_sujas) == -1) {
			adicionarTexto("given(tsunami, rua_limpa(rua" + i  + ")).", "S");
		}
	}


	adicionarTexto("given(tsunami,local(hospital, rua3)).", "S");
	adicionarTexto("given(tsunami,local(abrigo, rua2)).", "S");
	adicionarTexto("given(tsunami,local(iml, rua5)).", "S");


	var ruas_com_vitimas = [];
	$.each(pessoas, function(key, value) {
		if (key > 0) {
			ruas_com_vitimas.push(ruas[value.Y][value.X]);
			var t = "td_espaco_" + value.Y + "_" + value.X;
			adicionarTexto("given(tsunami,local(pessoa" + key + ",rua" + ruas[value.Y][value.X] + ")).", "S");
				
			if (value.tipo == "S") {
				adicionarTexto("given(tsunami,vitima_saudavel(pessoa" + key + ")).", "S");
			}
			if (value.tipo == "F") {
				adicionarTexto("given(tsunami,vitima_ferida(pessoa" + key + ")).", "S");
			}
			if (value.tipo == "M") {
				adicionarTexto("given(tsunami,vitima_morta(pessoa" + key + ")).", "S");
			}
		}
	});

	for (i=1; i<=numeroRuas; i++){
		if ($.inArray(i, ruas_com_vitimas) == -1) {
			adicionarTexto("given(tsunami, sem_vitimas(rua" + i  + ")).", "S");
		}
	}	

	$.each(robos, function(key, value) {
		if (key > 0) {
			adicionarTexto("given(tsunami,local(robo" + key + ",rua" + ruas[value.Y][value.X] + ")).", "S");
		}
	});

	//Verdades

	for (i=1; i<=numeroRuas; i++){
			adicionarTexto("always(rua(rua" + i  + ")).", "S");
	}


	$.each(robos, function(key, value) {
		if (key > 0) {
			if (value.tipo == "F") {
				adicionarTexto("always(robo_forca_bruta(robo" + key + ")).", "S");
			} else {
				adicionarTexto("always(robo_resgate_vida(robo" + key + ")).", "S");
			}
		}
	});


	adicionarTexto("always(edificio(hospital)).", "S");
	adicionarTexto("always(edificio(abrigo)).", "S");
	adicionarTexto("always(edificio(iml)).", "S");


	if (cidadeAtual == "P") {
		texto += "always(connects(rua1, rua1)).\n";
		texto += "always(connects(rua1, rua2)).\n";
		texto += "always(connects(rua1, rua5)).\n";

		texto += "always(connects(rua2, rua2)).\n";
		texto += "always(connects(rua2, rua1)).\n";
		texto += "always(connects(rua2, rua3)).\n";
		texto += "always(connects(rua2, rua4)).\n";

		texto += "always(connects(rua3, rua3)).\n";
		texto += "always(connects(rua3, rua2)).\n";
		texto += "always(connects(rua3, rua5)).\n";

		texto += "always(connects(rua4, rua4)).\n";
		texto += "always(connects(rua4, rua2)).\n";
		texto += "always(connects(rua4, rua5)).\n";

		texto += "always(connects(rua5, rua5)).\n";
		texto += "always(connects(rua5, rua1)).\n";
		texto += "always(connects(rua5, rua3)).\n";
		texto += "always(connects(rua5, rua4)).\n";

 	} else if (cidadeAtual == "M") {
		texto += "always(connects(rua1, rua1)).\n";
		texto += "always(connects(rua1, rua2)).\n";
		texto += "always(connects(rua1, rua3)).\n";
		texto += "always(connects(rua1, rua4)).\n";
		texto += "always(connects(rua1, rua5)).\n";
		texto += "always(connects(rua1, rua6)).\n";
		texto += "always(connects(rua1, rua9)).\n";
		texto += "always(connects(rua1, rua10)).\n";

		texto += "always(connects(rua2, rua1)).\n";
		texto += "always(connects(rua2, rua2)).\n";
		texto += "always(connects(rua2, rua4)).\n";
		texto += "always(connects(rua2, rua5)).\n";
		texto += "always(connects(rua2, rua6)).\n";
		texto += "always(connects(rua2, rua7)).\n";
		
		texto += "always(connects(rua3, rua1)).\n";
		texto += "always(connects(rua3, rua3)).\n";

		texto += "always(connects(rua4, rua1)).\n";
		texto += "always(connects(rua4, rua2)).\n";
		texto += "always(connects(rua4, rua4)).\n";

		texto += "always(connects(rua5, rua1)).\n";
		texto += "always(connects(rua5, rua2)).\n";
		texto += "always(connects(rua5, rua5)).\n";
		texto += "always(connects(rua5, rua8)).\n";

		texto += "always(connects(rua6, rua1)).\n";
		texto += "always(connects(rua6, rua2)).\n";
		texto += "always(connects(rua6, rua6)).\n";
		
		texto += "always(connects(rua7, rua2)).\n";
		texto += "always(connects(rua7, rua7)).\n";
		
		texto += "always(connects(rua8, rua5)).\n";
		texto += "always(connects(rua8, rua8)).\n";
		texto += "always(connects(rua8, rua9)).\n";
		texto += "always(connects(rua8, rua10)).\n";

		texto += "always(connects(rua9, rua1)).\n";
		texto += "always(connects(rua9, rua8)).\n";
		texto += "always(connects(rua9, rua9)).\n";
		
		texto += "always(connects(rua10, rua1)).\n";
		texto += "always(connects(rua10, rua8)).\n";
		texto += "always(connects(rua10, rua10)).\n";
	
		
	} else {
		texto += "always(connects(rua1, rua2)).\n";
		texto += "always(connects(rua1, rua3)).\n";
		texto += "always(connects(rua1, rua4)).\n";
		texto += "always(connects(rua1, rua5)).\n";
		texto += "always(connects(rua2, rua7)).\n";
		texto += "always(connects(rua2, rua8)).\n";
		texto += "always(connects(rua2, rua9)).\n";
		texto += "always(connects(rua3, rua7)).\n";
		texto += "always(connects(rua3, rua9)).\n";
		texto += "always(connects(rua4, rua6)).\n";
		texto += "always(connects(rua4, rua7)).\n";
		texto += "always(connects(rua5, rua6)).\n";
		texto += "always(connects(rua5, rua7)).\n";
		texto += "always(connects(rua7, rua8)).\n";
	}
	texto += "imposs(local( X, Y )  &  local( X, Z )  &  notequal( Y, Z )  ).\n";
	texto += "imposs(rua_limpa(X)  &  local(escombro, X)).\n";
	texto += "imposs(rua_limpa(X)  &  local(alagamento, X)).\n";
	
	//texto += "imposs(local(Vit,Local) & local(Vit, Local2) & notequal(Local==Local2)).\n";
	//texto += "imposs(local(Robo, Local) & local(Robo, Local2) & notequal(Local==Local2)).\n";

	if (cidadeAtual == "P" || cidadeAtual == "M") {
		texto += "can(remover_escombro_alagamento(Robo, RU), robo_forca_bruta(Robo) & rua(RU) & local(escombro, RU) & local(alagamento, RU) & local(Robo, RU)).\n";
		texto += "can(remover_escombro(Robo, RU),  robo_forca_bruta(Robo) & rua(RU)& local(escombro, RU) & local(Robo, RU)).\n";
		texto += "can(remover_alagamento(Robo, RU), robo_forca_bruta(Robo) & rua(RU) & local(alagamento, RU) & local(Robo, RU)).\n";
		texto += "can(salvar_vitima_morta(VIT, RO, RU),    robo_resgate_vida(RO) & vitima_morta(VIT)    & local(VIT, RU) & rua(RU) & rua_limpa(RU) & local(RO, RU)).\n";
		texto += "can(salvar_vitima_ferida(VIT, RO, RU),   robo_resgate_vida(RO) & vitima_ferida(VIT)   & local(VIT, RU) & rua(RU) & rua_limpa(RU) & local(RO, RU)).\n";
		texto += "can(salvar_vitima_saudavel(VIT, RO, RU), robo_resgate_vida(RO) & vitima_saudavel(VIT) & local(VIT, RU) & rua(RU) & rua_limpa(RU) & local(RO, RU)).\n";

		texto += "can(mover_robo_forca(Robo, W, Y, V), robo_forca_bruta(Robo) & local(Robo,V) & connects(V,Y) & connects(Y,W)).\n";
		texto += "can(mover_robo_resgate(Robo, W, Y, V), robo_resgate_vida(Robo) & local(Robo,V) & connects(V,Y) & connects(Y,W)).\n";

		texto += "can(mover(Robo, W), robo_forca_bruta(Robo) & local(Robo,V) & ! & connects(V,W)).\n";
		texto += "can(mover(Robo, W), robo_resgate_vida(Robo) & local(Robo,V) & ! & connects(V,W)).\n";

	} else {
		texto += "can(remover_escombro_alagamento(Robo, RU), local(Robo, RU) & robo_forca_bruta(Robo) & rua(RU) & local(escombro, RU) & local(alagamento, RU) ).\n";
		texto += "can(remover_escombro(Robo, RU), local(Robo, RU) & robo_forca_bruta(Robo) & rua(RU)& local(escombro, RU)).\n";
		texto += "can(remover_alagamento(Robo, RU), local(Robo, RU) & robo_forca_bruta(Robo) & rua(RU) & local(alagamento, RU)).\n";
		texto += "can(salvar_vitima_morta(VIT, RO, RU), local(VIT, RU) & local(RO, RU) & robo_resgate_vida(RO) & rua(RU) & rua_limpa(RU) & vitima_morta(VIT)).\n";
		texto += "can(salvar_vitima_ferida(VIT, RO, RU), local(VIT, RU) & local(RO, RU) & robo_resgate_vida(RO) & rua(RU) & rua_limpa(RU) & vitima_ferida(VIT)).\n";
		texto += "can(salvar_vitima_saudavel(VIT, RO, RU), local(VIT, RU) & local(RO, RU) & robo_resgate_vida(RO) & rua(RU) & rua_limpa(RU) & vitima_saudavel(VIT)).\n";
		
		texto += "can(mover_robo_resgate(RO, _), robo_resgate_vida(RO)).\n";
		texto += "can(mover_robo_forca(RO, _), robo_forca_bruta(RO)).\n";
	}


	texto += "add(rua_limpa(RU), remover_escombro_alagamento(_, RU)).\n";
	texto += "add(rua_limpa(RU), remover_escombro(_, RU)).\n";
	texto += "add(rua_limpa(RU), remover_alagamento(_, RU)).\n";
	texto += "add(vitima_iml(VIT), salvar_vitima_morta(VIT, _, _)).\n";
	texto += "add(sem_vitimas(RU), salvar_vitima_morta(_, _, RU)).\n";
	texto += "add(vitima_hospital(VIT), salvar_vitima_ferida(VIT, _, _)).\n";
	texto += "add(sem_vitimas(RU), salvar_vitima_ferida(_, _, RU)).\n";
	texto += "add(vitima_abrigo(VIT), salvar_vitima_saudavel(VIT, _, _)).\n";
	texto += "add(sem_vitimas(RU), salvar_vitima_saudavel(_, _, RU)).\n";

	if (cidadeAtual == "P" || cidadeAtual == "M") {
		texto += "add(local(Robo,W), mover_robo_forca(Robo,W, _, _)).\n";
		texto += "add(local(Robo,W), mover_robo_resgate(Robo,W, _, _)).\n";
		texto += "add(local(Robo,W), mover(Robo,W)).\n";
		texto += "del(local(Robo,V),mover_robo_forca(Robo,_, _, V)).\n";
		texto += "del(local(Robo,V),mover_robo_resgate(Robo,_, _, V)).\n";
		texto += "del(local(Robo,V),mover(Robo,V)).\n";
	} else {
		texto += "add(local(RO, Rua), mover_robo_resgate(RO, Rua)).\n";
		texto += "add(local(RO, Rua), mover_robo_forca(RO, Rua)).\n";
	}


	texto += "del(local(alagamento, RU), remover_escombro_alagamento(_, RU)).\n";
	texto += "del(local(escombro, RU), remover_escombro_alagamento(_, RU)).\n";
	texto += "del(local(escombro, RU), remover_escombro(_, RU)).\n";
	texto += "del(local(alagamento, RU), remover_alagamento(_, RU)).\n";
	texto += "del(local(VIT, RU),  salvar_vitima_morta(VIT, _, RU)).\n";
	texto += "del(vitima_morta(VIT), salvar_vitima_morta(VIT, _, _)).\n";
	texto += "del(local(VIT, RU),  salvar_vitima_ferida(VIT, _, RU)).\n";
	texto += "del(vitima_ferida(VIT), salvar_vitima_ferida(VIT, _, _)).\n";
	texto += "del(local(VIT, RU),  salvar_vitima_saudavel(VIT, _, RU)).\n";
	texto += "del(vitima_saudavel(VIT), salvar_vitima_saudavel(VIT, _, _)).\n";

	if (cidadeAtual == "P" || cidadeAtual == "M") {
	
	} else {
		texto += "del(local(RO,_), mover_robo_forca(RO,_)).\n";
		texto += "del(local(RO,_), mover_robo_resgate(RO,_)).\n";
	}


	var testeFinal = "";
	testeFinal = "testeFinal:- plans(";
	for (i=1; i<=numeroRuas; i++){
		if (i > 1) {
			testeFinal += " & ";
		}
		testeFinal += "rua_limpa(rua" + i + ")";

		$.each(pessoas, function(key, value) {
			if (key > 0) {
				if (ruas[value.Y][value.X] == i) {
					if (value.tipo == "S") {
						testeFinal += " & vitima_abrigo(pessoa" + key + ")";
					}
					if (value.tipo == "F") {
						testeFinal += " & vitima_hospital(pessoa" + key + ")";
					}
					if (value.tipo == "M") {
						testeFinal += " & vitima_iml(pessoa" + key + ")";
					}
				}
			}
		});


	}
	

	texto += testeFinal + ",tsunami).";
	/*for (i=0; i<nroLinhas; i++){
		for (j=0; j<nroColunas; j++){
			if (vetor[i][j] == "H") {
				texto += "given(tsunami,local(hospital, rua" + ruas[i][j] + "))." + "\n";
			}

		}
	}

	for (i=0; i<nroLinhas; i++){
		for (j=0; j<nroColunas; j++){
			if (vetor[i][j] == "AB") {
				texto += "given(tsunami,local(abrigo, rua" + ruas[i][j] + "))." + "\n";
			}

		}
	}

	for (i=0; i<nroLinhas; i++){
		for (j=0; j<nroColunas; j++){
			if (vetor[i][j] == "I") {
				texto += "given(tsunami,local(iml, rua" + ruas[i][j] + "))." + "\n";
			}

		}
	}
*/
	
	/*var nroPessoas = 1; 
	for (i=0; i<nroLinhas; i++){
		for (j=0; j<nroColunas; j++){
			if (vetor[i][j] == "VS") {
				texto += "given(tsunami,local(pessoa" + nroPessoas +",rua" + ruas[i][j] + "))." + "\n";
				texto += "given(tsunami,vitima_saudavel(pessoa"+ nroPessoas + "))." + "\n";
				nroPessoas++;
			} else if (vetor[i][j] == "VM") {
				texto += "given(tsunami,local(pessoa" + nroPessoas +",rua" + ruas[i][j] + "))." + "\n";
				texto += "given(tsunami,vitima_morta(pessoa"+ nroPessoas + "))." + "\n";
				nroPessoas++;
			} else if (vetor[i][j] == "VF") {
				texto += "given(tsunami,local(pessoa" + nroPessoas +",rua" + ruas[i][j] + "))." + "\n";
				texto += "given(tsunami,vitima_ferida(pessoa"+ nroPessoas + "))." + "\n";
				nroPessoas++;	
			}
		}
	}

	var nroRobos = 1;
	for (i=0; i<nroLinhas; i++){
		for (j=0; j<nroColunas; j++){
			if (vetor[i][j] == "VF") {
				//texto += "given(tsunami,local(robo1,rua8))." + "\n";
			}
		}
	}

//	given(tsunami,local(escombro, rua1)).
*/
//	console.info(texto);
}

function adicionarTexto(txt, rua) {
 	var n = texto.indexOf(txt);
 	if (n == -1) {
 		texto += txt + "\n";
	}
}

function comunicarComServidor() {
	$('#modal_calculando').modal('show');

	$.ajax({
		method: "POST",
  		data: { script: texto},
	  	url: "servidor.php"
	}).done(function( data ) {
		solucaoProlog = data.split('\\n'); 
		posInicial = 0;
  	

  		var indice = 1;
		$.each(solucaoProlog, function(key, value){
			if ($.trim(value) != "" && value != "tsunami;" && value != '"') {
				$("#tabelaAcoes").append("<tr id='res_tr_" + key + "'><td>" + indice + "</td><td>" + value + "<input type='hidden' id='input_" + key + "' /> </td></tr>");
					indice++;
			}
		});
	
	$('#modal_calculando').modal('hide');
	
  		solucao(0);
    }).fail(function() {
    	alert( "error" );
  	});
}

function solucao(indice) {
	var continua = true;
	$.each(solucaoProlog, function(key, value){
		if (key != indice) {
			return null;
		}
		if ($.trim(value) != "" && value != "tsunami;" && value != '"') {
			$(".info").removeClass("info");
			$("#res_tr_" + key).addClass("info");
			//$("#input_" + key).focus();
			console.info(value);		
			if (value.indexOf("remover_escombro_alagamento(") != -1) {
				var str = value.replace("remover_escombro_alagamento(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");
				var nroRua = parametros[1].replace("rua", "");

				$(".highlight").removeClass("highlight");
				$(".rua_" + nroRua).addClass("highlight");
				for (i = 0; i < nroLinhas; i++) {
					for (j = 0; j < nroColunas; j++) {
						if (ruas[i][j] == nroRua) {
							var t = "td_espaco_" + i + "_" + j;
							$("#" + t + " .alagamento").remove();
							$("#" + t + " .escombro").remove();
						}
					}
				}
			} else if (value.indexOf("remover_escombro(") != -1) {
				var str = value.replace("remover_escombro(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");
				var nroRua = parametros[1].replace("rua", "");
				$(".highlight").removeClass("highlight");
				$(".rua_" + nroRua).addClass("highlight");
				for (i = 0; i < nroLinhas; i++) {
					for (j = 0; j < nroColunas; j++) {
						if (ruas[i][j] == nroRua) {
							var t = "td_espaco_" + i + "_" + j;
						//	$("#" + t).removeClass("escombro");
							$("#" + t + " .escombro").remove();
						}
					}
				}
			} else if (value.indexOf("remover_alagamento(") != -1) {
				var str = value.replace("remover_alagamento(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");
				var nroRua = parametros[1].replace("rua", "");
				$(".highlight").removeClass("highlight");
				$(".rua_" + nroRua).addClass("highlight");
				for (i = 0; i < nroLinhas; i++) {
					for (j = 0; j < nroColunas; j++) {
						if (ruas[i][j] == nroRua) {
							var t = "td_espaco_" + i + "_" + j;
							//$("#" + t).removeClass("alagamento");
							$("#" + t + " .alagamento").remove();
						}
					}
				}
			} else if (value.indexOf("mover_robo_forca(") != -1) {
				var str = value.replace("mover_robo_forca(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");

				if (parametros.length == 4) {
					
					var nroRobo = parametros[0].replace("robo", "");
					var nroRua = parametros[1].replace("rua", "");
					var nroRuaMeio = parametros[2].replace("rua", "");
					var nroRuaInicio = parametros[3].replace("rua", "");
					moverRoboForca(nroRobo, nroRua, nroRuaMeio, nroRuaInicio, (indice + 1));
					continua = false;
				} else {
					var nroRobo = parametros[0].replace("robo", "");
					var nroRua = parametros[1].replace("rua", "");


					$(".highlight").removeClass("highlight");
					$(".rua_" + nroRua).addClass("highlight");
					

					//$(".robo_" + nroRobo + " > .img_robo").hide();
					//$(".robo_" + nroRobo + " .robo_forca").remove();
					//$(".robo_" + nroRobo).removeClass("robo_" + nroRobo);
					removerRoboForca(nroRobo);

					var primeiro = true;
					for (i = 0; i < nroLinhas; i++) {
						for (j = 0; j < nroColunas; j++) {
							if (ruas[i][j] == nroRua) {
								var t = "td_espaco_" + i + "_" + j;
								if (primeiro) {
									$("#" + t).html($("#" + t).html() + getHtmlRoboForca());
									$("#" + t).addClass("robo_" + nroRobo);
									primeiro = false;
								}
							}
						}
					}
				}
			} else if (value.indexOf("mover_robo_resgate(") != -1) {
				var str = value.replace("mover_robo_resgate(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");
				var nroRobo = parametros[0].replace("robo", "");
				var nroRua = parametros[1].replace("rua", "");

				if (parametros.length == 4) {
					
					var nroRobo = parametros[0].replace("robo", "");
					var nroRua = parametros[1].replace("rua", "");
					var nroRuaMeio = parametros[2].replace("rua", "");
					var nroRuaInicio = parametros[3].replace("rua", "");
					moverRoboResgate(nroRobo, nroRua, nroRuaMeio, nroRuaInicio, (indice + 1));
					continua = false;
				} else {

					$(".highlight").removeClass("highlight");
					$(".rua_" + nroRua).addClass("highlight");
					
	//				$(".robo_" + nroRobo + " > .img_robo").hide();
	//				$(".robo_" + nroRobo + " .robo_resgate").remove();
	//				$(".robo_" + nroRobo).removeClass("robo_" + nroRobo);
					
					console.log(nroRua);
					console.log(nroRobo);
					removerRoboResgate(nroRobo);
					var primeiro = true;
					for (i = 0; i < nroLinhas; i++) {
						for (j = 0; j < nroColunas; j++) {
							if (ruas[i][j] == nroRua) {
								var t = "td_espaco_" + i + "_" + j;
								if (primeiro) {
									$("#" + t).html($("#" + t).html() + getHtmlRoboResgate());
									$("#" + t).addClass("robo_" + nroRobo);
									primeiro = false;
								}
							}
						}
					}
				}
			} else if (value.indexOf("salvar_vitima_saudavel(") != -1) {
				var str = value.replace("salvar_vitima_saudavel(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");
				var nroPessoa = parametros[0].replace("pessoa", "");
				var nroRobo = parametros[1].replace("robo", "");
				var nroRua = parametros[2].replace("rua", "");

				$(".highlight").removeClass("highlight");
				$(".rua_" + nroRua).addClass("highlight");
				
				/*removerRoboResgate(nroRobo);
				var t = "td_espaco_" + pessoas[nroPessoa].Y + "_" + pessoas[nroPessoa].X;
				$("#" + t).html($("#" + t).html() + getHtmlRoboResgate());
				$("#" + t).addClass("robo_" + nroRobo);*/
				continua = false;
				var indice3 = indice + 1;
				//setTimeout(function(){ removerPessoa(nroPessoa); solucao(indice3); },2000);
				moverRoboParaRemoverPessoa(nroRobo, nroPessoa, nroRua, indice3);
			} else if (value.indexOf("salvar_vitima_morta(") != -1) {
				var str = value.replace("salvar_vitima_morta(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");
				var nroPessoa = parametros[0].replace("pessoa", "");
				var nroRobo = parametros[1].replace("robo", "");
				var nroRua = parametros[2].replace("rua", "");
				$(".highlight").removeClass("highlight");
				$(".rua_" + nroRua).addClass("highlight");
				
				/*removerRoboResgate(nroRobo);
				var t = "td_espaco_" + pessoas[nroPessoa].Y + "_" + pessoas[nroPessoa].X;
				$("#" + t).html($("#" + t).html() + getHtmlRoboResgate());
				$("#" + t).addClass("robo_" + nroRobo);*/
				continua = false;
				var indice3 = indice + 1;
				//setTimeout(function(){ removerPessoa(nroPessoa); solucao(indice3); },2000);
				moverRoboParaRemoverPessoa(nroRobo, nroPessoa, nroRua, indice3);
			} else if (value.indexOf("salvar_vitima_ferida(") != -1) {
				var str = value.replace("salvar_vitima_ferida(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");
				var nroPessoa = parametros[0].replace("pessoa", "");
				var nroRobo = parametros[1].replace("robo", "");
				var nroRua = parametros[2].replace("rua", "");
				$(".highlight").removeClass("highlight");
				$(".rua_" + nroRua).addClass("highlight");
				
				/*removerRoboResgate(nroRobo);
				var t = "td_espaco_" + pessoas[nroPessoa].Y + "_" + pessoas[nroPessoa].X;
				$("#" + t).html($("#" + t).html() + getHtmlRoboResgate());
				$("#" + t).addClass("robo_" + nroRobo);*/
				continua = false;
				var indice3 = indice + 1;
				//setTimeout(function(){ removerPessoa(nroPessoa); solucao(indice3); },2000);
				moverRoboParaRemoverPessoa(nroRobo, nroPessoa, nroRua, indice3);
			}
		}
	});
	ultimoKey = indice;
	if (continua) {
		indice += 1;
		setTimeout(function(){ solucao(indice); },2000);
	}
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function getHtmlRoboResgate() {
	return "<div class='objetos robos robo_resgate'><img class='img_robo' src='imagens/robos/e-ric-icon.png'/></div>";
}

function getHtmlRoboForca() {
	return "<div class='objetos robos robo_forca'><img class='img_robo' src='imagens/robos/robo_bala.png'/></div>";
}

function removerPessoa(nroPessoa) {
	$(".pessoa_" + nroPessoa).removeClass("pessoa_" + nroPessoa);
	$(".div_img_pessoa_" + nroPessoa).remove();
}

function removerRoboResgate(nroRobo) {
	$(".robo_" + nroRobo + " .robo_resgate").remove();
	$(".robo_" + nroRobo).removeClass("robo_" + nroRobo);
}

function removerRoboForca(nroRobo) {
	$(".robo_" + nroRobo + " .robo_forca").remove();
	$(".robo_" + nroRobo).removeClass("robo_" + nroRobo);
}

function salvarPlanejamento() {
	var dados = {};
	dados.ruas = ruas;
	dados.pessoas = pessoas;
	dados.robos = robos;
	dados.cidade = cidadeAtual;


	$.ajax({
		method: "POST",
  		data: { script: dados},
	  	url: "salvar.cidade.php"
	}).done(function( data ) {
		console.info(data);
		window.open(data);
  	});
}

function exibirCodigoProlog() {
	$("#codigoProlog").html(texto);
	$('#modal_codigo').modal('show');
}

function importarCidade(data) {
	var nomeArquivo = data.replace('"]', "");
	nomeArquivo = nomeArquivo.replace('["', "");
	console.log(nomeArquivo);
	$.ajax({
		method: "POST",
  		data: { arquivo: nomeArquivo},
	  	url: "processar.cidade.php"
	}).done(function( data ) {
		console.info(data);
			var data = JSON.parse(data);
			ruas = data.ruas;
			pessoas = data.pessoas;
			robos = data.robos;
			cidadeAtual = data.cidade;

			if (cidadeAtual == "P") {
				nroLinhas = 9;
				nroColunas = 8;
				numeroRuas = 6;
			} else if (cidadeAtual == "M") {
				nroLinhas = 9;
				nroColunas = 13;
				numeroRuas = 10;
			} else if (cidadeAtual == "G") {
				nroLinhas = 10;
				nroColunas = 15;
				numeroRuas = 11
			}
			inicializarVetor();
			montarTabuleiro();
			$("#telaInicial").hide();
			$("#jogo").show();
			montarProlog();
			comunicarComServidor();	
  	});
}

function exibirFuncaoImportar() {
	$(".configuracao").hide();
	$(".espacoUpload").show();
}

function voltarParaConfiguracoes() {
	$(".configuracao").show();
	$(".espacoUpload").hide();
}

function voltarParaTelaInicial() {
	vetor = [];
	ruas = [];
	texto = "";
	ruas_sujas = [];
	robos = [];
	pessoas = [];
	solucaoProlog = new Array();
	$("#telaInicial").show();
	$("#jogo").hide();
}

function moverRoboForca(nroRobo, nroRua, nroRuaMeio, nroRuaInicio, indice) {
	$(".highlight").removeClass("highlight");
	
	var caminhoRobo = [];
	
	var i;
	moverRobo(nroRuaInicio, nroRuaMeio, nroRua, nroRobo, "F");
}

function moverRoboResgate(nroRobo, nroRua, nroRuaMeio, nroRuaInicio, indice) {
	$(".highlight").removeClass("highlight");
	moverRobo(nroRuaInicio, nroRuaMeio, nroRua, nroRobo, "R");
}


function moverRobo(ini, meio, fim, nroRobo, tipoRobo)  {
	var posicaoAtual = $(".robo_" + nroRobo).attr("id");
	posicaoAtual = posicaoAtual.replace("td_espaco_", "");

	var posicaoAtual = posicaoAtual.split("_");
	var linhaAtual = parseInt(posicaoAtual[0]);
	var colunaAtual = parseInt(posicaoAtual[1]);


	var caminho = [];
	var i, j;

	var ultimaLinha = linhaAtual;
	var ultimaColuna = colunaAtual;


	if (ini != meio) {

		if (cidadeAtual == "P") {
			if (ini == 1 && meio == 2) {
				var linhaIntersecao = 1;
				var colunaIntersecao = 2;
				var linhaRua = 2;
				var linhaColuna = 2;
			} else if (ini == 1 && meio == 5) {
				var linhaIntersecao = 1;
				var colunaIntersecao = 6;
				var linhaRua = 2;
				var linhaColuna = 6;
			} else if (ini == 2 && meio == 1) {
				var linhaIntersecao = 2;
				var colunaIntersecao = 2;
				var linhaRua = 1;
				var linhaColuna = 2;
			} else if (ini == 2 && meio == 3) {
				var linhaIntersecao = 4;
				var colunaIntersecao = 2;
				var linhaRua = 4;
				var linhaColuna = 3;
			} else if (ini == 2 && meio == 4) {
				var linhaIntersecao = 6;
				var colunaIntersecao = 2;
				var linhaRua = 7;
				var linhaColuna = 2;
			} else if (ini == 3 && meio == 2) {
				var linhaIntersecao = 4;
				var colunaIntersecao = 3;
				var linhaRua = 4;
				var linhaColuna = 2;
			} else if (ini == 3 && meio == 5) {
				var linhaIntersecao = 4;
				var colunaIntersecao = 5;
				var linhaRua = 4;
				var linhaColuna = 6;
			} else if (ini == 4 && meio == 2) {
				var linhaIntersecao = 7;
				var colunaIntersecao = 3;
				var linhaRua = 7;
				var linhaColuna = 2;
			} else if (ini == 4 && meio == 5) {
				var linhaIntersecao = 7;
				var colunaIntersecao = 6;
				var linhaRua = 6;
				var linhaColuna = 6;
			} else if (ini == 5 && meio == 1) {
				var linhaIntersecao = 2;
				var colunaIntersecao = 6;
				var linhaRua = 1;
				var linhaColuna = 6;
			} else if (ini == 5 && meio == 3) {
				var linhaIntersecao = 4;
				var colunaIntersecao = 6;
				var linhaRua = 4;
				var linhaColuna = 5;
			} else if (ini == 5 && meio == 4) {
				var linhaIntersecao = 6;
				var colunaIntersecao = 6;
				var linhaRua = 7;
				var linhaColuna = 6;
			}
		} else {
			if (ini == 1 && meio == 2) {
				var linhaIntersecao = 6;
				var colunaIntersecao = 0;
				var linhaRua = 7;
				var linhaColuna = 0;
			} else if (ini == 1 && meio == 3) {
				var linhaIntersecao = 3;
				var colunaIntersecao = 2;
				var linhaRua = 2;
				var linhaColuna = 2;
			} else if (ini == 1 && meio == 4) {
				var linhaIntersecao = 3;
				var colunaIntersecao = 2;
				var linhaRua = 4;
				var linhaColuna = 2;
			} else if (ini == 1 && meio == 5 && fim == 8) {
				var linhaIntersecao = 3;
				var colunaIntersecao = 5;
				var linhaRua = 2;
				var linhaColuna = 5;
			} else if (ini == 1 && meio == 5) {
				var linhaIntersecao = 3;
				var colunaIntersecao = 5;
				var linhaRua = 4;
				var linhaColuna = 5;
			} else if (ini == 1 && meio == 6) {
				var linhaIntersecao = 3;
				var colunaIntersecao = 9;
				var linhaRua = 4;
				var linhaColuna = 9;
			} else if (ini == 1 && meio == 9) {
				var linhaIntersecao = 3;
				var colunaIntersecao = 8;
				var linhaRua = 2;
				var linhaColuna = 8;
			} else if (ini == 1 && meio == 10) {
				var linhaIntersecao = 3;
				var colunaIntersecao = 11;
				var linhaRua = 2;
				var linhaColuna = 11;
			} else if (ini == 2 && meio == 1) {
				var linhaIntersecao = 7;
				var colunaIntersecao = 0;
				var linhaRua = 6;
				var linhaColuna = 0;
			} else if (ini == 2 && meio == 4) {
				var linhaIntersecao = 7;
				var colunaIntersecao = 2;
				var linhaRua = 6;
				var linhaColuna = 2;
			} else if (ini == 2 && meio == 5) {
				var linhaIntersecao = 7;
				var colunaIntersecao = 5;
				var linhaRua = 6;
				var linhaColuna = 5;
			} else if (ini == 2 && meio == 6) {
				var linhaIntersecao = 7;
				var colunaIntersecao = 9;
				var linhaRua = 6;
				var linhaColuna = 9;
			} else if (ini == 2 && meio == 7) {
				var linhaIntersecao = 7;
				var colunaIntersecao = 9;
				var linhaRua = 7;
				var linhaColuna = 10;
			} else if (ini == 3 && meio == 1) {
				var linhaIntersecao = 2;
				var colunaIntersecao = 2;
				var linhaRua = 3;
				var linhaColuna = 2;
			} else if (ini == 4 && meio == 1) {
				var linhaIntersecao = 4;
				var colunaIntersecao = 2;
				var linhaRua = 3;
				var linhaColuna = 2;
			} else if (ini == 4 && meio == 2) {
				var linhaIntersecao = 6;
				var colunaIntersecao = 2;
				var linhaRua = 7;
				var linhaColuna = 2;
			} else if (ini == 5 && meio == 1) {
				var linhaIntersecao = 2;
				var colunaIntersecao = 5;
				var linhaRua = 3;
				var linhaColuna = 5;
			} else if (ini == 5 && meio == 2) {
				var linhaIntersecao = 6;
				var colunaIntersecao = 5;
				var linhaRua = 7;
				var linhaColuna = 5;
			} else if (ini == 5 && meio == 8) {
				var linhaIntersecao = 0;
				var colunaIntersecao = 5;
				var linhaRua = 0;
				var linhaColuna = 6;
			} else if (ini == 5 && meio == 9) {
				var linhaIntersecao = 0;
				var colunaIntersecao = 8;
				var linhaRua = 1;
				var linhaColuna = 8;
			} else if (ini == 5 && meio == 10) {
				var linhaIntersecao = 0;
				var colunaIntersecao = 11;
				var linhaRua = 1;
				var linhaColuna = 11;
			} else if (ini == 6 && meio == 1) {
				var linhaIntersecao = 4;
				var colunaIntersecao = 9;
				var linhaRua = 3;
				var linhaColuna = 9;
			} else if (ini == 6 && meio == 2) {
				var linhaIntersecao = 6;
				var colunaIntersecao = 9;
				var linhaRua = 7;
				var linhaColuna = 9;
			} else if (ini == 7 && meio == 2) {
				var linhaIntersecao = 8;
				var colunaIntersecao = 9;
				var linhaRua = 7;
				var linhaColuna = 9;
			} else if (ini == 8 && meio == 5) {
				var linhaIntersecao = 0;
				var colunaIntersecao = 6;
				var linhaRua = 0;
				var linhaColuna = 5;
			} else if (ini == 8 && meio == 9) {
				var linhaIntersecao = 0;
				var colunaIntersecao = 8;
				var linhaRua = 2;
				var linhaColuna = 8;
			} else if (ini == 8 && meio == 10) {
				var linhaIntersecao = 0;
				var colunaIntersecao = 11;
				var linhaRua = 1;
				var linhaColuna = 11;
			} else if (ini == 9 && meio == 1) {
				var linhaIntersecao = 2;
				var colunaIntersecao = 8;
				var linhaRua = 3;
				var linhaColuna = 8;
			} else if (ini == 9 && meio == 8) {
				var linhaIntersecao = 1;
				var colunaIntersecao = 8;
				var linhaRua = 0;
				var linhaColuna = 8;
			} else if (ini == 10 && meio == 1) {
				var linhaIntersecao = 2;
				var colunaIntersecao = 11;
				var linhaRua = 3;
				var linhaColuna = 11;
			} else if (ini == 10 && meio == 8) {
				var linhaIntersecao = 1;
				var colunaIntersecao = 11;
				var linhaRua = 0;
				var linhaColuna = 11;
			}
		}

		console.log("LINHA ATURAL " + linhaAtual + " LINHa INTERS " + linhaIntersecao);
		if (linhaAtual < linhaIntersecao) {
			var continua = true;
			while (continua) {
				continua = false;
				ultimaLinha = ultimaLinha + 1;
				if (ultimaLinha >= 0 && ultimaLinha < 20) {
					if (ruas[ultimaLinha][ultimaColuna] == ini) {
						caminho.push(ultimaLinha + "_" + ultimaColuna);
						continua = true;
						if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
							break;
						}
					}			
				}
				if (!continua) {
					ultimaLinha = ultimaLinha - 1;
				}
			}
		} else if (linhaAtual > linhaIntersecao) {
			var continua = true;
			while (continua) {
				continua = false;
				ultimaLinha = ultimaLinha - 1;
				if (ultimaLinha >= 0) {
					if (ruas[ultimaLinha][ultimaColuna] == ini) {
						caminho.push(ultimaLinha + "_" + ultimaColuna);
						continua = true;
						if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
							break;
						}
					}			
				}
				if (!continua) {
					ultimaLinha = ultimaLinha + 1;
				}
			}
		}

		if (colunaAtual < colunaIntersecao) {
			var continua = true;
			while (continua) {
				continua = false;
				ultimaColuna = ultimaColuna + 1;
				if (ultimaColuna >= 0 && ultimaColuna < 20) {
					if (ruas[ultimaLinha][ultimaColuna] == ini) {
						caminho.push(ultimaLinha + "_" + ultimaColuna);
						continua = true;
						if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
							break;
						}
					}			
				}
				if (!continua) {
					ultimaColuna = ultimaColuna - 1;
				}
			}
		} else if (colunaAtual > colunaIntersecao) {
			var continua = true;
			while (continua) {
				continua = false;
				ultimaColuna = ultimaColuna - 1;
				if (ultimaColuna >= 0) {
					if (ruas[ultimaLinha][ultimaColuna] == ini) {
						caminho.push(ultimaLinha + "_" + ultimaColuna);
						continua = true;
						if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
							break;
						}
					}			
				}
				if (!continua) {
					ultimaColuna = ultimaColuna + 1;
				}
			}
		}


		if (ultimaLinha < linhaIntersecao) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaLinha = ultimaLinha + 1;
			if (ultimaLinha >= 0 && ultimaLinha < 20) {
				if (ruas[ultimaLinha][ultimaColuna] == ini) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaLinha = ultimaLinha - 1;
			}
		}
	} else if (ultimaLinha > linhaIntersecao) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaLinha = ultimaLinha - 1;
			if (ultimaLinha >= 0) {
				if (ruas[ultimaLinha][ultimaColuna] == ini) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaLinha = ultimaLinha + 1;
			}
		}
	}

		if (ultimaColuna < colunaIntersecao) {
			var continua = true;
			while (continua) {
				continua = false;
				ultimaColuna = ultimaColuna + 1;
				if (ultimaColuna >= 0 && ultimaColuna < 20) {
					if (ruas[ultimaLinha][ultimaColuna] == ini) {
						caminho.push(ultimaLinha + "_" + ultimaColuna);
						continua = true;
						if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
							break;
						}
					}			
				}
				if (!continua) {
					ultimaColuna = ultimaColuna - 1;
				}
			}
		} else if (ultimaColuna > colunaIntersecao) {
			var continua = true;
			while (continua) {
				continua = false;
				ultimaColuna = ultimaColuna - 1;
				if (ultimaColuna >= 0) {
					if (ruas[ultimaLinha][ultimaColuna] == ini) {
						caminho.push(ultimaLinha + "_" + ultimaColuna);
						continua = true;
						if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
							break;
						}
					}			
				}
				if (!continua) {
					ultimaColuna = ultimaColuna + 1;
				}
			}
		}
		caminho.push(linhaRua + "_" + linhaColuna);
		ultimaLinha  = linhaRua;
		ultimaColuna = linhaColuna;
	

		ini = meio;
		console.log(caminho);
	}

	if (cidadeAtual == "P") {
		if (ini == 1 && fim == 2) {
			var linhaIntersecao = 1;
			var colunaIntersecao = 2;
			var linhaRua = 2;
			var linhaColuna = 2;
		} else if (ini == 1 && fim == 5) {
			var linhaIntersecao = 1;
			var colunaIntersecao = 6;
			var linhaRua = 2;
			var linhaColuna = 6;
		} else if (ini == 2 && fim == 1) {
			var linhaIntersecao = 2;
			var colunaIntersecao = 2;
			var linhaRua = 1;
			var linhaColuna = 2;
		} else if (ini == 2 && fim == 3) {
			var linhaIntersecao = 4;
			var colunaIntersecao = 2;
			var linhaRua = 4;
			var linhaColuna = 3;
		} else if (ini == 2 && fim == 4) {
			var linhaIntersecao = 6;
			var colunaIntersecao = 2;
			var linhaRua = 7;
			var linhaColuna = 2;
		} else if (ini == 3 && fim == 2) {
			var linhaIntersecao = 4;
			var colunaIntersecao = 3;
			var linhaRua = 4;
			var linhaColuna = 2;
		} else if (ini == 3 && fim == 5) {
			var linhaIntersecao = 4;
			var colunaIntersecao = 5;
			var linhaRua = 4;
			var linhaColuna = 6;
		} else if (ini == 4 && fim == 2) {
			var linhaIntersecao = 7;
			var colunaIntersecao = 3;
			var linhaRua = 7;
			var linhaColuna = 2;
		} else if (ini == 4 && fim == 5) {
			var linhaIntersecao = 7;
			var colunaIntersecao = 6;
			var linhaRua = 6;
			var linhaColuna = 6;
		} else if (ini == 5 && fim == 1) {
			var linhaIntersecao = 2;
			var colunaIntersecao = 6;
			var linhaRua = 1;
			var linhaColuna = 6;
		} else if (ini == 5 && fim == 3) {
			var linhaIntersecao = 4;
			var colunaIntersecao = 6;
			var linhaRua = 4;
			var linhaColuna = 5;
		} else if (ini == 5 && fim == 4) {
			var linhaIntersecao = 6;
			var colunaIntersecao = 6;
			var linhaRua = 7;
			var linhaColuna = 6;
		}
	} else {
		if (ini == 1 && fim == 2) {
			var linhaIntersecao = 6;
			var colunaIntersecao = 0;
			var linhaRua = 7;
			var linhaColuna = 0;
		} else if (ini == 1 && fim == 3) {
			var linhaIntersecao = 3;
			var colunaIntersecao = 2;
			var linhaRua = 2;
			var linhaColuna = 2;
		} else if (ini == 1 && fim == 4) {
			var linhaIntersecao = 3;
			var colunaIntersecao = 2;
			var linhaRua = 4;
			var linhaColuna = 2;
		} else if (ini == 1 && fim == 5) {
			var linhaIntersecao = 3;
			var colunaIntersecao = 5;
			var linhaRua = 4;
			var linhaColuna = 5;
		} else if (ini == 1 && fim == 6) {
			var linhaIntersecao = 3;
			var colunaIntersecao = 9;
			var linhaRua = 4;
			var linhaColuna = 9;
		} else if (ini == 1 && fim == 9) {
			var linhaIntersecao = 3;
			var colunaIntersecao = 8;
			var linhaRua = 2;
			var linhaColuna = 8;
		} else if (ini == 1 && fim == 10) {
			var linhaIntersecao = 3;
			var colunaIntersecao = 11;
			var linhaRua = 2;
			var linhaColuna = 11;
		} else if (ini == 2 && fim == 1) {
			var linhaIntersecao = 7;
			var colunaIntersecao = 0;
			var linhaRua = 6;
			var linhaColuna = 0;
		} else if (ini == 2 && fim == 4) {
			var linhaIntersecao = 7;
			var colunaIntersecao = 2;
			var linhaRua = 6;
			var linhaColuna = 2;
		} else if (ini == 2 && fim == 5) {
			var linhaIntersecao = 7;
			var colunaIntersecao = 5;
			var linhaRua = 6;
			var linhaColuna = 5;
		} else if (ini == 2 && fim == 6) {
			var linhaIntersecao = 7;
			var colunaIntersecao = 9;
			var linhaRua = 6;
			var linhaColuna = 9;
		} else if (ini == 2 && fim == 7) {
			var linhaIntersecao = 7;
			var colunaIntersecao = 9;
			var linhaRua = 7;
			var linhaColuna = 10;
		} else if (ini == 3 && fim == 1) {
			var linhaIntersecao = 2;
			var colunaIntersecao = 2;
			var linhaRua = 3;
			var linhaColuna = 2;
		} else if (ini == 4 && fim == 1) {
			var linhaIntersecao = 4;
			var colunaIntersecao = 2;
			var linhaRua = 3;
			var linhaColuna = 2;
		} else if (ini == 4 && fim == 2) {
			var linhaIntersecao = 6;
			var colunaIntersecao = 2;
			var linhaRua = 7;
			var linhaColuna = 2;
		} else if (ini == 5 && fim == 1) {
			var linhaIntersecao = 2;
			var colunaIntersecao = 5;
			var linhaRua = 3;
			var linhaColuna = 5;
		} else if (ini == 5 && fim == 2) {
			var linhaIntersecao = 6;
			var colunaIntersecao = 5;
			var linhaRua = 7;
			var linhaColuna = 5;
		} else if (ini == 5 && fim == 8) {
			var linhaIntersecao = 0;
			var colunaIntersecao = 5;
			var linhaRua = 0;
			var linhaColuna = 6;
		} else if (ini == 5 && fim == 9) {
			var linhaIntersecao = 0;
			var colunaIntersecao = 8;
			var linhaRua = 1;
			var linhaColuna = 8;
		} else if (ini == 5 && fim == 10) {
			var linhaIntersecao = 0;
			var colunaIntersecao = 11;
			var linhaRua = 1;
			var linhaColuna = 11;
		} else if (ini == 6 && fim == 1) {
			var linhaIntersecao = 4;
			var colunaIntersecao = 9;
			var linhaRua = 3;
			var linhaColuna = 9;
		} else if (ini == 6 && fim == 2) {
			var linhaIntersecao = 6;
			var colunaIntersecao = 9;
			var linhaRua = 7;
			var linhaColuna = 9;
		} else if (ini == 7 && fim == 2) {
			var linhaIntersecao = 8;
			var colunaIntersecao = 9;
			var linhaRua = 7;
			var linhaColuna = 9;
		} else if (ini == 8 && fim == 5) {
			var linhaIntersecao = 0;
			var colunaIntersecao = 6;
			var linhaRua = 0;
			var linhaColuna = 5;
		} else if (ini == 8 && fim == 9) {
			var linhaIntersecao = 0;
			var colunaIntersecao = 8;
			var linhaRua = 2;
			var linhaColuna = 8;
		} else if (ini == 8 && fim == 10) {
			var linhaIntersecao = 0;
			var colunaIntersecao = 11;
			var linhaRua = 1;
			var linhaColuna = 11;
		} else if (ini == 9 && fim == 1) {
			var linhaIntersecao = 2;
			var colunaIntersecao = 8;
			var linhaRua = 3;
			var linhaColuna = 8;
		} else if (ini == 9 && fim == 8) {
			var linhaIntersecao = 1;
			var colunaIntersecao = 8;
			var linhaRua = 0;
			var linhaColuna = 8;
		} else if (ini == 10 && fim == 1) {
			var linhaIntersecao = 2;
			var colunaIntersecao = 11;
			var linhaRua = 3;
			var linhaColuna = 11;
		} else if (ini == 10 && fim == 8) {
			var linhaIntersecao = 1;
			var colunaIntersecao = 11;
			var linhaRua = 0;
			var linhaColuna = 11;
		}
	}

	linhaAtual = ultimaLinha;
	colunaAtual = ultimaColuna;
	
	console.info("INI " + ini + " FIM" + fim);
	console.log("LINHA ATU " + linhaAtual + "  COL ATU  " + colunaAtual);	
	console.log("LINHA IN " + linhaIntersecao + "  COL IN  " + colunaIntersecao);	
	if (linhaAtual < linhaIntersecao) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaLinha = ultimaLinha + 1;
			if (ultimaLinha >= 0 &&  ultimaLinha < 20) {
				if (ruas[ultimaLinha][ultimaColuna] == ini) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaLinha = ultimaLinha - 1;
			}
		}
	} else if (linhaAtual > linhaIntersecao) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaLinha = ultimaLinha - 1;
			if (ultimaLinha >= 0) {
				if (ruas[ultimaLinha][ultimaColuna] == ini) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
						break;
					}
				}			
			} else {

			}
			if (!continua) {
				ultimaLinha = ultimaLinha + 1;
			}
		}
	}

	if (colunaAtual < colunaIntersecao) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaColuna = ultimaColuna + 1;
			if (ultimaColuna >=0 && ultimaColuna < 20) {
				if (ruas[ultimaLinha][ultimaColuna] == ini) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaColuna = ultimaColuna - 1;
			}
		}
	} else if (colunaAtual > colunaIntersecao) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaColuna = ultimaColuna - 1;
			if (ultimaColuna >= 0) {
				if (ruas[ultimaLinha][ultimaColuna] == ini) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaColuna = ultimaColuna + 1;
			}
		}
	}
	console.log("CAMINHO ATUUUU");
	console.dir(caminho);
	console.info("ULT LINHA " + ultimaLinha + "   LINHA I " + linhaIntersecao);
	console.info("ULT col " + ultimaColuna + "   Coluna I " + colunaIntersecao);
	if (ultimaLinha < linhaIntersecao) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaLinha = ultimaLinha + 1;
			if (ultimaLinha >= 0 && ultimaLinha < 20) {
				if (ruas[ultimaLinha][ultimaColuna] == ini) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaLinha = ultimaLinha - 1;
			}
		}
	} else if (ultimaLinha > linhaIntersecao) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaLinha = ultimaLinha - 1;
			if (ultimaLinha >= 0) {
				if (ruas[ultimaLinha][ultimaColuna] == ini) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaLinha = ultimaLinha + 1;
			}
		}
	}

	if (ultimaColuna < colunaIntersecao) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaColuna = ultimaColuna + 1;
			if (ultimaColuna >= 0 && ultimaColuna < 20) {
				if (ruas[ultimaLinha][ultimaColuna] == ini) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaColuna = ultimaColuna - 1;
			}
		}
	} else if (ultimaColuna > colunaIntersecao) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaColuna = ultimaColuna - 1;
			if (ultimaColuna >= 0) {
				if (ruas[ultimaLinha][ultimaColuna] == ini) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaIntersecao && ultimaColuna == colunaIntersecao) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaColuna = ultimaColuna + 1;
			}
		}
	}

	$(".rua_" + fim).addClass("highlight");
	caminho.push(linhaRua + "_" + linhaColuna);
	console.dir(caminho);
	camihoRoboTeste = caminho;
	vaiRobo(0, nroRobo, tipoRobo);
}

function vaiRobo(keyRoboTeste, nroRobo, tipoRobo, podeRemoverPessoa) {
	if (!podeRemoverPessoa) {
		podeRemoverPessoa = "N";
	}
	var exec = false;
	$.each(camihoRoboTeste, function(key, value) {
		if(keyRoboTeste == key) {
			exec = true;
			if (tipoRobo == "F") {
				removerRoboForca(nroRobo);
				$("#td_espaco_" + value).html($("#td_espaco_" + value).html() + getHtmlRoboForca());
			} else {
				removerRoboResgate(nroRobo);
				$("#td_espaco_" + value).html($("#td_espaco_" + value).html() + getHtmlRoboResgate());
			}
			$("#td_espaco_" + value).addClass("robo_" + nroRobo);
			setTimeout(function(){ vaiRobo((keyRoboTeste + 1), nroRobo, tipoRobo, podeRemoverPessoa)}, 300);
		}
	});

	if (!exec) {
		console.log(podeRemoverPessoa + " -a-a "  + pessoaRemover);
		if (podeRemoverPessoa == "S") {
			setTimeout(removerPessoa(pessoaRemover),500);
			
		}
		setTimeout(function(){ solucao((ultimoKey + 1)); },2000);
	}
}

function moverRoboParaRemoverPessoa(nroRobo, nroPessoa, nroRua, indice) {
	nroRua = parseInt(nroRua);
	var posicaoAtual = $(".robo_" + nroRobo).attr("id");
	posicaoAtual = posicaoAtual.replace("td_espaco_", "");

	var posicaoAtual = posicaoAtual.split("_");
	var linhaAtualRobo = parseInt(posicaoAtual[0]);
	var colunaAtualRobo = parseInt(posicaoAtual[1]);

	posicaoAtual = $(".pessoa_" + nroPessoa).attr("id");
	posicaoAtual = posicaoAtual.replace("td_espaco_", "");

	posicaoAtual = posicaoAtual.split("_");
	var linhaAtualPessoa = parseInt(posicaoAtual[0]);
	var colunaAtualPessoa = parseInt(posicaoAtual[1]);

	console.info(linhaAtualRobo + " -- " + colunaAtualRobo);
	console.info(linhaAtualPessoa + " -- " + colunaAtualPessoa);
	console.info(nroRua);

	var ultimaLinha = linhaAtualRobo;
	var ultimaColuna = colunaAtualRobo;

	var caminho = [];
	
	if (linhaAtualRobo < linhaAtualPessoa) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaLinha = ultimaLinha + 1;
			if (ultimaLinha >= 0 && ultimaLinha < 20) {
				if (ruas[ultimaLinha][ultimaColuna] == nroRua) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaAtualPessoa && ultimaColuna == colunaAtualPessoa) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaLinha = ultimaLinha - 1;
			}
		}
	} else if (linhaAtualRobo > linhaAtualPessoa) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaLinha = ultimaLinha - 1;
			if (ultimaLinha >= 0) {
				if (ruas[ultimaLinha][ultimaColuna] == nroRua) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaAtualPessoa && ultimaColuna == colunaAtualPessoa) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaLinha = ultimaLinha + 1;
			}
		}
	}

	if (colunaAtualRobo < colunaAtualPessoa) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaColuna = ultimaColuna + 1;
			console.log(ultimaColuna);
			if (ultimaColuna >= 0 && ultimaColuna < 20) {
				if (ruas[ultimaLinha][ultimaColuna] == nroRua) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaAtualPessoa && ultimaColuna == colunaAtualPessoa) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaColuna = ultimaColuna - 1;
			}
		}
	} else if (colunaAtualRobo > colunaAtualPessoa) {
		var continua = true;
		while (continua) {
			continua = false;
			console.log(ultimaColuna);
			ultimaColuna = ultimaColuna - 1;
			if (ultimaColuna >= 0) {
				if (ruas[ultimaLinha][ultimaColuna] == nroRua) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaAtualPessoa && ultimaColuna == colunaAtualPessoa) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaColuna = ultimaColuna + 1;
			}
		}
	}

	if (ultimaLinha < linhaAtualPessoa) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaLinha = ultimaLinha + 1;
			if (ultimaLinha >= 0 && ultimaLinha < 20) {
				if (ruas[ultimaLinha][ultimaColuna] == nroRua) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaAtualPessoa && ultimaColuna == colunaAtualPessoa) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaLinha = ultimaLinha - 1;
			}
		}
	} else if (ultimaLinha > linhaAtualPessoa) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaLinha = ultimaLinha - 1;
			if (ultimaLinha >= 0) {
				if (ruas[ultimaLinha][ultimaColuna] == nroRua) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaAtualPessoa && ultimaColuna == colunaAtualPessoa) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaLinha = ultimaLinha + 1;
			}
		}
	}

	if (ultimaColuna < colunaAtualPessoa) {
		var continua = true;
		while (continua) {
			continua = false;
			ultimaColuna = ultimaColuna + 1;
			console.log(ultimaColuna);
			if (ultimaColuna >= 0 && ultimaColuna < 20) {
				if (ruas[ultimaLinha][ultimaColuna] == nroRua) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaAtualPessoa && ultimaColuna == colunaAtualPessoa) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaColuna = ultimaColuna - 1;
			}
		}
	} else if (ultimaColuna > colunaAtualPessoa) {
		var continua = true;
		while (continua) {
			continua = false;
			console.log(ultimaColuna);
			ultimaColuna = ultimaColuna - 1;
			if (ultimaColuna >= 0) {
				if (ruas[ultimaLinha][ultimaColuna] == nroRua) {
					caminho.push(ultimaLinha + "_" + ultimaColuna);
					continua = true;
					if (ultimaLinha == linhaAtualPessoa && ultimaColuna == colunaAtualPessoa) {
						break;
					}
				}			
			}
			if (!continua) {
				ultimaColuna = ultimaColuna + 1;
			}
		}
	}

	caminho.push(linhaAtualPessoa + "_" + colunaAtualPessoa);
	$(".rua_" + nroRua).addClass("highlight");
	
	pessoaRemover = nroPessoa;
	//caminho.push(linhaRua + "_" + linhaColuna);
	console.dir(caminho);
	camihoRoboTeste = caminho;
	vaiRobo(0, nroRobo, "R", "S");
}