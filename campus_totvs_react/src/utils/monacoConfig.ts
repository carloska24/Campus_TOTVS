import type { Monaco } from '@monaco-editor/react';

export function setupMonacoAdvpl(monaco: Monaco) {
  // 1. Registrar Linguagem ADVPL Oficial no Monaco
  if (!monaco.languages.getLanguages().some((l: { id: string }) => l.id === 'advpl')) {
    monaco.languages.register({ id: 'advpl' });

    // 2. Gramática Léxica Exata Monarch
    monaco.languages.setMonarchTokensProvider('advpl', {
      ignoreCase: true,
      keywords: [
        'user', 'static', 'main', 'function',
        'local', 'private', 'public', 'parameters', 'param',
        'if', 'else', 'elseif', 'endif', 'end if',
        'for', 'to', 'step', 'next',
        'while', 'enddo', 'end do',
        'do', 'case', 'otherwise', 'endcase', 'end case',
        'return', 'beginsql', 'endsql', 'begin', 'sequence', 'recover'
      ],
      typeKeywords: ['character', 'numeric', 'date', 'logical', 'array', 'object', 'json'],
      constants: ['.t.', '.f.', 'nil', 'null', 'crlf'],
      operators: [':=', '+=', '-=', '*=', '/=', '==', '!=', '<>', '<=', '>=', '=', '<', '>', '+', '-', '*', '/'],

      tokenizer: {
        root: [
          // ProtheusDoc
          [/\/\*\/\{Protheus\.doc\}[\s\S]*?\*\//, 'comment.doc'],
          [/\/\*[\s\S]*?\*\//, 'comment'],
          [/\/\/.*$/, 'comment'],

          // Diretivas
          [/#\w+/, 'keyword.directive'],

          // Constantes Lógicas
          [/\.[tTfF]\./, 'constant'],

          // Strings
          [/"([^"\\]|\\.)*"/, 'string'],
          [/'([^'\\]|\\.)*'/, 'string'],

          // Números
          [/\b\d+(\.\d+)?\b/, 'number'],

          // Chamada de Funções ou Identificadores
          [/[a-zA-Z_]\w*(?=\s*\()/, 'entity.name.function'],

          // Palavras-chave e Identificadores
          [/[a-zA-Z_]\w*/, {
            cases: {
              '@keywords': 'keyword',
              '@typeKeywords': 'type',
              '@constants': 'constant',
              '@default': 'variable'
            }
          }],

          // Operadores
          [/:=|\+=|-=|\*=|\/=|==|!=|<>|<=|>=|[<>=+\-*/]/, 'delimiter'],

          // Delimitadores / Parênteses
          [/[{}()[\]]/, '@brackets'],
        ]
      }
    });

    // 3. Suporte a comentários e pares automáticos
    monaco.languages.setLanguageConfiguration('advpl', {
      comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
      },
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" }
      ]
    });
  }

  // 4. Tema Oficial do VS Code TDS Protheus (Dark+)
  monaco.editor.defineTheme('totvs-dark-plus', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword.directive', foreground: '569cd6' },
      { token: 'keyword', foreground: 'c586c0' },
      { token: 'keyword.function', foreground: '569cd6' },
      { token: 'variable', foreground: '9cdcfe' },
      { token: 'entity.name.function', foreground: 'dcdcaa' },
      { token: 'string', foreground: 'ce9178' },
      { token: 'number', foreground: 'b5cea8' },
      { token: 'constant', foreground: '569cd6' },
      { token: 'comment', foreground: '6a9955', fontStyle: 'italic' },
      { token: 'comment.doc', foreground: '6a9955' },
      { token: 'delimiter', foreground: 'd4d4d4' }
    ],
    colors: {
      'editor.background': '#161b22',
      'editor.foreground': '#d4d4d4',
      'editorLineNumber.foreground': '#484f58',
      'editorLineNumber.activeForeground': '#c9d1d9',
      'editor.selectionBackground': '#264f78',
      'editor.lineHighlightBackground': '#1c2128'
    }
  });

  // 5. Tema Claro Light+
  monaco.editor.defineTheme('totvs-light-plus', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'keyword.directive', foreground: 'af00db', fontStyle: 'bold' },
      { token: 'keyword', foreground: '0000ff', fontStyle: 'bold' },
      { token: 'keyword.function', foreground: '0000ff', fontStyle: 'bold' },
      { token: 'variable', foreground: '001080' },
      { token: 'entity.name.function', foreground: '795e26', fontStyle: 'bold' },
      { token: 'string', foreground: 'a31515' },
      { token: 'number', foreground: '098658' },
      { token: 'constant', foreground: '0070c1', fontStyle: 'bold' },
      { token: 'comment', foreground: '008000', fontStyle: 'italic' },
      { token: 'comment.doc', foreground: '008000', fontStyle: 'italic' },
      { token: 'delimiter', foreground: '000000' }
    ],
    colors: {
      'editor.background': '#ffffff',
      'editor.foreground': '#0f172a',
      'editorLineNumber.foreground': '#94a3b8',
      'editorLineNumber.activeForeground': '#0f172a',
      'editor.selectionBackground': '#add6ff',
      'editor.lineHighlightBackground': '#f8fafc',
      'editorCursor.foreground': '#0f172a'
    }
  });
}
