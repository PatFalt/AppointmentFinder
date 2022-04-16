document.addEventListener("DOMContentLoaded", () => {
    let list =  (<HTMLFormElement>document.getElementById("existingEvents"));
    let form =  (<HTMLFormElement>document.getElementById("eventForm"));
    let addAppt = (<HTMLButtonElement>document.getElementById("addEvent"));
    let submit = (<HTMLButtonElement>document.getElementById("submit")).addEventListener("click", () => {
        let eventName : string = (<HTMLInputElement>document.getElementById("eventName")).toString();
        let startDate : string = (<HTMLInputElement>document.getElementById("startDate")).toString();
        let endDate : string = (<HTMLInputElement>document.getElementById("endDate")).toString();
        let description : string = (<HTMLInputElement>document.getElementById("description")).toString();
        if(eventName == "" || startDate == "" || endDate == "" || description == ""){
            alert("Please fill out all fields");
            console.error("incomplete form");
            return false;
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
