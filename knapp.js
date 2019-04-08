
$('#checkoutBtn').click(function(event){
let counter = document.getElementById('counter').innerHTML;
if (counter > 0) {
 event.target.href = 'betalsida.html';  
}
});