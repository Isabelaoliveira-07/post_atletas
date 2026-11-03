const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-atletas");
const modelo = document.querySelector("#modelo-atleta");


const apiKey = "cv_VgZLs_7Sn4flBP_dZkXD72rLu1ILKiUG4IWm6cBtpaApZU4YZp7jz8xzWiDPOobL";

const apiUrl = "https://api-ds.codeverse.dev.br/api/atletas";

async function buscarAtletas() {

  //Mostra uma msg.
  resposta.textContent="Carregando atletas..."
  
  try {
    //Fazer o get
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key": apiKey},
    });
    
    //Verificar se não deu certo
    if(!retorno.ok){
      throw new Error("Não foi possível carregar os atletas.");
    }

    // Converter o resultado para JSON, pois será um objeto.
    const resultado = await retorno.json();

    //Percorrer todos os atletass que esta dentro de resultado.
    for (const atletas of resultado.data){
      
      //fazer uma copia do modelo que criamos no html
      const card = modelo.content.cloneNode(true);

      //preecher cada item desse card

      card.querySelector(".nome").textContent = atletas.title;
      card.querySelector(".esporte").textContent = atletas.esporte;
      card.querySelector(".pais").textContent = atletas.pais;
      card.querySelector(".idade").textContent = atletas.idade;

      const imagem = card.querySelector(".imagem-atletas");

      if (atletas.imageUrl){
        imagem.src = atletas.imageUrl;
        imagem.alt = atletas.title;
        
        imagem.onerror = () => imagem.remove();
        
      } else {
        imagem.remove();
      }

      // adiciona o card preenchido na tela

      lista.appendChild(card);
      resposta.textContent = "";

    }

  } catch (error) {
    console.error(error);
    resposta.textContent= "Não foi possível carregar os heróis. Tente novamente!" 
  }
}

// Executar no arquivo

buscarAtletas();