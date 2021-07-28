var postCount=8;
var postsPerPage=5;
var responses=0;
var requests=[];
var titles=[];

async function waitForResponses()
{
    
    while(requests.length>=responses){
        console.log(requests.length+" >= "+responses);
    }
}
function loadPosts(pageNum=0)
{
    responses=0;
    requests=[];
    titles=[];
    var postsSidebar = document.getElementById("sidenav");
    
    requests=[];
    responses=0;
    for(var i=0; i< Math.min( (pageNum+1)*postsPerPage , postCount ) - (postsPerPage*pageNum); i++)
    {
        requests[i]=new XMLHttpRequest();
        //console.log("request for: posts/post"+(i+1)+".html")
        requests[i].open('GET',"posts/post"+(i+1+(postsPerPage*pageNum))+".html");
        //console.log(requests);
        requests[i].responseType='text';
        requests[i].onload=()=>{
            responses++;
            console.log(responses);
            console.log(requests.length);
            console.log(requests);
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
    posts.innerHTML="";

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

loadPosts(1);