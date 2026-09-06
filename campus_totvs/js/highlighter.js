/**
 * Campus TOTVS - High-Precision ADVPL/TLPP Syntax & Semantic Colorizer (Definitive Edition)
 * Replica 100% da árvore semântica e cores do Antigravity IDE / VS Code TDS Protheus
 */
class AdvplHighlighter {
  constructor() {
    this.controlKeywords = new Set([
      'IF', 'ELSE', 'ELSEIF', 'ENDIF', 'END IF',
      'FOR', 'TO', 'STEP', 'NEXT',
      'WHILE', 'ENDDO', 'END DO',
      'DO', 'CASE', 'OTHERWISE', 'ENDCASE', 'END CASE',
      'RETURN',
      'BEGIN', 'TRANSACTION', 'END', 'DISARMTRANSACTION',
      'BEGINSQL', 'ENDSQL'
    ]);

    this.functionDeclKeywords = new Set(['USER', 'STATIC', 'MAIN', 'FUNCTION']);
    this.scopes = new Set(['LOCAL', 'PRIVATE', 'PUBLIC', 'STATIC', 'PARAMETERS', 'PARAM']);
    this.types = new Set(['CHARACTER', 'NUMERIC', 'DATE', 'LOGICAL', 'ARRAY', 'OBJECT', 'JSON']);
    this.constants = new Set(['.T.', '.F.', 'NIL', 'NULL', 'CRLF']);
    this.bracketColors = ['bracket-lvl-1', 'bracket-lvl-2', 'bracket-lvl-3'];
  }

  tokenizeLine(lineText, bracketState = { level: 0 }) {
    if (!lineText || lineText.trim() === '') {
      return '&nbsp;';
    }

    const trimmed = lineText.trim();

    // 1. Comentários de Linha (// ...)
    if (trimmed.startsWith('//')) {
      return `<span class="tok-comment">${this.escapeHtml(lineText)}</span>`;
    }

    // 2. Comentários de Documentação ProtheusDoc
    if (trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('*/') || trimmed.startsWith('@')) {
      let docHtml = this.escapeHtml(lineText);
      docHtml = docHtml.replace(/(@\w+)/g, '<span class="tok-doc-tag">$1</span>');
      return `<span class="tok-doc">${docHtml}</span>`;
    }

    // 3. Diretivas (#Include, #Define)
    if (trimmed.startsWith('#')) {
      const match = lineText.match(/^(\s*)(#\w+)([\s\S]*)$/);
      if (match) {
        return this.escapeHtml(match[1]) + 
               `<span class="tok-directive">${this.escapeHtml(match[2])}</span>` + 
               this.tokenizeInline(match[3], bracketState);
      }
    }

    return this.tokenizeInline(lineText, bracketState);
  }

  tokenizeInline(text, bracketState) {
    // Regex de captura rigorosa que não descarta nenhum espaço ou tabulação
    const tokenRegex = /("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(\/\/[^\r\n]*)|(:=|\+=|-=|\*=|\/=|==|!=|<>|<=|>=|[<>=+\-*/\\|!&,;])|([()[\]{}])|(\b\.[tTfF]\.\b)|([a-zA-Z_][a-zA-Z0-9_]*)|(\b\d+(?:\.\d+)?\b)|(\s+)|([^\s\w"'])/g;

    let html = '';
    let match;

    while ((match = tokenRegex.exec(text)) !== null) {
      const [full, strDouble, strSingle, comment, operator, bracket, boolConst, word, number, space, other] = match;

      if (space) {
        // Preserva 100% dos espaços em branco originais
        html += this.escapeHtml(space);
      } else if (strDouble || strSingle) {
        html += `<span class="tok-string">${this.escapeHtml(full)}</span>`;
      } else if (comment) {
        html += `<span class="tok-comment">${this.escapeHtml(full)}</span>`;
      } else if (bracket) {
        let lvlClass = 'bracket-lvl-1';
        if (bracket === '(' || bracket === '[' || bracket === '{') {
          lvlClass = this.bracketColors[bracketState.level % 3];
          bracketState.level++;
        } else if (bracket === ')' || bracket === ']' || bracket === '}') {
          bracketState.level = Math.max(0, bracketState.level - 1);
          lvlClass = this.bracketColors[bracketState.level % 3];
        }
        html += `<span class="tok-bracket ${lvlClass}">${this.escapeHtml(bracket)}</span>`;
      } else if (boolConst) {
        html += `<span class="tok-macro">${this.escapeHtml(full)}</span>`;
      } else if (operator) {
        html += `<span class="tok-operator">${this.escapeHtml(full)}</span>`;
      } else if (number) {
        html += `<span class="tok-number">${this.escapeHtml(full)}</span>`;
      } else if (word) {
        const upper = word.toUpperCase();

        if (this.functionDeclKeywords.has(upper)) {
          html += `<span class="tok-func-decl">${this.escapeHtml(word)}</span>`;
        } else if (this.controlKeywords.has(upper)) {
          html += `<span class="tok-keyword">${this.escapeHtml(word)}</span>`;
        } else if (this.scopes.has(upper)) {
          html += `<span class="tok-scope">${this.escapeHtml(word)}</span>`;
        } else if (this.types.has(upper)) {
          html += `<span class="tok-type">${this.escapeHtml(word)}</span>`;
        } else if (this.constants.has(upper)) {
          html += `<span class="tok-macro">${this.escapeHtml(word)}</span>`;
        } else {
          // Checa se é seguido por parêntese de chamada de função
          const nextIndex = tokenRegex.lastIndex;
          const remaining = text.slice(nextIndex).trimStart();
          if (remaining.startsWith('(')) {
            html += `<span class="tok-function">${this.escapeHtml(word)}</span>`;
          } else {
            html += `<span class="tok-variable">${this.escapeHtml(word)}</span>`;
          }
        }
      } else if (other) {
        html += this.escapeHtml(other);
      }
    }

    return html || '&nbsp;';
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}

window.AdvplHighlighter = AdvplHighlighter;
