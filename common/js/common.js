var path=require('path')
var a=[]
var imgCount=0
$(document).ready(function(){
  loadImage=function(){
    $.each($('#add-img')[0].files,function(i,file){
      var item="<div class='img-item'><canvas  width='160' height='128' id="+ imgCount+"></canvas><img class='thumb' src="+ file.path +"><div class='toolbar'><div class='tool roate-left'>左转</div><div class='tool roate-right'>右转</div><div class='tool delete'>删除</div></div></div>"
      $(".gallery").append(item)
      var ctx = document.getElementById(imgCount).getContext('2d')
      var img = new Image()
      img.onload=function(){
        ctx.drawImage(img,0,0,160,128)
      }
      img.src=file.path
      a.push({rot:0})
      imgCount+=1
    })
  }
  var resize=function(src){
    
  }
  $(".gallery").on("click",".delete",function(e){
    e.target.parentNode.parentNode.remove()
  })
  var rotateRight = function(canvas,img,rot){
    if(!rot){
      rot = 0
    }
    var context = canvas.getContext("2d")
    context.clearRect(0,0,160,128)
		var w = 160;
		var h = 128;
    var rotation = Math.PI*rot/180
		var c = Math.round(Math.cos(rotation) * 1000) / 1000;
		var s = Math.round(Math.sin(rotation) * 1000) / 1000;
    context.save()
		if(rotation==0){
			context.translate(s*h,0);
      context.rotate(rotation)
      context.drawImage(img,0,0,160,128)
		}       
      else if(rotation <= Math.PI/2) {
			context.translate(w,0);
      context.rotate(rotation)
      context.drawImage(img,0,0,128,160)
		} else if (rotation <= Math.PI) {
			context.translate(canvas.width,-c*h)
      context.rotate(rotation)
      context.drawImage(img,0,0,160,128)
		} else if (rotation <= 1.5*Math.PI) {
			context.translate(-c*w,canvas.height)
      context.rotate(rotation)
      context.drawImage(img,0,0,128,160)
		}
    context.restore()
  }
  
  var rotateLeft = function(canvas,img,rot){
    if(!rot){
      rot = 0
    }
    var context = canvas.getContext("2d")
    context.clearRect(0,0,160,128)
		var w = 160;
		var h = 128;
    var rotation = Math.PI*rot/180
		var c = Math.round(Math.cos(rotation) * 1000) / 1000;
		var s = Math.round(Math.sin(rotation) * 1000) / 1000;
    context.save()
		if(rotation <= Math.PI/2) {
			context.translate(0,h);
      context.rotate(rotation)
      context.drawImage(img,0,0,128,160)
		} 
    context.restore()
  }
  
  $(".gallery").on("click",".roate-right",function(e){
    var img = e.target.parentNode.parentNode.childNodes[1]
    var ctx=e.target.parentNode.parentNode.childNodes[0]
    a[ctx.id].rot +=90
    console.log(a[ctx.id].rot)
    if (a[ctx.id].rot ===360){
      a[ctx.id].rot =0
    }
    rotateRight(ctx,img,a[ctx.id].rot)
    if (a[ctx.id].rot ===270){
      a[ctx.id].rot = -90
    }
  })
  $(".gallery").on("click",".roate-left",function(e){
    var img = e.target.parentNode.parentNode.childNodes[1]
    var ctx=e.target.parentNode.parentNode.childNodes[0]
    a[ctx.id].rot -=90
    console.log(a[ctx.id].rot)
    if (a[ctx.id].rot ===-90){
      rotateLeft(ctx,img,a[ctx.id].rot)
      a[ctx.id].rot = 270 
    }else{
      a[ctx.id].rot=Math.abs(a[ctx.id].rot)
      rotateRight(ctx,img,a[ctx.id].rot) 
    }
    //if (a[ctx.id].rot ===-90){
      
      //}
  })
})