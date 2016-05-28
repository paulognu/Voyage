angular.module("Voyage").controller("equipamentosCtrl", function ($scope, $http, $routeParams, $window) {
	$scope.equipamentos = [];
	 $scope.equipamento = {
		potencia_ativa: {},
		potencia_reativa: {},
		fator_potencia: {},
		corrente_fase_a: {},
		corrente_fase_b: {},
		corrente_fase_v: {},
		
		posicao: {
			referencia: []
		},
		
		erac1oEst: {
			referencia: []
		},
		
		erac2oEst: {
			referencia: []
		},
		
		sl1oEst: {
			referencia: []
		},
		
		sl2oEst: {
			referencia: []
		},
		
		sl3oEst: {
			referencia: []
		},
		
		stEst: {
			referencia: []
		},
		
		grupo_pcmc: {
			referencia: []
		},
		
		instalacao: $routeParams.instalacao
	};

	$scope.instalacao = $routeParams.instalacao
	$scope.instalacoes = [];

	$scope.activeTab = 0;

	$scope.filtro = "";

	$scope.potencia_ativa = {};
	$scope.potencia_reativa = {};
	$scope.fator_potencia = {};
	
	$scope.corrente_fase_a = {};
	$scope.corrente_fase_b = {};
	$scope.corrente_fase_v = {};


	$scope.setActiveTab = function (index) {
		$scope.activeTab = index;
	};


	var clean = function (medida_analogica) {
		medida_analogica.aquisicao_automatica_error = null;
		medida_analogica.referencia_error = null;
		medida_analogica.fator_error = null;
		medida_analogica.valor_manual_error = null;
	};


	var validate_medida_analogica = function (dados, ngModel) {
		clean(ngModel);

		if(dados) {
			if(dados.aquisicao_automatica) {
				ngModel.aquisicao_automatica_error = dados.aquisicao_automatica[0];
			} else {
				ngModel.aquisicao_automatica_error = null;
			}

			if(dados.fator) {
				ngModel.fator_error = dados.fator[0];
			} else {
				ngModel.fator_error = null;
			}

			if(dados.referencia) {
				ngModel.referencia_error = dados.referencia[0];
			} else {
				ngModel.referencia_error = null;
			}

			if(dados.valor_manual) {
				ngModel.valor_manual_error = dados.valor_manual[0];
			} else {
				ngModel.valor_manual_error = null;
			}

			return ngModel.aquisicao_automatica_error || ngModel.fator_error || ngModel.referencia_error || ngModel.valor_manual_error;
		}

		return false;
	};

	var validate_medida_digital = function (dados, ngModel) {
		clean(ngModel);

		if(dados) {
			if(dados.aquisicao_automatica) {
				ngModel.aquisicao_automatica_error = dados.aquisicao_automatica[0];
			} else {
				ngModel.aquisicao_automatica_error = null;
			}

			if(dados.inversao) {
				ngModel.inversao_error = dados.inversao[0];
			} else {
				ngModel.inversao_error = null;
			}

			if(dados.referencia) {
				ngModel.referencia_error = dados.referencia[0];
			} else {
				ngModel.referencia_error = null;
			}

			if(dados.valor_manual) {
				ngModel.valor_manual_error = dados.valor_manual[0];
			} else {
				ngModel.valor_manual_error = null;
			}

			return ngModel.aquisicao_automatica_error || ngModel.inversao_error || ngModel.referencia_error || ngModel.valor_manual_error;
		}

		return false;
	};

	var validate = function (dados) {

		if(dados.codigo_operacional) {
			$scope.codigo_operacional_error = dados.codigo_operacional[0];
		} else {
			$scope.codigo_operacional_error = null;
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

		if(dados.tipo) {
			$scope.tipo_error = dados.tipo[0];
		} else {
			$scope.tipo_error = null;
		}

		if(dados.em_manutencao) {
			$scope.em_manutencao_error = dados.em_manutencao[0];
		} else {
			$scope.em_manutencao_error = null;
		}

		// Grupo PCMC
		if(validate_medida_digital(dados.grupo_pcmc, $scope.equipamento.grupo_pcmc)){
			$scope.setActiveTab(6);
		}
		
		// SEP de sobrecarga de Transformador
		if(validate_medida_digital(dados.stEst, $scope.equipamento.stEst)){
			$scope.setActiveTab(5);
		}		

		// SEP de sobrecarga de Linha
		if(validate_medida_digital(dados.sl1oEst, $scope.equipamento.sl1oEst)){
			$scope.setActiveTab(4);
		}
		if(validate_medida_digital(dados.sl2oEst, $scope.equipamento.sl2oEst)){
			$scope.setActiveTab(4);
		}
		if(validate_medida_digital(dados.sl3oEst, $scope.equipamento.sl3oEst)){
			$scope.setActiveTab(4);
		}

		// ERAC
		if(validate_medida_digital(dados.erac1oEst, $scope.equipamento.erac1oEst)){
			$scope.setActiveTab(3);
		}
		if(validate_medida_digital(dados.erac2oEst, $scope.equipamento.erac2oEst)){
			$scope.setActiveTab(3);
		}
		
		// Posição
		if(validate_medida_digital(dados.posicao, $scope.equipamento.posicao)){
			$scope.setActiveTab(2);
		}

		// Corrente Fase A
		if(validate_medida_analogica(dados.corrente_fase_a, $scope.equipamento.corrente_fase_a)){
			$scope.setActiveTab(1);
		}
		// Corrente Fase B
		if(validate_medida_analogica(dados.corrente_fase_b, $scope.equipamento.corrente_fase_b)){
			$scope.setActiveTab(1);
		}
		// Corrente Fase V
		if(validate_medida_analogica(dados.corrente_fase_v, $scope.equipamento.corrente_fase_v)){
			$scope.setActiveTab(1);
		}

		// Potência Ativa
		if(validate_medida_analogica(dados.potencia_ativa, $scope.equipamento.potencia_ativa)) {
			$scope.setActiveTab(0);
		}

		// Potência Reativa
		if(validate_medida_analogica(dados.potencia_reativa, $scope.equipamento.potencia_reativa)) {
			$scope.setActiveTab(0);
		}

		// Fator Potência
		if(validate_medida_analogica(dados.fator_potencia, $scope.equipamento.fator_potencia)) {
			$scope.setActiveTab(0);
		}

	};


	var redirectList = function () {
		//$window.location.href = "#/equipamentos-list/";
		$window.history.back();
	};


	$scope.carregarEquipamentosList = function (filtro) {

		url = "/api/equipamentos/";
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
				$scope.equipamentos = dados.results;
			})
			.error(function (dados) {

			});

	};

	$scope.carregarEquipamentosDetail = function (id) {

		/*
		 *  Este código deverá ser revisto futuramente, para seguirem as melhores práticas!
		 */

		var setarValorAnalogico = function (nome, ngModel) {
			if(ngModel) {
				$("[nome='" + nome + "'] [name='ngModel_aquisicao_automatica']").bootstrapSwitch('state', ngModel.aquisicao_automatica);
			}
		};

		/*
		 *  Este código deverá ser revisto futuramente, para seguirem as melhores práticas!
		 */

		var setarValorDigital = function (nome, ngModel) {
			if(ngModel) {
				$("[nome=" + nome + "] [name='ngModel_aquisicao_automatica']").bootstrapSwitch('state', ngModel.aquisicao_automatica);
				$("[nome=" + nome + "] [name='ngModel_inversao']").bootstrapSwitch('state', ngModel.inversao);
				$("[nome=" + nome + "] [name='ngModel_ref']").tokenfield('setTokens', ngModel.referencia);
			}
		};

		if(id === "null") {
			return;
		}

		url = "/api/equipamentos/";
		consulta = url + id + "/";

		$http.get(consulta)
			.success(function (dados) {
				$scope.equipamento = dados;

				setarValorAnalogico("potencia_ativa", $scope.equipamento.potencia_ativa);
				setarValorAnalogico("potencia_reativa", $scope.equipamento.potencia_reativa);
				setarValorAnalogico("fator_potencia", $scope.equipamento.fator_potencia);

				setarValorAnalogico("corrente_fase_a", $scope.equipamento.corrente_fase_a);
				setarValorAnalogico("corrente_fase_b", $scope.equipamento.corrente_fase_b);
				setarValorAnalogico("corrente_fase_v", $scope.equipamento.corrente_fase_v);

				setarValorDigital("posicao", $scope.equipamento.posicao);

				setarValorDigital("erac1oEst", $scope.equipamento.erac1oEst);
				setarValorDigital("erac2oEst", $scope.equipamento.erac2oEst);

				setarValorDigital("sl1oEst", $scope.equipamento.sl1oEst);
				setarValorDigital("sl2oEst", $scope.equipamento.sl2oEst);
				setarValorDigital("sl3oEst", $scope.equipamento.sl3oEst);

				setarValorDigital("stEst", $scope.equipamento.stEst);

				setarValorDigital("grupo_pcmc", $scope.equipamento.grupo_pcmc);

			})
			.error(function (dados) {

			});
	};

	$scope.salvarEquipamentosDetail = function (equipamento) {

		url = "/api/equipamentos/";

		$scope.codigo_operacional_error = null;
		$scope.descricao_error = null;
		$scope.observacao_error = null;
		$scope.instalacao_error = null;
		$scope.tipo_error = null;
		$scope.em_manutencao_error = null;


		if(!equipamento.instalacao) {
			equipamento.instalacao = null;
		}

		if(!equipamento.tipo) {
			equipamento.tipo = null;
		}

		if(!equipamento.observacao) {
			equipamento.observacao = null;
		}

		if(!equipamento.descricao) {
			equipamento.descricao = null;
		}


		if (equipamento && equipamento.id) {
			consulta = url + equipamento.id + "/";

			$http.put(consulta, equipamento)
				.success(function (dados) {
					$scope.equipamento = dados;
					//redirectList();
				})
				.error(function (dados) {
					validate(dados);
				});
		} else {
			$http.post(url, equipamento)
				.success(function (dados) {
					$scope.equipamento = dados;
					//redirectList();
				})
				.error(function (dados) {
					validate(dados);
			});
		}		

	};

	$scope.excluirEquipamentosDetail = function (equipamento) {
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-body").html("Deseja exluir registro?");
	

		$("#btnExcluir").unbind("click");
		$("#btnExcluir").click(function () {
			url = "/api/equipamentos/";

			if (equipamento && equipamento.id) {
				consulta = url + equipamento.id + "/";

				$http.delete(consulta, equipamento)
					.success(function (dados) {
						$scope.equipamento = dados;

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

	$scope.carregarTiposList = function () {
		url = "/api/equipamento-tipos/";

		$http.get(url)
			.success(function (dados) {
				$scope.tipos = dados;
			})
			.error(function (dados) {
				
			})
	};

	if($routeParams.id) {
		$scope.carregarInstalacoesList();
		$scope.carregarTiposList();
		$scope.carregarEquipamentosDetail($routeParams.id);
	} else {
		$scope.carregarEquipamentosList();
	}

     
});