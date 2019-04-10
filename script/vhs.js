$(document).ready(function(){
    $.getJSON("vhs.json", function(response){   

        let newList = document.getElementById("newList");
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
            basketList.append(`<li>${itemsArray[i].title} x <span id='quantity${itemsArray[i].id - 1}'>${localStorage.getItem("Quantity" + (itemsArray[i].id - 1))}</span><br><button class='plus' id='plus${itemsArray[i].id - 1}'>+</button><button class='minus' id='minus${itemsArray[i].id - 1}'>-</button><button class='remove' id='remove${itemsArray[i].id - 1}'>X</button></li>`);
        };

        counterCheck(); // Kollar och skriver ut antal varor i varukorgen

        // ======================================= //
        // Klickfunktioner
        
        // När man klickar på köp läggs filmen till i LS och i varukorgen
        $('.buybutton').on("click", function(event){
            let movieID = event.target.id;
            movieID = movieID.replace("btn",""); // 0,1,2...9

            let quantity = document.getElementById("quantity" + movieID) ? document.getElementById("quantity" + movieID) : 0;

            // Deklarerar antal av samma film
            let itemsInBasket = 1;

            if (quantity === 0 ){
                // Lägger till filmens objekt i listan
                itemsArray.push(movies[movieID]);
                // Lägger till hela listan i LS som en sträng
                localStorage.setItem("Varukorgen", JSON.stringify(itemsArray));
    
                // Lägger till i varukorgen
                basketList.append("<li>" + movies[movieID].title + " x <span id='quantity" + movieID + "'>1</span><br><button class='plus' id='plus" + movieID + "'>+</button><button class='minus' id='minus" + movieID + "'>-</button><button class='remove' id='remove" + movieID + "'>X</button></li>");

                localStorage.setItem("Quantity" + movieID, itemsInBasket);
            }
            else {
                itemsInBasket = parseInt(quantity.innerHTML, 10);
                itemsInBasket++;
                
                localStorage.setItem("Quantity" + movieID, itemsInBasket);
                quantity.innerHTML = itemsInBasket;
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
            movieID = movieID.replace("movie",""); // 0,1,2...9
            
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

            let movieID = event.target.id;
            movieID = movieID.slice(-1); // 0,1,2...9

            let itemsInBasket = localStorage.getItem("Quantity" + movieID); // String
            itemsInBasket = parseInt(itemsInBasket, 10); // Number

            // REMOVE BUTTON            
            if (event.target.id == "remove" + movieID) {
                // Tar bort list-elementet från varukorgen
                $(event.target.parentElement).remove();

                // Tar bort objektet från LS
                for (let i = 0; i < itemsArray.length; i++) {
                    if (itemsArray[i].id == (parseInt(movieID) + 1)) {
                        localStorage.removeItem("Quantity" + movieID);
                        itemsArray.splice(i, 1); // Removes object from index position
                        localStorage.setItem("Varukorgen", JSON.stringify(itemsArray));
                    }
                }
            }

            // PLUS BUTTON
            if (event.target.id == "plus" + movieID) {
                itemsInBasket++;
                
                localStorage.setItem("Quantity" + movieID, itemsInBasket);
                document.getElementById("quantity" + movieID).innerHTML = itemsInBasket;            
            }

            // MINUS BUTTON
            if (event.target.id == "minus" + movieID) {
                itemsInBasket--;

                if (itemsInBasket === 0) {
                    $(event.target.parentElement).remove();
                    
                    // Tar bort objektet från LS
                    for (let i = 0; i < itemsArray.length; i++) {
                        if (itemsArray[i].id == (parseInt(movieID) + 1)) {
                            localStorage.removeItem("Quantity" + movieID);
                            itemsArray.splice(i, 1); // Removes object from index position
                            localStorage.setItem("Varukorgen", JSON.stringify(itemsArray));
                        }
                    }
                }
                else {
                    localStorage.setItem("Quantity" + movieID, itemsInBasket);
                    document.getElementById("quantity" + movieID).innerHTML = itemsInBasket;
                }
            }
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
            let total = 0;
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) != "Varukorgen"){ // Kollar alla keys förutom Varukorgen
                    total += parseInt(localStorage.getItem(localStorage.key(i))); // Lägger till rätt antal
                }
            }
            document.getElementById('counter').innerHTML = total; 
        };
    });  
});