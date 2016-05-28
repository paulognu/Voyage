angular.module('Voyage').factory('$colaboradoresService', ['$http', function ($http) {
	f = {};

	f.getList = function (divisao, filtro, fn_success, fn_error) {
		url = "/api/colaboradores/";
		consulta = url;

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
				if(fn_success) {
					fn_success(dados);
				}
			})
			.error(function (dados) {
				if(fn_error) {
					fn_error(dados);
				}			});
	};

	f.getDetail = function (id, fn_success, fn_error) {

		if(id === "null") {
			return;
		}

		url = "/api/colaboradores/";
		consulta = url + id + "/";

		$http.get(consulta)
			.success(function (dados) {
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

	f.save = function (colaborador, fn_success, fn_error ) {
		url = "/api/colaboradores/";

		if (colaborador && colaborador.id) {

			consulta = url + colaborador.id + "/";

			$http.put(consulta, colaborador)
				.success(fn_success)
				.error(fn_error);

		} else {			
			$http.post(url, colaborador)
				.success(fn_success)
				.error(fn_error);
		}
	};

	f.delete = function (colaborador, fn_success, fn_error) {
		url = "/api/colaboradores/";

		if (colaborador && colaborador.id) {
			consulta = url + colaborador.id + "/";

			$http.delete(consulta, colaborador)
				.success(fn_success)
				.error(fn_error);
		}		
	}

	return f;
} ]);