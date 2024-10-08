import { useEffect } from 'react'
import { RiCloseLine } from 'react-icons/ri'

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode
}

export default function Modal({ setShowModal, children }: ModalProps) {
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
      <div
        className='bg-white xs:min-w-[200px] xs:min-h-[552px] sm:max-w-[375px] sm:min-h-[652px]  md:max-w-[522px] md:min-h-[864px] lg:min-w-[75rem] lg:min-h-[608px] rounded-lg'
        onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-end p-7'>
          <RiCloseLine className='size-6' onClick={() => setShowModal(false)} />
        </div>
        <div className='max-h-[calc(100vh-300px)] xs:max-h-[calc(100vh-100px)] overflow-y-auto py-4'>
          {children}
        </div>
      </div>
    </div>
  )
}
