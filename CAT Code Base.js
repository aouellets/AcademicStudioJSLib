// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available





//List of useful globale variables 

var currentView = Home;
var currentSeletion = '';


// Console log is a function that prints the JSON Object to the developer tools console for debugging 
$scope.consoleLog = function() {
	console.log($scope.app);
}

//occulde is a function that toggles the occslusion of a selected object
// the function takes a model or model item as an argument and flips the occulde state of the object 
// argument must be handed to the function in single quote notation e.g. : 'model-1' , 'modelItem-1' 
$scope.occlude = function(occludeGeomety){
  
  
  if ($scope.app.view.Technician_Dashboard.wdg[occludeGeomety].occlude == true)
    $scope.app.view.Technician_Dashboard.wdg[occludeGeomety].occlude = false;
  
  else {
      $scope.app.view.Technician_Dashboard.wdg[occludeGeomety].occlude = true;
  }

}


// given a piece of geometry and a shader, applies shader to geometry 
// geometry and shader arguments must use single quotes 
 
 
$scope.selectGeometry = function(geometry,shader){
    $scope.app.view.currentView.wdg[geometry]['shader'] = shader;
    $scope.app.view.currentView.wdg[geometry]

}


// a function that toggles applying a shader to a single piece of geometry among an array of options 
$scope.ToggleGeometry = function(geometry){
  
    const {wdg} = $scope.app.view.currentView;
    for (const item of[
        'property-1',
	    'property-2',
	    'property-3',
	    'property-4',
	    'item-1',
        'item-2',
        'item-3',
        'item-4',
       ])
      
    if (item == geometry)
      wdg[`modelItem-${n}`]['shader'] = 'xray_green';
  
  
  if (item !== geometry)
      wdg[`modelItem-${n}`]['shader'] = 'xray_blue';
      
};


/*====================================
=            Data toggles            =
====================================*/
var Simulator_Ticks = 3;
var Simulator_Tick_count = 0;
var TICK_DURATION = 10000;



var simDateLastService = "March 23, 2018";

$scope.randomServiceTime = function(min=20, max=200) {
	return Math.floor(Math.random()*max+min)
}

// Fan Belt
var simFanBeltSlippage = ["0.85", "0.87", "0.88"];
var simFanBeltRPM = ["1560", "2120", "1950"];
var simFanBeltTemperature = ["230ºF", "250ºF", "280ºF"];
var simFanBeltServiceTime = $scope.randomServiceTime();

// Air Filter
var simAirFilterPressure = ["4 PSI", "6 PSI", "3 PSI"];
var simAirFilterTemperature = ["181ºF", "210ºF", "192ºF"];
var simAirFilterServiceTime = $scope.randomServiceTime();

// Primary Oil Filter
var simPrimaryOilPressure = ["125 PSI", "130 PSI", "135 PSI"];
var simPrimaryOilTemperature = ["253ºF", "269ºF", "285ºF"];
var simPrimaryOilServiceTime = $scope.randomServiceTime();

// Secondary Oil Filter
var simSecondaryOilPressure = ["120 PSI", "123 PSI", "125 PSI"];
var simSecondaryOilTemperature = ["213ºF", "229ºF", "215ºF"];
var simSecondaryOilServiceTime = $scope.randomServiceTime();

// Battery 
var simBatteryVoltage = ["255", "267", "246"];
var simBatteryAmps = ["153", "120", "143"];
var simBatteryTemperature = ["113ºF", "129ºF", "115ºF"];
var simBatteryServiceTime = $scope.randomServiceTime();

// Hoses
var simHosesPressure = ["32 PSI", "35 PSI", "31 PSI"];
var simHosesTemperature = ["253ºF", "269ºF", "285ºF"];
var simHosesServiceTime = $scope.randomServiceTime();


$scope.randomIntFromInterval = function(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

$scope.runSimulator = function() {
	// static data
	$scope.app.params.simFanBeltServiceTime = simFanBeltServiceTime;
	$scope.app.params.simAirFilterServiceTime = simAirFilterServiceTime;
	$scope.app.params.simPrimaryOilServiceTime = simPrimaryOilServiceTime;
	$scope.app.params.simSecondaryOilServiceTime = simSecondaryOilServiceTime;
	$scope.app.params.simBatteryServiceTime = simBatteryServiceTime;
	$scope.app.params.simHosesServiceTime = simHosesServiceTime;
	$scope.app.params.simDateLastService = simDateLastService;


	// dynamic data
	if (Simulator_Tick_count > Simulator_Ticks) {
		//Fan Belt
		$scope.app.params.simFanBeltSlippage = simFanBeltSlippage[$scope.randomIntFromInterval(0, simFanBeltSlippage.length-1)];
		$scope.app.params.simFanBeltRPM = simFanBeltRPM[$scope.randomIntFromInterval(0, simFanBeltRPM.length-1)];
		$scope.app.params.simFanBeltTemperature = simFanBeltTemperature[$scope.randomIntFromInterval(0, simFanBeltTemperature.length-1)];
		//Air Filter
		$scope.app.params.simAirFilterPressure = simAirFilterPressure[$scope.randomIntFromInterval(0, simAirFilterPressure.length-1)];
		$scope.app.params.simAirFilterTemperature = simAirFilterTemperature[$scope.randomIntFromInterval(0, simAirFilterTemperature.length-1)];

		//Primary Oil
		$scope.app.params.simPrimaryOilPressure = simPrimaryOilPressure[$scope.randomIntFromInterval(0, simPrimaryOilPressure.length-1)];
		$scope.app.params.simPrimaryOilTemperature = simPrimaryOilTemperature[$scope.randomIntFromInterval(0, simPrimaryOilTemperature.length-1)];

		//Secondary Oil
		$scope.app.params.simSecondaryOilPressure = simSecondaryOilPressure[$scope.randomIntFromInterval(0, simSecondaryOilPressure.length-1)];
		$scope.app.params.simSecondaryOilTemperature = simSecondaryOilTemperature[$scope.randomIntFromInterval(0, simSecondaryOilTemperature.length-1)];

		//Battery
		$scope.app.params.simBatteryVoltage = simBatteryVoltage[$scope.randomIntFromInterval(0, simBatteryVoltage.length-1)];
		$scope.app.params.simBatteryAmps = simBatteryAmps[$scope.randomIntFromInterval(0, simBatteryAmps.length-1)];
		$scope.app.params.simBatteryTemperature = simBatteryTemperature[$scope.randomIntFromInterval(0, simBatteryTemperature.length-1)];

		//Hoses
		$scope.app.params.simHosesPressure = simHosesPressure[$scope.randomIntFromInterval(0, simHosesPressure.length-1)];
		$scope.app.params.simHosesTemperature = simHosesTemperature[$scope.randomIntFromInterval(0, simHosesTemperature.length-1)];

		Simulator_Tick_count = 0;
	}
	else {Simulator_Tick_count++;}
}

setInterval(function() {
	$scope.$apply(function(){
		$scope.runSimulator();
	});
}), TICK_DURATION;


/**
 *
 * Show/hide data panels
 *
 */


$scope.app.params.ToggleFanBelt = false;
$scope.app.params.ToggleAir = false;
$scope.app.params.TogglePrimaryOil = false;
$scope.app.params.ToggleSecondaryOil = false;
$scope.app.params.ToggleBattery = false;
$scope.app.params.ToggleHoses = false;

$scope.toggleFanBeltData = function() {
	$scope.app.params.ToggleFanBelt = !($scope.app.params.ToggleFanBelt);
}
$scope.toggleAirData = function() {
	$scope.app.params.ToggleAir = !($scope.app.params.ToggleAir);
}
$scope.togglePrimaryOilData = function() {
	$scope.app.params.TogglePrimaryOil = !($scope.app.params.TogglePrimaryOil);
}
$scope.toggleSecondaryOilData = function() {
	$scope.app.params.ToggleSecondaryOil = !($scope.app.params.ToggleSecondaryOil);
}
$scope.toggleBatteryData = function() {
	$scope.app.params.ToggleBattery = !($scope.app.params.ToggleBattery);
}
$scope.toggleHosesData = function() {
	$scope.app.params.ToggleHoses = !($scope.app.params.ToggleHoses);
}




 
$scope.toggleButtons = function(name) {
	const {wdg} = $scope.app.view.Technician_Dashboard;
	for (const n of Object.freeze([
		'Battery',
		'BeltFan',
		'FilterAir',
		'FilterOilPrimary',
		'FilterOilSecondary',
		'Hoses',
	]))
	if (n !== name)
		wdg[`toggleButton-${n}`].pressed = false;
};


/*=============================================
=            Shader code for model            =
=============================================*/


$scope.highlightBlue = function (){
  
  
  //modelItem-FilterOilPrimary
  
  
  //.view.Technician_Dashboard.wdg["modelItem-FilterOilPrimary"].shader
  
  
  ///Hoses Section ////
  
  	$scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-1']['shader'] = "xray_blue";
  console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-1']['shader']);
  
	$scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-2']['shader'] = "xray_blue";
  console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-2']['shader']);
  
	$scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-3']['shader'] = "xray_blue";
  console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-3']['shader']);
  
	$scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-4']['shader'] = "xray_blue";
  console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-4']['shader']);
  
	$scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-5']['shader'] = "xray_blue";
  console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-5']['shader']);
  
  // Air Filter //
  
  $scope.app.view.Technician_Dashboard.wdg['modelItem-AirFilter']['shader'] = "xray_blue";
  console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-AirFilter']['shader']);
  
  // Battery //
  $scope.app.view.Technician_Dashboard.wdg['modelItem-Battery']['shader'] = "xray_blue";
  console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-Battery']['shader']);
  
  //Belt Fan
  $scope.app.view.Technician_Dashboard.wdg['modelItem-BeltFan']['shader'] = "xray_blue";
  console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-BeltFan']['shader']);
  
  // Filter Air ???? ////
	//$scope.app.view.Technician_Dashboard.wdg['modelItem-FilterAir']['shader'] = "xray_blue";
  //console.log(	$scope.app.view.Technician_Dashboard.wdg['modelItem-FilterAir']['shader']);
  
  // Oil Filter //
 
  
   $scope.app.view.Technician_Dashboard.wdg['modelItem-FilterOil']['shader'] = 'xray_blue';
  	console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-FilterOil']['shader']);
  
  
	$scope.app.view.Technician_Dashboard.wdg['modelItem-FilterOilSecondary']['shader'] = "xray_blue";
	console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-FilterOilSecondary']['shader']);
}
  
/*

$scope.highightFilter = function (){
  $scope.app.view.Technician_Dashboard.wdg['modelItem-FilterOil']['shader'] = 'xray_blue';
  	console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-FilterOil']['shader']);
  
}
 */


//Emergency Hoses Shader Fix// 

$scope.hoseFix = function () {
  
  	$scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-1']['shader'] = "xray_green";
  console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-1']['shader']);
  
	$scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-2']['shader'] = "xray_green";
  console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-2']['shader']);
  
	$scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-3']['shader'] = "xray_green";
  console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-3']['shader']);
  
	$scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-4']['shader'] = "xray_green";
  console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-4']['shader']);
  
	$scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-5']['shader'] = "xray_green";
  console.log($scope.app.view.Technician_Dashboard.wdg['modelItem-Hoses-5']['shader']);
}


console.log($scope.app);
$scope.testShader = function(){
	console.log($scope.app);
	


	
}