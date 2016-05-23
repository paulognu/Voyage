angular.module("Voyage").controller("equipesCtrl", function ($scope, $http, $routeParams, $window) {
	$scope.divisoes = [];
	$scope.colaboradores = [];
	$scope.equipe = {
		id: null,
		nome: null,
		sigla: null,
		membros: []
	};

	$scope.nome_error = null;
	$scope.sigla_error = null;
	$scope.divisao = null;
	$scope.membros = null;

	$http.get('/api/colaboradores-list/').success(function (dados) {
		$scope.colaboradores = dados;
	});


	var validate = function (dados) {

		console.log(dados);

		if(dados.nome) {
			$scope.nome_error = dados.nome[0];
		} else {
			$scope.nome_error = null;
		}

		if(dados.sigla) {
			$scope.sigla_error = dados.sigla[0];
		} else {
			$scope.sigla_error = null;
		}

		if(dados.divisao) {
			$scope.divisao_error = dados.divisao[0];
		} else {
			$scope.divisao_error = null;
		}

		if(dados.membros) {
			$scope.membros_error = dados.membros[0];
		} else {
			$scope.membros_error = null;
		}

	};


	var redirectList = function () {
		$window.location.href = "#/equipes-list/";
	};


	$scope.carregarEquipesList = function (filtro) {

		url = "/api/equipes/";
		consulta = url;

		if(filtro) {
			consulta += '?filtro=' + filtro;			
		}

		$http.get(consulta)
			.success(function (dados) {
				$scope.equipes = dados.results;
			})
			.error(function (dados) {

			});

	};

	$scope.carregarEquipesDetail = function (id) {

		if(id === "null") {
			return;
		}

		url = "/api/equipes/";
		consulta = url + id + "/";

		$http.get(consulta)
			.success(function (dados) {
				$scope.equipe = dados;				

				$('#membros').tokenfield('setTokens', dados.membros_teste);

			})
			.error(function (dados) {

			});


	};

	$scope.salvarEquipesDetail = function (equipe) {

		url = "/api/equipes/";

		$scope.nome_error = null;
		$scope.sigla_error = null;
		$scope.divisao_error = null;
		$scope.membros_error = null;

		if(!equipe.divisao) {
			equipe.divisao = "";
		}

		if(!equipe.membros) {
			equipe.membros = null;
		}

		if(!equipe.observacao) {
			equipe.observacao = null;
		}

		if(!equipe.observacao) {
			equipe.observacao = null;
		}

		if (equipe && equipe.id) {
			consulta = url + equipe.id + "/";

			$http.put(consulta, equipe)
				.success(function (dados) {
					$scope.equipe = dados;
					redirectList();
				})
				.error(function (dados) {
					validate(dados);
				});
		} else {
			$http.post(url, equipe)
				.success(function (dados) {
					$scope.equipe = dados;
					redirectList();
				})
				.error(function (dados) {
					validate(dados);
			});
		}		

	};

	$scope.excluirEquipesDetail = function (equipe) {
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-body").html("Deseja exluir registro?");
	

		$("#btnExcluir").unbind("click");
		$("#btnExcluir").click(function () {
			url = "/api/equipes/";

			if (equipe && equipe.id) {
				consulta = url + equipe.id + "/";

				$http.delete(consulta, equipe)
					.success(function (dados) {
						$scope.equipe = dados;

						redirectList();
					})
					.error(function (dados) {
						
					});
			}	

		});
		$("#dialog").modal();

	};

	$scope.carregarDivisoesList = function () {
		url = "/api/divisoes/";

		$http.get(url)
			.success(function (dados) {
				$scope.divisoes = dados.results;
			})
			.error(function (dados) {
				
			})
	};

	if($routeParams.id) {
		$scope.carregarDivisoesList();
		$scope.carregarEquipesDetail($routeParams.id);
	} else {
		$scope.carregarEquipesList();
	}

	var adicionarMembro = function (e) {

		var some_extern = $scope.equipe.membros.some(function (item) {
			return item === e.attrs.value;
		});

		var some_intern = $(this).val().split(',').some(function (item) {
			
			console.log(item.trim().length);
			console.log(e.attrs.value.trim().length);


			return item.trim() === e.attrs.value.trim();
		});

		var colaborador_valido = $scope.colaboradores.some(function (item) {			
			return item.value.trim() === e.attrs.value.trim();
		});

		if(!some_extern && colaborador_valido) {
			$scope.equipe.membros.push(e.attrs.value);
		}

		return !(some_intern && some_extern) && colaborador_valido;
	};

	var removerMembro = function (e) {

		$scope.equipe.membros = $scope.equipe.membros.filter(function (item) {
			return e.attrs.value !== item;
		});

	};

	$('#membros').tokenfield({
		autocomplete: {
			source: function (request, response) {
				$http.get('/api/colaboradores-list/').success(function (dados) {
					$scope.colaboradores = dados;
					response(dados);
				});
			},
			delay: 100	
		}
	});

	$("#membros")
      .on('tokenfield:createtoken', adicionarMembro)
      .on('tokenfield:removetoken', removerMembro);

});