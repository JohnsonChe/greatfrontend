export function PaidBadgePill({ children }: { children: React.ReactNode }) {
  return (
    <span className='py-1 px-2 bg-[#F0FDF5] rounded-full border border-[#C3F8D5] text-[#309054] font-light'>
      {children}
    </span>
  )
}

export function PendingBadgePill({ children }: { children: React.ReactNode }) {
  return (
    <span className='py-1 px-2 bg-[#F9FAFB] rounded-full border border-[#D8D8D8] text-[#525252]'>
      {children}
    </span>
  )
}
