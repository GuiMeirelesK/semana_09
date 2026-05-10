const data = {
    produtos: [
        { id: 1, nome: "Notebook Gamer", preco: 4500, categoria: "Notebooks", imagem: "https://via.placeholder.com/150", descricao: "Potente para jogos e trabalho.", emEstoque: true },
        { id: 2, nome: "Smartphone X", preco: 2500, categoria: "Celulares", imagem: "https://via.placeholder.com/150", descricao: "Câmera de alta resolução.", emEstoque: true },
        { id: 3, nome: "Mouse Sem Fio", preco: 150, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "Ergonômico e rápido.", emEstoque: false },
        { id: 4, nome: "Teclado Mecânico", preco: 350, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "RGB com switches blue.", emEstoque: true },
        { id: 5, nome: "Monitor 144Hz", preco: 1200, categoria: "Games", imagem: "https://via.placeholder.com/150", descricao: "Fluidez total para seus jogos.", emEstoque: true },
        { id: 6, nome: "Headset 7.1", preco: 400, categoria: "Games", imagem: "https://via.placeholder.com/150", descricao: "Som imersivo.", emEstoque: true },
        { id: 7, nome: "MacBook Air", preco: 8000, categoria: "Notebooks", imagem: "https://via.placeholder.com/150", descricao: "Leve e potente.", emEstoque: true },
        { id: 8, nome: "Cabo USB-C", preco: 50, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "Carga rápida.", emEstoque: true },
    ]
};


const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const inputSearch = document.querySelector("#search");
const selectCategory = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");


function formatPrice(preco) {
    return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);
    
    
    card.style.border = "1px solid #ccc";
    card.style.padding = "15px";

    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3 class="card-title">${produto.nome}</h3>
        <p>${formatPrice(produto.preco)}</p>
        <small>${produto.categoria}</small>
        <div class="card-buttons">
            <button class="btn-details">Ver detalhes</button>
            <button class="btn-highlight">Destacar</button>
        </div>
    `;

    
    card.querySelector(".btn-details").addEventListener("click", () => showProductDetails(produto));
    card.querySelector(".btn-highlight").addEventListener("click", () => {
        card.classList.toggle("highlight");
    });

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";
    produtos.forEach(p => {
        productList.appendChild(createProductCard(p));
    });
    
    const allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
        console.log("Card renderizado - ID:", card.getAttribute("data-id"));
    });
}

function renderCategories() {
    const categorias = ["Todas", ...new Set(data.produtos.map(p => p.categoria))];
    selectCategory.innerHTML = categorias.map(c => `<option value="${c}">${c}</option>`).join("");
}

function showProductDetails(produto) {
    const status = produto.emEstoque ? "Em estoque" : "Fora de estoque";
    productDetails.innerHTML = `
        <h3>${produto.nome}</h3>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

function filterProducts() {
    const text = inputSearch.value.toLowerCase();
    const category = selectCategory.value;

    const filtered = data.produtos.filter(p => {
        const matchesText = p.nome.toLowerCase().includes(text);
        const matchesCategory = category === "Todas" || p.categoria === category;
        return matchesText && matchesCategory;
    });

    renderProducts(filtered);
}
btnRender.addEventListener("click", () => renderProducts(data.produtos));
inputSearch.addEventListener("input", filterProducts);
selectCategory.addEventListener("change", filterProducts);
renderCategories();
renderProducts(data.produtos);