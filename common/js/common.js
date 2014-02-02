$(document).ready(function(){
  var imgCount=0
  readAsDataURL=function(){
    $.each($('#add-img')[0].files,function(i,file){
      if(/image\/\w+/.test(file.type)){
        var reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload=function(e){
          var item="<div class='img-item'><img class='img-rounded' id=img"+imgCount+" src="+this.result+"><div class='toolbar'><div class='tool roate-left'>左转</div><div class='tool roate-right'>右转</div><div class='tool delete'>删除</div></div></div>"
          $(".gallery").append(item)
          imgCount+=1   
        } 
      }
    })
  }
  var resize=function(src){
    
  }
  $(".gallery").on("click",".delete",function(e){
    e.target.parentNode.parentNode.remove()
  })
  $(".gallery").on("click",".roate-right",function(e){
    e.target.parentNode.parentNode.childNodes[1]
  })
})