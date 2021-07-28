var postCount=3;
var responses=0;
var requests=[];
function pageLoaded()
{

}

function loadSectionsSidebar()
{
    var postsSidebar = document.getElementById("sidenav");

    requests=[];
    responses=0;
    for(var i=0; i<postCount; i++)
    {
        requests[i]=new XMLHttpRequest();
        console.log("request for: posts/post"+(i+1)+".html")
        requests[i].open('GET',"posts/post"+(i+1)+".html");
        console.log(requests);
        requests[i].responseType='text';
        requests[i].onload=()=>{
            responses++;
        }
        requests[i].send();
    }

    waitForResponses().then(()=>{
        console.log("Reponses received apparently.")
        console.log(requests);
    });
}

async function waitForResponses()
{
    while(requests.length<responses){}
}
function openSectionSidebar(thing)
{
    console.log(thing.innerHTML)
}


loadSectionsSidebar();