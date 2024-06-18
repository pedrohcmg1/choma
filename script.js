

function logar(){

    let login = document.getElementById("username").value;
    let senha = document.getElementById("password").value;
  
    if(login != "" || senha != ""){
  
      
      if(login ==="chominha" && senha==="cocacola"){
        document.getElementById("respostaLogin").innerHTML = "Bem vindo, Nelso!"
  
        let token = "chominha";
        JSON.stringify(token);
        localStorage.setItem("token", token);
       
        window.location.href = "nova_pagina.html";
      }else{
        document.getElementById('respostaLogin').innerHTML = "Login ou senha incorretos";
      }
  
      
    }else{
      document.getElementById('respostaLogin').innerHTML = "Preencha todos os campos";
    }
    
    
  }
