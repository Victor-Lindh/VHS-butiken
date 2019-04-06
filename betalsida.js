
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
    console.log(itemsArray);
    console.log(itemsArray[0].price);
  
    counter(); 
    //Itemsarray.length blir siffran i elementet med id="counter"
    function counter(){
  
      let counter = $('#counter');
      $(counter).html(itemsArray.length);
  
    };
  
    varukorg();
  
    function varukorg(){
      
      let items = $('#items');
      let totalPrice = 0;
      //loopar igenom arrayen
    $(itemsArray).each(function(i, movie){
      console.log(i);
      console.log(movie.price)
      //lägger till varje films pris i totalPrice variabeln
      let moviePrice = parseInt(movie.price);
      totalPrice += moviePrice;
  
      //Lägger till values från itemsArray som produkter i id="items"
      $(items).append(`
      <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0">${movie.title}</h6>
                  <small class="descrip">${movie.director}</small>
                </div>
                <span class="descrip">${movie.price}</span>
              </li>
      `);
    });
    console.log(totalPrice);
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
  
  
  });
  