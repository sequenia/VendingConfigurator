angular.module('ConfiguratorApp', ['ngDraggable']);

var ConfiguratorCtrl = function($scope) {
//- ПЕРЕЧИСЛЕНИЯ И КОНСТАНТЫ ---------------------------------
	$scope.placesOnShelf = 12; // Количество мест в полке

	// Режимы показа
	$scope.modes = {
		machine: 0,
		shelf: 1
	};

	$scope.toolTypes = {
		shelf: 0,
		spiral: 1,
		splitter: 2,
		singleMotor: 3,
		doubleMotor: 4,
		ski: 5
	};

	$scope.classes = {
		canDrop: "can-drop",
		canNotDrop: "can-not-drop",
		canNotDropButShow: "can-not-drop-but-show",
		noClass: ""
	};

//- ИНСТРУМЕНТЫ ---------------------------------
	/*******************
	 * Инструмент может иметь следующие поля: (могут варьироваться от инструмента и инструменту)
	 * tool: {
	 *     type: $scope.toolTypes.any, // Тип инструмента
	 *     name: "Инструмент",         // Имя, отображаемое на панели инструментов
	 *     toolClass: "className1",    // Класс, отвечающий за внешний вид на панели инструментов
	 *     objectClass: "className2",  // Класс, отвечающий за внешний вид в основном режиме показа
	 *     anyClass: "className3",     // Класс, отвечающий за внешний вид в других режимах
	 *     count: 10,                  // Доступное количество
	 *     spiralPlaces: [],           // Массив спиралей (Только у полки)
	 *     motorPlaces: [],            // Массив моторов (Только у полки)
	 *     spiralCollision: [],        // Массив коллизий для спиралей (только у полки)
	 *     motorCollision: [],         // Массив коллизий для моторов (только у полки)
	 *     leftOffset: 1,              // Левая граница элемента (необходимо для рассчета коллизий)
	 *     rightOffset: 1,             // Левая граница элемента (необходимо для рассчета коллизий)
	 *     modes: [0, 1]               // Режимы, в которых доступен данный инструмент
	 * }
	 ******************/

	$scope.allTools = {
		shelf: {
			type: $scope.toolTypes.shelf,
			name: "Полка",
			toolClass: "shelf-tool",
			objectClass: "shelf",
			spiralPlaces: createPlaces($scope.placesOnShelf),
			motorPlaces: createPlaces($scope.placesOnShelf),
			spiralCollision: createCollision($scope.placesOnShelf),
			motorCollision: createCollision($scope.placesOnShelf),
			count: 5,
			mode: $scope.modes.machine
		},

		spiral: {
			type: $scope.toolTypes.spiral,
			name: "Спираль",
			toolClass: "spiral-tool",
			objectClass: "spiral",
			machineClass: "machine-spiral",
			leftOffset: 1,
			rightOffset: 1,
			count: 15,
			mode: $scope.modes.shelf
		},

		splitter: {
			type: $scope.toolTypes.splitter,
			name: "Разделитель",
			toolClass: "splitter-tool",
			objectClass: "splitter",
			machineClass: "machine-splitter",
			leftOffset: 0,
			rightOffset: 0,
			count: 25,
			mode: $scope.modes.shelf
		},

		singleMotor: {
			type: $scope.toolTypes.singleMotor,
			name: "Мотор",
			toolClass: "single-motor-tool",
			objectClass: "single-motor",
			machineClass: "machine-single-motor",
			leftOffset: 1,
			rightOffset: 1,
			count: 14,
			mode: $scope.modes.shelf
		},

		doubleMotor: {
			type: $scope.toolTypes.doubleMotor,
			name: "Двойной мотор",
			toolClass: "double-motor-tool",
			objectClass: "double-motor",
			machineClass: "machine-double-motor",
			leftOffset: 3,
			rightOffset: 3,
			count: 6,
			mode: $scope.modes.shelf
		},

		ski: {
			type: $scope.toolTypes.ski,
			name: "Лыжа",
			toolClass: "ski-tool",
			objectClass: "ski",
			machineClass: "machine-ski",
			count: 15,
			mode: $scope.modes.shelf
		}
	};

//- РАБОЧИЕ ПЕРЕМЕННЫЕ ---------------------------------
	setMode($scope.modes.machine);
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

//- МЕТОДЫ ---------------------------------
	// Вызывается при отпускании полки
	$scope.onShelfDragComplete = function($data, $event, hole) {
		hole.shelf = undefined;
	};

	// Вызывается при отпускании инструмента
	$scope.onToolDragComplete = function($data, $event) {
		$data.count--;
	};

	// Вызывается при отпускании элемента в конфигураторе полок
	$scope.onItemDragComplete = function($data, $event, index) {
		if($data) {
			if($data.type == $scope.toolTypes.spiral ||
				$data.type == $scope.toolTypes.splitter) {
				deleteSpiralFromShelf(index);
			} else {
				deleteMotorFromShelf(index);
			}
		}
	};

	// Вызывается при падении чего-либо на дырку
	$scope.onHoleDropComplete = function($data, $event, hole){
		var dataType = $data.type;

		switch(dataType) {
			case $scope.toolTypes.shelf:
				if(hole.shelf === undefined) {
					hole.shelf = $.extend(true, {}, $data);
				} else {
					restoreTools($data);
				}
				break;
		}
	};

	// Вызывается при падении чего-либо на место спирали
	$scope.onSpiralPlaceDropComplete = function($data, $event, index) {
		while(true) {
			if($data.type == $scope.toolTypes.spiral || $data.type == $scope.toolTypes.splitter) {
				if(canInsertItemToPlace($data, index, $scope.currentShelf.spiralCollision)) {
					insertItemToPlace($data, index);
				} else {
					restoreTools($data);
				}

				break;
			}

			if($data.type == $scope.toolTypes.ski) {
				if(canInsertSki(index)) {
					$scope.currentShelf.spiralPlaces[index].item.ski = $data;
				} else {
					restoreTools($data);
				}

				break;
			}

			restoreTools($data);
			break;
		}
	};

	// Вызывается при падении чего-либо на место моторов
	$scope.onMotorPlaceDropComplete = function($data, $event, index) {
		if($data.type == $scope.toolTypes.singleMotor || $data.type == $scope.toolTypes.doubleMotor) {
			if(canInsertItemToPlace($data, index, $scope.currentShelf.motorCollision)) {
				insertItemToPlace($data, index);
			} else {
				restoreTools($data);
			}
		} else {
			restoreTools($data);
		}
	};

	// Вызывается, когда что-то падает на склад
	$scope.onGarbageDropComplete = function($data, $event, hole) {
		restoreTools($data);
	};

	function deleteSpiralFromShelf(index) {
		clearCollision(index, $scope.currentShelf.spiralPlaces[index].item, $scope.currentShelf.spiralCollision);
		$scope.currentShelf.spiralPlaces[index].item = undefined;
	}

	function deleteMotorFromShelf(index) {
		clearCollision(index, $scope.currentShelf.motorPlaces[index].item, $scope.currentShelf.motorCollision);
		$scope.currentShelf.motorPlaces[index].item = undefined;
	}

	// Очищает массив коллизий по заданному индексу для конкретного типа элемента
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

	function canInsertSki(index) {
		var result = false;
		if(isItem(index, $scope.toolTypes.spiral)) {
			if($scope.currentShelf.spiralPlaces[index].item.ski === undefined) {
				result = true;
			}
		}

		return result;
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

	// Проверяет принадлежность элемента к конкретному типу. Возвращает true, если типы совпали
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
		console.log(tool);
		var curTool = getTool(tool.type);

		curTool.mouseOver = true;
		if(tool.type == $scope.toolTypes.spiral || tool.type == $scope.toolTypes.splitter) {
			showFreePlaces(tool, index, $scope.currentShelf.spiralCollision, $scope.currentShelf.spiralPlaces);
		}
		if(tool.type == $scope.toolTypes.singleMotor || tool.type == $scope.toolTypes.doubleMotor) {
			showFreePlaces(tool, index, $scope.currentShelf.motorCollision, $scope.currentShelf.motorPlaces);
		}
		if(tool.type == $scope.toolTypes.ski) {
			showFreeSpirals();
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

	function showFreeSpirals() {
		angular.forEach($scope.currentShelf.spiralPlaces, function(place, idx) {
			if(canInsertSki(idx)) {
				place.class = $scope.classes.canDrop;
			} else {
				place.class = $scope.classes.canNotDrop;
			}
		});
	}

	// Очищает классы подсветки
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
		setMode($scope.modes.shelf);
	};

	// Включает режим редактирования автомата
	$scope.configureMachine = function() {
		setMode($scope.modes.machine);
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

		angular.forEach($scope.allTools, function(_tool) {
			if(_tool.type == toolType) {
				tool = _tool;
			}
		});

		return tool;
	}

	function restoreTools(tool) {
		getTool(tool.type).count++;

		if(tool.type == $scope.toolTypes.shelf) {
			restoreShelf(tool);
		}

		if(tool.type == $scope.toolTypes.spiral) {
			restoreSpiral(tool);
		}
	}

	function restoreShelf(shelf) {
		angular.forEach(shelf.spiralPlaces, function(place) {
				if(place.item) {
					getTool(place.item.type).count++;
					if(place.item.type == $scope.toolTypes.spiral) {
						restoreSpiral(place.item);
					}
				}
			});

		angular.forEach(shelf.motorPlaces, function(place) {
			if(place.item) {
				getTool(place.item.type).count++;
			}
		});
	}

	function restoreSpiral(spiral) {
		if(spiral.ski) {
			$scope.allTools.ski.count++;
		}
	}

	function setMode(mode) {
		var newTools = {};
		$scope.mode = mode;
		angular.forEach($scope.allTools, function(tool, toolName) {
			if(tool.mode == $scope.mode) {
				newTools[toolName] = tool;
			}
		});

		$scope.tools = newTools;
	}
};