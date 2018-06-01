// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available




//List of useful globale variables 

var currentView = $scope.app.params.viewName;
var currentSeletion = '';
var playingModel = '';
var playingSequence = '';
var CurrentStep = 0;

/*

List of functions:

Alexander Builds 
----------------

consoleLog
occlude
selectGeometry 
setStep
setProgressBar
toggleButtons
changeResource
toggleGeometry 
toggleProperty
selectModelItem
nextStep
backStep
playStep
playSequence 
rewindSequence


Vector Library
---------------

Vector

prototype:
add 
subtract 
mulitply 
divide 
dot 
cross
length 
unit 
min 
max
toAngles
anglesTo
toArray
clone 
init 
fromAngles
randomDirection 
lerp
fromArray 
AngleBetween

Shader Library
---------------

Gray Mask
Yellow Ray
Red Ray 
Blue Ray 
Green Ray
Xray blue 
xray red 
xray yellow 
xray green
Hologram 
Reflective 


*/

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
    //$scope.app.view.currentView.wdg[geometry];
    currentSeletion = geometry ;


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

          $scope.app
                .view
                .currentView
                .wdg[`toggleButton-${n}`]
                .unpressed = true;
    
  }

  // a function that toggles the states of buttons within a menu 

$scope.toggleButtons = function(name) {
	const {wdg} = $scope.app.view.currentView;
	for (const n of Object.freeze([
		'optionA',
		'optionB',
		'optionC',
		'optionD',
		'optionE',
		'optionF',
	]))
	if (n !== name)
		wdg[`toggleButton-${n}`].pressed = false;
};


    
    //given an image widget and a resource, changes the resource of the image 
    // widget name should use single quote notation, and the resource should be double quotes 

    // e.g. changeResource('Image-1',"app/resources/Uploaded/Image.jpg");

    $scope.changeResource = function(widget,resource){
      $scope.app.currentView.wdg[widget].imgsrc = resource;
      
      //example resource arugment: "app/resources/Uploaded/Image.jpg"
      //background-image: url(#{$resources}/Uploaded/image.png)
    };
    
    
    

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

    //given a widget and a property (must be boolean) the state flips
    $scope.toggleProperty = function (widget,property){

  if ($scope.app.view.currentView.wdg[widget].property == true)
  $scope.app.view.currentView.wdg[widget].property = false;

else {
    $scope.app.view.currentView.wdg[widget].property = true;
}

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
  
  
  
  //This function reverses the currently selected sequence 
  
  $scope.rewindSequence = function () {
    $scope.$broadcast('app.view[playingModel].svc.rewind');
   
   /*
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

    */
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
    
   function Vector(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
  
  Vector.prototype = {
    negative: function() {
      return new Vector(-this.x, -this.y, -this.z);
    },
    add: function(v) {
      if (v instanceof Vector) return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
      else return new Vector(this.x + v, this.y + v, this.z + v);
    },
    subtract: function(v) {
      if (v instanceof Vector) return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
      else return new Vector(this.x - v, this.y - v, this.z - v);
    },
    multiply: function(v) {
      if (v instanceof Vector) return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
      else return new Vector(this.x * v, this.y * v, this.z * v);
    },
    divide: function(v) {
      if (v instanceof Vector) return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
      else return new Vector(this.x / v, this.y / v, this.z / v);
    },
    equals: function(v) {
      return this.x == v.x && this.y == v.y && this.z == v.z;
    },
    dot: function(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    },
    cross: function(v) {
      return new Vector(
        this.y * v.z - this.z * v.y,
        this.z * v.x - this.x * v.z,
        this.x * v.y - this.y * v.x
      );
    },
    length: function() {
      return Math.sqrt(this.dot(this));
    },
    unit: function() {
      return this.divide(this.length());
    },
    min: function() {
      return Math.min(Math.min(this.x, this.y), this.z);
    },
    max: function() {
      return Math.max(Math.max(this.x, this.y), this.z);
    },
    toAngles: function() {
      return {
        theta: Math.atan2(this.z, this.x),
        phi: Math.asin(this.y / this.length())
      };
    },
    angleTo: function(a) {
      return Math.acos(this.dot(a) / (this.length() * a.length()));
    },
    toArray: function(n) {
      return [this.x, this.y, this.z].slice(0, n || 3);
    },
    clone: function() {
      return new Vector(this.x, this.y, this.z);
    },
    init: function(x, y, z) {
      this.x = x; this.y = y; this.z = z;
      return this;
    }
  };
  
  Vector.negative = function(a, b) {
    b.x = -a.x; b.y = -a.y; b.z = -a.z;
    return b;
  };
  Vector.add = function(a, b, c) {
    if (b instanceof Vector) { c.x = a.x + b.x; c.y = a.y + b.y; c.z = a.z + b.z; }
    else { c.x = a.x + b; c.y = a.y + b; c.z = a.z + b; }
    return c;
  };
  Vector.subtract = function(a, b, c) {
    if (b instanceof Vector) { c.x = a.x - b.x; c.y = a.y - b.y; c.z = a.z - b.z; }
    else { c.x = a.x - b; c.y = a.y - b; c.z = a.z - b; }
    return c;
  };
  Vector.multiply = function(a, b, c) {
    if (b instanceof Vector) { c.x = a.x * b.x; c.y = a.y * b.y; c.z = a.z * b.z; }
    else { c.x = a.x * b; c.y = a.y * b; c.z = a.z * b; }
    return c;
  };
  Vector.divide = function(a, b, c) {
    if (b instanceof Vector) { c.x = a.x / b.x; c.y = a.y / b.y; c.z = a.z / b.z; }
    else { c.x = a.x / b; c.y = a.y / b; c.z = a.z / b; }
    return c;
  };
  Vector.cross = function(a, b, c) {
    c.x = a.y * b.z - a.z * b.y;
    c.y = a.z * b.x - a.x * b.z;
    c.z = a.x * b.y - a.y * b.x;
    return c;
  };
  Vector.unit = function(a, b) {
    var length = a.length();
    b.x = a.x / length;
    b.y = a.y / length;
    b.z = a.z / length;
    return b;
  };
  Vector.fromAngles = function(theta, phi) {
    return new Vector(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
  };
  Vector.randomDirection = function() {
    return Vector.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
  };
  Vector.min = function(a, b) {
    return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
  };
  Vector.max = function(a, b) {
    return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
  };
  Vector.lerp = function(a, b, fraction) {
    return b.subtract(a).multiply(fraction).add(a);
  };
  Vector.fromArray = function(a) {
    return new Vector(a[0], a[1], a[2]);
  };
  Vector.angleBetween = function(a, b) {
    return a.angleTo(b);
  };
  