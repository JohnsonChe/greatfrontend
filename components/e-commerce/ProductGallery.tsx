import { image } from '../../types/ProductDetailsType'

interface ProductGalleryProps {
  images: image[]
  selectedPicture: number
  setSelectedPicture: React.Dispatch<React.SetStateAction<number>>
}

export default function ProductGallery({
  images,
  selectedPicture,
  setSelectedPicture
}: ProductGalleryProps) {
  return (
    <div className='flex flex-col gap-6 overflow-hidden lg:max-w-[494px] xl:max-w-[592px]'>
      {images.length > 0 ? (
        <>
          <img
            src={images[selectedPicture].image_url || ''}
            loading='lazy'
            className='h-[400px] md:h-[800px] lg:w-[494px] xl:w-[592px] w-full object-cover rounded-xl'
          />
          <div className='flex overflow-x-auto gap-4 lg:w-[592px]'>
            {images.map(({ image_url }, index) => (
              <img
                src={image_url}
                key={image_url + index}
                className={`block shrink-0 rounded-lg h-[120px] w-20 md:h-[190px] md:w-[188px] lg:h-[190px] lg:w-[160px] object-cover cursor-pointer ${
                  index === selectedPicture && 'border-[3px] border-purple'
                }`}
                loading='lazy'
                onClick={() => setSelectedPicture(index)}
              />
            ))}
          </div>
        </>
      ) : (
        <div>No images available</div>
      )}
    </div>
  )
}
