/*
Developed By Abhijeet Mahankal
*/
/* Mention the Cookies Categories , Mandatory are default accepted , same categories populate on Checkboxes */
var cookies_types = {mandatory:["cookie1","cookie2"],advert:["cookie3","cookie4"],stats:["cookie5","cookie6"]};

/* Concent Cookie Info */
var concent_cookie="concent_cookie";
var concent_cookie_expiry=365;

/* Cookie Information Page */
var concent_cookie_info_url="cookieinfo.html";

/* Cookie Concent Dialog Box ID */
var cookied_div_id="myDIV"


/* Driver Sample Program for Cookie Creation for Testing */
setCookie("cookie1","1",365);
setCookie("cookie2","2",365);

setCookie("cookie3","3",365);
setCookie("cookie4","4",365);

setCookie("cookie5","5",365);
setCookie("cookie6","6",365);


/* function to set a cookie with  name, value and expiry date */
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/* function to delete all cookies not used just for testing */
function deleteCookies() {
    var theCookies = document.cookie.split(';');
    for (var i = 0 ; i < theCookies.length; i++) {
            document.cookie = theCookies[i].split('=')[0] + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        
    }
}
/* function to delete a cookie with  name */
function delete_cookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/* function to set a Json Concent cookie with  name, value and expiry date */
function setJsonCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
}

/* function to delete cookies that are not Mandatory  */
function deleteAllExceptMandatory()
{
    Object.keys(cookies_types).forEach(element=>{
        if(element!="mandatory")
        {
            cookies_types[element].forEach(cookie=>{
                delete_cookie(cookie);
            })
        }
    });
}

/* function to get a Json Concent cookie with  name, value and expiry date */
function getJsonCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return JSON.parse(parts.pop().split(';').shift());
}

/* function to check if a cookie with name exists */
function checkCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return true;;
    }
    return false;
}

/* function to get a cookie with name */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

window.addEventListener("load", function()
{
    var cookies = document.cookie.split(";");
    if(checkCookie(concent_cookie))
    {
        /* Remove the cookies and dont allow them depending on the Concent Cookie info*/
        var rejected_cookies=getJsonCookie(concent_cookie).rejected;
        rejected_cookies.forEach(element => {

            delete_cookie(element);
        });
    }else
    {
        /* Delete non mandatory Cookies and Display Concent Dialog to accept the Concent */
        deleteAllExceptMandatory();
        var x = document.getElementById(cookied_div_id);
        x.style.display = "block";
        /* Populate a Concent Form with checkboxes & Buttons */
        var myDiv = document.getElementById(cookied_div_id);

        Object.keys(cookies_types).forEach(element=>{
    
      var p =document.createElement("span");
      p.innerHTML = element + ": ";
      var category=document.createElement("input");   
      category.value=(element + '</br>');
      category.type="checkbox";
      if(element=="mandatory")
      {
        category.checked=true;
        category.disabled=true;

      }
      category.id=element;
      myDiv.appendChild(p);
      myDiv.appendChild(category);
        })

      var newline=document.createElement("br"); 
      myDiv.appendChild(newline);


      var acceptbtn=document.createElement("input"); 
      acceptbtn.type="button";
      acceptbtn.value="Accept";
      acceptbtn.onclick=function()
      {
        var acc=[];
        var rej=[];
        Object.keys(cookies_types).forEach(element=>{
            var selval=document.getElementById(element).checked;
            if(selval)
            {
                cookies_types[element].forEach(c=>{
                    acc.push(c);

                })
            }
            else{
                cookies_types[element].forEach(c=>{
                    rej.push(c);

                })
            }
        });
        var inp={accepted:acc,rejected:rej}
        setJsonCookie(concent_cookie,inp,concent_cookie_expiry);
        x.style.display = "none";

       
      }

      myDiv.appendChild(acceptbtn);

      var moreinfobtn=document.createElement("input"); 
      moreinfobtn.type="button";
      moreinfobtn.value="More Info";
      moreinfobtn.onclick=function()
      {
        window.open(concent_cookie_info_url, "_blank");
      }
      myDiv.appendChild(moreinfobtn);

    }
});

/* End of the Cookie Bot */
