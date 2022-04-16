"use strict";
document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("eventForm");
    let submitBttn = document.getElementById("addEvent");
    form.style.display = "none";
    form.style.opacity = "0";
    submitBttn === null || submitBttn === void 0 ? void 0 : submitBttn.addEventListener("click", () => {
        if (form.style.display == "none") {
            form.style.display = "block";
            form.style.opacity = "1";
            submitBttn.textContent = "Cancel";
        }
        else {
            form.style.display = "none";
            form.style.opacity = "0";
            submitBttn.textContent = "Add New Appointment";
        }
    });
});
