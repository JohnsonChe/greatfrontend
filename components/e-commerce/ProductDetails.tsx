'use client'
import ProductGallery from '@components/e-commerce/ProductGallery'
import ProductDescription from './ProductDescription'
import ProductControls from './ProductControls'
import Accordian from './Accordian'
import { useProductContext, ProductContextProviderValueType } from './ProductContext'

export default function ProductDetails() {
  const {
    name,
    imagesBySelectedColor,
    selectedPicture,
    currItemListPrice,
    setSelectedPicture,
    currItemSalePrice,
    currItemDiscountPercentage,
    reviews,
    description,
    rating,
    colors,
    selectedColor,
    selectedSize,
    selectedQuantity,
    setQuantity,
    setColor,
    setSize,
    currentItemStock,
    sizesInStock,
    sizes,
    addToCartHandler,
    info
  } = useProductContext() as ProductContextProviderValueType

  return (
    <div className='flex flex-col justify-center lg:flex-row gap-[2.625rem]'>
      <ProductGallery
        images={imagesBySelectedColor}
        selectedPicture={selectedPicture}
        setSelectedPicture={setSelectedPicture}
      />
      <div className='lg:w-[592px]'>
        <ProductDescription
          name={name}
          listPrice={currItemListPrice}
          salePrice={currItemSalePrice}
          discountPercentage={currItemDiscountPercentage}
          rating={Number(rating.toFixed(1))}
          reviews={reviews}
          description={description}
        />
        <ProductControls
          colors={colors}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          selectedQuantity={selectedQuantity}
          setQuantity={setQuantity}
          setColor={setColor}
          setSize={setSize}
          currItemStock={currentItemStock}
          sizeInventory={sizesInStock}
          sizes={sizes}
          addToCartHandler={addToCartHandler}
        />
        <Accordian info={info} />
      </div>
    </div>
  )
}
