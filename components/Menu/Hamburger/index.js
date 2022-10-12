function onClickHamburger() {
    const icon = document.getElementById('hamburger-icon');
    const hamburgerList = document.getElementById('hamburger-menu-list-ul');
    const hamburgerContainer = document.getElementById("hamburger-menu-list-container");

    if(hamburgerList.style.display === "none"){
        icon.style.transform = "rotate(90deg)";
        hamburgerList.style.display = 'flex';
        hamburgerList.style.flexDirection = 'column';
        hamburgerContainer.style.background = "#f1f3f5";
    }
    else{
        icon.style.transform = "rotate(0deg)";
        hamburgerList.style.display = "none";
        hamburgerContainer.style.background = 'none';
    }
}
