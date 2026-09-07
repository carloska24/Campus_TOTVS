import React, { useState } from 'react';
import { TOTVS_DICTIONARY_DB, type ISXTableDetail } from '../../data/dictionary';
import { soundFx } from '../../utils/audio';
import { Search, Database, ListOrdered, CheckCircle2 } from 'lucide-react';

export const DicionarioView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTableKey, setSelectedTableKey] = useState<string>('SA1');

  const tableKeys = Object.keys(TOTVS_DICTIONARY_DB);

  // Filtro inteligente de busca
  const filteredKeys = tableKeys.filter((key) => {
    const tbl = TOTVS_DICTIONARY_DB[key];
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      key.toLowerCase().includes(term) ||
      tbl.name.toLowerCase().includes(term) ||
      tbl.description.toLowerCase().includes(term) ||
      tbl.module.toLowerCase().includes(term) ||
      tbl.fields.some((f) => f.field.toLowerCase().includes(term) || f.desc.toLowerCase().includes(term))
    );
  });

  const selectedTable: ISXTableDetail = TOTVS_DICTIONARY_DB[selectedTableKey] || TOTVS_DICTIONARY_DB['SA1'];

  return (
    <div className="flex-1 h-[calc(100vh-3.5rem)] bg-[#0d1117] flex overflow-hidden">
      {/* Sidebar de Tabelas (Esquerda) */}
      <div className="w-80 border-r border-[#30363d] bg-[#161b22] flex flex-col shrink-0">
        {/* Campo de Busca */}
        <div className="p-3 border-b border-[#30363d]">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar tabela, campo ou módulo..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="text-[11px] text-gray-400 mt-1.5 flex justify-between">
            <span>Dicionário SX2/SX3</span>
            <span className="font-mono text-cyan-400">{filteredKeys.length} encontradas</span>
          </div>
        </div>

        {/* Lista de Tabelas */}
        <div className="p-2 overflow-y-auto flex-1 space-y-1">
          {filteredKeys.map((key) => {
            const tbl = TOTVS_DICTIONARY_DB[key];
            const isSelected = key === selectedTableKey;

            return (
              <button
                key={key}
                onClick={() => {
                  soundFx.playTick();
                  setSelectedTableKey(key);
                }}
                className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#1c2128] border-cyan-500/50 text-white shadow-sm'
                    : 'bg-[#0d1117] border-[#30363d] text-gray-400 hover:border-gray-500 hover:text-gray-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-cyan-400 font-mono">{key}</span>
                    <span className="text-[10px] px-1 py-0.2 rounded bg-[#21262d] text-gray-300 font-medium">
                      {tbl.module}
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 truncate mt-0.5">{tbl.name}</div>
                </div>

                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Visualizador da Tabela (Direita) */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Cabeçalho da Tabela */}
        <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-800/40 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm">
              {selectedTableKey}
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>{selectedTable.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#21262d] text-cyan-300 font-mono">
                  {selectedTable.module}
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {selectedTable.description}
              </p>
            </div>
          </div>
        </div>

        {/* Índices Primários (SIX) */}
        {selectedTable.indices && selectedTable.indices.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4 text-cyan-400" />
              <span>Índices Oficiais do Sistema (SIX)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {selectedTable.indices.map((idx, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs flex flex-col gap-0.5 font-mono"
                >
                  <div className="text-[11px] text-cyan-400 font-semibold">
                    Ordem {idx.order}: {idx.desc}
                  </div>
                  <div className="text-gray-300 text-[11px]">{idx.key}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Campos (SX3) */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Campos do Dicionário (SX3) - Total: {selectedTable.fields.length}</span>
          </h3>

          <div className="border border-[#30363d] rounded-xl overflow-hidden bg-[#161b22]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#30363d] bg-[#1c2128] text-gray-400 font-semibold text-[11px]">
                  <th className="p-2.5 pl-4">Campo</th>
                  <th className="p-2.5">Tipo</th>
                  <th className="p-2.5">Tam / Dec</th>
                  <th className="p-2.5">Descrição</th>
                  <th className="p-2.5">Máscara (Picture)</th>
                  <th className="p-2.5">Validação (X3_VALID)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363d]/60 font-mono text-[11.5px]">
                {selectedTable.fields.map((f, i) => (
                  <tr key={i} className="hover:bg-[#1f2937]/50 transition-colors">
                    <td className="p-2.5 pl-4 font-bold text-cyan-300">{f.field}</td>
                    <td className="p-2.5 text-amber-300">{f.type}</td>
                    <td className="p-2.5 text-gray-400">{f.size}{f.dec ? `, ${f.dec}` : ''}</td>
                    <td className="p-2.5 font-sans text-gray-200">{f.desc}</td>
                    <td className="p-2.5 text-gray-400">{f.picture || '-'}</td>
                    <td className="p-2.5 text-cyan-400 text-[10.5px] truncate max-w-xs" title={f.valid}>
                      {f.valid || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
