interface SubmitButtonProps {
  onClick: () => void
}

export default function SubmitButton({ onClick }: SubmitButtonProps) {
  return (
    <div className='mt-8'>
      <button
        className='w-full bg-indigo-700 text-white rounded-lg py-4 px-28 xs:px-24 hover:bg-indigo-800'
        onClick={onClick}>
        Add to cart
      </button>
    </div>
  )
}
