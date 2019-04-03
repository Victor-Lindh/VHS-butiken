let newlist = document.getElementById("newlist");
        let buybuttons = document.getElementsByClassName("buybutton");
        let infobuttons = document.getElementsByClassName("infobutton");
        let list = "";
        let array = [];
        let count = [];
        let counter = document.getElementById("counter");

    $("#newlist").load("vhs.json", function (response, status, request) {
        
        let svar = $.parseJSON(response)
        console.log("parseJSON=", svar);
        
for (let i = 0; i < svar.length; i++) {
    list += "<div class='movie'><h4>" + svar[i].title + "</h4>";
    list += "<img src=" + svar[i].cover + ">" + "<button class='buybutton' id='movie" + [i] + "'>Lägg i varukorgen</button><button class='infobutton' id='movie" + [i] + "-info'>Läs mer</button></div><br>";
    newlist.innerHTML = list;
}

// Loopa igenom alla knappar, initiera funktionen buyMovie samt räknaren vid klick på köp-knappen
for (let x = 0; x < buybuttons.length; x++) {
    buybuttons[x].addEventListener("click", buyMovie);
    buybuttons[x].addEventListener("click", itemsCount);
}
function itemsCount(){
let x;
x = count.push(1);
counter.innerHTML = x;
}
function buyMovie(e){
    let event = e.target.id;

    switch(event){

        case event="movie0":
        
        array += svar[0].title;
        $("#basketList").append("<li>" + svar[0].title + "<button>Ta bort</button></li>");
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


    let arraySon = JSON.stringify(array);
    localStorage.setItem("Din varukorg:", arraySon);
}

    });
