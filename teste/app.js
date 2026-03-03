/* ===========================================
   TEMPLATE CARDÁPIO DIGITAL GENÉRICO
   =========================================== */

/* ALTERAR AQUI: Produtos da empresa */
const PRODUTOS = {
  categoria1: [
    { nome: "Produto Exemplo A", preco: 10 },
    { nome: "Produto Exemplo B", preco: 15 }
  ],
  categoria2: [
    { nome: "Produto Exemplo C", preco: 8 },
    { nome: "Produto Exemplo D", preco: 12 }
  ],
  categoria3: [
    { nome: "Produto Exemplo E", preco: 5 }
  ]
};

let carrinho = [];

/* ================= RENDERIZAÇÃO ================= */
function renderizar() {
  Object.keys(PRODUTOS).forEach(cat => {
    const container = document.getElementById(`lista-${cat}`);
    if (!container) return;

    container.innerHTML = "";

    PRODUTOS[cat].forEach(prod => {
      const div = document.createElement("div");
      div.className = "produto";
      div.innerHTML = `
        <span>${prod.nome}</span>
        <strong>R$ ${prod.preco.toFixed(2)}</strong>
        <button onclick="addItem('${prod.nome}', ${prod.preco})">+</button>
      `;
      container.appendChild(div);
    });
  });
}

/* ================= CARRINHO ================= */
function addItem(nome, preco) {
  const item = carrinho.find(p => p.nome === nome);
  item ? item.qtd++ : carrinho.push({ nome, preco, qtd: 1 });

  atualizarCarrinho();
}

function atualizarCarrinho() {
  const totalQtd = carrinho.reduce((s, i) => s + i.qtd, 0);
  document.getElementById("carrinhoQtd").textContent = totalQtd;
}

function abrirCarrinho() {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  const conteudo = document.getElementById("modalConteudo");

  overlay.style.display = "block";
  modal.style.display = "block";

  if (carrinho.length === 0) {
    conteudo.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  let html = "";
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.qtd;
    total += subtotal;

    html += `
      <div>
        ${item.qtd}x ${item.nome} — R$ ${subtotal.toFixed(2)}
      </div>
    `;
  });

  html += `<hr><strong>Total: R$ ${total.toFixed(2)}</strong>`;

  conteudo.innerHTML = html;
}

function fecharCarrinho() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("modal").style.display = "none";
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", renderizar);