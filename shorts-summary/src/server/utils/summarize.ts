import { pipeline } from "@xenova/transformers";

// Função para resumir uma transcrição
export async function summarize(transcricao: string) {
  try {
    // Início do processo de resumo
    console.log("Iniciando o processo de resumo...");

    // Cria um gerador de resumo com o modelo especificado
    const generator = await pipeline(
      "summarization",
      "Xenova/distilbart-cnn-12-6"
    );

    // Gera o resumo a partir da transcrição
    const output = await generator(transcricao);

    // Fim do processo de resumo
    console.log("Processo de resumo concluído com sucesso!");

    // Retorna o texto do resumo
    return output[0].summary_text;
  } catch (error) {
    // Em caso de erro, registra o erro e lança uma exceção
    console.error("Erro ao realizar o resumo:", error);
    throw new Error("Erro ao resumir a transcrição");
  }
}
