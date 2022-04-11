console.log("works");
alert("works");

document.addEventListener("DOMContentLoaded", function() {
    let button = document.querySelector("#alarm");
    alert("Page loaded");
    button?.addEventListener("click", function(){
        alert("Test worked");
    })
});
