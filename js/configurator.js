var app = angular.module('ConfiguratorApp', ['ngDraggable']);

var ConfiguratorCtrl = function($scope) {
//- НАСТРОЙКИ ------------------------------------------------
	$scope.shelfPlaceWidth    = 30;  // Ширина одного места на полке
	$scope.shelfPlaceOffset   = 15;  // Ширина отступа слева и справа полки
	$scope.spiralPlaceHeight  = 370; // Длина места для спирали
	$scope.motorPlaceHeight   = 30;  // Длина места для мотора
	$scope.placesOnShelf      = 12;  // Количество мест на полке
	$scope.holesInMachine     = 12;  // Количество дырок в автомате
	$scope.spiralWidth        = 41;  // Ширина спирали на полке
	$scope.splitterWidth      = 8;   // Ширина разделителя
	$scope.detectorMargin     = 2;   // Отступы детекторов
	$scope.motorHeight        = 20;
	$scope.machineSpiralWidth = 26;
	$scope.machineSkiWidth    = 12;

	$scope.setSettings = function() {
		$scope.shelfLength      = $scope.motorPlaceHeight + $scope.spiralPlaceHeight;     // Длина полки
		$scope.detectorWidth    = $scope.shelfPlaceWidth - 2 * $scope.detectorMargin;     // Ширина детектора без отступов
		$scope.railHeight       = $scope.spiralPlaceHeight - 20;
		$scope.skiHeight        = $scope.spiralPlaceHeight - 10;                          // Длина лыжи
		$scope.spiralHeight     = $scope.spiralPlaceHeight - 10;                          // Длина спирали
		$scope.splitterHeight   = $scope.spiralPlaceHeight - 5;                           // Длина разделителя
		$scope.singleMotorWidth = parseInt($scope.shelfPlaceWidth) + parseInt($scope.shelfPlaceWidth) / 3;
		$scope.doubleMotorWidth = 3 * parseInt($scope.shelfPlaceWidth) + parseInt($scope.shelfPlaceWidth) / 3;
		$scope.spiralLeft       = ($scope.detectorWidth - $scope.spiralWidth) / 2.0;      // Отступ спирали на полке
		$scope.splitterLeft     = ($scope.detectorWidth - $scope.splitterWidth) / 2.0;    // Отступ разделителя на полке
		$scope.singleMotorLeft  = ($scope.detectorWidth - $scope.singleMotorWidth) / 2.0; // Отступ мотора на полке
		$scope.doubleMotorLeft  = ($scope.detectorWidth - $scope.doubleMotorWidth) / 2.0; // Отступ двойного мотора на полке
		$scope.machineSpiralLeft      = ($scope.shelfPlaceWidth - $scope.machineSpiralWidth - 4) / 2.0;
		$scope.machineSplitterLeft    = ($scope.shelfPlaceWidth - $scope.splitterWidth) / 2.0;
		$scope.machineSingleMotorLeft = ($scope.shelfPlaceWidth - $scope.singleMotorWidth) / 2.0;
		$scope.machineDoubleMotorLeft = ($scope.shelfPlaceWidth - $scope.doubleMotorWidth) / 2.0;
		$scope.machineSkiLeft         = ($scope.machineSpiralWidth - $scope.machineSkiWidth) / 2.0;
		$scope.settings = {
			spiralPlaces: {
				top: $scope.motorPlaceHeight + 'px'
			},
			spiralPlace: {
				height: $scope.spiralPlaceHeight + 'px',
				width: $scope.shelfPlaceWidth + 'px'
			},
			machinePlace: {
				width: $scope.shelfPlaceWidth + 'px',
				height: '1px'
			},
			motorPlace: {
				height: $scope.motorPlaceHeight + 'px'
			},
			machinePlaceOffset: {
				width: $scope.shelfPlaceOffset + 'px',
				height: '1px'
			},
			placeOffset: {
				height: $scope.spiralPlaceHeight + 'px',
				width: $scope.shelfPlaceOffset + 'px'
			},
			motorOffset: {
				height: $scope.motorPlaceHeight + 'px',
				width: $scope.shelfPlaceOffset + 'px'
			},
			singleSpiralDetectors: {
				top: $scope.motorPlaceHeight + 'px'
			},
			singleSpiralDetector: {
				height: $scope.spiralPlaceHeight + 'px',
				width: $scope.detectorWidth + 'px',
				'margin-left': $scope.detectorMargin + 'px',
				'margin-right': $scope.detectorMargin + 'px'
			},
			motorDetector: {
				height: $scope.motorPlaceHeight + 'px',
				width: $scope.detectorWidth + 'px',
				'margin-left': $scope.detectorMargin + 'px',
				'margin-right': $scope.detectorMargin + 'px'
			},
			shelfModel: {
				height: $scope.shelfLength + 'px'
			},
			rail: {
				height: $scope.railHeight + 'px'
			},
			ski: 'height: ' + $scope.skiHeight + 'px',
			spiral: 'height: ' + ($scope.spiralHeight) + 'px; ' +
					'width: ' + ($scope.spiralWidth) + 'px; ' +
					'left: ' + ($scope.spiralLeft) + 'px',
			'machine-spiral': 'width: ' + ($scope.machineSpiralWidth) + 'px; ' +
							'margin-left: ' + ($scope.machineSpiralLeft) + 'px',
			splitter: 'height: ' + ($scope.splitterHeight) + 'px; ' +
					'width: ' + ($scope.splitterWidth) + 'px; ' +
					'left: ' + ($scope.splitterLeft) + 'px',
			'machine-splitter': 'width: ' + ($scope.splitterWidth) + 'px; ' +
								'margin-left: ' + ($scope.machineSplitterLeft) + 'px',
			'single-motor': 'height: ' + ($scope.motorHeight) + 'px; ' +
							'width: ' + ($scope.singleMotorWidth) + 'px; ' +
							'left: ' + ($scope.singleMotorLeft) + 'px',
			'machine-single-motor': 'width: ' + ($scope.singleMotorWidth) + 'px; ' +
									'margin-left: ' + ($scope.machineSingleMotorLeft) + 'px',
			'double-motor': 'height: ' + ($scope.motorHeight) + 'px; ' +
							'width: ' + ($scope.doubleMotorWidth) + 'px; ' +
							'left: ' + ($scope.doubleMotorLeft) + 'px',
			'machine-double-motor': 'width: ' + ($scope.doubleMotorWidth) + 'px; ' +
									'margin-left: ' + ($scope.machineDoubleMotorLeft) + 'px',
			'machine-ski': 'width: ' + ($scope.machineSkiWidth) + 'px; ' +
							'margin-left: ' + ($scope.machineSkiLeft) + 'px'
		};
	};

	$scope.setSettings();

	$scope.itemOver = false;

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
	$scope.spiralToolTypes = [
		$scope.toolTypes.spiral,
		$scope.toolTypes.splitter
	];

	$scope.motorToolTypes = [
		$scope.toolTypes.singleMotor,
		$scope.toolTypes.doubleMotor
	];

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
	$scope.allTools = [{
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
		},{
			type: $scope.toolTypes.spiral,
			name: "Спираль левая",
			toolClass: "spiral-tool",
			objectClass: "spiral",
			machineClass: "machine-spiral",
			leftOffset: 1,
			rightOffset: 1,
			count: 15,
			mode: $scope.modes.shelf,
			indicators: {
				direction: ["direction-left"]
			}
		},{
			type: $scope.toolTypes.spiral,
			name: "Спираль правая",
			toolClass: "spiral-tool",
			objectClass: "spiral",
			machineClass: "machine-spiral",
			leftOffset: 1,
			rightOffset: 1,
			count: 15,
			mode: $scope.modes.shelf,
			indicators: {
				direction: ["direction-right"]
			}
		},{
			type: $scope.toolTypes.splitter,
			name: "Разделитель",
			toolClass: "splitter-tool",
			objectClass: "splitter",
			machineClass: "machine-splitter",
			leftOffset: 0,
			rightOffset: 0,
			count: 25,
			mode: $scope.modes.shelf
		},{
			type: $scope.toolTypes.singleMotor,
			name: "Мотор левый",
			toolClass: "single-motor-tool",
			objectClass: "single-motor",
			machineClass: "machine-single-motor",
			leftOffset: 1,
			rightOffset: 1,
			count: 14,
			mode: $scope.modes.shelf,
			indicators: {
				direction: ["direction-left"]
			}
		},{
			type: $scope.toolTypes.singleMotor,
			name: "Мотор правый",
			toolClass: "single-motor-tool",
			objectClass: "single-motor",
			machineClass: "machine-single-motor",
			leftOffset: 1,
			rightOffset: 1,
			count: 20,
			mode: $scope.modes.shelf,
			indicators: {
				direction: ["direction-right"]
			}
		},{
			type: $scope.toolTypes.doubleMotor,
			name: "Двойной мотор 1",
			toolClass: "double-motor-tool",
			objectClass: "double-motor",
			machineClass: "machine-double-motor",
			leftOffset: 3,
			rightOffset: 3,
			count: 6,
			mode: $scope.modes.shelf,
			indicators: {
				direction: ["direction-left", "direction-right"]
			}
		},{
			type: $scope.toolTypes.doubleMotor,
			name: "Двойной мотор 2",
			toolClass: "double-motor-tool",
			objectClass: "double-motor",
			machineClass: "machine-double-motor",
			leftOffset: 3,
			rightOffset: 3,
			count: 8,
			mode: $scope.modes.shelf,
			indicators: {
				direction: ["direction-right", "direction-left"]
			}
		},{
			type: $scope.toolTypes.doubleMotor,
			name: "Двойной мотор 3",
			toolClass: "double-motor-tool",
			objectClass: "double-motor",
			machineClass: "machine-double-motor",
			leftOffset: 3,
			rightOffset: 3,
			count: 7,
			mode: $scope.modes.shelf,
			indicators: {
				direction: ["direction-left", "direction-left"]
			}
		},{
			type: $scope.toolTypes.doubleMotor,
			name: "Двойной мотор 4",
			toolClass: "double-motor-tool",
			objectClass: "double-motor",
			machineClass: "machine-double-motor",
			leftOffset: 3,
			rightOffset: 3,
			count: 4,
			mode: $scope.modes.shelf,
			indicators: {
				direction: ["direction-right", "direction-right"]
			}
		},{
			type: $scope.toolTypes.ski,
			name: "Лыжа",
			toolClass: "ski-tool",
			objectClass: "ski",
			machineClass: "machine-ski",
			count: 15,
			mode: $scope.modes.shelf
		}
	];

//- РАБОЧИЕ ПЕРЕМЕННЫЕ ---------------------------------
	setMode($scope.modes.machine);
	$scope.spiralPlaces = createPlaces($scope.placesOnShelf);
	$scope.holes = createHoles($scope.holesInMachine);

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
			if(typeIsInGroup($data.type, $scope.spiralToolTypes)) {
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
			if(typeIsInGroup($data.type, $scope.spiralToolTypes)) {
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
		if(typeIsInGroup($data.type, $scope.motorToolTypes)) {
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

		if(typeIsInGroup(type, $scope.spiralToolTypes)) {
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
		if(typeIsInGroup(item.type, $scope.spiralToolTypes)) {
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
		if(tool) {
			var curTool = $scope.getTool(tool.name);

			curTool.mouseOver = true;
			if(typeIsInGroup(tool.type, $scope.spiralToolTypes)) {
				showFreePlaces(tool, index, $scope.currentShelf.spiralCollision, $scope.currentShelf.spiralPlaces);
			}
			if(typeIsInGroup(tool.type, $scope.motorToolTypes)) {
				showFreePlaces(tool, index, $scope.currentShelf.motorCollision, $scope.currentShelf.motorPlaces);
			}
			if(tool.type == $scope.toolTypes.ski) {
				showFreeSpirals();
			}
			$scope.currentTool = curTool;

			if(index !== undefined) {
				$scope.toStorage = "to-storage";
				$scope.itemOver = true;
			}
		}
	};

	// Вызывается, когда инструмент отпускается
	$scope.onToolMouseUp = function(tool) {
		if(tool) {
			var curTool = $scope.getTool(tool.name);
			curTool.mouseOver = false;
			if(tool.type != $scope.toolTypes.shelf) {
				removeClassesFromPlaces();
			}
			$scope.toStorage = "";
			$scope.itemOver = false;
		}
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

	$scope.getTool = function(toolName) {
		var tool;

		angular.forEach($scope.allTools, function(_tool) {
			if(_tool.name == toolName) {
				tool = _tool;
			}
		});

		return tool;
	};

	function restoreTools(tool) {
		$scope.getTool(tool.name).count++;

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
					$scope.getTool(place.item.name).count++;
					if(place.item.type == $scope.toolTypes.spiral) {
						restoreSpiral(place.item);
					}
				}
			});

		angular.forEach(shelf.motorPlaces, function(place) {
			if(place.item) {
				$scope.getTool(place.item.name).count++;
			}
		});
	}

	function restoreSpiral(spiral) {
		if(spiral.ski) {
			$scope.getTool(spiral.ski.name).count++;
		}
	}

	function setMode(mode) {
		var newTools = [];
		$scope.mode = mode;
		angular.forEach($scope.allTools, function(tool) {
			if(tool.mode == $scope.mode) {
				newTools.push(tool);
			}
		});

		$scope.tools = newTools;
	}

	function typeIsInGroup(type, group) {
		for(var i = 0; i < group.length; i++) {
			if(group[i] == type) {
				return true;
			}
		}
		return false;
	}

	function createPlaces(count) {
		var places = [];
		for(var i = 0; i < count; i++) {
			places.push({item: undefined});
		}
		return places;
	}

	function createHoles(count) {
		var holes = [];
		for(var i = 0; i < count; i++) {
			holes.push({id: i});
		}
		return holes;
	}

	function createCollision(count) {
		var collision = [];
		for(var i = 0; i < count * 2 + 1; i++) {
			collision.push(false);
		}
		return collision;
	}
};