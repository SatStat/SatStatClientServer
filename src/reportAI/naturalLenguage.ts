// Importa os módulos 'OpenAIApi, Configuration' e 'dotenv'
const { Configuration, OpenAIApi } = require("openai");
const textPrompts = require('./textPrompts');
require('dotenv').config();

// Classe para lidar com a geração de relatórios com linguagem natural
class NaturalLenguage extends textPrompts {

    // Instância estática da classe NaturalLenguage
    private static instance: NaturalLenguage;

    // Atributos da classe NaturalLenguage
    private static configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    private static openai = new OpenAIApi(NaturalLenguage.configuration);

    // Construtor privado para evitar instanciação (single-ton)
    private constructor() {
        super();
     }

    // Método para retornar a instância da classe NaturalLenguage
    public static getInstance(): NaturalLenguage {
        if (!NaturalLenguage.instance) {
            NaturalLenguage.instance = new NaturalLenguage();
        }
        return NaturalLenguage.instance;
    }

    // Instruções de geração
    private static change_05_short = {
        text: "Reescreva, mude algumas palavras, resuma, palavras mais simples, entusiasmo, contexto mais entendível, nós somos \"ViaSat\"",
    }

    // TODO: Mais opções de instrução de alteração de texto 

    // Método para realizar a solicitação a API do OpenAI
    private async getResponse(prompt: string, inst: string): Promise<string> {
        const response = await NaturalLenguage.openai.createEdit({
            model: "text-davinci-edit-001",
            input: prompt,
            instruction: inst,
            temperature: 0.5,
            top_p: 1,
        });
        return response.data.choices[0].text.replace(/\n/g, "");
    }

    // Método para gerar relatórios de instabilidade de rede
    public async getInstabilityReport(): Promise<string> {
        return await this.getResponse(this.instabilidade.text, this.change_05_short.text);
    }
}
