%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% WARPLAN-algorithm
% Disciplina IA I - UCS


:- op(700,xfy,&).
:- op(650,yfx,=>).

% Problem solver entry: Generation and output of a plan

plans(C,_) :-
        inconsistent(C,true), !, nl,
        write('impossible'), nl, nl.

plans(C,T) :-
        plan(C,true,T,T1), nl,
        output(T1), !, nl, nl.
plans( _, _ )   :-
   write( 'Cannot do this.' ), nl.


output(Xs => X) :-
        !, output1(Xs),
        write(X),
        write('.'), nl.

output1(Xs => X) :-
        !, output1(Xs),
        write(X),
        write(';'), nl.

output1(X) :-
        !, write(X),
        write(';'), nl.


% Entry point to the main recursive loop

plan(X&C,P,T,T2) :-
        !, solve(X,P,T,P1,T1), 
        plan(C,P1,T1,T2).

plan(X,P,T,T1) :-
        solve(X,P,T,_,T1).

% Ways of solving a goal

solve(X,P,T,P,T) :- always(X).
solve(not_equal(X,Y),P,T,P,T) :- not_equal(X,Y).
solve(X,P,T,P1,T) :-
        holds(X,T),
        and(X,P,P1).

solve(X,P,T,X&P,T1) :-
        add(X,U),
        achieve(X,U,P,T,T1).

% Methods of achieving an action
%   By extension

achieve(_,U,P,T,T1=>U) :-
        preserves(U,P),
        can(U,C),
        \+ (inconsistent(C,P)),
        plan(C,P,T,T1),
        preserves(U,P).

%   By insertion

achieve(X,U,P,T=>V,T1=>V) :-
        preserved(X,V),
        retrace(P,V,P1),
        achieve(X,U,P1,T,T1),
        preserved(X,V).

% Check if a fact holds in a certain state

holds(X,_=>V) :-
        add(X,V).

holds(X,T=>V) :-
        !, preserved(X,V),
        holds(X,T),
        preserved(X,V).

holds(X,T) :-
        given(T,X).

% Prove that an action preserves a fact

preserves(U,X&C) :-
        preserved(X,U),
        preserves(U,C).

preserves(_,true).

preserved(X,V) :- check(pres(X,V)).
pres(X,V):- mkground(X&V), \+ del(X,V).


% Retracing a goal already achieved

retrace(P,V,P2) :-
        can(V,C),
        retrace(P,V,C,P1),
        append(C,P1,P2).

retrace(X&P,V,C,P1) :-
        add(Y,V),
        equiv(X,Y), !,
        retrace(P,V,C,P1).

retrace(X&P,V,C,P1) :-
        elem(Y,C),
        equiv(X,Y), !,
        retrace(P,V,C,P1).

retrace(X&P,V,C,X&P1) :-
        retrace(P,V,C,P1).

retrace(true,_,_,true).

% Consistency with a goal already achieved

inconsistent(C,P) :-
   mkground(C&P),
        imposs(S),
        check(intersect(C,S)),
        implied(S,C&P), !.


% Utility routines

and(X,P,P) :-
        elem(Y,P),
        equiv(X,Y), !.
and(X,P,X&P).

append(X&C,P,X&P1) :-
        !, append(C,P,P1).
append(X,P,X&P).

elem(X,Y&_) :-
        elem(X,Y).
elem(X,_&C) :-
        !, elem(X,C).
elem(X,X).

implied(S1&S2,C) :-
        !, implied(S1,C),
        implied(S2,C).
implied(X,C) :-
        elem(X,C).
implied(not_equal(X,Y),_) :-
        not_equal(X,Y).

intersect(S1,S2) :-
        elem(X,S1),
        elem(X,S2).

not_equal(X,Y) :-
        \+ (X=Y),
        \+ (X='$VAR'(_)),
        \+ (Y='$VAR'(_)).

mkground(X):- numbervars(X,0,_).

check(X):- \+ (\+ X).

equiv(X,Y) :-
        \+ (nonequiv(X,Y)).

nonequiv(X,Y) :-
        numbervars(X&Y,0,_),
        X=Y, !, fail.

nonequiv(_,_).
given(tsunami,local(escombro, rua5)).
given(tsunami,local(escombro, rua10)).
given(tsunami,local(escombro, rua1)).
given(tsunami,local(escombro, rua6)).
given(tsunami,local(escombro, rua2)).
given(tsunami,local(alagamento, rua8)).
given(tsunami,local(alagamento, rua5)).
given(tsunami,local(alagamento, rua1)).
given(tsunami,local(alagamento, rua2)).
given(tsunami, rua_limpa(rua3)).
given(tsunami, rua_limpa(rua4)).
given(tsunami, rua_limpa(rua7)).
given(tsunami, rua_limpa(rua9)).
given(tsunami,local(hospital, rua3)).
given(tsunami,local(abrigo, rua2)).
given(tsunami,local(iml, rua5)).
given(tsunami,local(pessoa1,rua1)).
given(tsunami,vitima_ferida(pessoa1)).
given(tsunami,local(pessoa2,rua1)).
given(tsunami,vitima_ferida(pessoa2)).
given(tsunami,local(pessoa3,rua1)).
given(tsunami,vitima_ferida(pessoa3)).
given(tsunami,local(pessoa4,rua1)).
given(tsunami,vitima_ferida(pessoa4)).
given(tsunami,local(pessoa5,rua9)).
given(tsunami,vitima_ferida(pessoa5)).
given(tsunami,local(pessoa6,rua6)).
given(tsunami,vitima_ferida(pessoa6)).
given(tsunami,local(pessoa7,rua2)).
given(tsunami,vitima_saudavel(pessoa7)).
given(tsunami,local(pessoa8,rua4)).
given(tsunami,vitima_saudavel(pessoa8)).
given(tsunami,local(pessoa9,rua5)).
given(tsunami,vitima_saudavel(pessoa9)).
given(tsunami,local(pessoa10,rua2)).
given(tsunami,vitima_saudavel(pessoa10)).
given(tsunami,local(pessoa11,rua2)).
given(tsunami,vitima_saudavel(pessoa11)).
given(tsunami,local(pessoa12,rua2)).
given(tsunami,vitima_morta(pessoa12)).
given(tsunami,local(pessoa13,rua1)).
given(tsunami,vitima_morta(pessoa13)).
given(tsunami,local(pessoa14,rua2)).
given(tsunami,vitima_morta(pessoa14)).
given(tsunami,local(pessoa15,rua3)).
given(tsunami,vitima_morta(pessoa15)).
given(tsunami,local(pessoa16,rua2)).
given(tsunami,vitima_morta(pessoa16)).
given(tsunami,local(pessoa17,rua7)).
given(tsunami,vitima_morta(pessoa17)).
given(tsunami, sem_vitimas(rua8)).
given(tsunami, sem_vitimas(rua10)).
given(tsunami,local(robo1,rua6)).
given(tsunami,local(robo2,rua1)).
always(rua(rua1)).
always(rua(rua2)).
always(rua(rua3)).
always(rua(rua4)).
always(rua(rua5)).
always(rua(rua6)).
always(rua(rua7)).
always(rua(rua8)).
always(rua(rua9)).
always(rua(rua10)).
always(robo_resgate_vida(robo1)).
always(robo_forca_bruta(robo2)).
always(edificio(hospital)).
always(edificio(abrigo)).
always(edificio(iml)).
always(connects(rua1, rua1)).
always(connects(rua1, rua2)).
always(connects(rua1, rua3)).
always(connects(rua1, rua4)).
always(connects(rua1, rua5)).
always(connects(rua1, rua6)).
always(connects(rua1, rua9)).
always(connects(rua1, rua10)).
always(connects(rua2, rua1)).
always(connects(rua2, rua2)).
always(connects(rua2, rua4)).
always(connects(rua2, rua5)).
always(connects(rua2, rua6)).
always(connects(rua2, rua7)).
always(connects(rua3, rua1)).
always(connects(rua3, rua3)).
always(connects(rua4, rua1)).
always(connects(rua4, rua2)).
always(connects(rua4, rua4)).
always(connects(rua5, rua1)).
always(connects(rua5, rua2)).
always(connects(rua5, rua5)).
always(connects(rua5, rua8)).
always(connects(rua6, rua1)).
always(connects(rua6, rua2)).
always(connects(rua6, rua6)).
always(connects(rua7, rua2)).
always(connects(rua7, rua7)).
always(connects(rua8, rua5)).
always(connects(rua8, rua8)).
always(connects(rua8, rua9)).
always(connects(rua8, rua10)).
always(connects(rua9, rua1)).
always(connects(rua9, rua8)).
always(connects(rua9, rua9)).
always(connects(rua10, rua1)).
always(connects(rua10, rua8)).
always(connects(rua10, rua10)).
imposs(local( X, Y )  &  local( X, Z )  &  notequal( Y, Z )  ).
imposs(rua_limpa(X)  &  local(escombro, X)).
imposs(rua_limpa(X)  &  local(alagamento, X)).
can(remover_escombro_alagamento(Robo, RU), robo_forca_bruta(Robo) & rua(RU) & local(escombro, RU) & local(alagamento, RU) & local(Robo, RU)).
can(remover_escombro(Robo, RU),  robo_forca_bruta(Robo) & rua(RU)& local(escombro, RU) & local(Robo, RU)).
can(remover_alagamento(Robo, RU), robo_forca_bruta(Robo) & rua(RU) & local(alagamento, RU) & local(Robo, RU)).
can(salvar_vitima_morta(VIT, RO, RU),    robo_resgate_vida(RO) & vitima_morta(VIT)    & local(VIT, RU) & rua(RU) & rua_limpa(RU) & local(RO, RU)).
can(salvar_vitima_ferida(VIT, RO, RU),   robo_resgate_vida(RO) & vitima_ferida(VIT)   & local(VIT, RU) & rua(RU) & rua_limpa(RU) & local(RO, RU)).
can(salvar_vitima_saudavel(VIT, RO, RU), robo_resgate_vida(RO) & vitima_saudavel(VIT) & local(VIT, RU) & rua(RU) & rua_limpa(RU) & local(RO, RU)).
can(mover_robo_forca(Robo, W, Y, V), robo_forca_bruta(Robo) & local(Robo,V) & connects(V,Y) & connects(Y,W)).
can(mover_robo_resgate(Robo, W, Y, V), robo_resgate_vida(Robo) & local(Robo,V) & connects(V,Y) & connects(Y,W)).
can(mover(Robo, W), robo_forca_bruta(Robo) & local(Robo,V) & ! & connects(V,W)).
can(mover(Robo, W), robo_resgate_vida(Robo) & local(Robo,V) & ! & connects(V,W)).
add(rua_limpa(RU), remover_escombro_alagamento(_, RU)).
add(rua_limpa(RU), remover_escombro(_, RU)).
add(rua_limpa(RU), remover_alagamento(_, RU)).
add(vitima_iml(VIT), salvar_vitima_morta(VIT, _, _)).
add(sem_vitimas(RU), salvar_vitima_morta(_, _, RU)).
add(vitima_hospital(VIT), salvar_vitima_ferida(VIT, _, _)).
add(sem_vitimas(RU), salvar_vitima_ferida(_, _, RU)).
add(vitima_abrigo(VIT), salvar_vitima_saudavel(VIT, _, _)).
add(sem_vitimas(RU), salvar_vitima_saudavel(_, _, RU)).
add(local(Robo,W), mover_robo_forca(Robo,W, _, _)).
add(local(Robo,W), mover_robo_resgate(Robo,W, _, _)).
add(local(Robo,W), mover(Robo,W)).
del(local(Robo,V),mover_robo_forca(Robo,_, _, V)).
del(local(Robo,V),mover_robo_resgate(Robo,_, _, V)).
del(local(Robo,V),mover(Robo,V)).
del(local(alagamento, RU), remover_escombro_alagamento(_, RU)).
del(local(escombro, RU), remover_escombro_alagamento(_, RU)).
del(local(escombro, RU), remover_escombro(_, RU)).
del(local(alagamento, RU), remover_alagamento(_, RU)).
del(local(VIT, RU),  salvar_vitima_morta(VIT, _, RU)).
del(vitima_morta(VIT), salvar_vitima_morta(VIT, _, _)).
del(local(VIT, RU),  salvar_vitima_ferida(VIT, _, RU)).
del(vitima_ferida(VIT), salvar_vitima_ferida(VIT, _, _)).
del(local(VIT, RU),  salvar_vitima_saudavel(VIT, _, RU)).
del(vitima_saudavel(VIT), salvar_vitima_saudavel(VIT, _, _)).
testeFinal:- plans(rua_limpa(rua1) & vitima_hospital(pessoa1) & vitima_hospital(pessoa2) & vitima_hospital(pessoa3) & vitima_hospital(pessoa4) & vitima_iml(pessoa13) & rua_limpa(rua2) & vitima_abrigo(pessoa7) & vitima_abrigo(pessoa10) & vitima_abrigo(pessoa11) & vitima_iml(pessoa12) & vitima_iml(pessoa14) & vitima_iml(pessoa16) & rua_limpa(rua3) & vitima_iml(pessoa15) & rua_limpa(rua4) & vitima_abrigo(pessoa8) & rua_limpa(rua5) & vitima_abrigo(pessoa9) & rua_limpa(rua6) & vitima_hospital(pessoa6) & rua_limpa(rua7) & vitima_iml(pessoa17) & rua_limpa(rua8) & rua_limpa(rua9) & vitima_hospital(pessoa5) & rua_limpa(rua10),tsunami).