postCount=1;


function pageLoaded()
{

}

function loadSectionsSidebar()
{
    var postsSidebar = document.getElementById("sidenav");

    var requests=[];
    var responses=[];
    for(var i=0; i<postCount; i++)
    {
        requests[i]=new XMLHttpRequest();
        console.log("request for: posts/post"+(i+1)+".html")
        requests[i].open('GET',"posts/post"+(i+1)+".html");
        console.log(requests);
        requests[i].responseType='text';
        requests[i].onload=()=>{
            responses[i]=requests[i].response;
        }
        requests[i].send();
    }

    requests[requests.length].onload=()=>{
        console.log("All responses received.")
        console.log(responses);
    };
}

function openSectionSidebar(thing)
{
    console.log(thing.innerHTML)
}


loadSectionsSidebar();