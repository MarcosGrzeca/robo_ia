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


function inicializarVetor() {
	var i, j;
	robos[0] = {};
	pessoas[0] = {};
	
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

	ruas[1][1] = 2;
	ruas[2][1] = 2;
	ruas[3][1] = 2;
	ruas[4][1] = 2;
	ruas[5][1] = 2;

	ruas[0][3] = 3;	
	ruas[1][3] = 3;
	ruas[2][3] = 3;
	ruas[3][3] = 3;
	ruas[4][3] = 3;
	ruas[5][3] = 3;

	ruas[0][5] = 4;	
	ruas[1][5] = 4;
//	ruas[2][5] = 4;
//	ruas[3][5] = 4;
//	ruas[4][5] = 4;
	//ruas[5][5] = 4;
	//ruas[6][5] = 4;

	ruas[0][7] = 5;	
	ruas[1][7] = 5;
	ruas[2][7] = 5;
	ruas[3][7] = 5;
	ruas[4][7] = 5;
	ruas[5][7] = 5;
	//ruas[6][7] = 5;

	ruas[4][6] = 6;
	ruas[4][8] = 6;

	ruas[1][1] = 7;
	ruas[1][2] = 7;
	ruas[1][3] = 7;
	ruas[1][4] = 7;
	ruas[1][5] = 7;
	ruas[1][6] = 7;
	ruas[1][7] = 7;
	ruas[1][8] = 7;

	ruas[0][0] = 8;
	ruas[0][1] = 8;

	ruas[3][2] = 9;
	ruas[3][3] = 9;

	adicionarRobo("R", 0, 1);
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
	vetor[6][8] = "I2";
}

function adicionarPessoa(tipo, Y, X) {
	var pessoa = {"tipo" : tipo, "Y" : Y, "X" : X};
	pessoas.push(pessoa);
}

function adicionarRobo(tipo, Y, X) {
	var robo = {"tipo" : tipo, "Y" : Y, "X" : X};
	robos.push(robo);
}

function iniciarPlanejamento() {
	conectar();
}

function conexaoBemSucedida() {

	$("#telaInicial").hide();
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
				$("#" + t).addClass("casa grama");

				var img = 'imagens/casas/1433722577_kfm_home2a.jpg';


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
				



				$("#" + t).html("<img src='" + img + "'>");
			} else 	if (vetor[i][j] == "G") {
				$("#" + t).addClass("grama");
			} else 	if (vetor[i][j] == "H") {
				$("#" + t).addClass("grama hospital");
				$("#" + t).html("<img src='imagens/hospital3.png' style='position: absolute ! important;'>");
			} else 	if (vetor[i][j] == "AB") {
				$("#" + t).addClass("abrigo");
				$("#" + t).html("<img src='imagens/abrigo.png' style='position: absolute ! important;'>");
			} else 	if (vetor[i][j] == "I1") {
				$("#" + t).addClass("iml_inicio");
				$("#" + t).html("<img src='imagens/diogo2/iml/i1.png' />");
			} else 	if (vetor[i][j] == "I2") {
				$("#" + t).addClass("iml_fim");
				$("#" + t).html("<img src='imagens/diogo2/iml/i2.png' />");
			} else 	if (vetor[i][j] == "AL") {
				$("#" + t).addClass("alagamento");
			} else 	if (vetor[i][j] == "E") {
				$("#" + t).addClass("escombro");
			}
		}
	}

	$.each(robos, function(key, value) {
		if (key > 0) {
			var t = "td_espaco_" + value.Y + "_" + value.X;
			if (value.tipo == "R") {
				$("#" + t).html("<img class='img_robo' src='imagens/robos/e-ric-icon.png'/>");
			}
			if (value.tipo == "F") {
				$("#" + t).html("<img class='img_robo' src='imagens/robos/robo_bala.png'/>");
			}
			$("#" + t).addClass("robo_" + key);
		}
	});

	$.each(pessoas, function(key, value) {
		if (key > 0) {
			var t = "td_espaco_" + value.Y + "_" + value.X;
			$("#" + t).addClass("pessoa_" + key);
			if (value.tipo == "S") {
				$("#" + t).html("<img class='img_pessoa' src='imagens/pessoas/accept-female-user-icon.png'/>");
			}
			if (value.tipo == "F") {
				$("#" + t).html("<img class='img_pessoa' src='imagens/pessoas/female-user-search-icon.png'/>");
			}
			if (value.tipo == "M") {
				$("#" + t).html("<img class='img_pessoa' src='imagens/pessoas/remove-female-user-icon.png'/>");
			}
		}
	});

//
	
	
	var i, j, k;
	for (i = 1; i <= numeroRuas; i++) {

	}

}

function montarProlog() {
	//vetor


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
	texto += "imposs(local( X, Y )  &  local( X, Z )  &  notequal( Y, Z )  ).\n";
	texto += "imposs(rua_limpa(X)  &  local(escombro, X)).\n";
	texto += "imposs(rua_limpa(X)  &  local(alagamento, X)).\n";
	texto += "imposs(local(Vit,Local) & local(Vit, Local2) & notequal(Local==Local2)).\n";
	texto += "imposs(local(Robo, Local) & local(Robo, Local2) & notequal(Local==Local2)).\n";


	texto += "can(remover_escombro_alamento(Robo, RU), local(Robo, RU) & robo_forca_bruta(Robo) & rua(RU) & local(escombro, RU) & local(alagamento, RU) ).\n";
	texto += "can(remover_escombro(Robo, RU), local(Robo, RU) & robo_forca_bruta(Robo) & rua(RU)& local(escombro, RU)).\n";
	texto += "can(remover_alagamento(Robo, RU), local(Robo, RU) & robo_forca_bruta(Robo) & rua(RU) & local(alagamento, RU)).\n";
	texto += "can(salvar_vitima_morta(VIT, RO, RU), local(VIT, RU) & local(RO, RU) & robo_resgate_vida(RO) & rua(RU) & rua_limpa(RU) & vitima_morta(VIT)).\n";
	texto += "can(salvar_vitima_ferida(VIT, RO, RU), local(VIT, RU) & local(RO, RU) & robo_resgate_vida(RO) & rua(RU) & rua_limpa(RU) & vitima_ferida(VIT)).\n";
	texto += "can(salvar_vitima_saudavel(VIT, RO, RU), local(VIT, RU) & local(RO, RU) & robo_resgate_vida(RO) & rua(RU) & rua_limpa(RU) & vitima_saudavel(VIT)).\n";
	texto += "can(mover_robo_resgate(RO, _), robo_resgate_vida(RO)).\n";
	texto += "can(mover_robo_forca(RO, _), robo_forca_bruta(RO)).\n";



	texto += "add(rua_limpa(RU), remover_escombro_alamento(_, RU)).\n";
	texto += "add(rua_limpa(RU), remover_escombro(_, RU)).\n";
	texto += "add(rua_limpa(RU), remover_alagamento(_, RU)).\n";
	texto += "add(vitima_iml(VIT), salvar_vitima_morta(VIT, _, _)).\n";
	texto += "add(sem_vitimas(RU), salvar_vitima_morta(_, _, RU)).\n";
	texto += "add(vitima_hospital(VIT), salvar_vitima_ferida(VIT, _, _)).\n";
	texto += "add(sem_vitimas(RU), salvar_vitima_ferida(_, _, RU)).\n";
	texto += "add(vitima_abrigo(VIT), salvar_vitima_saudavel(VIT, _, _)).\n";
	texto += "add(sem_vitimas(RU), salvar_vitima_saudavel(_, _, RU)).\n";
	texto += "add(local(RO, Rua), mover_robo_resgate(RO, Rua)).\n";
	texto += "add(local(RO, Rua), mover_robo_forca(RO, Rua)).\n";


	texto += "del(local(alagamento, RU), remover_escombro_alamento(_, RU)).\n";
	texto += "del(local(escombro, RU), remover_escombro_alamento(_, RU)).\n";
	texto += "del(local(escombro, RU), remover_escombro(_, RU)).\n";
	texto += "del(local(alagamento, RU), remover_alagamento(_, RU)).\n";
	texto += "del(local(VIT, RU),  salvar_vitima_morta(VIT, _, RU)).\n";
	texto += "del(vitima_morta(VIT), salvar_vitima_morta(VIT, _, _)).\n";
	texto += "del(local(VIT, RU),  salvar_vitima_ferida(VIT, _, RU)).\n";
	texto += "del(vitima_ferida(VIT), salvar_vitima_ferida(VIT, _, _)).\n";
	texto += "del(local(VIT, RU),  salvar_vitima_saudavel(VIT, _, RU)).\n";
	texto += "del(vitima_saudavel(VIT), salvar_vitima_saudavel(VIT, _, _)).\n";
	texto += "del(local(RO,_), mover_robo_forca(RO,_)).\n";
	texto += "del(local(RO,_), mover_robo_resgate(RO,_)).\n";


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
	console.log(texto);

}

function adicionarTexto(txt, rua) {
 	var n = texto.indexOf(txt);
 	if (n == -1) {
 		texto += txt + "\n";
	}
}

function comunicarComServidor() {
	$.ajax({
		method: "POST",
  		data: { script: texto},
	  	url: "servidor.php"
	}).done(function( data ) {
		solucaoProlog = data.split('\\n'); 
		posInicial = 0;
  		console.log("RETRONO");
  		//console.log(data);

		$.each(solucaoProlog, function(key, value){
			if ($.trim(value) != "" && value != "tsunami;" && value != '"') {
				$("#tabelaAcoes").append("<tr id='res_tr_" + key + "'><td>" + value + "<input type='hidden' id='input_" + key + "' /> </td></tr>");
			}
		});
	

  		solucao(0);
    }).fail(function() {
    	alert( "error" );
  	});
}

function solucao(indice) {
	$.each(solucaoProlog, function(key, value){
		if (key != indice) {
			return null;
		}
		if ($.trim(value) != "" && value != "tsunami;" && value != '"') {
			$(".active").removeClass("active");
			$("#res_tr_" + key).addClass("active");
			//$("#input_" + key).focus();
			console.info(value);		
			if (value.indexOf("remover_escombro_alamento(") != -1) {
				var str = value.replace("remover_escombro_alamento(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");
				var nroRua = parametros[1].replace("rua", "");
				for (i = 0; i < numeroRuas; i++) {
					for (j = 0; j < numeroRuas; j++) {
						if (ruas[i][j] == nroRua) {
							var t = "td_espaco_" + i + "_" + j;
							$("#" + t).removeClass("alagamento");
							$("#" + t).removeClass("escombro");
						}
					}
				}
			} else if (value.indexOf("remover_escombro(") != -1) {
				var str = value.replace("remover_escombro(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");
				var nroRua = parametros[1].replace("rua", "");
				for (i = 0; i < numeroRuas; i++) {
					for (j = 0; j < numeroRuas; j++) {
						if (ruas[i][j] == nroRua) {
							var t = "td_espaco_" + i + "_" + j;
							$("#" + t).removeClass("escombro");
						}
					}
				}
			} else if (value.indexOf("remover_alagamento(") != -1) {
				var str = value.replace("remover_alagamento(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");
				var nroRua = parametros[1].replace("rua", "");
				for (i = 0; i < numeroRuas; i++) {
					for (j = 0; j < numeroRuas; j++) {
						if (ruas[i][j] == nroRua) {
							var t = "td_espaco_" + i + "_" + j;
							$("#" + t).removeClass("alagamento");
						}
					}
				}
			} else if (value.indexOf("mover_robo_forca(") != -1) {
				var str = value.replace("mover_robo_forca(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");
				var nroRobo = parametros[0].replace("robo", "");
				var nroRua = parametros[1].replace("rua", "");

				$(".robo_" + nroRobo + " > .img_robo").hide();
				$(".robo_" + nroRobo).removeClass("robo_" + nroRobo);

				var primeiro = true;
				for (i = 0; i < numeroRuas; i++) {
					for (j = 0; j < numeroRuas; j++) {
						if (ruas[i][j] == nroRua) {
							var t = "td_espaco_" + i + "_" + j;
							if (primeiro) {
								$("#" + t).html($("#" + t).html() + "<img class='img_robo' src='imagens/robos/robo_bala.png'/>");
								$("#" + t).addClass("robo_" + nroRobo);
								primeiro = false;
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

				$(".robo_" + nroRobo + " > .img_robo").hide();
				$(".robo_" + nroRobo).removeClass("robo_" + nroRobo);

				var primeiro = true;
				for (i = 0; i < numeroRuas; i++) {
					for (j = 0; j < numeroRuas; j++) {
						if (ruas[i][j] == nroRua) {
							var t = "td_espaco_" + i + "_" + j;
							if (primeiro) {
								$("#" + t).html($("#" + t).html() + "<img class='img_robo' src='imagens/robos/e-ric-icon.png'/>");
								$("#" + t).addClass("robo_" + nroRobo);
								primeiro = false;
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

				$(".pessoa_" + nroPessoa + " > .img_pessoa").hide();
				$(".pessoa_" + nroPessoa).removeClass("pessoa_" + nroPessoa);
			} else if (value.indexOf("salvar_vitima_morta(") != -1) {
				var str = value.replace("salvar_vitima_morta(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");
				var nroPessoa = parametros[0].replace("pessoa", "");
				var nroRobo = parametros[1].replace("robo", "");
				var nroRua = parametros[2].replace("rua", "");

				$(".pessoa_" + nroPessoa + " > .img_pessoa").hide();
				$(".pessoa_" + nroPessoa).removeClass("pessoa_" + nroPessoa);
			} else if (value.indexOf("salvar_vitima_ferida(") != -1) {
				var str = value.replace("salvar_vitima_ferida(", "");
				str = str.replace(");", "");
				str = str.replace(").", "");
				var parametros = str.split(",");
				var nroPessoa = parametros[0].replace("pessoa", "");
				var nroRobo = parametros[1].replace("robo", "");
				var nroRua = parametros[2].replace("rua", "");

				$(".pessoa_" + nroPessoa + " > .img_pessoa").hide();
				$(".pessoa_" + nroPessoa).removeClass("pessoa_" + nroPessoa);
			}
		}
	});
	indice += 1;
	setTimeout(function(){ solucao(indice); },2000);

	/*$.each(ruas, function(key, value) {
		$.each(value, function(key2, value2) {
				console.log(ruas[key][value2]);

		});
	});*/
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}