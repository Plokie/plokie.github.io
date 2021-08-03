var postCounts={
    general: 8,
    art: 1
}
var sectionNames={
    general: "general",
    art: "art"
}

var postsPerPage=5;
var postCount=postCounts.general;
var sectionName=sectionNames.general;


var numberOfPages = Math.ceil(postCount/postsPerPage);
var responses=0;
var requests=[];
var titles=[];
let inputField = document.getElementById("pageNumInput");
inputField.setAttribute("max", (numberOfPages-1).toString());
var found=0;
var error=false;


//This is a work in progress test thing, i want to try to figure out a way it can automatically count
//the number of posts in the directory, instead of it being manually recorded.
async function countPosts()
{
    // let tryNum=1;
    // let tryRequests=[];
    // while(true)
    // {
    //     tryRequests[tryNum-1]=new XMLHttpRequest();
    //     tryRequests[tryNum-1].open('GET',"posts/post"+(tryNum)+".html");
    //     tryRequests[tryNum-1].responseType='text';
    //     tryRequests[tryNum-1].onload=()=>{
    //         found++;
    //     };
    //     tryRequests[tryNum-1].onerror=()=>{
    //         found--;
    //         error=true;
    //     };
    //     tryRequests[tryNum-1].send();
    //     //console.log(tryNum);
    //     //console.log(tryRequests);
        
    //     if(tryNum>128) break;
        
    //     tryNum++;
    //     if(error) break;
    // }
    // console.log("found: "+found);
    return 8;
}
countPosts().then((num)=>{
    postCount=num;
});

function selectSection(object)
{
    var selectString = object.innerHTML
    console.log(selectString);

    switch(selectString)
    {
        case "General": postCount=postCounts.general; break;
        case "Sketches": postCount=postCounts.art; break;
    }

    switch(selectString)
    {
        case "general": sectionName=sectionNames.general; break;
        case "Sketches": sectionName=sectionNames.art; break;
    }

    console.log(sectionName);
    console.log(postCount);

    refresh();
    loadPosts();
}
function refresh()
{
    var numberOfPages = Math.ceil(postCount/postsPerPage);
    let inputField = document.getElementById("pageNumInput");
    inputField.setAttribute("max", (numberOfPages-1).toString());
}



function loadPosts(pageNum=0)
{
    //Reverses the page to load, this is so page 0=Newest and page 0+...x=Oldest
    pageNum = numberOfPages-(pageNum+1);

    //Resets the collections
    responses=0;
    requests=[];
    titles=[];
    //var postsSidebar = document.getElementById("sidenav");
    
    //Counts from 0 to the number of posts that should be displayed this page
    //(I could probably simplify this but ehh i dont wanna break it - it works)
    for(var i=0; i< Math.min( (pageNum+1)*postsPerPage , postCount ) - (postsPerPage*pageNum); i++)
    {
        requests[i]=new XMLHttpRequest(); //Makes a new XMLHttpRequest to add to the requests list.
        requests[i].open('GET',"posts/"+sectionName+"/post"+(i+1+(postsPerPage*pageNum))+".html"); //Gets the corresponding post
        requests[i].responseType='text'; //Makes sure it reads it as plaintext
        requests[i].onload=()=>{ //Upon loading
            responses++; //Increase the recorded number of responses
            if(responses==requests.length) //If all the responses have been received
            {
                console.log("done"); //Log done (for debug purposes)
                displayPosts(); //Call displayPosts, which, get this; Displays the posts.
            }
        }
        requests[i].send(); //Sends the XMLHttpRequest
    }
}
//Displays the posts that are currently loaded into the "requests" array.
//Function should only be called when "requests" contains only requests with responses.
function displayPosts()
{
    //var postsSidebar = document.getElementById("sidenav");
    var posts = document.getElementById("blog-posts") //Getss the div where posts go
    posts.innerHTML=""; //Clears any currently loaded posts

    //Loops through each loaded request in reverse order
    //This is so that the newest is loaded at the top of the page, and oldest bottom.
    for(var i=requests.length-1; i>=0; i--)
    {
        //Adds a new div post, with the html content inside it.
        posts.innerHTML+="<div class=\"blog-post\">"+requests[i].responseText+"</div>";
    }
}
//Called when the page number input value is changed
function pageNumChange()
{
    //Fetches the page number input box
    let pageNumInput = document.getElementById("pageNumInput");

    //If the inputted number is too large, lower it.
    if(pageNumInput.value>numberOfPages-1)
    {
        pageNumInput.value=numberOfPages-1;
    }
    else
    { //Load the page by passing in the page number as a parsed int
        console.log(parseInt(pageNumInput.value));
        loadPosts(parseInt(pageNumInput.value));
    }
}


function openSectionSidebar(thing)
{
    console.log(thing.innerHTML)
}

loadPosts(0);