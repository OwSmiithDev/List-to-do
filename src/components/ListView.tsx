import { AnimatePresence } from 'framer-motion'
import { ArrowUpDown, Filter } from 'lucide-react'
import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import type { Status } from '../types'
import { PRIORITY_ORDER } from '../types'
import { EmptyState } from './EmptyState'
import { TaskRow } from './TaskRow'

export function ListView() {
  const {
    tasks,
    columns,
    search,
    filterStatus,
    setFilterStatus,
    filterResponsavel,
    setFilterResponsavel,
    sortBy,
    setSortBy,
  } = useApp()

  const responsaveis = useMemo(
    () => [...new Set(tasks.map(t => t.responsavel).filter(Boolean))].sort(),
    [tasks],
  )

  const filtered = useMemo(() => {
    let list = [...tasks]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        t =>
          t.titulo.toLowerCase().includes(q) ||
          t.descricao.toLowerCase().includes(q) ||
          t.responsavel.toLowerCase().includes(q) ||
          t.etiquetas.some(e => e.toLowerCase().includes(q)),
      )
    }

    if (filterStatus) list = list.filter(t => t.status === filterStatus)
    if (filterResponsavel) list = list.filter(t => t.responsavel === filterResponsavel)

    list.sort((a, b) => {
      if (sortBy === 'prioridade') return PRIORITY_ORDER[b.prioridade] - PRIORITY_ORDER[a.prioridade]
      if (sortBy === 'prazo') {
        if (!a.prazo) return 1
        if (!b.prazo) return -1
        return a.prazo.localeCompare(b.prazo)
      }
      return b.criado_em.localeCompare(a.criado_em)
    })

    return list
  }, [tasks, search, filterStatus, filterResponsavel, sortBy])

  const hasFilters = !!(search || filterStatus || filterResponsavel)

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
          <Filter size={13} />
          Filtrar:
        </div>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as Status | '')}
          className="text-sm py-1.5 px-3 bg-white dark:bg-gray-800 border border-gray-200
                     dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Filtrar por status"
        >
          <option value="">Todos os status</option>
          {columns.map(c => (
            <option key={c.id} value={c.id}>{c.rotulo}</option>
          ))}
        </select>

        {responsaveis.length > 0 && (
          <select
            value={filterResponsavel}
            onChange={e => setFilterResponsavel(e.target.value)}
            className="text-sm py-1.5 px-3 bg-white dark:bg-gray-800 border border-gray-200
                       dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Filtrar por responsável"
          >
            <option value="">Todos os responsáveis</option>
            {responsaveis.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        )}

        <div className="flex items-center gap-1.5 ml-auto">
          <ArrowUpDown size={13} className="text-gray-400" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="text-sm py-1.5 px-3 bg-white dark:bg-gray-800 border border-gray-200
                       dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Ordenar por"
          >
            <option value="criado_em">Mais recentes</option>
            <option value="prazo">Prazo</option>
            <option value="prioridade">Prioridade</option>
          </select>
        </div>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} {filtered.length === 1 ? 'tarefa' : 'tarefas'}
        </span>
      </div>

      {filtered.length === 0 ? (
        <EmptyState filtered={hasFilters} />
      ) : (
        <div className="flex flex-col gap-2">
          <AnimatePresence>
            {filtered.map(task => (
              <TaskRow key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
