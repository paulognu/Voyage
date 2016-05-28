angular.module("Voyage").controller("colaboradoresCtrl", ['$scope', '$http', '$routeParams', '$window', '$divisoesService', '$colaboradoresService',  function ($scope, $http, $routeParams, $window, $divisoes, $colaboradores) {
	$scope.divisoes = [];
	$scope.colaboradores = [];
	$scope.colaborador = {
		matricula: null,
		nome_completo: null,
		email: null,
		divisao: $routeParams.divisao
	};

	$scope.divisao = $routeParams.divisao;

	$divisoes.getList(function (dados) {
		$scope.divisoes = dados.results;
	});
	
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


	var redirectList = function (divisao) {
		$window.history.back();
	};


	$scope.carregarColaboradoresList = function (filtro) {

		$colaboradores.getList($routeParams.divisao, filtro, function (dados) {
			$scope.colaboradores = dados.results;
		});

	};

	$scope.carregarColaboradoresDetail = function (id) {

		$colaboradores.getDetail(id, function (dados) {
			$scope.colaborador = dados;
		});

	};

	$scope.salvarColaboradoresDetail = function (colaborador) {

		$scope.nome_completo_error = null;
		$scope.matricula_error = null;
		$scope.email_error = null;

		if(!colaborador.email) {
			colaborador.email = null;
		}

		$colaboradores.save(colaborador, 
			/* Success*/ 
			function (dados) {
				$scope.colaborador = dados;
			},

			/* Error */
			function (dados) {
				validate(dados);
			}
		);	

	};

	$scope.excluirColaboradoresDetail = function (colaborador) {
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-body").html("Deseja exluir registro?");
	

		$("#btnExcluir").unbind("click");
		$("#btnExcluir").click(function () {

			$colaboradores.delete(colaborador,
				/* Success */
				function (dados) {					
					$scope.colaborador = dados;
					redirectList();
				},

				/* Error */
				function (dados) {

				}
			);


		});
		$("#dialog").modal();

	};

	if($routeParams.id) {
		$scope.carregarColaboradoresDetail($routeParams.id);
	} else {
		$scope.carregarColaboradoresList();
	}
} ]);