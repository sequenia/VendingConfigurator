var app = angular.module('ConfiguratorApp', ['ngDraggable']);

var ConfiguratorCtrl = function($scope, $timeout) {
//- НАСТРОЙКИ ------------------------------------------------
	$scope.shelfPlaceWidth     = 45;  // Ширина одного места на полке
	$scope.splitterWidth       = 8;   // Ширина разделителя
	$scope.spiralWidth         = 41;  // Ширина спирали на полке
	$scope.machineSpiralWidth  = 26;  // Ширина спирали на автомате
	$scope.machineSkiWidth     = 12;  // Ширина лыжи на автомате

	$scope.spiralPlaceHeight   = 370; // Длина места для спирали
	$scope.motorPlaceHeight    = 30;  // Длина места для мотора
	$scope.hsocketPlaceHeight  = 30;  // Длина места для горизонтального сокета
	$scope.labelDetectorHeight = 25;  // Высота подписи
	$scope.motorHeight         = 20;  // Высота мотора
	$scope.hsocketHeight       = 20;  // Высота горизонтального сокета

	$scope.holesInMachine      = 22;  // Количество дырок в автомате
	$scope.labelsLinesCount    = 3;   // Количество линий надписей
	$scope.placesOnShelf       = 12;  // Количество мест на полке

	$scope.detectorMargin      = 2;   // Отступы детекторов
	$scope.shelfPlaceOffset    = 15;  // Ширина отступа слева и справа полки

	$scope.setSettings = function() {
		$scope.detectorWidth    = $scope.shelfPlaceWidth - 2 * $scope.detectorMargin;     // Ширина детектора без отступов
		$scope.labelWidth       = $scope.detectorWidth * 1.5;
		$scope.labelTextWidth   = $scope.labelWidth - 4;
		$scope.singleMotorWidth = 1 * parseInt($scope.shelfPlaceWidth) + parseInt($scope.shelfPlaceWidth) / 3;
		$scope.doubleMotorWidth = 3 * parseInt($scope.shelfPlaceWidth) + parseInt($scope.shelfPlaceWidth) / 3;
		$scope.singleHsocketWidth= $scope.singleMotorWidth;
		$scope.shelfLength      = $scope.motorPlaceHeight +  $scope.hsocketPlaceHeight + $scope.spiralPlaceHeight;     // Длина полки
		
		$scope.railHeight       = $scope.spiralPlaceHeight - 20;
		$scope.skiHeight        = $scope.spiralPlaceHeight - 10;                          // Длина лыжи
		$scope.spiralHeight     = $scope.spiralPlaceHeight - 10;                          // Длина спирали
		$scope.splitterHeight   = $scope.spiralPlaceHeight - 5;                           // Длина разделителя

		$scope.spiralLeft       = ($scope.detectorWidth - $scope.spiralWidth)      / 2.0; // Отступ спирали на полке
		$scope.splitterLeft     = ($scope.detectorWidth - $scope.splitterWidth)    / 2.0; // Отступ разделителя на полке
		$scope.singleMotorLeft  = ($scope.detectorWidth - $scope.singleMotorWidth) / 2.0; // Отступ мотора на полке
		$scope.doubleMotorLeft  = ($scope.detectorWidth - $scope.doubleMotorWidth) / 2.0; // Отступ двойного мотора на полке
		$scope.labelTextLeft    = ($scope.labelWidth    - $scope.labelTextWidth)   / 2.0; // Отступ спирали на полке

		$scope.machineSpiralLeft      = ($scope.shelfPlaceWidth - $scope.machineSpiralWidth - 4) / 2.0;
		$scope.machineSplitterLeft    = ($scope.shelfPlaceWidth - $scope.splitterWidth) / 2.0;
		$scope.machineSingleMotorLeft = ($scope.shelfPlaceWidth - $scope.singleMotorWidth) / 2.0;
		$scope.machineDoubleMotorLeft = ($scope.shelfPlaceWidth - $scope.doubleMotorWidth) / 2.0;
		$scope.machineSkiLeft         = ($scope.machineSpiralWidth - $scope.machineSkiWidth) / 2.0;

		$scope.settings = {
			spiralPlaces:       { top:    $scope.motorPlaceHeight  + 'px' },
			spiralPlace:        { height: $scope.spiralPlaceHeight + 'px', width: $scope.shelfPlaceWidth  + 'px' },
			machinePlace:       { width:  $scope.shelfPlaceWidth   + 'px', height: '1px' },
			motorPlace:         { height: $scope.motorPlaceHeight  + 'px' },
			hsocketPlace:       { height: $scope.hsocketPlaceHeight  + 'px' },
			machinePlaceOffset: { width:  $scope.shelfPlaceOffset  + 'px', height: '1px' },
			placeOffset:        { height: $scope.spiralPlaceHeight + 'px', width: $scope.shelfPlaceOffset + 'px' },
			motorOffset:        { height: $scope.motorPlaceHeight  + 'px', width: $scope.shelfPlaceOffset + 'px' },
			hsocketOffset:      { height: $scope.hsocketPlaceHeight  + 'px', width: $scope.shelfPlaceOffset + 'px' },
			motorCircle:        { margin: ($scope.motorPlaceHeight + 1) + 'px auto 0px auto' },

			singleSpiralDetectors: { top: ($scope.motorPlaceHeight + $scope.hsocketPlaceHeight)     + 'px' },
			labelDetectors:        { top: ($scope.shelfLength + 20) + 'px' },
			singleSpiralDetector:  {
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
			hsocketDetector: {
				height: ($scope.hsocketPlaceHeight - 4) + 'px',
				width: $scope.detectorWidth + 'px',
				'margin-left': $scope.detectorMargin + 'px',
				'margin-right': $scope.detectorMargin + 'px'
			},
			labelDetector: {
				height: $scope.labelDetectorHeight + 'px',
				width: $scope.detectorWidth + 'px',
				'margin-left': $scope.detectorMargin + 'px',
				'margin-right': $scope.detectorMargin + 'px'
			},

			shelfModel: { height: $scope.shelfLength + 'px' },
			rail: { height: $scope.railHeight + 'px' },
			ski: 'height: ' + $scope.skiHeight + 'px',
			spiral: 'height: ' + ($scope.spiralHeight) + 'px; ' +
					'width: '  + ($scope.spiralWidth) + 'px; ' +
					'left: '   + ($scope.spiralLeft) + 'px',
			'machine-spiral':   'width: '       + ($scope.machineSpiralWidth) + 'px; ' +
								'margin-left: ' + ($scope.machineSpiralLeft) + 'px',
			splitter:   'height: ' + ($scope.splitterHeight) + 'px; ' +
						'width: '  + ($scope.splitterWidth) + 'px; ' +
						'left: '   + ($scope.splitterLeft) + 'px',
			'machine-splitter': 'width: '       + ($scope.splitterWidth) + 'px; ' +
								'margin-left: ' + ($scope.machineSplitterLeft) + 'px',
			'single-motor': 'height: ' + ($scope.motorHeight) + 'px; ' +
							'width: '  + ($scope.singleMotorWidth) + 'px; ' +
							'left: '   + ($scope.singleMotorLeft) + 'px',
			'machine-single-motor': 'width: '       + ($scope.singleMotorWidth) + 'px; ' +
									'margin-left: ' + ($scope.machineSingleMotorLeft) + 'px',
			'double-motor': 'height: ' + ($scope.motorHeight) + 'px; ' +
							'width: '  + ($scope.doubleMotorWidth) + 'px; ' +
							'left: '   + ($scope.doubleMotorLeft) + 'px',
			'machine-double-motor': 'width: '       + ($scope.doubleMotorWidth) + 'px; ' +
									'margin-left: ' + ($scope.machineDoubleMotorLeft) + 'px',
			'machine-ski':  'width: ' + ($scope.machineSkiWidth) + 'px; ' +
							'margin-left: ' + ($scope.machineSkiLeft) + 'px',
			'label':    'width: '  + ($scope.labelWidth) + 'px; ' + 
						'height: ' + ($scope.labelDetectorHeight) + 'px',
			'label-text':   'width: '       + ($scope.labelTextWidth) + 'px; ' + 
							'margin-left: ' + ($scope.labelTextLeft) + 'px'

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
		ski: 5,
		label: 6,
		socket: 7,
		hsocket: 8,
		socketBinding: 9,
		hole: 10
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

	$scope.labelToolTypes = [
		$scope.toolTypes.label
	];

	$scope.hsocketToolTypes = [
		$scope.toolTypes.hsocket
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
	 *     hsocketPlaces[],			   // Массив сокет (Только у полки)
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
			hsocketPlaces: createPlaces($scope.placesOnShelf),
			labelPlaces: createPlaces($scope.placesOnShelf * $scope.labelsLinesCount),
			hsocketBindings: [],
			spiralCollision: createCollision($scope.placesOnShelf),
			motorCollision: createCollision($scope.placesOnShelf),
			count: 5,
			mode: $scope.modes.machine
		},{
			type: $scope.toolTypes.socket,
			name: "Сокета",
			toolClass: "socket-tool",
			objectClass: "socket",
			count: 10,
			mode: $scope.modes.machine
		},{
			type: $scope.toolTypes.hsocket,
			name: "Сокета полки",
			toolClass: "socket-tool",
			objectClass: "socket",
			count: 10,
			mode: $scope.modes.shelf
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
		},{
			type: $scope.toolTypes.label,
			name: "Надпись",
			toolClass: "label-tool",
			objectClass: "label",
			mode: $scope.modes.shelf
		},{
			type: $scope.toolTypes.socketBinding,
			name: "Привязка к сокете"
		},{
			type: $scope.toolTypes.hole,
			name: "Дырка",
			toolClass: "hole-tool",
			objectClass: "hole-object",
			mode: $scope.modes.machine,
			count: 15
		}
	];

//- РАБОЧИЕ ПЕРЕМЕННЫЕ ---------------------------------
	setMode($scope.modes.machine);
	$scope.spiralPlaces = createPlaces($scope.placesOnShelf);
	$scope.holes = createHoles($scope.holesInMachine);
	$scope.sockets = createSockets($scope.holesInMachine);
	$scope.labels = [
		{name: "Код товара",  class: "number-label"},
		{name: "Цены",        class: "price-label"},
		{name: "Комментарии", class: "comment-label"}
	];

//- МЕТОДЫ ---------------------------------
	// Вызывается при отпускании инструмента
	$scope.onToolDragComplete = function($data, $event) {
		$data.count--;
	};

	// Вызывается при отпускании элемента в конфигураторе полок
	$scope.onItemDragComplete = function($data, $event, index) {
		if($data) {
			if(typeIsInGroup($data.type, $scope.spiralToolTypes)) {
				deleteSpiralFromShelf(index);
			}
			if(typeIsInGroup($data.type, $scope.motorToolTypes)) {
				deleteMotorFromShelf(index);
			}
			if($data.type == $scope.toolTypes.label) {
				deleteLabel(index);
			}
			if($data.type == $scope.toolTypes.hsocket) {
				deleteHsocket(index);
			}
			if($data.type == $scope.toolTypes.shelf) {
				$scope.holes[index].shelf = undefined;
			}
			if($data.type == $scope.toolTypes.socket) {
				$scope.sockets[index].item = undefined;
			}
			if($data.type == $scope.toolTypes.hole) {
				$scope.holes[index].hole = undefined;
			}
		}
	};

	// Вызывается при падении чего-либо на дырку
	$scope.onHoleDropComplete = function($data, $event, $index){
		switch($data.type) {
			case $scope.toolTypes.shelf:
				if(canInsertShelf($index)) {
					$scope.holes[$index].shelf = $.extend(true, {}, $data);
				} else {
					restoreTools($data);
				}
				break;

			case $scope.toolTypes.hole:
				if(canInsertHole($index)) {
					$scope.holes[$index].hole = $.extend(true, {}, $data);
					var hole = $scope.holes[$index].hole;

					if(hole.index !== undefined) {
						var shelf = $scope.holes[hole.index].shelf;
						$scope.holes[hole.index].shelf = undefined;
						$scope.holes[$index].shelf = shelf;
					}

					hole.index = $index;
				} else {
					restoreTools($data);
				}
				break;

			default:
				restoreTools($data);
				break;
		}
	};

	// Вызывается при падении чего-либо на сокету
	$scope.onSocketDropComplete = function($data, $event, socket){
		if($data.type == $scope.toolTypes.socket) {
			if(socket.item === undefined) {
				insertSocketToPlace($data, socket, $scope.sockets);
			} else {
				restoreTools($data);
			}
		} else {
			restoreTools($data);
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
					$scope.currentShelf.spiralPlaces[index].item.ski = $.extend(true, {}, $data);
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
			drawBindings();
		} else {
			restoreTools($data);
		}
	};

	// Вызывается при падении чего-либо на место сокеты полки
	$scope.onHsocketPlaceDropComplete = function($data, $event, index) {
		while(true) {
			if($data.type == $scope.toolTypes.hsocket) {
				if(canInsertHsocket(index)) {
					insertSocketToPlace($data, $scope.currentShelf.hsocketPlaces[index], $scope.currentShelf.hsocketPlaces);
				} else {
					restoreTools($data);
				}
				drawBindings();
				break;
			}

			if($data.type == $scope.toolTypes.socketBinding) {
				if(canInsertSocketBinding(index)) {
					insertSocketBinding($data, $scope.currentShelf.hsocketPlaces[index]);
					drawBindings();
				}
				break;
			}

			restoreTools($data);
			break;
		}
	};

	// Вызывается при падении чего-либо на место цены
	$scope.onLabelPlaceDropComplete = function($data, $event, index) {
		if($data.type == $scope.toolTypes.label) {
			if(canInsertLabel(index)) {
				$scope.currentShelf.labelPlaces[index].item = $.extend(true, {}, $data);
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
		var motorPlace = $scope.currentShelf.motorPlaces[index];
		clearCollision(index, motorPlace.item, $scope.currentShelf.motorCollision);
		if(motorPlace.item.socket) {
			motorPlace.item.socket.motorIndex = undefined;
		}
		motorPlace.item = undefined;
	}

	function deleteLabel(index) {
		$scope.currentShelf.labelPlaces[index].item = undefined;
	}

	function deleteHsocket(index) {
		var hsocketPlaces = $scope.currentShelf.hsocketPlaces;
		if(hsocketPlaces[index].item.motorIndex !== undefined) {
			var motorPlace = $scope.currentShelf.motorPlaces[hsocketPlaces[index].item.motorIndex];
			motorPlace.item.socket = undefined;
			motorPlace.item.socketBindingStyle = undefined;
		}
		hsocketPlaces[index].item = undefined;
		renumberSockets(hsocketPlaces);
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

	function canInsertLabel(index) {
		return $scope.currentShelf.labelPlaces[index].item === undefined;
	}

	function canInsertHsocket(index) {
		return $scope.currentShelf.hsocketPlaces[index].item === undefined;
	}

	function canInsertSocketBinding(index) {
		var result = true;
		if($scope.currentShelf.hsocketPlaces[index].item === undefined) {
			result = false;
		} else {
			if($scope.currentShelf.hsocketPlaces[index].item.motorIndex !== undefined) {
				result = false;
			}
		}
		return result;
	}

	function canInsertShelf(index) {
		return $scope.holes[index].shelf === undefined && $scope.holes[index].hole !== undefined;
	}

	function canInsertHole(index) {
		return $scope.holes[index].hole === undefined;
	}

	function canInsertSocket(index) {
		return $scope.sockets[index].item === undefined;
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
		}
		if(typeIsInGroup(type, $scope.motorToolTypes)) {
			item = $scope.currentShelf.motorPlaces[index].item;
		}
		if(typeIsInGroup(type, $scope.labelToolTypes)) {
			item = $scope.currentShelf.labelPlaces[index].item;
		}

		if(typeIsInGroup(type, $scope.hsocketToolTypes)) {
			item = $scope.currentShelf.hsocketPlaces[index].item;
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
			var motorPlace = $scope.currentShelf.motorPlaces[index];
			motorPlace.item = copyIfTool(item);
			motorPlace.item.socketBinding = $.extend(true, {motorIndex: index}, $scope.getTool("Привязка к сокете"));
			if(motorPlace.item.socket) {
				motorPlace.item.socket.motorIndex = index;
			}
		}
	}

	function insertSocketToPlace(data, socket, sockets) {
		socket.item = copyIfTool(data);
		if(socket.item.motorIndex !== undefined) {
			$scope.currentShelf.motorPlaces[socket.item.motorIndex].item.socket = socket.item;
		}
		renumberSockets(sockets);
	}

	function insertSocketBinding(data, socket) {
		var motor = $scope.currentShelf.motorPlaces[data.motorIndex].item;
		motor.socket = socket.item;
		socket.item.motorIndex = data.motorIndex;
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
				showFreeCollisionPlaces(tool, index, $scope.currentShelf.spiralCollision, $scope.currentShelf.spiralPlaces);
			}
			if(typeIsInGroup(tool.type, $scope.motorToolTypes)) {
				showFreeCollisionPlaces(tool, index, $scope.currentShelf.motorCollision, $scope.currentShelf.motorPlaces);
			}
			if(typeIsInGroup(tool.type, $scope.hsocketToolTypes)) {
				showFreePlaces($scope.currentShelf.hsocketPlaces, canInsertHsocket);
			}
			if(tool.type == $scope.toolTypes.ski) {
				showFreePlaces($scope.currentShelf.spiralPlaces, canInsertSki);
			}
			if(tool.type == $scope.toolTypes.label) {
				showFreePlaces($scope.currentShelf.labelPlaces, canInsertLabel);
			}
			if(tool.type == $scope.toolTypes.shelf) {
				showFreePlaces($scope.holes, canInsertShelf);
			}
			if(tool.type == $scope.toolTypes.hole) {
				showFreePlaces($scope.holes, canInsertHole);
			}
			if(tool.type == $scope.toolTypes.socket) {
				showFreePlaces($scope.sockets, canInsertSocket);
			}
			if(tool.type == $scope.toolTypes.socketBinding) {
				showFreePlaces($scope.currentShelf.hsocketPlaces, canInsertSocketBinding);
			}
			$scope.currentTool = curTool;

			if(index !== undefined && tool.type != $scope.toolTypes.socketBinding) {
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
			removeClassesFromPlaces();
			$scope.toStorage = "";
			$scope.itemOver = false;
		}
	};

	function showFreeCollisionPlaces(tool, index, collision, places) {
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

	function showFreePlaces(array, checkMethod) {
		angular.forEach(array, function(place, idx) {
			if(checkMethod(idx)) {
				place.class = $scope.classes.canDrop;
			} else {
				place.class = $scope.classes.canNotDrop;
			}
		});
	}

	// Очищает классы подсветки
	function removeClassesFromPlaces() {
		if($scope.mode == $scope.modes.shelf) {
			removeClasses($scope.currentShelf.spiralPlaces);
			removeClasses($scope.currentShelf.motorPlaces);
			removeClasses($scope.currentShelf.labelPlaces);
			removeClasses($scope.currentShelf.hsocketPlaces);
		}
		if($scope.mode == $scope.modes.machine) {
			removeClasses($scope.holes);
			removeClasses($scope.sockets);
		}
	}

	function removeClasses(array) {
		angular.forEach(array, function(item, index) {
			item.class = $scope.classes.noClass;
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

		if(tool.type == $scope.toolTypes.hole) {
			restoreHole(tool);
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

	function restoreHole(hole) {
		if($scope.holes[hole.index].shelf !== undefined) {
			var shelf = $scope.holes[hole.index].shelf;
			$scope.getTool(shelf.name).count++;
			restoreShelf(shelf);
			$scope.holes[hole.index].shelf = undefined;
		}
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
			holes.push({id: (i + 1) * 20});
		}
		return holes;
	}

	function createSockets(count) {
		var sockets = [];
		for(var i = 0; i < count; i++) {
			sockets.push({item: undefined});
		}
		return sockets;
	}

	function createCollision(count) {
		var collision = [];
		for(var i = 0; i < count * 2 + 1; i++) {
			collision.push(false);
		}
		return collision;
	}

	function copyIfTool(data) {
		var copy;
		if(data.notTool) {
			copy = data;
		} else {
			copy = $.extend(true, {}, data);
			copy.notTool = true;
		}
		return copy;
	}

	function renumberSockets(sockets) {
		var label = 1;
		for(var i = 0; i < sockets.length; i++) {
			if(sockets[i].item) {
				sockets[i].item.label = label;
				label++;
			}
		}
	}

	function drawBindings() {
		$timeout(function() {
			var motors = $('.motor-detectors').find('.single-motor, .double-motor');
			var hsockets = $('.hsocket-detectors').find('.socket');
			var motorIndex = 0;
			angular.forEach($scope.currentShelf.motorPlaces, function(motorPlace, index) {
				if(motorPlace.item !== undefined) {
					var motor = motors[motorIndex];
					var socketIndex = parseInt($(motor).find('.motor-hsocket-label').first().text());
					if(socketIndex) {
						var hsocket = hsockets[socketIndex - 1];
						var motorOffset = $(motor).parent().offset();
						var hsocketOffset = $(hsocket).offset();
						var x = hsocketOffset.left - motorOffset.left;
						var distanceToCenter = $(motor).width() / 2.0 - $(hsocket).width() / 2.0;
						var y = motorOffset.top - hsocketOffset.top;
						var width = Math.sqrt(x * x + y * y);
						var angle = - 57.325 * Math.asin(y / width);
						var xPosition = 0;
						if(x < 0) {
							angle = - angle;
							xPosition = x;
						}

						motorPlace.item.socketBindingStyle = {
							width: width,
							height: '2px',
							'background-color': "#FFFFFF",
							position: 'absolute',
							'z-index': 0,
							'margin-left': xPosition + 'px',

							'-moz-transform': 'rotate(' + angle + 'deg)',
							'-webkit-transform': 'rotate(' + angle + 'deg)',
							'-o-transform': 'rotate(' + angle + 'deg)',
							'-ms-transform': 'rotate(' + angle + 'deg)',
							'transform':' rotate(' + angle + 'deg)'
						};
					}
					motorIndex++;
				}
			});
		});
	}

	$scope.preventDrag = function($event) {
		$event.stopPropagation();
	};

	$scope.getTimes = function(count) {
		var times = [];
		for(var i = 0; i < count; i++) {
			times.push(i);
		}
		return times;
	};
};