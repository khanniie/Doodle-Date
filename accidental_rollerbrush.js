//making a follower variable so that it will reflect the point of the canvas "pen". the backround color and size change acccordingly
var follower = document.querySelector('#follower');
        
        
        var lineCol = "#000000"; //color of lines. default: black
        var lineWid = 50; //width of lines. default: 50
        var lineOpacity = 1; //opacity of lines. default: 100%
        var lineSoft = 20; //softness/feathering effect of lines. default 20%
        
        //gets the form to retrieve data from it's color text box. temporary!
        var formm = document.getElementById("help");

        //the follower's background color and size are updated after every slider change
        var updateFollower = function(){
            follower.style.backgroundColor = formm.colorhex.value;
            follower.style.width = lineWid + "px";
            follower.style.height = lineWid  + "px";      
        };
        
        //getting variables for the three different sliders
        var widSlider = document.getElementById("lineWid");
        
        var opacitySlider = document.getElementById("lineOpacity");
        
        var softnessSlider = document.getElementById("lineSoftness");
        
        
        //sets the beginning value of the opacity slider to 100% and the softness to 20%;
        opacitySlider.value= 100;
        softnessSlider.value = 20;


        //gives eventlisteners to all sliders. Values and follower are updated upon change
        widSlider.addEventListener("change", function(){
             lineWid = widSlider.value; 
            var widthPercent = document.querySelector("#widthPercent");
             widthPercent.innerText = widSlider.value + "%";
             updateFollower();  })
        
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
        
        
        //color and width are updated upon click of the go button. currently the only way to change color          
        var goButton = document.getElementById("go");

        goButton.addEventListener('click', function () {
            console.log("go has been clicked!");
            lineCol = formm.colorhex.value;
            lineWid = formm.lineWid.value;

            updateFollower();

        });


        // code to clear canvas

        var canvas2 = document.querySelector('#myCanvas'); 
        var ctx2 = canvas2.getContext('2d');
        
        var clearButton = document.getElementById("clear");

        clearButton.addEventListener('click', function () {
        console.log("clear has been clicked!");

        var canvas2width = canvas2.width;
        var canvas2height = canvas2.height;
        console.log("canvas width =" + canvas2width + " canvas height =" + canvas2height );
        
        ctx.clearRect(0, 0, canvas2width, canvas2height);
        });


        //instead of canvas, the eventlistner is added to a "cover" on top of the canvas. this part of the code actually draws things
        var canvas = document.querySelector('#myCanvas'); 
        var cover = document.querySelector('#canvasCover');
        var ctx = canvas.getContext('2d'); 

        cover.addEventListener("mouseenter", function () {
            follower.classList.add("on");
        });

        cover.addEventListener("mouseleave", function () {
            follower.classList.remove("on");
        });

        //function to draw lines
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

        // a variable we'll toggle to keep track of whether the mouse is down
        var mouseIsDown = false; 
        var mousePosition = {
            x: null
            , y: null
        };

        // a function to take a MouseEvent and update our mousePosition dictionary with the right x- and y-coordinates from the MouseEvent
        var updateMousePosition = function (event) {
            mousePosition.x = event.offsetX;
            mousePosition.y = event.offsetY;
        };

        cover.addEventListener('mousedown', function (event) { 
            mouseIsDown = true; 
            updateMousePosition(event); 
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
                if(lineSoft > 50){
                tempWid = tempWid *1.3;      
                }
                
                else if(lineSoft > 60){
                tempWid = tempWid *1.4;      
                }
                else if(lineSoft > 70){
                tempWid = tempWid *1.5;      
                }
                else if(lineSoft > 80){
                tempWid = tempWid *1.6;      
                }
                else if(lineSoft > 90){
                tempWid = tempWid *1.6;      
                }
                
                
                 if( lineSoft >100){
                   lineSoft=100;}
                
                //making the original lineOpacity a factor in how opaque this line turns out.
                 var opacityCutoff = -1* ((lineOpacity * tempWid)-100);
       
                //the while loop decrements tempWid while incrementing opacity. 
                while (tempWid > 0){
                ctx.globalAlpha= omo/100.0;
                
                    
                line(mpX, mpY, ex, ey, tempWid);
                tempWid = tempWid - (lineSoft)/20.0;   
                omo = omo + 1;
                
                } updateMousePosition(event);
            }
                               


            //*****extra added for the follower.. follower follows the invisible curor that i turned off
            follower.style.left = event.x - .5 *lineWid + "px";
            follower.style.top = event.y - .5 *lineWid +"px";

        });