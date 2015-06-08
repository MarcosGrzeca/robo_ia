var vetor = [];
var nroLinhas = 7;
var nroColunas = 9;
var numeroRuas = 10;
var ruas = [];
var texto;

function inicializarVetor() {
	var i, j;
	for (i = 0; i < nroLinhas; i++) {
		vetor[i] = [];
		for (j = 0; j < nroColunas; j++) {
			vetor[i][j] = "R";
		}	
	}

	for (i = 0; i < numeroRuas; i++) {
		ruas[i] = [];
		for (j = 0; j < numeroRuas; j++) {
			ruas[i][j] = 0;
		}
	}

	//Declarção ruas

	ruas[6][0] = 1;
	ruas[6][1] = 1;
	ruas[6][2] = 1;
	ruas[6][3] = 1;
	ruas[6][4] = 1;
	ruas[6][5] = 1;
	ruas[6][6] = 1;
	ruas[6][7] = 1;
	ruas[6][8] = 1;

	ruas[1][2] = 2;
	ruas[2][2] = 2;
	ruas[3][2] = 2;
	ruas[4][2] = 2;
	ruas[5][2] = 2;

	ruas[0][3] = 3;	
	ruas[1][3] = 3;
	ruas[2][3] = 3;
	ruas[3][3] = 3;
	ruas[4][3] = 3;
	ruas[5][3] = 3;

	ruas[0][5] = 4;	
	ruas[1][5] = 4;
	ruas[2][5] = 4;
	ruas[3][5] = 4;
	ruas[4][5] = 4;
	ruas[5][5] = 4;
	ruas[6][5] = 4;

	ruas[0][7] = 5;	
	ruas[1][7] = 5;
	ruas[2][7] = 5;
	ruas[3][7] = 5;
	ruas[4][7] = 5;
	ruas[5][7] = 5;
	ruas[6][7] = 5;

	ruas[4][6] = 6;
	ruas[4][8] = 6;

	ruas[6][1] = 7;
	ruas[6][2] = 7;
	ruas[6][3] = 7;
	ruas[6][4] = 7;
	ruas[6][5] = 7;
	ruas[6][6] = 7;
	ruas[6][7] = 7;
	ruas[6][8] = 7;

	ruas[0][0] = 8;
	ruas[0][1] = 8;

	ruas[3][3] = 9;
	ruas[3][3] = 9;

	



	vetor[0][2] = "C";
	vetor[0][3] = "AL"; 
	vetor[0][4] = "C"; 
	vetor[0][6] = "C"; 
	vetor[0][8] = "C"; 

	vetor[1][0] = "AB";
	vetor[1][1] = "E";
	vetor[1][2] = "E";
	
	vetor[1][3] = "AL";
	vetor[1][7] = "AL";
	vetor[1][8] = "AL";
	



	vetor[2][0] = "AB";
	vetor[2][1] = "AL";

	vetor[2][2] = "C";

	vetor[2][4] = "H";
	vetor[2][6] = "C";
	vetor[2][8] = "C";
		

	vetor[3][0] = "AB";
	vetor[3][4] = "H";
	vetor[3][6] = "C";
	vetor[3][8] = "C";

	vetor[4][0] = "AB";
	vetor[4][2] = "C";
	vetor[4][4] = "H";
	
	
	vetor[5][0] = "AB";
	vetor[5][2] = "C";
	vetor[5][4] = "H";
	vetor[5][6] = "C";
	vetor[5][8] = "I";

	vetor[6][2] = "AL";
	vetor[6][3] = "AL";
	vetor[6][4] = "AL";
	vetor[6][5] = "AL";
	vetor[6][6] = "AL";
	vetor[6][7] = "AL";

	vetor[6][8] = "C";

	
	
	/*vetor[0][2] = "C"; 
	vetor[0][3] = "C"; 
	vetor[0][4] = "C"; 
	vetor[0][5] = "C"; 
	vetor[0][8] = "C"; 
	
	vetor[1][0] = "C"; 
	vetor[3][0] = "C"; 
	vetor[5][0] = "C"; 


	vetor[5][5] = "I";
	vetor[5][7] = "AB"; 

	vetor[4][8] = "AL"; 
	vetor[5][8] = "AL"; 
*/

	/*vetor[7][0] = "C"; 
	vetor[8][0] = "C"; 
	

	vetor[8][8] = "H"; */
}

function iniciarPlanejamento() {
	conectar();
}

function conexaoBemSucedida() {

	$("#telaInicial").hide();
	console.log("AQUIII");
	$("#jogo").show();
//	ws.send("ESTABELECIDA");
}

function erroConexao(erro) {
	alert(erro);
}

function MontarTabuleiro(){	
	var i;
	for (i=0; i<nroLinhas; i++){
		$("#tabuleiro").append("<tr id='espaco_" + i + "'></tr>");
		for (j=0; j<nroColunas; j++){
		var tmp = i + " = " + j;
			var t = "td_espaco_" + i + "_" + j;
			var img = "imagens/casas/1433722577_kfm_home2a.jpg";
			$("#espaco_" + i).append("<td id='" + t+ "' class='espaco' onclick='adicionarPeca(\"" + i + "\", \"" + j + "\")' ><center class='center'></center></td>");
			/*if (i % 2 == 0 && j % 2 == 0) {
				$("#" + t).addClass("casa");
				
				vetor[i][j] = "C";
			} else {

			}*/
		}
	}

	for (i=0; i<nroLinhas; i++){
		for (j=0; j<nroColunas; j++){
			var t = "td_espaco_" + i + "_" + j;
			if (vetor[i][j] == "C") {
				$("#" + t).addClass("casa");
			} else 	if (vetor[i][j] == "H") {
				$("#" + t).addClass("hospital");
			} else 	if (vetor[i][j] == "AB") {
				$("#" + t).addClass("abrigo");
			} else 	if (vetor[i][j] == "I") {
				$("#" + t).addClass("iml");
			} else 	if (vetor[i][j] == "AL") {
				$("#" + t).addClass("alagamento");
			} else 	if (vetor[i][j] == "E") {
				$("#" + t).addClass("escombro");
			}
		}
	}

	console.log(ruas);

	$("#td_espaco_6_2").html("<img src='imagens/hospital/1433728142_0102-tombstone-rip-hallowee_64.png'/>")

	var i, j, k;
	for (i = 1; i <= numeroRuas; i++) {

	}

	console.log(vetor);
	console.log(vetor[0]);
}

function montarProlog() {
	//vetor

	texto = "";

	for (i=0; i<nroLinhas; i++){
		for (j=0; j<nroColunas; j++){
			if (vetor[i][j] == "E") {
				adicionarTexto("given(tsunami,local(escombro, rua" + ruas[i][j] + ")).");
			}

		}
	}

	for (i=0; i<nroLinhas; i++){
		for (j=0; j<nroColunas; j++){
			if (vetor[i][j] == "AL") {
				adicionarTexto("given(tsunami,local(alagamento, rua" + ruas[i][j] + ")).");
			}

		}
	}

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

	var nroPessoas = 1; 
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
	console.log(texto);

}

function adicionarTexto(txt) {
 	var n = texto.indexOf(txt);
 	console.log(n);
 	if (n == -1) {
		texto += txt + "\n";
	}
}