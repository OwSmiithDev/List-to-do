import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import type { KanbanCol, Status, Tag, TagColor, Task, ViewMode, ColumnColorKey } from '../types'
import { DEFAULT_COLUMNS, DEFAULT_TAGS } from '../types'
import { generateSeedTasks } from '../utils/seed'

// ─── Task reducer ──────────────────────────────────────────────────────────
type TaskAction =
  | { type: 'ADD'; task: Task }
  | { type: 'UPDATE'; id: string; updates: Partial<Task> }
  | { type: 'DELETE'; id: string }
  | { type: 'REORDER'; tasks: Task[] }

function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.task]
    case 'UPDATE':
      return state.map(t => (t.id === action.id ? { ...t, ...action.updates } : t))
    case 'DELETE':
      return state.filter(t => t.id !== action.id)
    case 'REORDER':
      return action.tasks
  }
}

// ─── Toast ─────────────────────────────────────────────────────────────────
export interface ToastMsg {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

// ─── Context value ─────────────────────────────────────────────────────────
interface AppContextValue {
  // Tasks
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'criado_em'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  reorderTasks: (tasks: Task[]) => void

  // Columns (pipeline)
  columns: KanbanCol[]
  addColumn: (col: Omit<KanbanCol, 'id'>) => void
  updateColumn: (id: string, updates: Partial<Omit<KanbanCol, 'id'>>) => void
  deleteColumn: (id: string) => void
  reorderColumns: (cols: KanbanCol[]) => void

  // Tags
  tags: Tag[]
  addTag: (tag: Omit<Tag, 'id'>) => void
  updateTag: (id: string, updates: Partial<Omit<Tag, 'id'>>) => void
  deleteTag: (id: string) => void

  // View
  view: ViewMode
  setView: (v: ViewMode) => void

  // Theme
  theme: 'light' | 'dark'
  toggleTheme: () => void

  // Filters
  search: string
  setSearch: (s: string) => void
  filterStatus: Status | ''
  setFilterStatus: (s: Status | '') => void
  filterResponsavel: string
  setFilterResponsavel: (r: string) => void
  sortBy: 'prazo' | 'prioridade' | 'criado_em'
  setSortBy: (s: 'prazo' | 'prioridade' | 'criado_em') => void

  // Modals
  isSettingsOpen: boolean
  setIsSettingsOpen: (v: boolean) => void
  viewingTask: Task | null
  setViewingTask: (t: Task | null) => void
  editingTask: Task | null
  setEditingTask: (t: Task | null) => void
  isCreating: boolean
  setIsCreating: (v: boolean) => void
  deletingTaskId: string | null
  setDeletingTaskId: (id: string | null) => void

  // Toasts
  toasts: ToastMsg[]
  showToast: (message: string, type?: ToastMsg['type']) => void
  dismissToast: (id: string) => void

  // Data management
  replaceAllData: (data: { tasks: Task[]; columns: KanbanCol[]; tags: Tag[] }) => void
  deduplicateTasks: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

// ─── Provider ──────────────────────────────────────────────────────────────
export function AppProvider({ children }: { children: React.ReactNode }) {
  // Tasks
  const [tasks, dispatch] = useReducer(taskReducer, [], (): Task[] => {
    try {
      const stored = localStorage.getItem('taskflow_tasks')
      if (stored) {
        const parsed: Task[] = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure every task has a unique ID (guards against corrupt localStorage data)
          const seen = new Set<string>()
          return parsed
            .map((t: Task) => ({ ...t, id: t.id || crypto.randomUUID() }))
            .filter((t: Task) => {
              if (seen.has(t.id)) return false
              seen.add(t.id)
              return true
            })
        }
      }
    } catch {}
    return generateSeedTasks()
  })
  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks))
  }, [tasks])

  // Columns
  const [columns, setColumns] = useState<KanbanCol[]>(() => {
    try {
      const stored = localStorage.getItem('taskflow_columns')
      if (stored) {
        const parsed: KanbanCol[] = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {}
    return DEFAULT_COLUMNS
  })
  useEffect(() => {
    localStorage.setItem('taskflow_columns', JSON.stringify(columns))
  }, [columns])

  // Tags
  const [tags, setTags] = useState<Tag[]>(() => {
    try {
      const stored = localStorage.getItem('taskflow_tags')
      if (stored) {
        const parsed: Tag[] = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {}
    return DEFAULT_TAGS
  })
  useEffect(() => {
    localStorage.setItem('taskflow_tags', JSON.stringify(tags))
  }, [tags])

  // View
  const [view, setViewState] = useState<ViewMode>(() => {
    return (localStorage.getItem('taskflow_view') as ViewMode) ?? 'kanban'
  })
  const setView = useCallback((v: ViewMode) => {
    setViewState(v)
    localStorage.setItem('taskflow_view', v)
  }, [])

  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('taskflow_theme') as 'light' | 'dark') ?? 'light'
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('taskflow_theme', theme)
  }, [theme])
  const toggleTheme = useCallback(() => setTheme(t => (t === 'light' ? 'dark' : 'light')), [])

  // Filters
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<Status | ''>('')
  const [filterResponsavel, setFilterResponsavel] = useState('')
  const [sortBy, setSortBy] = useState<'prazo' | 'prioridade' | 'criado_em'>('criado_em')

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [viewingTask, setViewingTask] = useState<Task | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null)

  // Toasts
  const [toasts, setToasts] = useState<ToastMsg[]>([])
  const showToast = useCallback((message: string, type: ToastMsg['type'] = 'success') => {
    const id = crypto.randomUUID()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])
  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  // ─── Task actions ─────────────────────────────────────────────────────────
  const addTask = useCallback(
    (data: Omit<Task, 'id' | 'criado_em'>) => {
      const task: Task = { ...data, id: crypto.randomUUID(), criado_em: new Date().toISOString() }
      dispatch({ type: 'ADD', task })
      showToast('Tarefa criada com sucesso!')
    },
    [showToast],
  )
  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    dispatch({ type: 'UPDATE', id, updates })
  }, [])
  const deleteTask = useCallback(
    (id: string) => {
      dispatch({ type: 'DELETE', id })
      showToast('Tarefa excluída', 'info')
    },
    [showToast],
  )
  const reorderTasks = useCallback((t: Task[]) => dispatch({ type: 'REORDER', tasks: t }), [])

  // ─── Column actions ───────────────────────────────────────────────────────
  const addColumn = useCallback((col: Omit<KanbanCol, 'id'>) => {
    // Generate ID outside the updater so it's stable (React may call updaters multiple times)
    const id = crypto.randomUUID()
    setColumns(prev => [...prev, { ...col, id }])
    showToast('Coluna adicionada!')
  }, [showToast])

  const updateColumn = useCallback((id: string, updates: Partial<Omit<KanbanCol, 'id'>>) => {
    setColumns(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)))
  }, [])

  const deleteColumn = useCallback(
    (id: string) => {
      if (columns.length <= 1) return // never delete the last column
      const fallback = columns.find(c => c.id !== id)!
      // Move tasks that belong to the deleted column
      dispatch({
        type: 'REORDER',
        tasks: tasks.map(t => (t.status === id ? { ...t, status: fallback.id } : t)),
      })
      setColumns(prev => prev.filter(c => c.id !== id))
      showToast(`Coluna excluída. Tarefas movidas para "${fallback.rotulo}"`, 'info')
    },
    [columns, tasks, showToast],
  )

  const reorderColumns = useCallback((cols: KanbanCol[]) => setColumns(cols), [])

  // ─── Tag actions ──────────────────────────────────────────────────────────
  const addTag = useCallback(
    (tag: Omit<Tag, 'id'>) => {
      // Generate ID outside the updater so it's stable (React may call updaters multiple times)
      const id = crypto.randomUUID()
      setTags(prev => [...prev, { ...tag, id }])
      showToast('Etiqueta criada!')
    },
    [showToast],
  )

  const updateTag = useCallback(
    (id: string, updates: Partial<Omit<Tag, 'id'>>) => {
      const existing = tags.find(t => t.id === id)
      if (!existing) return
      // If name changed, update all tasks referencing the old name
      if (updates.name && updates.name !== existing.name) {
        const oldName = existing.name
        const newName = updates.name
        dispatch({
          type: 'REORDER',
          tasks: tasks.map(t => ({
            ...t,
            etiquetas: t.etiquetas.map(e => (e === oldName ? newName : e)),
          })),
        })
      }
      setTags(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)))
    },
    [tags, tasks],
  )

  const deleteTag = useCallback(
    (id: string) => {
      const tag = tags.find(t => t.id === id)
      if (!tag) return
      // Remove from all tasks
      dispatch({
        type: 'REORDER',
        tasks: tasks.map(t => ({
          ...t,
          etiquetas: t.etiquetas.filter(e => e !== tag.name),
        })),
      })
      setTags(prev => prev.filter(t => t.id !== id))
      showToast('Etiqueta excluída', 'info')
    },
    [tags, tasks, showToast],
  )

  // ─── Data management ──────────────────────────────────────────────────────
  const replaceAllData = useCallback(
    (data: { tasks: Task[]; columns: KanbanCol[]; tags: Tag[] }) => {
      const seen = new Set<string>()
      const cleanTasks = data.tasks
        .map(t => ({ ...t, id: t.id || crypto.randomUUID() }))
        .filter(t => { if (seen.has(t.id)) return false; seen.add(t.id); return true })
      dispatch({ type: 'REORDER', tasks: cleanTasks })
      setColumns(data.columns.length > 0 ? data.columns : columns)
      setTags(data.tags.length > 0 ? data.tags : tags)
    },
    [columns, tags],
  )

  const deduplicateTasks = useCallback(() => {
    const seen = new Set<string>()
    const deduped = tasks.filter(t => {
      if (seen.has(t.id)) return false
      seen.add(t.id)
      return true
    })
    if (deduped.length < tasks.length) {
      dispatch({ type: 'REORDER', tasks: deduped })
      showToast(`${tasks.length - deduped.length} duplicata(s) removida(s).`, 'info')
    } else {
      showToast('Nenhuma duplicata encontrada.', 'info')
    }
  }, [tasks, showToast])

  return (
    <AppContext.Provider
      value={{
        tasks, addTask, updateTask, deleteTask, reorderTasks,
        columns, addColumn, updateColumn, deleteColumn, reorderColumns,
        tags, addTag, updateTag, deleteTag,
        view, setView,
        theme, toggleTheme,
        search, setSearch,
        filterStatus, setFilterStatus,
        filterResponsavel, setFilterResponsavel,
        sortBy, setSortBy,
        isSettingsOpen, setIsSettingsOpen,
        viewingTask, setViewingTask,
        editingTask, setEditingTask,
        isCreating, setIsCreating,
        deletingTaskId, setDeletingTaskId,
        toasts, showToast, dismissToast,
        replaceAllData, deduplicateTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

// Unused type helpers kept for explicit imports
export type { ColumnColorKey, TagColor }
