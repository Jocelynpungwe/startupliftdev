import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'

/*
 * App-wide feedback primitives for the CRM:
 *   const toast = useToast();      toast.success('Saved')  toast.error('Nope')
 *   const confirm = useConfirm();  if (await confirm({ title, message })) ...
 * Replaces window.alert / window.confirm.
 */

const ToastContext = createContext(null)
const ConfirmContext = createContext(null)

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

let toastId = 0

export function UiProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const [dialog, setDialog] = useState(null)

  /* ------------------------------ toasts ------------------------------ */

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const push = useCallback(
    (type, message, options = {}) => {
      const id = ++toastId
      const duration = options.duration ?? (type === 'error' ? 6500 : 3800)
      setToasts((list) => [...list.slice(-3), { id, type, message }])
      if (duration > 0) setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss],
  )

  const toast = useMemo(
    () => ({
      success: (m, o) => push('success', m, o),
      error: (m, o) => push('error', m, o),
      info: (m, o) => push('info', m, o),
      dismiss,
    }),
    [push, dismiss],
  )

  /* ------------------------------ confirm ----------------------------- */

  const confirm = useCallback(
    (options) =>
      new Promise((resolve) => {
        setDialog({ ...options, resolve })
      }),
    [],
  )

  const settle = (value) => {
    dialog?.resolve(value)
    setDialog(null)
  }

  return (
    <ToastContext.Provider value={toast}>
      <ConfirmContext.Provider value={confirm}>
        {children}

        <div className="ui-toasts" role="region" aria-label="Notifications">
          {toasts.map((t) => {
            const Icon = ICONS[t.type]
            return (
              <div
                key={t.id}
                className={`ui-toast ui-toast--${t.type}`}
                role={t.type === 'error' ? 'alert' : 'status'}
              >
                <Icon size={18} aria-hidden="true" />
                <p>{t.message}</p>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss notification"
                >
                  <X size={15} />
                </button>
              </div>
            )
          })}
        </div>

        {dialog && <ConfirmDialog dialog={dialog} onSettle={settle} />}
      </ConfirmContext.Provider>
    </ToastContext.Provider>
  )
}

function ConfirmDialog({ dialog, onSettle }) {
  const {
    title = 'Are you sure?',
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    tone = 'default',
  } = dialog
  const cancelRef = useRef(null)
  const returnTo = useRef(document.activeElement)

  useEffect(() => {
    cancelRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onSettle(false)
      if (e.key === 'Tab') {
        const nodes = document.querySelectorAll('.ui-dialog button')
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    const previous = returnTo.current
    return () => {
      document.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="ui-overlay"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onSettle(false)}
    >
      <div
        className="ui-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="ui-dialog-title"
        aria-describedby="ui-dialog-message"
      >
        <span className={`ui-dialog__icon ui-dialog__icon--${tone}`}>
          <AlertTriangle size={20} aria-hidden="true" />
        </span>
        <div className="ui-dialog__body">
          <h2 id="ui-dialog-title">{title}</h2>
          {message && <p id="ui-dialog-message">{message}</p>}
        </div>
        <div className="ui-dialog__actions">
          <button
            ref={cancelRef}
            type="button"
            className="ui-btn ui-btn--ghost"
            onClick={() => onSettle(false)}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`ui-btn ${tone === 'danger' ? 'ui-btn--danger' : 'ui-btn--primary'}`}
            onClick={() => onSettle(true)}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <UiProvider>')
  return ctx
}

export const useConfirm = () => {
  const ctx = useContext(ConfirmContext)
  if (!ctx) throw new Error('useConfirm must be used inside <UiProvider>')
  return ctx
}
