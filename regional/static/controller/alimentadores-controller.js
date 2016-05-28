angular.module("Voyage").controller("alimentadoresCtrl",[ '$scope', '$http', '$routeParams', '$window', '$divisoesService', function ($scope, $http, $routeParams, $window, $divisoes) {
	$scope.alimentadores = [];
	$scope.alimentador = {
		instalacao: $routeParams.instalacao
	};

	$scope.instalacao = $routeParams.instalacao
	$scope.instalacoes = [];

	$scope.activeTab = 0;

	$scope.filtro = "";

	$scope.potencia_ativa = {};
	$scope.potencia_reativa = {};
	
	$scope.corrente_fase_a = {};
	$scope.corrente_fase_b = {};
	$scope.corrente_fase_v = {};

	var clean = function (medida_analogica) {
		medida_analogica.aquisicao_automatica_error = null;
		medida_analogica.referencia_error = null;
		medida_analogica.fator_error = null;
		medida_analogica.valor_manual_error = null;
	};

	var validate = function (dados) {

		if(dados.codigo_operacional) {
			$scope.codigo_operacional_error = dados.codigo_operacional[0];
		} else {
			$scope.codigo_operacional_error = null;
		}

		if(dados.nome) {
			$scope.nome_error = dados.nome[0];
		} else {
			$scope.nome_error = null;
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

		if(dados.instalacao) {
			$scope.instalacao_error = dados.instalacao[0];
		} else {
			$scope.instalacao_error = null;
		}

		if(dados.disjuntor) {
			$scope.disjuntor_error = dados.disjuntor[0];
		} else {
			$scope.disjuntor_error = null;
		}

		if(dados.em_manutencao) {
			$scope.em_manutencao_error = dados.em_manutencao[0];
		} else {
			$scope.em_manutencao_error = null;
		}
		
	};


	var redirectList = function () {
		//$window.location.href = "#/alimentadores-list/";
		$window.history.back();
	};


	$scope.carregarAlimentadoresList = function (filtro) {

		url = "/api/alimentadores/";
		consulta = url;

		params = ""

		if(filtro) {
			params = '?filtro=' + filtro;			
		}

		if($routeParams.instalacao) {
			if(params) {
				params += '&instalacao=' + $routeParams.instalacao;
			} else {
				params += '?instalacao=' + $routeParams.instalacao;				
			}
		}

		consulta += params;


		$http.get(consulta)
			.success(function (dados) {
				$scope.alimentadores = dados.results;
			})
			.error(function (dados) {

			});

	};

	$scope.carregarAlimentadoresDetail = function (id) {

		if(id === "null") {
			return;
		}

		url = "/api/alimentadores/";
		consulta = url + id + "/";

		$http.get(consulta)
			.success(function (dados) {
				$scope.alimentador = dados;
				
				if($scope.alimentador && $scope.alimentador.instalacao) {
					$scope.carregarDisjuntoresList($scope.alimentador.instalacao);
				}				

			})
			.error(function (dados) {

			});
	};

	$scope.salvarAlimentadoresDetail = function (alimentador) {

		url = "/api/alimentadores/";

		$scope.codigo_operacional_error = null;
		$scope.nome_error = null;
		$scope.descricao_error = null;
		$scope.observacao_error = null;
		$scope.instalacao_error = null;
		$scope.disjuntor_error = null;


		if(!alimentador.instalacao) {
			alimentador.instalacao = null;
		}

		if(!alimentador.observacao) {
			alimentador.observacao = null;
		}

		if(!alimentador.descricao) {
			alimentador.descricao = null;
		}


		if (alimentador && alimentador.id) {
			consulta = url + alimentador.id + "/";

			$http.put(consulta, alimentador)
				.success(function (dados) {
					$scope.alimentador = dados;
					redirectList();
				})
				.error(function (dados) {
					console.log(dados);
					validate(dados);
				});
		} else {
			$http.post(url, alimentador)
				.success(function (dados) {
					$scope.alimentador = dados;
					//redirectList();
				})
				.error(function (dados) {
					console.log(dados);
					validate(dados);
			});
		}		

	};

	$scope.excluirAlimentadoresDetail = function (alimentador) {
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-body").html("Deseja exluir registro?");
	

		$("#btnExcluir").unbind("click");
		$("#btnExcluir").click(function () {
			url = "/api/alimentadores/";

			if (alimentador && alimentador.id) {
				consulta = url + alimentador.id + "/";

				$http.delete(consulta, alimentador)
					.success(function (dados) {
						$scope.alimentador = dados;
						redirectList();
					})
					.error(function (dados) {
						
					});
			}	

		});
		$("#dialog").modal();

	};

	$scope.carregarInstalacoesList = function () {
		url = "/api/instalacoes/";

		$http.get(url)
			.success(function (dados) {
				$scope.instalacoes = dados.results;
			})
			.error(function (dados) {
				
			})
	};

	$scope.carregarDisjuntoresList = function (instalacao) {

		url = "/api/equipamentos/?tipo=Disjuntor&instalacao=" + instalacao;

		$http.get(url)
			.success(function (dados) {
				$scope.disjuntores = dados.results;
			})
			.error(function (dados) {
				
			})
	};

	$scope.setActiveTab = function (index) {
		$scope.activeTab = index;
	};

	if($routeParams.id) {
		$scope.carregarInstalacoesList();

		if($scope.instalacao) {
			$scope.carregarDisjuntoresList($scope.instalacao);
		}

		$scope.carregarAlimentadoresDetail($routeParams.id);
	} else {
		$scope.carregarAlimentadoresList();
	}

} ]);