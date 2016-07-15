  var follower = document.querySelector('#follower');
    var lineCol = "#808080";
        var lineWid = 50;
        var lineOpacity = 1;
        var lineSoft = 20;

$(function () {
  
    
        var updateFollower = function(){
            follower.style.backgroundColor = lineCol;
            follower.style.width = lineWid + "px";
            follower.style.height = lineWid  + "px";   
        };
    
	   $('#colorpicker2').farbtastic({callback: function(color){
           lineCol = color;
           updateFollower();
       }, width: 150 }); 
     });


        
        
        var formm = document.getElementById("colorForm");

        
        
        
        var widSlider = document.getElementById("lineWid");
        var opacitySlider = document.getElementById("lineOpacity");
        var softnessSlider = document.getElementById("lineSoftness");
        
        
        opacitySlider.value= 100;
        softnessSlider.value = 20;
        
        widSlider.addEventListener("change", function(){
             lineWid = widSlider.value; 
            var widthPercent = document.querySelector("#widthPercent");
             widthPercent.innerText = widSlider.value + "%";
             updateFollower();  
                                   })
        
        opacitySlider.addEventListener("change", function(){
            var opacityPercent = document.querySelector("#opacityPercent");
            opacityPercent.innerText = opacitySlider.value + "%";
            
             lineOpacity = opacitySlider.value/100.0;    
             updateFollower();           
                                   })
        
        
        softnessSlider.addEventListener("change", function(){
            var softnessPercent = document.querySelector("#softnessPercent");
            
            softnessPercent.innerText = softnessSlider.value + "%";
            
            lineSoft= softnessSlider.value;
             updateFollower();           
                                   });
        
        //        code to clear canvas
        var canvas2 = document.querySelector('#myCanvas'); 
        var ctx2 = canvas2.getContext('2d');
        
        var clearButton = document.getElementById("clear");

        clearButton.addEventListener('click', function () {

        var canvas2width = canvas2.width;
        var canvas2height = canvas2.height;
        
        ctx.clearRect(0, 0, canvas2width, canvas2height);
        });


        // instead of canvas, the eventlistner is added to a "cover" on top of the canvas. 
        var canvas = document.querySelector('#myCanvas'); // Grab a JS hook into our canvas element

        var cover = document.querySelector('#canvasCover');
        var ctx = canvas.getContext('2d'); 

        cover.addEventListener("mouseenter", function () {
            follower.classList.add("on");
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
                
                var ex =event.offsetX;
                var ey = event.offsetY;
                
//                tempWid is a temporary width that will change
//                omo is the current opacity that gets incremented up
                var tempWid= lineWid;
                var omo = 0.0;
                
               
//                just in case
                if(lineSoft <= 0)
                    {
                        ctx.globalAlpha= lineOpacity;
                        line(mpX, mpY, ex, ey, tempWid);
                    
                     tempWid=-1;
                    }
                
                
                //as it gets softer, originally it also got smaller, so the code below just increases lineWidth as it gets softer
                
                if(lineSoft > 30){
                tempWid = tempWid *1.4;      
                }
                else if(lineSoft > 40){
                tempWid = tempWid *1.45;      
                }
                else if(lineSoft > 50){
                tempWid = tempWid *1.5;      
                }
                else if(lineSoft > 60){
                tempWid = tempWid *1.6;      
                }
                else if(lineSoft > 70){
                tempWid = tempWid *1.7;      
                }
                else if(lineSoft > 80){
                tempWid = tempWid *1.8;      
                }
                else if(lineSoft > 90){
                tempWid = tempWid *1.9;      
                }
                
                if( lineSoft >100){
                   lineSoft=100;}
                
                
                //implementing lineOpacity within softness
                var opacityCutoff = tempWid - ((lineOpacity) * tempWid);
                
                //the while loop
                while (tempWid > opacityCutoff){
                ctx.globalAlpha= omo/100.0;  
                line(mpX, mpY, ex, ey, tempWid);
                tempWid = tempWid - (lineSoft)/20.0;
                omo = omo + (lineOpacity) * .8;
                } 
                updateMousePosition(event);
            }
                               


            //*****extra added for the follower to follow the cursor
            follower.style.left = event.x - .5 *lineWid + "px";
            follower.style.top = event.y - .5 *lineWid +"px";

        });