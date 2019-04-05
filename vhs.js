let newlist = document.getElementById("newlist");
        let buybuttons = document.getElementsByClassName("buybutton");
        let infobuttons = document.getElementsByClassName("infobutton");
        let list = "";
        let array = [];
        let count = [];
        let counter = document.getElementById("counter");
        let basketList = document.getElementById("basketList");
// ----------------------------------------------------------------------------------

        // Hämta json-filen, lagra datan i variabeln svar
    
        $("#newlist").load("vhs.json", function (response, status, request) {   
        
        let svar = JSON.parse(response)
        console.log("JSON.parse=", svar);
        

        // For-loopen nedan skapar dynamiskt HTML-elementen som behövs för att skapa produkternas sektioner, med hjälp av json-filens nycklar och värden

for (let i = 0; i < svar.length; i++) {
    list += "<div class='movie'>";
    list += "<img src=" + svar[i].cover + "><h4>" + svar[i].title + "</h4>" + "<button class='buybutton' id='movie" + [i] + "'>Lägg i varukorgen</button><button class='infobutton' id='movie" + [i] + "-info'>Läs mer</button></div><br>";
    newlist.innerHTML = list;
}

// Loopar igenom alla knappar, funktionerna buyMovie och funktionen itemsCount exekveras vid klick på köp-knapparna

for (let x = 0; x < buybuttons.length; x++) {
    buybuttons[x].addEventListener("click", buyMovie);
    buybuttons[x].addEventListener("click", itemsCount);

// itemsCount initierar en räknare i varukorgen som räknar antalet varor i korgen
}

    function itemsCount(){
      let c = count.push(1);
        localStorage.setItem("Antal", c)
        
        counter.innerHTML = localStorage.getItem("Antal");
    }
   
counter.innerHTML = localStorage.getItem("Antal");


// buyMovie tittar på vilken films köpknapp som klickas på, sett till knappens id. Beroende på vilket id som aktiverats, skickas olika informationer till varukorgen.
function buyMovie(e){
    let event = e.target.id;

    switch(event){

        case event="movie0":
        array += svar[0].title;
        $("#basketList").append("<li>" + svar[0].title + "<span class='more'>+</span><span class='less'>-</span><button>Ta bort</button></li>");
        
        break;

        case event="movie1":
        array += svar[1].title;
        $("#basketList").append("<li>" + svar[1].title + "<button>Ta bort</button></li>");
        break;

        case event="movie2":
        array += svar[2].title;
        $("#basketList").append("<li>" + svar[2].title + "<button>Ta bort</button></li>");
        break;

        case event="movie3":
        array += svar[3].title;
        $("#basketList").append("<li>" + svar[3].title + "<button>Ta bort</button></li>");
        break;

        case event="movie4":
        array += svar[4].title;
        $("#basketList").append("<li>" + svar[4].title + "<button>Ta bort</button></li>");
        break;

        case event="movie5":
        array += svar[5].title;
        $("#basketList").append("<li>" + svar[5].title + "<button>Ta bort</button></li>");
        break;

        case event="movie6":
        array += svar[6].title;
        $("#basketList").append("<li>" + svar[6].title + "<button>Ta bort</button></li>");
        break;

        case event="movie7":
        array += svar[7].title;
        $("#basketList").append("<li>" + svar[7].title + "<button>Ta bort</button></li>");
        break;

        case event="movie8":
        array += svar[8].title;
        $("#basketList").append("<li>" + svar[8].title + "<button>Ta bort</button></li>");
        break;

        case event="movie9":
        array += svar[9].title;
        $("#basketList").append("<li>" + svar[9].title + "<button>Ta bort</button></li>");
        break;
    }
    
    
    let arraySon = JSON.stringify(array);       // Vi kör stringify på arrayen som ska skickas till localStorage
    localStorage.setItem("basket", arraySon);


    

}

for (let c = 0; c < infobuttons.length; c++) {
infobuttons[c].addEventListener("click", showInfo);
}

function showInfo(e){
    let event = e.target.id;
    console.log(event);
}

});
