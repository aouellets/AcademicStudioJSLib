// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available




//List of useful globale variables 

var currentView = Home;
var currentSeletion = '';
var playingModel = '';
var playingSequence = '';
var CurrentStep = 0;


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

  
  // A function that sets the sequence of a selected model to a step
  //argument must be an integer and a model with single quote notation 
  
  $scope.setStep = function (Step,playingModel) {
    $scope.app.view.currentView.wdg[playingModel]['currentStep']= Step;
    CurrentStep = Step;
  }

  //a function that updates the progress bar to refelct the current step
  // to use, invoke the function and it will use the global var current step to update 

  $scope.setProgressBar = function () {
    
    for (const n of ['1', '2', '3', '4',
                     '5', '6','7','8'])
      if (n == Step)
        $scope.app
              .view
              .currentView
              .wdg[`toggleButton-${n}`]
              .pressed = true;
    
        else if ( n !== Step)
        $scope.app
                .view
                .currentView
                .wdg[`toggleButton-${n}`]
                .pressed = false;
    
  }
    
    //given an image widget and a resource, changes the resource of the image 
    $scope.changeResource = function(widget,resource){
      $scope.app.view.wdg[widget].imgsrc = resource;
    };
    
    
    //given a widget and a state (T/F), invokes the changeResource function and changes the state 
    $scope.toggleItem = function (widget,state){
    };
    
    // a function that advances all the icons to to next step 
    $scope.nextStep = function(){
    };
    
    // a function that rewinds all the icons to the previous step 
    $scope.prevStep = function (){
    };
    
    
    // a function that is invoked on play that advances Icons to the next step, and selects the appropriate geometry via selectGeometry 
    $scope.playStep = function (){
    };
    
    // a function that is invoked on prev that rewinds the icons to the previous step, and rewinds the geometry selection 
    $scope.backStep = function (){
    };
    
  
  
  //this function plays 1 step of the currently selected model
  $scope.playSequence = function () {
    $scope.$broadcast('app.view[playingModel].svc.play');
  };
  
  
  
  //.view.Repair_Sequence_1.wdg["toggleButton-1"].pressed
  
  $scope.backSequence = function () {
   if (CurrentStep >= 1) {
     $scope.app.view.Repair_Sequence_1.wdg['toggleButton-' + CurrentStep].unpressed = true;
     $scope.app.view.Repair_Sequence_1.wdg['toggleButton-' + CurrentStep].pressed = false;
   }
   CurrentStep = CurrentStep -1;
   $scope.app.view.Repair_Sequence_1.wdg['toggleButton-' + CurrentStep].pressed = true;
    
    console.log(CurrentStep);
    
    if (CurrentStep >= 8) {
     //$scope.app.view.Repair_Sequence_1.wdg['toggleButton-' + CurrentStep].unpressed = true;
     //$scope.app.view.Repair_Sequence_1.wdg['toggleButton-' + CurrentStep].pressed = false;
      CurrentStep = 0;
    }
    if (CurrentStep == 1) {
     $scope.app.view.Repair_Sequence_1.wdg['toggleButton-8'].unpressed = true;
     $scope.app.view.Repair_Sequence_1.wdg['toggleButton-8'].pressed = false;
    }
  };
  
  
  
  //.view.Repair_Sequence_1.wdg["toggleButton-1"].notpressed
    
    // creates a function that stores the selected model item for each step in a list 
  
  // e.g in step 1, I need to select model items with names 'ModelItemA' and 'ModelItemB'
  //we should then be able to use the selectGeometry function on these model items. 
    $scope.selectModelItem = function(){
      $scope.app.params.modelList = [
        {
          "display": "Step 1",
          "value": "modelItem-1" 
        }
        , 
        {
          "display": "Step 2",
          "value": "modelItem-2" 
        }
        , 
        {
          "display": "Step 3",
          "value": "modelItem-3" 
        }
        , 
        {
          "display": "Step 4",
          "value": "modelItem-4" 
        }
        , 
        {
          "display": "Step 5",
          "value": "modelItem-5" 
        }
        , 
        {
          "display": "Step 6",
          "value": "modelItem-6" 
        }
        , 
        {
          "display": "Step 7",
          "value": "modelItem-7" 
        }
        , 
        ]
    };
    
    
    /**
    
    $scope.setSequenceList = function(){
      $scope.app.params.sequenceList = [
        {
          "display":"Elbow Replacement",
          "value":"app/resources/Uploaded/industrial_robot_1/l-Creo%203D%20-%20ElbowMotorReplacement.pvi"
        }
        ,
        {
          "display":"Shoulder Motor",
          "value":"app/resources/Uploaded/industrial_robot_1/l-Creo%203D%20-%20ShoulderReplacement.pvi"
        }
      ]
    }
    $scope.setSequenceList();
    
    */
    
  