// Om varukorgen är tom kan man inte gå vidare till betalning
$('#checkoutBtn').click(function(event){
    // Hämtar antal varor i varukorgen
    let counter = document.getElementById('counter').innerHTML;
    // Om det finns minst en film i varukorgen byts href ut till betalsidan
    if (counter > 0) { 
        event.target.href = 'betalsida.html'; 
    }
    else {
        let button = document.getElementById('checkoutBtn');

        button.style.backgroundColor = "#D23B26";
        setTimeout(function(){
            button.style.backgroundColor = "green";
        }, 1000);
    }
});