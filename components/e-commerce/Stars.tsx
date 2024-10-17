import Star from './ui/Star'

export default function Stars({
  rating,
  className = '',
  starGapSize = 0,
  onClick
}: {
  rating: number
  className?: string
  starGapSize?: number
  onClick?: () => void
}) {
  const [wholeNumber, decimal] = rating.toString().split('.')
  const hasHalfStar = Number(decimal) >= 5
  const starsNotFilled = 5 - (Number(wholeNumber) + (hasHalfStar ? 1 : 0))

  return (
    <div className={`flex gap-${starGapSize}`} onClick={onClick}>
      {Array.from({ length: Number(wholeNumber) }).map((_, index) => (
        <Star filled={true} halfFilled={false} key={index} className={className} />
      ))}

      {hasHalfStar && <Star filled={false} halfFilled={true} className={className} />}

      {Array.from({ length: starsNotFilled }).map((_, index) => (
        <Star filled={false} halfFilled={false} key={index} className={className} />
      ))}
    </div>
  )
}
