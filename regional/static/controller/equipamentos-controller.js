angular.module("Voyage").controller("equipamentosCtrl", ["$scope", "$http", "$routeParams", "$window", "$equipamentosService", function ($scope, $http, $routeParams, $window, $equipamentos) {
	$scope.equipamentos = [];

	$scope.instalacao = $routeParams.instalacao
	$scope.instalacoes = [];

	$scope.activeTab = 0;
	$scope.detailTab = 0;

	$scope.filtro = "";

	$scope.potencia_ativa = {};
	$scope.potencia_reativa = {};
	$scope.fator_potencia = {};
	
	$scope.corrente_fase_a = {};
	$scope.corrente_fase_b = {};
	$scope.corrente_fase_v = {};

	$scope.lista_tmp = [{}];

	$scope.item = {};

	$scope.addProtecao = function () {
		if(!$scope.equipamento.protecao) {
			$scope.equipamento.protecao = [];
		}

		$scope.protecao = {};
		$scope.equipamento.protecao.push($scope.protecao);
		$scope.setDetailTab(1);
	};

	$scope.editProtecao = function (index) {
		$scope.protecao = $scope.equipamento.protecao[index];
		$scope.setDetailTab(1);
	}

	$scope.addProtecaoItem = function () {
		//if($scope.protecao && $scope.protecao.referencias) {
		//	$scope.protecao.referencias = [];
		//}

		$scope.item = {};
		$scope.protecao.referencias.push($scope.item);
	};

	$scope.removeProtecao = function (protecao_index) {
		$scope.equipamento.protecao.splice(protecao_index, 1);
	};

	$scope.removeProtecaoItem = function (potecao_index, item_index) {
		$scope.equipamento.protecao[potecao_index].referencias.splice(item_index, 1);
	};

	$scope.getProtecaoItems = function (protecao_item) {
		if(protecao_item && protecao_item.referencias && protecao_item.referencias.length > 0) {
			return protecao_item.referencias;
		}

		return $scope.lista_tmp;
	}

	$scope.setActiveTab = function (index) {
		$scope.activeTab = index;
	};

	$scope.setDetailTab = function (index) {
		$scope.detailTab = index;
	};


	var cleanAnalogico = function (medida_analogica) {
		medida_analogica.aquisicao_automatica_error = null;
		medida_analogica.referencia_error = null;
		medida_analogica.fator_error = null;
		medida_analogica.valor_manual_error = null;
	};

	var cleanDigital = function (medida_digital) {
	   medida_digital.descricao_error = null;
	   medida_digital.valor_verdadeiro_error = null;
	   medida_digital.valor_falso_error = null;
	   medida_digital.aquisicao_automatica_error = null;
	   medida_digital.inversao_error = null;
	   medida_digital.referencia_error = null;
	   medida_digital.valor_manual_error = null;
	};


	var validate_medida_analogica = function (dados, ngModel) {
		cleanAnalogico(ngModel);

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
		cleanDigital(ngModel);

		if(dados) {
			if(dados.descricao) {
				ngModel.descricao_error = dados.descricao[0];
			} else {
				ngModel.descricao_error = null;
			}

			if(dados.valor_verdadeiro) {
				ngModel.valor_verdadeiro_error = dados.valor_verdadeiro[0];
			} else {
				ngModel.valor_verdadeiro_error = null;
			}

			if(dados.valor_falso) {
				ngModel.valor_falso_error = dados.valor_falso[0];
			} else {
				ngModel.valor_falso_error = null;
			}

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

			return ngModel.descricao_error	  		  || 
				   ngModel.valor_verdadeiro_error	  || 
				   ngModel.valor_falso_error 		  || 
				   ngModel.aquisicao_automatica_error || 
				   ngModel.inversao_error 			  || 
				   ngModel.referencia_error 		  || 
				   ngModel.valor_manual_error;
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
		if(validate_medida_digital(dados.sl1oEst, $scope.equipamento.sl1oEst) ||
		   validate_medida_digital(dados.sl2oEst, $scope.equipamento.sl2oEst) ||
		   validate_medida_digital(dados.sl3oEst, $scope.equipamento.sl3oEst))
		{
			$scope.setActiveTab(4);
		}

		// ERAC
		if(validate_medida_digital(dados.erac1oEst, $scope.equipamento.erac1oEst) ||
		   validate_medida_digital(dados.erac2oEst, $scope.equipamento.erac2oEst)){
			$scope.setActiveTab(3);
		}
		
		// Posição
		if(validate_medida_digital(dados.posicao, $scope.equipamento.posicao)){
			$scope.setActiveTab(2);
		}

		
		if(validate_medida_analogica(dados.corrente_fase_a, $scope.equipamento.corrente_fase_a)  ||  // Corrente Fase A
		   validate_medida_analogica(dados.corrente_fase_b, $scope.equipamento.corrente_fase_b)  ||  // Corrente Fase B
		   validate_medida_analogica(dados.corrente_fase_v, $scope.equipamento.corrente_fase_v))     // Corrente Fase V
		{ 
			$scope.setActiveTab(1);
		}

		
		if(validate_medida_analogica(dados.potencia_ativa, $scope.equipamento.potencia_ativa)     ||  // Potência Ativa		
		   validate_medida_analogica(dados.potencia_reativa, $scope.equipamento.potencia_reativa) ||  // Potência Reativa
		   validate_medida_analogica(dados.fator_potencia, $scope.equipamento.fator_potencia))        // Fator Potência
		{
			$scope.setActiveTab(0);
		}

	};


	var redirectList = function () {
		//$window.location.href = "#/equipamentos-list/";
		$window.history.back();
	};


	$scope.carregarEquipamentosList = function (filtro) {

		$equipamentos.getList($routeParams.instalacao, filtro, 

			/* Success */
			function (dados) {
				$scope.equipamentos = dados.results;
			},

			/* Error */
			function (dados) {

			}

		);

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
			} else {

			}
		};

		if(id === "null") {
			$scope.equipamento = $equipamentos.init(null);
			$scope.equipamento.instalacao = $routeParams.instalacao;
			return;
		}

		$equipamentos.getDetail(id, 
			/* Success */
			function (dados) {

				$scope.equipamento = dados;

				if(!$scope.equipamento.instalacao && $routeParams.instalacao) {
					$scope.equipamento.instalacao = $routeParams.instalacao;
				}

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
			},

			/* Error */
			function (dados) {
				
			}
		);

	};

	$scope.salvarEquipamentosDetail = function (equipamento) {

		$scope.codigo_operacional_error = null;
		$scope.descricao_error = null;
		$scope.observacao_error = null;
		$scope.instalacao_error = null;
		$scope.tipo_error = null;
		$scope.em_manutencao_error = null;


		$equipamentos.save(equipamento, 

			/* Success */
			function (dados) {
				$scope.equipamento = dados;
			},

			/* Error */
			function (dados) {
				console.log(dados);
				validate(dados);
			}
		);

	};

	$scope.excluirEquipamentosDetail = function (equipamento) {
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-title").html("Excluir");
		$("#dialog .modal-body").html("Deseja exluir registro?");
	

		$("#btnExcluir").unbind("click");
		$("#btnExcluir").click(function () {

			$equipamentos.delete(equipamento, 
				/* Success */
				function (dados) {
					redirectList();
				},

				/* Error */
				function (dados) {
					validate(equipamento);
				}
			);

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

     
} ]);