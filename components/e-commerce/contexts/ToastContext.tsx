'use client'
import { useContext, createContext, useCallback, useMemo, useState } from 'react'

type Toast = {
  show: boolean
  type: Type
  message: string
}
export type Type = '' | 'error' | 'success' | 'cart'
type ShowToast = (type: Type, message: string) => void

const ToastContext = createContext({
  toast: {
    show: false,
    type: '',
    message: ''
  } as Toast,
  showToast: (type: Type, message: string) => {}
})

export const useToast = () => {
  const { showToast } = useContext(ToastContext)

  const error = (message: string) => showToast('error', message)
  const success = (message: string) => showToast('success', message)

  return { error, success }
}

export const useToastContext = () => useContext(ToastContext)

const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<Toast>({
    show: false,
    type: '',
    message: ''
  })

  const showToast: ShowToast = useCallback((type, message) => {
    setToast({
      show: true,
      type,
      message
    })
    setTimeout(() => {
      setToast({
        show: false,
        type: '',
        message: ''
      })
    }, 6000)
  }, [])

  const value = useMemo(() => {
    return {
      toast,
      showToast
    }
  }, [toast, showToast])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export default ToastContextProvider
