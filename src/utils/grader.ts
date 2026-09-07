import type { ILesson, IGradeResult, ICriterion } from '../types/lesson';

export function gradeLessonChallenge(
  lesson: ILesson,
  code: string,
  isRunSuccess = false,
  outMsg = ""
): IGradeResult {
  const lessonId = lesson.id;
  const criteria: ICriterion[] = [];

  // Sanitiza comentários para evitar falsos positivos
  const cleanCode = code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*/g, "");

  switch (lessonId) {
    case "aula01": {
      const hasCargoVar = /Local\s+.*cCargo\b/i.test(cleanCode);
      criteria.push({
        id: 0,
        title: "Declarar a variável Local cCargo no topo da função",
        pass: hasCargoVar,
        tip: hasCargoVar 
          ? "Variável cCargo declarada no topo seguindo a regra Blocker da TOTVS." 
          : "Declare no início da User Function: Local cCargo := 'Desenvolvedor ADVPL Pleno'."
      });

      const hasPadL = /PadL\s*\(\s*cCargo\s*,\s*30\s*\)/i.test(cleanCode);
      criteria.push({
        id: 1,
        title: "Formatar o cargo com PadL(cCargo, 30)",
        pass: hasPadL,
        tip: hasPadL 
          ? "Função PadL aplicada perfeitamente com 30 caracteres." 
          : "Utilize PadL(cCargo, 30) para alinhar o texto com 30 posições preenchidas."
      });

      const hasConcatResumo = hasCargoVar && /cResumo\s*\+=\s*.*cCargo/i.test(cleanCode);
      criteria.push({
        id: 2,
        title: "Concatenar a linha de cargo na variável cResumo",
        pass: hasConcatResumo,
        tip: hasConcatResumo 
          ? "Linha de cargo concatenada no relatório com sucesso!" 
          : "Adicione ao cResumo: cResumo += 'Cargo: ' + PadL(cCargo, 30) + CRLF."
      });

      const hasOutA1 = isRunSuccess && hasCargoVar && /Cargo:/i.test(outMsg);
      criteria.push({
        id: 3,
        title: "Executar no Protheus Virtual e validar a exibição do cargo",
        pass: hasOutA1,
        tip: hasOutA1 
          ? "Execução validada com excelência na janela ApMsgInfo simulada!" 
          : "Clique em 'Executar no Protheus Virtual' para verificar se a linha 'Cargo:' aparece na tela."
      });
      break;
    }

    case "aula02": {
      const hasRegrasMatriz = /aRegras\s*:=\s*\{/i.test(cleanCode) && /\{.*(?:90|70|60).*Master.*ADVPL.*\}/i.test(cleanCode);
      criteria.push({
        id: 0,
        title: "Criar a matriz de decisão aRegras com notas e títulos",
        pass: hasRegrasMatriz,
        tip: hasRegrasMatriz 
          ? "Matriz aRegras criada com múltiplos níveis de aprovação." 
          : "Crie a matriz: aRegras := {{90, 'Master'}, {70, 'Aprovado'}, {60, 'Recuperacao'}}."
      });

      const hasForRegras = /For\s+\w+\s*:=\s*1\s+To\s+Len\s*\(\s*aRegras\s*\)/i.test(cleanCode) && /aRegras\[\w+\]\[1\]/i.test(cleanCode);
      criteria.push({
        id: 1,
        title: "Percorrer as regras usando laço For...Next indexado",
        pass: hasForRegras,
        tip: hasForRegras 
          ? "Laço For...Next dinâmico implementado com acesso bidimensional aRegras[nI][1]." 
          : "Itere com For nI := 1 To Len(aRegras) avaliando a nota de cada faixa."
      });

      const hasDecisaoDinamica = hasForRegras && /If\s+.*nMedia\s*>=.*aRegras/i.test(cleanCode);
      criteria.push({
        id: 2,
        title: "Substituir Ifs aninhados por validação dinâmica na matriz",
        pass: hasDecisaoDinamica,
        tip: hasDecisaoDinamica 
          ? "Código limpo e escalável! Nenhuma estrutura de If repetitivo." 
          : "Dentro do loop, valide: If nMedia >= aRegras[nI][1] e atribua o status correspondente."
      });

      const hasOutA2 = isRunSuccess && hasRegrasMatriz && hasForRegras && /(?:Master ADVPL|Top Performance|Honra)/i.test(outMsg);
      criteria.push({
        id: 3,
        title: "Executar no Protheus Virtual e validar o cálculo dinâmico",
        pass: hasOutA2,
        tip: hasOutA2 
          ? "Painel executado com sucesso e lógica dinâmica validada!" 
          : "Execute o código com a matriz aRegras implementada no Protheus Virtual para validar."
      });
      break;
    }

    case "aula02b": {
      const hasStaticFatorial = /Static\s+Function\s+Fatorial\s*\(\s*\w+\s*\)/i.test(cleanCode);
      criteria.push({
        id: 0,
        title: "Criar a Static Function Fatorial(nNum)",
        pass: hasStaticFatorial,
        tip: hasStaticFatorial 
          ? "Ótimo! Static Function Fatorial declarada e isolada no fonte." 
          : "Crie ao final do arquivo: Static Function Fatorial(nNum) para modularizar o cálculo."
      });

      const hasTrava12 = /If\s+\w+\s*>\s*12/i.test(cleanCode) && /(?:ApMsgStop|Return\s+0|Alerta|bloque)/i.test(cleanCode);
      criteria.push({
        id: 1,
        title: "Implementar trava de segurança para números > 12",
        pass: hasTrava12,
        tip: hasTrava12 
          ? "Segurança garantida! Trava implementada para evitar estouro numérico no AppServer." 
          : "Adicione If nNum > 12 com aviso ApMsgStop ou retorno 0 para impedir números superiores a 12."
      });

      const hasWhileFat = /While\s+\w+\s*>\s*1/i.test(cleanCode) && /\*=/i.test(cleanCode) && /--/i.test(cleanCode) && /Static\s+Function\s+Fatorial/i.test(cleanCode);
      criteria.push({
        id: 2,
        title: "Laço While com multiplicação acumulada (*=) e decremento (--)",
        pass: hasWhileFat,
        tip: hasWhileFat 
          ? "Algoritmo de fatorial com While, *= e decremento funcionando perfeitamente." 
          : "Dentro da Static Function, use While nNum > 1 multiplicando nResultado *= nNum e decrementando nNum--."
      });

      const hasOutA2b = isRunSuccess && /Static\s+Function\s+Fatorial/i.test(cleanCode) && /(?:Fatorial\s*\(|!\s*=\s*\d+)/i.test(cleanCode);
      criteria.push({
        id: 3,
        title: "Executar e validar a função Fatorial no Protheus Virtual",
        pass: hasOutA2b,
        tip: hasOutA2b 
          ? "Fatorial validado com excelência no Protheus Virtual!" 
          : "Chame a função Fatorial() na User Function principal e teste a execução no Protheus."
      });
      break;
    }

    case "aula03": {
      const hasPRD5 = /PRD005/i.test(cleanCode) && /aAdd\s*\(\s*aItens/i.test(cleanCode);
      criteria.push({
        id: 0,
        title: "Inserir o 5º produto ('PRD005') na matriz aItens",
        pass: hasPRD5,
        tip: hasPRD5 
          ? "Excelente! Produto 'PRD005' adicionado na matriz aItens com aAdd()." 
          : "Adicione a linha: aAdd(aItens, {'PRD005', 'webcam full hd 1080p', 1, 280.00}) na matriz de produtos."
      });

      const hasMin5 = (cleanCode.match(/aAdd\s*\(\s*aItens/gi) || []).length >= 5 && /PRD005/i.test(cleanCode);
      criteria.push({
        id: 1,
        title: "Garantir a matriz com no mínimo 5 produtos",
        pass: hasMin5,
        tip: hasMin5 
          ? "Perfeito! A matriz agora possui os 5 itens configurados corretamente." 
          : "A matriz de itens original possui 4 produtos. Inclua o 5º item via aAdd() para totalizar 5."
      });

      const hasTotalMatriz = /PRD005/i.test(cleanCode) && /nTotalGeral\s*\+?=\s*nSubTotal/i.test(cleanCode) && /Transform\s*\(\s*nTotalGeral/i.test(cleanCode);
      criteria.push({
        id: 2,
        title: "Recalcular o total geral do pedido acumulando o novo produto",
        pass: hasTotalMatriz,
        tip: hasTotalMatriz 
          ? "Total geral recalculado e formatado com a nova linha inclusa!" 
          : "Certifique-se de que o For...Next itera até Len(aItens) e acumula o subtotal do PRD005."
      });

      const hasOutA3 = isRunSuccess && /PRD005/i.test(outMsg) && /PRD005/i.test(cleanCode);
      criteria.push({
        id: 3,
        title: "Validação da listagem de itens no Protheus Virtual",
        pass: hasOutA3,
        tip: hasOutA3 
          ? "Tabela de itens renderizada perfeitamente com o PRD005 no modal!" 
          : "Execute no Protheus Virtual e confirme se o produto PRD005 aparece na listagem do relatório."
      });
      break;
    }

    case "aula04": {
      const hasCodeblockCat = /\{\s*\|[^|]+\|\s*[^}]*(?:\[\s*3\s*\]\s*==\s*["']Perifericos["']|["']Perifericos["']\s*\$)/i.test(cleanCode);
      criteria.push({
        id: 0,
        title: "Definir Codeblock com critério de Categoria ('Perifericos')",
        pass: hasCodeblockCat,
        tip: hasCodeblockCat 
          ? "Codeblock lambda por categoria criado com sucesso." 
          : "Crie o Codeblock: bBuscaCat := {|x| x[3] == 'Perifericos'} para buscar por categoria."
      });

      const hasAScanCat = hasCodeblockCat && /aScan\s*\(\s*aProdutos\s*,\s*(?:bBuscaCat|bCat|\{[^}]*(?:\[\s*3\s*\]|Perifericos))/i.test(cleanCode) && !/aScan\s*\(\s*aProdutos\s*,\s*bFiltro\s*\)/i.test(cleanCode);
      criteria.push({
        id: 1,
        title: "Localizar produto por categoria na matriz usando aScan()",
        pass: hasAScanCat,
        tip: hasAScanCat 
          ? "aScan executado com o bloco de categoria com precisão." 
          : "Execute a busca: nPos := aScan(aProdutos, bBuscaCat) para encontrar o primeiro periférico."
      });

      const hasPosCheck = hasCodeblockCat && hasAScanCat && (/nPos\w*\s*>\s*0/i.test(cleanCode) || /nPos\s*>\s*0/i.test(cleanCode));
      criteria.push({
        id: 2,
        title: "Validar se o produto da categoria foi localizado (nPos > 0)",
        pass: hasPosCheck,
        tip: hasPosCheck 
          ? "Validação defensiva de índice encontrado implementada." 
          : "Adicione If nPos > 0 para garantir que o produto foi encontrado antes de ler seus dados."
      });

      const hasOutA4 = isRunSuccess && hasCodeblockCat && hasAScanCat && /(?:Teclado Mecanico|Mouse Sem Fio|Perifericos)/i.test(outMsg);
      criteria.push({
        id: 3,
        title: "Executar no Protheus Virtual e validar a busca por categoria",
        pass: hasOutA4,
        tip: hasOutA4 
          ? "Algoritmo validado com excelência no Protheus Virtual!" 
          : "Execute no Protheus Virtual e certifique-se de que o periférico localizado apareça no resultado."
      });
      break;
    }

    case "aula05": {
      const hasIOFVar = /Local\s+.*(?:nTaxaIOF|nIOF)\b/i.test(cleanCode) && /0\.38/i.test(cleanCode);
      criteria.push({
        id: 0,
        title: "Declarar a variável Local nTaxaIOF com alíquota padrão 0.38%",
        pass: hasIOFVar,
        tip: hasIOFVar 
          ? "Variável Local nTaxaIOF declarada no topo com escopo e tipo correto." 
          : "Declare no início da User Function: Local nTaxaIOF := 0.38 para a alíquota de IOF."
      });

      const hasIOFGet = /MSGET\s+.*(?:nTaxaIOF|nIOF|oGetIOF)/i.test(cleanCode);
      criteria.push({
        id: 1,
        title: "Adicionar campo de entrada interativo MSGET para o IOF",
        pass: hasIOFGet,
        tip: hasIOFGet 
          ? "Campo interativo MSGET posicionado na MSDialog com sucesso." 
          : "Adicione na janela: @ 070, 065 MSGET oGetIOF VAR nTaxaIOF PICTURE '@E 99.99' PIXEL OF oDlg."
      });

      const hasIOFCalc = /(?:CalcComIOF|nTaxaIOF|nIOF)/i.test(cleanCode) && /(?:IOF\s*\/|\*\s*\(?\s*1\s*\+\s*\(?\s*n(?:Taxa)?IOF)/i.test(cleanCode);
      criteria.push({
        id: 2,
        title: "Implementar cálculo financeiro aplicando a cascata do IOF",
        pass: hasIOFCalc,
        tip: hasIOFCalc 
          ? "Cálculo com cascata tributária de desconto e IOF implementado!" 
          : "Calcule o total aplicando primeiro o desconto comercial e em seguida o IOF sobre o valor final."
      });

      const hasOutA5 = isRunSuccess && /IOF/i.test(cleanCode) && /(?:IOF|Tributo|1355|1\.355)/i.test(outMsg);
      criteria.push({
        id: 3,
        title: "Executar e validar a interface com IOF no Protheus Virtual",
        pass: hasOutA5,
        tip: hasOutA5 
          ? "Interface gráfica com cálculo de IOF simulada com sucesso!" 
          : "Execute no Protheus Virtual e clique em Calcular para validar o total com IOF."
      });
      break;
    }

    case "aula06": {
      const hasFilterSP = /(?:AND\s+.*A1_EST\s*=\s*['"]SP['"]|WHERE\s+.*A1_EST\s*=\s*['"]SP['"])/i.test(cleanCode) || (cleanCode.includes("A1_EST = 'SP'") && !cleanCode.includes("SELECT A1_COD, A1_NOME, A1_MUN, A1_EST FROM SA1010"));
      criteria.push({
        id: 0,
        title: "Filtrar clientes do estado 'SP' (AND SA1.A1_EST = 'SP')",
        pass: hasFilterSP,
        tip: hasFilterSP 
          ? "Filtro regional por UF 'SP' adicionado na cláusula WHERE." 
          : "Adicione na string da query: cQuery += \" AND SA1.A1_EST = 'SP' \"."
      });

      const hasOrderByLC = /ORDER\s+BY\s+.*A1_LC\s+DESC/i.test(cleanCode);
      criteria.push({
        id: 1,
        title: "Ordenar decrescente por limite de crédito (ORDER BY A1_LC DESC)",
        pass: hasOrderByLC,
        tip: hasOrderByLC 
          ? "Cláusula ORDER BY A1_LC DESC aplicada para listar maiores limites primeiro." 
          : "Substitua a ordenação por: cQuery += \" ORDER BY SA1.A1_LC DESC \"."
      });

      const hasDeletAndClose = hasFilterSP && hasOrderByLC && /D_E_L_E_T_\s*=\s*['"]\s+['"]/i.test(cleanCode) && /DbCloseArea\s*\(\s*\)/i.test(cleanCode);
      criteria.push({
        id: 2,
        title: "Preservar deleção lógica obrigatória e fechamento com DbCloseArea()",
        pass: hasDeletAndClose,
        tip: hasDeletAndClose 
          ? "Boas práticas de engenharia TOTVS respeitadas com excelência." 
          : "Mantenha o filtro D_E_L_E_T_ = ' ' e certifique-se de liberar a área com DbCloseArea()."
      });

      const hasOutA6 = isRunSuccess && hasFilterSP && hasOrderByLC && /(?:SP|Sao Paulo|CLIENTES)/i.test(outMsg);
      criteria.push({
        id: 3,
        title: "Executar e validar listagem filtrada de SP no Protheus Virtual",
        pass: hasOutA6,
        tip: hasOutA6 
          ? "Consulta TopConnect executada e validada com filtros corporativos!" 
          : "Execute no Protheus Virtual para testar a consulta SQL filtrada por clientes de SP."
      });
      break;
    }

    case "aula07": {
      const hasCamposData = /C5_ENTREG/i.test(cleanCode) && /(?:C5_EMISSAO|dDataBase|Date\(\))/i.test(cleanCode);
      criteria.push({
        id: 0,
        title: "Recuperar campos de data C5_ENTREG e C5_EMISSAO",
        pass: hasCamposData,
        tip: hasCamposData 
          ? "Campos de data de entrega e emissão recuperados da área SC5." 
          : "No MT410OK, leia as datas do pedido: dEntrega := SC5->C5_ENTREG e dEmissao := SC5->C5_EMISSAO."
      });

      const hasPrazoValidation = /(?:C5_ENTREG|dEntrega)\s*<\s*(?:C5_EMISSAO|dEmissao|\+?\s*5)/i.test(cleanCode) || (/\+\s*5\b/i.test(cleanCode) && /C5_ENTREG/i.test(cleanCode));
      criteria.push({
        id: 1,
        title: "Validar prazo de entrega inferior a 5 dias úteis",
        pass: hasPrazoValidation,
        tip: hasPrazoValidation 
          ? "Regra de negócio de prazo mínimo de entrega implementada." 
          : "Valide a condição: If dEntrega < (dEmissao + 5) para rejeitar pedidos com entrega rápida não permitida."
      });

      const hasBloqueioHelp = /lRetorno\s*:=\s*\.F\./i.test(cleanCode) && /Help\s*\(/i.test(cleanCode) && /C5_ENTREG/i.test(cleanCode);
      criteria.push({
        id: 2,
        title: "Bloquear gravação com lRetorno := .F. e acionar Help()",
        pass: hasBloqueioHelp,
        tip: hasBloqueioHelp 
          ? "Bloqueio oficial via Help() e lRetorno := .F. configurado." 
          : "Ao constatar prazo inválido, defina lRetorno := .F. e exiba mensagem usando a função Help()."
      });

      const hasContextoPE = /GetArea\s*\(\s*\)/i.test(cleanCode) && /RestArea\s*\(/i.test(cleanCode) && /C5_ENTREG/i.test(cleanCode);
      criteria.push({
        id: 3,
        title: "Preservar integridade de contexto com GetArea() e RestArea()",
        pass: hasContextoPE,
        tip: hasContextoPE 
          ? "Contexto protegido com GetArea() e RestArea(), blindando o ERP." 
          : "Mantenha o salvamento de ponteiros no início e a restauração RestArea() no final do P.E."
      });
      break;
    }

    case "aula08": {
      const hasDynamicParamCheck = (/^\s*If\s+.*(?:nVlrTotal|nTotal|nValor|nVlr)\s*>\s*GetMV\s*\(\s*["']MV_LIMPED["']/im.test(cleanCode) || /^\s*If\s+.*GetMV\s*\(\s*["']MV_LIMPED["'].*<\s*(?:nVlrTotal|nTotal|nValor|nVlr)/im.test(cleanCode)) && !cleanCode.includes('cRelatorio += "CORRETO : If nVlrTotal > GetMV(\'MV_LIMPED\')"');
      criteria.push({
        id: 0,
        title: "Comparação condicional do valor do pedido com GetMV('MV_LIMPED')",
        pass: hasDynamicParamCheck,
        tip: hasDynamicParamCheck 
          ? "Hard-code eliminado com sucesso! Regra de decisão conectada à SX6." 
          : "Substitua a trava fixa por: If nVlrTotal > GetMV('MV_LIMPED', .F., 50000)."
      });

      const hasFallbackParam = hasDynamicParamCheck && (/GetMV\s*\(\s*["']MV_LIMPED["']\s*,\s*\.F\.\s*,\s*\d+\s*\)/i.test(cleanCode) || /GetMV\s*\(\s*["']MV_LIMPED["']\s*,/i.test(cleanCode));
      criteria.push({
        id: 1,
        title: "Uso de parâmetros opcionais de segurança no GetMV (fallback)",
        pass: hasFallbackParam,
        tip: hasFallbackParam 
          ? "Parâmetros de fallback (.F., 50000) garantem execução segura sem falhas." 
          : "Passe o valor padrão defensivo: GetMV('MV_LIMPED', .F., 50000) caso o parâmetro não exista."
      });

      const hasBlockAction = hasDynamicParamCheck && /(?:lRetorno\s*:=\s*\.F\.|ApMsgStop|Help\s*\()/i.test(cleanCode);
      criteria.push({
        id: 2,
        title: "Bloqueio da rotina ou alerta quando o limite for ultrapassado",
        pass: hasBlockAction,
        tip: hasBlockAction 
          ? "Tratamento de bloqueio por alçada implementado com sucesso." 
          : "Dentro da condição, defina lRetorno := .F. ou acione Help()/ApMsgStop alertando o operador."
      });

      const hasOutA8 = isRunSuccess && hasDynamicParamCheck && hasBlockAction && /(?:ultrapassado|bloqueado|LIMEXCED)/i.test(outMsg);
      criteria.push({
        id: 3,
        title: "Executar e validar regra de bloqueio dinâmico no Protheus Virtual",
        pass: hasOutA8,
        tip: hasOutA8 
          ? "Parametrização dinâmica validada com louvor no Protheus Virtual!" 
          : "Execute no Protheus Virtual e valide o comportamento da rotina parametrizada dinamicamente."
      });
      break;
    }

    default: {
      criteria.push({ id: 0, title: "Sintaxe ADVPL válida", pass: isRunSuccess, tip: "Compilação sem erros." });
      criteria.push({ id: 1, title: "Declaração de variáveis", pass: /Local\s+/i.test(cleanCode), tip: "Uso de variáveis locais." });
      criteria.push({ id: 2, title: "Lógica de processamento", pass: cleanCode.length > 50, tip: "Implementação de instruções." });
      criteria.push({ id: 3, title: "Execução no Protheus Virtual", pass: isRunSuccess, tip: "Execução com sucesso." });
      break;
    }
  }

  const score = criteria.filter(c => c.pass).length;
  const total = criteria.length;
  const passed = score === total;

  return {
    lessonId,
    lessonTitle: lesson.title || "Aula ADVPL",
    score,
    total,
    passed,
    criteria
  };
}
