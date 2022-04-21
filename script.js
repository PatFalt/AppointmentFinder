"use strict";
document.addEventListener("DOMContentLoaded", () => {
    let list = document.getElementById("existingEvents");
    let form = document.getElementById("eventForm");
    let addAppt = document.getElementById("addEvent");
    let submit = document.getElementById("submit");
    submit.addEventListener("click", () => {
        let eventName = $("#eventName").val();
        let endDate = $("#endDate").val();
        let description = $("#description").val();
        if (eventName == "" || endDate == "" || description == "") {
            alert("Please fill out all fields");
            console.error("incomplete form");
        }
        else {
            $.ajax({
                type: "POST",
                url: "backend/leadLogic.php",
                data: {
                    name: eventName,
                    date: endDate,
                    description: description
                },
                cache: false,
                success: () => { alert("Event created succesfully"); },
                error: () => { console.error("Error"); }
            });
        }
    });
    form.style.display = "none";
    addAppt === null || addAppt === void 0 ? void 0 : addAppt.addEventListener("click", () => {
        if (form.style.display == "none") {
            form.style.display = "block";
            list.style.display = "none";
            addAppt.textContent = "Cancel";
        }
        else {
            form.style.display = "none";
            list.style.display = "block";
            addAppt.textContent = "Add New Appointment";
        }
    });
});
