
(function () {
  
    window.addEventListener('load', function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      let forms = document.getElementsByClassName('needs-validation')
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
    }, false)
  }())
  
  
  $(document).ready(function(){
    
    //filmer i LS
    let itemsArray = localStorage.getItem('Varukorgen') ? JSON.parse(localStorage.getItem('Varukorgen')) : [];
  
    counter(); 

    //Itemsarray.length blir siffran i elementet med id="counter"
    function counter(){
      let counter = document.getElementById('counter2');
      let antalVaror = 0;
      $(itemsArray).each(function(i,movie){

        let antal = parseInt(localStorage.getItem('Quantity' + movie.id));
        antalVaror += antal;

      });
      
      counter.innerHTML = antalVaror;
      
    };
  
    varukorg();
  
    function varukorg(){
      
      let items = $('#items');
      let totalPrice = 0;
      //Loopar igenom LS för att hämta innehållet

      //loopar igenom arrayen
    $(itemsArray).each(function(i, movie){

      //hämtar quantity och kopplar till rätt film.
      let antal = localStorage.getItem('Quantity' + movie.id);

      //lägger till varje films pris i totalPrice variabeln
      let moviePrice = parseInt(movie.price);
      let antalPris = moviePrice * antal;
      console.log(antalPris)
      totalPrice += antalPris;

  
      //Lägger till values från itemsArray som produkter i id="items"
      $(items).append(`
      <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0">${movie.title}</h6>
                  <small class="descrip">Antal: ${antal}</small>
                </div>
                <span class="descrip">${antalPris}Kr</span>
              </li>
      `);
    });

    $(items).append(`
    <li class="list-group-item d-flex justify-content-between">
                <span>Summa</span>
                <strong>${totalPrice}Kr</strong>
              </li>
    `);
  
  };
  
    $('#subBtn').click(function(){
      //deklarerar värden för inputfälten
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let email = $('#email').val();
    let country = $('#country').val();
    let adress = $('#adress').val();
    let city = $('#stad').val();
    let zip = $('#zip').val();
  
      //lägger de sedan i LS
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('adress', adress)
    localStorage.setItem('country', country);
    localStorage.setItem('city', city)
    localStorage.setItem('zip', zip);
  
    });
  
  
     
    let firstName = localStorage.getItem('firstName');
    let lastName = localStorage.getItem('lastName');
    let email = localStorage.getItem('email');
    let adress = localStorage.getItem('adress')
    let country = localStorage.getItem('country');
    let city = localStorage.getItem('city');
    let zip = localStorage.getItem('zip');

    $('#text').html(`
    <h2 class="d-flex justify-content-center my-3"> Tack ${firstName} ${lastName} för ditt köp! </h2>
    <p> Vi uppskattar att du valt att handla hos oss. Dina varor kommer bli levererade av DBschenker till närmsta ombud
    för <strong>${adress}</strong>. </p>
    <p> Så snart din varor är packade kommer du få ett meddelande skickat till <strong>${email}</strong> om att ditt paket är på väg till dig.</p>
    <p> Vänliga hälsningar från oss på Play VHS. </p>
    
    `);

    receiptTable();

    function receiptTable(){
      
        let rows = $('#receiptBody');
        let totalPrice = 0;
        let varunummer = 0;
        let antal = 1;

        //loopar igenom arrayen
      $(itemsArray).each(function(i, movie){

      //hämtar quantity och kopplar till rätt film.
      let antal = localStorage.getItem('Quantity' + movie.id);

      //lägger till varje films pris i totalPrice variabeln
      let moviePrice = parseInt(movie.price);
      let antalPris = moviePrice * antal;
      console.log(antalPris)
      totalPrice += antalPris;
      varunummer++;

      //Lägger till values från itemsArray som produkter i id="items"
      $(rows).append(`
      <tr>
      <th scope="row">${varunummer}</th>
      <td>${movie.title}</td>
      <td>${movie.director}</td>
      <td>${antal}</td>
      <td>${antalPris} Kr</td>
    </tr>
      `);
    });
    
    $(rows).append(`

    <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td class="text-right">
    <h6> <strong>Totalsumma: </strong></h6>
    </td>
    <td class="text-center text-danger"> <h6><strong>${totalPrice}Kr</strong></h6> </td>
    </tr>
    `);
        
    
    };//Receipttable()

    $('#knappN').click(function(){

        localStorage.clear();
        itemsArray = [];
        basketList.empty();
        
    });

  }); //Ready
  