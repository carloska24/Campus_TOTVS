/**
 * speechTutor.ts - Sistema de Narração de Alta Fidelidade com IA para PT-BR
 * 
 * - Seleção inteligente da melhor voz Neural / Natural disponível no navegador
 * - Listener assíncrono para 'onvoiceschanged' (garante que as vozes neurais do Edge/Chrome sejam carregadas)
 * - Sanitização e fonetização especializada de termos técnicos TOTVS, ADVPL e TLPP
 */

// Dicionário fonético para termos técnicos da TOTVS / ADVPL / TLPP
const PHONETIC_MAP: Array<[RegExp, string]> = [
  // Sintaxe e blocos de código
  [/\/\*\/\{Protheus\.doc\}/gi, 'Documentação ProtheusDoc.'],
  [/\/\*\/|\*\//g, ' '],
  [/===+|---+/g, ' '],
  [/User\s+Function/gi, 'User Function'],
  [/Static\s+Function/gi, 'Static Function'],
  
  // Siglas e Tecnologias
  [/\bADVPL\b/g, 'Ádi-Vê-Pê-Éle'],
  [/\bTLPP\b/g, 'Tê-Éle-Pê-Pê'],
  [/\bTOTVS\b/gi, 'Tótvus'],
  [/\bProtheus\b/gi, 'Protéus'],
  [/\bMVC\b/g, 'Eme-Vê-Cê'],
  [/\bModelDef\b/gi, 'Módel-Déf'],
  [/\bViewDef\b/gi, 'Víew-Déf'],
  [/\bMenuDef\b/gi, 'Menu-Déf'],
  [/\bTDN\b/g, 'Tê-Dê-Ene'],
  [/\bPOO\b/g, 'Pê-Ó-Ó'],
  [/\bREST\b/gi, 'Réste'],
  [/\bAPI\b/gi, 'A-P-I'],
  [/\bAPIs\b/gi, 'A-P-Is'],
  [/\bSonarQube\b/gi, 'Sônar Kiúbi'],
  [/\bCodeAnalysis\b/gi, 'Cód Análissis'],
  [/\bTopConnect\b/gi, 'Tóp Conéct'],
  [/\bDBAccess\b/gi, 'Dê-Bê-Acess'],
  [/\bSmartClient\b/gi, 'Smárt Cláient'],
  
  // Tabelas SX
  [/\bSX1\b/gi, 'Esse-Xis-Um'],
  [/\bSX2\b/gi, 'Esse-Xis-Dois'],
  [/\bSX3\b/gi, 'Esse-Xis-Três'],
  [/\bSX5\b/gi, 'Esse-Xis-Cinco'],
  [/\bSX6\b/gi, 'Esse-Xis-Seis'],
  [/\bSIX\b/gi, 'Esse-Í-Xis'],
  [/\bSA1\b/gi, 'Esse-A-Um'],
  [/\bSA2\b/gi, 'Esse-A-Dois'],
  [/\bSB1\b/gi, 'Esse-B-Um'],
  [/\bSC5\b/gi, 'Esse-C-Cinco'],
  [/\bSC6\b/gi, 'Esse-C-Seis'],
  
  // Funções clássicas ADVPL
  [/\bRecLock\b/gi, 'Réqui-Lóqui'],
  [/\bMsUnlock\b/gi, 'Eme-Esse An-Lóqui'],
  [/\bTCQuery\b/gi, 'Tê-Cê-Quéri'],
  [/\bDbSelectArea\b/gi, 'Dê-Bê Seléct Éria'],
  [/\bDbSeek\b/gi, 'Dê-Bê Síqui'],
  [/\bDbSkip\b/gi, 'Dê-Bê Squípi'],
  [/\bDbCloseArea\b/gi, 'Dê-Bê Clôus Éria'],
  [/\bGetArea\b/gi, 'Guét Éria'],
  [/\bRestArea\b/gi, 'Rést Éria'],
  [/\bRetSqlName\b/gi, 'Rét-Esse-Quê-Éle-Nêime'],
  [/\bxFilial\b/gi, 'Xis-Filial'],
  [/\bcValToChar\b/gi, 'Cê-Val-Tu-Tchár'],
  [/\bdToC\b/gi, 'Dê-Tu-Cê'],
  [/\bcToD\b/gi, 'Cê-Tu-Dê'],
  [/\bAPMsgInfo\b/gi, 'Ápi-Mensagem-Ínfo'],
  [/\bApMsgStop\b/gi, 'Ápi-Mensagem-Stóp'],
  [/\bApMsgAlert\b/gi, 'Ápi-Mensagem-Alérta'],
  [/\bConOut\b/gi, 'Con-Áut'],
  [/\bFWLogMsg\b/gi, 'Éfe-Dáblio Lóg Mensagem'],
  [/\bBegin\s+Sequence\b/gi, 'Biguin Síquence'],
  [/\bRecover\b/gi, 'Ricóver'],
  [/\bEnd\s+Sequence\b/gi, 'Énd Síquence'],
  [/\bD_E_L_E_T_\b/gi, 'Dê-Éle-Tê'],
  
  // Tipos e Escopos
  [/\bLocal\b/g, 'Lócal'],
  [/\bStatic\b/g, 'Estátic'],
  [/\bPrivate\b/g, 'Práivet'],
  [/\bPublic\b/g, 'Públic'],
  [/\bCRLF\b/gi, 'quebra de linha'],
  
  // Limpeza de pontuação de programação
  [/::=/g, ' '],
  [/:=/g, ' recebe '],
  [/==/g, ' é igual a '],
  [/!=|<>|#=/g, ' é diferente de '],
  [/\.And\./gi, ' e '],
  [/\.Or\./gi, ' ou '],
  [/\.Not\./gi, ' não '],
  [/\.T\./gi, ' verdadeiro '],
  [/\.F\./gi, ' falso ']
];

/**
 * Fonetiza e suaviza o texto para que a narração em português soe limpa, natural e sem tropeços
 */
export function sanitizeForSpeech(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // Aplica o mapa fonético
  for (const [regex, replacement] of PHONETIC_MAP) {
    cleaned = cleaned.replace(regex, replacement);
  }

  // Remove caracteres especiais de código isolados
  cleaned = cleaned
    .replace(/[<>{}[\]\\#@*^~`]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
}

/**
 * Seleciona a voz em PT-BR de melhor qualidade disponível no navegador
 * Prioriza vozes neurais e online de alta definição (Microsoft Natural / Google PT-BR)
 */
export function getBestPortugueseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Filtra vozes brasileiras
  const ptBrVoices = voices.filter(v => 
    v.lang === 'pt-BR' || v.lang === 'pt_BR' || v.lang.toLowerCase().startsWith('pt-br')
  );

  // Se não achar estrito pt-BR, pega qualquer pt que não seja explicitamente pt-PT
  const candidateVoices = ptBrVoices.length > 0 
    ? ptBrVoices 
    : voices.filter(v => v.lang.startsWith('pt') && !v.lang.includes('PT'));

  if (candidateVoices.length === 0) {
    // Fallback: qualquer voz em português
    return voices.find(v => v.lang.toLowerCase().includes('pt')) || null;
  }

  // 2. Critérios de Ranking de Qualidade (Higher = Better):
  // - Vozes Neurais da Microsoft (Francisca Natural, Antonio Natural)
  // - Vozes do Google (Google português do Brasil)
  // - Vozes marcadas como 'Natural' ou 'Online'
  const scoredVoices = candidateVoices.map(voice => {
    let score = 0;
    const name = voice.name.toLowerCase();

    // Microsoft Natural Neural (ex: Francisca, Antonio, Thalita, Donato)
    if (name.includes('natural') || name.includes('online')) score += 100;
    if (name.includes('francisca')) score += 50; // Voz extremamente humana e didática
    if (name.includes('antonio')) score += 40;
    if (name.includes('google')) score += 80;    // Google português do Brasil é muito fluida
    if (name.includes('luciana') || name.includes('felipe')) score += 30;

    // Evita vozes sintéticas antigas mecânicas se houver melhor
    if (name.includes('desktop') || name.includes('sapi')) score -= 20;

    return { voice, score };
  });

  // Ordena pelo maior score
  scoredVoices.sort((a, b) => b.score - a.score);

  return scoredVoices[0]?.voice || candidateVoices[0];
}

/**
 * Inicializa listener para garantir carregamento assíncrono das vozes
 */
if (typeof window !== 'undefined' && window.speechSynthesis) {
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      // Pré-aquece a lista de vozes
      getBestPortugueseVoice();
    };
  }
}
