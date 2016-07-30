# README

This is a basic, [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) drawing application which uses [Firebase](https://firebase.google.com/) to synchronize drawings across several canvases, allowing users in different windows to draw on something of a collaborative sketchpad.

If you're interested in learning more about Firebase, check out [this video](https://www.youtube.com/watch?v=tb2GZ3Bh4p8).

## Setup

1. Sign up for [a Firebase account](https://firebase.google.com/)
2. In the upper-right, click `Go to console` to get to the [Firebase console](https://console.firebase.google.com/).
3. Select `Create a new project`.
4. On the project dashboard, select `Database` in the left panel.  You should see a URL next to the link icon of the form `https://foo.firebasio.com` (where `foo` is your project name).
5. Select the `Rules` tab and replace the default rules with the contents of the file [`firebase-access-rules.json`](https://gist.github.com/aresnick/3607606659f08e5781aba2929ec3428d#file-firebase-access-rules-json) in this repository.  This makes your database public.
6. Replace the `firebaseURL` variable on [line 65](https://gist.github.com/aresnick/3607606659f08e5781aba2929ec3428d#file-draw-html-L65) of [`draw.html`](https://gist.github.com/aresnick/3607606659f08e5781aba2929ec3428d#file-draw-html) with your URL (from step 4).
7. Open `draw.html` in Chrome and draw with a friend (or in another window of your own)!

## Extensions

1. Modify the project so that every new artist gets their own, unique stroke color.  You may find [the documentation for `lineTo`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo) or [this overview](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) of `canvas` valuable.
2. Add a button which clears _only_ your contributions to the canvas.
3. Add an erase mode/tool.
4. Add a button to export and save the current canvas; you may find [this example](http://weworkweplay.com/play/saving-html5-canvas-as-image/) helpful.
