// ─── Core ───────────────────────────────────────────────────────────────────
export type Priority = 'baixa' | 'media' | 'alta' | 'urgente'
export type ViewMode = 'list' | 'kanban'
export type Status = string // dynamic: column IDs

export interface Subtarefa {
  id: string
  texto: string
  concluida: boolean
  ordem: number
}

export interface Task {
  id: string
  titulo: string
  descricao: string
  status: Status
  prioridade: Priority
  responsavel: string
  prazo: string
  etiquetas: string[]
  criado_em: string
  subtarefas?: Subtarefa[]
  // Resolution fields (filled when marking as done or pending)
  solucao?: string
  data_conclusao?: string
  motivo_pendencia?: string
}

// ─── Priority ───────────────────────────────────────────────────────────────
export const PRIORITY_CONFIG: Record<Priority, { label: string; badgeClass: string }> = {
  baixa:   { label: 'Baixa',   badgeClass: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' },
  media:   { label: 'Média',   badgeClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' },
  alta:    { label: 'Alta',    badgeClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' },
  urgente: { label: 'Urgente', badgeClass: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' },
}

export const PRIORITY_ORDER: Record<Priority, number> = {
  urgente: 4, alta: 3, media: 2, baixa: 1,
}

// ─── Column colors ───────────────────────────────────────────────────────────
export type ColumnColorKey =
  | 'gray' | 'blue' | 'amber' | 'green'
  | 'violet' | 'rose' | 'teal' | 'orange'

export const COLUMN_COLORS: Record<
  ColumnColorKey,
  { label: string; dot: string; headerClass: string; dotClass: string; countClass: string }
> = {
  gray:   { label: 'Cinza',   dot: 'bg-gray-400',   headerClass: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',       dotClass: 'bg-gray-400',   countClass: 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400' },
  blue:   { label: 'Azul',    dot: 'bg-blue-500',   headerClass: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',       dotClass: 'bg-blue-500',   countClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' },
  amber:  { label: 'Âmbar',   dot: 'bg-amber-500',  headerClass: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',   dotClass: 'bg-amber-500',  countClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400' },
  green:  { label: 'Verde',   dot: 'bg-green-500',  headerClass: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',   dotClass: 'bg-green-500',  countClass: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' },
  violet: { label: 'Violeta', dot: 'bg-violet-500', headerClass: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400', dotClass: 'bg-violet-500', countClass: 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-400' },
  rose:   { label: 'Rosa',    dot: 'bg-rose-500',   headerClass: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',       dotClass: 'bg-rose-500',   countClass: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400' },
  teal:   { label: 'Teal',    dot: 'bg-teal-500',   headerClass: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',       dotClass: 'bg-teal-500',   countClass: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-400' },
  orange: { label: 'Laranja', dot: 'bg-orange-500', headerClass: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', dotClass: 'bg-orange-500', countClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400' },
}

export interface KanbanCol {
  id: string
  rotulo: string
  colorKey: ColumnColorKey
}

export function getColStyle(col: KanbanCol) {
  return COLUMN_COLORS[col.colorKey]
}

export const DEFAULT_COLUMNS: KanbanCol[] = [
  { id: 'todo',    rotulo: 'A fazer',      colorKey: 'gray' },
  { id: 'doing',   rotulo: 'Em andamento', colorKey: 'blue' },
  { id: 'review',  rotulo: 'Em revisão',   colorKey: 'amber' },
  { id: 'pending', rotulo: 'Pendente',     colorKey: 'rose' },
  { id: 'done',    rotulo: 'Concluído',    colorKey: 'green' },
]

// ─── Tags ────────────────────────────────────────────────────────────────────
export type TagColor =
  | 'indigo' | 'violet' | 'blue' | 'cyan' | 'teal'
  | 'green' | 'yellow' | 'orange' | 'red' | 'pink'

export const TAG_COLORS: Record<TagColor, { label: string; chipClass: string; dot: string }> = {
  indigo: { label: 'Índigo',   chipClass: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',   dot: 'bg-indigo-500' },
  violet: { label: 'Violeta',  chipClass: 'bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',   dot: 'bg-violet-500' },
  blue:   { label: 'Azul',     chipClass: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',           dot: 'bg-blue-500' },
  cyan:   { label: 'Ciano',    chipClass: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',           dot: 'bg-cyan-500' },
  teal:   { label: 'Teal',     chipClass: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',           dot: 'bg-teal-500' },
  green:  { label: 'Verde',    chipClass: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',       dot: 'bg-green-500' },
  yellow: { label: 'Amarelo',  chipClass: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',   dot: 'bg-yellow-500' },
  orange: { label: 'Laranja',  chipClass: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',   dot: 'bg-orange-500' },
  red:    { label: 'Vermelho', chipClass: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',               dot: 'bg-red-500' },
  pink:   { label: 'Rosa',     chipClass: 'bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',           dot: 'bg-pink-500' },
}

export interface Tag {
  id: string
  name: string
  color: TagColor
}

export const DEFAULT_TAGS: Tag[] = [
  { id: 'tag-design',      name: 'design',      color: 'violet' },
  { id: 'tag-frontend',    name: 'frontend',    color: 'blue' },
  { id: 'tag-backend',     name: 'backend',     color: 'teal' },
  { id: 'tag-docs',        name: 'docs',        color: 'cyan' },
  { id: 'tag-devops',      name: 'devops',      color: 'orange' },
  { id: 'tag-qa',          name: 'qa',          color: 'green' },
  { id: 'tag-gestao',      name: 'gestão',      color: 'yellow' },
  { id: 'tag-infra',       name: 'infra',       color: 'red' },
  { id: 'tag-seguranca',   name: 'segurança',   color: 'pink' },
  { id: 'tag-api',         name: 'api',         color: 'indigo' },
  { id: 'tag-performance', name: 'performance', color: 'orange' },
  { id: 'tag-banco',       name: 'banco',       color: 'teal' },
  { id: 'tag-testes',      name: 'testes',      color: 'green' },
]
