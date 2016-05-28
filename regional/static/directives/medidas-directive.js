angular.module("Voyage").directive("medidaAnalogica", [function () {
	return {
		restrict: 'E',
		replace: true,
		translude: false,
		templateUrl: '/static/directives-templates/medida-analogica.html',
		scope: {
			titulo: '@', 
			nome: '@',
			ngModel: '='
		},
		link: function (scope, element, attributes) {

			var obj = $("[nome='"+ scope.nome +"'] [name='ngModel_aquisicao_automatica']");
			 
			if(!scope.ngModel) {
				scope.ngModel = {
					aquisicao_automatica: true,
					referencia: null
				}
			}

			obj.bootstrapSwitch({
				onText: 'Automatico', 
			    offText: 'Manual',
			    size: 'small',
			    onInit: function (event, state) {

			    },
			    onSwitchChange: function (event, state) {
			    	scope.ngModel.aquisicao_automatica = state;
			    }
			  });

			//obj.bootstrapSwitch('state', scope.ngModel.aquisicao_automatica);

		}

}} ]);


angular.module("Voyage").directive("medidaDigital", ['$http', function ($http) {
	return {
		restrict: 'E',
		replace: true,
		translude: false,
		templateUrl: '/static/directives-templates/medida-digital.html',
		scope: {
			titulo: '@', 
			nome: '@',
			ngModel: '='
		},
		link: function (scope, element, attributes) {

			if(!scope.ngModel) {
				scope.ngModel = {
					aquisicao_automatica: true,
					inversao: false,
					referencia: [],
					posicao: {}
				}
			}

			var adicionarPosicaoRef = function (e) {
				var some_extern = scope.ngModel.referencia.some(function (item) {
					return item === e.attrs.value;
				});

				var some_intern = $(this).val().split(',').some(function (item) {
					return item.trim() === e.attrs.value.trim();
				});

				if(!some_extern) {
					scope.ngModel.referencia.push(e.attrs.value);
				}

				return !(some_intern && some_extern);
			};

			var removerPosicaoRef = function (e) {
				scope.ngModel.referencia = scope.ngModel.referencia.filter(function (item) {
					return e.attrs.value !== item;
				});
			};


			var objAquisicao = $("[nome='"+ scope.nome +"'] [name='ngModel_aquisicao_automatica']");
			var objInversao = $("[nome='"+ scope.nome +"'] [name='ngModel_inversao']");
			var objRef = $("[nome='"+ scope.nome +"'] [name='ngModel_ref']");

			objAquisicao.bootstrapSwitch({
				onText: 'Automatico', 
			    offText: 'Manual',
			    size: 'small',
			    onInit: function (event, state) {

			    },
			    onSwitchChange: function (event, state) {
			    	scope.ngModel.aquisicao_automatica = state;
			    }
			  });

			objInversao.bootstrapSwitch({
				onText: 'Sim', 
			    offText: 'Não',
			    size: 'small',
			    status: false,
			    onInit: function (event, state) {

			    },
			    onSwitchChange: function (event, state) {
			    	scope.ngModel.inversao = state;
			    }
			  });

			objRef.autocomplete();
			objRef.tokenfield({
				autocomplete: {
					source: function (request, response) {
							$http.get('/bdh/pds_r/?filtro=' + $(this)[0].term).success(function (dados) {
								teste = [];
								dados.results.forEach(function (item) {
									if(item) {										
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
						//scope.ngModel.potencia_ativa.referencia = ui.item;
					}
				}
			}).on('tokenfield:createtoken', adicionarPosicaoRef).on('tokenfield:removetoken', removerPosicaoRef);

			//obj.bootstrapSwitch('state', scope.ngModel.aquisicao_automatica);

		}

}} ]);