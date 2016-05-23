angular.module("Voyage").controller("divisoesCtrl", function ($scope, $http, $routeParams, $window) {
	$scope.unidades = [];
	$scope.divisoes = [];
	$scope.divisao = {
		id: "",
		nome: "",
		sigla: "",
		observacao: null,
		descricao: null
	};

	$scope.sigla_error = null;
	$scope.nome_error = null;
	$scope.unidade_error = null;
	$scope.descricao_error = null;
	$scope.observacao_error = null;

	var validate = function (dados) {
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

		if(dados.unidade) {
			$scope.unidade_error = dados.unidade[0];
		} else {
			$scope.unidade_error = null;
		}

		if(dados.descricao) {
			$scope.descricao_error = dados.descricao[0];
		} else {
			$scope.descricao_error = null;
		}

		if(dados.observacao) {
			$scope.observacao_error = dados.observacao[0];
		} else {
			$scope.observacao_error = null;
		}
	};

	var redirectList = function () {
		$window.location.href = "#/divisoes-list/";
	};

	$scope.carregarDivisoesList = function (filtro) {

		console.log(filtro);

		url = "/api/divisoes/";
		consulta = url;

		if(filtro) {
			consulta += '?filtro=' + filtro;			
		}

		$http.get(consulta)
			.success(function (dados) {
				$scope.divisoes = dados.results;
			})
			.error(function (dados) {

			});

	};

	$scope.carregarDivisoesDetail = function (id) {

		if(id === "null") {
			return;
		}

		url = "/api/divisoes/";
		consulta = url + id + "/";

		$http.get(consulta)
			.success(function (dados) {
				$scope.divisao = dados;
				console.log(dados);
			})
			.error(function (dados) {

			});


	};

	$scope.salvarDivisoesDetail = function (divisao) {

		url = "/api/divisoes/";

		$scope.sigla_error = null;
		$scope.nome_error = null;
		$scope.unidade_error = null;
		$scope.descricao_error = null;
		$scope.observacao_error = null;

		if (divisao && divisao.id) {
			consulta = url + divisao.id + "/";

			if(!divisao.descricao) {
				divisao.descricao = null;
			}

			if(!divisao.observacao) {
				divisao.observacao = null;
			}

			$http.put(consulta, divisao)
				.success(function (dados) {
					$scope.divisao = dados;
					redirectList();
				})
				.error(function (dados) {

					validate(dados);


				});
		} else {
			$http.post(url, divisao)
				.success(function (dados) {
					$scope.divisao = dados;
					redirectList();
				})
				.error(function (dados) {

					validate(dados);
			});
		}		

	};

	$scope.excluirDivisoesDetail = function (divisoes) {
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-body").html("Deseja exluir registro?");
	

		$("#btnExcluir").unbind("click");
		$("#btnExcluir").click(function () {

			url = "/api/divisoes/";

			if (divisoes && divisoes.id) {
				consulta = url + divisoes.id + "/";

				$http.delete(consulta, divisoes)
					.success(function (dados) {
						$scope.divisoes = dados;

						redirectList();
					})
					.error(function (dados) {
						validade(dados);
					});
			}
		});
		$("#dialog").modal();
	};

	$scope.carregarUnidadesList = function () {
		url = "/api/unidades/";

		$http.get(url)
			.success(function (dados) {
				$scope.unidades = dados.results;
			})
			.error(function (dados) {
				
			})
	};

	if($routeParams.id) {
		$scope.carregarUnidadesList();
		$scope.carregarDivisoesDetail($routeParams.id);
	} else {
		$scope.carregarDivisoesList();
	}
});