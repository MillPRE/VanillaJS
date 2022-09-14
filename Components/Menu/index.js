// drop down button click event
// view menu item list
function onClickOpen(){
    const dropDown = document.getElementById("ul");
    if( dropDown.style.display === 'none'){
        dropDown.style.display = "block";
    }
    else{
        dropDown.style.display = "none";
    }
}

function onClickMenu(id){
    const button = document.getElementById('button');
    button.innerHTML = id;

    const dropDown = document.getElementById('ul');
    dropDown.style.display = 'none';
}


