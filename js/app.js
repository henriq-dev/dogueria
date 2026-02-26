/* ============================================================
   TUBARÃO DOGUERIA — app.js
   Cardápio digital · Porto Velho / RO

   ÍNDICE:
   1.  Dados da Loja
   2.  Integração com Painel Admin
   3.  Estado Global
   4.  Utilitários (fuso horário, formatação)
   5.  Carrinho (add, remove, atualizar, persistir)
   6.  Modal do Carrinho (abrir, fechar, renderizar)
   7.  Formulário do Pedido (tipo, pagamento)
   8.  Envio via WhatsApp
   9.  Status Aberto / Fechado
   10. Renderização do Cardápio (data-driven)
   11. Menu Lateral de Produtos
   12. Modal Sobre a Loja
   13. Navegação por Categorias
   14. Inicialização (DOMContentLoaded)
   ============================================================ */


/* ============================================================
   1. DADOS DA LOJA
   Fonte de verdade do cardápio. Edite apenas este bloco
   para alterar preços, nomes, descrições ou horários.
   O painel admin (admin.html) sobrescreve esses dados via
   localStorage — veja seção 2.
   ============================================================ */
const LOJA = {
  nome: 'Tubarão Dogueria',
  telefone: '5569993009408',
  horario: {
    diasAbertos: [1, 2, 3, 4, 5, 6], // 0=Dom ... 6=Sáb
    abreHora: ,
    fechaHora: ,
  },
  produtos: {
    dogs: [
      { id: 'dogs-0',  nome: 'Tubarão Tradicional',                     desc: 'Salsicha, molho, queijo mussarela, milho e batata palha',                                                              preco: 6.00  },
      { id: 'dogs-1',  nome: 'Tubarão Duplo',                           desc: '2 salsichas, molho, queijo mussarela, milho e batata palha',                                                           preco: 8.00  },
      { id: 'dogs-2',  nome: 'Tubarão Calabresa',                       desc: 'Salsicha, molho, queijo mussarela, milho, calabresa e batata palha',                                                   preco: 12.00 },
      { id: 'dogs-3',  nome: 'Tubarão Calabresa e Banana',              desc: 'Salsicha, molho, queijo mussarela, milho, calabresa, banana e batata palha',                                           preco: 14.00 },
      { id: 'dogs-4',  nome: 'Tubarão Bacon',                           desc: 'Salsicha, molho, queijo mussarela, milho, bacon e batata palha',                                                       preco: 12.00 },
      { id: 'dogs-5',  nome: 'Tubarão Bacon e Banana',                  desc: 'Salsicha, molho, queijo mussarela, milho, bacon, banana e batata palha',                                               preco: 14.00 },
      { id: 'dogs-6',  nome: 'Tubarão Calabresa, Bacon e Banana',       desc: 'Salsicha, molho, queijo mussarela, milho, calabresa, bacon, banana e batata palha',                                    preco: 15.00 },
      { id: 'dogs-7',  nome: 'Tubarão Carne Desfiada',                  desc: 'Salsicha, molho, queijo mussarela, milho, carne desfiada e batata palha',                                              preco: 12.00 },
      { id: 'dogs-8',  nome: 'Tubarão Carne Desfiada e Banana',         desc: 'Salsicha, molho, queijo mussarela, milho, carne desfiada, banana e batata palha',                                      preco: 14.00 },
      { id: 'dogs-9',  nome: 'Tubarão Carne Desfiada, Calabresa e Bacon', desc: 'Salsicha, molho, queijo mussarela, milho, carne desfiada, calabresa, bacon e batata palha',                         preco: 15.00 },
      { id: 'dogs-10', nome: 'Tubarão Blaster',    prefixo: '⚡', desc: 'Pão 20cm, 1½ salsicha, molho, mussarela, milho, bacon, calabresa, catupiry, banana e batata palha',                        preco: 18.00, destaque: true },
      { id: 'dogs-11', nome: 'Tubarão Branco',     prefixo: '⚡', desc: 'Pão 20cm, 1½ salsicha, molho, mussarela, milho, bacon, calabresa, catupiry, banana, peito de frango e batata palha',      preco: 20.00, destaque: true },
      { id: 'dogs-12', nome: 'Tubarão Megalodon',  prefixo: '🦈', desc: 'Pão 20cm, 1½ salsicha, molho, mussarela, milho, bacon, calabresa, catupiry, banana, carne desfiada e batata palha',       preco: 20.00, destaque: true },
    ],
    bebidas: [
      { id: 'beb-0',  nome: 'Coca-Cola 2L',           preco: 12.00 },
      { id: 'beb-1',  nome: 'Fanta Laranja 2L',        preco: 12.00 },
      { id: 'beb-2',  nome: 'Dydyo 2L',                preco: 8.00  },
      { id: 'beb-3',  nome: 'Coca-Cola LS 1L',         desc: 'Vidro', preco: 8.00 },
      { id: 'beb-4',  nome: 'Fanta Laranja LS 1L',     desc: 'Vidro', preco: 8.00 },
      { id: 'beb-5',  nome: 'Coca-Cola PET 1L',        preco: 8.00  },
      { id: 'beb-6',  nome: 'Fanta Laranja PET 1L',    preco: 8.00  },
      { id: 'beb-7',  nome: 'H₂O 400ml',               preco: 4.00  },
      { id: 'beb-8',  nome: 'Água Mineral S/Gás',      preco: 3.00  },
      { id: 'beb-9',  nome: 'Água Mineral C/Gás',      preco: 3.50  },
      { id: 'beb-10', nome: 'Fanta Uva Lata',          preco: 5.00  },
      { id: 'beb-11', nome: 'Sprite Lata',             preco: 5.00  },
      { id: 'beb-12', nome: 'Coca-Cola Lata',          preco: 5.00  },
      { id: 'beb-13', nome: 'Fanta Laranja Lata',      preco: 5.00  },
      { id: 'beb-14', nome: 'Coca Zero Lata',          preco: 5.00  },
      { id: 'beb-15', nome: 'Guaraná Lata',            preco: 5.00  },
      { id: 'beb-16', nome: 'Guaraná Jesus Lata',      preco: 5.00  },
      { id: 'beb-17', nome: 'Água Tônica Lata',        preco: 5.00  },
      { id: 'beb-18', nome: 'Energético',              preco: 6.00  },
    ],
    sucos: [
      { id: 'suc-0',  nome: 'Suco de Laranja 500ml',            desc: 'Natural · c/ leite R$ 14,00', preco: 12.00 },
      { id: 'suc-1',  nome: 'Suco de Maracujá 500ml',           desc: 'Natural · c/ leite R$ 14,00', preco: 12.00 },
      { id: 'suc-2',  nome: 'Suco de Goiaba 500ml',             desc: 'Natural · c/ leite R$ 10,00', preco: 8.00  },
      { id: 'suc-3',  nome: 'Suco de Cajá 500ml',               desc: 'Natural',                     preco: 8.00  },
      { id: 'suc-4',  nome: 'Suco de Cupuaçu 500ml',            desc: 'Natural · c/ leite R$ 10,00', preco: 8.00  },
      { id: 'suc-5',  nome: 'Suco de Abacaxi c/ Hortelã 500ml', desc: 'Natural',                     preco: 8.00  },
      { id: 'suc-6',  nome: 'Suco de Laranja Jarra 1L',         desc: 'Natural · c/ leite R$ 26,00', preco: 24.00, separador: '— Jarra 1L —' },
      { id: 'suc-7',  nome: 'Suco de Maracujá Jarra 1L',        desc: 'Natural · c/ leite R$ 26,00', preco: 24.00 },
      { id: 'suc-8',  nome: 'Suco de Goiaba Jarra 1L',          desc: 'Natural · c/ leite R$ 18,00', preco: 16.00 },
      { id: 'suc-9',  nome: 'Suco de Cajá Jarra 1L',            desc: 'Natural',                     preco: 16.00 },
      { id: 'suc-10', nome: 'Suco de Cupuaçu Jarra 1L',         desc: 'Natural · c/ leite R$ 18,00', preco: 16.00 },
      { id: 'suc-11', nome: 'Suco de Abacaxi c/ Hortelã Jarra 1L', desc: 'Natural',                  preco: 16.00 },
    ],
    adicionais: [
      { id: 'adic-0', nome: 'Adicional: Cheddar',  label: 'Cheddar',        preco: 3.00 },
      { id: 'adic-1', nome: 'Adicional: Catupiry', label: 'Catupiry',       preco: 3.00 },
      { id: 'adic-2', nome: 'Adicional: Salsicha', label: 'Salsicha extra', preco: 3.00 },
      { id: 'adic-3', nome: 'Adicional: Banana',   label: 'Banana',         preco: 4.00 },
    ],
  },
};


/* ============================================================
   2. INTEGRAÇÃO COM PAINEL ADMIN
   Se o dono editou via admin.html, os dados ficam salvos em
   localStorage['tubarao_admin'] e sobrescrevem LOJA aqui.
   ============================================================ */
(function aplicarDadosAdmin() {
  try {
    const salvo = localStorage.getItem('tubarao_admin');
    if (!salvo) return;
    const admin = JSON.parse(salvo);
    if (admin.produtos) {
      Object.keys(admin.produtos).forEach(cat => {
        if (LOJA.produtos[cat]) LOJA.produtos[cat] = admin.produtos[cat];
      });
    }
    if (admin.horario) Object.assign(LOJA.horario, admin.horario);
  } catch (e) {
    console.warn('[Admin] Erro ao carregar dados:', e);
  }
})();


/* ============================================================
   3. ESTADO GLOBAL
   ============================================================ */
let carrinho             = [];
let tipoPedido           = 'entrega';
let pagamentoSelecionado = '';


/* ============================================================
   4. UTILITÁRIOS
   ============================================================ */

/** Formata número como moeda: R$ 12,50 */
const precoFmt = p => `R$ ${p.toFixed(2).replace('.', ',')}`;

/** Retorna nome com prefixo (⚡ / 🦈) se existir */
const nomeFmt = p => p.prefixo ? `${p.prefixo} ${p.nome}` : p.nome;

/**
 * Retorna { hora, dia } no fuso America/Porto_Velho.
 * Função base compartilhada por lojaEstaAberta() e verificarStatus().
 */
function horaAtualPortoVelho() {
  const agora = new Date();
  const hora  = parseInt(
    new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Porto_Velho',
      hour: 'numeric', hour12: false,
    }).formatToParts(agora).find(p => p.type === 'hour').value,
    10
  );
  const diaStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Porto_Velho',
    weekday: 'short',
  }).format(agora);
  const dia = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[diaStr];
  return { hora, dia };
}


/* ============================================================
   5. CARRINHO
   ============================================================ */

const salvarCarrinho = () =>
  localStorage.setItem('tubarao_carrinho', JSON.stringify(carrinho));

function addItem(nome, preco) {
  const existente = carrinho.find(i => i.nome === nome);
  existente ? existente.qtd++ : carrinho.push({ nome, preco, qtd: 1 });

  salvarCarrinho();
  atualizarCarrinho();

  // Feedback visual: pisca amarelo claro
  const btn = document.getElementById('carrinhoBtn');
  btn.style.background = '#fff176';
  setTimeout(() => (btn.style.background = ''), 300);

  // Pulso de atenção por 4 s
  btn.classList.add('pulsar');
  clearTimeout(btn._pulsarTimer);
  btn._pulsarTimer = setTimeout(() => btn.classList.remove('pulsar'), 4000);
}

function removeItem(nome) {
  const idx = carrinho.findIndex(i => i.nome === nome);
  if (idx === -1) return;
  carrinho[idx].qtd > 1 ? carrinho[idx].qtd-- : carrinho.splice(idx, 1);
  salvarCarrinho();
  atualizarCarrinho();
  renderizarModal();
}

function atualizarCarrinho() {
  const total = carrinho.reduce((s, i) => s + i.qtd, 0);
  document.getElementById('carrinhoQtd').textContent = total;
  document.getElementById('carrinhoBtn').style.display = total > 0 ? 'flex' : 'none';
}


/* ============================================================
   6. MODAL DO CARRINHO
   ============================================================ */

function renderizarModal() {
  const body   = document.getElementById('modalBody');
  const footer = document.getElementById('modalFooter');

  if (carrinho.length === 0) {
    body.innerHTML = `
      <div class="carrinho-vazio">
        Seu carrinho está vazio 🦈<br>
        Adicione itens do cardápio!
      </div>`;
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  let html  = '';
  let total = 0;

  carrinho.forEach(item => {
    const sub = item.preco * item.qtd;
    total += sub;
    const n = item.nome.replace(/'/g, "\\'");
    html += `
      <div class="carrinho-item">
        <div class="carrinho-item-nome">${item.nome}</div>
        <div class="qtd-ctrl">
          <button onclick="removeItem('${n}')" aria-label="Remover ${item.nome}">−</button>
          <span aria-label="Quantidade: ${item.qtd}">${item.qtd}</span>
          <button onclick="addItem('${n}', ${item.preco})" aria-label="Adicionar mais ${item.nome}">+</button>
        </div>
        <div class="carrinho-item-preco">R$ ${sub.toFixed(2).replace('.', ',')}</div>
      </div>`;
  });

  body.innerHTML = html;
  document.getElementById('totalValor').textContent =
    `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function abrirCarrinho() {
  renderizarModal();
  document.getElementById('overlay').classList.add('open');
  const modal = document.getElementById('modalCarrinho');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('carrinhoBtn').style.display = 'none';
  setTimeout(() => modal.focus(), 100);
}

function fecharCarrinho() {
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('modalCarrinho').classList.remove('open');
  document.body.style.overflow = '';
  atualizarCarrinho();
}


/* ============================================================
   7. FORMULÁRIO DO PEDIDO
   ============================================================ */

function selecionarTipo(tipo, btn) {
  tipoPedido = tipo;
  document.querySelectorAll('.tipo-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('campoBairro').style.display =
    tipo === 'entrega' ? 'block' : 'none';
}

function selecionarPagamento(tipo, btn) {
  pagamentoSelecionado = tipo;
  document.querySelectorAll('.pagamento-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const campoTroco = document.getElementById('campoTroco');
  if (!campoTroco) return;
  campoTroco.style.display = tipo === 'dinheiro' ? 'block' : 'none';
  if (tipo !== 'dinheiro') document.getElementById('inputTroco').value = '';
}


/* ============================================================
   8. ENVIO VIA WHATSAPP
   ============================================================ */

function lojaEstaAberta() {
  const { hora, dia } = horaAtualPortoVelho();
  return LOJA.horario.diasAbertos.includes(dia)
    && hora >= LOJA.horario.abreHora
    && hora < LOJA.horario.fechaHora;
}

function enviarWhatsApp() {
  if (carrinho.length === 0) return;

  if (!lojaEstaAberta()) {
    alert(`⚠️ A loja está fechada no momento.\nFuncionamos de Segunda a Sábado, das ${LOJA.horario.abreHora}h às ${LOJA.horario.fechaHora}h.\n\nMonte seu pedido e envie quando abrirmos! 🦈`);
    return;
  }

  const nome = document.getElementById('inputNome')?.value?.trim() || '';
  if (!nome) {
    alert('Por favor, informe seu nome para realizarmos o pedido.');
    return;
  }

  if (tipoPedido === 'entrega') {
    const rua    = document.getElementById('inputRua')?.value?.trim()    || '';
    const bairro = document.getElementById('inputBairro')?.value?.trim() || '';
    if (!rua && !bairro) {
      alert('Por favor, preencha pelo menos a rua/avenida e o bairro para entrega.');
      return;
    }
  }

  if (!pagamentoSelecionado) {
    alert('Por favor, selecione uma forma de pagamento.');
    return;
  }

  let total = 0;
  let linhas = '';
  carrinho.forEach(item => {
    const sub = item.preco * item.qtd;
    total += sub;
    linhas += `${item.qtd}x ${item.nome} — R$ ${sub.toFixed(2).replace('.', ',')}\n`;
  });

  const tiposLabel    = { entrega: 'Entrega', retirada: 'Retirada no local', local: 'Comer no local' };
  const pagLabel      = { pix: 'Pix', dinheiro: 'Dinheiro', debito: 'Cartão Débito', credito: 'Cartão Crédito' };

  let msg = `*${LOJA.nome} - Novo Pedido*\n\n`;
  msg += `*Cliente:* ${nome}\n\n`;
  msg += linhas;
  msg += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
  msg += `\n\nTipo: ${tiposLabel[tipoPedido] || tipoPedido}`;

  if (tipoPedido === 'entrega') {
    const rua    = document.getElementById('inputRua')?.value?.trim()    || '';
    const bairro = document.getElementById('inputBairro')?.value?.trim() || '';
    const cep    = document.getElementById('inputCep')?.value?.trim()    || '';
    msg += `\nEndereço: ${[rua, bairro, cep ? 'CEP ' + cep : ''].filter(Boolean).join(', ') || '(não informado)'}`;
  }

  msg += `\n\n*Pagamento:* ${pagLabel[pagamentoSelecionado] || pagamentoSelecionado}`;

  const troco = document.getElementById('inputTroco')?.value;
  if (pagamentoSelecionado === 'dinheiro' && troco) {
    msg += ` (troco para R$ ${parseFloat(troco).toFixed(2).replace('.', ',')})`;
  }

  const obs = document.getElementById('inputObservacoes')?.value?.trim() || '';
  if (obs) msg += `\n\n*Observações:* ${obs}`;

  window.open(`https://wa.me/${LOJA.telefone}?text=${encodeURIComponent(msg)}`, '_blank');

  // Limpa carrinho após envio
  carrinho = [];
  salvarCarrinho();
  atualizarCarrinho();
  fecharCarrinho();
}


/* ============================================================
   9. STATUS ABERTO / FECHADO
   ============================================================ */

function verificarStatus() {
  const { hora, dia }              = horaAtualPortoVelho();
  const { diasAbertos, abreHora, fechaHora } = LOJA.horario;
  const diaAberto  = diasAbertos.includes(dia);
  const horaAberto = hora >= abreHora && hora < fechaHora;
  const badge      = document.getElementById('statusBadge');

  if (diaAberto && horaAberto) {
    badge.className = 'status-badge aberto';
    badge.innerHTML = '<span class="status-dot"></span>ABERTO AGORA';
    return;
  }

  const nomesDia = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  let proximoDia = '';

  if (diaAberto && hora < abreHora) {
    proximoDia = 'hoje';
  } else {
    for (let i = 1; i <= 7; i++) {
      const prox = (dia + i) % 7;
      if (diasAbertos.includes(prox)) {
        proximoDia = i === 1 ? 'amanhã' : nomesDia[prox];
        break;
      }
    }
  }

  badge.className = 'status-badge fechado';
  badge.innerHTML = `<span class="status-dot"></span>FECHADO · Abre ${proximoDia} às ${abreHora}h`;
}


/* ============================================================
   10. RENDERIZAÇÃO DO CARDÁPIO (data-driven)
   ============================================================ */

const _badgePromo = p =>
  p.promocao && p.precoPromo
    ? `<span class="badge-promo-card">🔥 De ${precoFmt(p.preco)}</span>`
    : '';

function cardDog(p) {
  if (p.inativo) return '';
  const n     = p.nome.replace(/'/g, "\\'");
  const preco = p.promocao && p.precoPromo ? p.precoPromo : p.preco;
  return `
    <div class="produto-card" id="produtoid-${p.id}"
      onclick="addItem('${n}', ${preco})"
      role="button" tabindex="0"
      aria-label="Adicionar ${nomeFmt(p)} ao carrinho — ${precoFmt(preco)}">
      <div class="produto-info">
        <div class="produto-nome">${nomeFmt(p)}${_badgePromo(p)}</div>
        ${p.desc ? `<div class="produto-desc">${p.desc}</div>` : ''}
      </div>
      <div class="produto-preco${p.destaque ? ' destaque' : ''}" aria-hidden="true">${precoFmt(preco)}</div>
      <button class="btn-add"
        onclick="event.stopPropagation(); addItem('${n}', ${preco})"
        aria-label="Adicionar ${nomeFmt(p)}">+</button>
    </div>`;
}

function cardGrid(p) {
  if (p.inativo) return '';
  const n     = p.nome.replace(/'/g, "\\'");
  const label = p.label || p.nome;
  const preco = p.promocao && p.precoPromo ? p.precoPromo : p.preco;
  return `
    <div class="produto-card" id="produtoid-${p.id}"
      onclick="addItem('${n}', ${preco})"
      role="button" tabindex="0"
      aria-label="Adicionar ${label} ao carrinho — ${precoFmt(preco)}">
      <div class="produto-nome">${label}${_badgePromo(p)}</div>
      ${p.desc ? `<div class="produto-desc">${p.desc}</div>` : ''}
      <div class="produto-preco" aria-hidden="true">${precoFmt(preco)}</div>
      <button class="btn-add"
        onclick="event.stopPropagation(); addItem('${n}', ${preco})"
        aria-label="Adicionar ${label}">+</button>
    </div>`;
}

function renderizarCardapio() {
  const set = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  set('dogs',
    `<div class="secao-titulo">🌭 HOT DOGS</div>` +
    LOJA.produtos.dogs.map(cardDog).join('')
  );

  set('bebidas',
    `<div class="secao-titulo">🥤 BEBIDAS</div>
     <div class="bebidas-grid">${LOJA.produtos.bebidas.map(cardGrid).join('')}</div>`
  );

  let htmlSucos = `<div class="secao-titulo">🍹 SUCOS NATURAIS</div>`;
  LOJA.produtos.sucos.forEach(p => {
    if (p.separador) htmlSucos += `<div class="separador-interno">${p.separador}</div>`;
    htmlSucos += cardDog(p);
  });
  set('sucos', htmlSucos);

  set('adicionais',
    `<div class="secao-titulo">➕ ADICIONAIS</div>
     <div class="bebidas-grid">${LOJA.produtos.adicionais.map(cardGrid).join('')}</div>`
  );

  renderizarMenuLateral();
}


/* ============================================================
   11. MENU LATERAL DE PRODUTOS
   ============================================================ */

function abrirMenuLateral() {
  document.getElementById('overlayMenu').classList.add('open');
  document.getElementById('menuLateral').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharMenuLateral() {
  document.getElementById('overlayMenu').classList.remove('open');
  document.getElementById('menuLateral').classList.remove('open');
  document.body.style.overflow = '';
}

function irProduto(id) {
  fecharMenuLateral();
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Destaque via CSS var — funciona em light e dark mode
    el.style.borderLeftColor = 'var(--amarelo)';
    el.style.boxShadow = '0 0 0 3px rgba(245, 216, 0, .35)';
    setTimeout(() => {
      el.style.borderLeftColor = '';
      el.style.boxShadow = '';
    }, 1200);
  }, 300);
}

function renderizarMenuLateral() {
  const body = document.querySelector('.menu-lateral-body');
  if (!body) return;

  const dogs = LOJA.produtos.dogs
    .filter(p => !p.inativo)
    .map(p => `
      <div class="menu-item${p.destaque ? ' destaque-item' : ''}"
        onclick="irProduto('produtoid-${p.id}')">
        ${nomeFmt(p)} <span>${precoFmt(p.preco)}</span>
      </div>`)
    .join('');

  const adicionais = LOJA.produtos.adicionais
    .filter(p => !p.inativo)
    .map(p => `
      <div class="menu-item" onclick="irProduto('produtoid-${p.id}')">
        ${p.label || p.nome} <span>${precoFmt(p.preco)}</span>
      </div>`)
    .join('');

  body.innerHTML = `
    <div class="menu-cat-titulo">🌭 Hot Dogs</div>
    ${dogs}
    <div class="menu-cat-titulo">🥤 Bebidas</div>
    <div class="menu-item" onclick="fecharMenuLateral(); scrollToSection('bebidas', document.querySelector('.cat-btn:nth-child(2)'))">Ver todas as bebidas →</div>
    <div class="menu-cat-titulo">🍹 Sucos Naturais</div>
    <div class="menu-item" onclick="fecharMenuLateral(); scrollToSection('sucos', document.querySelector('.cat-btn:nth-child(3)'))">Ver todos os sucos →</div>
    <div class="menu-cat-titulo">➕ Adicionais</div>
    ${adicionais}`;
}


/* ============================================================
   12. MODAL SOBRE A LOJA
   ============================================================ */

function abrirSobreLoja() {
  document.getElementById('overlayLoja').classList.add('open');
  document.getElementById('modalSobreLoja').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharSobreLoja() {
  document.getElementById('overlayLoja').classList.remove('open');
  document.getElementById('modalSobreLoja').classList.remove('open');
  document.body.style.overflow = '';
}


/* ============================================================
   13. NAVEGAÇÃO POR CATEGORIAS
   ============================================================ */

const SECOES = ['dogs', 'bebidas', 'sucos', 'adicionais'];

function scrollToSection(id, btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn?.classList.add('active');
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function iniciarObservadorScroll() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        document.querySelectorAll('.cat-btn').forEach((btn, i) => {
          btn.classList.toggle('active', SECOES[i] === id);
        });
      });
    },
    { threshold: 0.3, rootMargin: '-60px 0px 0px 0px' }
  );
  SECOES.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}


/* ============================================================
   14. INICIALIZAÇÃO
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Renderiza cardápio a partir dos dados
  renderizarCardapio();

  // Recupera carrinho salvo
  try {
    const salvo = localStorage.getItem('tubarao_carrinho');
    if (salvo) { carrinho = JSON.parse(salvo); atualizarCarrinho(); }
  } catch (e) { console.warn('[Carrinho] Erro ao recuperar:', e); }

  // Status aberto/fechado — atualiza a cada minuto
  verificarStatus();
  setInterval(verificarStatus, 60_000);

  // Observador de scroll para a nav
  iniciarObservadorScroll();

  // Suporte a teclado nos cards (Enter / Space)
  document.querySelector('main')?.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('[role="button"]');
    if (card) { e.preventDefault(); card.click(); }
  });

  // Máscara de CEP: 00000-000
  document.getElementById('inputCep')?.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
    this.value = v;
  });

  // Swipe down para fechar o modal do carrinho
  const modalCarrinho = document.getElementById('modalCarrinho');
  let touchStartY = 0;
  modalCarrinho.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  modalCarrinho.addEventListener('touchend', e => {
    if (e.changedTouches[0].clientY - touchStartY > 80) fecharCarrinho();
  }, { passive: true });

  // Botão flutuante sobe quando o teclado virtual abre
  window.visualViewport?.addEventListener('resize', () => {
    const btn    = document.getElementById('carrinhoBtn');
    const offset = window.innerHeight - window.visualViewport.height;
    btn.style.bottom = offset > 100 ? `${offset + 16}px` : '';
  });

  console.log('🦈 Tubarão Dogueria — pronto!');
});
