objects = [];
video = "";
status = "";

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        Model.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status = Objects Detected";
            document.getElementById("object_no").innerHTML = " No Of Objects Detected Are = " + objects.length;
            percent = floor(objects[i].confidence * 100);

            fill('#f1f1f5');
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#f1f1f5");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        } 
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function start() {
    Model = ml5.objectDetector('cocossd', loaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}

function loaded() {
    console.log("Coco Is Ready");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function stop() {
    video.pause();
}