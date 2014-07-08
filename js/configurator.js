angular.module('ConfiguratorApp', ['ngDraggable']);

var ConfiguratorCtrl = function($scope) {
	$scope.currentMachine = {
		id: 0,
		name: "00-1"
	};

	$scope.holes = [{
		id: 0
	}, {
		id: 1
	}, {
		id: 2
	}, {
		id: 3
	}, {
		id: 4
	}, {
		id: 5
	}, {
		id: 6
	}, {
		id: 7
	}, {
		id: 8
	}, {
		id: 9
	}, {
		id: 10
	}, {
		id: 11
	}, {
		id: 12
	}];

	$scope.toolTypes = {
		shelf: 0
	};

	$scope.tools = {
		shelf: {
			type: $scope.toolTypes.shelf,
			name: "Полка",
			toolClass: "shelf-tool",
			objectClass: "shelf"
		}
	};


	$scope.onShelfDragComplete = function($data, $event, hole) {
		console.log("onShelfDragComplete");
		hole.shelf = undefined;
	};

	$scope.onToolDragComplete = function($data, $event) {
		console.log("onToolDragComplete");
	};

	$scope.onHoleDropComplete = function($data, $event, hole){
		console.log("onHoleDropComplete");

		dataType = $data.type;

		switch(dataType) {
			case $scope.toolTypes.shelf:
				if(hole.shelf === undefined) {
					console.log("Shelf added");
					hole.shelf = $data;
				}
				break;
		}
	};

	$scope.onGarbageDropComplete = function($data, $event, hole){
		console.log("onGarbageDropComplete");
	};

	$scope.onToolMouseDown = function(tool) {
		tool.mouseOver = true;
	};

	$scope.onToolMouseUp = function(tool) {
		tool.mouseOver = false;
	};
};