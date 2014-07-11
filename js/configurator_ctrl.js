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
		doubleMotor: 4,
		emptity: 5
	};

	$scope.classes = {
		canDrop: "can-drop",
		canNotDrop: "can-not-drop",
		canNotDropButShow: "can-not-drop-but-show",
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
			],
			motorPlaces: [
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

		splitter: {
			type: $scope.toolTypes.splitter,
			name: "Разделитель",
			toolClass: "splitter-tool",
			objectClass: "splitter"
		},

		singleMotor: {
			type: $scope.toolTypes.singleMotor,
			name: "Мотор",
			toolClass: "single-motor-tool",
			objectClass: "single-motor"
		},

		doubleMotor: {
			type: $scope.toolTypes.doubleMotor,
			name: "Двойной мотор",
			toolClass: "double-motor-tool",
			objectClass: "double-motor"
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
	$scope.onItemDragComplete = function($data, $event, spiralPlace) {
		var dataType = spiralPlace.item.type;
		switch(dataType) {
			case $scope.toolTypes.spiral:
				deleteEmptinessesOnEdges($scope.currentShelf, spiralPlace.item.index, $scope.toolTypes);
				spiralPlace.item = undefined;
				break;

			case $scope.toolTypes.splitter:
				spiralPlace.item = getNewItemAfterSplitter(spiralPlace.item.index, $scope.toolTypes);
				break;

			default:
				spiralPlace.item = undefined;
				break;
		}
	};

	/*function deleteEmptinessesOnEdges (index) {
		if(index > 0) {
			if(isEmptiness(index - 1)) {
				deleteLeftEmptity(index);
			}
		}

		if(index < $scope.currentShelf.spiralPlaces.length - 1) {
			if(isEmptiness(index + 1)) {
				deleteRightEmptity(index);
			}
		}
	}*/

	/*function isEmptiness(index) {
		var item = $scope.currentShelf.spiralPlaces[index].item;

		if(item === undefined) {
			return false;
		}

		if(item.type === $scope.toolTypes.emptity) {
			return true;
		}

		return false;
	}*/

	function getNewItemAfterSplitter (index) {
		var newItem;

		if(index > 0) {
			if(isSpiral(index - 1)) {
				newItem = $.extend(true, {}, $scope.emptity);
			}
		}

		if(index < $scope.currentShelf.spiralPlaces.length - 1) {
			if(isSpiral(index + 1)) {
				newItem = $.extend(true, {}, $scope.emptity);
			}
		}

		return newItem;
	}

	function isSpiral (index) {
		var item = $scope.currentShelf.spiralPlaces[index].item;

		if(item === undefined) {
			return false;
		}

		if(item.type === $scope.toolTypes.spiral) {
			return true;
		}

		return false;
	}

	function deleteLeftEmptity(index) {
		if(!isThereSpiralLeft(index)) {
			$scope.currentShelf.spiralPlaces[index - 1].item = undefined;
		}
	}

	function deleteRightEmptity(index) {
		if(!isThereSpiralRight(index)) {
			$scope.currentShelf.spiralPlaces[index + 1].item = undefined;
		}
	}

	function isThereSpiralRight(index) {
		var length = $scope.currentShelf.spiralPlaces.length;

		if(index == length - 2) {
			return false;
		}

		return isSpiral(index + 2);
	}

	function isThereSpiralLeft(index) {
		if(index == 1) {
			return false;
		}

		return isSpiral(index - 2);
	}

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
		var dataType = $data.type;
		var spiralPlace = $scope.currentShelf.spiralPlaces[index];

		switch(dataType) {
			case $scope.toolTypes.spiral:
				if(spiralPlace.item === undefined) {
					spiralPlace.item = $.extend(true, {}, $data);
					spiralPlace.item.index = index;
					addEmptinessesOnEdges(index);
				}
				break;

			case $scope.toolTypes.splitter:
				if(canInsertSplitter(spiralPlace)) {
					spiralPlace.item = $.extend(true, {}, $data);
					spiralPlace.item.index = index;
				}
				break;
		}
	};

	$scope.onMotorPlaceDropComplete = function($data, $event, index) {
		var dataType = $data.type;
		var motorPlace = $scope.currentShelf.motorPlaces[index];

		switch(dataType) {
			case $scope.toolTypes.doubleMotor:
				if(canInsertDoubleMotor(index)) {
					motorPlace.item = $.extend(true, {}, $data);
					motorPlace.item.index = index;
				}
				break;
		}
	};

	function canInsertSplitter(spiralPlace) {
		if(spiralPlace.item === undefined) {
			return true;
		}

		if(spiralPlace.item.type == $scope.toolTypes.emptity) {
			return true;
		}

		return false;
	}

	function addEmptinessesOnEdges(index) {
		if(index > 0) {
			if(canAddEmptiness(index - 1)) {
				$scope.currentShelf.spiralPlaces[index - 1].item = $.extend(true, {}, $scope.emptity);
			}
		}

		if(index < $scope.currentShelf.spiralPlaces.length - 1) {
			if(canAddEmptiness(index + 1)) {
				$scope.currentShelf.spiralPlaces[index + 1].item = $.extend(true, {}, $scope.emptity);
			}
		}
	}

	function canAddEmptiness (index) {
		var item = $scope.currentShelf.spiralPlaces[index].item;

		if(item === undefined) {
			return true;
		}

		return false;
	}

	function canInsertDoubleMotor(index) {
		return twoSpiralsCenter(index);
	}

	// Вызывается, когда что-то падает на мусор
	$scope.onGarbageDropComplete = function($data, $event, hole) {};

	// Вызывается при нажатии на инструмент или элемент
	$scope.onToolMouseDown = function(tool, index) {
		tool.mouseOver = true;

		switch(tool.type) {
			case $scope.toolTypes.spiral:
				$scope.tools.spiral.mouseOver = true;
				addSpiralClassesToPlaces(index);
				$scope.currentTool = $scope.tools.spiral;
				break;

			case $scope.toolTypes.splitter:
				$scope.tools.splitter.mouseOver = true;
				addSplitterClassesToPlaces(index);
				$scope.currentTool = $scope.tools.splitter;
				break;

			case $scope.toolTypes.doubleMotor:
				$scope.tools.singleMotor.mouseOver = true;
				addDoubleMotorClassesToPlaces(index);
				$scope.currentTool = $scope.tools.doubleMotor;
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
				removeClassesFromPlaces();
				break;
		}
	};

	function addSpiralClassesToPlaces(index) {
		angular.forEach($scope.currentShelf.spiralPlaces, function(spiralPlace, idx) {
			if(spiralPlace.item) {
				if( spiralPlace.item.type == $scope.toolTypes.emptity && idx == index -1 && !isThereSpiralLeft(index) ||
					spiralPlace.item.type == $scope.toolTypes.emptity && idx == index + 1 && !isThereSpiralRight(index) ||
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
	}

	function addSplitterClassesToPlaces(index) {
		angular.forEach($scope.currentShelf.spiralPlaces, function(spiralPlace, idx) {
			if(spiralPlace.item && idx != index) {
				if(spiralPlace.item.type == $scope.toolTypes.emptity) {
					spiralPlace.class = $scope.classes.canDrop;
				} else {
					spiralPlace.class = $scope.classes.canNotDrop;
				}
			} else {
				spiralPlace.class = $scope.classes.canDrop;
			}
		});
	}

	function addDoubleMotorClassesToPlaces(index) {
		angular.forEach($scope.currentShelf.motorPlaces, function(motorPlace, idx) {
			if(twoSpiralsRight(idx)) {
				motorPlace.class = $scope.classes.canNotDropButShow;
				$scope.currentShelf.motorPlaces[idx + 1].class = $scope.classes.canDrop;
				$scope.currentShelf.motorPlaces[idx + 2].class = $scope.classes.canNotDropButShow;
			} else {
				if(motorPlace.class != $scope.classes.canDrop &&
					motorPlace.class != $scope.classes.canNotDropButShow) {
					motorPlace.class = $scope.classes.canNotDrop;
				}
			}
		});
	}

	function twoSpiralsRight(index) {
		var length = $scope.currentShelf.motorPlaces.length;

		if(index > length - 3) {
			return false;
		}

		if($scope.currentShelf.spiralPlaces[index].item === undefined ||
			$scope.currentShelf.spiralPlaces[index + 2].item === undefined) {
			return false;
		}

		var twoSpirals = $scope.currentShelf.spiralPlaces[index].item.type == $scope.toolTypes.spiral &&
						$scope.currentShelf.spiralPlaces[index + 2].item.type == $scope.toolTypes.spiral;
		if(!twoSpirals) {
			return false;
		}

		if($scope.currentShelf.spiralPlaces[index + 1].item === undefined) {
			return true;
		}

		if($scope.currentShelf.spiralPlaces[index + 1].item.type == $scope.toolTypes.emptity) {
			return true;
		}

		return false;
	}

	function twoSpiralsCenter(index) {
		var length = $scope.currentShelf.motorPlaces.length;

		if(index === 0 || index == length - 1) {
			return false;
		}

		if($scope.currentShelf.spiralPlaces[index - 1].item === undefined ||
			$scope.currentShelf.spiralPlaces[index + 1].item === undefined) {
			return false;
		}

		var twoSpirals = $scope.currentShelf.spiralPlaces[index - 1].item.type == $scope.toolTypes.spiral &&
						$scope.currentShelf.spiralPlaces[index + 1].item.type == $scope.toolTypes.spiral;
		if(!twoSpirals) {
			return false;
		}

		if($scope.currentShelf.spiralPlaces[index].item === undefined) {
			return true;
		}

		if($scope.currentShelf.spiralPlaces[index].item.type == $scope.toolTypes.emptity) {
			return true;
		}

		return false;
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
};