import { useState } from 'react'
import { RiFileCopy2Line } from 'react-icons/ri'
import { LuClipboardCheck } from 'react-icons/lu'

export default function CopyToClipboard({ text }: { text: string }) {
  const [copySuccess, setCopySuccess] = useState<boolean>(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
    } catch {
      setCopySuccess(false)
    }
  }
  return (
    <div className='flex gap-2 items-center'>
      <p className='text-indigo-700'>{text}</p>
      {copySuccess ? (
        <LuClipboardCheck className='size-5 text-indigo-700' />
      ) : (
        <button onClick={handleCopy}>
          <RiFileCopy2Line className='size-5 text-indigo-700' />
        </button>
      )}
    </div>
  )
}
