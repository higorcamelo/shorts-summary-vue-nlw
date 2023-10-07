import { ref } from 'vue';
import { server } from '../server/server.ts';

export const selectedShortText = ref<string>('Escolha um Short para resumir');

const updateLoadingText = () => {
  let loadingText = 'Obtendo informações do vídeo';
  let pontos = 0;

  return setInterval(() => {
    pontos = (pontos + 1) % 4; // Alternar entre 0, 1, 2, 3
    selectedShortText.value = `${loadingText}${'.'.repeat(pontos)}`;
  }, 500); // Atualize a cada 500 milissegundos (0,5 segundos)
};

export const parseURl = async (url: string) => {
  const tempVideoParams = url.split('https://www.youtube.com/shorts/')[1];
  const videoID = tempVideoParams.split('?')[0];

  // Iniciar mensagem de carregamento
  const loadingInterval = updateLoadingText();

  try {
    const response = await server.get(`/summary/${videoID}`);
    clearInterval(loadingInterval); // Limpar o intervalo de carregamento

    const resumo = await server.post('/summary', { text: response.data.transcricao });
    selectedShortText.value = response.data.title + '\n' + resumo.data.summary;

  } catch (error) {
    console.error(error);
    clearInterval(loadingInterval); // Limpar o intervalo de carregamento em caso de erro
    selectedShortText.value = 'Erro ao obter informações do vídeo';
  }
};
