let topBtn = document.getElementById("topBtn");

window.onscroll = function() {

if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
topBtn.style.display = "block";
} else {
topBtn.style.display = "none";
}

};

topBtn.onclick = function() {

window.scrollTo({
top:0,
behavior:"smooth"
});

};
