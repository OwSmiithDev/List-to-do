import { AnimatePresence, motion } from 'framer-motion'
import { Check, Plus, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Subtarefa } from '../types'

interface Props {
  subtarefas: Subtarefa[]
  onChange: (subtarefas: Subtarefa[]) => void
}

export function SubtarefasSection({ subtarefas, onChange }: Props) {
  const [novoTexto, setNovoTexto] = useState('')
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [editandoTexto, setEditandoTexto] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const editRef = useRef<HTMLInputElement>(null)

  const concluidas = subtarefas.filter(s => s.concluida).length
  const total = subtarefas.length
  const progresso = total > 0 ? Math.round((concluidas / total) * 100) : 0

  useEffect(() => {
    if (editandoId) editRef.current?.focus()
  }, [editandoId])

  function adicionar() {
    const texto = novoTexto.trim()
    if (!texto) return
    const nova: Subtarefa = {
      id: crypto.randomUUID(),
      texto,
      concluida: false,
      ordem: subtarefas.length,
    }
    onChange([...subtarefas, nova])
    setNovoTexto('')
    inputRef.current?.focus()
  }

  function toggleConcluida(id: string) {
    onChange(subtarefas.map(s => (s.id === id ? { ...s, concluida: !s.concluida } : s)))
  }

  function excluir(id: string) {
    onChange(subtarefas.filter(s => s.id !== id))
  }

  function iniciarEdicao(s: Subtarefa) {
    setEditandoId(s.id)
    setEditandoTexto(s.texto)
  }

  function salvarEdicao(id: string) {
    const texto = editandoTexto.trim()
    if (texto) {
      onChange(subtarefas.map(s => (s.id === id ? { ...s, texto } : s)))
    }
    setEditandoId(null)
    setEditandoTexto('')
  }

  const sectionLabel =
    'block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5'

  return (
    <div>
      <p className={sectionLabel}>Subtarefas</p>

      {/* Progress indicator */}
      {total > 0 && (
        <div className="mb-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {concluidas} de {total} concluída{total !== 1 ? 's' : ''}
            </span>
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
              {progresso}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={false}
              animate={{ width: `${progresso}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* List */}
      {total === 0 ? (
        <p className="text-xs text-gray-400 dark:text-gray-600 italic mb-3">
          Nenhuma subtarefa ainda. Adicione a primeira abaixo.
        </p>
      ) : (
        <ul className="space-y-1 mb-3">
          <AnimatePresence initial={false}>
            {subtarefas.map(s => (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 group"
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleConcluida(s.id)}
                  aria-label={s.concluida ? 'Desmarcar subtarefa' : 'Marcar subtarefa como concluída'}
                  className={`shrink-0 w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-all
                    ${s.concluida
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-400'}`}
                  style={{ width: 18, height: 18, minWidth: 18 }}
                >
                  {s.concluida && <Check size={10} className="text-white" strokeWidth={3} />}
                </button>

                {/* Text / edit */}
                {editandoId === s.id ? (
                  <input
                    ref={editRef}
                    value={editandoTexto}
                    onChange={e => setEditandoTexto(e.target.value)}
                    onBlur={() => salvarEdicao(s.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') salvarEdicao(s.id)
                      if (e.key === 'Escape') { setEditandoId(null); setEditandoTexto('') }
                    }}
                    className="flex-1 text-sm px-2 py-0.5 rounded border border-indigo-300 dark:border-indigo-600
                               bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                               focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <span
                    onClick={() => !s.concluida && iniciarEdicao(s)}
                    className={`flex-1 text-sm leading-snug select-none transition-all
                      ${s.concluida
                        ? 'line-through text-gray-400 dark:text-gray-600 opacity-60 cursor-default'
                        : 'text-gray-700 dark:text-gray-300 cursor-text hover:text-gray-900 dark:hover:text-gray-100'}`}
                  >
                    {s.texto}
                  </span>
                )}

                {/* Delete */}
                <button
                  onClick={() => excluir(s.id)}
                  aria-label="Excluir subtarefa"
                  className="shrink-0 opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400
                             hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  <Trash2 size={13} />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {/* Add new */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          value={novoTexto}
          onChange={e => setNovoTexto(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && adicionar()}
          placeholder="Adicionar subtarefa..."
          className="flex-1 text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        <button
          onClick={adicionar}
          disabled={!novoTexto.trim()}
          aria-label="Adicionar subtarefa"
          className="shrink-0 p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700
                     disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}
