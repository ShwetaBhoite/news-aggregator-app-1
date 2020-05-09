//{
    document.documentElement.setAttribute('data-theme','dark');
//}


const apikey="9044f55e4b9e4ad39054d37f77e6457a";
var article_area=document.getElementById("news-articles");

//function to have formatted news in form of json//

function getNews(news)
{
    let output="";
    let totalresult="";
    console.log(news)
    console.log(news.totalResults)
    if(news.totalResults>0){
        news.articles.forEach(element => {
            output+=
            `
            <section class= "container">
            <li class ="article">
            <a class="article-link" href="${element.url}" target= " _blank">
            <div class="img_area">
            <img src ="${element.urlToImage}" class="article-img" alt="${element.title}"></img>
            </div>
            </a>
            <h2 class="article-title">${element.title}
            </h2>
             <p class="article-description">${element.description || "Description not available"}</p>
             <span class ="article-author"> - ${element.author ? element.author:"Anon"}</span><br>
           
            </li>
            </section>
            
            `
            ;
        });
            article_area.innerHTML=output;
        }
        else
        {
               article_area.innerHTML='<p class="not-found">No article was found based on the search.</p>'

        }
            
       
    };


    //async function wth await
async function loading(searchValueWord=""){

    article_area.innerHTML='<li class="load">News are loading</li>'

    if(searchValueWord!="")
    {
        url=`http://newsapi.org/v2/everything?q=${searchValueWord}=At&apikey=${apikey}`;
    }
    else{
        url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`;
    }
    //api call//
    const response=await fetch(url);
    const result=await response.json();
    getNews(result);
}

//text value is get from searchbar and pass to retrive function//
async function searchValue(event)
{
    if(event.which === 13||event.keycode===13||event.key === "Enter")
    {
        console.log(event);
        console.log(event.which);
        console.log(event.key);
        console.log(event.keycode);

        loading(event.target.value);
        console.log(event.target.value);
    }
}

//attached event listener //

function start(){
console.log("start function called in onload")
document.getElementById("search").addEventListener("keypress",searchValue);
loading();
}
