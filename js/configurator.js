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
		{id: 10}
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
			motorCollision: createCollision($scope.placesOnShelf),
			count: 5
		}
	};

	$scope.shelfTools = {
		spiral: {
			type: $scope.toolTypes.spiral,
			name: "Спираль",
			toolClass: "spiral-tool",
			objectClass: "spiral",
			machineClass: "machine-spiral",
			leftOffset: 1,
			rightOffset: 1,
			count: 15
		},

		splitter: {
			type: $scope.toolTypes.splitter,
			name: "Разделитель",
			toolClass: "splitter-tool",
			objectClass: "splitter",
			machineClass: "machine-splitter",
			leftOffset: 0,
			rightOffset: 0,
			count: 25
		},

		singleMotor: {
			type: $scope.toolTypes.singleMotor,
			name: "Мотор",
			toolClass: "single-motor-tool",
			objectClass: "single-motor",
			machineClass: "machine-single-motor",
			leftOffset: 1,
			rightOffset: 1,
			count: 14
		},

		doubleMotor: {
			type: $scope.toolTypes.doubleMotor,
			name: "Двойной мотор",
			toolClass: "double-motor-tool",
			objectClass: "double-motor",
			machineClass: "machine-double-motor",
			leftOffset: 3,
			rightOffset: 3,
			count: 6
		}
	};

	$scope.tools = $scope.machineTools;

//- МЕТОДЫ ---------------------------------
	// Вызывается, когда полка отпускается
	$scope.onShelfDragComplete = function($data, $event, hole) {
		hole.shelf = undefined;
	};

	// Вызывается, когда отпускается инструмент
	$scope.onToolDragComplete = function($data, $event) {
		$data.count--;
	};

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
				} else {
					$scope.machineTools.shelf.count++;
					restoreTools($data);
				}
				break;
		}
	};

	// Вызывается, когда на место в полке падает инструмент
	$scope.onSpiralPlaceDropComplete = function($data, $event, index) {
		if($data.type == $scope.toolTypes.spiral || $data.type == $scope.toolTypes.splitter) {
			if(canInsertItemToPlace($data, index, $scope.currentShelf.spiralCollision)) {
				insertItemToPlace($data, index);
			} else {
				getTool($data.type).count++;
			}
		}
	};

	$scope.onMotorPlaceDropComplete = function($data, $event, index) {
		if($data.type == $scope.toolTypes.singleMotor || $data.type == $scope.toolTypes.doubleMotor) {
			if(canInsertItemToPlace($data, index, $scope.currentShelf.motorCollision)) {
				insertItemToPlace($data, index);
			} else {
				getTool($data.type).count++;
			}
		}
	};

	// Вызывается, когда что-то падает на мусор
	$scope.onGarbageDropComplete = function($data, $event, hole) {
		var tool = getTool($data.type);
		tool.count++;
		if($data.type == $scope.toolTypes.shelf) {
			restoreTools($data);
		}
	};

	function deleteSpiralFromShelf(index) {
		clearCollision(index, $scope.currentShelf.spiralPlaces[index].item, $scope.currentShelf.spiralCollision);
		$scope.currentShelf.spiralPlaces[index].item = undefined;
	}

	function deleteMotorFromShelf(index) {
		clearCollision(index, $scope.currentShelf.motorPlaces[index].item, $scope.currentShelf.motorCollision);
		$scope.currentShelf.motorPlaces[index].item = undefined;
	}

	function clearCollision(index, item, collision) {
		var collisionCount = collision.length;
		var collisionIndex = index * 2 + 1;

		for(var i = collisionIndex - item.leftOffset; i <= collisionIndex + item.rightOffset; i++) {
			if(i >= 0 && i < collisionCount) {
				collision[i] = false;
			}
		}
	}

	function canInsertItemToPlace(item, index, collision) {
		var collisionCount = collision.length;
		var collisionIndex = index * 2 + 1;

		// Проверяем свои коллизии
		var canInsert = true;
		for(var i = collisionIndex - item.leftOffset; i <= collisionIndex + item.rightOffset; i++) {
			if(i >= 0 && i < collisionCount) {
				if(collision[i]) {
					canInsert = false;
					break;
				}
			} else {
				canInsert = false;
				break;
			}
		}

		// Проверяем чужие коллизии
		if(canInsert) {
			canInsert = checkOppositeCollision(item, index);
		}

		return canInsert;
	}

	function checkOppositeCollision(item, index) {
		var canInsert;

		var collisionIndex = index * 2 + 1;

		switch(item.type) {
			case $scope.toolTypes.splitter:
				canInsert = !$scope.currentShelf.motorCollision[collisionIndex];
				break;

			case $scope.toolTypes.spiral:
				var singleMotorOnPlace = isItem(index, $scope.toolTypes.singleMotor);
				var leftDoubleMotorOnPlace = isItem(index - 1, $scope.toolTypes.doubleMotor);
				var rightDoubleMotorOnPlace = isItem(index + 1, $scope.toolTypes.doubleMotor);

				canInsert = (!$scope.currentShelf.motorCollision[collisionIndex - 1] &&
							!$scope.currentShelf.motorCollision[collisionIndex] &&
							!$scope.currentShelf.motorCollision[collisionIndex + 1]) ||
							singleMotorOnPlace ||
							leftDoubleMotorOnPlace ||
							rightDoubleMotorOnPlace;
				break;

			case $scope.toolTypes.singleMotor:
				var threeEmptySpaces = !$scope.currentShelf.spiralCollision[collisionIndex - 1] &&
						!$scope.currentShelf.spiralCollision[collisionIndex] &&
						!$scope.currentShelf.spiralCollision[collisionIndex + 1];

				var spiralOnPlace = isItem(index, $scope.toolTypes.spiral);

				canInsert = threeEmptySpaces || spiralOnPlace;
				break;

			case $scope.toolTypes.doubleMotor:
				var emptyOnCenter = !$scope.currentShelf.spiralCollision[collisionIndex];
				var emptyOrSpiralLeft = isItem(index - 1, $scope.toolTypes.spiral) ||
					($scope.currentShelf.spiralPlaces[index - 1].item === undefined &&
						!$scope.currentShelf.spiralCollision[collisionIndex - 3]);
				var emptyOrSpiralRight = isItem(index + 1, $scope.toolTypes.spiral) ||
					($scope.currentShelf.spiralPlaces[index + 1].item === undefined &&
						!$scope.currentShelf.spiralCollision[collisionIndex + 3]);

				canInsert = emptyOnCenter && emptyOrSpiralLeft && emptyOrSpiralRight;
				break;

			default:
				canInsert = true;
		}

		return canInsert;
	}

	function isItem(index, type) {
		if(index < 0 || index > $scope.currentShelf.spiralPlaces.length - 1) {
			return false;
		}

		var item;

		if(type == $scope.toolTypes.spiral || type == $scope.toolTypes.splitter) {
			item = $scope.currentShelf.spiralPlaces[index].item;
		} else {
			item = $scope.currentShelf.motorPlaces[index].item;
		}

		var _isItem = false;

		if(item !== undefined) {
			if(item.type == type) {
				_isItem = true;
			}
		}

		return _isItem;
	}

	function insertItemToPlace(item, index) {
		if(item.type == $scope.toolTypes.spiral ||
			item.type == $scope.toolTypes.splitter) {
			fillItemCollision(item, index, $scope.currentShelf.spiralCollision);
			$scope.currentShelf.spiralPlaces[index].item = $.extend(true, {}, item);
		} else {
			fillItemCollision(item, index, $scope.currentShelf.motorCollision);
			$scope.currentShelf.motorPlaces[index].item = $.extend(true, {}, item);
		}
	}

	function fillItemCollision(item, index, collision) {
		var collisionCount = collision.length;
		var collisionIndex = index * 2 + 1;

		for(var i = collisionIndex - item.leftOffset; i <= collisionIndex + item.rightOffset; i++) {
			if(i >= 0 && i < collisionCount) {
				collision[i] = true;
			}
		}
	}

	// Вызывается при нажатии на инструмент или элемент
	$scope.onToolMouseDown = function(tool, index) {
		var curTool = getTool(tool.type);

		curTool.mouseOver = true;
		if(tool.type == $scope.toolTypes.spiral || tool.type == $scope.toolTypes.splitter) {
			showFreePlaces(tool, index, $scope.currentShelf.spiralCollision, $scope.currentShelf.spiralPlaces);
		}
		if(tool.type == $scope.toolTypes.singleMotor || tool.type == $scope.toolTypes.doubleMotor) {
			showFreePlaces(tool, index, $scope.currentShelf.motorCollision, $scope.currentShelf.motorPlaces);
		}
		$scope.currentTool = curTool;

		if(index !== undefined) {
			$scope.toStorage = "to-storage";
		}
	};

	// Вызывается, когда инструмент отпускается
	$scope.onToolMouseUp = function(tool) {
		var curTool = getTool(tool.type);
		curTool.mouseOver = false;
		if(tool.type != $scope.toolTypes.shelf) {
			removeClassesFromPlaces();
		}
		$scope.toStorage = "";
	};

	function showFreePlaces(tool, index, collision, places) {
		var collisionWithoutItem;
		if(index !== undefined) {
			collisionWithoutItem = [];
			for(var i = 0; i < collision.length; i++) {
				collisionWithoutItem.push(collision[i]);
			}
			clearCollision(index, places[index].item, collisionWithoutItem);
		}

		angular.forEach(places, function(place, idx) {
			if(canInsertItemToPlace(tool, idx, collisionWithoutItem || collision)) {
				place.class = $scope.classes.canDrop;
			} else {
				place.class = $scope.classes.canNotDrop;
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

	function getTool(toolType) {
		var tool;

		switch(toolType) {
			case $scope.toolTypes.shelf:
				tool = $scope.machineTools.shelf;
				break;

			case $scope.toolTypes.spiral:
				tool = $scope.shelfTools.spiral;
				break;

			case $scope.toolTypes.splitter:
				tool = $scope.shelfTools.splitter;
				break;

			case $scope.toolTypes.singleMotor:
				tool = $scope.shelfTools.singleMotor;
				break;

			case $scope.toolTypes.doubleMotor:
				tool = $scope.shelfTools.doubleMotor;
				break;
		}

		return tool;
	}

	function restoreTools(shelf) {
		angular.forEach(shelf.spiralPlaces, function(place) {
			if(place.item) {
				getTool(place.item.type).count++;
			}
		});

		angular.forEach(shelf.motorPlaces, function(place) {
			if(place.item) {
				getTool(place.item.type).count++;
			}
		});
	}
};