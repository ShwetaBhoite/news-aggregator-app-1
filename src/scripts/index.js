// Lite Mode/Dark Mode Toggle Function//
document.querySelector("#toggle_action").addEventListener('change',toggle_func)

function toggle_func(e){
  if (e.target.checked)
   {
    document.documentElement.setAttribute('data-theme', 'lite');
    document.querySelector(".toggletxt").innerHTML="Toggle to Dark Mode";
    }
else
   {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.querySelector(".toggletxt").innerHTML="Toggle to Lite Mode";
   }   
}

//Api-Key//
const apikey="9044f55e4b9e4ad39054d37f77e6457a";
var article_area=document.getElementById("news-articles");
//Function to have formatted NEWS//
function getNews(news){
  let output="";
  if(news.totalResults>0){
    news.articles.forEach(ind=>{
      output+= 
        ` <section class="container">
          <li class="article"><a class="article-link" href="${ind.url}" target="_blank">
          <div class="img_area">
          <img src="${ind.urlToImage}" class="article-img" alt="${ind.title}"></img>
          </div>
          <h2 class="article-title">${ind.title}</h2>
          <p class="article-description">${ind.description || "Description not available"}</p> <br>
          <span class="article-author">-${ind.author? ind.author: "Anon"}</span><br>
          </a>
          </li>
          </section>
        `;
    });
    article_area.innerHTML=output;
  }
  else
  { 
    article_area.innerHTML='<li class="not-found">No article was found based on the search.</li>';
  }
};
// Function to retreive news using Fetch API with Await//
async function retreive(searchValueText=""){

    article_area.innerHTML='<p class="load">News are Loading...</p>';
    
    if(searchValueText!=""){
      url=`https://newsapi.org/v2/everything?q=${searchValueText}&apiKey=${apikey}`;
    }
    else
    {
      url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`;
    }
    const response=await fetch(url);
    const result=await response.json();
    getNews(result);
}
//Get text value from Searchbar and pass to retreive function//
async function searchvalue(e){  
    if (event.which === 13 || event.keyCode === 13 || event.key === "Enter")
     {
      retreive(e.target.value);
     }
};
//Attached Event listener for Searchbar to retreive text from Searchbar//
function start(){
  document.getElementById("search").addEventListener('keypress',searchvalue);
  retreive();
}
//Initializing Function//
(function(){
  start();}
)();

