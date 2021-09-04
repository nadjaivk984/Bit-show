const shows=$("#main")
console.log(shows)
const $search=$("#search")
console.log(search)


$(document).ready(function () {
    topFifty()
    
    $search.on("keydown",function (event){
        if(event.keyCode==13){
            var inputValue=$search.val()
            $search.blur();
            if(inputValue){
                searchMovie(inputValue) 
               
            }
         
        }
    });
})
  function searchMovie(input){
    shows.html("")
      $.ajax({
          url:'http://api.tvmaze.com/search/shows?q='+ input,
          method:"GET"
      }).done(function(response){
         // console.log(response)
         for(var i=0;i<10;i++){
          var list=[]
          list.push(response[i])
          console.log(list)
          list.forEach(element=>{
           console.log(element)
           const newDiv=$("<div>").addClass("myClass")
           const img=$("<img>").attr("src",element.show.image.original)
           const name=$("<a href=#>")
           name.text(element.show.name)
        
           newDiv.append(img)
           newDiv.append(name)
           shows.append(newDiv)
           name.on("click",function(){
            window.location;
              window.location.href="mojshow2.html?name=" + element.show.name;
    
          })
       

          })

          
       
        }
         

      })
  }

function topFifty(){

 
    var listShows=[]
    $.ajax({
        
        url:"http://api.tvmaze.com/shows",
        method:"GET"
   

    }).done(function (response) {
       console.log(response)
   for(var i=0;i<50;i++){

  //  console.log(response[i])
       listShows.push(response[i])
    } 
    //console.log(listShows)

    listShows.forEach(element => {

        const newDiv=$("<div>").addClass("myClass")
        const img=$("<img>").attr("src",element.image.original)
        const name=$("<a href=#>")
        name.text(element.name)
     
        newDiv.append(img)
        newDiv.append(name)
        shows.append(newDiv)
        name.on("click",function(){
            window.location;
              window.location.href="mojshow2.html?name=" + element.name;
    
          })
      
        
    });
})
}