window.WEBNEST_DATA = {
  whatsappNumber: "",

  mensagemGenerica: "Olá! Gostaria de fazer um pedido na WebNest Pizza.",

  categorias: [
    { id: "salgadas", titulo: "Pizzas salgadas", prefixo: "a pizza", comFoto: true },
    { id: "doces", titulo: "Pizzas doces", prefixo: "a pizza", comFoto: true },
    { id: "bebidas", titulo: "Bebidas", prefixo: "", comFoto: false },
    { id: "sobremesas", titulo: "Sobremesas", prefixo: "", comFoto: false }
  ],

  itens: [
    { categoria: "salgadas", nome: "Calabresa", descricao: "Molho de tomate, mussarela, calabresa fatiada e cebola.", preco: 49.9, imagem: "assets/images/pizza-calabresa.png", destaque: true },
    { categoria: "salgadas", nome: "Pepperoni", descricao: "Molho de tomate, mussarela e pepperoni.", preco: 54.9, imagem: "assets/images/pizza-pepperoni.png", destaque: true },
    { categoria: "salgadas", nome: "Margherita", descricao: "Molho de tomate, mussarela, tomate fresco e manjericão.", preco: 47.9, imagem: "assets/images/pizza-margherita.png", destaque: false },
    { categoria: "salgadas", nome: "Quatro Queijos", descricao: "Mussarela, provolone, gorgonzola e parmesão.", preco: 56.9, imagem: "assets/images/pizza-quatroqueijos.png", destaque: false },

    { categoria: "doces", nome: "Brigadeiro", descricao: "Creme de chocolate com granulado.", preco: 44.9, imagem: "assets/images/pizza-brigadeiro.png", destaque: true },
    { categoria: "doces", nome: "Banana com canela", descricao: "Mussarela, banana, açúcar e canela.", preco: 42.9, imagem: "assets/images/pizza-banana.png", destaque: true },
    { categoria: "doces", nome: "Romeu e Julieta", descricao: "Mussarela e goiabada.", preco: 43.9, imagem: "assets/images/pizza-romeu.png", destaque: false },
    { categoria: "doces", nome: "Chocolate com morango", descricao: "Chocolate ao leite e morangos.", preco: 46.9, imagem: "assets/images/pizza-chocomorango.png", destaque: false },

    { categoria: "bebidas", nome: "Refrigerante lata", descricao: "350 ml.", preco: 6.5, imagem: "" },
    { categoria: "bebidas", nome: "Suco natural", descricao: "Laranja ou limão, 400 ml.", preco: 9.0, imagem: "" },
    { categoria: "bebidas", nome: "Água mineral", descricao: "500 ml, com ou sem gás.", preco: 4.0, imagem: "" },

    { categoria: "sobremesas", nome: "Brownie", descricao: "Brownie de chocolate individual.", preco: 14.0, imagem: "" },
    { categoria: "sobremesas", nome: "Pudim", descricao: "Fatia de pudim de leite.", preco: 12.0, imagem: "" }
  ]
};
