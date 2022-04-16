document.addEventListener("DOMContentLoaded", () => {
    let list =  (<HTMLFormElement>document.getElementById("existingEvents"));
    let form =  (<HTMLFormElement>document.getElementById("eventForm"));
    let submitBttn = (<HTMLButtonElement>document.getElementById("addEvent"));
    form.style.display = "none";
    list.style.display = "block";
    submitBttn?.addEventListener("click", () => {
        if(form.style.display == "none"){
            form.style.display = "block";
            list.style.display = "none";

            submitBttn.textContent = "Cancel";
        }
        else{
            form.style.display = "none";
            list.style.display = "block";
        
            submitBttn.textContent = "Add New Appointment";
        }

    })
});
