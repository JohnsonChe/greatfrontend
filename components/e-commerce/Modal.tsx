import clsx from 'clsx'
import { useEffect } from 'react'
import { RiCloseLine } from 'react-icons/ri'

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode
  className?: string
  titleTag?: JSX.Element | null
}

export default function Modal({
  setShowModal,
  children,
  className = '',
  titleTag = null
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div
      className='fixed flex justify-center items-center bg-neutral-950 w-full h-full inset-0 bottom-0 z-1000 bg-opacity-70 overflow-hidden'
      onClick={() => setShowModal(false)}>
      <div className={`bg-white rounded-lg ` + className} onClick={(e) => e.stopPropagation()}>
        <div className={clsx('flex', titleTag ? 'justify-between px-6 pt-6' : 'justify-end p-7')}>
          {titleTag}
          <RiCloseLine className='size-6 cursor-pointer' onClick={() => setShowModal(false)} />
        </div>
        <div className='max-h-[calc(100vh-300px)] xs:max-h-[calc(100vh-100px)] overflow-y-auto py-4'>
          {children}
        </div>
      </div>
    </div>
  )
}
