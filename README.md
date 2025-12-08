# Rio Innovation Week App

Aplicativo mobile React Native desenvolvido com Expo para o evento Rio Innovation Week.

## Funcionalidades

- **Home**: Tela inicial com hero section, quick access icons, invitations e recommended attendees
- **Network**: Networking com abas Meetmaking e Chat, cards de perfil
- **Agenda**: Calendário de eventos com filtros, Full Schedule e My Schedule
- **Mapa**: Mapa do evento (estrutura básica)
- **Mais**: Menu adicional (estrutura básica)

## Tecnologias

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Vector Icons

## Como executar

```bash
# Instalar dependências
npm install

# Iniciar o projeto
npm start

# Executar no iOS
npm run ios

# Executar no Android
npm run android

# Executar no Web
npm run web
```

## Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── screens/        # Telas do aplicativo
├── navigation/     # Configuração de navegação
├── services/       # Serviços e dados mockados
├── types/          # Definições TypeScript
└── theme/          # Tema (cores, tipografia)
```

## Dados Mockados

O aplicativo atualmente usa dados mockados. A estrutura está preparada para integração com API real através do arquivo `src/services/api.ts`.

