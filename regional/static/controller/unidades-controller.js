angular.module("Voyage").controller("unidadesCtrl", function ($scope, $http, $routeParams, $window) {
	$scope.unidades = [];
	$scope.unidade = {
		id: "",
		nome: "",
		sigla: ""
	};

	$scope.sigla_error = null;
	$scope.nome_error = null;

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
	};

	var redirectList = function () {
		$window.location.href = "#/unidades-list";
	};

	$scope.carregarUnidadesList = function (filtro) {

		url = "/api/unidades/";
		consulta = url;

		if(filtro) {
			consulta += '?filtro=' + filtro;			
		}

		$http.get(consulta)
			.success(function (dados) {
				$scope.unidades = dados.results;
			})
			.error(function (dados) {

			});

	};

	$scope.carregarUnidadesDetail = function (id) {

		url = "/api/unidades/";
		consulta = url + id + "/";

		$http.get(consulta)
			.success(function (dados) {
				$scope.unidade = dados;
			})
			.error(function (dados) {

			});


	};

	$scope.salvarUnidadesDetail = function (unidade) {

		url = "/api/unidades/";

		$scope.sigla_error = null;
		$scope.nome_error = null;

		if (unidade && unidade.id) {
			consulta = url + unidade.id + "/";

			$http.put(consulta, unidade)
				.success(function (dados) {
					$scope.unidade = dados;
					redirectList();
				})
				.error(function (dados) {
					validate(dados);
				});
		} else {
			$http.post(url, unidade)
				.success(function (dados) {
					$scope.unidade = dados;
					redirectList();
				})
				.error(function (dados) {
					validate(dados);
				});
		}		

	};

	$scope.excluirUnidadesDetail = function (unidade) {
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-body").html("Deseja exluir registro?");	

		$("#btnExcluir").unbind("click");
		$("#btnExcluir").click(function () {
			url = "/api/unidades/";

			if (unidade && unidade.id) {
				consulta = url + unidade.id + "/";

				$http.delete(consulta, unidade)
					.success(function (dados) {
						$scope.unidade = dados;
						redirectList();
					})
					.error(function (dados) {
						//console.log("não: ", dados);
					});
			}
		});
		$("#dialog").modal();
	};

	if($routeParams.id) {
		$scope.carregarUnidadesDetail($routeParams.id);
	} else {
		$scope.carregarUnidadesList();
	}
});