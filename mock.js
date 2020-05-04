// @ts-check
const trimLines = (multilineText) =>
  multilineText
    .split("\n")
    .map((t) => t.trim())
    .join("\n");

const removeAcents = (text) => {
  const acents = {
    a: /[áàãâ]/gi,
    e: /[éèẽê]/gi,
    i: /[íìĩî]/gi,
    o: /[óòõô]/gi,
    u: /[úùũû]/gi,
    c: /[ç]/gi,
  };
  return Object.keys(acents).reduce(
    (str, letter) => str.replace(acents[letter], letter),
    text
  );
};

const Command = (index, prefix, execute) => ({
  index,
  prefix,
  execute,
});
const commands = [
  Command(0, "ajuda", function (ctx, message) {
    console.log({ ctx, message });
    return trimLines(`
      Ok. Possuo a capacidade de te ajudar em:
        1. **planejar**: Planejar seus sonhos.
        2. **valor fixo**: Cadastrar valor fixo.
        3. **valor pago**: Cadastrar gasto.
        4. **valor recebido**: Cadastrar ganho.
        5. **valor parcelado**: Cadastrar parcelas.
        6. **visualizar saldo**: Exibe o saldo.
        7. **relatório de gastos**: Exibe um gráfico mostrando os gastos mensais.
        8. **encontrar banco**: Mostra as características dos nossos bancos parceiros que melhor podem satisfazer suas necessidades.
        9. **fórum**: Entrar no fórum de discussões sobre finanças.
    `);
  }),
  Command(1, "planejar", function (ctx, message) {
    console.log({ ctx, message });

  }),
  Command(2, "valor fixo", function (ctx, message) {
    console.log({ ctx, message });
    return Templates.fixValue;
  }),
  Command(3, "valor pago", function (ctx, message) {
    console.log({ ctx, message });
  }),
  Command(4, "valor recebido", function (ctx, message) {
    console.log({ ctx, message });
  }),
  Command(5, "valor parcelado", function (ctx, message) {
    console.log({ ctx, message });
  }),
  Command(6, "visualizar saldo", function (ctx, message) {
    console.log({ ctx, message });
  }),
  Command(7, "relatorio de gastos", function (ctx, message) {
    console.log({ ctx, message });
  }),
  Command(8, "encontrar banco", function (ctx, message) {
    console.log({ ctx, message });
  }),
  Command(9, "forum", function (ctx, message) {
    console.log({ ctx, message });
  }),
];

const chatbot = (ctx, message) => {
  message = message.trim();
  const msg = removeAcents(message.toLowerCase());

  for (const cmd of commands) {
    if (msg.startsWith(cmd.prefix)) {
      return cmd.execute(ctx, message);
    }
  }

  return "Me desculpa, mas não consegui enteder o que você pediu. Pode repetir?";
};

const MockCommand = (msg, ctx = {}) => ({ msg, ctx });

const messages = [
  MockCommand("blah"),
  MockCommand("ajuda"),
  MockCommand("planejar"),
  MockCommand("valor fixo 600 aluguel"),
  MockCommand("valor pago 8 sorvete"),
  MockCommand("valor recebido 250 venda do celular"),
  MockCommand("visualizar saldo"),
  MockCommand("valor parcelado"),
  MockCommand("relatorio de gastos"),
  MockCommand("encontrar banco"),
  MockCommand("forum"),
];

messages.forEach((cmd) => {
  console.log(chatbot(cmd.ctx, cmd.msg));
});

// Contextualizar o caminho
// Definir o problema em uma frase
// ...
// Proposta
// ...
// Benefícios para a sociedade
