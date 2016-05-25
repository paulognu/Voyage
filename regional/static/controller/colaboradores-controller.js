angular.module("Voyage").controller("colaboradoresCtrl", function ($scope, $http, $routeParams, $window) {
	$scope.divisoes = [];
	$scope.colaboradores = [];
	$scope.colaborador = {
		matricula: null,
		nome_completo: null,
		email: null,
		divisao: $routeParams.divisao
	};
	
	$scope.divisao = $routeParams.divisao;
	$scope.nome_completo_error = null;
	$scope.matricula_error = null;
	$scope.email_error = null;
	$scope.filtro = "";

	var validate = function (dados) {

		if(dados.matricula) {
			$scope.matricula_error = dados.matricula[0];
		} else {
			$scope.matricula_error = null;
		}

		if(dados.nome_completo) {
			$scope.nome_completo_error = dados.nome_completo[0];
		} else {
			$scope.nome_completo_error = null;
		}

		if(dados.email) {
			$scope.email_error = dados.email[0];
		} else {
			$scope.email_error = null;
		}

	};


	var redirectList = function () {
		$window.location.href = "#/colaboradores-list/";
	};


	$scope.carregarColaboradoresList = function (filtro) {

		url = "/api/colaboradores/";
		consulta = url;

		divisao = $routeParams.divisao;

		if(filtro) {
			consulta += '?filtro=' + filtro;			
		}

		if(divisao) {
			if(filtro) {
				consulta += '&divisao=' + divisao;
			} else {
				consulta += '?divisao=' + divisao;
			}
		}

		$http.get(consulta)
			.success(function (dados) {
				$scope.colaboradores = dados.results;
			})
			.error(function (dados) {

			});

	};

	$scope.carregarColaboradoresDetail = function (id) {

		if(id === "null") {
			return;
		}

		url = "/api/colaboradores/";
		consulta = url + id + "/";

		$http.get(consulta)
			.success(function (dados) {
				$scope.colaborador = dados;
			})
			.error(function (dados) {

			});


	};

	$scope.salvarColaboradoresDetail = function (colaborador) {

		url = "/api/colaboradores/";

		$scope.nome_completo_error = null;
		$scope.matricula_error = null;
		$scope.email_error = null;

		if(!colaborador.email) {
			colaborador.email = null;
		}

		if (colaborador && colaborador.id) {
			consulta = url + colaborador.id + "/";

			$http.put(consulta, colaborador)
				.success(function (dados) {
					$scope.colaborador = dados;
					redirectList();
				})
				.error(function (dados) {
					validate(dados);
				});
		} else {
			$http.post(url, colaborador)
				.success(function (dados) {
					$scope.colaborador = dados;
					redirectList();
				})
				.error(function (dados) {
					validate(dados);
			});
		}		

	};

	$scope.excluirColaboradoresDetail = function (colaborador) {
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-body").html("Deseja exluir registro?");
	

		$("#btnExcluir").unbind("click");
		$("#btnExcluir").click(function () {
			url = "/api/colaboradores/";

			if (colaborador && colaborador.id) {
				consulta = url + colaborador.id + "/";

				$http.delete(consulta, colaborador)
					.success(function (dados) {
						$scope.colaborador = dados;

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
		$scope.carregarColaboradoresDetail($routeParams.id);
	} else {
		$scope.carregarColaboradoresList();
	}
});