import { ref } from 'vue';
import { server } from '../server/server.ts';

export const selectedShortText = ref<string>('Escolha um Short para resumir');

// Função para atualizar a mensagem de carregamento
const updateLoadingText = () => {
  let loadingText = 'Obtendo informações do vídeo e gerando o resumo, isso pode demorar um pouco';
  let pontos = 0;

  return setInterval(() => {
    pontos = (pontos + 1) % 4; // Alternar entre 0, 1, 2, 3
    selectedShortText.value = `${loadingText}${'.'.repeat(pontos)}`;
  }, 500); // Atualize a cada 500 milissegundos (0,5 segundos)
};

// Função para requisitar informações do vídeo e realizar o resumo
const requestVideoSummary = async (videoID: string) => {
  // Iniciar mensagem de carregamento
  const loadingInterval = updateLoadingText();

  try {
    const response = await server.get(`/summary/${videoID}`);
    clearInterval(loadingInterval); // Limpar o intervalo de carregamento

    const resumo = await server.post('/summary', { text: response.data.transcricao });
    // Adicione duas quebras de linha entre o título e o resumo
    selectedShortText.value = response.data.title + '\n\n' + resumo.data.summary;

  } catch (error) {
    console.error(error);
    clearInterval(loadingInterval); // Limpar o intervalo de carregamento em caso de erro
    selectedShortText.value = 'Erro ao obter informações do vídeo';
  }
};

// Função para analisar a URL e lidar com as requisições
export const parseURL = async (url: string) => {
  const tempVideoParams = url.split('https://www.youtube.com/shorts/')[1];
  const videoID = tempVideoParams.split('?')[0];

  // Realizar a requisição de informações do vídeo e resumo
  requestVideoSummary(videoID);
};
