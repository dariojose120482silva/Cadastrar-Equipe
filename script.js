const equipes = [];

    function cadastrarEquipe() {
      const nome = document.getElementById("nomeEquipe").value;
      const foto = document.getElementById("fotoEquipe").files[0];
      if (!nome || !foto) return alert("Preencha todos os campos.");

      const reader = new FileReader();
      reader.onload = function () {
        const equipe = {
          nome,
          foto: reader.result,
          atletas: []
        };
        equipes.push(equipe);
        renderEquipes();
      };
      reader.readAsDataURL(foto);
    }

    function cadastrarAtleta(index) {
      const nome = document.getElementById(`nomeAtleta-${index}`).value;
      const posicao = document.getElementById(`posicao-${index}`).value;
      const dataNasc = document.getElementById(`dataNasc-${index}`).value;
      const foto = document.getElementById(`fotoAtleta-${index}`).files[0];
      if (!nome || !posicao || !dataNasc || !foto) return alert("Preencha todos os campos do atleta.");

      const reader = new FileReader();
      reader.onload = function () {
        const atleta = {
          nome, posicao, dataNasc, foto: reader.result
        };
        equipes[index].atletas.push(atleta);
        renderEquipes();
      };
      reader.readAsDataURL(foto);
    }

    function renderEquipes() {
      const div = document.getElementById("equipes");
      div.innerHTML = "";
      equipes.forEach((equipe, i) => {
        const card = document.createElement("div");
        card.className = "equipe-card";
        card.innerHTML = `
          <h2>${equipe.nome}</h2>
          <img src="${equipe.foto}" alt="Foto da Equipe">
          <h3>Adicionar Atleta</h3>
          <input type="text" id="nomeAtleta-${i}" placeholder="Nome do Atleta">
          <input type="text" id="posicao-${i}" placeholder="Posição">
          <input type="date" id="dataNasc-${i}">
          <input type="file" id="fotoAtleta-${i}" accept="image/*">
          <button onclick="cadastrarAtleta(${i})">Adicionar Atleta</button>
          <h4>Elenco:</h4>
          <ul>
            ${equipe.atletas.map(atleta => `
              <li>
                <strong>${atleta.nome}</strong> - ${atleta.posicao} - ${atleta.dataNasc}
                <img src="${atleta.foto}" alt="Foto do Atleta">
              </li>`).join('')}
          </ul>
        `;
        div.appendChild(card);
      });
    }