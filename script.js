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
        let work = $("#newEvent");
        work.modal("show");
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
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(dateInputL);
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(dateInput);
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(timeStartL);
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(timeStart);
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(timeEndL);
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(timeEnd);
        optionInput === null || optionInput === void 0 ? void 0 : optionInput.appendChild(optionbtn);
        optionbtn === null || optionbtn === void 0 ? void 0 : optionbtn.addEventListener("click", () => {
            if ((dateInput === null || dateInput === void 0 ? void 0 : dateInput.value) != "" && (timeStart === null || timeStart === void 0 ? void 0 : timeStart.value) != "" && (timeEnd === null || timeEnd === void 0 ? void 0 : timeEnd.value) != "") {
                let setDate = new Date(dateInput === null || dateInput === void 0 ? void 0 : dateInput.value);
                if (dateInPast(setDate, today)) {
                    alert("Do you have a time machine?");
                    return false;
                }
                else {
                    $("#slotList").append("<li class='list-group'>" + dateInput.value + ": from " + timeStart.value + " to " + timeEnd.value + "</li>");
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
                    saveName: eventName,
                    saveDate: endDate,
                    saveDescription: description
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
    //form.style.display = "none"; What is this for?
    setInterval(() => {
        $.ajax({
            type: "GET",
            url: "backend/leadLogic.php",
            cache: false,
            success: (content) => {
                if (content) {
                    let JSONcontent = JSON.parse(content);
                    console.log("Found Events in DB");
                    generateList(JSONcontent);
                }
                else {
                    console.log("No Events in DB");
                }
            },
            error: () => { console.log("Load failed"); }
        });
    }, 10000);
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
const dateInPast = (firstDate, secondDate) => {
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
        return true;
    }
    return false;
};
function generateList(content) {
    let table = document.getElementById("eventTable");
    while (table === null || table === void 0 ? void 0 : table.firstChild) {
        table === null || table === void 0 ? void 0 : table.removeChild(table.firstChild);
    }
    $("#eventTable").remove();
    $("#existingEvents").append("<table id='eventTable'></table>");
    $("#eventTable").append("<tr><th>Event Name</th><th>Description</th><th>End Date</th></tr>");
    let leadingTimeSlot = 0;
    let leadingTimeSlotEntry;
    /*$.each(content, (x, entry)=>{
        if(leadingTimeSlot < entry["options.voteCount"]){
            leadingTimeSlotEntry = entry["options.date"] + " " + entry["options.timeStart"] + " " + entry["options.timeEnd"] ;
        }
    })*/
    $.each(content, (x, entry) => {
        $("#eventTable").append("<tr class='yellow'><td>" + entry["name"] + "</td><td>" + entry["description"] + "</td><td>" + entry["closeDate"] + "</td></tr>");
    });
}
