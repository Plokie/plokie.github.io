var postCount=8;
var postsPerPage=5;

var numberOfPages = Math.ceil(postCount/postsPerPage);
var responses=0;
var requests=[];
var titles=[];
let inputField = document.getElementById("pageNumInput");
inputField.setAttribute("max", (numberOfPages-1).toString());

async function countPosts()
{
    let tryNum=1;
    let found=0;
    var error=false;
    let tryRequests=[];
    while(true)
    {
        tryRequests[tryNum-1]=new XMLHttpRequest();
        tryRequests[tryNum-1].open('GET',"posts/post"+(tryNum)+".html");
        tryRequests[tryNum-1].responseType='text';
        tryRequests[tryNum-1].onload=()=>{
            found++;
        };
        tryRequests[tryNum-1].onerror=()=>{
            error=true;
        };
        tryRequests[tryNum-1].send();
        console.log(tryNum);
        console.log(tryRequests);
        
        if(tryNum>128) break;
        
        tryNum++;
        if(error) break;
    }
    console.log("found: "+found);
    return 8;
}

countPosts().then((num)=>{
    postCount=num;
});

function loadPosts(pageNum=0)
{
    //console.log(numberOfPages);
    pageNum = numberOfPages-(pageNum+1);
    //console.log(pageNum);

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
            //console.log(responses);
            //console.log(requests.length);
            //console.log(requests);
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
        //console.log(i);
        //console.log(requests[i].responseText);
        posts.innerHTML+="<div class=\"blog-post\">"+requests[i].responseText+"</div>";
    }
}
function pageNumChange()
{
    let pageNumInput = document.getElementById("pageNumInput");

    if(pageNumInput.value>numberOfPages)
    {
        pageNumInput.value=numberOfPages;
    }
    else
    {
        console.log(parseInt(pageNumInput.value));
        loadPosts(parseInt(pageNumInput.value));
    }
}


function openSectionSidebar(thing)
{
    console.log(thing.innerHTML)
}

loadPosts(0);