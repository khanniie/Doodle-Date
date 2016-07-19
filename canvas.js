  var follower = document.querySelector('#follower');
  var lineCol = "#808080";
  var lineWid = 50;
  var lineOpacity = 1;
  var lineSoft = 20;

  var layerCounter = 2;
  var currentCanvas = "canvas1";
  var selectedLayer ="preview1";
  var layerZ = -99;

 var updateCanvas = function(){
   canvas = document.getElementById(currentCanvas);
   ctx= canvas.getContext('2d');
     
 };

  var updateFollower = function () {
      follower.style.backgroundColor = lineCol;
      follower.style.width = lineWid + "px";
      follower.style.height = lineWid + "px";

  };

  var setEraserSettings = function () {
      if (document.getElementById("eraserRadio").checked) {
          follower.style.backgroundColor = "white";
          console.log("eraser");
      };

  };

  $('#colorpicker2').farbtastic({
      callback: function (color) {
          lineCol = color;
          var colorBox = document.getElementById("currentColorBox");
          colorBox.style.backgroundColor = color;
          updateFollower();
      }
      , width: 150
  });

  // Author:  Jacek Becela
  // Source:  http://gist.github.com/399624
  // License: MIT
  jQuery.fn.single_double_click = function (single_click_callback, double_click_callback, timeout) {
      return this.each(function () {
          var clicks = 0
              , self = this;
          jQuery(this).click(function (event) {
              clicks++;
              if (clicks == 1) {
                  setTimeout(function () {
                      if (clicks == 1) {
                          single_click_callback.call(self, event);
                      } else {
                          double_click_callback.call(self, event);
                      }
                      clicks = 0;
                  }, timeout || 300);
              }
          });
      });
  };

  $('#colorMem1').single_double_click(function () {
      var colorBox = document.getElementById("colorMem1");
      lineCol = colorBox.style.backgroundColor ? lineCol: "white";
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = lineCol ? lineCol : "white";
  }, function () {
      var colorBox = document.getElementById("colorMem1");
      colorBox.style.backgroundColor = lineCol;
  });

  $('#colorMem2').single_double_click(function () {
      var colorBox = document.getElementById("colorMem2");
      lineCol = colorBox.style.backgroundColor ? lineCol: "white";
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = lineCol ? lineCol : "white";
  }, function () {
      var colorBox = document.getElementById("colorMem2");
      colorBox.style.backgroundColor = lineCol;
  });
  $('#colorMem3').single_double_click(function () {
      var colorBox = document.getElementById("colorMem3");
      lineCol = colorBox.style.backgroundColor ? lineCol: "white";
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = lineCol ? lineCol : "white";
  }, function () {
      var colorBox = document.getElementById("colorMem3");
      colorBox.style.backgroundColor = lineCol;
  });
  $('#colorMem4').single_double_click(function () {
      var colorBox = document.getElementById("colorMem4");
      lineCol = colorBox.style.backgroundColor ? lineCol: "white";
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = lineCol ? lineCol : "white";
  }, function () {
      var colorBox = document.getElementById("colorMem4");
      colorBox.style.backgroundColor = lineCol;
  });

  $('#colorMem5').single_double_click(function () {
      var colorBox = document.getElementById("colorMem5");
      lineCol = colorBox.style.backgroundColor  ? lineCol: "white";
      updateFollower();
      var colorBox2 = document.getElementById("currentColorBox");
      colorBox2.style.backgroundColor = lineCol ? lineCol : "white";
  }, function () {
      var colorBox = document.getElementById("colorMem5");
      colorBox.style.backgroundColor = lineCol;
  });

  var widSlider = document.getElementById("lineWid");
  var opacitySlider = document.getElementById("lineOpacity");
  var softnessSlider = document.getElementById("lineSoftness");


  opacitySlider.value = 100;
  softnessSlider.value = 20;

  widSlider.addEventListener("change", function () {
      lineWid = widSlider.value;
      var widthPercent = document.querySelector("#widthPercent");
      widthPercent.innerText = widSlider.value + "%";
      updateFollower();
  })

  opacitySlider.addEventListener("change", function () {
      var opacityPercent = document.querySelector("#opacityPercent");
      opacityPercent.innerText = opacitySlider.value + "%";

      lineOpacity = opacitySlider.value / 100.0;
      updateFollower();
  })


  softnessSlider.addEventListener("change", function () {
      var softnessPercent = document.querySelector("#softnessPercent");

      softnessPercent.innerText = softnessSlider.value + "%";

      lineSoft = softnessSlider.value;
      updateFollower();
  });



  // instead of canvas, the eventlistner is added to a "cover" on top of the canvas. 
  var canvas = document.getElementById(currentCanvas); // Grab a JS hook into our canvas element

  var cover = document.querySelector('#canvasCover');
  var ctx = canvas.getContext('2d');

  //        ctx.globalCompositeOperation = 'xor';

  cover.addEventListener("mouseenter", function () {
      follower.classList.add("on");
      updateFollower();
      setEraserSettings();

  });

  cover.addEventListener("mouseleave", function () {
      follower.classList.remove("on");
  });


  var line = function (x1, y1, x2, y2, lineTemp) {
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.moveTo(x1, y1);
      ctx.lineWidth = lineTemp;
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = lineCol;
      ctx.stroke();
      ctx.closePath();
  };



  var mouseIsDown = false;
  var mousePosition = {
      x: null
      , y: null
  };
  var updateMousePosition = function (event) {
      mousePosition.x = event.offsetX;
      mousePosition.y = event.offsetY;
  };

  cover.addEventListener('mousedown', function (event) {
      mouseIsDown = true; // toggle mouseIsDown
      updateMousePosition(event); // update the mousePosition
  });
  cover.addEventListener('mouseup', function (event) {
      mouseIsDown = false;
  });

  // When the mouse is moved over the canvas element
  cover.addEventListener('mousemove', function (event) {
      if (mouseIsDown) {

          //                the mouse positions. program does not work if these are placed inside the while loop
          var mpX = mousePosition.x;
          var mpY = mousePosition.y;
          

          var ex = event.offsetX;
          var ey = event.offsetY;

          //                tempWid is a temporary width that will change
          //                omo is the current opacity that gets incremented up
          var tempWid = lineWid;
          var omo = 0.0;


          //                else{

          //                just in case
        

          if (document.getElementById("eraserRadio").checked) {
              ctx.globalCompositeOperation = "destination-out";
              follower.style.backgroundColor = "white";
          };

            if (lineSoft <= 0 || lineWid <= 3) {
              ctx.globalAlpha = lineOpacity;
              line(mpX, mpY, ex, ey, lineWid);
                
                tempWid = -1;
                
          }
          
          //as it gets softer, originally it also got smaller, so the code below just increases lineWidth as it gets softer
          if (lineSoft > 30) {
              tempWid = tempWid * 1.4;
          } else if (lineSoft > 40) {
              tempWid = tempWid * 1.45;
          } else if (lineSoft > 50) {
              tempWid = tempWid * 1.5;
          } else if (lineSoft > 60) {
              tempWid = tempWid * 1.6;
          } else if (lineSoft > 70) {
              tempWid = tempWid * 1.7;
          } else if (lineSoft > 80) {
              tempWid = tempWid * 1.8;
          } else if (lineSoft > 90) {
              tempWid = tempWid * 1.9;
          }

          if (lineSoft > 100) {
              lineSoft = 100;
          }


          //implementing lineOpacity within softness
          var opacityCutoff = tempWid - ((lineOpacity) * tempWid);

          //the while loop
          while (tempWid > opacityCutoff) {
              ctx.globalAlpha = omo / 100.0;
              line(mpX, mpY, ex, ey, tempWid);
              tempWid = tempWid - (lineSoft) / 20.0;
              omo = omo + (lineOpacity) * .8;
          }
          updateMousePosition(event);
      };



      //*****extra added for the follower to follow the cursor
      follower.style.left = event.x - .5 * lineWid + "px";
      follower.style.top = event.y - .5 * lineWid + "px";

      ctx.globalCompositeOperation = "source-over";
//      updateFollower();


  });



  //        code to clear canvas
  var clearButton = document.getElementById("clear");

  clearButton.addEventListener('click', function () {

      var canvas2width = canvas.width;
      var canvas2height = canvas.height;

      ctx.clearRect(0, 0, canvas2width, canvas2height);
  });

  var newLayerButton = document.getElementById("newLayerButton");

  newLayerButton.addEventListener('click', function () {
      var newC = document.createElement('canvas');
     
      newC.id = "canvas" + layerCounter;
      newC.dataset.name = "Layer " + layerCounter;
      newC.setAttribute("width", 850);
      newC.setAttribute("height", 400);
      newC.style.zIndex = layerZ;
      newC.style.position = "fixed";
      newC.style.left = "20%";
      newC.style.top = "30%";
      newC.style.border= "1px solid black";
      document.body.appendChild(newC);
      console.log("new layer!");
      currentCanvas= "canvas" + layerCounter;
      updateCanvas();
      
      var preview = document.createElement('div');
      preview.setAttribute("id", "preview" + layerCounter);
      preview.classList.add("preview");
      
      var p = document.createElement('p');
      p.innerText= newC.dataset.name;    
      preview.appendChild(p);
      document.getElementById(selectedLayer).classList.remove("selectedLayer");
      preview.classList.add("selectedLayer");
      selectedLayer= preview.id;
      
      preview.addEventListener("click", function(){
          document.getElementById(selectedLayer).classList.remove("selectedLayer");
          
          var a = preview.id;
          var num = a[a.length-1];
          preview.classList.add("selectedLayer");
          
          currentCanvas= "canvas" + num;
          selectedLayer= a;
          updateCanvas();
      });
      
      var box = document.getElementById("previewBox");
      
      box.insertBefore(preview, box.firstChild);
      
      
      layerCounter++;
      layerZ++;
  });

  document.getElementById("preview1").addEventListener("click", function(){
      
      var preview =document.getElementById("preview1");
          document.getElementById(selectedLayer).classList.remove("selectedLayer");
          
          var a = preview.id;
          var num = a[a.length-1];
          preview.classList.add("selectedLayer");
          
          currentCanvas= "canvas" + num;
          selectedLayer= a;
          updateCanvas();
      });
$("#deleteLayerButton").click(function(){
    if (currentCanvas == "canvas1"){
        alert("You can't delete the background! Sorry :(");
    }
    else{
        var deleted = document.getElementById(currentCanvas);
        var n = currentCanvas.slice(currentCanvas.length -1);
        var deleted2 = document.getElementById("preview" + n );
        var a = 1;
        selectedLayer= "preview" + (n-a);
            var preview = document.getElementById(selectedLayer);
       
        while(preview == null){
            a++;
            selectedLayer= "preview" + (n-a);
            var preview = document.getElementById(selectedLayer);
            console.log("a= " + a + "selectedLayer= " + selectedLayer);
        }
        var preview = document.getElementById(selectedLayer);
        preview.classList.add("selectedLayer");
        currentCanvas= "canvas" + (n-a);
        
        deleted.remove();
        deleted2.remove();
        updateCanvas();
    }
    
});