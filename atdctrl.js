var app2 = angular.module("ConverterApp", []);

var truncate = function(x, _precision)
{
	var precision = _precision || 0;
	var scales = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000];
	var scale = scales[precision];
	return Math.round(x * scale) / scale;
};

var ConverterCtrl = function ($scope) 
{
	$scope.timeLimit = 20.0;

	$scope.analog = 
	{
		element:     $("#analog"),
		amplitude:   7.0,
		cyclicFrqnc: 1.0,
		accuracy:    0.1,
		value:       function(v){ return $scope.analog.amplitude * Math.sin(v * $scope.analog.cyclicFrqnc); },//Math.sin,
		points:      []
	};

	$scope.digital = 
	{
		element:        $("#digital"),
		samplingPeriod: 0.1,
		samplingFrqnc:  1.0 / 0.1,
		quantLvls:      8,
		digitCount:     3,
		points:         []
	};

	$scope.getDigitalValue = function(analogValue)
	{
		var part = 2 * $scope.analog.amplitude / $scope.digital.quantLvls;
		var partsCount = analogValue / part;
		var integerPartsCount = Math.floor(partsCount);
		var fractionalPartsCount = partsCount - integerPartsCount;
		if (fractionalPartsCount >= 0.5) integerPartsCount++;
		return integerPartsCount * part;
	};

	$scope.setAnalogSignal = function()
	{
		$scope.analog.points  = [];
		$scope.digital.points = [];
		for(var i = 0; i < $scope.timeLimit; i+= $scope.analog.accuracy)
		{
			$scope.analog.points.push([i, $scope.analog.value(i)]);
		}

		var period = 1.0 / $scope.digital.samplingFrqnc;
		for(var i = 0; i < $scope.timeLimit; i+= period)
		{
			$scope.digital.points.push([i, $scope.getDigitalValue($scope.analog.value(i))]);
			$scope.digital.points.push([i + period, $scope.getDigitalValue($scope.analog.value(i))]);
		}

		$.plot($scope.analog.element,  [$scope.analog.points],  {yaxis: {max: 10, min: -10}});
		$.plot($scope.digital.element, [$scope.digital.points], {yaxis: {max: 10, min: -10}});

	};

	$scope.setAmplitude = function(a)
	{
		$scope.analog.amplitude = a;
		$scope.setAnalogSignal();
	};

	$scope.setCyclicFrqnc = function(a)
	{
		$scope.analog.cyclicFrqnc = truncate(a, 1);
		$scope.setAnalogSignal();
	};

	$scope.setSamplingPeriod = function(a)
	{
		$scope.digital.samplingPeriod = truncate(a, 1);
		$scope.digital.samplingFrqnc = truncate(1.0 / $scope.digital.samplingPeriod, 2);
		$scope.setAnalogSignal();
	};

	$scope.setSamplingFrqnc = function(a)
	{
		$scope.digital.samplingFrqnc = truncate(a, 2);
		$scope.digital.samplingPeriod = truncate(1.0 / $scope.digital.samplingFrqnc, 1);
		$scope.setAnalogSignal();
	};

	$scope.setQuantLvls = function(a)
	{
		$scope.digital.quantLvls = a;
		$scope.setAnalogSignal();
	};

	$scope.setTimeLimit = function(a)
	{
		$scope.timeLimit = a;
		$scope.setAnalogSignal();
	};

	$scope.setDigitCount = function(a)
	{
		$scope.digital.digitCount = a;
		$scope.digital.quantLvls = Math.pow(2, a);
		$scope.setAnalogSignal();
	};

	$scope.getAmplitude = function()
	{
		return $scope.analog.amplitude;
	};

	$scope.getCyclicFrqnc = function()
	{
		return $scope.analog.cyclicFrqnc;
	};

	$scope.getSamplingPeriod = function()
	{
		return $scope.digital.samplingPeriod;
	};

	$scope.getSamplingFrqnc = function()
	{
		return $scope.digital.samplingFrqnc;
	};

	$scope.getQuantLvls = function()
	{
		return $scope.digital.quantLvls;
	};

	$scope.getTimeLimit = function()
	{
		return $scope.timeLimit;
	};

	$scope.getDigitCount = function()
	{
		return $scope.digital.digitCount;
	};

	$scope.setAnalogSignal();
}

app2.controller("ConverterCtrl", ConverterCtrl);