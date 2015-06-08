var ws;
var msgErro = "";
var conexaoAberta = false;

var texto = "% Autor:% Data: 23/05/2015% ESTADOS INICIAIS% local(OQUE,ONDE)given(tsunami,local(escombro, rua1)).given(tsunami,local(alagamento, rua1)).given(tsunami,local(escombro, rua2)).given(tsunami,local(alagamento, rua2)).given(tsunami,local(escombro, rua3)).given(tsunami,local(alagamento, rua3)).given(tsunami,local(escombro, rua4)).given(tsunami,local(escombro, rua5)).given(tsunami,local(alagamento, rua5)).given(tsunami,local(escombro, rua6)).given(tsunami,local(escombro, rua7)).given(tsunami,local(alagamento, rua7)).given(tsunami,local(alagamento, rua9)).given(tsunami,local(hospital, rua3)).given(tsunami,local(abrigo, rua2)).given(tsunami,local(iml, rua5)).% estadoVitima(QUEM)given(tsunami,local(pessoa1,rua7)).given(tsunami,vitima_saudavel(pessoa1)).given(tsunami,local(pessoa2,rua7)).given(tsunami,vitima_morta(pessoa2)).given(tsunami,local(pessoa3,rua3)).given(tsunami,vitima_ferida(pessoa3)).given(tsunami,local(pessoa4,rua1)).given(tsunami,vitima_saudavel(pessoa4)).given(tsunami,local(pessoa5,rua1)).given(tsunami,vitima_morta(pessoa5)).given(tsunami,local(pessoa6,rua6)).given(tsunami,vitima_ferida(pessoa6)).%given(tsunami, rua_limpa(rua9)).given(tsunami, rua_limpa(rua8)).given(tsunami, sem_vitimas(rua2)).given(tsunami, sem_vitimas(rua4)).given(tsunami, sem_vitimas(rua5)).given(tsunami, sem_vitimas(rua8)).given(tsunami, sem_vitimas(rua9)).given(tsunami,local(robo1,rua8)).given(tsunami,local(robo2,rua2)).given(tsunami,local(robo3,rua4)).given(tsunami,local(robo4,rua1)).% VERDADESalways(rua(rua1)).always(rua(rua2)).always(rua(rua3)).always(rua(rua4)).always(rua(rua5)).always(rua(rua6)).always(rua(rua7)).always(rua(rua8)).always(rua(rua9)).always(robo_forca_bruta(robo2)).always(robo_forca_bruta(robo4)).always(robo_resgate_vida(robo1)).always(robo_resgate_vida(robo3)).always(edificio(hospital)).always(edificio(abrigo)).always(edificio(iml)).%Conexões das ruasalways(connects(rua1, rua2)).always(connects(rua1, rua3)).always(connects(rua1, rua4)).always(connects(rua1, rua5)).always(connects(rua2, rua7)).always(connects(rua2, rua8)).always(connects(rua2, rua9)).always(connects(rua3, rua7)).always(connects(rua3, rua9)).always(connects(rua4, rua6)).always(connects(rua4, rua7)).always(connects(rua5, rua6)).always(connects(rua5, rua7)).always(connects(rua7, rua8)).%Forma da professora%always(connects(R1, R2))    :-    connects1(R1, R2).%always(connects(R2, R1))    :-    connects1(R1, R2).%always(connects(R1, R4))    :-    connects1(R1, R4).%always(connects(R4, R1))    :-    connects1(R1, R4).%connects1(local(N), local(5)  )    :-    range(  N, 1, 4  ).%Determinar impossimposs(local( X, Y )  &  local( X, Z )  &  notequal( Y, Z )  ).imposs(rua_limpa(X)  &  local(escombro, X)).imposs(rua_limpa(X)  &  local(alagamento, X)).imposs(local(Vit,Local) & local(Vit, Local2) & notequal(Local==Local2)).imposs(local(Robo, Local) & local(Robo, Local2) & notequal(Local==Local2)).%Operadores%Limpar ruascan(limparRua(Robo, RU), local(Robo, RU) & robo_forca_bruta(Robo) & rua(RU) & local(escombro, RU) & local(alagamento, RU) ).can(remover_escombro(Robo, RU), local(Robo, RU) & robo_forca_bruta(Robo) & rua(RU)& local(escombro, RU)).can(remover_alagamento(Robo, RU), local(Robo, RU) & robo_forca_bruta(Robo) & rua(RU) & local(alagamento, RU)).can(salvar_vitima_morta(VIT, RO, RU),local(VIT, RU) & local(RO, RU) & robo_resgate_vida(RO) & rua(RU) & rua_limpa(RU) & vitima_morta(VIT)).can(salvar_vitima_ferida(VIT, RO, RU),local(VIT, RU) & local(RO, RU) & robo_resgate_vida(RO) & rua(RU) & rua_limpa(RU) & vitima_ferida(VIT)).can(salvar_vitima_saudavel(VIT, RO, RU),local(VIT, RU) & local(RO, RU) & robo_resgate_vida(RO) & rua(RU) & rua_limpa(RU) & vitima_saudavel(VIT)).can(mover_robo_resgate(RO, _), robo_resgate_vida(RO)).can(mover_robo_forca(RO, _), robo_forca_bruta(RO)).add(rua_limpa(RU), limparRua(_, RU)).add(rua_limpa(RU), remover_escombro(_, RU)).add(rua_limpa(RU), remover_alagamento(_, RU)).add(vitima_iml(VIT), salvar_vitima_morta(VIT, _, _)).add(sem_vitimas(RU), salvar_vitima_morta(_, _, RU)).add(vitima_hospital(VIT), salvar_vitima_ferida(VIT, _, _)).add(sem_vitimas(RU), salvar_vitima_ferida(_, _, RU)).add(vitima_abrigo(VIT), salvar_vitima_saudavel(VIT, _, _)).add(sem_vitimas(RU), salvar_vitima_saudavel(_, _, RU)).add(local(RO, Rua), mover_robo_resgate(RO, Rua)).add(local(RO, Rua), mover_robo_forca(RO, Rua)).del(local(alagamento, RU), limparRua(_, RU)).del(local(escombro, RU), limparRua(_, RU)).del(local(escombro, RU), remover_escombro(_, RU)).del(local(alagamento, RU), remover_alagamento(_, RU)).del(local(VIT, RU),  salvar_vitima_morta(VIT, _, RU)).del(vitima_morta(VIT), salvar_vitima_morta(VIT, _, _)).del(local(VIT, RU),  salvar_vitima_ferida(VIT, _, RU)).del(vitima_ferida(VIT), salvar_vitima_ferida(VIT, _, _)).del(local(VIT, RU),  salvar_vitima_saudavel(VIT, _, RU)).del(vitima_saudavel(VIT), salvar_vitima_saudavel(VIT, _, _)).del(local(RO,_), mover_robo_forca(RO,_)).del(local(RO,_), mover_robo_resgate(RO,_)).%Estados finais%rua_limpa(X) ^ sem_vitimas(X) %Verificar se todas as ruas estão limpas e sem vitimasteste:-  plans(rua_limpa(rua1) & rua_limpa(rua2) & rua_limpa(rua3) & rua_limpa(rua4) & rua_limpa(rua5) & rua_limpa(rua6) & rua_limpa(rua7) & rua_limpa(rua8) & rua_limpa(rua9) & sem_vitimas(rua1) & sem_vitimas(rua2) & sem_vitimas(rua3) & sem_vitimas(rua4) & sem_vitimas(rua5) & sem_vitimas(rua6) & sem_vitimas(rua7) & sem_vitimas(rua8) & sem_vitimas(rua9),tsunami).teste2:-  plans(rua_limpa(rua1) & rua_limpa(rua2) & rua_limpa(rua3)  & rua_limpa(rua4) & rua_limpa(rua5) & rua_limpa(rua6) & rua_limpa(rua7)  & rua_limpa(rua8) & rua_limpa(rua9),tsunami).teste3:-  plans(rua_limpa(rua6),tsunami).teste4:-  plans(rua_limpa(rua5) & rua_limpa(rua7) & rua_limpa(rua8) & rua_limpa(rua6) & rua_limpa(rua9),tsunami).teste5:-  plans(rua_limpa(rua1) & rua_limpa(rua2) & rua_limpa(rua3)  & rua_limpa(rua4) & rua_limpa(rua5) & rua_limpa(rua6) & rua_limpa(rua7)  & rua_limpa(rua8) & rua_limpa(rua9) & sem_vitimas(rua1),tsunami).teste6:-  plans(rua_limpa(rua1) & rua_limpa(rua2) & rua_limpa(rua3) & sem_vitimas(rua1)  & sem_vitimas(rua2) & sem_vitimas(rua3),tsunami).teste7:-  plans(rua_limpa(rua1) & rua_limpa(rua2) & rua_limpa(rua3) & sem_vitimas(rua3),tsunami).teste8:-  plans(rua_limpa(rua1) & rua_limpa(rua2) & rua_limpa(rua3) & rua_limpa(rua4) & rua_limpa(rua5) & rua_limpa(rua6) & rua_limpa(rua7) & rua_limpa(rua8) & rua_limpa(rua9) & vitima_abrigo(pessoa1),tsunami).teste9:-  plans(vitima_abrigo(pessoa1) & vitima_iml(pessoa2) & vitima_hospital(pessoa3) & vitima_abrigo(pessoa4) & vitima_iml(pessoa5) & vitima_hospital(pessoa6),tsunami).teste10:-  plans(rua_limpa(rua1) & rua_limpa(rua2) & rua_limpa(rua3) & rua_limpa(rua4) & rua_limpa(rua5) & rua_limpa(rua6) & rua_limpa(rua7) & rua_limpa(rua8) & rua_limpa(rua9) & vitima_abrigo(pessoa1) & vitima_iml(pessoa2) & vitima_hospital(pessoa3) & vitima_abrigo(pessoa4) & vitima_iml(pessoa5) & vitima_hospital(pessoa6),tsunami).teste11:-  plans(sem_vitimas(rua1) & sem_vitimas(rua2) & sem_vitimas(rua3) & sem_vitimas(rua4) & sem_vitimas(rua5) & sem_vitimas(rua6) & sem_vitimas(rua7) & sem_vitimas(rua8) & sem_vitimas(rua9),tsunami).teste12:-  plans(rua_limpa(rua1) & vitima_abrigo(pessoa4) & vitima_iml(pessoa5) & rua_limpa(rua2) & rua_limpa(rua3) & vitima_hospital(pessoa3) & rua_limpa(rua4) & rua_limpa(rua5) & rua_limpa(rua6)  & vitima_hospital(pessoa6) & rua_limpa(rua7) & vitima_iml(pessoa2) & vitima_abrigo(pessoa1) & rua_limpa(rua8) & rua_limpa(rua9),tsunami).teste13:-  plans(vitima_abrigo(pessoa1) & vitima_iml(pessoa2) & vitima_hospital(pessoa3) & vitima_abrigo(pessoa4) & vitima_iml(pessoa5) & vitima_hospital(pessoa6) & rua_limpa(rua1) & rua_limpa(rua2) & rua_limpa(rua3) & rua_limpa(rua4) & rua_limpa(rua5) & rua_limpa(rua6) & rua_limpa(rua7) & rua_limpa(rua8) & rua_limpa(rua9),tsunami).teste14:-  plans(vitima_abrigo(pessoa1),tsunami).%teste:-  plans(rua_limpa(rua1) & rua_limpa(rua2) & rua_limpa(rua3) & rua_limpa(rua4) & rua_limpa(rua5) & rua_limpa(rua6) & rua_limpa(rua7) & rua_limpa(rua8) & rua_limpa(rua9) & sem_vitimas(rua1) & sem_vitimas(rua2) & sem_vitimas(rua3) & sem_vitimas(rua4) & sem_vitimas(rua5) & sem_vitimas(rua6) & sem_vitimas(rua7) & sem_vitimas(rua8) & sem_vitimas(rua9),tsunami).%Nao pode ter vitimas%ruas limpas                1"; 
function removeDisabled() {
	$("#testarConexao").attr("disabled", false);
}


function conectar() {
	//ws = new WebSocket("ws://localhost:9998/echo");
	var endereco = $("#ipServidor").val() + ":" + $("#portaServidor").val();
	
	ws = new WebSocket("ws://" + endereco);
	
	ws.onopen = function()
    {
    	console.log("ABRI");
    	conexaoBemSucedida();
    };
	
	ws.onerror = function (evt) {
		console.log(evt);
		erroConexao("Não foi possível estabelecer a comunicação com o servidor!");
	}
	
	ws.onclose = function () {
		console.log("onclose");

	}
	
	ws.onmessage = function (evt) 
     { 

     	console.log(evt);
        var received_msg = evt.data;
        //alert(received_msg);
//		tratarMsgServidor(received_msg);
     };
}

function tratarMsgServidor(msg) {
	var res = msg.split("||");
	console.log(res);
	if (res[0] == "0") {
		mostrarTabuleiro();
		suaCor = res[1]; 
		podeJogar = false;
		$("#suaVez").hide();
		if (res[1] == 2) {
			$("#chatBottomBar").show();
			ocultarRelogio();
		} else {
			ocultarRelogio("N");
		}
		
	} else if (res[0] == "1") {
		$("#chatBottomBar").show();
		resetarRelogio();
		podeJogar = true;
		$("#suaVez").show();
		$(".casaComFoco").addClass("casahover");
		
	} else if (res[0] == 2) {
			

		iniciaContagemAdv();
		resetarRelogio();
		adicionarPecaAdversario(res[1], res[2]);
		podeJogar = true;
		$("#suaVez").show();
		$(".casaComFoco").addClass("casahover");
	} else if (res[0] == 3) {
		if (res[1] == 1) {
			enviar("encerrapartida||0");
			$("#link_modal_venceu").click();
		} else if (res[1] == 2) {
			if (suaCor == 1) {
				enviar("encerrapartida||0");
			}
			$("#link_modal_empatou").click();
		} else {
			$("#link_modal_perdeu").click();
		}
		suaCor = -1;
	} else if (res[0] == 4) {
		$("#suaVez").hide();
		$("#erroConexao").html("A partida já possui dois jogadores!");
		$("#erroConexao").removeClass("hide");
		removeDisabled();
		//4 ja tem dois jogadores
	} else if (res[0] == 5) {
		if (res[1] == 1) {
			enviar("encerrapartida||0");
			$("#link_modal_venceu").click();
		} else {
			$("#link_modal_perdeu").click();
		}
	} else if (res[0] == "ChatMensagem") {
		receberMsgChat(res[1]);
	} else {
		alert(msg);
	}
}

function verificaMsgErro() {
	
}

function enviar(msg) {
	console.log(msg);
	//alert("ENVIANDO " + msg);
	ws.send(msg);
}

function receber() {

}