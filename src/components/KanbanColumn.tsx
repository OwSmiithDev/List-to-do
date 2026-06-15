import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { AnimatePresence, motion } from 'framer-motion'
import type { KanbanCol, Task } from '../types'
import { getColStyle } from '../types'
import { AnimatedTaskCard } from './TaskCard'

interface Props {
  column: KanbanCol
  tasks: Task[]
}

export function KanbanColumn({ column, tasks }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })
  const style = getColStyle(column)

  return (
    <div className="flex flex-col w-64 sm:w-72 shrink-0">
      {/* Column header */}
      <div className={`flex items-center justify-between px-3 py-2 rounded-lg mb-3 ${style.headerClass}`}>
        <div className="flex items-center gap-2">
          <motion.span
            className={`w-2 h-2 rounded-full ${style.dotClass}`}
            animate={isOver ? { scale: [1, 1.5, 1] } : { scale: 1 }}
            transition={{ duration: 0.4, repeat: isOver ? Infinity : 0, repeatDelay: 0.3 }}
          />
          <span className="text-sm font-semibold">{column.rotulo}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={tasks.length}
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.countClass}`}
          >
            {tasks.length}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Drop zone */}
      <motion.div
        ref={setNodeRef}
        animate={
          isOver
            ? { scale: 1.015, transition: { duration: 0.15 } }
            : { scale: 1, transition: { duration: 0.2 } }
        }
        className={`flex-1 flex flex-col gap-2.5 min-h-[80px] rounded-xl p-1 transition-colors duration-150
                    ${isOver ? 'bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-300 dark:ring-indigo-700' : ''}`}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {tasks.map(task => (
              <AnimatedTaskCard key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </SortableContext>

        <AnimatePresence>
          {tasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex items-center justify-center text-xs text-gray-400 dark:text-gray-600 py-6"
            >
              {isOver ? (
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-indigo-400 dark:text-indigo-500 font-medium"
                >
                  Soltar aqui
                </motion.span>
              ) : (
                'Arraste tarefas aqui'
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
