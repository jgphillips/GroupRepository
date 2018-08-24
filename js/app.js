            // VARIABLES
    
            var movies = [];
            var responseCountry;
            var usa = {countryname: 'usa', lat: 29.7619930, lng: -95.366302}; ///Houston , 
            var japan = {countryname: 'japan', lat: 35.652832, lng: 139.839478}; // Tokyo
            var germany = {countryname: 'germany', lat: 50.110924, lng: 8.682127};  // Frankfurt
            var mexico = {countryname: 'mexico', lat: -99.127, lng:19.427}; //Mexico City
            var uk= {countryname: 'uk', lat:-0.126, lng:51.500}; // London
            var china = {countryname: 'china', lat: 22.542883, lng:114.062996}; // China
            var india = {countryname: 'india', lat:27.173891, lng:78.042068}; //Taj Mahal, Agra, Uttar Pradesh, India
            var france = {countryname: 'france', lat: 48.864716, lng:2.349014}; // Paris
            var canada = {countryname: 'canada', lat:43.761539, lng:-79.411079}; //Toronto
            var spain = {countryname: 'spain', lat:40.416775, lng:-3.703790}; //Madrid
            var australia= {countryname: 'australia', lat: -23.700552, lng:133.882675}; //Alice Spring MaP initizalation
            var mapcountry = {countryname: 'australia', lat: -23.700552, lng:133.882675}; //Alice Spring MaP initizalation
            var country; 
            var foundCountry;
            var countries = [usa,japan,germany,mexico,uk,china,japan,france, canada, spain];
            var notFoundCountries =[];
            var plot;
            var rating;

            // FIREBASE INIT

            var config = {
                apiKey: "AIzaSyC4qMjckes1qklODo_oxEmEU-XojuIHJkI",
                authDomain: "group-project-cinema.firebaseapp.com",
                databaseURL: "https://group-project-cinema.firebaseio.com",
                projectId: "group-project-cinema",
                storageBucket: "group-project-cinema.appspot.com",
                messagingSenderId: "1017397864361"
              };
              
              firebase.initializeApp(config);
              var database = firebase.database();

            // OmDb API JS
          
        function displayMovieInfo(movie) {
    
            var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
            
            $.ajax({
                url: queryURL,
                method: "GET"
                }).then(function(response) {    
                if (response.Error) {
                console.log("Error: " + response.Error);
                console.log("I am in error message");
                $("#ErrorImageText").html("<h1>Movie not found! </h1>");
                var ErrorImage = $("#ErrorImage").attr("src", "https://i.pinimg.com/originals/a4/e2/72/a4e27207b1506966944f08a2d07cc25a.jpg");       
                setTimeout(function(){
                    console.log("I am in error message2");
                    ErrorImage = $("#ErrorImage").attr("src", "");   
                    $("#ErrorImageText").empty();                      
                },3000);
                return
                }    

            console.log("I am out error message");

                
            var movieDiv = $("<div class='movie'>");            
            rating = response.Rated;          
            var pOne = $("<p>").text("Rating: " + rating);           
            movieDiv.append(pOne);            
            var released = response.Released;          
            var pTwo = $("<p>").text("Released: " + released);              
            movieDiv.append(pTwo);
            plot = response.Plot;
            var pThree = $("<p>").text("plot: " + plot);
            movieDiv.append(pThree);
            responseCountry = response.Country;
            var pFour = $("<p>").text("Country: " + responseCountry);
            movieDiv.append(pFour);
            var title = response.Title;
            var pFive = $("<p>").text("Title: " + title);
            movieDiv.append(pFive);
            var imgURL = response.Poster;
            var image = $("#posterBorder").attr("src", imgURL);
            movieDiv.append(image);
            console.dir(movies);       
            viewOnMap(responseCountry);
            $("#movies-view").html(movieDiv);
            saveToFireBase();
            }).catch(function(error) {
                console.log(error);
            });       
        }
       

            $("#add-movie").on("click", function(event) {
            event.preventDefault();
            var movie = $("#movie-input").val().trim();
            movies.push(movie); 
            displayMovieInfo(movie)
            });
        
            $(document).on("click", ".movie-btn", displayMovieInfo); 
            

            // GOOGLE MAPS API

          
         function  viewOnMap(country){
            // country = country.toLowerCase();
                console.log(country); 
                foundCountry = countries.find(a => a.countryname === country.toLowerCase());
                console.log(foundCountry);     
                if (!foundCountry){
                    notFound = notFoundCountries.find(a => a === country.toLowerCase());
                    if (!notFound) {
                        notFoundCountries.push(country);
                        console.log("Sorry we dont' have the coordinates of the movie's country :(");
                        mapcountry = mapcountry;
                        var mapNotFound = $("#mapNotFound").attr("src", "http://www.tyrrellsystems.com/wp-content/uploads/2016/03/5623356_orig.gif");  
                        $("#mapNotFoundText").html("<h1> We don't have the coordinates of your map yet. We Working on it! </h1>");
                        setTimeout(function(){
                        console.log("I am in error message3");
                        mapNotFound = $("#mapNotFound").attr("src", "");
                        $("#mapNotFoundText").empty();
                        },5000);
                        console.log(notFoundCountries);
                    } else{
                        console.log("We are working in getting the info for the future :)");
                        console.log(notFoundCountries);
                    };               

                }else{
                    console.log("yes we have the coordinates of the movie's country! :)");
                    // console.log(countries.indexOf(country));
                    for(var i=0; i< countries.length ; i++ ){
                        if (country.toLowerCase() === countries[i].countryname.toLowerCase()){
                                mapcountry = countries[i];
                                break;
                        };
                    }
                      
                    console.log(mapcountry);
                    initMap();                 
                }        
          }

            function initMap() {                
                    var map = new google.maps.Map(
                        document.getElementById('map'), {zoom: 4, center: mapcountry});
                    var marker = new google.maps.Marker({position: mapcountry, map: map});
            }  
            
    // FIREBASE CODE 

    function saveToFireBase(){
        title = $("#movie-input").val().trim();
          console.log(title);
            console.log(country);
            console.log(mapcountry);
      
              database.ref().push({
              title: title,
            //   country: country,
              mapcountry: mapcountry.countryname,
              lat: mapcountry.lat,
              lng: mapcountry.lng,
              plot: plot,
              rating: rating, 
              dateAdded: firebase.database.ServerValue.TIMESTAMP  
                  });
      
      
          database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function (snapshot) {
            console.log(snapshot.val());
            console.log(snapshot.val().title);
            // $("#movies-view").prepend("<p>" + snapshot.val().title + "</p>");
      
          }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
          });
      }
          $("#add-movie").on("click", function (event) {
            event.preventDefault();
            saveToFireBase();
          });
      
      
      

