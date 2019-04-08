$(document).ready(function(){
    $.getJSON("vhs.json", function(response){   

        let newList = document.getElementById("newList");
        let counter = document.getElementById("counter");
        let basketList = $('#basketList');
        let movieBox = "";
        let itemsArray = localStorage.getItem('Varukorgen') ? JSON.parse(localStorage.getItem('Varukorgen')) : []; // En array med objekt från LS (annars tom)
        let movies = response; // Array med alla objekt från JSON
        
        // ======================================== //
        // On Load

        // Visar alla filmer på skärmen
        for (let i = 0; i < movies.length; i++) {
            movieBox = "<div class='info' id='info" + [i] + "'><span class='overlay-close'>Stäng</span></div>";
            movieBox += "<div class='movie'>";
            movieBox += "<img src='" + movies[i].cover + "' id='movie" + [i] + "' class='infobutton'><h4>" + movies[i].title + "</h4><button class='buybutton' id='btn" + [i] + "'>Köp</button></div><br>";
            newList.innerHTML += movieBox;
        };

        // Skriver ut innehållet i varukorgen när sidan laddas
        for (let i = 0; i < itemsArray.length; i++) {
            basketList.append("<li id='movieLi" + itemsArray[i].id + "'>" + itemsArray[i].title + " x <span id='quantity" + itemsArray[i].id + "'>" + localStorage.getItem("Quantity" + itemsArray[i].id) + "</span><button class='remove'>X</button></li>");
        };

        counterCheck(); // Kollar och skriver ut antal varor i varukorgen

        // ======================================= //
        // Klickfunktioner
        
        // När man klickar på köp läggs filmen till i LS och i varukorgen
        $('.buybutton').on("click", function(event){
            let movieID = event.target.id;
            movieID = movieID.replace("btn",""); // 0,1,2...9

            let quantity = document.getElementById("quantity" + movies[movieID].id) ? document.getElementById("quantity" + movies[movieID].id) : 0;

            // Deklarerar antal av samma film
            let qaParse = 1;

            if (quantity == 0 ){
                // Lägger till filmens objekt i listan
                itemsArray.push(movies[movieID]);
                // Lägger till hela listan i LS som en sträng
                localStorage.setItem("Varukorgen", JSON.stringify(itemsArray));
    
                // Lägger till i varukorgen
                basketList.append("<li id='movieLi" + movies[movieID].id + "'>" + movies[movieID].title + " x <span id='quantity" + movies[movieID].id + "'>1</span><button class='remove'>X</button></li>");

                localStorage.setItem("Quantity" + movies[movieID].id, qaParse);
    
            }
            else {
                qaParse = parseInt(quantity.innerHTML, 10);
                qaParse++;
                
                localStorage.setItem("Quantity" + movies[movieID].id, qaParse);
                quantity.innerHTML = qaParse;
            }

            // Grön bekräftelse när man klicka på köpknapp
            event.target.style.backgroundColor = "green";
            setTimeout(function(){
                event.target.style.backgroundColor = "#D23B26";
            }, 500);

            counterCheck();
        });

        // Öppna info-rutan vid klick på bild
        $(".infobutton").on("click", function(event){
            let movieID = event.target.id;
            movieID = movieID.replace("movie","");
            
            $(".info#info"+[movieID]+"").fadeIn();
            $(".info#info"+[movieID]+"").append("<img src='" + movies[movieID].cover + "'><p>" + movies[movieID].description + 
            "<br><br>Årtal: " + movies[movieID].year + "<br>Speltid: " + movies[movieID].runtime + 
            "<br>Regissör: " + movies[movieID].director + "<br>Pris: " + movies[movieID].price + " kr<br>" +
            "Genre: " + movies[movieID].genre + "</p>");
        });

        // Stänger info-rutan
        $(".overlay-close").on("click", function(){
            $(".info").hide();
            $(".info").find("*").not("span.overlay-close").empty();
        });

        // Rensar valfritt objekt ur varukorgen
        $('#basketList').on("click", function(event){
            
            if ($(event.target).hasClass("remove")) {
                // Tar bort list-elementet från varukorgen
                $(event.target.parentElement).remove();
            }

            // Tar id från ul li
            let movieID = event.target.parentElement.id;
            movieID = movieID.replace("movieLi", "");

            // Tar bort objektet från LS
            $.each(itemsArray, function(i){
                if(itemsArray[i].id == movieID) {
                    itemsArray.splice(i,1); // Removes object from index position
                    localStorage.setItem("Varukorgen", JSON.stringify(itemsArray));
                    return false;
                }
            });
            counterCheck();
        });

        // Rensar localStorage och varukorgen
        $('#clearAll').click(function(){  
            localStorage.clear();
            itemsArray = [];
            basketList.empty();
            counterCheck();
        });

        // ======================================= //
        // Functions

        // Kollar vilka varor som finns i LS och skriver ut antalet i varukorgen
        function counterCheck(){
            let antalVaror = 0;
            $(itemsArray).each(function(i,movie){
                let antal = parseInt(localStorage.getItem('Quantity' + movie.id));
                antalVaror += antal;
            });
            counter.innerHTML = antalVaror; 
        };
    });  
});