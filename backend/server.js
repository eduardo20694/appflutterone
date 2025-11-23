// Backend básico para o app Flutter
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); 

const app = express();
const port = 3000;
const baseUrl = 'https://web-production-9f31b.up.railway.app'; // url do backend hospedado

app.use(bodyParser.json());
app.use(cors());

// Rota para receber mensagens e enviar respostas da IA
app.post('/api/message', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'A mensagem é obrigatória.' });
    }

    try {
        // Exemplo de integração com uma API de IA externa
        const aiResponse = await axios.post('https://api.exemplo-ia.com/responder', {
            input: message,
        });

        const response = aiResponse.data.response || 'Desculpe, não consegui entender.';
        res.json({ response });
    } catch (error) {
        console.error('Erro ao se comunicar com a API de IA:', error.message);
        res.status(500).json({ error: 'Erro ao processar a mensagem.' });
    }
});

app.post('/pergunta', (req, res) => {
    const { pergunta } = req.body;

    if (!pergunta) {
        return res.status(400).json({ error: 'A pergunta é obrigatória.' });
    }

    // Simulação de resposta baseada na pergunta
    const respostas = {
        "Qual é o seu nome?": "Meu nome é Eduardo Rodrigues Sparremberger.",
        "Quantos anos você tem?": "Eu tenho 23 anos.",
        "Onde você mora?": "Eu moro em Itati."
    };

    const resposta = respostas[pergunta] || "Desculpe, não consegui encontrar uma resposta para sua pergunta.";
    res.json({ resposta });
});

// Atualizando instruções para refletir a nova URL
app.get('/', (req, res) => {
    res.json({
        "mensagem": "Bem-vindo à API de Perguntas e Respostas!",
        "instrucoes": "Use o endpoint POST /pergunta para enviar perguntas no formato JSON.",
        "exemplo": {
            "url": `${baseUrl}/pergunta`,
            "formato": {"pergunta": "sua pergunta aqui"}
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});