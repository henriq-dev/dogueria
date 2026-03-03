executar teste basico <a href="#">click no link</a>

# 🦈 Tubarão Dogueria — Cardápio Digital

Cardápio digital progressivo (PWA) da **Tubarão Dogueria**, desenvolvido para funcionar em celular, tablet e desktop. Os clientes montam o pedido direto no navegador e enviam via WhatsApp com um toque.

---

## ✨ Funcionalidades

- **Cardápio data-driven** — produtos definidos em `app.js`, renderizados dinamicamente no HTML
- **Carrinho persistente** — salvo em `localStorage`, sobrevive ao fechar e reabrir o browser
- **Envio via WhatsApp** — mensagem formatada com itens, total, endereço e forma de pagamento
- **Status em tempo real** — badge ABERTO / FECHADO calculado no fuso America/Porto_Velho
- **Painel admin embutido** — dono edita preços, ativa promoções e desativa produtos sem tocar no código (salvo em `localStorage`)
- **Badge de promoção** — destaque visual automático quando produto tem preço promocional ativo
- **PWA instalável** — manifest + service worker com cache offline
- **Dark mode automático** — segue a preferência do sistema operacional
- **Acessibilidade** — navegação por teclado, `aria-label` em todos os controles interativos, `:focus-visible`
- **Swipe para fechar** — arrastar o modal do carrinho para baixo o fecha (mobile)

---

## 🗂️ Estrutura do projeto

```
tubarao-dogueria/
├── index.html            # Shell da aplicação
├── manifest.json         # Configuração PWA
├── service-worker.js     # Cache offline
├── estilo/
│   └── estilo.css        # Todo o CSS (variáveis, dark mode, responsivo)
├── js/
│   └── app.js            # Dados do cardápio + toda a lógica
├── img/
│   ├── logozap.jpeg      # Logo da loja
│   └── favicon/
│       └── favi3.png     # Ícone PWA
└── fonts/
    └── Very Popular.ttf  # Fonte Germania One local
```

---

## 🚀 Como usar

Não há dependências, build ou servidor necessário. Basta abrir o `index.html` em qualquer navegador moderno ou subir os arquivos em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel, etc.).

```bash
# Clonar
git clone https://github.com/seu-usuario/tubarao-dogueria.git

# Abrir direto no browser
open index.html
```

---

## ⚙️ Painel Administrativo

Acesse `admin.html` no navegador para editar o cardápio sem mexer no código:

- Alterar nome e preço dos produtos
- Ativar promoções com preço diferenciado
- Desativar itens temporariamente (sem deletar)
- Alterar horário de funcionamento

As alterações ficam salvas localmente no dispositivo do administrador via `localStorage`.

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 semântico | Estrutura da página |
| CSS3 com Custom Properties | Tema, dark mode, responsivo |
| JavaScript ES2020 (vanilla) | Lógica do carrinho e cardápio |
| Web App Manifest | Instalação como PWA |
| Service Worker (Cache API) | Funcionamento offline |
| Intl.DateTimeFormat | Fuso horário correto (Porto Velho/RO) |
| localStorage | Persistência do carrinho e dados admin |
| WhatsApp API (`wa.me`) | Envio do pedido |

---

## 📱 Compatibilidade

Testado e funcional em:

- Chrome/Android 90+
- Safari/iOS 14+
- Firefox 88+
- Edge 90+

---

## 📍 Informações da loja

**Tubarão Dogueria**  
R. dos Andrades, 10049 – Bairro Mariana, Porto Velho/RO  
Segunda a Sábado: 18h às 23h  
WhatsApp: (69) 99300-9408

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
