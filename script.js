"use strict";
document.addEventListener("DOMContentLoaded", () => {
    let list = document.getElementById("existingEvents");
    let form = document.getElementById("eventForm");
    let addAppt = document.getElementById("addEvent");
    let submit = document.getElementById("submit").addEventListener("click", () => {
        let eventName = document.getElementById("eventName").toString();
        let startDate = document.getElementById("startDate").toString();
        let endDate = document.getElementById("endDate").toString();
        let description = document.getElementById("description").toString();
        if (eventName == "" || startDate == "" || endDate == "" || description == "") {
            alert("Please fill out all fields");
            console.error("incomplete form");
            return false;
        }
    });
    form.style.display = "none";
<<<<<<< Updated upstream
    addAppt === null || addAppt === void 0 ? void 0 : addAppt.addEventListener("click", () => {
        if (form.style.display == "none") {
            form.style.display = "block";
            list.style.display = "none";
            addAppt.textContent = "Cancel";
=======
    submitBttn === null || submitBttn === void 0 ? void 0 : submitBttn.addEventListener("click", () => {
        if (form.style.display == "none") {
            form.style.display = "block";
            list.style.display = "none";
            submitBttn.textContent = "Cancel";
>>>>>>> Stashed changes
        }
        else {
            form.style.display = "none";
            list.style.display = "block";
<<<<<<< Updated upstream
            addAppt.textContent = "Add New Appointment";
=======
            submitBttn.textContent = "Add New Appointment";
>>>>>>> Stashed changes
        }
    });
});
