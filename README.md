<div align="center">

# 🏛️ Campus TOTVS Protheus

### *A Plataforma Interativa Web para Desenvolvedores ADVPL, TLPP e Ecossistema TOTVS Protheus*

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-VS_Code_Core-1E1E1E?style=for-the-badge&logo=visual-studio-code&logoColor=007ACC)](https://microsoft.github.io/monaco-editor/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

**[🌐 Acessar Demonstração Online](https://campus-totvs.vercel.app)** • **[📑 Documentação TDN](https://tdn.totvs.com/)** • **[💼 LinkedIn](https://www.linkedin.com/in/carloska24)**

</div>

---

## 📌 Sobre o Projeto

O **Campus TOTVS** é uma solução *Single Page Application* (SPA) de alto desempenho projetada para acelerar a curva de aprendizado, padronização e domínio técnico de desenvolvedores no ecossistema **TOTVS Protheus (ADVPL & TLPP)**.

Desenvolvido para unir a robustez das diretrizes oficiais da **TOTVS** (TDN, Engenharia Backoffice Protheus e regras estritas do SonarQube/TOTVS CodeAnalysis) à modernidade de uma IDE Web interativa de última geração com simulação de compilação, validação sintática e avaliador automatizado de exercícios práticos.

---

## ✨ Principais Funcionalidades

### 💻 1. Laboratório ADVPL & Compilador Virtual
- **Editor Monaco Integrado**: Base do VS Code no navegador, equipado com syntax highlighting personalizado, palavras-chave e funções do ADVPL e TLPP (`User Function`, `RecLock`, `TCQuery`, `DbSelectArea`, etc.).
- **Simulador de Terminal/Console**: Execução instantânea *client-side* com suporte a `ConOut`, tratamento de blocos protegidos (`Begin Sequence / Recover`), monitoramento de memória e pilha de chamadas.
- **Validador de Boas Práticas (CodeAnalysis)**: Alertas em tempo real sobre declarações incorretas de variáveis (`Local` no topo obrigatório), proibições de `SELECT *`, uso de `RetSqlName` e controle de locks com `MsUnlock`.

### 🎯 2. Desafios Práticos com Avaliador Automatizado (Grader Modal)
- Banco progressivo de desafios estruturados por nível de proficiência.
- Validação algorítmica de critérios de aceite e boas práticas de engenharia de software com feedback visual detalhado e pontuação de XP gamificada.

### 📚 3. Masterclass ADVPL & TLPP
- **Trilhas Estruturadas**:
  - **Fundamentos ADVPL**: Sintaxe, operadores, manipulação de arrays e blocos de código.
  - **Dicionário & Banco**: Interação com TopConnect, queries otimizadas, manipulação ISAM com `DbSeek` / `RecLock`.
  - **Arquitetura MVC Protheus**: Separação clara de `ModelDef`, `ViewDef` e `MenuDef`.
  - **Modern TLPP**: Classes, herança, métodos, anotações de API REST e tipagem estática.
- **Leitor de Aulas e Código Executável**: Carregue snippets diretamente das aulas para o editor com um clique.

### 🔍 4. Explorador do Dicionário de Dados TOTVS (SX)
- Consulta instantânea e visual das tabelas de infraestrutura e governança do Protheus:
  - `SX1` (Perguntas / Pergunte)
  - `SX2` (Cabeçalho de Tabelas e Pastas)
  - `SX3` (Campos e Dicionário de Atributos)
  - `SX6` (Parâmetros Globais do Sistema)
  - `SIX` (Índices e Ordens de Busca)
- Busca rápida por palavras-chave com exibição de schemas, validações (`X3_VALID`) e gatilhos.

### 💼 5. Trilha de Carreira & Calculadora de Senioridade
- Matriz de competências técnicas com checklist de habilidades fundamentais, intermediárias e avançadas.
- Calculadora interativa de senioridade para mapeamento de evolução profissional no mercado de ERP TOTVS.

---

## 🛠 Tecnologias Utilizadas

| Camada | Tecnologia | Finalidade |
| :--- | :--- | :--- |
| **Interface & Core** | ![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB) | Arquitetura reativa, componentes modulares e hooks |
| **Tipagem Estática** | ![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=flat-square&logo=typescript&logoColor=white) | Robustez, interfaces estritas e segurança em tempo de compilação |
| **Build & Dev Tool** | ![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white) | Hot Module Replacement (HMR) ultrarrápido e bundling otimizado |
| **Estilização** | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Design system moderno, responsivo e Dark Theme nativo |
| **Editor de Código** | ![Monaco](https://img.shields.io/badge/Monaco_Editor-1E1E1E?style=flat-square&logo=visual-studio-code&logoColor=007ACC) | Editor web com tokens ADVPL, code lens e formatação |
| **Gerenciamento de Estado**| ![Zustand](https://img.shields.io/badge/Zustand-443e38?style=flat-square&logo=react&logoColor=white) | Gerenciamento de estado global leve e previsível com persistência |
| **Ícones & Design** | ![Phosphor Icons](https://img.shields.io/badge/Phosphor_Icons-2C2C2C?style=flat-square) | Iconografia técnica minimalista e consistente |
| **Deploy & Hosting** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) | Hospedagem em Edge Network com CI/CD contínuo |

---

## 📐 Conformidade com Diretrizes Oficiais TOTVS

Este projeto foi construído respeitando as melhores práticas de governança técnica da TOTVS:
- ✅ **Declaração de Variáveis**: Respeito estrito à ordem de escopo `Local` no topo das funções (SonarQube Blocker compliance).
- ✅ **Manipulação de Dicionário**: Padrão de leitura dinâmica via `RetSqlName()` e cláusula obrigatória `D_E_L_E_T_ = ' '`.
- ✅ **Controle Transacional**: Encapsulamento correto com `RecLock()` e `MsUnlock()`.
- ✅ **Padrão ProtheusDoc**: Estrutura oficial de comentários e documentação de fontes ADVPL/TLPP.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- Gerenciador de pacotes `npm` ou `yarn`

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/carloska24/Campus_TOTVS.git
   cd Campus_TOTVS
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

5. **Para gerar o build de produção:**
   ```bash
   npm run build
   ```

---

## 🤝 Conecte-se Comigo!

Desenvolvido com dedicação para a comunidade TOTVS e entusiastas de engenharia de software e ERP.

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/carloska24)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/carloska24)
[![Portfolio](https://img.shields.io/badge/Portfólio-4B0082?style=for-the-badge&logo=About.me&logoColor=white)](https://github.com/carloska24)

*Fique à vontade para abrir uma issue, enviar pull requests ou me mandar uma mensagem para trocarmos ideias sobre desenvolvimento e oportunidades!*

</div>

---

<div align="center">
  <sub>Campus TOTVS • Projeto Open Source com fins educacionais e de capacitação técnica.</sub>
</div>
