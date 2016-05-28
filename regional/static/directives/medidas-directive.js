angular.module("Voyage").directive("medidaAnalogica", [function () {
	return {
		restrict: 'AE',
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