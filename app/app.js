var app = angular.module('plunker', []);
app.controller('MainCtrl', function ($scope, $http) {
	$scope.questionnaireOpenned = false;
	$scope.currentQuestionNumber = 0;
	$scope.currentPhotoNumber = 0;
	$scope.carouselLength = 3;
	$http.get("./data.json").then(function (response) {
		$scope.questionnaire = response.data.questionnaire;
		console.log($scope.questionnaire);
	});

	$scope.onAnswerImage = function (question, answer) {
		alert('Question text: ' + question.text + '. Answer value: ' + answer.value);
	};
}).directive("owlCarousel", function () {
	return {
		restrict: 'E',
		transclude: false,
		link: function (scope) {
			scope.initCarousel = function (element) {
				// provide any default options you want
				var defaultOptions = {};
				var customOptions = scope.$eval($(element).attr('data-options'));
				// combine the two options objects
				for (var key in customOptions) {
					defaultOptions[key] = customOptions[key];
				}
				// init carousel
				$(element).owlCarousel(defaultOptions);
			};
		}
	};
}).directive('owlCarouselItem', [function () {
	return {
		restrict: 'A',
		transclude: false,
		link: function (scope, element) {
			// wait for the last item in the ng-repeat then call init
			if (scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
}]);