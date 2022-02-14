let username = "";

inicio();

function quandoSucesso() {
    getMensagens();
    setInterval(getMensagens, 3000);
    setInterval(conexaoServidor, 5000);
}

function inicio() {
    username = prompt("Seu lindo nome");

    let promise = axios.post(
        "https://mock-api.driven.com.br/api/v4/uol/participants",
        {
            name: username
        }
    );

    promise.then(quandoSucesso);
}

function conexaoServidor() {
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", {name:username});
};

function getMensagens() {
    const resposta = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    resposta.then(renderizarMensagens);
  }

function renderizarMensagens(resposta) {
    const mensagens = resposta.data;
    var div = document.querySelector("main");
    div.innerHTML = "";

    for (let i = 0; i < mensagens.length; i++) {
        const mensagem = mensagens[i];

        if (mensagem.type == "message") {
            div.innerHTML += `
                <div class="mensagem" id="standardMessage">
                    <p>(${mensagem.time}) ${mensagem.from} para ${mensagem.to}: ${mensagem.text}</p>
                </div>
                `;
        }

        if (mensagem.type == "status") {
            div.innerHTML += `
                <div class="mensagem" id="status">
                    <p>(${mensagem.time}) ${mensagem.from} ${mensagem.text}</p>
                </div>
                `;
        }

        if (mensagem.type == "private_message") {
            div.innerHTML += `
                <div class="mensagem" id="privateMessage">
                    <p>(${mensagem.time}) ${mensagem.from} reservadamente para ${mensagem.to}: ${mensagem.text}</p>
                </div>
                `;
        }
}
}