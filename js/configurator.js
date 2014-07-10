angular.module('ConfiguratorApp', ['ngDraggable']);

var ConfiguratorCtrl = function($scope) {
//- ПЕРЕЧИСЛЕНИЯ ---------------------------------
	$scope.modes = {
		machine: 0,
		shelf: 1
	};

	$scope.toolTypes = {
		shelf: 0,
		spiral: 1,
		doubleSpiral: 2,
		emptity: 3
	};

	$scope.classes = {
		canDrop: "can-drop",
		canNotDrop: "can-not-drop",
		noClass: ""
	};

	//- РАБОЧИЕ ПЕРЕМЕННЫЕ ---------------------------------
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

//- ИНСТРУМЕНТЫ ---------------------------------
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

//- МЕТОДЫ ---------------------------------
	// Вызывается, когда полка отпускается
	$scope.onShelfDragComplete = function($data, $event, hole) {
		console.log("onShelfDragComplete");
		hole.shelf = undefined;
	};

	// Вызывается, когда отпускается любой элемент в конфигураторе полок
	$scope.onItemDragComplete = function($data, $event, spiralPlace) {
		console.log("onItemDragComplete");

		var dataType = spiralPlace.item.type;
		switch(dataType) {
			case $scope.toolTypes.spiral:
				$scope.deleteEmptinessesOnEdges(spiralPlace.item.index);
				break;
		}

		spiralPlace.item = undefined;
	};

	$scope.deleteEmptinessesOnEdges = function(index) {
		if(index > 0) {
			$scope.deleteLeftEmptity(index);
		}

		if(index < $scope.currentShelf.spiralPlaces.length - 1) {
			$scope.deleteRightEmptity(index);
		}
	};

	$scope.deleteLeftEmptity = function(index) {
		if(!$scope.isThereSomethingLeft(index)) {
			$scope.currentShelf.spiralPlaces[index - 1].item = undefined;
		}
	};

	$scope.deleteRightEmptity = function(index) {
		if(!$scope.isThereSomethingRight(index)) {
			$scope.currentShelf.spiralPlaces[index + 1].item = undefined;
		}
	};

	$scope.isThereSomethingRight = function(index) {
		var length = $scope.currentShelf.spiralPlaces.length;

		if(index == length - 2) {
			return false;
		}

		var rightItem = $scope.currentShelf.spiralPlaces[index + 2].item;
		if(rightItem === undefined) {
			return false;
		}

		if(rightItem.type == $scope.toolTypes.emptity) {
			return false;
		}

		return true;
	};

	$scope.isThereSomethingLeft = function(index) {
		if(index == 1) {
			return false;
		}

		var leftItem = $scope.currentShelf.spiralPlaces[index - 2].item;
		if(leftItem === undefined) {
			return false;
		}

		if(leftItem.type == $scope.toolTypes.emptity) {
			return false;
		}

		return true;
	};

	// Вызывается, когда отпускается инструмент
	$scope.onToolDragComplete = function($data, $event) {
		console.log("onToolDragComplete");
	};

	// Вызывается, когда на дырку падает инструмент
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

	// Вызывается, когда на место в полке падает инструмент
	$scope.onSpiralPlaceDropComplete = function($data, $event, index) {
		console.log("onSpiralPlaceDropComplete");

		var dataType = $data.type;
		var spiralPlace = $scope.currentShelf.spiralPlaces[index];

		switch(dataType) {
			case $scope.toolTypes.spiral:
				if(spiralPlace.item === undefined) {
					console.log("Spiral added");
					spiralPlace.item = $.extend(true, {}, $data);
					spiralPlace.item.index = index;
					$scope.addEmptinessesOnEdges(index);
				}
				break;
		}
	};

	$scope.addEmptinessesOnEdges = function(index) {
		if(index > 0) {
			$scope.currentShelf.spiralPlaces[index - 1].item = $.extend(true, {}, $scope.emptity);
		}

		if(index < $scope.currentShelf.spiralPlaces.length - 1) {
			$scope.currentShelf.spiralPlaces[index + 1].item = $.extend(true, {}, $scope.emptity);
		}
	};

	// Вызывается, когда что-то падает на мусор
	$scope.onGarbageDropComplete = function($data, $event, hole){
		console.log("onGarbageDropComplete");
	};

	// Вызывается при нажатии на инструмент или элемент
	$scope.onToolMouseDown = function(tool, index) {
		tool.mouseOver = true;

		switch(tool.type) {
			case $scope.toolTypes.spiral:
				$scope.tools.spiral.mouseOver = true;
				$scope.addClassesToPlaces(index);
				break;
		}
	};

	// Вызывается, когда инструмент отпускается
	$scope.onToolMouseUp = function(tool) {
		tool.mouseOver = false;

		switch(tool.type) {
			case $scope.toolTypes.spiral:
				$scope.tools.spiral.mouseOver = false;
				$scope.removeClassesFromPlaces();
				break;
		}
	};

	$scope.addClassesToPlaces = function(index) {
		angular.forEach($scope.currentShelf.spiralPlaces, function(spiralPlace, idx) {
			if(spiralPlace.item) {
				if( spiralPlace.item.type == $scope.toolTypes.emptity && idx == index -1 && !$scope.isThereSomethingLeft(index) ||
					spiralPlace.item.type == $scope.toolTypes.emptity && idx == index + 1 && !$scope.isThereSomethingRight(index) ||
					idx == index) {
					spiralPlace.class = $scope.classes.canDrop;
				} else {
					spiralPlace.class = $scope.classes.canNotDrop;
				}
			}
			else {
				spiralPlace.class = $scope.classes.canDrop;
			}
		});
	};

	$scope.removeClassesFromPlaces = function() {
		angular.forEach($scope.currentShelf.spiralPlaces, function(spiralPlace) {
			spiralPlace.class = $scope.classes.noClass;
		});
	};

	// Включает режим редактирования полки
	$scope.configureShelf = function(shelf) {
		$scope.currentShelf = shelf;
		$scope.mode = $scope.modes.shelf;
		$scope.tools = $scope.shelfTools;
	};

	// Включает режим редактирования автомата
	$scope.configureMachine = function() {
		$scope.mode = $scope.modes.machine;
		$scope.tools = $scope.machineTools;
	};
};