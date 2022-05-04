document.addEventListener("DOMContentLoaded", () => {
    //let list =  (<HTMLFormElement>document.getElementById("existingEvents"));
    //let form =  (<HTMLFormElement>document.getElementById("eventForm"));
    let addAppt = (<HTMLButtonElement>document.getElementById("addEvent"));
    let submit = (<HTMLButtonElement>document.getElementById("submit"));
    let addSlot = (<HTMLButtonElement>document.getElementById("addTimeslot"));
    //let timeslots = document.getElementById("timeslots");
    

    addAppt.addEventListener("click", () => { //Neues Event erstellen
        let work : any = $("#newEvent");
        work.modal("show");      
    })



    $("#optionInput").hide();
    //let count : number = 0;

    addSlot.addEventListener("click", () => { //Neue Terminoptionen erstellen
        $("#optionInput").show();
        let today = new Date(Date.now());
        let dateInput : any = document.getElementById("newDate");
        let timeStart : any = document.getElementById("timeStart");
        let timeEnd : any = document.getElementById("timeEnd");
        let optionbtn = (<HTMLButtonElement>document.getElementById("addOption"));
        dateInput.setAttribute("min", today.toString());

        optionbtn.addEventListener("click", () => {
            if(dateInput?.value != "" && timeStart?.value != "" && timeEnd?.value != ""){
                let setDate = new Date(dateInput?.value);
                let newOption : any = {"date": dateInput.value, "timeStart": timeStart.value, "timeEnd": timeEnd.value}
                if(dateInPast(setDate, today)){ //Falls Termin in der Vergangenheit läge, return false
                    alert("Do you have a time machine?");
                    return false;
                } else { //Check ob Termin schon vorhanden ist
                    for(let i = 0; i < options.length; i++){
                        if(parseInt(options[i]) == parseInt(newOption)){ //wenn vorhanden, return false
                            alert("This option already exists");
                            return false;
                        }
                    } //Termin noch nicht vorhanden
                    $("#slotList").append("<li class='list-group'>"+ dateInput.value + ": from " + timeStart.value + " to " + timeEnd.value + "</li>");
                    console.log(options.push(newOption));
                    console.log(options);
                    dateInput.value = "";
                    timeStart.value = "";
                    timeEnd.value = "";
                    return true;
                }
            } else {
                alert("Please fill out all fields");
            }
        }) 
    })

    submit.addEventListener("click", () => {
        let eventName = $("#eventName").val();
        let endDate : any = $("#endDate").val();
        let setDate = new Date(endDate);
        let now = new Date();
        if(dateInPast(setDate, now)){
            alert("Do you have a big time machine?");
            return false;
        }
        let description = $("#description").val();
        if(eventName == "" || endDate == "" || description == ""){
            alert("1111Please fill out all fields");
            console.error("incomplete form");
        } else {
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
                        let work : any = $("#newEvent");
                        work.modal("hide");
                        resolve("promise worked"); 
                    },
                    error: () => {
                        console.error("Error");
                        reject("promise rejected")
                    }
                })
            })
            ajaxPromise.then((val)=>{
                for(let i = 0; i < options.length; i++){
                    let data : any = JSON.stringify(options[i]);
                    data = JSON.parse(data);
                    console.log(data);
                    console.log(val);
                        $.ajax({
                            type: "POST",
                            url: "backend/leadLogic.php",
                            data: {
                                saveOptionDate: data.date,
                                saveOptionTimeStart: data.timeStart,
                                saveOptionTimeEnd: data.timeEnd
                            },
                            cache: false,
                            async: false,
                            success: () => {
                                console.log("option logged");
                                $("#slotList").empty();
                                $("#optionInput").hide();
                            },
                            error: () => {console.error("Error option");}
                        })
                }
                refreshList();
            })
        }
    })
    refreshList();
});

function deleteMe(eventID :any){//Deletion event
    $.ajax({
        type: "POST",
        url: "backend/leadLogic.php",
        async: false,
        data: {
            deleteMe: 1,
            eventID: eventID,
        },
        success: () => {console.log("Delete params passed");},
        error: () => {console.log("Delete params failed");}
    })
    refreshList();
}

function showDetail(view : boolean, eventID : any, name : string) { //Neues Event erstellen
    $("#apptTitle").text(name);
    let detailModal : any = $("#detailedView");
    detailModal.modal("show");      
    if(view == false){
        showWinner(eventID);
        console.log("view false");
    }
    else{
        showView(eventID);
        console.log("view true");
    }
}

function showWinner(eventID : any){
    $("#optionView").empty();
    $("#voteButton").empty();
    $("#resultView").empty();
    $.ajax({
        type: "POST",
        url: "backend/leadLogic.php",
        cache: false,
        async: false,
        data: {
            resultCheck: 1,
            viewCheck: 0,
            eventID: eventID,
        },
        success: (content) => {
            if(content){
                let JSONcontent = JSON.parse(content);
                $("#resultView").text(JSONcontent[0].date + " : " + JSONcontent[0].timeStart + " - " + JSONcontent[0].timeEnd);
            }
            else {
                console.log("No Options in DB");
            }
        },
        error: () => {console.log("Load failed");}
    })
};

function showView(eventID : any){
    $("#optionView").empty();
    $("#voteButton").empty();
    $("#resultView").empty();
    $.ajax({
        type: "POST",
        url: "backend/leadLogic.php",
        cache: false,
        async: false,
        data: {
            viewCheck: 1,
            resultCheck: 0,
            eventID: eventID,
        },
        success: (content) => {
            if(content){
                let JSONcontent = JSON.parse(content);
                console.log("Found Options in DB");
                $.each(JSONcontent, (x, entry) => {
                    $("#optionView").append("<li id=" + entry["optionID"] + " class='list-group'>" + entry["date"] + " : " + entry["timeStart"] + " - " + entry["timeEnd"] + 
                    "<input class='form-check-input' type='checkbox' name='checkbox' value='0' onclick='updateValue(this)' id=" + entry["optionID"] + "></li>");
                })
                $("#voteButton").append("<button type='button' id='submitVote' onclick='vote()' class='btn btn-secondary btn-sm'>vote</button>");
            }
            else{
                console.log("No Options in DB");
            }
        },
        error: () => {console.log("Load failed");}
    })
};

let options : any = [];

const dateInPast = (date1: Date, date2: Date) => {
    if (date1.setHours(0, 0, 0, 0) <= date2.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
};

function updateValue(el : any){
    let value : any = parseInt(el.value);
    console.log("Is " + value);
    if(value == 0){
        el.value = '1';
        value = parseInt(el.value);
        return console.log("Is "+value+" should be 1");
    } else {
        el.value = '0';
        value = parseInt(el.value);
        return console.log("Is "+value+" should be 0");
    }
}

function vote(){
    let checkboxes = document.getElementsByName("checkbox");
    for(let i = 0; i < checkboxes.length; i++) {
        let valueInt = parseInt((<HTMLInputElement>checkboxes[i]).value);
        let optionID = checkboxes[i].id;
        //checking if checkbox has been checked for a vote
        if(valueInt == 1){
            console.log("Passing optionID "+optionID+" to PHP!");
            $.ajax({
                type: "POST",
                url: "backend/leadLogic.php",
                cache: false,
                async: false,
                data: {
                    voteEvent: 1,
                    optionID: optionID,
                },
                success: (content)=>{
                    if(content){
                        console.log("Option updated in DB");
                    }
                    else{
                        console.log("Option not found in DB");
                    }
                },
                error: ()=> {console.log("Load failed");}
            })
        }
    }
}

function refreshList(){
    $.ajax({
        type: "POST",
        url: "backend/leadLogic.php",
        cache: false,
        async: false,
        data: {
            loadCheck: 1,
        },
        success: (content)=>{
            if(content){
                let JSONcontent = JSON.parse(content);
                console.log("Found Events in DB");
                generateList(JSONcontent);
            }
            else{
                console.log("No Events in DB");
                $("#eventTable").remove();
                $("#existingEvents").append("<table id='eventTable'></table>");
            }
        },
        error: ()=> {console.log("Load failed");}
    })
}

function generateList(content : any){
    let table = <HTMLTableElement>document.getElementById("eventTable");
    while(table?.firstChild){
        table?.removeChild(table.firstChild);
    }
    $("#eventTable").remove();
    $("#existingEvents").append("<table id='eventTable'></table>");
    $("#eventTable").append("<tr><th>Event Name</th><th>Description</th><th>End Date</th></tr>")

    let now = new Date();
    now.setHours(0,0,0,0);
    let counter = 0;
    //table creation for every entry
    $.each(content, (x, entry)=>{
        let date = entry["closeDate"];
        if(now.toISOString() <= date){
            if(counter % 2 == 0)
            $("#eventTable").append("<tr name='running' id='"+ entry["eventID"] +"'><td>"+entry["name"] +"</td><td>" + entry["description"] + "</td><td>" + date 
            + "</td><td><input type='button' class='btn btn-primary running'  name='"+entry["name"] +"' onclick='showDetail(true, this.id, this.name)' for='running' value='View' id='"+ entry["eventID"] +"'></td>"+
            "<td><input type='button' class='btn btn-primary'  value='Delete Me' onclick='deleteMe(this.id)' id='"+ entry["eventID"] +"'></td></tr>");
            else
            $("#eventTable").append("<tr name='running' class='grey' id='"+ entry["eventID"] +"'><td>"+entry["name"] +"</td><td>" + entry["description"] + "</td><td>" + date 
            + "</td><td><input type='button' class='btn btn-primary running'  name='"+entry["name"] +"' onclick='showDetail(true, this.id, this.name)' for='running' value='View' id='"+ entry["eventID"] +"'></td>"+
            "<td><input type='button' class='btn btn-primary' value='Delete Me' onclick='deleteMe(this.id)' id='"+ entry["eventID"] +"'></td></tr>");
        }
        else{
            if(counter % 2 == 0)
            $("#eventTable").append("<tr name='done' id='"+ entry["eventID"] +"'><td>"+entry["name"] +"</td><td>" + entry["description"] + "</td><td>" + date 
            + "</td><td><input type='button' class='btn btn-primary done'  name='"+entry["name"] +"' onclick='showDetail(false, this.id, this.name)'  for='done' value='Show Result' id='"+ entry["eventID"] +"'></td>"+
            "<td><input type='button' class='btn btn-primary' value='Delete Me' onclick='deleteMe(this.id)' id='"+ entry["eventID"] +"'></td></tr>");
            else
            $("#eventTable").append("<tr class='grey' name='done' id='"+ entry["eventID"] +"'><td>"+entry["name"] +"</td><td>" + entry["description"] + "</td><td>" + date 
            + "</td><td><input type='button' class='btn btn-primary'name='"+entry["name"] +"' onclick='showDetail(false, this.id, this.name)' for='done' value='Show Result' id='"+ entry["eventID"] +"'></td>" +
            "<td><input type='button' class='btn btn-primary' value='Delete Me' onclick='deleteMe(this.id)' id='"+ entry["eventID"] +"'></td></tr>");
        }
        counter++;
    })
}
