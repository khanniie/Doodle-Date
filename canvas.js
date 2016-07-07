var canvas = document.querySelector('#myCanvas'); // Grab a JS hook into our canvas element
    var ctx = canvas.getContext('2d'); // Grab the rendering context, which we actually use to draw

    var line = function(x1, y1, x2, y2) { // A convenience function to draw a line between two points in our context
        ctx.beginPath(); // start a path
        ctx.moveTo(x1, y1); // move our pen to x1, y1
        ctx.lineTo(x2, y2); // draw a line from wherever our pen is to x2, y2
        ctx.stroke(); // and then actually fill in the line with whatever stroke is defined
        ctx.closePath(); // and close our path
    };

    var mouseIsDown = false; // a variable we'll toggle to keep track of whether the mouse is down

    var mousePosition = { // a convenience dictionary for storing our mouse's x- and y-coordinates
        x: null,
        y: null
    };
    var updateMousePosition = function(event) { // a function to take a MouseEvent and update our mousePosition dictionary with the right x- and y-coordinates from the MouseEvent
        mousePosition.x = event.offsetX;
        mousePosition.y = event.offsetY;
    };

    canvas.addEventListener('mousedown', function(event) { // When the mouse button is pressed down on the canvas element
        mouseIsDown = true; // toggle mouseIsDown
        updateMousePosition(event); // update the mousePosition
    });
    canvas.addEventListener('mouseup', function(event) { // When we release the mouse button on the canvas element
        mouseIsDown = false; // toggle mouseIsDown
    });

    canvas.addEventListener('mousemove', function(event) { // When the mouse is moved over the canvas element
        if (mouseIsDown) { // If the mouse button is also down (i.e. if we're dragging)
            line(mousePosition.x, mousePosition.y, event.offsetX, event.offsetY); // draw a line from our old (mousePosition.x, .y) coordinates to the event's coordinates
            updateMousePosition(event); // and then update our mousePosition coordinates
        }
    });

 document.body.addEventListener('mousemove', function(event) {
    	var follower = document.querySelector('#follower');
    	follower.style.left = event.x - 25 + "px";
    	follower.style.top = event.y - 25 + "px";
    });