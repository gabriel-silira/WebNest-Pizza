(() => {
  "use strict";

  const { whatsappNumber, mensagemGenerica, categorias, itens } = window.WEBNEST_DATA;
  const numero = String(whatsappNumber || "").replace(/\D/g, "");
  const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  const ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>';

  const h = (tag, cls, children = []) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    [].concat(children).forEach((c) => n.append(c));
    return n;
  };
  const txt = (tag, cls, text) => { const n = h(tag, cls); n.textContent = text; return n; };

  const foto = (item) => {
    const alt = item.alt || `Pizza ${item.nome}`;
    const box = h("div", "media");
    if (item.imagem) {
      const img = h("img");
      img.src = item.imagem; img.alt = alt; img.loading = "lazy";
      box.append(img);
    } else {
      const ph = txt("div", "ph", alt);
      ph.setAttribute("role", "img");
      ph.setAttribute("aria-label", alt);
      box.append(ph);
    }
    return box;
  };

  const botaoPedir = (item, cat) => {
    const a = h("a", "btn btn--primary btn--sm");
    a.dataset.pedido = [cat.prefixo, item.nome].filter(Boolean).join(" ");
    a.append("Pedir ", txt("span", "sr-only", item.nome));
    a.insertAdjacentHTML("beforeend", ICON_CHAT);
    return a;
  };

  const cartao = (item, cat) => h("li", "reveal", h("article", "card", [
    foto(item),
    h("div", "card__body", [
      txt("h3", "", item.nome),
      txt("p", "card__desc", item.descricao),
      h("div", "card__foot", [txt("span", "price", brl.format(item.preco)), botaoPedir(item, cat)])
    ])
  ]));

  const linha = (item, cat) => h("li", "row reveal", [
    h("div", "row__txt", [txt("p", "row__name", item.nome), txt("p", "row__desc", item.descricao)]),
    txt("span", "price", brl.format(item.preco)),
    botaoPedir(item, cat)
  ]);

  const renderDestaques = (alvo) => {
    itens.filter((i) => i.destaque).forEach((item) => {
      const cat = categorias.find((c) => c.id === item.categoria);
      alvo.append(cartao(item, cat));
    });
  };

  const renderCardapio = (alvo, navCats) => {
    categorias.forEach((cat) => {
      const lista = itens.filter((i) => i.categoria === cat.id);
      if (!lista.length) return;
      const ul = h("ul", cat.comFoto ? "grid" : "list");
      lista.forEach((item) => ul.append(cat.comFoto ? cartao(item, cat) : linha(item, cat)));
      const sec = h("section", "menu-cat", [txt("h2", "", cat.titulo), ul]);
      sec.id = cat.id;
      alvo.append(sec);
      if (navCats) {
        const a = txt("a", "chip", cat.titulo);
        a.href = `#${cat.id}`;
        navCats.append(a);
      }
    });
  };

  const aplicarWhatsApp = () => {
    document.querySelectorAll("[data-pedido]").forEach((a) => {
      const produto = a.dataset.pedido;
      const msg = produto ? `Olá! Gostaria de pedir ${produto}.` : mensagemGenerica;
      if (!numero) {
        a.removeAttribute("href");
        a.setAttribute("aria-disabled", "true");
        a.title = "Número de WhatsApp ainda não configurado";
        a.classList.add("is-disabled");
        return;
      }
      a.href = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
      a.target = "_blank";
      a.rel = "noopener";
    });
    if (!numero) console.info("WebNest: defina whatsappNumber em js/data.js para ativar os botões de pedido.");
  };

  const iniciarMenu = () => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("nav");
    if (!toggle || !nav) return;
    const definir = (aberto) => {
      nav.classList.toggle("is-open", aberto);
      toggle.setAttribute("aria-expanded", String(aberto));
      document.body.classList.toggle("no-scroll", aberto);
    };
    toggle.addEventListener("click", () => definir(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) definir(false); });
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && !toggle.contains(e.target)) definir(false);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") definir(false); });
    window.matchMedia("(min-width: 861px)").addEventListener("change", () => definir(false));
  };

  const iniciarReveal = () => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-visible")); return; }
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((e) => obs.observe(e));
    document.documentElement.classList.add("js");
  };

  const destaques = document.querySelector("[data-destaques]");
  if (destaques) renderDestaques(destaques);

  const cardapio = document.querySelector("[data-cardapio]");
  if (cardapio) renderCardapio(cardapio, document.querySelector("[data-cat-nav]"));

  aplicarWhatsApp();
  iniciarMenu();
  iniciarReveal();
})();
