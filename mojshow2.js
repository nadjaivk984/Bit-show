$(document).ready(function(){

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("name");
    console.log(myParam);
    showSinglemovie(myParam)
   

})

const main=$("#main")

function showSinglemovie(input){

    $.ajax({
         
        url:"http://api.tvmaze.com/singlesearch/shows?q=" + input,
        method:"GET"
   

    }).done(function (response) {

    console.log(response)
    const details=$("#details")
     const newDiv=$("<div>").addClass("myClass")
      const second=$("<div>").addClass("second")
    const name=$("<h2>").text(response.name)
    const img=$("<img>").attr("src",response.image.original)
    const summary=$("<p>").text(response.summary)
    const showDetails=$("<h5>").text("Show Details")
    newDiv.append(name)
    newDiv.append(img)
   details.append(showDetails)
    details.append(summary)
    const thirdDiv=$("<div>").addClass("third")
   // newDiv.append(summary)
    main.append(newDiv)
   // main.append(second)
   const id=response.id
    function getSeason(){
   $.ajax({
    url:"https://api.tvmaze.com/shows/" + response.id +"/seasons",
    method:"GET"


   }).done(function(response){
       console.log(response)

     //  const thirdDiv=$("<div>")
       const season=$("<p>").text("Season" +" "  + "(" + response.length + ")")
       thirdDiv.append(season)
     main.append(thirdDiv)
       const ul=$("<ul>")

       response.forEach(element => {
          
           const li=$("<li>" + element.premiereDate + " - " + element.endDate + "</li>")
           thirdDiv.append(ul)
           ul.append(li)
      
       });
       
   })

     

    }


    function getCast(){
        $.ajax({
            url:"https://api.tvmaze.com/shows/" + response.id +"/cast",
            method:"GET"
        
           
           }).done(function(response){
               console.log(response)
               const cast=$("<p>").text("Cast")
               const ul=$("<ul>")
               response.forEach(element => {
            
                const li=$("<li>" + element.person.name + "</li>")
                thirdDiv.append(cast)
               thirdDiv.append(ul)
                ul.append(li)
           
            });
           })
    }
    getSeason()
    getCast()
});

    
}