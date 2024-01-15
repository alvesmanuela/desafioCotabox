/* A inteção dessas funções de loading, é fazer um intertravamento/congelamento na tela.
 Impendido que o usuario pratique outra ação até que o carregando da informação seja executado */

/* Exebição da loading */
function showLoading() {
    const div = document.createElement("div");
    div.classList.add("loading", "centralize");


    const label = document.createElement("label");
    label.innerText = "Carregando...";

    div.appendChild(label);

    document.body.appendChild(div);
}

function hideLoading() {
    const loadings = document.getElementsByClassName("loading");
    if (loadings.length) {
        loadings[0].remove();
    }

}