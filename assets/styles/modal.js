
const btnsMoadl = document.querySelectorAll(".btnModal , .backdrop");
const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const title = document.querySelector(".title");
const modalMode = ["showModal" , "confirm" , "close"];


function showModal('text'){
        cName = btn.classList;
        if (cName.contains("showModal")) funcModal(modalMode[0]);
        else if (cName.contains("confirm")) funcModal(modalMode[1]);
        else funcModal(modalMode[2]);
}

function funcModal(state){
    if (state == modalMode[0]) {
        modal.style.opacity = "1";
        backdrop.style.visibility = "visible";
        modal.style.transform = "translateY(5vh)";
    }else{
        modal.style.opacity = "0";
        backdrop.style.visibility = "hidden";
        modal.style.transform = "translateY(-100vh)";
        if (state == modalMode[1]) alert("Confirm Works Done!");
    }
}
