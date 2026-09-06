/**
 * Campus TOTVS - Virtual WebApp / SmartClient Simulator
 * Executa simulações visuais realistas do Protheus
 */
class ProtheusSimulator {
  constructor() {
    this.modalEl = document.getElementById('protheusModal');
    this.titleEl = document.getElementById('modalTitle');
    this.msgEl = document.getElementById('modalMessage');
    this.btnOk = document.getElementById('modalBtnOk');
    this.btnClose = document.getElementById('modalBtnClose');

    this.initEvents();
  }

  initEvents() {
    if (this.btnOk) {
      this.btnOk.addEventListener('click', () => this.close());
    }
    if (this.btnClose) {
      this.btnClose.addEventListener('click', () => this.close());
    }
    if (this.modalEl) {
      this.modalEl.addEventListener('click', (e) => {
        if (e.target === this.modalEl) {
          this.close();
        }
      });
    }
  }

  runSimulation(lessonId, customCode = null) {
    let title = "TOTVS Protheus - Execução";
    let message = "";

    if (lessonId === "aula01") {
      title = "Nivel 1 - Aula 01: Variaveis e Tipos de Dados";
      message = "=== DADOS DO COLABORADOR ===\n\n" +
                "Nome: Joao Silva\n" +
                "Salario: R$ 4.500,75\n" +
                "Data de Admissao: " + new Date().toLocaleDateString('pt-BR') + "\n" +
                "Status Ativo: SIM\n\n" +
                "--- Cursos Matriculados (3) ---\n" +
                "1. ADVPL Basico\n" +
                "2. MVC Avancado\n" +
                "3. APIs REST em TLPP";
    } else if (lessonId === "aula02") {
      title = "Nivel 1 - Aula 02: Estruturas Condicionais";
      message = "Avaliacao do Aluno no Modulo ADVPL:\n" +
                "Nota Obtida: 8.5\n" +
                "Resultado: Aprovado com Excelencia\n" +
                "Classificacao: Nivel Prata (Pleno)";
    } else if (lessonId === "aula03") {
      title = "Nivel 1 - Aula 03: Matrizes e Manipulacao de Strings";
      message = "=== PEDIDO DE VENDAS - LISTA DE ITENS ===\n\n" +
                "CODIGO   | DESCRICAO                  | QTD | VLR TOTAL\n" +
                "--------------------------------------------------------------\n" +
                "PRD001   | Teclado Mecanico Rgb Pro   | 002 |     500.00\n" +
                "PRD002   | Mouse Sem Fio Ergonomico   | 003 |     361.50\n" +
                "PRD003   | Monitor Ultrawide 29 Pol   | 001 |   1,450.00\n" +
                "PRD004   | Headset Gamer Surround     | 002 |     640.00\n" +
                "--------------------------------------------------------------\n" +
                "TOTAL GERAL DO PEDIDO: R$ 2,951.50\n" +
                "QUANTIDADE DE ITENS  : 4 PRODUTOS";
    } else if (lessonId === "aula04") {
      title = "Nivel 1 - Aula 04: Codeblocks e Algoritmos de Matriz";
      message = "=== AULA 04: BLOCOS DE CODIGO, aSort E aScan ===\n\n" +
                "--- PRODUTOS ORDENADOS POR VALOR (MAIOR P/ MENOR) ---\n" +
                "CODIGO   | DESCRICAO                | CATEGORIA     | PRECO\n" +
                "----------------------------------------------------------------\n" +
                "PRD003   | Monitor Gamer 144Hz      | Informatica   | 1.450,00\n" +
                "PRD002   | Cadeira Ergonomica Mesh  | Escritorio    |   890,00\n" +
                "PRD001   | Teclado Mecanico RGB Pro | Perifericos   |   320,00\n" +
                "PRD004   | Mouse Sem Fio 16000 DPI  | Perifericos   |   190,50\n" +
                "PRD005   | Hub USB-C 7 em 1 Alum    | Acessorios    |   150,00\n\n" +
                "--- BUSCA EM MEMORIA COM aScan(bBloco) ---\n" +
                "Produto 'PRD001' encontrado na Linha: 3\n" +
                "Descricao : Teclado Mecanico RGB Pro\n" +
                "Categoria : Perifericos\n" +
                "Valor     : R$ 320,00";
    } else if (lessonId === "aula05") {
      title = "Aula 05 - Calculadora Comercial Interativa";
      message = "[ JANELA MODAL MSDIALOG ATIVA ]\n\n" +
                "Valor da Venda (R$)    : [  1.500,00 ]\n" +
                "Desconto Comercial (%) : [     10,00 ]\n" +
                "------------------------------------------\n" +
                "Total Líquido a Pagar  : R$ 1.350,00\n\n" +
                "Ações Disponíveis:\n" +
                " [ Botão: Calcular ]  -> Atualiza Total via SetText()\n" +
                " [ Botão: Fechar ]    -> Encerra via oDlg:End()";
    } else {
      title = "Execução de Fonte Customizado";
      message = "Parabéns! O arquivo de fonte foi compilado e executado com sucesso no ambiente virtual Protheus.\n\n" +
                "Programa: " + (lessonId || "Custom.prw") + "\n" +
                "Data/Hora: " + new Date().toLocaleString('pt-BR');
    }

    this.show(title, message);
  }

  show(title, message) {
    if (this.titleEl) this.titleEl.innerText = title;
    if (this.msgEl) this.msgEl.innerText = message;
    if (this.modalEl) this.modalEl.classList.add('active');
  }

  close() {
    if (this.modalEl) this.modalEl.classList.remove('active');
  }
}

window.ProtheusSimulator = ProtheusSimulator;
