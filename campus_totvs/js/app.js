/**
 * Campus TOTVS - Main Application Controller com Normalizador Fonético IA & Dublagem Natural
 */
document.addEventListener('DOMContentLoaded', () => {
  const highlighter = new AdvplHighlighter();
  const simulator = new ProtheusSimulator();

  let currentLesson = LESSONS_DATABASE[0];
  let currentFileContent = currentLesson.code;
  let currentFileName = currentLesson.badge;
  let currentLineInspection = null;

  // Speech Synthesis & Neural Voice Selector
  let synth = window.speechSynthesis;
  let isSpeaking = false;
  let bestVoice = null;

  function loadBestVoice() {
    if (!synth) return;
    const voices = synth.getVoices();
    
    // Prioriza vozes neurais de alta fidelidade (Microsoft Natural, Google, Apple)
    bestVoice = voices.find(v => (v.lang === 'pt-BR' || v.lang === 'pt_BR') && (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Google') || v.name.includes('Luciana') || v.name.includes('Francisca') || v.name.includes('Antonio'))) ||
                voices.find(v => v.lang === 'pt-BR' || v.lang.startsWith('pt')) ||
                voices[0];
  }

  if (synth) {
    loadBestVoice();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadBestVoice;
    }
  }

  // Normalizador Fonético para Leitura Natural
  function normalizeTextForSpeech(rawText) {
    if (!rawText) return "";

    let text = rawText;

    // Substituição de abreviações e termos técnicos para fonética humana perfeita
    const phoneticReplacements = [
      // --- Termos gerais ---
      { regex: /\bex:\s*/gi, rep: "por exemplo, " },
      { regex: /\bex\.\s*/gi, rep: "por exemplo, " },
      // --- Linguagens e frameworks ---
      { regex: /\bADVPL\b/g, rep: "A-D-V-P-L" },
      { regex: /\bTLPP\b/g, rep: "T-L-P-P" },
      { regex: /\bVS Code\b/gi, rep: "V-S Code" },
      { regex: /\bFWMVCDef(\.ch)?\b/gi, rep: "F-W-M-V-C-Def" },
      // --- Documentação ---
      { regex: /\bProtheusDoc\b/gi, rep: "Protheus Dóque" },
      // --- Constantes e operadores ---
      { regex: /\bCRLF\b/g, rep: "quebra de linha" },
      { regex: /:=/g, rep: " recebe " },
      { regex: /\+=/g, rep: " mais-igual " },
      { regex: /\*=/g, rep: " vezes-igual " },
      { regex: /\b\.T\.\b/gi, rep: "Verdadeiro" },
      { regex: /\b\.F\.\b/gi, rep: "Falso" },
      { regex: /\bNil\b/gi, rep: "Nulo" },
      { regex: /->/g, rep: " campo " },
      { regex: /@E\b/g, rep: "" },
      // --- Pré-processador ---
      { regex: /#Include/gi, rep: "Include" },
      { regex: /#Define/gi, rep: "Define" },
      // --- Funções de conversão e string ---
      { regex: /\bdToC\b/g, rep: "D-to-C" },
      { regex: /\bsToD\b/g, rep: "S-to-D" },
      { regex: /\bcValToChar\b/g, rep: "C-Val-to-Char" },
      { regex: /\bAllTrim\b/gi, rep: "All-Trim" },
      { regex: /\bSubStr\b/gi, rep: "Sub-String" },
      { regex: /\bStrZero\b/gi, rep: "String-Zero" },
      { regex: /\bPadR\b/g, rep: "Pad-R" },
      { regex: /\bPadL\b/g, rep: "Pad-L" },
      { regex: /\bCapital\b/g, rep: "Capital" },
      { regex: /\bReplicate\b/g, rep: "Replicate" },
      // --- Funções de array ---
      { regex: /\baAdd\b/g, rep: "A-Add" },
      { regex: /\baScan\b/g, rep: "A-Scan" },
      { regex: /\baSort\b/g, rep: "A-Sort" },
      { regex: /\baClone\b/g, rep: "A-Clone" },
      { regex: /\bLen\b/g, rep: "Lên" },
      // --- Funções de interface ---
      { regex: /\bApMsgInfo\b/g, rep: "A-P-Msg-Info" },
      { regex: /\bApMsgStop\b/g, rep: "A-P-Msg-Stop" },
      { regex: /\bMsgInfo\b/g, rep: "Msg-Info" },
      { regex: /\bMsgStop\b/g, rep: "Msg-Stop" },
      { regex: /\bMsgAlert\b/g, rep: "Msg-Alert" },
      { regex: /\bMSDialog\b/gi, rep: "M-S-Dialog" },
      { regex: /\bMSDIALOG\b/g, rep: "M-S-Dialog" },
      { regex: /\bMSGET\b/g, rep: "M-S-Get" },
      { regex: /\bMsget\b/g, rep: "M-S-Get" },
      // --- Lógica ---
      { regex: /\bIif\b/g, rep: "I-I-F" },
      // --- Banco de dados e TopConnect ---
      { regex: /\bTopConnect\b/gi, rep: "Tóp-Connect" },
      { regex: /\bBeginSql\b/gi, rep: "Biguin-S-Q-L" },
      { regex: /\bEndSql\b/gi, rep: "End-S-Q-L" },
      { regex: /\bSQL\b/g, rep: "S-Q-L" },
      { regex: /\bPostgreSQL\b/gi, rep: "Póst-gre S-Q-L" },
      { regex: /\bTCQuery\b/gi, rep: "T-C-Query" },
      { regex: /\bDbSkip\b/gi, rep: "D-B-Skip" },
      { regex: /\bDbCloseArea\b/gi, rep: "D-B-Close-Area" },
      { regex: /\bDbSelectArea\b/gi, rep: "D-B-Select-Area" },
      { regex: /\bGetNextAlias\b/gi, rep: "Get-Next-Alias" },
      { regex: /\bRetSqlName\b/gi, rep: "Ret-S-Q-L-Name" },
      { regex: /\bChangeQuery\b/gi, rep: "Chênge-Query" },
      { regex: /\bRecLock\b/gi, rep: "Rec-Lock" },
      { regex: /\bMsUnlock\b/gi, rep: "Ms-Unlock" },
      { regex: /\bEof\b/gi, rep: "E-O-F, fim do arquivo" },
      // --- Contexto e ambiente ---
      { regex: /\bGetArea\b/gi, rep: "Get-Area" },
      { regex: /\bRestArea\b/gi, rep: "Rest-Area" },
      { regex: /\bRpcSetEnv\b/gi, rep: "R-P-C-Set-Env" },
      { regex: /\bRpcSetType\b/gi, rep: "R-P-C-Set-Type" },
      { regex: /\bcEmpAnt\b/g, rep: "código da empresa atual" },
      { regex: /\bcFilAnt\b/g, rep: "código da filial atual" },
      // --- Parâmetros SX6 ---
      { regex: /\bGetMV\b/gi, rep: "Get-M-V" },
      { regex: /\bPutMV\b/gi, rep: "Put-M-V" },
      { regex: /\bMV_LIMPED\b/g, rep: "M-V-LIMPED" },
      { regex: /\bMV_PERDESC\b/g, rep: "M-V-PERDESC" },
      { regex: /\bMV_LIMCRED\b/g, rep: "M-V-LIMCRED" },
      { regex: /\bMV_MODFAT\b/g, rep: "M-V-MODFAT" },
      // --- Tabelas e campos do ERP ---
      { regex: /\bSX6\b/g, rep: "S-X-6" },
      { regex: /\bSX2\b/g, rep: "S-X-2" },
      { regex: /\bSA1\b/g, rep: "S-A-1" },
      { regex: /\bSC5\b/g, rep: "S-C-5" },
      { regex: /\bSIGAFAT\b/g, rep: "S-I-G-A-FAT" },
      { regex: /\bSIGAADV\b/g, rep: "S-I-G-A-ADV" },
      { regex: /\bMATA410\b/g, rep: "M-A-T-A-410" },
      { regex: /\bMT410OK\b/g, rep: "M-T-410-OK" },
      { regex: /\bM410ALEG\b/g, rep: "M-410-A-LEG" },
      { regex: /\bD_E_L_E_T_\b/g, rep: "campo de deleção lógica" },
      // --- ProtheusDoc tags ---
      { regex: /@type/gi, rep: "tipo" },
      { regex: /@author/gi, rep: "autor" },
      { regex: /@since/gi, rep: "desde" },
      { regex: /@version/gi, rep: "versão" },
      { regex: /@param/gi, rep: "parâmetro" },
      { regex: /@return/gi, rep: "retorno" },
      // --- Limpeza de delimitadores de comentário ---
      { regex: /\/\*\//g, rep: "" },
      { regex: /\/\*/g, rep: "" },
      { regex: /\*\//g, rep: "" }
    ];

    phoneticReplacements.forEach(item => {
      text = text.replace(item.regex, item.rep);
    });

    return text;
  }

  // DOM Elements
  const lessonsContainer = document.getElementById('lessonsList');
  const gutterEl = document.getElementById('editorGutter');
  const viewportEl = document.getElementById('editorViewport');
  const currentFileNameEl = document.getElementById('currentFileName');
  const btnRun = document.getElementById('btnRunCode');
  const btnUpload = document.getElementById('btnUploadFile');
  const fileInput = document.getElementById('fileInputHidden');

  // Challenge Panel Elements
  const challengePanel = document.getElementById('challengePanel');
  const challengeTitle = document.getElementById('challengeTitle');
  const challengeDesc = document.getElementById('challengeDesc');

  // Inspector Elements
  const inspectorTitle = document.getElementById('inspectorTitle');
  const inspectorSnippet = document.getElementById('inspectorSnippet');
  const inspectorDesc = document.getElementById('inspectorDesc');
  const inspectorTags = document.getElementById('inspectorTags');
  const btnAiVoice = document.getElementById('btnAiVoice');
  const voiceWave = document.getElementById('voiceWave');

  // 1. Renderiza lista de aulas na sidebar
  function renderLessons() {
    lessonsContainer.innerHTML = '';
    
    const modules = {};
    LESSONS_DATABASE.forEach(lesson => {
      if (!modules[lesson.module]) modules[lesson.module] = [];
      modules[lesson.module].push(lesson);
    });

    Object.keys(modules).forEach(modName => {
      const groupEl = document.createElement('div');
      groupEl.className = 'module-group';

      const titleEl = document.createElement('div');
      titleEl.className = 'module-title';
      titleEl.innerHTML = `<span>📖</span> ${modName}`;
      groupEl.appendChild(titleEl);

      modules[modName].forEach(lesson => {
        const itemEl = document.createElement('div');
        itemEl.className = `lesson-item ${lesson.id === currentLesson.id ? 'active' : ''}`;
        itemEl.innerHTML = `
          <span class="lesson-badge">${lesson.badge}</span>
          <span>${lesson.title}</span>
        `;
        itemEl.addEventListener('click', () => selectLesson(lesson));
        groupEl.appendChild(itemEl);
      });

      lessonsContainer.appendChild(groupEl);
    });
  }

  // 2. Seleciona uma aula
  function selectLesson(lesson) {
    stopSpeech();
    currentLesson = lesson;
    currentFileContent = lesson.code;
    currentFileName = lesson.badge;
    renderLessons();
    renderEditor(currentFileContent, lesson.lineExplanations);
    renderChallenge(lesson);
    
    const firstLineKey = Object.keys(lesson.lineExplanations || {})[0] || 1;
    inspectLine(parseInt(firstLineKey), lesson.lineExplanations);
  }

  // Challenge Panel Elements & Gamification
  const challengeIconBox = document.getElementById('challengeIconBox');
  const challengeIconEl = document.getElementById('challengeIcon');
  const challengeQuestTag = document.getElementById('challengeQuestTag');
  const challengeDifficultyEl = document.getElementById('challengeDifficulty');
  const challengeXpValueEl = document.getElementById('challengeXpValue');
  const challengeRewardBadge = document.getElementById('challengeRewardBadge');
  const challengeTasksList = document.getElementById('challengeTasksList');
  const challengeProgressCount = document.getElementById('challengeProgressCount');
  const challengeHintBox = document.getElementById('challengeHintBox');
  const btnToggleHint = document.getElementById('btnToggleHint');
  const challengeHintContent = document.getElementById('challengeHintContent');
  const challengeHintText = document.getElementById('challengeHintText');
  const hintChevron = document.getElementById('hintChevron');
  const challengeSolutionBox = document.getElementById('challengeSolutionBox');
  const btnToggleSolution = document.getElementById('btnToggleSolution');
  const challengeSolutionContent = document.getElementById('challengeSolutionContent');
  const challengeSolutionCode = document.getElementById('challengeSolutionCode');
  const solutionChevron = document.getElementById('solutionChevron');
  const btnCopySolution = document.getElementById('btnCopySolution');
  const btnCompleteChallenge = document.getElementById('btnCompleteChallenge');
  const btnCompleteIcon = document.getElementById('btnCompleteIcon');
  const btnCompleteLabel = document.getElementById('btnCompleteLabel');
  const challengeResetArea = document.getElementById('challengeResetArea');
  const btnResetChallenge = document.getElementById('btnResetChallenge');
  const challengeConfettiCanvas = document.getElementById('challengeConfettiCanvas');

  let completedChallenges = JSON.parse(localStorage.getItem('totvs_campus_completed_challenges') || '{}');
  let userXp = parseInt(localStorage.getItem('totvs_campus_user_xp') || '0', 10);

  function playAudioFx(type) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (type === 'tick') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === 'victory') {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx === notes.length - 1 ? 'triangle' : 'sine';
          const startTime = ctx.currentTime + idx * 0.11;
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.38);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.42);
        });
      }
    } catch (e) {}
  }

  function launchConfetti() {
    if (!challengeConfettiCanvas || !challengePanel) return;
    const ctx = challengeConfettiCanvas.getContext('2d');
    challengeConfettiCanvas.width = challengePanel.offsetWidth;
    challengeConfettiCanvas.height = challengePanel.offsetHeight;
    challengeConfettiCanvas.style.display = 'block';

    const particles = [];
    const colors = ['#f59e0b', '#fbbf24', '#10b981', '#38bdf8', '#ec4899', '#f97316'];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: challengeConfettiCanvas.width / 2 + (Math.random() - 0.5) * 60,
        y: challengeConfettiCanvas.height / 2 + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 9,
        vy: (Math.random() - 0.5) * 9 - 3,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12
      });
    }

    function frame() {
      ctx.clearRect(0, 0, challengeConfettiCanvas.width, challengeConfettiCanvas.height);
      let active = 0;
      particles.forEach(p => {
        if (p.alpha > 0) {
          active++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.16;
          p.alpha -= p.decay;
          p.rotation += p.rotSpeed;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore;
        }
      });
      if (active > 0) {
        requestAnimationFrame(frame);
      } else {
        challengeConfettiCanvas.style.display = 'none';
      }
    }
    frame();
  }

  // Renderiza o card de desafio da aula gamificado
  function renderChallenge(lesson) {
    if (!challengePanel) return;
    if (!lesson || !lesson.challenge) {
      challengePanel.style.display = 'none';
      return;
    }

    const ch = lesson.challenge;
    const lessonId = lesson.id;
    const isDone = !!completedChallenges[lessonId];

    // Sanitiza o título para NUNCA exibir ícones repetidos
    let cleanTitle = ch.title || 'Desafio Prático';
    cleanTitle = cleanTitle.replace(/^[🎯⚡🔄📊🧩🖥️🗄️🛡️⚙️\s]+/, '').replace(/^Desafio:\s*/i, '').trim();

    challengeTitle.innerText = cleanTitle;
    if (challengeIconEl) challengeIconEl.innerText = ch.icon || '🎯';
    challengeDesc.innerText = ch.description || '';

    if (challengeQuestTag) challengeQuestTag.innerText = 'MISSÃO PRÁTICA';
    if (challengeDifficultyEl) {
      const diff = ch.difficulty || 'Iniciante';
      const color = ch.difficultyColor || '#22c55e';
      challengeDifficultyEl.innerText = diff;
      challengeDifficultyEl.style.borderColor = color + '55';
      challengeDifficultyEl.style.color = color;
    }
    if (challengeXpValueEl) challengeXpValueEl.innerText = '+' + (ch.xp || 50) + ' XP';
    if (challengeRewardBadge) challengeRewardBadge.innerText = '🏆 Conquista: ' + (ch.badgeName || 'Mestre ADVPL');

    if (challengeHintText) challengeHintText.innerText = ch.hint || 'Tente implementar antes de ver a solução!';
    if (challengeHintContent) challengeHintContent.style.display = 'none';
    if (hintChevron) hintChevron.innerText = '▼';

    if (challengeSolutionCode) challengeSolutionCode.innerText = ch.solution || '// Solução disponível após tentar o desafio!';
    if (challengeSolutionContent) challengeSolutionContent.style.display = 'none';
    if (solutionChevron) solutionChevron.innerText = '▼';

    const savedTasks = JSON.parse(localStorage.getItem('totvs_quest_tasks_' + lessonId) || '{}');
    const objectives = ch.objectives || [
      'Declarar as variáveis necessárias no topo da rotina',
      'Implementar a lógica solicitada no enunciado',
      'Validar o resultado com a execução no Protheus Virtual'
    ];

    if (challengeTasksList) {
      challengeTasksList.innerHTML = '';
      let completedCount = 0;

      objectives.forEach((taskDesc, idx) => {
        const taskLi = document.createElement('li');
        const isTaskDone = !!savedTasks[idx];
        if (isTaskDone) completedCount++;

        taskLi.className = 'task-item' + (isTaskDone ? ' done' : '');
        taskLi.innerHTML = `<span class="task-checkbox">${isTaskDone ? '✓' : ''}</span><span>${taskDesc}</span>`;

        taskLi.addEventListener('click', () => {
          savedTasks[idx] = !savedTasks[idx];
          localStorage.setItem('totvs_quest_tasks_' + lessonId, JSON.stringify(savedTasks));
          playAudioFx('tick');
          renderChallenge(lesson);
        });

        challengeTasksList.appendChild(taskLi);
      });

      if (challengeProgressCount) {
        challengeProgressCount.innerText = completedCount + '/' + objectives.length;
      }
    }

    if (isDone) {
      challengePanel.classList.add('completed');
      if (btnCompleteChallenge) {
        btnCompleteChallenge.classList.add('completed');
        if (btnCompleteIcon) btnCompleteIcon.innerText = '✅';
        if (btnCompleteLabel) btnCompleteLabel.innerText = 'Missão Cumprida! (+' + (ch.xp || 50) + ' XP)';
      }
      if (challengeResetArea) challengeResetArea.style.display = 'block';
    } else {
      challengePanel.classList.remove('completed');
      if (btnCompleteChallenge) {
        btnCompleteChallenge.classList.remove('completed');
        if (btnCompleteIcon) btnCompleteIcon.innerText = '⚔️';
        if (btnCompleteLabel) btnCompleteLabel.innerText = 'Concluir Missão (+' + (ch.xp || 50) + ' XP)';
      }
      if (challengeResetArea) challengeResetArea.style.display = 'none';
    }

    if (btnToggleHint) {
      btnToggleHint.onclick = () => {
        const isHidden = challengeHintContent.style.display === 'none';
        challengeHintContent.style.display = isHidden ? 'block' : 'none';
        if (hintChevron) hintChevron.innerText = isHidden ? '▲' : '▼';
      };
    }

    if (btnToggleSolution) {
      btnToggleSolution.onclick = () => {
        const isHidden = challengeSolutionContent.style.display === 'none';
        challengeSolutionContent.style.display = isHidden ? 'block' : 'none';
        if (solutionChevron) solutionChevron.innerText = isHidden ? '▲' : '▼';
      };
    }

    if (btnCopySolution && challengeSolutionCode) {
      btnCopySolution.onclick = () => {
        const code = challengeSolutionCode.innerText;
        navigator.clipboard.writeText(code).then(() => {
          btnCopySolution.innerText = 'Copiado! ✓';
          setTimeout(() => { btnCopySolution.innerText = '📋 Copiar Código'; }, 2000);
        });
      };
    }

    if (btnCompleteChallenge) {
      btnCompleteChallenge.onclick = () => {
        if (completedChallenges[lessonId]) return;
        completedChallenges[lessonId] = true;
        localStorage.setItem('totvs_campus_completed_challenges', JSON.stringify(completedChallenges));

        const xpEarned = lesson.challenge.xp || 50;
        userXp += xpEarned;
        localStorage.setItem('totvs_campus_user_xp', userXp.toString());

        const allDoneTasks = {};
        (lesson.challenge.objectives || []).forEach((_, idx) => { allDoneTasks[idx] = true; });
        localStorage.setItem('totvs_quest_tasks_' + lessonId, JSON.stringify(allDoneTasks));

        playAudioFx('victory');
        launchConfetti();
        renderChallenge(lesson);
      };
    }

    if (btnResetChallenge) {
      btnResetChallenge.onclick = () => {
        delete completedChallenges[lessonId];
        localStorage.setItem('totvs_campus_completed_challenges', JSON.stringify(completedChallenges));
        localStorage.removeItem('totvs_quest_tasks_' + lessonId);
        playAudioFx('tick');
        renderChallenge(lesson);
      };
    }

    challengePanel.style.display = 'block';
  }

  // 3. Renderiza o editor de código colorido
  function renderEditor(codeText, explanations = {}) {
    currentFileNameEl.innerText = currentFileName;
    gutterEl.innerHTML = '';
    viewportEl.innerHTML = '';

    const lines = codeText.split('\n');
    const bracketState = { level: 0 };

    lines.forEach((lineText, idx) => {
      const lineNum = idx + 1;

      // Gutter
      const numEl = document.createElement('div');
      numEl.className = 'line-number';
      numEl.innerText = lineNum;
      gutterEl.appendChild(numEl);

      // Line
      const lineEl = document.createElement('div');
      lineEl.className = 'code-line';
      if (explanations && explanations[lineNum]) {
        lineEl.classList.add('has-inspection');
      }

      lineEl.innerHTML = highlighter.tokenizeLine(lineText, bracketState);

      lineEl.addEventListener('click', () => {
        document.querySelectorAll('.code-line').forEach(el => el.classList.remove('active-line'));
        lineEl.classList.add('active-line');
        inspectLine(lineNum, explanations, lineText);
      });

      viewportEl.appendChild(lineEl);
    });
  }

  // 4. Atualiza o painel do inspetor
  function inspectLine(lineNum, explanations = {}, rawText = "") {
    const info = explanations[lineNum];

    if (!rawText) {
      const lines = currentFileContent.split('\n');
      rawText = lines[lineNum - 1] || "";
    }

    if (info) {
      // Narrativa enriquecida com audioHint quando disponível
      const audioBody = info.audioHint
        ? `${info.desc} ${info.audioHint}`
        : info.desc;
      const speechNarrative = `${info.title}. ${audioBody}`;

      currentLineInspection = {
        title: `Linha ${lineNum}: ${info.title}`,
        textToSpeak: normalizeTextForSpeech(speechNarrative),
        snippet: rawText.trim() || `Linha ${lineNum}`,
        desc: info.desc,
        tags: info.tags || []
      };

      inspectorTitle.innerText = currentLineInspection.title;
      inspectorSnippet.innerText = currentLineInspection.snippet;
      inspectorDesc.innerText = currentLineInspection.desc;

      inspectorTags.innerHTML = '';
      currentLineInspection.tags.forEach(t => {
        const tagEl = document.createElement('span');
        tagEl.className = 'tag';
        tagEl.innerText = t;
        inspectorTags.appendChild(tagEl);
      });
    } else {
      const genericDesc = `Esta instrução na linha ${lineNum} compõe o fluxo de execução do programa. Clique nas linhas destacadas com o indicador luminoso para ouvir explicações aprofundadas.`;

      // Para linhas sem explanation, NÃO lê o código bruto — ininteligível por áudio.
      const genericSpeech = `Linha ${lineNum} não possui explicação detalhada. Clique em uma linha destacada em azul para ouvir a narração do Tutor.`;

      currentLineInspection = {
        title: `Linha ${lineNum}: Instrução ADVPL`,
        textToSpeak: normalizeTextForSpeech(genericSpeech),
        snippet: rawText.trim() || `Linha ${lineNum}`,
        desc: genericDesc,
        tags: ["ADVPL", "Protheus"]
      };

      inspectorTitle.innerText = currentLineInspection.title;
      inspectorSnippet.innerText = currentLineInspection.snippet;
      inspectorDesc.innerText = currentLineInspection.desc;
      inspectorTags.innerHTML = '<span class="tag">ADVPL / Protheus</span>';
    }
  }

  // 5. Síntese de Voz com Normalização Fonética e Voz Neural
  function toggleSpeech() {
    if (!synth) {
      alert("Seu navegador não suporta a API de áudio/voz.");
      return;
    }

    if (isSpeaking) {
      stopSpeech();
      return;
    }

    if (!currentLineInspection) return;

    synth.cancel();
    loadBestVoice();

    const utterance = new SpeechSynthesisUtterance(currentLineInspection.textToSpeak);
    if (bestVoice) utterance.voice = bestVoice;
    utterance.lang = 'pt-BR';
    utterance.rate = 1.02; // Ritmo dinâmico e natural
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      isSpeaking = true;
      btnAiVoice.classList.add('playing');
      btnAiVoice.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        Pausar Narração IA
      `;
      voiceWave.classList.add('active');
    };

    utterance.onend = () => {
      stopSpeech();
    };

    utterance.onerror = () => {
      stopSpeech();
    };

    synth.speak(utterance);
  }

  function stopSpeech() {
    if (synth) synth.cancel();
    isSpeaking = false;
    if (btnAiVoice) {
      btnAiVoice.classList.remove('playing');
      btnAiVoice.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
        Ouvir Explicação da IA (Áudio)
      `;
    }
    if (voiceWave) {
      voiceWave.classList.remove('active');
    }
  }

  if (btnAiVoice) {
    btnAiVoice.addEventListener('click', toggleSpeech);
  }

  // 6. Botão de Execução
  btnRun.addEventListener('click', () => {
    simulator.runSimulation(currentLesson ? currentLesson.id : "custom", currentFileContent);
  });

  // 7. Upload de arquivos .prw
  btnUpload.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        stopSpeech();
        currentFileName = file.name;
        currentFileContent = event.target.result;
        currentLesson = { id: "custom", badge: file.name, title: file.name, code: currentFileContent, lineExplanations: {} };
        renderLessons();
        renderEditor(currentFileContent, {});
        inspectLine(1, {}, currentFileContent.split('\n')[0]);
      };
      reader.readAsText(file);
    }
  });

  // Inicialização
  renderLessons();
  selectLesson(LESSONS_DATABASE[0]);
});
