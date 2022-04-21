"use strict";
document.addEventListener("DOMContentLoaded", () => {
    let list = document.getElementById("existingEvents");
    let form = document.getElementById("eventForm");
    let addAppt = document.getElementById("addEvent");
    let submit = document.getElementById("submit");
    let addSlot = document.getElementById("addTimeslot");
    let timeslots = document.getElementById("timeslots");
    let optionInput = document.getElementById("optionInput");
    addAppt.addEventListener("click", () => {
        $("#newEvent").modal("show");
    });
    let count = 0;
    addSlot.addEventListener("click", () => {
        $("#optionInput").empty();
        let today = new Date(Date.now());
        let dateInputL = document.createElement("label");
        let timeStartL = document.createElement("label");
        let timeEndL = document.createElement("label");
        let dateInput = document.createElement("input");
        let timeStart = document.createElement("input");
        let timeEnd = document.createElement("input");
        let optionbtn = document.createElement("button");
        dateInput.setAttribute("type", "date");
        dateInput.setAttribute("id", "date" + count);
        dateInput.setAttribute("min", today.toString());
        timeStart.setAttribute("type", "time");
        timeStart.setAttribute("id", "date" + count);
        timeEnd.setAttribute("type", "time");
        timeEnd.setAttribute("id", "date" + count);
        dateInputL.setAttribute("for", "date" + count);
        timeStartL.setAttribute("for", "date" + count);
        timeEndL.setAttribute("for", "date" + count);
        optionbtn.setAttribute("type", "button");
        optionbtn.setAttribute("class", "btn btn-secondary btn-sm");
        dateInputL.innerText = "Date";
        timeStartL.innerText = "From";
        timeEndL.innerText = "To";
        optionbtn.innerText = "Add";
        console.log(dateInput.getAttribute("id"));
        //console.log(dateInput.getAttribute("min"));
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(dateInputL);
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(dateInput);
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(timeStartL);
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(timeStart);
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(timeEndL);
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(timeEnd);
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(optionbtn);
        optionbtn.addEventListener("click", () => {
            if (dateInput.value != "" && timeStart.value != "" && timeEnd.value != "") {
                let setDate = new Date(dateInput.value);
                if (dateInPast(setDate, today)) {
                    alert("Do you have a time machine?");
                    return false;
                }
                else {
                    $("#slotList").append("<li>" + dateInput.value + ": from " + timeStart.value + " to " + timeEnd.value + "</li>");
                }
            }
            else {
                alert("Please fill out all fields");
            }
            count++;
        });
    });
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
                success: () => {
                    alert("Event created succesfully");
                    $("#eventName").val("");
                    $("#endDate").val("");
                    $("#description").val("");
                },
                error: () => { console.error("Error"); }
            });
        }
    });
    /*form.style.display = "none";
    addAppt?.addEventListener("click", () => {
        if(form.style.display == "none"){
            form.style.display = "block";
            list.style.display = "none";
            addAppt.textContent = "Cancel";
        }
        else{
            form.style.display = "none";
            list.style.display = "block";
            addAppt.textContent = "Add New Appointment";
        }
    })*/
});
const dateInPast = function (firstDate, secondDate) {
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
        return true;
    }
    return false;
};
