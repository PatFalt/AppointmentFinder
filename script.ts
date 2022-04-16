document.addEventListener("DOMContentLoaded", () => {
    let list =  (<HTMLFormElement>document.getElementById("existingEvents"));
    let form =  (<HTMLFormElement>document.getElementById("eventForm"));
    let addAppt = (<HTMLButtonElement>document.getElementById("addEvent"));
    let submit = (<HTMLButtonElement>document.getElementById("submit"));
    submit.addEventListener("click", () => {
        let eventName : string = (<HTMLInputElement>document.getElementById("eventName")).toString();
        let endDate : string = (<HTMLInputElement>document.getElementById("endDate")).toString();
        let description : string = (<HTMLInputElement>document.getElementById("description")).toString();
        if(eventName == "" || endDate == "" || description == ""){
            alert("Please fill out all fields");
            console.error("incomplete form");
            return false;
        }
        $.ajax({
            type: "POST",
            url: "backend/leadLogic.php",
            data: {
                name: eventName,
                date: endDate,
                decription: description
            }  
        })
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
