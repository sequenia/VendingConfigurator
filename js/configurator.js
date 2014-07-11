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
		splitter: 2,
		singleMotor: 3,
		doubleMotor: 4
	};

	$scope.classes = {
		canDrop: "can-drop",
		canNotDrop: "can-not-drop",
		canNotDropButShow: "can-not-drop-but-show",
		noClass: ""
	};

//- РАБОЧИЕ ПЕРЕМЕННЫЕ ---------------------------------
	$scope.mode = $scope.modes.machine;
	$scope.placesOnShelf = 12;

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

//- ИНСТРУМЕНТЫ ---------------------------------
	$scope.machineTools = {
		shelf: {
			type: $scope.toolTypes.shelf,
			name: "Полка",
			toolClass: "shelf-tool",
			objectClass: "shelf",
			spiralPlaces: createPlaces($scope.placesOnShelf),
			motorPlaces: createPlaces($scope.placesOnShelf),
			spiralCollision: createCollision($scope.placesOnShelf),
			motorCollision: createCollision($scope.placesOnShelf)
		}
	};

	$scope.shelfTools = {
		spiral: {
			type: $scope.toolTypes.spiral,
			name: "Спираль",
			toolClass: "spiral-tool",
			objectClass: "spiral",
			leftOffset: 1,
			rightOffset: 1
		},

		splitter: {
			type: $scope.toolTypes.splitter,
			name: "Разделитель",
			toolClass: "splitter-tool",
			objectClass: "splitter",
			leftOffset: 0,
			rightOffset: 0
		},

		singleMotor: {
			type: $scope.toolTypes.singleMotor,
			name: "Мотор",
			toolClass: "single-motor-tool",
			objectClass: "single-motor",
			leftOffset: 1,
			rightOffset: 1
		},

		doubleMotor: {
			type: $scope.toolTypes.doubleMotor,
			name: "Двойной мотор",
			toolClass: "double-motor-tool",
			objectClass: "double-motor",
			leftOffset: 3,
			rightOffset: 3
		}
	};

	$scope.emptity = {
		type: $scope.toolTypes.emptity
	};

	$scope.tools = $scope.machineTools;

//- МЕТОДЫ ---------------------------------
	// Вызывается, когда полка отпускается
	$scope.onShelfDragComplete = function($data, $event, hole) {
		hole.shelf = undefined;
	};

	// Вызывается, когда отпускается инструмент
	$scope.onToolDragComplete = function($data, $event) {};

	// Вызывается, когда отпускается любой элемент в конфигураторе полок
	$scope.onItemDragComplete = function($data, $event, index) {
		if($data.type == $scope.toolTypes.spiral ||
			$data.type == $scope.toolTypes.splitter) {
			deleteSpiralFromShelf(index);
		} else {
			deleteMotorFromShelf(index);
		}
	};

	// Вызывается, когда на дырку падает инструмент
	$scope.onHoleDropComplete = function($data, $event, hole){
		var dataType = $data.type;

		switch(dataType) {
			case $scope.toolTypes.shelf:
				if(hole.shelf === undefined) {
					hole.shelf = $.extend(true, {}, $data);
				}
				break;
		}
	};

	// Вызывается, когда на место в полке падает инструмент
	$scope.onSpiralPlaceDropComplete = function($data, $event, index) {
		if($data.type == $scope.toolTypes.spiral ||
			$data.type == $scope.toolTypes.splitter) {
			if(canInsertItemToSpiralPlace($data, index)) {
				insertItemToSpiralPlace($data, index);
			}
		}
	};

	$scope.onMotorPlaceDropComplete = function($data, $event, index) {
		if($data.type == $scope.toolTypes.singleMotor ||
			$data.type == $scope.toolTypes.doubleMotor) {
			if(canInsertItemToMotorPlace($data, index)) {
				insertItemToMotorPlace($data, index);
			}
		}
	};

	function deleteSpiralFromShelf(index) {
		clearSpiralCollision(index);
		$scope.currentShelf.spiralPlaces[index].item = undefined;
	}

	function deleteMotorFromShelf(index) {
		clearMotorCollision(index);
		$scope.currentShelf.motorPlaces[index].item = undefined;
	}

	function clearSpiralCollision(index, collision) {
		var spiralCollision = collision || $scope.currentShelf.spiralCollision;

		var item = $scope.currentShelf.spiralPlaces[index].item;
		var collisionCount = spiralCollision.length;
		var collisionIndex = index * 2 + 1;

		for(var i = collisionIndex - item.leftOffset; i <= collisionIndex + item.rightOffset; i++) {
			if(i >= 0 && i < collisionCount) {
				spiralCollision[i] = false;
			}
		}
	}

	function clearMotorCollision(index, collision) {
		var motorCollision = collision || $scope.currentShelf.motorCollision;

		var item = $scope.currentShelf.motorPlaces[index].item;
		var collisionCount = motorCollision.length;
		var collisionIndex = index * 2 + 1;

		for(var i = collisionIndex - item.leftOffset; i <= collisionIndex + item.rightOffset; i++) {
			if(i >= 0 && i < collisionCount) {
				motorCollision[i] = false;
			}
		}
	}

	function canInsertItemToSpiralPlace(item, index, collision) {
		var spiralCollision = collision || $scope.currentShelf.spiralCollision;
		var collisionCount = spiralCollision.length;
		var collisionIndex = index * 2 + 1;

		var canInsert = true;
		for(var i = collisionIndex - item.leftOffset; i <= collisionIndex + item.rightOffset; i++) {
			if(i >= 0 && i < collisionCount) {
				if(spiralCollision[i]) {
					canInsert = false;
					break;
				}
			} else {
				canInsert = false;
				break;
			}
		}
		return canInsert;
	}

	function canInsertItemToMotorPlace(item, index, collision) {
		var motorCollision = collision || $scope.currentShelf.motorCollision;
		var collisionCount = motorCollision.length;
		var collisionIndex = index * 2 + 1;

		var canInsert = true;
		for(var i = collisionIndex - item.leftOffset; i <= collisionIndex + item.rightOffset; i++) {
			if(i >= 0 && i < collisionCount) {
				if(motorCollision[i]) {
					canInsert = false;
					break;
				}
			} else {
				canInsert = false;
				break;
			}
		}
		return canInsert;
	}

	function insertItemToSpiralPlace(item, index) {
		fillSpiralCollision(item, index);
		$scope.currentShelf.spiralPlaces[index].item = $.extend(true, {}, item);
	}

	function insertItemToMotorPlace(item, index) {
		fillMotorCollision(item, index);
		$scope.currentShelf.motorPlaces[index].item = $.extend(true, {}, item);
	}

	function fillSpiralCollision(item, index) {
		var collisionCount = $scope.currentShelf.spiralCollision.length;
		var collisionIndex = index * 2 + 1;

		for(var i = collisionIndex - item.leftOffset; i <= collisionIndex + item.rightOffset; i++) {
			if(i >= 0 && i < collisionCount) {
				$scope.currentShelf.spiralCollision[i] = true;
			}
		}
	}

	function fillMotorCollision(item, index) {
		var collisionCount = $scope.currentShelf.motorCollision.length;
		var collisionIndex = index * 2 + 1;

		for(var i = collisionIndex - item.leftOffset; i <= collisionIndex + item.rightOffset; i++) {
			if(i >= 0 && i < collisionCount) {
				$scope.currentShelf.motorCollision[i] = true;
			}
		}
	}

	// Вызывается, когда что-то падает на мусор
	$scope.onGarbageDropComplete = function($data, $event, hole) {};

	// Вызывается при нажатии на инструмент или элемент
	$scope.onToolMouseDown = function(tool, index) {
		tool.mouseOver = true;

		switch(tool.type) {
			case $scope.toolTypes.spiral:
				$scope.tools.spiral.mouseOver = true;
				showFreeSpiralPlaces(tool, index);
				$scope.currentTool = $scope.tools.spiral;
				break;

			case $scope.toolTypes.splitter:
				$scope.tools.splitter.mouseOver = true;
				showFreeSpiralPlaces(tool, index);
				$scope.currentTool = $scope.tools.splitter;
				break;

			case $scope.toolTypes.doubleMotor:
				$scope.tools.doubleMotor.mouseOver = true;
				showFreeMotorPlaces(tool, index);
				$scope.currentTool = $scope.tools.doubleMotor;
				break;

			case $scope.toolTypes.singleMotor:
				$scope.tools.singleMotor.mouseOver = true;
				showFreeMotorPlaces(tool, index);
				$scope.currentTool = $scope.tools.singleMotor;
				break;
		}
	};

	// Вызывается, когда инструмент отпускается
	$scope.onToolMouseUp = function(tool) {
		tool.mouseOver = false;

		switch(tool.type) {
			case $scope.toolTypes.spiral:
				$scope.tools.spiral.mouseOver = false;
				removeClassesFromPlaces();
				break;

			case $scope.toolTypes.splitter:
				$scope.tools.splitter.mouseOver = false;
				removeClassesFromPlaces();
				break;

			case $scope.toolTypes.doubleMotor:
				$scope.tools.doubleMotor.mouseOver = false;
				removeClassesFromPlaces();
				break;

			case $scope.toolTypes.singleMotor:
				$scope.tools.singleMotor.mouseOver = false;
				removeClassesFromPlaces();
				break;
		}
	};

	function showFreeSpiralPlaces(tool, index) {
		var collisionWithoutItem;
		if(index !== undefined) {
			collisionWithoutItem = [];
			for(var i = 0; i < $scope.currentShelf.spiralCollision.length; i++) {
				collisionWithoutItem.push($scope.currentShelf.spiralCollision[i]);
			}
			clearSpiralCollision(index, collisionWithoutItem);
		}

		angular.forEach($scope.currentShelf.spiralPlaces, function(spiralPlace, idx) {
			if(canInsertItemToSpiralPlace(tool, idx, collisionWithoutItem)) {
				spiralPlace.class = $scope.classes.canDrop;
			} else {
				spiralPlace.class = $scope.classes.canNotDrop;
			}
		});
	}

	function showFreeMotorPlaces(tool, index) {
		var collisionWithoutItem;
		if(index !== undefined) {
			collisionWithoutItem = [];
			for(var i = 0; i < $scope.currentShelf.motorCollision.length; i++) {
				collisionWithoutItem.push($scope.currentShelf.motorCollision[i]);
			}
			clearMotorCollision(index, collisionWithoutItem);
		}

		angular.forEach($scope.currentShelf.motorPlaces, function(motorPlace, idx) {
			if(canInsertItemToMotorPlace(tool, idx, collisionWithoutItem)) {
				motorPlace.class = $scope.classes.canDrop;
			} else {
				motorPlace.class = $scope.classes.canNotDrop;
			}
		});
	}

	function removeClassesFromPlaces() {
		angular.forEach($scope.currentShelf.spiralPlaces, function(spiralPlace) {
			spiralPlace.class = $scope.classes.noClass;
		});

		angular.forEach($scope.currentShelf.motorPlaces, function(motorPlace) {
			motorPlace.class = $scope.classes.noClass;
		});
	}

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

	function createPlaces(count) {
		var places = [];
		for(var i = 0; i < count; i++) {
			places.push({item: undefined});
		}
		return places;
	}

	function createCollision(count) {
		var collision = [];
		for(var i = 0; i < count * 2 + 1; i++) {
			collision.push(false);
		}
		return collision;
	}
};