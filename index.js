function output()
{
    event.preventDefault();
    var coun=document.getElementById('country').value;
    var start=document.getElementById('start').value;
    var end=document.getElementById('end').value;
    if(coun!=""&&start!=""&&end!="")
    {
        var url="https://api.covid19api.com/country/" + coun + "?from=" +start + "T00:00:00Z&to=" + end + "T00:00:00Z";
        get(url);
    }
    else
        alert("All fields are required");
}
async function get(url)
{
    const response = await fetch(url);
    if(response.status==200) {
        var data = await response.json();
        var result="";
        var start=document.getElementById('start').value + "T00:00:00Z";
        var end=document.getElementById('end').value + "T00:00:00Z";
        var flag=0;
        for(var info of data)
        {
            if(info.Date>=start&&info.Date<=end)
            {
                result+="<ul>" +
                    "<li>Confirmed Cases : " + info.Confirmed + "</li>" +
                    "<li>Active Cases    : " + info.Active + "</li>" +
                    "<li>Death Cases     : " + info.Deaths + "</li>" +
                    "</ul>";
                flag=1;
            }
        }
        if(flag==0)
            alert("!!! Enter Correct Details !!!");
        else
            document.getElementById("output").innerHTML=result;
    }
    else
        alert("!!! Enter Correct Details !!!");
}
