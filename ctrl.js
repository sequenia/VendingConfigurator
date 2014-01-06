var app = angular.module("app", []);

var CylinderCtrl = function ($scope) 
{
	$scope.cylinder = new CylinderItems();

	$scope.recipes = 
	{
		'Коктейль Мохито':
		{
			'inputs':  [{'name': 'Сок лайма',       'uom': 'мл', 'parts': '30'}, 
					    {'name': 'Ром Bacardi',     'uom': 'мл', 'parts': '40'},
					    {'name': 'Листики мяты',    'uom': 'шт', 'parts': '6'},
					    {'name': 'Спрайт',          'uom': 'мл', 'parts': '120'}],
			'outputs': [{'name': 'Коктейль Мохито', 'uom': 'мл', 'parts': '190'}],
			'name':    'Коктейль Мохито'
		},

		'Велосипед':
		{
			'inputs':  [{'name': 'Колесо',    'uom': 'шт', 'parts': '2', 'onHand': '50', 'accuracy': '0'}, 
					    {'name': 'Рама',      'uom': 'шт', 'parts': '1', 'accuracy': '0'},
					    {'name': 'Руль',      'uom': 'шт', 'parts': '1', 'accuracy': '0'},
					    {'name': 'Седло',     'uom': 'шт', 'parts': '1', 'onHand': '30', 'critical': '20', 'accuracy': '0'}],
			'outputs': [{'name': 'Велосипед', 'uom': 'шт', 'parts': '1', 'rounding': 'floor', 'accuracy': '0'}],
			'name':    'Велосипед'
		},

		'Тесто для пельменей':
		{
			'inputs':  [{'name': 'Мука',   'uom': 'стакан',   'parts': '6'}, 
					    {'name': 'Молоко', 'uom': 'стакан',   'parts': '1.5'},
					    {'name': 'Вода',   'uom': 'стакан',   'parts': '1'},
					    {'name': 'Яйцо',   'uom': 'шт',   'parts': '3'},
					    {'name': 'Масло',  'uom': 'ч.л.', 'parts': '3'},
					    {'name': 'Соль',   'uom': 'ч.л.', 'parts': '3'}],
			'outputs': [{'name': 'Тесто',  'uom': 'гр',   'parts': '1500'}],
			'name':    'Тесто для пельменей'
		},

		'Бетон':
		{
			'inputs':  [{'name': 'Вода',   'uom': 'куб.м.', 'parts': '10.5'},
					    {'name': 'Песок',  'uom': 'куб.м.', 'parts': '11'},
					    {'name': 'Цемент', 'uom': 'куб.м.', 'parts': '1'},
					    {'name': 'Щебень', 'uom': 'куб.м.', 'parts': '2.5'}],
			'outputs': [{'name': 'Бетон',  'uom': 'куб.м.', 'parts': '25'}],
			'name':    'Бетон'
		},

		'Горение бензина':
		{
			'inputs':  [{'name': 'Бензин',           'uom': 'г',  'parts': '8.2'},
						{'name': 'Воздух',           'uom': 'г',  'parts': '125.1'}],
			'outputs': [{'name': 'Азот',             'uom': 'л',  'parts': '77'},
			            {'name': 'Кислород',         'uom': 'л',  'parts': '8'},
			            {'name': 'Пары воды',        'uom': 'л',  'parts': '5.5'},
			            {'name': 'Диоксид углерода', 'uom': 'л',  'parts': '12'},
			            {'name': 'Оксид углерода',   'uom': 'л',  'parts': '10'},
			            {'name': 'Углеводороды неканцерогенные',  'uom': 'л', 'parts': '3'},
			            {'name': 'Альдегиды',        'uom': 'л',  'parts': '0.2'},
			            {'name': 'Оксид серы',       'uom': 'л',  'parts': '0.002'},
			            {'name': 'Сажа',             'uom': 'л',  'parts': '0.04'},
			            {'name': 'Бензопирен',       'uom': 'л',  'parts': '0.02'}],
			'name':    'Горение бензина'
		}
	};

	$scope.recipeName = 'Коктейль Мохито';

	$scope.colInputType = function()
	{
		var type = Math.ceil(12 / $scope.recipes[$scope.recipeName].inputs.length);
		if(type < 3) type = 3; 
		return type;
	};

	$scope.colOutputType = function()
	{
		var type = Math.ceil(12 / $scope.recipes[$scope.recipeName].outputs.length);
		if(type < 3) type = 3; 
		return type;
	};
};

app.controller("CylinderCtrl", CylinderCtrl);

app.directive('cylinder', CylinderDirective);