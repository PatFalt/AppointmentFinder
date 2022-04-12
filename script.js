"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let button = document.querySelector("#alarm");
    alert("Page loaded");
    button === null || button === void 0 ? void 0 : button.addEventListener("click", function () {
        alert("Test worked");
    });
});
