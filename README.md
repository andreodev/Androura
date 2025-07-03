# Androura 🐓

Bem-vindo ao **Androura**, um aplicativo para gestão de granjas, desenvolvido com [Expo](https://expo.dev/) e React Native.

## 📱 Sobre o Projeto

O Androura foi criado para facilitar o controle diário de registros de produção, mortalidade, alimentação e outras informações essenciais para granjas avícolas. Com ele, você pode:

- Registrar dados diários de produção de ovos, aves mortas, eliminadas e consumo de ração.
- Visualizar resumos mensais e diários dos registros.
- Gerenciar informações do lote e do proprietário.
- Filtrar registros por mês e ano.
- Adicionar e remover fotos da fazenda.
- Interface amigável, responsiva e com feedback háptico.

## 🚀 Como começar

1. **Instale as dependências:**

   ```sh
   npm install
   ```

2. **Inicie o app:**

   ```sh
   npx expo start
   ```

   Siga as instruções para abrir no emulador Android/iOS ou no navegador.

## 🗂 Estrutura do Projeto

- `app/` — Telas e componentes principais da aplicação.
- `components/` — Componentes reutilizáveis.
- `hooks/` — Hooks customizados para lógica de dados e temas.
- `services/` — Integração com API (axios).
- `src/context/` — Contextos globais (ex: Lote).
- `types/` — Tipos TypeScript para dados da aplicação.
- `assets/` — Imagens e fontes.

## ⚙️ Funcionalidades

- **Splash Screen personalizada**
- **Navegação por abas** (Início, Perfil, Registro Diário)
- **Cadastro de registros diários**
- **Resumo mensal dos dados**
- **Exclusão de registros**
- **Perfil do proprietário/lote**
- **Persistência de foto da fazenda**
- **Feedback visual e háptico**
- **Filtro por mês/ano**

## 🛠 Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Router](https://expo.github.io/router/)
- [Lucide Icons](https://lucide.dev/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)

## 📦 Scripts Úteis

- `npm run start` — Inicia o app.
- `npm run reset-project` — Reseta o projeto para o estado inicial.

## 👨‍🌾 Contribuição

Sinta-se à vontade para abrir issues ou pull requests para melhorias!

---

Desenvolvido com carinho para facilitar a vida no campo. 🌾
