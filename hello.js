if (!localStorage.getItem('n')){
  localStorage.setItem('n',0);
}

function contadorn(){
  let n=localStorage.getItem('n');
  n++;
  document.querySelector('h2').innerHTML=n;
  localStorage.setItem('n',n);
 }


document.addEventListener('DOMContentLoaded', function(){
  //By default button will be disabled
  document.querySelector("#submit_btn").disabled = true;
  document.querySelector("#tarea_txt").onkeyup = () => {
      if (document.querySelector("#tarea_txt").value.length > 0){
          document.querySelector("#submit_btn").disabled = false;
      }else{
          document.querySelector("#submit_btn").disabled = true;
      }
  }

  ////  API Exchange rates  //////////////
  document.querySelector('#form_moneda').onsubmit=() => {
    fetch('https://api.exchangeratesapi.io/latest?base=USD')
    .then(Response => Response.json())
    .then(data => {
      // const currency_li=data.rates.EUR;
      const currency = document.querySelector('#moneda_txt').value.toUpperCase();
      const rate = data.rates[currency];
      const li=document.createElement('li');
      if (rate !== undefined){
        li.innerHTML = `1 USD = ${rate.toFixed(3)} ${currency}.`;
      }else{
        li.innerHTML = 'Moneda NO válida';
      }         
      // document.querySelector('#currency_li').append('1 USD = ${currency_li} EUR');  
      //document.querySelector('#currency_li').append('1 USD = $',currency_li.toFixed(3),' EUR.');
      document.querySelector('#currency_ul').append(li);
      //console.log(data.rates.EUR);
          
    })
    .catch(error => {
      console.log('Error:', error);
    });

    return false;
  }

//////////////////////////////////////////////
  //This is for contador
  document.querySelector('#contador_btn').onclick=contadorn;
// Cada que se abre o refresca la pantalla trae el ultimo valor guardado en localStorage
  document.querySelector('h2').innerHTML=localStorage.getItem('n');
  setInterval(contadorn,2000); //contador automatico c 2/segundo


  document.querySelector('#form').onsubmit = () => {
      const tarea=document.querySelector("#tarea_txt").value;
      //console.log(tarea)
      const li=document.createElement('li');
      li.innerHTML = tarea;   
      document.querySelector("#tareas").append(li);
      //Clear textbox and disable submit button
      document.querySelector("#tarea_txt").value="";
      document.querySelector("#submit_btn").disabled="true";
      //Stop form from submit button
      return false;
  }   
})

