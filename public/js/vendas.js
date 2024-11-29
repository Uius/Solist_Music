let v1=0, g1=1550, g2=1450, g3=2500, g4=4500, g5=2550, g6=8700, g7=2700, g8=3950

function calculo(){
  if(document.getElementById("tele").checked){
     v1= g1+v1
  }
  if(document.getElementById("stratorosa").checked){
    v1= g2+v1
  }
  if(document.getElementById("lespaul").checked){
    v1= g3+v1
  }
  if(document.getElementById("superstrato").checked){
    v1= g4+v1
  }
  if(document.getElementById("explorer").checked){
     v1= g5+v1
  }
  if(document.getElementById("jaguar").checked){
    v1= g6+v1
  }
  if(document.getElementById("flyv").checked){
    v1= g7+v1
  }
  if(document.getElementById("semi").checked){
    v1= g8+v1
  }
  
  
  
 
  
  document.getElementById("valorf").innerHTML = "O valor final da sua compra será R$: " +v1;
}

document.getElementById('confirmar-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Impede o envio padrão

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
      const response = await fetch('/confirmar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (response.ok) {
          alert(data.message); // Exibe mensagem de sucesso
      } else {
          alert("Erro: " + (data.message || "Erro ao confirmar a senha.")); // Erro customizado
      }
  } catch (error) {
      alert("Erro inesperado: " + error.message);
  }
});

function sairConta(){
  window.location.href ="login.html"
}

function mostrarSenha() {
  const senha = document.getElementById('senha');
  const icon = document.getElementById('icon');
  
  if(senha.type === 'password'){
    senha.setAttribute('type', 'text')
    icon.classList.add('show')
  }
  else{
    senha.setAttribute('type', 'password')
    icon.classList.remove('show')
  }
};