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

		// Fator Potência

		if(dados.fator_potencia) {
			if(dados.fator_potencia.aquisicao_automatica) {
				$scope.fator_potencia.aquisicao_automatica_error = dados.fator_potencia.aquisicao_automatica[0];
			} else {
				$scope.fator_potencia.aquisicao_automatica_error = null;
			}

			if(dados.fator_potencia.fator) {
				$scope.fator_potencia.fator_error = dados.fator_potencia.fator[0];
			} else {
				$scope.fator_potencia.fator_error = null;
			}

			if(dados.fator_potencia.referencia) {
				$scope.fator_potencia.referencia_error = dados.fator_potencia.referencia[0];
			} else {
				$scope.fator_potencia.referencia_error = null;
			}

			if(dados.fator_potencia.valor_manual) {
				$scope.fator_potencia.valor_manual_error = dados.fator_potencia.valor_manual[0];
			} else {
				$scope.fator_potencia.valor_manual_error = null;
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


				if(dados.posicao)  {
					$("[name='posicao_ref']").tokenfield('setTokens', dados.posicao.referencia);
				} else {					
					dados.posicao.referencia = [];
				}

				if(dados.erac1oEst)  {
					$("[name='erac1oEst_ref']").tokenfield('setTokens', dados.erac1oEst.referencia);
				} else {
					dados.erac1oEst = {
						referencia: []
					};
				}

				if(dados.erac2oEst)  {
					$("[name='erac2oEst_ref']").tokenfield('setTokens', dados.erac2oEst.referencia);
				} else {
					dados.erac2oEst = {
						referencia: []
					};
				}

				if(dados.sl1oEst)  {
					$("[name='sl1oEst_ref']").tokenfield('setTokens', dados.sl1oEst.referencia);
				} else {
					dados.sl1oEst = {
						referencia: []
					};
				}

				if(dados.sl2oEst)  {
					$("[name='sl2oEst_ref']").tokenfield('setTokens', dados.sl2oEst.referencia);
				} else {
					dados.sl2oEst = {
						referencia: []
					};
				}

				if(dados.sl3oEst)  {
					$("[name='sl3oEst_ref']").tokenfield('setTokens', dados.sl3oEst.referencia);
				} else {
					dados.sl3oEst = {
						referencia: []
					};
				}

				if(dados.stEst)  {
					$("[name='stEst_ref']").tokenfield('setTokens', dados.stEst.referencia);
				} else {
					dados.stEst = {
						referencia: []
					};
				}

				if(dados.grupo_pcmc)  {
					$("[name='grupo_pcmc_ref']").tokenfield('setTokens', dados.grupo_pcmc.referencia);
				} else {
					dados.grupo_pcmc = {
						referencia: []
					};
				}
				
				if($scope.equipamento.potencia_ativa) {
					$("[name='potencia_ativa_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.potencia_ativa.aquisicao_automatica);
				} else {
					dados.potencia_ativa = {
						referencia: []
					};
				}

				if($scope.equipamento.potencia_reativa) {
					$("[name='potencia_reativa_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.potencia_reativa.aquisicao_automatica);
				} else {
					dados.potencia_reativa = {
						referencia: []
					};
				}

				if($scope.equipamento.corrente_fase_a) {
					$("[name='corrente_fase_a_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.corrente_fase_a.aquisicao_automatica);
				} else {
					dados.corrente_fase_a = {
						referencia: []
					};
				}

				if($scope.equipamento.corrente_fase_b) {
					$("[name='corrente_fase_b_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.corrente_fase_b.aquisicao_automatica);
				} else {
					dados.corrente_fase_b = {
						referencia: []
					};
				}

				if($scope.equipamento.corrente_fase_v) {
					$("[name='corrente_fase_v_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.corrente_fase_v.aquisicao_automatica);
				} else {
					dados.corrente_fase_v = {
						referencia: []
					};
				}

				if($scope.equipamento.posicao) {
					$("[name='posicao_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.posicao.aquisicao_automatica);
					$("[name='posicao_inversao']").bootstrapSwitch('state', $scope.equipamento.posicao.inversao);
				}

				if($scope.equipamento.erac1oEst) {
					$("[name='erac1oEst_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.erac1oEst.aquisicao_automatica);
					$("[name='erac1oEst_inversao']").bootstrapSwitch('state', $scope.equipamento.erac1oEst.inversao);
				}

				if($scope.equipamento.erac2oEst) {
					$("[name='erac2oEst_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.erac2oEst.aquisicao_automatica);
					$("[name='erac2oEst_inversao']").bootstrapSwitch('state', $scope.equipamento.erac2oEst.inversao);
				}

				if($scope.equipamento.sl1oEst) {
					$("[name='sl1oEst_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.sl1oEst.aquisicao_automatica);
					$("[name='sl1oEst_inversao']").bootstrapSwitch('state', $scope.equipamento.sl1oEst.inversao);
				}

				if($scope.equipamento.sl2oEst) {
					$("[name='sl2oEst_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.sl2oEst.aquisicao_automatica);
					$("[name='sl2oEst_inversao']").bootstrapSwitch('state', $scope.equipamento.sl2oEst.inversao);
				}

				if($scope.equipamento.sl3oEst) {
					$("[name='sl3oEst_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.sl3oEst.aquisicao_automatica);
					$("[name='sl3oEst_inversao']").bootstrapSwitch('state', $scope.equipamento.sl3oEst.inversao);
				}

				if($scope.equipamento.stEst) {
					$("[name='stEst_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.stEst.aquisicao_automatica);
					$("[name='stEst_inversao']").bootstrapSwitch('state', $scope.equipamento.stEst.inversao);
				}

				if($scope.equipamento.grupo_pcmc) {
					$("[name='grupo_pcmc_aquisicao_automatica']").bootstrapSwitch('state', $scope.equipamento.grupo_pcmc.aquisicao_automatica);
					$("[name='grupo_pcmc_inversao']").bootstrapSwitch('state', $scope.equipamento.grupo_pcmc.inversao);
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

	var setMedidaAnalogica = function (name, obj) {
		$("[name='" + name + "']").bootstrapSwitch({
		    onText: 'Automatico', 
		    offText: 'Manual',
		    size: 'small',
		    onInit: function (event, state) {

		    },
		    onSwitchChange: function (event, state) {
		    	obj.aquisicao_automatica = state;
		    	console.log(obj);
		    }
		  });
	};

	var setPosicaoInverso = function (name, obj) {
		$("[name='" + name + "']").bootstrapSwitch({
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
		    	obj.inversao = state;
		    }
		  });
	};

	// $("[name='posicao_inversao']").bootstrapSwitch({
	//     onText: 'SIM', 
	//     offText: 'NÃO',
	//     size: 'small',
	//     state: false,
	//     onInit: function (event, state) {

	//     },
	//     onSwitchChange: function (event, state) {
	//     	if(!$scope.equipamento.posicao) {
	//     		$scope.equipamento.posicao = {};
	//     	}
	//     	$scope.equipamento.posicao.inversao = state;
	//     }
	//   });


	var setAutocompleteAnalogicaRef = function (name) {
		$("[name='" + name + "']").autocomplete({
			source: function (request, response) {
					$http.get('/bdh/pas_r/?filtro=' + $(this)[0].term).success(function (dados) {
						teste = [];
						dados.results.forEach(function (item) {
							if(item) {
								//teste.push(item.id.trim() + ' (' + item.nome.trim() + ')');
								teste.push({
									label: item.id.trim() + ' (' + item.nome.trim() + ')',
									value: item.id.trim()
								});
							}
						})
						response(teste);
					});
			},
			delay: 100,
			change: function (event, ui) {
				//$scope.equipamento.potencia_ativa.referencia = ui.item;
			}
		});
	};

	var setAutocompleteDigitalRef = function (name) {
		$("[name='" + name + "']").autocomplete();
		$("[name='" + name + "']").tokenfield({
			autocomplete: {
				source: function (request, response) {
						$http.get('/bdh/pds_r/?filtro=' + $(this)[0].term).success(function (dados) {
							teste = [];
							dados.results.forEach(function (item) {
								if(item) {
									//teste.push(item.id.trim() + ' (' + item.nome.trim() + ')');
									teste.push({
										label: item.id.trim() + ' (' + item.nome.trim() + ')',
										value: item.id.trim()
									});
								}
							})
							response(teste);
						});
				},
				delay: 100,
				change: function (event, ui) {
					//$scope.equipamento.potencia_ativa.referencia = ui.item;
				}
			}
		});
	};

	setMedidaAnalogica('potencia_ativa_aquisicao_automatica', $scope.equipamento.potencia_ativa);
	setMedidaAnalogica('potencia_reativa_aquisicao_automatica', $scope.equipamento.potencia_reativa);
	setMedidaAnalogica('fator_potencia_aquisicao_automatica', $scope.equipamento.fator_potencia);
	setMedidaAnalogica('corrente_fase_a_aquisicao_automatica', $scope.equipamento.corrente_fase_a);
	setMedidaAnalogica('corrente_fase_b_aquisicao_automatica', $scope.equipamento.corrente_fase_b);
	setMedidaAnalogica('corrente_fase_v_aquisicao_automatica', $scope.equipamento.corrente_fase_v);
	
	setAutocompleteAnalogicaRef('potencia_ativa_ref');
	setAutocompleteAnalogicaRef('potencia_reativa_ref');
	setAutocompleteAnalogicaRef('fator_potencia_ref');
	setAutocompleteAnalogicaRef('corrente_fase_a_ref');
	setAutocompleteAnalogicaRef('corrente_fase_b_ref');
	setAutocompleteAnalogicaRef('corrente_fase_v_ref');

	setMedidaAnalogica('posicao_aquisicao_automatica', $scope.equipamento.posicao);
	setPosicaoInverso('posicao_inversao', $scope.equipamento.posicao);

	setMedidaAnalogica('erac1oEst_aquisicao_automatica', $scope.equipamento.erac1oEst);
	setPosicaoInverso('erac1oEst_inversao', $scope.equipamento.erac1oEst);

	setMedidaAnalogica('erac2oEst_aquisicao_automatica', $scope.equipamento.erac2oEst);
	setPosicaoInverso('erac2oEst_inversao', $scope.equipamento.erac2oEst);

	setMedidaAnalogica('sl1oEst_aquisicao_automatica', $scope.equipamento.sl1oEst);
	setPosicaoInverso('sl1oEst_inversao', $scope.equipamento.sl1oEst);

	setMedidaAnalogica('sl2oEst_aquisicao_automatica', $scope.equipamento.sl2oEst);
	setPosicaoInverso('sl2oEst_inversao', $scope.equipamento.sl2oEst);

	setMedidaAnalogica('sl3oEst_aquisicao_automatica', $scope.equipamento.sl3oEst);
	setPosicaoInverso('sl3oEst_inversao', $scope.equipamento.sl3oEst);

	setMedidaAnalogica('stEst_aquisicao_automatica', $scope.equipamento.stEst);
	setPosicaoInverso('stEst_inversao', $scope.equipamento.stEst);

	setMedidaAnalogica('grupo_pcmc_aquisicao_automatica', $scope.equipamento.grupo_pcmc);
	setPosicaoInverso('grupo_pcmc_inversao', $scope.equipamento.grupo_pcmc);


	/*
	 * Posição Abterto/Fechado
	 */

	var adicionarPosicaoRef = function (e) {
		var some_extern = $scope.equipamento.posicao.referencia.some(function (item) {
			return item === e.attrs.value;
		});

		var some_intern = $(this).val().split(',').some(function (item) {
			return item.trim() === e.attrs.value.trim();
		});

		if(!some_extern) {
			$scope.equipamento.posicao.referencia.push(e.attrs.value);
		}

		return !(some_intern && some_extern);
	};

	var removerPosicaoRef = function (e) {
		$scope.equipamento.posicao.referencia = $scope.equipamento.posicao.referencia.filter(function (item) {
			return e.attrs.value !== item;
		});
	};

	setAutocompleteDigitalRef('posicao_ref');
	$("[name='posicao_ref']")
      .on('tokenfield:createtoken', adicionarPosicaoRef)
      .on('tokenfield:removetoken', removerPosicaoRef);


	/*
	 * SEP de sobrecarga de Linha 1oEst
	 */

	var adicionarSl1oEstRef = function (e) {
		var some_extern = $scope.equipamento.sl1oEst.referencia.some(function (item) {
			return item === e.attrs.value;
		});

		var some_intern = $(this).val().split(',').some(function (item) {
			return item.trim() === e.attrs.value.trim();
		});

		if(!some_extern) {
			$scope.equipamento.sl1oEst.referencia.push(e.attrs.value);
		}

		return !(some_intern && some_extern);
	};

	var removerSl1oEstRef = function (e) {
		$scope.equipamento.sl1oEst.referencia = $scope.equipamento.sl1oEst.referencia.filter(function (item) {
			return e.attrs.value !== item;
		});
	};

	setAutocompleteDigitalRef('sl1oEst_ref');
	$("[name='sl1oEst_ref']")
      .on('tokenfield:createtoken', adicionarSl1oEstRef)
      .on('tokenfield:removetoken', removerSl1oEstRef);


	/*
	 * SEP de sobrecarga de Linha 2oEst
	 */

	var adicionarSl2oEstRef = function (e) {
		var some_extern = $scope.equipamento.sl2oEst.referencia.some(function (item) {
			return item === e.attrs.value;
		});

		var some_intern = $(this).val().split(',').some(function (item) {
			return item.trim() === e.attrs.value.trim();
		});

		if(!some_extern) {
			$scope.equipamento.sl2oEst.referencia.push(e.attrs.value);
		}

		return !(some_intern && some_extern);
	};

	var removerSl2oEstRef = function (e) {
		$scope.equipamento.sl2oEst.referencia = $scope.equipamento.sl2oEst.referencia.filter(function (item) {
			return e.attrs.value !== item;
		});
	};

	setAutocompleteDigitalRef('sl2oEst_ref');
	$("[name='sl2oEst_ref']")
      .on('tokenfield:createtoken', adicionarSl2oEstRef)
      .on('tokenfield:removetoken', removerSl2oEstRef);


	/*
	 * SEP de sobrecarga de Linha 3oEst
	 */

	var adicionarSl3oEstRef = function (e) {
		var some_extern = $scope.equipamento.sl3oEst.referencia.some(function (item) {
			return item === e.attrs.value;
		});

		var some_intern = $(this).val().split(',').some(function (item) {
			return item.trim() === e.attrs.value.trim();
		});

		if(!some_extern) {
			$scope.equipamento.sl3oEst.referencia.push(e.attrs.value);
		}

		return !(some_intern && some_extern);
	};

	var removerSl3oEstRef = function (e) {
		$scope.equipamento.sl3oEst.referencia = $scope.equipamento.sl3oEst.referencia.filter(function (item) {
			return e.attrs.value !== item;
		});
	};

	setAutocompleteDigitalRef('sl3oEst_ref');
	$("[name='sl3oEst_ref']")
      .on('tokenfield:createtoken', adicionarSl3oEstRef)
      .on('tokenfield:removetoken', removerSl3oEstRef);


	/*
	 * ERAC 1oEst
	 */

	var adicionarerac1oEstRef = function (e) {
		var some_extern = $scope.equipamento.erac1oEst.referencia.some(function (item) {
			return item === e.attrs.value;
		});

		var some_intern = $(this).val().split(',').some(function (item) {
			return item.trim() === e.attrs.value.trim();
		});

		if(!some_extern) {
			$scope.equipamento.erac1oEst.referencia.push(e.attrs.value);
		}

		return !(some_intern && some_extern);
	};

	var removererac1oEstRef = function (e) {
		$scope.equipamento.erac1oEst.referencia = $scope.equipamento.erac1oEst.referencia.filter(function (item) {
			return e.attrs.value !== item;
		});
	};

	setAutocompleteDigitalRef('erac1oEst_ref');
	$("[name='erac1oEst_ref']")
      .on('tokenfield:createtoken', adicionarerac1oEstRef)
      .on('tokenfield:removetoken', removererac1oEstRef);      


	/*
	 * ERAC 2oEst
	 */

	var adicionarerac2oEstRef = function (e) {
		var some_extern = $scope.equipamento.erac2oEst.referencia.some(function (item) {
			return item === e.attrs.value;
		});

		var some_intern = $(this).val().split(',').some(function (item) {
			return item.trim() === e.attrs.value.trim();
		});

		if(!some_extern) {
			$scope.equipamento.erac2oEst.referencia.push(e.attrs.value);
		}

		return !(some_intern && some_extern);
	};

	var removererac2oEstRef = function (e) {
		$scope.equipamento.erac2oEst.referencia = $scope.equipamento.erac2oEst.referencia.filter(function (item) {
			return e.attrs.value !== item;
		});
	};

	setAutocompleteDigitalRef('erac2oEst_ref');
	$("[name='erac2oEst_ref']")
      .on('tokenfield:createtoken', adicionarerac2oEstRef)
      .on('tokenfield:removetoken', removererac2oEstRef);      


	/*
	 * ST
	 */

	var adicionarstEstRef = function (e) {
		var some_extern = $scope.equipamento.stEst.referencia.some(function (item) {
			return item === e.attrs.value;
		});

		var some_intern = $(this).val().split(',').some(function (item) {
			return item.trim() === e.attrs.value.trim();
		});

		if(!some_extern) {
			$scope.equipamento.stEst.referencia.push(e.attrs.value);
		}

		return !(some_intern && some_extern);
	};

	var removerstEstRef = function (e) {
		$scope.equipamento.stEst.referencia = $scope.equipamento.stEst.referencia.filter(function (item) {
			return e.attrs.value !== item;
		});
	};

	setAutocompleteDigitalRef('stEst_ref');
	$("[name='stEst_ref']")
      .on('tokenfield:createtoken', adicionarstEstRef)
      .on('tokenfield:removetoken', removerstEstRef);      


	/*
	 * Grupo do PCMC
	 */

	var adicionargrupo_pcmcRef = function (e) {
		var some_extern = $scope.equipamento.grupo_pcmc.referencia.some(function (item) {
			return item === e.attrs.value;
		});

		var some_intern = $(this).val().split(',').some(function (item) {
			return item.trim() === e.attrs.value.trim();
		});

		if(!some_extern) {
			$scope.equipamento.grupo_pcmc.referencia.push(e.attrs.value);
		}

		return !(some_intern && some_extern);
	};

	var removergrupo_pcmcRef = function (e) {
		$scope.equipamento.grupo_pcmc.referencia = $scope.equipamento.grupo_pcmc.referencia.filter(function (item) {
			return e.attrs.value !== item;
		});
	};

	setAutocompleteDigitalRef('grupo_pcmc_ref');
	$("[name='grupo_pcmc_ref']")
      .on('tokenfield:createtoken', adicionargrupo_pcmcRef)
      .on('tokenfield:removetoken', removergrupo_pcmcRef);      
});