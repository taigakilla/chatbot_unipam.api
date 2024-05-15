const axios = require("axios");
const { SessionsClient } = require("@google-cloud/dialogflow");
const { v4: uuidv4 } = require("uuid");

// Configurações do Dialogflow
const projectId = "seu-id-do-projeto";
const languageCode = "pt-BR"; // ou qualquer outro idioma que deseje
const credentialsPath = "D:\\ChatBot\\chatbotAPI\\google-credentials.json"; // Substitua pelo caminho real para o arquivo de credenciais

const sessionClient = new SessionsClient({ keyFilename: credentialsPath });
const sessionPath = sessionClient.projectAgentSessionPath(
  projectId,
  generateSessionId()
);

// Função para gerar sessionId dinâmico usando um UUID
function generateSessionId() {
  return uuidv4();
}

// Função para enviar solicitações para o Dialogflow
async function sendQueryToDialogflow(userInput) {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userInput,
        languageCode: languageCode,
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return result;
  } catch (err) {
    console.error("Erro ao processar a solicitação:", err);
    throw err;
  }
}

// Exemplo de uso
async function main() {
  const userInput = "Olá, como posso te ajudar?";
  try {
    const dialogflowResponse = await sendQueryToDialogflow(userInput);
    console.log("Resposta do Dialogflow:", dialogflowResponse);
  } catch (error) {
    console.error("Erro ao enviar consulta para o Dialogflow:", error);
  }
}

// Executar o exemplo
main();
