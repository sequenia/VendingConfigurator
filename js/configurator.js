angular.module('ConfiguratorApp', ['ngDraggable']);

var ConfiguratorCtrl = function($scope) {
	$scope.modes = {
		machine: 0,
		shelf: 1
	};

	$scope.mode = $scope.modes.machine;

	$scope.currentMachine = {
		id: 0,
		name: "00-1"
	};

	$scope.holes = [
		{id: 0},
		{id: 1},
		{id: 2},
		{id: 3},
		{id: 4},
		{id: 5},
		{id: 6},
		{id: 7},
		{id: 8},
		{id: 9},
		{id: 10},
		{id: 11},
		{id: 12}
	];

	$scope.toolTypes = {
		shelf: 0,
		spiral: 1,
		doubleSpiral: 2,
		emptity: 3
	};

	$scope.machineTools = {
		shelf: {
			type: $scope.toolTypes.shelf,
			name: "Полка",
			toolClass: "shelf-tool",
			objectClass: "shelf",
			spiralPlaces: [
				{item: undefined},
				{item: undefined},
				{item: undefined},
				{item: undefined},
				{item: undefined},
				{item: undefined},
				{item: undefined},
				{item: undefined},
				{item: undefined},
				{item: undefined}
			]}
	};

	$scope.shelfTools = {
		spiral: {
			type: $scope.toolTypes.spiral,
			name: "Спираль",
			toolClass: "spiral-tool",
			objectClass: "spiral"
		},

		doubleSpiral: {
			type: $scope.toolTypes.doubleSpiral,
			name: "Двойная спираль",
			toolClass: "double-spiral-tool",
			objectClass: "double-spiral"
		}
	};

	$scope.emptity = {
		type: $scope.toolTypes.emptity
	};

	$scope.tools = $scope.machineTools;


	$scope.onShelfDragComplete = function($data, $event, hole) {
		console.log("onShelfDragComplete");
		hole.shelf = undefined;
	};

	$scope.onItemDragComplete = function($data, $event, spiralPlace) {
		console.log("onItemDragComplete");

		var dataType = spiralPlace.item.type;
		switch(dataType) {
			case $scope.toolTypes.spiral:
				// Грохаем соседние пустоты, если рядом с ними нет спиралей
				var index = spiralPlace.item.index;

				if(index > 0) {
					if(index == 1) {
						$scope.currentShelf.spiralPlaces[index - 1].item = undefined;
					} else {
						var leftItem = $scope.currentShelf.spiralPlaces[index - 2].item;
						if(leftItem) {
							if(leftItem.type == $scope.toolTypes.emptity) {
								$scope.currentShelf.spiralPlaces[index - 1].item = undefined;
							}
						} else {
							$scope.currentShelf.spiralPlaces[index - 1].item = undefined;
						}
					}
				}

				if(index < $scope.currentShelf.spiralPlaces.length - 1) {
					// СДЕЛАТЬ ПРАВИЛЬНОЕ УДАЛЕНИЕ ПУСТОТЫ!!!!!!!!!!!!!!!!!!!!
					$scope.currentShelf.spiralPlaces[index + 1].item = undefined;
				}
				break;
		}

		spiralPlace.item = undefined;
	};

	$scope.onToolDragComplete = function($data, $event) {
		console.log("onToolDragComplete");
	};

	$scope.onHoleDropComplete = function($data, $event, hole){
		console.log("onHoleDropComplete");

		var dataType = $data.type;

		switch(dataType) {
			case $scope.toolTypes.shelf:
				if(hole.shelf === undefined) {
					console.log("Shelf added");
					hole.shelf = $.extend(true, {}, $data);
				}
				break;
		}
	};

	$scope.onSpiralPlaceDropComplete = function($data, $event, index) {
		console.log("onSpiralPlaceDropComplete");

		var dataType = $data.type;
		var spiralPlace = $scope.currentShelf.spiralPlaces[index];

		switch(dataType) {
			case $scope.toolTypes.spiral:
				// Пихаем спираль только в том случае, если место пустое
				if(spiralPlace.item === undefined) {
					console.log("Spiral added");
					spiralPlace.item = $.extend(true, {}, $data);
					spiralPlace.item.index = index;
					// Заполняем соседние места пустотой, ибо туда больше нельзя втыкать спирали
					if(index > 0) {
						var emptity = $.extend(true, {}, $scope.emptity);
						$scope.currentShelf.spiralPlaces[index - 1].item = emptity;
					}

					if(index < $scope.currentShelf.spiralPlaces.length - 1) {
						var emptity = $.extend(true, {}, $scope.emptity);
						$scope.currentShelf.spiralPlaces[index + 1].item = emptity;
					}
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

	$scope.configureShelf = function(shelf) {
		$scope.currentShelf = shelf;
		$scope.mode = $scope.modes.shelf;
		$scope.tools = $scope.shelfTools;
	};

	$scope.configureMachine = function() {
		$scope.mode = $scope.modes.machine;
		$scope.tools = $scope.machineTools;
	};
};