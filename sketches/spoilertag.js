function spoiler(btn){
  console.log(btn.getAttribute("for"));
  var image = document.querySelectorAll('[tag='+btn.getAttribute("for")+']')[0];
  image.style.filter = "blur(0px)";
}
