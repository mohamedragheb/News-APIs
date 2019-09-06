
/*

//web service (ajax)
XMLHttpRequest();     ده الاوبجيكت اللي بيساعدني اخد
        داتا من مواقع تانيه للمواقع بتاعي من غير
         مايعمل ريفريش ويظهرلي الداتا اول بأول




var req ;  // IE5 , IE6    are not avalibale  

if(window.XMLHttpRequest())   // modern browsers
{
    req = new XMLHttpRequest();
}
else                         // IE5 , IE6
{
    req = new ActiveXObject("microsoft.XMLHTTP")
}


req.open("GET" , "https://jsonplaceholder.typicode.com/posts") 
        هنا فتحت طريق بين موقعي والموقع اللي هاخد منه الداتا

req.onreadystatechange = function()
{
    if(req.status == 200 && req.readyState == 4)  هنا الطلب جاهز للعرض
    {
        console.log(req.response);  هنا هيعرضلي الداتا
    }

}
req.send();    لازم اعمل سيند عشان يبعتلي الداتا


// حاله الطلب بتاعي للربط بين الموقعين
req.readyState == 0      هنا لسه متعملش كونيكت بين الموقعين
req.readyState == 1      هنا اتعمل كونيكت بين الموقعين
req.readyState == 2      هنا اتعمل كونكت وموقعي طلب الداتا
req.readyState == 3      هنا الداتا بيتعملها تحميل
req.readyState == 4      هنا الداتا جاهزه للعرض




// حاله الموقع نفسه
req.readyState = 404            page not found       الموقع مش موجود
req.readyState = 403            page is forbidden    الموقع ممنوع
req.readyState = 200            Done                 كل حاجه تمام

*/


var news ;

var links = document.getElementsByClassName("nav-item");

var category = 'general';

var countery = 'eg';

getNews();


for(var i=0 ; i<links.length ; i++)
{
    links[i].addEventListener("click" , function(e){
        category = e.target.innerHTML;
        getNews();

    })
}


function getNews()
{
    var req ;  // IE5 , IE6    are not avalibale  

    var url = "https://newsapi.org/v2/top-headlines?country="+countery+"&category="+category+"&apiKey=cda20be626ce4540b31937210d12daf9";

    if(window.XMLHttpRequest)   // modern browsers
    {
        req = new XMLHttpRequest();
    }
    else                         // IE5 , IE6
    {
        req = new ActiveXObject("microsoft.XMLHTTP")
    }
    
    
    req.open("GET" , url);
    /*
        GET   =>  لو الداتا مش مهمة او مش محتاجه حماية
        POST  =>  لو الداتا  مهمة او محتاجه حماية
    */
    
    req.onreadystatechange = function()
    {
        if(req.readyState == 4 && req.status==200)
        {
           news = JSON.parse(req.response); // object ل string هنا حولت من 
           news = news.articles;            // ده بسبب ان الجيسون بتاع الويب سيرفس دي مش بادئ بالأراي فخدت منها الجزء بتاع الاراي
           displayNews ();   /*هنا اجبرته يخلص الريكوست الاول
           وبعدين يدخل ع باقي الكود عشان هو بيشوف ان الريكوست هيطول
           فبيدخل ع اللي بعده ع مالريكوست يكون اتعمل فيديني ايرور
           */
        }
    }
    
    req.send();
}


function displayNews ()   
{
    var temp = "" ;

    for(var i=0 ; i<news.length ; i++)
    {
        temp += `	  <div class="col-md-3">
             <div class="new">
                <img class="img-fluid" src=`+news[i].urlToImage+`/>
                <h5>`+news[i].title+`</h5>
                <p class="text-muted">`+news[i].description+`</p>
             </div>
                      </div>
    
                  `
    }
    
    document.getElementById("newsRow").innerHTML = temp;

}




