# Shorts Summary

O Shorts Summary é um projeto que permite resumir os vídeos do YouTube Shorts de forma rápida e eficiente. Esta versão aprimorada é baseada na Next Level Week de Inteligência Artificial da Rocketseat, com melhorias e acréscimos notáveis.

## Funcionamento

O Shorts Summary originalmente opera em uma pilha de tecnologias que inclui Node.js, Express, ytdl-core, FFmpeg, node-wav e Xenova Transformers. A principal funcionalidade do sistema pode ser dividida nas seguintes etapas:

1. **Download do Vídeo**: O sistema utiliza o módulo `ytdl-core` para baixar o vídeo do YouTube. O vídeo é, então, convertido para o formato necessário.

2. **Conversão de Vídeo para Áudio**: O arquivo de vídeo é convertido em um arquivo de áudio WAV para processamento subsequente. A conversão é realizada com o auxílio do `FFmpeg` e `node-wav`.

3. **Transcrição de Áudio**: O áudio é transcrita em texto com o auxílio da biblioteca Xenova Transformers. A transcrição é realizada com base no modelo de reconhecimento de fala selecionado.

4. **Geração de Resumo**: Utilizando um modelo de sumarização de texto, também fornecido pela Xenova Transformers, o sistema gera um resumo do texto transcrito.

5. **Exibição do Resultado**: O título do vídeo do YouTube e o resumo gerado são exibidos na interface do usuário para que o usuário possa acessá-los.

## Tecnologias Utilizadas

Este projeto faz uso das seguintes tecnologias:

- [Node.js](https://nodejs.org/): Plataforma de tempo de execução JavaScript.
- [Express](https://expressjs.com/): Framework web para Node.js.
- [Vite](https://vitejs.dev/): Build tool e desenvolvimento rápido para aplicações web.
- [Vue.js](https://vuejs.org/): Framework JavaScript para construção de interfaces de usuário.
- [Vuetify](https://vuetifyjs.com/): Framework de componentes para Vue.js com design Material Design.
- [ytdl-core](https://github.com/fent/node-ytdl-core): Módulo para download de vídeos do YouTube.
- [FFmpeg](https://www.ffmpeg.org/): Conjunto de software para lidar com áudio, vídeo e outros tipos de conteúdo multimídia.
- [node-wav](https://github.com/audiocogs/node-wav): Módulo para trabalhar com arquivos de áudio WAV em Node.js.
- [Xenova Transformers](https://xenova.ai/transformers): Biblioteca de modelos de IA para tarefas de processamento de linguagem natural.

## Melhorias e Alterações

Em comparação à versão original do projeto, esta versão aprimorada inclui as seguintes melhorias e alterações:

- Adoção do framework Vue.js 3 para construção da interface de usuário.
- Utilização do Vuetify 3 para um design Material Design elegante.
- Substituição do JavaScript por TypeScript para uma codificação mais robusta e segura.
- Organização de pastas aprimorada para melhor gerenciamento do código.
- Ajustes de responsividade para melhor adaptação a diferentes dispositivos.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.
