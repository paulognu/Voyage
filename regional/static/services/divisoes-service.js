angular.module('Voyage').factory('$divisoesService', [ '$http' , function ($http) {
	var f = {};
	
	f.getList = function (callback) {
		var result = null;

		$http.get('/api/divisoes/')
			.success(function (dados) {
				if(callback) {
					callback(dados);
				}
			})
			.error(function (error) {
				// error
			});

		return result;
	}

	return f;
} ]);