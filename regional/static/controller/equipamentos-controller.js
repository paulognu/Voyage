angular.module("Voyage").controller("equipamentosCtrl", function ($scope, $http, $routeParams, $window) {
	$scope.equipamentos = [];
	$scope.equipamento = {
		potencia_ativa: {},
		potencia_reativa: {},
		corrente_fase_a: {},
		corrente_fase_b: {},
		corrente_fase_v: {},
		posicao: {},
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

		// Potência Ativa

		if(dados.potencia_ativa) {
			if(dados.potencia_ativa.aquisicao_automatica) {
				$scope.potencia_ativa.aquisicao_automatica_error = dados.potencia_ativa.aquisicao_automatica[0];
			} else {
				$scope.potencia_ativa.aquisicao_automatica_error = null;
			}

			if(dados.potencia_ativa.fator) {
				$scope.potencia_ativa.fator_error = dados.potencia_ativa.fator[0];
			} else {
				$scope.potencia_ativa.fator_error = null;
			}

			if(dados.potencia_ativa.referencia) {
				$scope.potencia_ativa.referencia_error = dados.potencia_ativa.referencia[0];
			} else {
				$scope.potencia_ativa.referencia_error = null;
			}

			if(dados.potencia_ativa.valor_manual) {
				$scope.potencia_ativa.valor_manual_error = dados.potencia_ativa.valor_manual[0];
			} else {
				$scope.potencia_ativa.valor_manual_error = null;
			}
		}

		// Potência Reativa

		if(dados.potencia_reativa) {
			if(dados.potencia_reativa.aquisicao_automatica) {
				$scope.potencia_reativa.aquisicao_automatica_error = dados.potencia_reativa.aquisicao_automatica[0];
			} else {
				$scope.potencia_reativa.aquisicao_automatica_error = null;
			}

			if(dados.potencia_reativa.fator) {
				$scope.potencia_reativa.fator_error = dados.potencia_reativa.fator[0];
			} else {
				$scope.potencia_reativa.fator_error = null;
			}

			if(dados.potencia_reativa.referencia) {
				$scope.potencia_reativa.referencia_error = dados.potencia_reativa.referencia[0];
			} else {
				$scope.potencia_reativa.referencia_error = null;
			}

			if(dados.potencia_reativa.valor_manual) {
				$scope.potencia_reativa.valor_manual_error = dados.potencia_reativa.valor_manual[0];
			} else {
				$scope.potencia_reativa.valor_manual_error = null;
			}
		}


		// Corrente Fase A

		if(dados.corrente_fase_a) {
			if(dados.corrente_fase_a.aquisicao_automatica) {
				$scope.corrente_fase_a.aquisicao_automatica_error = dados.corrente_fase_a.aquisicao_automatica[0];
			} else {
				$scope.corrente_fase_a.aquisicao_automatica_error = null;
			}

			if(dados.corrente_fase_a.fator) {
				$scope.corrente_fase_a.fator_error = dados.corrente_fase_a.fator[0];
			} else {
				$scope.corrente_fase_a.fator_error = null;
			}

			if(dados.corrente_fase_a.referencia) {
				$scope.corrente_fase_a.referencia_error = dados.corrente_fase_a.referencia[0];
			} else {
				$scope.corrente_fase_a.referencia_error = null;
			}

			if(dados.corrente_fase_a.valor_manual) {
				$scope.corrente_fase_a.valor_manual_error = dados.corrente_fase_a.valor_manual[0];
			} else {
				$scope.corrente_fase_a.valor_manual_error = null;
			}
		}


		// Corrente Fase B

		if(dados.corrente_fase_b) {
			if(dados.corrente_fase_b.aquisicao_automatica) {
				$scope.corrente_fase_b.aquisicao_automatica_error = dados.corrente_fase_b.aquisicao_automatica[0];
			} else {
				$scope.corrente_fase_b.aquisicao_automatica_error = null;
			}

			if(dados.corrente_fase_b.fator) {
				$scope.corrente_fase_b.fator_error = dados.corrente_fase_b.fator[0];
			} else {
				$scope.corrente_fase_b.fator_error = null;
			}

			if(dados.corrente_fase_b.referencia) {
				$scope.corrente_fase_b.referencia_error = dados.corrente_fase_b.referencia[0];
			} else {
				$scope.corrente_fase_b.referencia_error = null;
			}

			if(dados.corrente_fase_b.valor_manual) {
				$scope.corrente_fase_b.valor_manual_error = dados.corrente_fase_b.valor_manual[0];
			} else {
				$scope.corrente_fase_b.valor_manual_error = null;
			}
		}


		// Corrente Fase V

		if(dados.corrente_fase_v) {
			if(dados.corrente_fase_v.aquisicao_automatica) {
				$scope.corrente_fase_v.aquisicao_automatica_error = dados.corrente_fase_v.aquisicao_automatica[0];
			} else {
				$scope.corrente_fase_v.aquisicao_automatica_error = null;
			}

			if(dados.corrente_fase_v.fator) {
				$scope.corrente_fase_v.fator_error = dados.corrente_fase_v.fator[0];
			} else {
				$scope.corrente_fase_v.fator_error = null;
			}

			if(dados.corrente_fase_v.referencia) {
				$scope.corrente_fase_v.referencia_error = dados.corrente_fase_v.referencia[0];
			} else {
				$scope.corrente_fase_v.referencia_error = null;
			}

			if(dados.corrente_fase_v.valor_manual) {
				$scope.corrente_fase_v.valor_manual_error = dados.corrente_fase_v.valor_manual[0];
			} else {
				$scope.corrente_fase_v.valor_manual_error = null;
			}
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

		console.log(consulta);


		$http.get(consulta)
			.success(function (dados) {
				$scope.equipamentos = dados.results;
			})
			.error(function (dados) {

			});

	};

	$scope.carregarEquipamentosDetail = function (id) {

		if(id === "null") {
			return;
		}

		url = "/api/equipamentos/";
		consulta = url + id + "/";

		$http.get(consulta)
			.success(function (dados) {
				$scope.equipamento = dados;				
				
				if($scope.equipamento.potencia_ativa) {
					$("[name='potencia_ativa_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.potencia_ativa.aquisicao_automatica);
				}

				if($scope.equipamento.potencia_reativa) {
					$("[name='potencia_reativa_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.potencia_reativa.aquisicao_automatica);
				}

				if($scope.equipamento.corrente_fase_b) {
					$("[name='corrente_fase_b_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.corrente_fase_b.aquisicao_automatica);
				}

				if($scope.equipamento.corrente_fase_v) {
					$("[name='corrente_fase_v_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.corrente_fase_v.aquisicao_automatica);
				}

				if($scope.equipamento.posicao) {
					$("[name='posicao_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.posicao.aquisicao_automatica);
					$("[name='posicao_inversao']").bootstrapSwitch('state', $scope.equipamento.posicao.inversao);
				}
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


		clean($scope.potencia_ativa);
		clean($scope.potencia_reativa);
		clean($scope.corrente_fase_a);
		clean($scope.corrente_fase_b);
		clean($scope.corrente_fase_v);

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
					redirectList();
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

	$scope.setActiveTab = function (index) {
		$scope.activeTab = index;
	};

	if($routeParams.id) {
		$scope.carregarInstalacoesList();
		$scope.carregarTiposList();
		$scope.carregarEquipamentosDetail($routeParams.id);
	} else {
		$scope.carregarEquipamentosList();
	}

	$("[name='potencia_ativa_aquisicao_automatica']").bootstrapSwitch({
	    onText: 'Automatico', 
	    offText: 'Manual',
	    size: 'small',
	    onInit: function (event, state) {

	    },
	    onSwitchChange: function (event, state) {
	    	$scope.equipamento.potencia_ativa.aquisicao_automatica = state;
	    }
	  });

	$("[name='potencia_reativa_aquisicao_automatica']").bootstrapSwitch({
	    onText: 'Automatico', 
	    offText: 'Manual',
	    size: 'small',
	    onInit: function (event, state) {

	    },
	    onSwitchChange: function (event, state) {
	    	$scope.equipamento.potencia_reativa.aquisicao_automatica = state;
	    }
	  });

	$("[name='corrente_fase_a_aquisicao_automatica']").bootstrapSwitch({
	    onText: 'Automatico', 
	    offText: 'Manual',
	    size: 'small',
	    onInit: function (event, state) {

	    },
	    onSwitchChange: function (event, state) {
	    	if(!$scope.equipamento.corrente_fase_a) {
	    		$scope.equipamento.corrente_fase_a = {};
	    	}	    	$scope.equipamento.corrente_fase_a.aquisicao_automatica = state;
	    }
	  });

	$("[name='corrente_fase_b_aquisicao_automatica']").bootstrapSwitch({
	    onText: 'Automatico', 
	    offText: 'Manual',
	    size: 'small',
	    onInit: function (event, state) {

	    },
	    onSwitchChange: function (event, state) {
	    	if(!$scope.equipamento.corrente_fase_b) {
	    		$scope.equipamento.corrente_fase_b = {};
	    	}	    	$scope.equipamento.corrente_fase_b.aquisicao_automatica = state;
	    }
	  });

	$("[name='corrente_fase_v_aquisicao_automatica']").bootstrapSwitch({
	    onText: 'Automatico', 
	    offText: 'Manual',
	    size: 'small',
	    onInit: function (event, state) {

	    },
	    onSwitchChange: function (event, state) {
	    	if(!$scope.equipamento.corrente_fase_v) {
	    		$scope.equipamento.corrente_fase_v = {};
	    	}
	    	$scope.equipamento.corrente_fase_v.aquisicao_automatica = state;
	    }
	  });

	$("[name='posicao_aquisicao_automatica']").bootstrapSwitch({
	    onText: 'Automatico', 
	    offText: 'Manual',
	    size: 'small',
	    state: true,
	    onInit: function (event, state) {

	    },
	    onSwitchChange: function (event, state) {
	    	if(!$scope.equipamento.posicao) {
	    		$scope.equipamento.posicao = {};
	    	}
	    	$scope.equipamento.posicao.aquisicao_automatica = state;
	    }
	  });

	$("[name='posicao_inversao']").bootstrapSwitch({
	    onText: 'SIM', 
	    offText: 'NÃO',
	    size: 'small',
	    state: false,
	    onInit: function (event, state) {

	    },
	    onSwitchChange: function (event, state) {
	    	if(!$scope.equipamento.posicao) {
	    		$scope.equipamento.posicao = {};
	    	}
	    	$scope.equipamento.posicao.inversao = state;
	    	console.log($scope.equipamento.posicao.inversao);
	    }
	  });
});