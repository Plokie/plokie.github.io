
function pageLoaded()
{

}

function loadSectionsSidebar()
{
    var postsSidebar = document.getElementById("sidenav");

    let request = new XMLHttpRequest();
    request.open('GET', "../hello_world_text.txt");
    request.responseType='text';
    request.onload=()=>{
        console.log(request.response);
    }
    request.send();
}

function openSectionSidebar(thing)
{
    console.log(thing.innerHTML)
}


loadSectionsSidebar();