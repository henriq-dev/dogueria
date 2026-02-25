/* ============================================================
   TUBARÃO DOGUERIA — app.js
   Lógica principal do cardápio digital

   ÍNDICE:
   1. Dados da Loja (configurações centralizadas)
   2. Estado do Carrinho
   3. Funções do Carrinho (adicionar, remover, atualizar)
   4. Renderização do Modal
   5. Abertura e Fechamento do Modal
   6. Envio do Pedido via WhatsApp
   7. Status Aberto / Fechado
   8. Navegação por Categorias (scroll + ativo)
   9. Inicialização
   ============================================================ */


/* ============================================================
   1. DADOS DA LOJA
   Configurações centralizadas da loja.
   Para mudar telefone, horário ou nome, altere aqui.
   ============================================================ */
const LOJA = {
  nome: 'Tubarão Dogueria',
  telefone: '5569993009408',
  horario: {
    diasAbertos: [1, 2, 3, 4, 5, 6],
    abreHora: 11,
    fechaHora: 22,
  },
  produtos: {
    dogs: [
      { id: 'dogs-0', nome: 'Tubarão Tradicional', desc: 'Salsicha, molho, queijo mussarela, milho e batata palha', preco: 6.00 },
      { id: 'dogs-1', nome: 'Tubarão Duplo', desc: '2 salsichas, molho, queijo mussarela, milho e batata palha', preco: 8.00 },
      { id: 'dogs-2', nome: 'Tubarão Calabresa', desc: 'Salsicha, molho, queijo mussarela, milho, calabresa e batata palha', preco: 12.00 },
      { id: 'dogs-3', nome: 'Tubarão Calabresa e Banana', desc: 'Salsicha, molho, queijo mussarela, milho, calabresa, banana e batata palha', preco: 14.00 },
      { id: 'dogs-4', nome: 'Tubarão Bacon', desc: 'Salsicha, molho, queijo mussarela, milho, bacon e batata palha', preco: 12.00 },
      { id: 'dogs-5', nome: 'Tubarão Bacon e Banana', desc: 'Salsicha, molho, queijo mussarela, milho, bacon, banana e batata palha', preco: 14.00 },
      { id: 'dogs-6', nome: 'Tubarão Calabresa, Bacon e Banana', desc: 'Salsicha, molho, queijo mussarela, milho, calabresa, bacon, banana e batata palha', preco: 15.00 },
      { id: 'dogs-7', nome: 'Tubarão Carne Desfiada', desc: 'Salsicha, molho, queijo mussarela, milho, carne desfiada e batata palha', preco: 12.00 },
      { id: 'dogs-8', nome: 'Tubarão Carne Desfiada e Banana', desc: 'Salsicha, molho, queijo mussarela, milho, carne desfiada, banana e batata palha', preco: 14.00 },
      { id: 'dogs-9', nome: 'Tubarão Carne Desfiada, Calabresa e Bacon', desc: 'Salsicha, molho, queijo mussarela, milho, carne desfiada, calabresa, bacon e batata palha', preco: 15.00 },
      { id: 'dogs-10', nome: 'Tubarão Blaster', prefixo: '⚡', desc: 'Pão 20cm, 1½ salsicha, molho, mussarela, milho, bacon, calabresa, catupiry, banana e batata palha', preco: 18.00, destaque: true },
      { id: 'dogs-11', nome: 'Tubarão Branco', prefixo: '⚡', desc: 'Pão 20cm, 1½ salsicha, molho, mussarela, milho, bacon, calabresa, catupiry, banana, peito de frango e batata palha', preco: 20.00, destaque: true },
      { id: 'dogs-12', nome: 'Tubarão Megalodon', prefixo: '🦈', desc: 'Pão 20cm, 1½ salsicha, molho, mussarela, milho, bacon, calabresa, catupiry, banana, carne desfiada e batata palha', preco: 20.00, destaque: true },
    ],
    bebidas: [
      { id: 'beb-0',  nome: 'Coca-Cola 2L', preco: 12.00 },
      { id: 'beb-1',  nome: 'Fanta Laranja 2L', preco: 12.00 },
      { id: 'beb-2',  nome: 'Dydyo 2L', preco: 8.00 },
      { id: 'beb-3',  nome: 'Coca-Cola LS 1L', desc: 'Vidro', preco: 8.00 },
      { id: 'beb-4',  nome: 'Fanta Laranja LS 1L', desc: 'Vidro', preco: 8.00 },
      { id: 'beb-5',  nome: 'Coca-Cola PET 1L', preco: 8.00 },
      { id: 'beb-6',  nome: 'Fanta Laranja PET 1L', preco: 8.00 },
      { id: 'beb-7',  nome: 'H₂O 400ml', preco: 4.00 },
      { id: 'beb-8',  nome: 'Água Mineral S/Gás', preco: 3.00 },
      { id: 'beb-9',  nome: 'Água Mineral C/Gás', preco: 3.50 },
      { id: 'beb-10', nome: 'Fanta Uva Lata', preco: 5.00 },
      { id: 'beb-11', nome: 'Sprite Lata', preco: 5.00 },
      { id: 'beb-12', nome: 'Coca-Cola Lata', preco: 5.00 },
      { id: 'beb-13', nome: 'Fanta Laranja Lata', preco: 5.00 },
      { id: 'beb-14', nome: 'Coca Zero Lata', preco: 5.00 },
      { id: 'beb-15', nome: 'Guaraná Lata', preco: 5.00 },
      { id: 'beb-16', nome: 'Guaraná Jesus Lata', preco: 5.00 },
      { id: 'beb-17', nome: 'Água Tônica Lata', preco: 5.00 },
      { id: 'beb-18', nome: 'Energético', preco: 6.00 },
    ],
    sucos: [
      { id: 'suc-0',  nome: 'Suco de Laranja 500ml', desc: 'Natural · c/ leite R$ 14,00', preco: 12.00 },
      { id: 'suc-1',  nome: 'Suco de Maracujá 500ml', desc: 'Natural · c/ leite R$ 14,00', preco: 12.00 },
      { id: 'suc-2',  nome: 'Suco de Goiaba 500ml', desc: 'Natural · c/ leite R$ 10,00', preco: 8.00 },
      { id: 'suc-3',  nome: 'Suco de Cajá 500ml', desc: 'Natural', preco: 8.00 },
      { id: 'suc-4',  nome: 'Suco de Cupuaçu 500ml', desc: 'Natural · c/ leite R$ 10,00', preco: 8.00 },
      { id: 'suc-5',  nome: 'Suco de Abacaxi c/ Hortelã 500ml', desc: 'Natural', preco: 8.00 },
      { id: 'suc-6',  nome: 'Suco de Laranja Jarra 1L', desc: 'Natural · c/ leite R$ 26,00', preco: 24.00, separador: '— Jarra 1L —' },
      { id: 'suc-7',  nome: 'Suco de Maracujá Jarra 1L', desc: 'Natural · c/ leite R$ 26,00', preco: 24.00 },
      { id: 'suc-8',  nome: 'Suco de Goiaba Jarra 1L', desc: 'Natural · c/ leite R$ 18,00', preco: 16.00 },
      { id: 'suc-9',  nome: 'Suco de Cajá Jarra 1L', desc: 'Natural', preco: 16.00 },
      { id: 'suc-10', nome: 'Suco de Cupuaçu Jarra 1L', desc: 'Natural · c/ leite R$ 18,00', preco: 16.00 },
      { id: 'suc-11', nome: 'Suco de Abacaxi c/ Hortelã Jarra 1L', desc: 'Natural', preco: 16.00 },
    ],
    adicionais: [
      { id: 'adic-0', nome: 'Adicional: Cheddar', label: 'Cheddar', preco: 3.00 },
      { id: 'adic-1', nome: 'Adicional: Catupiry', label: 'Catupiry', preco: 3.00 },
      { id: 'adic-2', nome: 'Adicional: Salsicha', label: 'Salsicha extra', preco: 3.00 },
      { id: 'adic-3', nome: 'Adicional: Banana', label: 'Banana', preco: 4.00 },
    ],
  }
};


/* ============================================================
   2. ESTADO DO CARRINHO
   Array que guarda todos os itens adicionados.
   Cada item é um objeto: { nome, preco, qtd }
   ============================================================ */
let carrinho = [];

/**
 * Grava o estado atual do carrinho no localStorage.
 * Chamada sempre que o array carrinho é modificado.
 */
function salvarCarrinho() {
  localStorage.setItem('tubarao_carrinho', JSON.stringify(carrinho));
}


/* ============================================================
   3. FUNÇÕES DO CARRINHO

   addItem(nome, preco)
     - Adiciona item ao carrinho.
     - Se já existir, incrementa a quantidade.
     - Dá feedback visual no botão flutuante.

   removeItem(nome)
     - Decrementa a quantidade do item.
     - Remove do array se quantidade chegar a zero.
     - Atualiza o modal após a remoção.

   atualizarCarrinho()
     - Recalcula a quantidade total.
     - Mostra ou esconde o botão flutuante.
     - Atualiza o badge com o número de itens.
   ============================================================ */

/**
 * Adiciona um item ao carrinho ou incrementa sua quantidade.
 * @param {string} nome  - Nome do produto
 * @param {number} preco - Preço unitário em reais
 */
function addItem(nome, preco) {
  const existente = carrinho.find(item => item.nome === nome);

  if (existente) {
    existente.qtd++;
  } else {
    carrinho.push({ nome, preco, qtd: 1 });
  }

  atualizarCarrinho();
  salvarCarrinho();

  // Feedback visual: pisca o botão e inicia pulso de atenção
  const btn = document.getElementById('carrinhoBtn');
  btn.style.background = '#fff176';
  setTimeout(() => btn.style.background = 'var(--amarelo)', 300);

  // Pulso de atenção por 4 segundos
  btn.classList.add('pulsar');
  clearTimeout(btn._pulsarTimer);
  btn._pulsarTimer = setTimeout(() => btn.classList.remove('pulsar'), 4000);
}

/**
 * Remove uma unidade de um item do carrinho.
 * Se quantidade chegar a 0, remove o item completamente.
 * @param {string} nome - Nome do produto a decrementar
 */
function removeItem(nome) {
  const idx = carrinho.findIndex(item => item.nome === nome);

  if (idx > -1) {
    if (carrinho[idx].qtd > 1) {
      carrinho[idx].qtd--;
    } else {
      carrinho.splice(idx, 1);   // Remove o item da lista
    }
  }

  atualizarCarrinho();
  salvarCarrinho();
  renderizarModal();
}

/**
 * Atualiza o badge e visibilidade do botão flutuante do carrinho.
 */
function atualizarCarrinho() {
  const totalItens = carrinho.reduce((soma, item) => soma + item.qtd, 0);
  const btn = document.getElementById('carrinhoBtn');
  const badge = document.getElementById('carrinhoQtd');

  badge.textContent = totalItens;
  btn.style.display = totalItens > 0 ? 'flex' : 'none';
}


/* ============================================================
   4. RENDERIZAÇÃO DO MODAL
   Gera o HTML dos itens do carrinho dinamicamente.
   Chamada sempre que o modal é aberto ou o carrinho muda.
   ============================================================ */

/**
 * Renderiza a lista de itens do carrinho no modal.
 * Exibe mensagem de vazio se não houver itens.
 */
function renderizarModal() {
  const body = document.getElementById('modalBody');
  const footer = document.getElementById('modalFooter');

  // Carrinho vazio: mostra mensagem e esconde o footer
  if (carrinho.length === 0) {
    body.innerHTML = `
      <div class="carrinho-vazio">
        Seu carrinho está vazio 🦈<br>
        Adicione itens do cardápio!
      </div>`;
    footer.style.display = 'none';
    return;
  }

  // Carrinho com itens: gera HTML e calcula total
  footer.style.display = 'block';

  let html = '';
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.qtd;
    total += subtotal;

    // Escapa aspas simples no nome para uso seguro dentro do onclick
    const nomeEscapado = item.nome.replace(/'/g, "\\'");

    html += `
      <div class="carrinho-item">
        <div class="carrinho-item-nome">${item.nome}</div>

        <!-- Controle de quantidade: decrementar / exibir / incrementar -->
        <div class="qtd-ctrl">
          <button onclick="removeItem('${nomeEscapado}')" aria-label="Remover ${item.nome}">−</button>
          <span aria-label="Quantidade: ${item.qtd}">${item.qtd}</span>
          <button onclick="addItem('${nomeEscapado}', ${item.preco})" aria-label="Adicionar mais ${item.nome}">+</button>
        </div>

        <div class="carrinho-item-preco">
          R$ ${subtotal.toFixed(2).replace('.', ',')}
        </div>
      </div>`;
  });

  body.innerHTML = html;

  // Atualiza o total exibido no footer
  document.getElementById('totalValor').textContent =
    `R$ ${total.toFixed(2).replace('.', ',')}`;
}


/* ============================================================
   5. ABERTURA E FECHAMENTO DO MODAL
   Controla a animação do bottom sheet e o bloqueio de scroll.
   ============================================================ */

/**
 * Abre o modal do carrinho (bottom sheet).
 * Renderiza os itens atuais antes de exibir.
 */
function abrirCarrinho() {
  renderizarModal();
  document.getElementById('overlay').classList.add('open');
  const modal = document.getElementById('modalCarrinho');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('carrinhoBtn').style.display = 'none';
  // Foco no modal para leitores de tela
  setTimeout(() => modal.focus(), 100);
}

/**
 * Fecha o modal do carrinho e libera o scroll da página.
 */
function fecharCarrinho() {
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('modalCarrinho').classList.remove('open');
  document.body.style.overflow = '';
  atualizarCarrinho(); // Restaura botão flutuante se houver itens
}


/* ============================================================
   6. ENVIO DO PEDIDO VIA WHATSAPP
   Monta uma mensagem formatada com todos os itens e total,
   e abre o WhatsApp da loja com a mensagem pré-preenchida.
   ============================================================ */

/**
 * Retorna true se a loja estiver aberta agora (fuso Porto Velho).
 */
function lojaEstaAberta() {
  const agora = new Date();

  const partes = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Porto_Velho',
    hour: 'numeric',
    hour12: false
  }).formatToParts(agora);
  const hora = parseInt(partes.find(p => p.type === 'hour').value, 10);

  const diaStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Porto_Velho',
    weekday: 'short'
  }).format(agora);
  const mapasDia = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const dia = mapasDia[diaStr];

  return LOJA.horario.diasAbertos.includes(dia) &&
         hora >= LOJA.horario.abreHora &&
         hora < LOJA.horario.fechaHora;
}

/**
 * Gera a mensagem do pedido e abre o WhatsApp.
 */
function enviarWhatsApp() {
  if (carrinho.length === 0) return;

  // Bloqueia o envio se a loja estiver fechada
  if (!lojaEstaAberta()) {
    alert('⚠️ A loja está fechada no momento.\nFuncionamos de Segunda a Sábado, das 18h às 23h.\n\nMonte seu pedido e envie quando abrirmos! 🦈');
    return;
  }

  // Valida nome do cliente (obrigatório)
  const nomeClienteValidar = document.getElementById('inputNome')?.value?.trim() || '';
  if (!nomeClienteValidar) {
    alert('Por favor, informe seu nome para realizarmos o pedido.');
    return;
  }

  // Valida endereço se for entrega
  if (tipoPedido === 'entrega') {
    const rua = document.getElementById('inputRua')?.value?.trim() || '';
    const bairro = document.getElementById('inputBairro')?.value?.trim() || '';
    if (!rua && !bairro) {
      alert('Por favor, preencha pelo menos a rua/avenida e o bairro para entrega.');
      return;
    }
  }

  // Valida pagamento
  if (!pagamentoSelecionado) {
    alert('Por favor, selecione uma forma de pagamento.');
    return;
  }

  let mensagem = `*${LOJA.nome} - Novo Pedido*\n\n`;

  // Nome do cliente
  const nomeCliente = document.getElementById('inputNome')?.value?.trim() || '';
  if (nomeCliente) mensagem += `👤 *Cliente:* ${nomeCliente}\n\n`;

  let total = 0;

  carrinho.forEach(item => {
    const sub = item.preco * item.qtd;
    total += sub;
    mensagem += `- ${item.qtd}x ${item.nome} - R$ ${sub.toFixed(2).replace('.', ',')}\n`;
  });

  mensagem += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;

  const tipos = { entrega: 'Entrega', retirada: 'Retirada no local', local: 'Comer no local' };
  mensagem += `\n\nTipo: ${tipos[tipoPedido] || 'Entrega'}`;

  if (tipoPedido === 'entrega') {
    const rua = document.getElementById('inputRua')?.value?.trim() || '';
    const bairro = document.getElementById('inputBairro')?.value?.trim() || '';
    const cep = document.getElementById('inputCep')?.value?.trim() || '';
    const partes = [rua, bairro, cep ? 'CEP ' + cep : ''].filter(Boolean);
    mensagem += `\nEndereço: ${partes.join(', ') || '(não informado)'}`;
  }

  const labelsPag = { pix: 'Pix', dinheiro: 'Dinheiro', debito: 'Cartão Débito', credito: 'Cartão Crédito' };
  mensagem += `\n\n💳 Pagamento: ${labelsPag[pagamentoSelecionado] || pagamentoSelecionado}`;

  if (pagamentoSelecionado === 'dinheiro') {
    const troco = document.getElementById('inputTroco')?.value;
    if (troco) mensagem += ` (troco para R$ ${parseFloat(troco).toFixed(2).replace('.', ',')})`;
  }

  const obs = document.getElementById('inputObservacoes')?.value?.trim() || '';
  if (obs) mensagem += `\n\n📝 *Observações:* ${obs}`;

  const url = `https://wa.me/${LOJA.telefone}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');

  // Limpa o carrinho após envio bem-sucedido
  carrinho = [];
  salvarCarrinho();
  atualizarCarrinho();
  fecharCarrinho();
}


/* ============================================================
   7. STATUS ABERTO / FECHADO
   Verifica o horário atual e atualiza o badge no header.
   Roda na inicialização e a cada minuto.
   ============================================================ */

/**
 * Verifica se a loja está aberta com base no horário configurado.
 * Atualiza o badge #statusBadge com o estado atual.
 */
function verificarStatus() {
  const agora = new Date();

  const partes = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Porto_Velho',
    hour: 'numeric',
    hour12: false
  }).formatToParts(agora);
  const hora = parseInt(partes.find(p => p.type === 'hour').value, 10);

  const diaStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Porto_Velho',
    weekday: 'short'
  }).format(agora);
  const mapasDia = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const dia = mapasDia[diaStr];

  const badge = document.getElementById('statusBadge');
  const diaAberto = LOJA.horario.diasAbertos.includes(dia);
  const horaAberto = hora >= LOJA.horario.abreHora && hora < LOJA.horario.fechaHora;
  const aberto = diaAberto && horaAberto;

  if (aberto) {
    badge.className = 'status-badge aberto';
    badge.innerHTML = '<span class="status-dot"></span>ABERTO AGORA';
    return;
  }

  const nomesDia = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  let proximoDia = '';

  if (diaAberto && hora < LOJA.horario.abreHora) {
    proximoDia = 'hoje';
  } else {
    for (let i = 1; i <= 7; i++) {
      const proximoDiaNum = (dia + i) % 7;
      if (LOJA.horario.diasAbertos.includes(proximoDiaNum)) {
        proximoDia = i === 1 ? 'amanhã' : nomesDia[proximoDiaNum];
        break;
      }
    }
  }

  badge.className = 'status-badge fechado';
  badge.innerHTML = `<span class="status-dot"></span>FECHADO · Abre ${proximoDia} às ${LOJA.horario.abreHora}h`;
}


/* ============================================================
   8. NAVEGAÇÃO POR CATEGORIAS

   scrollToSection(id, btn)
     - Rola suavemente até a seção clicada.
     - Marca o botão clicado como "active".

   IntersectionObserver
     - Detecta qual seção está visível na tela durante o scroll.
     - Atualiza automaticamente o botão ativo na nav.
   ============================================================ */

// IDs das seções na ordem em que aparecem no HTML
const SECOES = ['dogs', 'bebidas', 'sucos', 'adicionais'];

/**
 * Rola a página até a seção e ativa o botão correspondente.
 * @param {string} id  - ID da seção destino
 * @param {Element} btn - Botão clicado na nav
 */
function scrollToSection(id, btn) {
  // Remove active de todos os botões
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Rola suavemente até a seção
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Observa quais seções entram na viewport durante o scroll
 * e atualiza o botão ativo automaticamente.
 */
function iniciarObservadorScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          // Ativa o botão correspondente à seção visível
          document.querySelectorAll('.cat-btn').forEach((btn, i) => {
            btn.classList.toggle('active', SECOES[i] === id);
          });
        }
      });
    },
    {
      threshold: 0.3,                      // 30% da seção visível para ativar
      rootMargin: '-60px 0px 0px 0px'      // Compensa o header fixo
    }
  );

  // Observa cada seção do cardápio
  SECOES.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}


/* ============================================================
   RENDERIZAÇÃO DO CARDÁPIO A PARTIR DOS DADOS (data-driven)
   Gera o HTML dos produtos dinamicamente a partir de LOJA.produtos.
   Para mudar preço, nome ou descrição: edite apenas o array acima.
   ============================================================ */

function precoFmt(p) {
  return `R$ ${p.toFixed(2).replace('.', ',')}`;
}

function nomeFmt(p) {
  return p.prefixo ? `${p.prefixo} ${p.nome}` : p.nome;
}

function cardDog(p) {
  const n = p.nome.replace(/'/g, "\\'");
  return `
    <div class="produto-card" id="produtoid-${p.id}" onclick="addItem('${n}', ${p.preco})" role="button" tabindex="0" aria-label="Adicionar ${nomeFmt(p)} ao carrinho — ${precoFmt(p.preco)}">
      <div class="produto-info">
        <div class="produto-nome">${nomeFmt(p)}</div>
        ${p.desc ? `<div class="produto-desc">${p.desc}</div>` : ''}
      </div>
      <div class="produto-preco${p.destaque ? ' destaque' : ''}" aria-hidden="true">${precoFmt(p.preco)}</div>
      <button class="btn-add" onclick="event.stopPropagation(); addItem('${n}', ${p.preco})" aria-label="Adicionar ${nomeFmt(p)}">+</button>
    </div>`;
}

function cardGrid(p) {
  const n = p.nome.replace(/'/g, "\\'");
  const label = p.label || p.nome;
  return `
    <div class="produto-card" id="produtoid-${p.id}" onclick="addItem('${n}', ${p.preco})" role="button" tabindex="0" aria-label="Adicionar ${label} ao carrinho — ${precoFmt(p.preco)}">
      <div class="produto-nome">${label}</div>
      ${p.desc ? `<div class="produto-desc">${p.desc}</div>` : ''}
      <div class="produto-preco" aria-hidden="true">${precoFmt(p.preco)}</div>
      <button class="btn-add" onclick="event.stopPropagation(); addItem('${n}', ${p.preco})" aria-label="Adicionar ${label}">+</button>
    </div>`;
}

function renderizarCardapio() {
  // Dogs
  const secDogs = document.getElementById('dogs');
  if (secDogs) {
    secDogs.innerHTML = `<div class="secao-titulo">🌭 HOT DOGS</div>` +
      LOJA.produtos.dogs.map(cardDog).join('');
  }

  // Bebidas
  const secBebidas = document.getElementById('bebidas');
  if (secBebidas) {
    secBebidas.innerHTML = `<div class="secao-titulo">🥤 BEBIDAS</div>
      <div class="bebidas-grid">${LOJA.produtos.bebidas.map(cardGrid).join('')}</div>`;
  }

  // Sucos
  const secSucos = document.getElementById('sucos');
  if (secSucos) {
    let html = `<div class="secao-titulo">🍹 SUCOS NATURAIS</div>`;
    LOJA.produtos.sucos.forEach(p => {
      if (p.separador) html += `<div class="separador-interno">${p.separador}</div>`;
      html += cardDog(p);
    });
    secSucos.innerHTML = html;
  }

  // Adicionais
  const secAdic = document.getElementById('adicionais');
  if (secAdic) {
    secAdic.innerHTML = `<div class="secao-titulo">➕ ADICIONAIS</div>
      <div class="bebidas-grid">${LOJA.produtos.adicionais.map(cardGrid).join('')}</div>`;
  }

  // Menu lateral — atualiza também
  renderizarMenuLateral();
}

function renderizarMenuLateral() {
  const body = document.querySelector('.menu-lateral-body');
  if (!body) return;

  const dogs = LOJA.produtos.dogs.map(p =>
    `<div class="menu-item${p.destaque ? ' destaque-item' : ''}" onclick="irProduto('produtoid-${p.id}')">${nomeFmt(p)} <span>${precoFmt(p.preco)}</span></div>`
  ).join('');

  const adicionais = LOJA.produtos.adicionais.map(p =>
    `<div class="menu-item" onclick="irProduto('produtoid-${p.id}')">${p.label || p.nome} <span>${precoFmt(p.preco)}</span></div>`
  ).join('');

  body.innerHTML = `
    <div class="menu-cat-titulo">🌭 Hot Dogs</div>
    ${dogs}
    <div class="menu-cat-titulo">🥤 Bebidas</div>
    <div class="menu-item" onclick="fecharMenuLateral(); scrollToSection('bebidas', document.querySelector('.cat-btn:nth-child(2)'))">Ver todas as bebidas →</div>
    <div class="menu-cat-titulo">🍹 Sucos Naturais</div>
    <div class="menu-item" onclick="fecharMenuLateral(); scrollToSection('sucos', document.querySelector('.cat-btn:nth-child(3)'))">Ver todos os sucos →</div>
    <div class="menu-cat-titulo">➕ Adicionais</div>
    ${adicionais}
  `;
}


/* ============================================================
   9. INICIALIZAÇÃO
   Executado quando o DOM estiver totalmente carregado.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Renderiza o cardápio a partir dos dados centralizados
  renderizarCardapio();

  // Recupera o carrinho salvo no localStorage (se existir)
  const carrinhoSalvo = localStorage.getItem('tubarao_carrinho');
  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
    atualizarCarrinho();
  }

  // Verifica o status da loja (aberto/fechado)
  verificarStatus();

  // Verifica novamente a cada minuto (60.000ms)
  setInterval(verificarStatus, 60_000);

  // Ativa o observador de scroll para a nav de categorias
  iniciarObservadorScroll();

  // Suporte a teclado nos cards de produto (Enter/Space = adicionar ao carrinho)
  document.querySelector('main').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('[role="button"]');
      if (card) {
        e.preventDefault();
        card.click();
      }
    }
  });

  console.log('🦈 Tubarão Dogueria — cardápio iniciado!');

  // Máscara automática para CEP: 00000-000
  const cepInput = document.getElementById('inputCep');
  if (cepInput) {
    cepInput.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').slice(0, 8);
      if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
      this.value = v;
    });
  }

  // ── FASE 2 Item 6: Swipe down para fechar modal do carrinho ──
  const modal = document.getElementById('modalCarrinho');
  let touchStartY = 0;

  modal.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  modal.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientY - touchStartY;
    if (diff > 80) fecharCarrinho(); // Swipe down de 80px fecha o modal
  }, { passive: true });

  // ── FASE 2 Item 6: Botão do carrinho sobe quando teclado abre ──
  // Detecta redução da viewport (teclado virtual) e reposiciona o botão
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      const btn = document.getElementById('carrinhoBtn');
      if (!btn) return;
      const offset = window.innerHeight - window.visualViewport.height;
      btn.style.bottom = offset > 100
        ? `${offset + 16}px`  // Teclado aberto: sobe o botão
        : '24px';             // Teclado fechado: posição original
    });
  }
});


/* ============================================================
   NOVAS FUNCIONALIDADES

   - Tipo de pedido (entrega / retirada / local)
   - Modal Sobre a Loja
   - Menu lateral de produtos
   ============================================================ */

// Tipo de pedido selecionado (padrão: entrega)
let tipoPedido = 'entrega';

// Forma de pagamento selecionada
let pagamentoSelecionado = '';

/* Seleciona o tipo de pedido e mostra/esconde o campo de endereço */
function selecionarTipo(tipo, btn) {
  tipoPedido = tipo;
  document.querySelectorAll('.tipo-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('campoBairro').style.display = tipo === 'entrega' ? 'block' : 'none';
}

/* Seleciona forma de pagamento e mostra campo de troco se dinheiro */
function selecionarPagamento(tipo, btn) {
  pagamentoSelecionado = tipo;
  document.querySelectorAll('.pagamento-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const campoTroco = document.getElementById('campoTroco');
  if (campoTroco) {
    campoTroco.style.display = tipo === 'dinheiro' ? 'block' : 'none';
    if (tipo !== 'dinheiro') {
      const inputTroco = document.getElementById('inputTroco');
      if (inputTroco) inputTroco.value = '';
    }
  }
}

/* --- Modal Sobre a Loja --- */
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

/* --- Menu lateral de produtos --- */
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

/* Navega até o produto pelo ID e fecha o menu */
function irProduto(id) {
  fecharMenuLateral();
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Destaca o card brevemente
      el.style.borderLeftColor = 'var(--amarelo)';
      el.style.background = '#fffde7';
      setTimeout(() => {
        el.style.borderLeftColor = '';
        el.style.background = '';
      }, 1200);
    }
  }, 300);
}