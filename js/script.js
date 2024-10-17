// Seleção de elementos no DOM
const generatePasswordButton = document.querySelector("#generate-password"); // Botão para gerar a senha
const generatedPasswordElement = document.querySelector("#generated-password h4"); // Local onde a senha será exibida
const copyPasswordButton = document.querySelector("#copy-password"); // Botão para copiar a senha gerada
const openGeneratePassword = document.querySelector("#open-generate-password"); // Texto que exibe as opções de gerar senha
const generateOptions = document.querySelector("#generate-options"); // Div que contém as opções de geração de senha
const lengthInput = document.querySelector("#length"); // Input para definir o comprimento da senha
const lettersCheckbox = document.querySelector("#letters"); // Checkbox para incluir letras
const numbersCheckbox = document.querySelector("#numbers"); // Checkbox para incluir números
const symbolsCheckbox = document.querySelector("#symbols"); // Checkbox para incluir símbolos

// Função para gerar uma letra minúscula aleatória
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Letras de 'a' a 'z'
};

// Função para gerar uma letra maiúscula aleatória
const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Letras de 'A' a 'Z'
};

// Função para gerar um número aleatório
const getNumber = () => {
  return Math.floor(Math.random() * 10).toString(); // Números de '0' a '9'
};

// Função para gerar um símbolo aleatório
const getSymbol = () => {
  const symbols = "!@#$%^&*()_+~`|}{[]:"; // Conjunto de símbolos possíveis
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// Função para gerar a senha com base nas opções selecionadas
const generatePassword = () => {
  // Obtém os valores das opções de geração
  const length = parseInt(lengthInput.value); // Comprimento da senha
  const includeLetters = lettersCheckbox.checked; // Incluir letras
  const includeNumbers = numbersCheckbox.checked; // Incluir números
  const includeSymbols = symbolsCheckbox.checked; // Incluir símbolos

  let password = ""; // Variável onde a senha será construída
  const generators = []; // Lista de funções geradoras de caracteres

  // Adiciona as funções de geração à lista de acordo com as opções selecionadas
  if (includeLetters) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }
  if (includeNumbers) {
    generators.push(getNumber);
  }
  if (includeSymbols) {
    generators.push(getSymbol);
  }

  // Se nenhum checkbox for marcado, retorna uma string vazia
  if (generators.length === 0) return '';

  // Gera a senha com o comprimento especificado
  for (let i = 0; i < length; i++) {
    const randomFunction = generators[Math.floor(Math.random() * generators.length)]; // Escolhe uma função aleatória
    password += randomFunction(); // Adiciona o resultado da função à senha
  }

  return password; // Retorna a senha gerada
};

// Evento para abrir/fechar as opções de gerar senha
openGeneratePassword.addEventListener("click", () => {
  generateOptions.classList.toggle("hide"); // Alterna a classe 'hide' para mostrar ou ocultar a div de opções
});

// Evento que é disparado quando o botão de gerar senha é clicado
generatePasswordButton.addEventListener("click", () => {
  const password = generatePassword(); // Gera a senha
  generatedPasswordElement.textContent = password; // Exibe a senha na página
  document.querySelector("#generated-password").classList.remove("hide"); // Mostra a div com a senha gerada
});

// Evento para copiar a senha gerada para a área de transferência
copyPasswordButton.addEventListener("click", () => {
  const textarea = document.createElement("textarea"); // Cria um elemento de textarea temporário
  const password = generatedPasswordElement.textContent; // Obtém a senha gerada

  // Se não houver senha, interrompe a execução
  if (!password) return;

  // Configura o valor do textarea com a senha e seleciona o conteúdo
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy"); // Copia a senha para a área de transferência
  textarea.remove(); // Remove o textarea temporário
  alert("Senha copiada para a área de transferência!"); // Exibe um alerta informando que a senha foi copiada
});
