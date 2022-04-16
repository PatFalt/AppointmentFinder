"use strict";
document.addEventListener("DOMContentLoaded", () => {
    let list = document.getElementById("existingEvents");
    let form = document.getElementById("eventForm");
    let submitBttn = document.getElementById("addEvent");
    form.style.display = "none";
    submitBttn === null || submitBttn === void 0 ? void 0 : submitBttn.addEventListener("click", () => {
        if (form.style.display == "none") {
            form.style.display = "block";
            list.style.display = "none";
            submitBttn.textContent = "Cancel";
        }
        else {
            form.style.display = "none";
            list.style.display = "block";
            submitBttn.textContent = "Add New Appointment";
        }
    });
});
