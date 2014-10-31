function Indicators() {
	return {
		link: function($scope, element, attrs) {
			if(attrs.toolName === undefined || attrs.toolName === "" ||
				attrs.indicatorName === undefined || attrs.indicatorName === "") return;

			$(element).css({position: 'relative'});

			switch(attrs.indicatorName) {
				case 'direction':
					createDirections();
					break;
			}

			function createDirections() {
				var tool = $scope.getTool(attrs.toolName);
				if(tool.type == $scope.toolTypes.spiral ||
					tool.type == $scope.toolTypes.singleMotor) {
						var direction = $('<div class="tool-indicator"></div>');
						direction.addClass(tool.indicators.direction[0]);
						direction.css({
							position: 'absolute',
							left: '50%',
							'margin-left': '-9px'
						});
						$(element).append(direction);
				}

				if(tool.type == $scope.toolTypes.doubleMotor) {
						var leftDirection  = $('<div class="tool-indicator"></div>');
						var rightDirection = $('<div class="tool-indicator"></div>');

						leftDirection.addClass(tool.indicators.direction[0]);
						rightDirection.addClass(tool.indicators.direction[1]);

						leftDirection.css({float: 'left', 'margin-left': '11px'});
						rightDirection.css({float: 'right', 'margin-right': '11px'});

						$(element).append(leftDirection);
						$(element).append(rightDirection);
				}
			}
		}
	};
}

function ToolContainer() {
	return {
		link: function($scope, element, attrs) {
			setHeight();

			$(window).on('resize', function() {
				setHeight();
			});

			function setHeight() {
				$(element).css({
					height: $(window).height() - 60
				});
			}
		}
	};
}

app.directive('indicators', [Indicators]);
app.directive('toolContainer', [ToolContainer]);