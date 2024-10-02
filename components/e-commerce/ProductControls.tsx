import ColorSwatches from './ColorSwatches'
import SizeSelection from './SizeSelection'
import { colors, size } from '../../types/ProductDetailsType'
import QuantitySelection from './QuantitySelection'
import SubmitButton from './SubmitButton'

interface ProductControlsProps {
  colors: string[]
  setColor: React.Dispatch<React.SetStateAction<string>>
  setSize: React.Dispatch<React.SetStateAction<string>>
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  currItemStock: number
  selectedColor: string
  selectedSize: string
  selectedQuantity: number
  sizeInventory: string[]
  sizes: size[]
  addToCartHandler: () => void
}

export default function ProductControls({
  colors,
  setColor,
  setSize,
  setQuantity,
  currItemStock,
  selectedColor,
  selectedSize,
  selectedQuantity,
  sizeInventory,
  sizes,
  addToCartHandler
}: ProductControlsProps) {
  return (
    <div className='mt-8'>
      <span className='text-neutral-500'>Available Colors</span>
      <div className='flex mt-4'>
        {colors.map((color, index) => (
          <ColorSwatches
            key={index}
            color={color}
            selectedColor={selectedColor}
            onClick={setColor}
            outOfStock={currItemStock === 0}
          />
        ))}
      </div>
      <div className='mt-8'>
        <span className='text-neutral-500'>Available Sizes</span>
        <SizeSelection
          onClick={setSize}
          selectedSize={selectedSize}
          sizeInventory={sizeInventory}
          sizes={sizes}
        />
      </div>
      <QuantitySelection
        setQuantity={setQuantity}
        currentItemStock={currItemStock}
        selectedQuantity={selectedQuantity}
      />
      <SubmitButton onClick={addToCartHandler} />
    </div>
  )
}
