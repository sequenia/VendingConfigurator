var app = angular.module('ConfiguratorApp', ['ngDraggable']);

var ConfiguratorCtrl = function($scope, $timeout) {
	initSettings();

	$scope.itemOver = false;

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
		hole: 10,
		guide: 11
	};

	$scope.classes = {
		canDrop: "can-drop",
		canNotDrop: "can-not-drop",
		canNotDropButShow: "can-not-drop-but-show",
		noClass: ""
	};

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

	createMachine();

	function createMachine() {
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
			},
			{
				type: $scope.toolTypes.guide,
				name: "Направляющая",
				toolClass: "guide-tool",
				objectClass: "guide",
				mode: $scope.modes.machine,
				count: 9
			}
		];

		$scope.machine = {};
		$scope.holes = {};
		$scope.shelves = {};
		$scope.sockets = {};
		$scope.guides = {};
		$scope.shelfIterator = 0;
		$scope.holesIterator = 0;
		$scope.socketIterator = 0;
		$scope.guideIterator = 0;
		$scope.labels = [
			{name: "Код товара",  class: "number-label"},
			{name: "Цены",        class: "price-label"},
			{name: "Комментарии", class: "comment-label"}
		];
	}

	$scope.deleteActions = {
		shelf: deleteShelf,
		spiral: deleteSpiral,
		splitter: deleteSpiral,
		singleMotor: deleteMotor,
		doubleMotor: deleteMotor,
		ski: function() {},
		label: deleteLabel,
		socket: deleteSocket,
		hsocket: deleteHsocket,
		socketBinding: function() {},
		hole: deleteHole,
		guide: deleteGuide
	};

	$scope.validateActions = {
		shelf: canInsertShelf,
		spiral: canInsertSpiral,
		splitter: canInsertSpiral,
		singleMotor: canInsertMotor,
		doubleMotor: canInsertMotor,
		ski: canInsertSki,
		label: canInsertLabel,
		socket: canInsertSocket,
		hsocket: canInsertHsocket,
		socketBinding: canInsertSocketBinding,
		hole: canInsertHole,
		guide: canInsertGuide
	};

	$scope.insertActions = {
		shelf: insertShelf,
		spiral: insertItemToPlace,
		splitter: insertItemToPlace,
		singleMotor: insertItemToPlace,
		doubleMotor: insertItemToPlace,
		ski: insertSki,
		label: insertLabel,
		socket: insertSocket,
		hsocket: insertSocket,
		socketBinding: insertSocketBinding,
		hole: insertHole,
		guide: insertGuide
	};

	setMode($scope.modes.machine);
	restructActions("deleteActions");
	restructActions("validateActions");
	restructActions("insertActions");

	function deleteSpiral(index) {
		clearCollision(index, $scope.currentShelf.spiralPlaces[index].item, $scope.currentShelf.spiralCollision);
		$scope.currentShelf.spiralPlaces[index].item = undefined;
	}

	function deleteMotor(index) {
		var motorPlace = $scope.currentShelf.motorPlaces[index];
		clearCollision(index, motorPlace.item, $scope.currentShelf.motorCollision);
		if(motorPlace.item.socket) {
			motorPlace.item.socket.motorIndex = undefined;
		}
		motorPlace.item = undefined;
	}

	function deleteHsocket (index) {
		var hsocketPlaces = $scope.currentShelf.hsocketPlaces;
		if(hsocketPlaces[index].item.motorIndex !== undefined) {
			var motorPlace = $scope.currentShelf.motorPlaces[hsocketPlaces[index].item.motorIndex];
			motorPlace.item.socket = undefined;
			motorPlace.item.socketBindingStyle = undefined;
		}
		hsocketPlaces[index].item = undefined;
		renumberSockets(hsocketPlaces);
	}

	function deleteLabel (index) {
		$scope.currentShelf.labelPlaces[index].item = undefined;
	}

	function deleteShelf(index) {
		if($scope.shelves[index].socket !== undefined) {
			$scope.shelves[index].socket.shelf = undefined;
		}
		delete $scope.shelves[index];
	}

	function deleteSocket(index) {
		if($scope.sockets[index].shelf !== undefined) {
			var shelf = $scope.sockets[index].shelf;
			shelf.socket = undefined;
			shelf.socketBindingStyle = undefined;
		}
		delete $scope.sockets[index];
		renumberSockets();
	}

	function deleteHole(index) {
		delete $scope.holes[index];
	}

	function deleteGuide(index) {
		delete $scope.guides[index];
	}

	function canInsertShelf(index) {
		return true;
	}

	function canInsertHole(index) {
		return true;
	}

	function canInsertSocket(index) {
		return true;
	}

	function canInsertGuide(index) {
		return true;
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
		if($scope.mode == $scope.modes.shelf) {
			if($scope.currentShelf.hsocketPlaces[index].item === undefined) {
				result = false;
			} else {
				if($scope.currentShelf.hsocketPlaces[index].item.motorIndex !== undefined) {
					result = false;
				}
			}
		} else {
			if($scope.sockets[index].shelf !== undefined) {
				result = false;
			}
		}
		return result;
	}

	function canInsertSpiral(index, data) {
		return canInsertItemToPlace(data, index, $scope.currentShelf.spiralCollision);
	}

	function canInsertMotor(index, data) {
		return canInsertItemToPlace(data, index, $scope.currentShelf.motorCollision);
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

	function insertSocketBinding(data, index) {
		var socket;
		if($scope.mode == $scope.modes.shelf) {
			socket = $scope.currentShelf.hsocketPlaces[index];
			var motor = $scope.currentShelf.motorPlaces[data.motorIndex].item;
			motor.socket = socket.item;
			socket.item.motorIndex = data.motorIndex;
		} else {
			socket = $scope.sockets[index];
			var shelf = $scope.shelves[data.shelfIndex];

			if(shelf.socket !== undefined) {
				shelf.socket.shelf = undefined;
			}

			shelf.socket = socket;
			socket.shelf = shelf;
		}
	}

	function insertSocket($data, $index) {
		if($scope.mode == $scope.modes.machine) {
			var detectorPosition = $('#sockets-detector').offset();
			var socket = copyIfTool($data);
			var top = $scope.toolMouseY - detectorPosition.top;

			socket.style = { top: top };
			socket.height = Math.round(top * $scope.heightMulty);
			socket.index = $scope.socketIterator;

			if(socket.shelf !== undefined) {
				socket.shelf.socket = socket;
			}

			$scope.elemHeight = Math.round(top * $scope.heightMulty);
			$scope.sockets[$scope.socketIterator++] = socket;
			select(socket);

			renumberSockets();
		} else {
			var sockets = $scope.currentShelf.hsocketPlaces;
			var socket = $scope.currentShelf.hsocketPlaces[$index];
			socket.item = copyIfTool($data);
			if(socket.item.motorIndex !== undefined) {
				$scope.currentShelf.motorPlaces[socket.item.motorIndex].item.socket = socket.item;
			}
			renumberSockets(sockets);
		}
	}

	function insertShelf($data, $index) {
		var detectorPosition = $('#machine-detector').offset();
		var shelf = copyIfTool($data);
		var top = $scope.toolMouseY - detectorPosition.top;

		shelf.style = $.extend(true, {}, $scope.settings.shelfWidth);
		shelf.style.top = top;
		shelf.buttonStyle = {top: (top - 10) };
		shelf.index = $scope.shelfIterator;

		shelf.socketBinding = $.extend(true, {shelfIndex: $index}, $scope.getTool("Привязка к сокете"));

		if(shelf.socket !== undefined) {
			shelf.socket.shelf = shelf;
		}

		$scope.elemHeight = Math.round(top * $scope.heightMulty);
		$scope.shelves[$scope.shelfIterator++] = shelf;

		select(shelf);
	}

	function insertHole($data, $index) {
		var detectorPosition = $('#machine-detector').offset();
		var hole = $.extend(true, {}, $data);
		var top = $scope.toolMouseY - detectorPosition.top;

		hole.style = { top: top };

		if($scope.toolMouseX - detectorPosition.left > $scope.settings.shelfWidth.width / 2.0) {
			hole.style.right = 0;
		}

		$scope.elemHeight = Math.round(top * $scope.heightMulty);
		$scope.holes[$scope.holesIterator++] = hole;

		select(hole);
	}

	function insertGuide($data, $index) {
		var detectorPosition = $('#machine-detector').offset();
		var guide = $.extend(true, {}, $data);
		var top = $scope.toolMouseY - detectorPosition.top;

		guide.style = { top: top };

		if($scope.toolMouseX - detectorPosition.left > $scope.settings.shelfWidth.width / 2.0) {
			guide.style.right = 0;
		}

		$scope.elemHeight = Math.round(top * $scope.heightMulty);
		$scope.guides[$scope.guideIterator++] = guide;

		select(guide);
	}

	function insertSki($data, $index) {
		$scope.currentShelf.spiralPlaces[$index].item.ski = $.extend(true, {}, $data);
	}

	function insertLabel($data, $index) {
		$scope.currentShelf.labelPlaces[$index].item = $.extend(true, {}, $data);
	}

	// Вызывается при отпускании инструмента
	$scope.onToolDragComplete = function($data, $event) {
		$data.count--;
	};

	// Вызывается при отпускании элемента в конфигураторе полок
	$scope.onItemDragComplete = function($data, $event, index) {
		if($data) $scope.deleteActions[$data.type](index);
	};

	function insertIfCan($data, $event, $index, toolTypes, callback) {
		var typeFound = false;
		for(var i = 0; i < toolTypes.length; i++) {
			if($data.type == toolTypes[i]) {
				typeFound = true;
				break;
			}
		}

		if(typeFound) {
			if($scope.validateActions[$data.type]($index, $data)) {
				$scope.insertActions[$data.type]($data, $index);
			} else {
				restoreTools($data);
			}
			if(callback !== undefined) {
				callback();
			}
		} else {
			restoreTools($data);
		}
	}

	$scope.onMachineDropComplete = function($data, $event) {
		insertIfCan($data, $event, $scope.shelfIterator, [$scope.toolTypes.shelf, $scope.toolTypes.hole, $scope.toolTypes.guide], drawBindings);
	};

	// Вызывается при падении чего-либо на сокету
	$scope.onSocketsDropComplete = function($data, $event, $index){
		insertIfCan($data, $event, $scope.socketIterator, [$scope.toolTypes.socket], drawBindings);
	};

	$scope.onSocketDropComplete = function($data, $event, $index) {
		insertIfCan($data, $event, $index, [$scope.toolTypes.socketBinding], drawBindings);
	};

	// Вызывается при падении чего-либо на место спирали
	$scope.onSpiralPlaceDropComplete = function($data, $event, index) {
		insertIfCan($data, $event, index, [$scope.toolTypes.spiral, $scope.toolTypes.splitter, $scope.toolTypes.ski]);
	};

	// Вызывается при падении чего-либо на место моторов
	$scope.onMotorPlaceDropComplete = function($data, $event, index) {
		insertIfCan($data, $event, index, [$scope.toolTypes.singleMotor, $scope.toolTypes.doubleMotor], drawBindings);
	};

	// Вызывается при падении чего-либо на место сокеты полки
	$scope.onHsocketPlaceDropComplete = function($data, $event, index) {
		insertIfCan($data, $event, index, [$scope.toolTypes.hsocket, $scope.toolTypes.socketBinding], drawBindings);
	};

	// Вызывается при падении чего-либо на место цены
	$scope.onLabelPlaceDropComplete = function($data, $event, index) {
		insertIfCan($data, $event, index, [$scope.toolTypes.label]);
	};

	// Вызывается, когда что-то падает на склад
	$scope.onGarbageDropComplete = function($data, $event, hole) {
		restoreTools($data);
	};

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
			if(tool.type == $scope.toolTypes.socketBinding) {
				if($scope.mode == $scope.modes.shelf) {
					showFreePlaces($scope.currentShelf.hsocketPlaces, canInsertSocketBinding);
				} else {
					showFreePlaces($scope.sockets, canInsertSocketBinding);
				}
			}
			if(tool.type == $scope.toolTypes.shelf || tool.type == $scope.toolTypes.hole || tool.type == $scope.toolTypes.guide) {
				$scope.machine.class = $scope.classes.canDrop;
			}
			if(tool.type == $scope.toolTypes.socket) {
				$scope.machine.socketClass = $scope.classes.canDrop;
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
			removeClasses($scope.sockets);
			$scope.machine.class = $scope.classes.noClass;
			$scope.machine.socketClass = $scope.classes.noClass;
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
		if(tool.type != $scope.toolTypes.label && tool.type != $scope.toolTypes.socketBinding) {
			$scope.getTool(tool.name).count++;

			if(tool.type == $scope.toolTypes.shelf) {
				restoreShelf(tool);
			}

			if(tool.type == $scope.toolTypes.spiral) {
				restoreSpiral(tool);
			}
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
		if($scope.mode == $scope.modes.shelf) {
			var label = 1;
			for(var i = 0; i < sockets.length; i++) {
				if(sockets[i].item) {
					sockets[i].item.label = label;
					label++;
				}
			}
		} else {
			$timeout(function() {
				var _sockets = $('.socket').not('.hidden');
				_sockets = _sockets.toArray();

				_sockets.sort(function(a, b){
					var aIndex = $(a).offset().top;
					var bIndex = $(b).offset().top;
					return (aIndex > bIndex);
				});

				for(var i = 0; i < _sockets.length; i++) {
					var socketDom = $(_sockets[i]);
					var socketIndex = parseInt(socketDom.attr('index'));
					$scope.sockets[socketIndex].label = i + 1;
				}
			});
		}
	}

	function drawBindings() {
		$timeout(function() {
			if($scope.mode == $scope.modes.shelf) {
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
							//var distanceToCenter = $(motor).width() / 2.0 - $(hsocket).width() / 2.0;
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
			} else {
				var shelves = $('.shelf');
				shelves.each(function(shelfDomIndex) {
					var shelfDom = $(this);
					var shelfObjectIndex = parseInt(shelfDom.attr('index'));
					var shelfObject = $scope.shelves[shelfObjectIndex];

					if(shelfObject.socket !== undefined) {
						var socketObjectIndex = shelfObject.socket.index;
						var socket = $('.socket[index="' + socketObjectIndex + '"]').first();
						var shelfWidth = shelfDom.width();
						var shelfOffset = shelfDom.offset();
						var socketOffset = socket.offset();
						var x = socketOffset.left - shelfOffset.left - shelfWidth;
						var y = shelfOffset.top - socketOffset.top;
						var width = Math.sqrt(x * x + y * y);
						var radAngle = Math.asin(y / width);
						var angle = - 57.325 * radAngle;

						shelfObject.socketBindingStyle = {
							width: width,
							height: '2px',
							'background-color': "#000000",
							position: 'absolute',
							'z-index': 0,
							'right': - (Math.cos(radAngle) * 0.5 * width + width * 0.5) + 'px',
							'margin-top': - y / 2.0 + 'px',

							'-moz-transform': 'rotate(' + angle + 'deg)',
							'-webkit-transform': 'rotate(' + angle + 'deg)',
							'-o-transform': 'rotate(' + angle + 'deg)',
							'-ms-transform': 'rotate(' + angle + 'deg)',
							'transform':' rotate(' + angle + 'deg)'
						};
					}
				});
			}
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

	function restructActions(actionsName) {
		var actions = {};
		angular.forEach($scope[actionsName], function(action, key) {
			actions[$scope.toolTypes[key]] = action;
		});
		$scope[actionsName] = actions;
	}

	function lessThanZero(number) {
		return (number === 0 || number === null || isNaN(number) || number < 0);
	}

	function select(tool) {
		if($scope.currentElem) {
			$scope.currentElem.selected = false;
		}
		$scope.currentElem = tool;
		$scope.currentElem.selected = true;
	}

	function initSettings() {
		$scope.placesOnShelf       = 12;    // Количество мест на полке
		$scope.maxWidth            = 450.0; // Ширина автомата в пикселях без зума

		$scope.realHeight          = 300.0; // Высота автомата в миллиметрах
		$scope.realWidth           = 300.0; // Ширина автомата в миллиметрах
		$scope.zoom                = 100.0;

		$scope.machineSpiralWidth  = 26;  // Ширина спирали на автомате
		$scope.machineSkiWidth     = 12;  // Ширина лыжи на автомате

		$scope.motorPlaceHeight    = 30;  // Длина места для мотора
		$scope.hsocketPlaceHeight  = 30;  // Длина места для горизонтального сокета
		$scope.labelDetectorHeight = 25;  // Высота подписи
		$scope.motorHeight         = 20;  // Высота мотора
		$scope.hsocketHeight       = 20;  // Высота горизонтального сокета

		$scope.labelsLinesCount    = 3;   // Количество линий надписей

		$scope.detectorMargin      = 2;   // Отступы детекторов
		$scope.shelfPlaceOffset    = 15;  // Ширина отступа слева и справа полки

		resetScale();

		$scope.setSettings = function(type) {
			if(lessThanZero($scope.zoom)) $scope.zoom = 1;
			if(lessThanZero($scope.realWidth)) $scope.realWidth = 1;
			if(lessThanZero($scope.realHeight)) $scope.realHeight = 1;

			var hwCoef    = $scope.realHeight / $scope.realWidth;
			var zoomCoef  = $scope.zoom / 100.0;
			$scope.height = $scope.maxWidth * hwCoef * zoomCoef;
			$scope.width  = $scope.maxWidth * zoomCoef;
			$scope.heightMulty =  $scope.realHeight / $scope.height;

			$scope.shelfPlaceWidth    = ($scope.width - 2 * $scope.shelfPlaceOffset) / $scope.placesOnShelf; //45.0; //* zoomCoef;  // Ширина одного места на полке
			$scope.spiralWidth        = $scope.shelfPlaceWidth * 0.9; //41.0; //* zoomCoef;  // Ширина спирали на полке
			$scope.spiralPlaceHeight  = 370.0; //* zoomCoef; // Длина места для спирали
			$scope.splitterWidth      = $scope.shelfPlaceWidth * 0.18; //8.0; //* zoomCoef;   // Ширина разделителя
			$scope.divisionHeight     = $scope.height / (($scope.realHeight) / 20.0);

			$scope.detectorWidth      = $scope.shelfPlaceWidth - 2 * $scope.detectorMargin;     // Ширина детектора без отступов
			$scope.labelWidth         = $scope.detectorWidth * 1.5;
			$scope.labelTextWidth     = $scope.labelWidth - 4;
			$scope.singleMotorWidth   = 1 * parseInt($scope.shelfPlaceWidth) + parseInt($scope.shelfPlaceWidth) / 3;
			$scope.doubleMotorWidth   = 3 * parseInt($scope.shelfPlaceWidth) + parseInt($scope.shelfPlaceWidth) / 3;
			$scope.singleHsocketWidth = $scope.singleMotorWidth;
			$scope.shelfLength        = $scope.motorPlaceHeight +  $scope.hsocketPlaceHeight + $scope.spiralPlaceHeight;     // Длина полки
			
			$scope.railHeight         = $scope.spiralPlaceHeight - 20;
			$scope.skiHeight          = $scope.spiralPlaceHeight - 10;                          // Длина лыжи
			$scope.spiralHeight       = $scope.spiralPlaceHeight - 10;                          // Длина спирали
			$scope.splitterHeight     = $scope.spiralPlaceHeight - 5;                           // Длина разделителя

			$scope.spiralLeft         = ($scope.detectorWidth - $scope.spiralWidth)      / 2.0; // Отступ спирали на полке
			$scope.splitterLeft       = ($scope.detectorWidth - $scope.splitterWidth)    / 2.0; // Отступ разделителя на полке
			$scope.singleMotorLeft    = ($scope.detectorWidth - $scope.singleMotorWidth) / 2.0; // Отступ мотора на полке
			$scope.doubleMotorLeft    = ($scope.detectorWidth - $scope.doubleMotorWidth) / 2.0; // Отступ двойного мотора на полке
			$scope.labelTextLeft      = ($scope.labelWidth    - $scope.labelTextWidth)   / 2.0; // Отступ спирали на полке

			$scope.machineSpiralLeft      = ($scope.shelfPlaceWidth - $scope.machineSpiralWidth - 4) / 2.0;
			$scope.machineSplitterLeft    = ($scope.shelfPlaceWidth - $scope.splitterWidth) / 2.0;
			$scope.machineSingleMotorLeft = ($scope.shelfPlaceWidth - $scope.singleMotorWidth) / 2.0;
			$scope.machineDoubleMotorLeft = ($scope.shelfPlaceWidth - $scope.doubleMotorWidth) / 2.0;
			$scope.machineSkiLeft         = ($scope.machineSpiralWidth - $scope.machineSkiWidth) / 2.0;

			$scope.settings = {
				allWidth:           { width: $scope.placesOnShelf * $scope.shelfPlaceWidth + 400 },
				shelfWidth:         { width: $scope.placesOnShelf * $scope.shelfPlaceWidth + 2 * $scope.shelfPlaceOffset },
				machine:            { width: $scope.placesOnShelf * $scope.shelfPlaceWidth + 2 * $scope.shelfPlaceOffset, height: $scope.height },
				sockets:            { height: $scope.height },
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

			resetElementsOnMachine();
			drawBindings();

			$scope.oldRealWidth = $scope.realWidth;
			$scope.oldRealHeight = $scope.realHeight;
			$scope.oldZoom = $scope.zoom;

			function resetElementsOnMachine() {
				if(type == 'height') {
					onHeightChange($scope.shelves);
					onHeightChange($scope.holes);
					onHeightChange($scope.guides);
					onHeightChange($scope.sockets);
				}

				if(type == 'width') {
					onWidthChange($scope.shelves);
					onWidthChange($scope.holes);
					onWidthChange($scope.guides);
					onWidthChange($scope.sockets);
				}

				if(type == 'zoom') {
					onZoomChange($scope.shelves);
					onZoomChange($scope.holes);
					onZoomChange($scope.guides);
					onZoomChange($scope.sockets);
				}

				function onHeightChange(array) {
					angular.forEach(array, function(elem, index) {
						if(elem.style.top > $scope.height) {
							restoreTools(elem);
							$scope.deleteActions[elem.type](index);
						}
					});

					resetScale();
				}

				function onWidthChange(array) {
					var widthMulty = $scope.realWidth / $scope.oldRealWidth;
					angular.forEach(array, function(elem, index) {
						elem.style.top = elem.style.top / widthMulty;
						if(elem.type == $scope.toolTypes.shelf) {
							elem.buttonStyle.top = elem.buttonStyle.top / widthMulty;
						}
					});
				}

				function onZoomChange(array) {
					var zoomMulty = $scope.zoom / $scope.oldZoom;
					angular.forEach(array, function(elem, index) {
						elem.style.top = elem.style.top * zoomMulty;
						if(elem.type == $scope.toolTypes.shelf) {
							elem.style.width = elem.style.width * zoomMulty;
							elem.buttonStyle.top = elem.buttonStyle.top * zoomMulty;
						}
					});
				}
			}
		};

		$scope.setHeight = function() {
			var elem = $scope.currentElem;

			if(lessThanZero($scope.elemHeight)) {
				$scope.elemHeight = 0;
			}
			if($scope.elemHeight > $scope.realHeight) {
				$scope.elemHeight = $scope.realHeight;
			}

			elem.style.top = $scope.elemHeight / $scope.heightMulty;
			if(elem.type === $scope.toolTypes.shelf) {
				elem.buttonStyle.top = elem.style.top - 10;
				drawBindings();
			}
			if(elem.type === $scope.toolTypes.socket) {
				elem.height = $scope.elemHeight;
				drawBindings();
				renumberSockets();
			}
		};

		function resetScale() {
			$scope.divisions = [];
			var divCount = Math.floor($scope.realHeight / 20.0) + 1;
			for(var i = 0; i < divCount; i++) {
				$scope.divisions.push(i * 20);
			}
		}

		$scope.setSettings();
	}
};