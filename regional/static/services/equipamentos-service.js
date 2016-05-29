angular.module("Voyage").factory('$equipamentosService', ['$http', function ($http) {
	var f = {};

	f.init = function (dados) {

		if(!dados) {
			dados = {};
		}

		if(!dados.potencia_ativa) {
			dados.potencia_ativa = {};
		}

		if(!dados.potencia_reativa) {
			dados.potencia_reativa = {};
		}

		if(!dados.fator_potencia) {
			dados.fator_potencia = {};
		}

		if(!dados.corrente_fase_a) {
			dados.corrente_fase_a = {};
		}

		if(!dados.corrente_fase_b) {
			dados.corrente_fase_b = {};
		}

		if(!dados.corrente_fase_v) {
			dados.corrente_fase_v = {};
		}

		if(!dados.posicao) {
			dados.posicao = {};
		}

		if(!dados.erac1oEst) {
			dados.erac1oEst = {};
		}

		if(!dados.erac2oEst) {
			dados.erac2oEst = {};
		}

		if(!dados.sl1oEst) {
			dados.sl1oEst = {};
		}

		if(!dados.sl2oEst) {
			dados.sl2oEst = {};
		}

		if(!dados.sl3oEst) {
			dados.sl3oEst = {};
		}

		if(!dados.stEst) {
			dados.stEst = {};
		}

		if(!dados.grupo_pcmc) {
			dados.grupo_pcmc = {};
		}

		return dados;
	};

	f.getList = function (instalacao, filtro, fn_success, fn_error) {
		url = "/api/equipamentos/";
		consulta = url;

		params = ""

		if(filtro) {
			params = '?filtro=' + filtro;			
		}

		if(instalacao) {
			if(params) {
				params += '&instalacao=' + instalacao;
			} else {
				params += '?instalacao=' + instalacao;				
			}
		}

		consulta += params;

		$http.get(consulta)
			.success(fn_success)
			.error(fn_error);
	};

	f.save = function (equipamento, fn_success, fn_error) {

		url = "/api/equipamentos/";

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
				.success(fn_success)
				.error(fn_error);
		} else {
			$http.post(url, equipamento)
				.success(fn_success)
				.error(fn_error);
		}
	};

	f.delete = function (equipamento, fn_success, fn_error) {
		url = "/api/equipamentos/";
		
		if (equipamento && equipamento.id) {
			consulta = url + equipamento.id + "/";

			$http.delete(consulta, equipamento)
				.success(fn_success)
				.error(fn_error);
		}	
	};

	f.getDetail = function (id, fn_success, fn_error) {
		url = "/api/equipamentos/";
		consulta = url + id + "/";

		if(id) {
			console.log('Hacker');
		}

		$http.get(consulta)
			.success(function (dados) {
				dados = f.init(dados);

				if(fn_success) {
					fn_success(dados);
				}

			})
			.error(function (dados) {
				if(fn_error) {
					fn_error(dados);
				}
			});

	};

	return f;

} ]);