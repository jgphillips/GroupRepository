 var movies = [];
    
          
          function displayMovieInfo() {
    
            var movie = $(this).attr("data-name");
            var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
            // ajax call
            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
    
              if (response.Error) {
                alert("Error: " + response.Error);
                return
              }
    
              
              var movieDiv = $("<div class='movie'>");
    
              // Rating

              var rating = response.Rated;
    
              
              var pOne = $("<p>").text("Rating: " + rating);
    
            
              movieDiv.append(pOne);
    
              // Release Date
              var released = response.Released;
    
              
              var pTwo = $("<p>").text("Released: " + released);
    
              
              movieDiv.append(pTwo);
    
              // Plot
              var plot = response.Plot;
    
              
              var pThree = $("<p>").text("plot: " + plot);
    
              
              movieDiv.append(pThree);
    

              // Country
              var country = response.Country;
    
              
              var pFour = $("<p>").text("Country: " + country);

                
                
              movieDiv.append(pFour);

             
                // Title
             var title = response.Title;
    
              
            var pFive = $("<p>").text("Title: " + title);

            movieDiv.append(pFive);
              
                // Poster
              var imgURL = response.Poster;

              
            
              var image = $("<img>").attr("src", imgURL);
    
            
              movieDiv.append(image);
    
              // Movie info presentation
              $("#movies-view").html(movieDiv);
            }).catch(function(error) {
              console.log(error);
            });
    
          }
    
          // I probably should get rid of these button? I am having trouble going directly through the search box
          function renderButtons() {
    
            
            $("#buttons-view").empty();
    
            
            for (var i = 0; i < movies.length; i++) {
    
              
              var a = $("<button>");
             
              a.addClass("movie-btn");
              
              a.attr("data-name", movies[i]);
              
              a.text(movies[i]);
              
              $("#buttons-view").append(a);
            }
          }
          
          
          $("#add-movie").on("click", function(event) {
            event.preventDefault();
            
            var movie = $("#movie-input").val().trim();
    
           
            movies.push(movie);
    
            
            renderButtons();
          });
    
          
          $(document).on("click", ".movie-btn", displayMovieInfo);
    
          
          renderButtons();
     
