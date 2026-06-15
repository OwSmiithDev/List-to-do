import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, Info, X, XCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

const ICONS = {
  success: <CheckCircle size={16} className="text-green-500 shrink-0" />,
  error: <XCircle size={16} className="text-red-500 shrink-0" />,
  info: <Info size={16} className="text-blue-500 shrink-0" />,
}

export function ToastContainer() {
  const { toasts, dismissToast } = useApp()

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="pointer-events-auto flex items-center gap-3 bg-white dark:bg-gray-800
                       border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl px-4 py-3
                       text-sm text-gray-800 dark:text-gray-200 min-w-[220px] max-w-xs"
            role="alert"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.1 }}
            >
              {ICONS[toast.type]}
            </motion.span>
            <span className="flex-1">{toast.message}</span>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              onClick={() => dismissToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Fechar notificação"
            >
              <X size={14} />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
