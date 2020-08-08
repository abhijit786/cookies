/*
Developed By Abhijeet Mahankal
*/
/* Array for all cookies used bye website*/
var cookie_info=[
    {
        "Cookie name":"cookie_seen_message",
        "Description":"Used to check whether the user has read the cookie disclaimer and has hit the cross(X) icon to prevent it from opening again",
        "Type of cookie (Expires)":"Persistent (1 year)"
    },
    {
        "Cookie name":"JSESSIONID",
        "Description":"Cookie maintaining users session",
        "Type of cookie (Expires)":"Session"
    },
    {
        "Cookie name":"_ga",
        "Description":"Used to distinguish users.",
        "Type of cookie (Expires)":"2 years"
    }

];
/* ID of the table where to populate*/
var table_id="tbid"
var keys=[];

window.addEventListener("load", function()
{

    var tb = document.getElementById(table_id);

    var table_header = document.createElement("thead");
    var tr = document.createElement("tr");

    Object.keys(cookie_info[0]).forEach(element=>{
    keys.push(element);
    var th = document.createElement("th");
    th.innerText=element;
    tb.appendChild(table_header);
    tr.appendChild(th);
    })
    table_header.append(tr);



    var table_body = document.createElement("tbody");

    cookie_info.forEach(element=>{

    var tr = document.createElement("tr");
    keys.forEach(key=>{
        var td = document.createElement("td");
        td.innerText=element[key];
        tr.appendChild(td); 
    })
    
    table_body.append(tr);
    })
    tb.appendChild(table_body)

});

/* End of Program */
