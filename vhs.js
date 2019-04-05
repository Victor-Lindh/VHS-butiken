$(document).ready(function(){


let newlist = document.getElementById("newlist");
        let buybuttons = document.getElementsByClassName("buybutton");
        let infobuttons = document.getElementsByClassName("infobutton");
        let list = "";
        let array = [];
        let count = [];
        let counter = document.getElementById("counter");
        let basketList = document.getElementById("basketList");
        let $removeButtons = $(".remove");
        console.log($removeButtons);
// ----------------------------------------------------------------------------------

        // Hämta json-filen, lagra datan i variabeln svar
    
        $("#newlist").load("vhs.json", function (response, status, request) {   
        
        let svar = JSON.parse(response)
        console.log("JSON.parse=", svar);
        

        // For-loopen nedan skapar dynamiskt HTML-elementen som behövs för att skapa produkternas sektioner, med hjälp av json-filens nycklar och värden

for (let i = 0; i < svar.length; i++) {
    list += "<div class='movie'>";
    list += "<img src='" + svar[i].cover + "' id='movie" + [i] + "-info' class='infobutton'><h4>" + svar[i].title + "</h4><input type='number' min='1' max='10' value='1' id='movie" +[i] + "-quantity' class='quantinput'><button class='buybutton' id='movie" + [i] + "'>Lägg i varukorgen</button></div><br>";
    newlist.innerHTML = list;
}

while (localStorage.antal >= 0){
    counter.innerHTML = localStorage.getItem("Antal");
}

for (let x = 0; x < buybuttons.length; x++) {
    buybuttons[x].addEventListener("click", buyMovie);

// buyMovie tittar på vilken films köpknapp som klickas på, sett till knappens id. Beroende på vilket id som aktiverats, skickas olika informationer till varukorgen.

function buyMovie(e){
    let event = e.target.id;
    console.log(event);

    switch(event){

        case event="movie0":
        array += svar[0].title;
        let movie0quant = +$("#movie0-quantity").val();
        $("#basketList").append("<li><input type='number' class='quantity' min='1' max='10'>" + " x " + svar[0].title + "<button class='remove' id='$testID'>Ta bort</button></li>");
        count += movie0quant;
        
        break;

        case event="movie1":
        array += svar[1].title;
        $("#basketList").append("<li>" + svar[1].title + "<button>Ta bort</button></li>");
        let movie1quant = +$("#movie1-quantity").val();
        count += movie1quant;
        break;

        case event="movie2":
        array += svar[2].title;
        $("#basketList").append("<li>" + svar[2].title + "<button>Ta bort</button></li>");
        let movie2quant = +$("#movie2-quantity").val();
        count += movie2quant;
        break;

        case event="movie3":
        array += svar[3].title;
        $("#basketList").append("<li>" + svar[3].title + "<button>Ta bort</button></li>");
        let movie3quant = +$("#movie3-quantity").val();
        count += movie3quant;
        break;

        case event="movie4":
        array += svar[4].title;
        $("#basketList").append("<li>" + svar[4].title + "<button>Ta bort</button></li>");
        let movie4quant = +$("#movie4-quantity").val();
        count += movie4quant;
        break;

        case event="movie5":
        array += svar[5].title;
        $("#basketList").append("<li>" + svar[5].title + "<button>Ta bort</button></li>");
        let movie5quant = +$("#movie5-quantity").val();
        count += movie5quant;
        break;

        case event="movie6":
        array += svar[6].title;
        $("#basketList").append("<li>" + svar[6].title + "<button>Ta bort</button></li>");
        let movie6quant = +$("#movie6-quantity").val();
        count += movie6quant;
        break;

        case event="movie7":
        array += svar[7].title;
        $("#basketList").append("<li>" + svar[7].title + "<button>Ta bort</button></li>");
        let movie7quant = +$("#movie7-quantity").val();
        count += movie7quant;
        break;

        case event="movie8":
        array += svar[8].title;
        $("#basketList").append("<li>" + svar[8].title + "<button>Ta bort</button></li>");
        let movie8quant = +$("#movie8-quantity").val();
        count += movie8quant;
        break;

        case event="movie9":
        array += svar[9].title;
        $("#basketList").append("<li>" + svar[9].title + "<button>Ta bort</button></li>");
        let movie9quant = +$("#movie9-quantity").val();
        count += movie9quant;
        break;
    }
    // Ta bort-knappar
$(".remove").on("click", function(){
    $(this.parentElement).remove();

   let newAmnt = localStorage.getItem("Antal");
    counter.innerHTML = newAmnt;

});
    count = Number(count);
    localStorage.setItem("Antal", count);
    counter.innerHTML = localStorage.getItem("Antal");
    let arraySon = JSON.stringify(array);       // Vi kör stringify på arrayen som ska skickas till                                                     localStorage
    localStorage.setItem("basket", arraySon);
}
counter.innerHTML = localStorage.getItem("Antal");
}

for (let c = 0; c < infobuttons.length; c++) {
infobuttons[c].addEventListener("click", showInfo);
}

// Funktionen showInfo tittar på vilken infoknapps id som klickas på
function showInfo(e){
    let event = e.target.id;
    console.log(event);
}

});
})