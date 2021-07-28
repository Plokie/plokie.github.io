var postCount=3;
var responses=0;
var requests=[];

async function waitForResponses()
{
    
    while(requests.length>=responses){
        console.log(requests.length+" >= "+responses);
    }
}
function loadPosts()
{
    var postsSidebar = document.getElementById("sidenav");
    
    requests=[];
    responses=0;
    for(var i=0; i<postCount; i++)
    {
        requests[i]=new XMLHttpRequest();
        //console.log("request for: posts/post"+(i+1)+".html")
        requests[i].open('GET',"posts/post"+(i+1)+".html");
        //console.log(requests);
        requests[i].responseType='text';
        requests[i].onload=()=>{
            responses++;
            console.log(responses);
            if(responses==requests.length)
            {
                console.log("done");
                displayPosts();
            }
        }
        requests[i].send();
    }
}
function displayPosts()
{
    var postsSidebar = document.getElementById("sidenav");
    var posts = document.getElementById("blog-posts")

    for(var i=requests.length-1; i>=0; i--)
    {
        console.log(i);
        //console.log(requests[i].responseText);
        posts.innerHTML+="<div class=\"blog-post\">"+requests[i].responseText+"</div>";
    }
}




function openSectionSidebar(thing)
{
    console.log(thing.innerHTML)
}


loadPosts();