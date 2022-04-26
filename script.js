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
                let newOption = { "date": dateInput.value, "timeStart": timeStart.value, "timeEnd": timeEnd.value };
                if (dateInPast(setDate, today)) {
                    alert("Do you have a time machine?");
                    return false;
                }
                else {
                    for (let i = 0; i < options.length; i++) {
                        if (parseInt(options[i]) == parseInt(newOption)) {
                            alert("This option already exists");
                            return false;
                        }
                    }
                    $("#slotList").append("<li class='list-group'>" + dateInput.value + ": from " + timeStart.value + " to " + timeEnd.value + "</li>");
                    console.log(options.push(newOption));
                    console.log(options);
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
        let setDate = new Date(endDate);
        let now = new Date();
        if (dateInPast(setDate, now)) {
            alert("Do you have a big time machine?");
            return false;
        }
        let description = $("#description").val();
        if (eventName == "" || endDate == "" || description == "") {
            alert("Please fill out all fields");
            console.error("incomplete form");
        }
        else {
            let ajaxPromise = new Promise((resolve, reject) => {
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
                        let work = $("#newEvent");
                        work.modal("hide");
                        resolve("promise worked");
                    },
                    error: () => {
                        console.error("Error");
                        reject("promise rejected");
                    }
                });
            });
            ajaxPromise.then((val) => {
                for (let i = 0; i < options.length; i++) {
                    //let data : any = JSON.stringify(options[i]);
                    let data = JSON.parse(options[i]);
                    //data = JSON.parse(data);
                    //console.log(eventName);
                    console.log(data);
                    console.log(val);
                    setTimeout(() => {
                        $.ajax({
                            type: "POST",
                            url: "backend/leadLogic.php",
                            data: {
                                //saveOptionName: eventName,
                                saveOptionDate: data.date,
                                saveOptionTimeStart: data.timeStart,
                                saveOptionTimeEnd: data.timeEnd
                            },
                            cache: false,
                            success: () => { console.log("option logged"); },
                            error: () => { console.error("Error option"); }
                        });
                    }, 10000);
                }
            });
        }
    });
    setInterval(() => {
        $.ajax({
            type: "GET",
            url: "backend/loadHandler.php",
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
});
let options = [];
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
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    let counter = 0;
    $.each(content, (x, entry) => {
        let date = entry["closeDate"];
        if (now.toISOString() <= date) {
            if (counter % 2 == 0)
                $("#eventTable").append("<tr id='" + entry["eventID"] + "; running'><td>" + entry["name"] + "</td><td>" + entry["description"] + "</td><td>" + date
                    + "</td><td><input type='button' class='btn btn-primary' value='View' id='" + entry["eventID"] + "; running'></td></tr>");
            else
                $("#eventTable").append("<tr class='grey' id='" + entry["eventID"] + "; running'><td>" + entry["name"] + "</td><td>" + entry["description"] + "</td><td>" + date
                    + "</td><td><input type='button' class='btn btn-primary' value='View' id='" + entry["eventID"] + "; running'></td></tr>");
        }
        else {
            if (counter % 2 == 0)
                $("#eventTable").append("<tr id='" + entry["eventID"] + "; done'><td>" + entry["name"] + "</td><td>" + entry["description"] + "</td><td>" + date
                    + "</td><td><input type='button' class='btn btn-primary' value='Show Result' id='" + entry["eventID"] + "; done'></tr>");
            else
                $("#eventTable").append("<tr class='grey' id='" + entry["eventID"] + "; done'><td>" + entry["name"] + "</td><td>" + entry["description"] + "</td><td>" + date
                    + "</td><td><input type='button' class='btn btn-primary' value='Show Result' id='" + entry["eventID"] + "; done'></tr>");
        }
        counter++;
    });
}
