//gets the follower, which needs to change its background color and size according to line color and width
        var follower = document.querySelector('#follower');
        
        
        var lineCol = "#000000";
        var lineWid = 50;
        var lineOpacity = 1;
        
        var formm = document.getElementById("help");

        var updateFollower = function(){
            follower.style.backgroundColor = formm.colorhex.value;
            follower.style.width = lineWid + "px";
            follower.style.height = lineWid  + "px";      
        };
        
        
        var widSlider = document.getElementById("lineWid");
        
        var opacitySlider = document.getElementById("lineOpacity");
        
        opacitySlider.value= 100;
        
        widSlider.addEventListener("change", function(){
             lineWid = widSlider.value; 
            var widthPercent = document.querySelector("#widthPercent");
             widthPercent.innerText = widSlider.value + "%";
             updateFollower();  
             
            
                                   })
        
        opacitySlider.addEventListener("change", function(){
            console.log("The new opacity is:" + opacitySlider.value);
            var opacityPercent = document.querySelector("#opacityPercent");
            opacityPercent.innerText = opacitySlider.value + "%";
            
             lineOpacity = opacitySlider.value/100.0;    
             updateFollower();           
                                   })
        
        
        //code belows allows for the changing of line color and width          
        var goButton = document.getElementById("go");

        goButton.addEventListener('click', function () {
            console.log("go has been clicked!");
            lineCol = formm.colorhex.value;
            lineWid = formm.lineWid.value;

            updateFollower();

            console.log("line color is =" + lineCol);
            console.log("line width is=" + lineWid);
            console.log("follower's background color is " + follower.style.backgroundColor);

        });
        //**********END


        //        code to clear canvas


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


        // original code from alec, slightly modified. instead of canvas, the eventlistner is added to a "cover" on top of the canvas. 
        var canvas = document.querySelector('#myCanvas'); // Grab a JS hook into our canvas element

        var cover = document.querySelector('#canvasCover');
        var ctx = canvas.getContext('2d'); // Grab the rendering context, which we actually use to draw

        cover.addEventListener("mouseenter", function () {
            follower.classList.add("on");
        });

        cover.addEventListener("mouseleave", function () {
            follower.classList.remove("on");
        });


        var line = function (x1, y1, x2, y2) { // A convenience function to draw a line between two points in our context

            ctx.beginPath(); // start a path
            ctx.lineCap = "round";
            ctx.moveTo(x1, y1); // move our pen to x1, y1
            ctx.lineWidth = lineWid;
            ctx.globalAlpha= lineOpacity;
            
            
            ctx.lineTo(x2, y2); // draw a line from wherever our pen is to x2, y2
            ctx.strokeStyle = lineCol;
            ctx.stroke(); // and then actually fill in the line with whatever stroke is defined
            ctx.closePath(); // and close our path
        };

        var mouseIsDown = false; // a variable we'll toggle to keep track of whether the mouse is down

        var mousePosition = { // a convenience dictionary for storing our mouse's x- and y-coordinates
            x: null
            , y: null
        };
        var updateMousePosition = function (event) { // a function to take a MouseEvent and update our mousePosition dictionary with the right x- and y-coordinates from the MouseEvent
            mousePosition.x = event.offsetX;
            mousePosition.y = event.offsetY;
        };

        cover.addEventListener('mousedown', function (event) { // When the mouse button is pressed down on the canvas element
            mouseIsDown = true; // toggle mouseIsDown
            updateMousePosition(event); // update the mousePosition
        });
        cover.addEventListener('mouseup', function (event) { // When we release the mouse button on the canvas element
            mouseIsDown = false; // toggle mouseIsDown
        });

        cover.addEventListener('mousemove', function (event) { // When the mouse is moved over the canvas element
            if (mouseIsDown) { // If the mouse button is also down (i.e. if we're dragging)
                line(mousePosition.x, mousePosition.y, event.offsetX, event.offsetY); // draw a line from our old (mousePosition.x, .y) coordinates to the event's coordinates
                updateMousePosition(event); // and then update our mousePosition coordinates
            }


            //*****extra added for the follower
            follower.style.left = event.x - lineWid*.5 + "px";
            follower.style.top = event.y - lineWid*.5 +"px";

        });