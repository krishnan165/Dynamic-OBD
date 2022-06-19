status="";
objects=[];

function preload()
{
  image1=loadImage("dog_cat.jpg");
}
function setup()
{
  canvas=createCanvas(380,380);
  canvas.center();

  video=createCapture(VIDEO);
  video.hide();


 
}
function start()
{
  object_detection=ml5.objectDetector("cocossd",modelLoaded);
  document.getElementById("status").innerHTML="Object Status:Detecting";
}

function modelLoaded()
{
  console.log("Model is loading");
  status=true;
  }

function gotResult(error,results)
{
  if(error)
  {
    console.log(error);
  }
  else{
    console.log(results);
    objects=results;
  }
}

function draw()
{
   image(video,0,0,380,380);
    
   if(status!="")
   {
    r=random(255);
    g=random(255);
    b=random(255);
    object_detection.detect(video,gotResult); 
      for(i=0;i<objects.length;i++)
      {
        document.getElementById("status").innerHTML="Object Status:Detected";
        document.getElementById("object_number").innerHTML="Number of Objects="+objects.length;
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        textSize(20);
        text(objects[i].label+"  "+percent+" %",objects[i].x+10,objects[i].y+20);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      }

    }

  
}