(function () {

    var isAnyAdjustableNumberDragging = false;

    Clarity.classes.ValueDrag = 
    {
      initialize: function (element, options, clarity, variable) 
      {
        this.element = element;
        this.clarity = clarity;
        this.variable = variable;

        this.min = (options.min !== undefined) ? parseFloat(options.min) : 1;
        this.max = (options.max !== undefined) ? parseFloat(options.max) : 10;
        this.step = (options.step !== undefined) ? parseFloat(options.step) : 1;
        this.setter = (options.setter !== undefined) ? options.setter : "";
        this.getter = (options.getter !== undefined) ? options.getter : "";

        if(options.label)
        {
          this.label = options.label;
          this.element.innerHTML = this.label;
        }
        
        this.initializeHover();
        this.initializeDrag();
        this.initializeStyle();
      },

    // hover
    
    initializeHover: function () 
    {
      this.isHovering = false;
      this.element.addEvent("mouseenter", (function () { this.isHovering = true;  this.updateRolloverEffects(); }).bind(this));
      this.element.addEvent("mouseleave", (function () { this.isHovering = false; this.updateRolloverEffects(); }).bind(this));
    },
    
    initializeStyle: function() 
    {

    },
    
    updateRolloverEffects: function () 
    {
      this.label && this.updateLabel();
      this.updateCursor();
    },
    
    isActive: function () 
    {
      return this.isDragging || (this.isHovering && !isAnyAdjustableNumberDragging);
    },

    updateCursor: function () 
    {
      var body = document.getElement("body");
      if (this.isActive()) { body.addClass("CKCursorDragHorizontal"); }
      else { body.removeClass("CKCursorDragHorizontal"); }
    },

    updateLabel: function ()
    {
      if (this.isActive()) 
      { 
        this.element.innerHTML = angular.element(this.element).scope()[this.getter](); 
      }
      else 
      { 
        this.element.innerHTML = this.label; 
      }
    },

    // drag
    
    initializeDrag: function () 
    {
      this.isDragging = false;
      new BVTouchable(this.element, this);
    },
    
    touchDidGoDown: function (touches) 
    {
      this.valueAtMouseDown = angular.element(this.element).scope()[this.getter]();
      this.isDragging = true;
      isAnyAdjustableNumberDragging = true;
      this.updateRolloverEffects();
    },
    
    touchDidMove: function (touches) 
    {
      var value = this.valueAtMouseDown + touches.translation.x / 5 * this.step;
      this.updateRolloverEffects();
      var setter = this.setter;
      value = ((value / this.step).round() * this.step).limit(this.min, this.max);
      var scope = angular.element(this.element).scope();
      scope.$apply(function() {
        scope[setter](value);
      }); 
    },
    
    touchDidGoUp: function (touches) 
    {
      this.isDragging = false;
      isAnyAdjustableNumberDragging = false;
      this.updateRolloverEffects();
    }
  };

})();
