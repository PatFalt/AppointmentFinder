document.addEventListener("DOMContentLoaded", () => {
    let list =  (<HTMLFormElement>document.getElementById("existingEvents"));
    let form =  (<HTMLFormElement>document.getElementById("eventForm"));
    let addAppt = (<HTMLButtonElement>document.getElementById("addEvent"));
    let submit = (<HTMLButtonElement>document.getElementById("submit"));
    submit.addEventListener("click", () => {
        /*let eventName : string = (<HTMLInputElement>document.getElementById("eventName")).toString();
        let endDate = (<HTMLInputElement>document.getElementById("endDate")).value();
        let description : string = (<HTMLInputElement>document.getElementById("description")).toString();*/
        let eventName = $("#eventName").val();
        let endDate = $("#endDate").val();
        let description = $("#description").val();
        if(eventName == "" || endDate == "" || description == ""){
            alert("Please fill out all fields");
            console.error("incomplete form");
        } else {
            let data = {    
                name: eventName,
                date: endDate,
                decription: description
            }
            /*let xhr = new XMLHttpRequest();
            xhr.open("POST", "backend/leadLogic.php", true);
            xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")
            xhr.send(dataJson);
            xhr.onload = () => {
                if(xhr.status == 201){
                    alert("Event created succesfully");
                } else {
                    console.error("Error");
                }
            }*/
            $.ajax({
                type: "GET",
                url: "ts\AppointmentFinder\backend\leadLogic.php",
                data: {
                    name: eventName,
                    date: endDate,
                    decription: description
                },
                cache: false,
                success: () => {alert("Event created succesfully");},
                error: () => {console.error("Error");}
            })
        }
    })
    form.style.display = "none";
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
    })

});
