angular.module("Voyage").controller("instalacoesCtrl", function ($scope, $http, $routeParams, $window) {
	$scope.instalacoes = [];
	$scope.instalacao = {};
	$scope.tipos = {}

	$scope.nomeerror = null;
	$scope.sigla_error = null;
	$scope.unidade_error = null;
	$scope.tipo_error = null;

	$scope.filtro = "";

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

		if(dados.tipo) {
			$scope.tipo_error = dados.tipo[0];
		} else {
			$scope.tipo_error = null;
		}

	};


	var redirectList = function () {
		$window.location.href = "#/instalacoes-list/";
	};


	var carregarTipos = function () {
		url = '/api/instalacao-tipos/'

		$http.get(url).success(function (dados) {
			$scope.tipos = dados;
		});
	};

	$scope.carregarInstalacoesList = function (filtro) {

		url = "/api/instalacoes/";
		consulta = url;

		if(filtro) {
			consulta += '?filtro=' + filtro;			
		}

		$http.get(consulta)
			.success(function (dados) {
				$scope.instalacoes = dados.results;
			})
			.error(function (dados) {

			});

	};

	$scope.carregarInstalacoesDetail = function (id) {

		if(id === "null") {
			return;
		}

		url = "/api/instalacoes/";
		consulta = url + id + "/";

		$http.get(consulta)
			.success(function (dados) {
				$scope.instalacao = dados;
			})
			.error(function (dados) {

			});


	};

	$scope.salvarInstalacoesDetail = function (instalacao) {

		url = "/api/instalacoes/";

		$scope.nomeerror = null;
		$scope.sigla_error = null;
		$scope.unidade_error = null;
		$scope.tipo_error = null;

		if(!instalacao.unidade) {
			instalacao.unidade = null;
		}

		if (instalacao && instalacao.id) {
			consulta = url + instalacao.id + "/";

			$http.put(consulta, instalacao)
				.success(function (dados) {
					$scope.instalacao = dados;
					redirectList();
				})
				.error(function (dados) {
					validate(dados);
				});
		} else {
			$http.post(url, instalacao)
				.success(function (dados) {
					$scope.instalacao = dados;
					//redirectList();
				})
				.error(function (dados) {
					validate(dados);
			});
		}		

	};

	$scope.excluirInstalacoesDetail = function (instalacao) {
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-body").html("Deseja exluir registro?");
	

		$("#btnExcluir").unbind("click");
		$("#btnExcluir").click(function () {
			url = "/api/instalacoes/";

			if (instalacao && instalacao.id) {
				consulta = url + instalacao.id + "/";

				$http.delete(consulta, instalacao)
					.success(function (dados) {
						$scope.instalacao = dados;

						redirectList();
					})
					.error(function (dados) {
						
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
		carregarTipos();
		$scope.carregarUnidadesList();
		$scope.carregarInstalacoesDetail($routeParams.id);
	} else {
		$scope.carregarInstalacoesList();
	}
});