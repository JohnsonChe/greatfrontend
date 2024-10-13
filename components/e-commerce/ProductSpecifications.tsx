import { useState } from 'react'
import Image from 'next/image'
import {
  RiColorFilterLine,
  RiHandHeartLine,
  RiInfinityFill,
  RiPaintLine,
  RiPlantLine,
  RiPriceTag2Line,
  RiRainbowLine,
  RiRecycleLine,
  RiScales2Line,
  RiShapesLine,
  RiShieldStarLine,
  RiShirtLine,
  RiStackLine,
  RiTShirtLine,
  RiWaterFlashLine,
  RiWindyLine
} from 'react-icons/ri'
import { IconType } from 'react-icons'
import clsx from 'clsx'

type TabValuesType = 'sustainability' | 'comfort' | 'durability' | 'versatility'
type TabType = { text: string; value: TabValuesType }
type TabIconType = { label: string; icon: IconType }
type SpecificationType = {
  value: TabValuesType
  title: string
  description: string
  img: {
    desktop: string
    tablet: string
    mobile: string
  }
  items: TabIconType[]
}

const TABS: TabType[] = [
  { text: 'Sustainability', value: 'sustainability' },
  { text: 'Comfort', value: 'comfort' },
  { text: 'Durability', value: 'durability' },
  { text: 'Versatility', value: 'versatility' }
]

const specifications: SpecificationType[] = [
  {
    value: 'sustainability',
    title: 'Eco-Friendly Choice',
    description:
      'With our sustainable approach, we curate clothing that makes a statement of care—care for the planet, and for the art of fashion.',
    img: {
      desktop:
        'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/product-specifications-section/yellow-desktop.jpg',
      tablet:
        'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/product-specifications-section/yellow-tablet.jpg',
      mobile:
        'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/product-specifications-section/yellow-mobile.jpg'
    },
    items: [
      {
        label: 'Recycled Materials',
        icon: RiRecycleLine
      },
      {
        label: 'Low Impact Dye',
        icon: RiPaintLine
      },
      {
        label: 'Carbon Neutral',
        icon: RiPlantLine
      },
      {
        label: 'Water Conservation',
        icon: RiWaterFlashLine
      }
    ]
  },
  {
    value: 'comfort',
    title: 'Uncompromised Comfort',
    description:
      'Our garments are a sanctuary of softness, tailored to drape gracefully and allow for freedom of movement.',
    img: {
      desktop:
        'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/product-specifications-section/black-desktop.jpg',
      tablet:
        'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/product-specifications-section/black-tablet.jpg',
      mobile:
        'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/product-specifications-section/black-mobile.jpg'
    },
    items: [
      {
        label: 'Ergonomic Fits',
        icon: RiTShirtLine
      },
      {
        label: 'Soft-to-the-Touch Fabrics',
        icon: RiHandHeartLine
      },
      {
        label: 'Breathable Weaves',
        icon: RiWindyLine
      },
      {
        label: 'Thoughtful Design',
        icon: RiColorFilterLine
      }
    ]
  },
  {
    value: 'durability',
    title: 'Built to Last',
    description:
      'Here’s to apparel that you can trust to look as good as new, wear after wear, year after year.',
    img: {
      desktop:
        'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/product-specifications-section/chair-desktop.jpg',
      tablet:
        'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/product-specifications-section/chair-tablet.jpg',
      mobile:
        'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/product-specifications-section/chair-mobile.jpg'
    },
    items: [
      {
        label: 'Reinforced Construction',
        icon: RiStackLine
      },
      {
        label: 'Quality Control',
        icon: RiScales2Line
      },
      {
        label: 'Material Resilience',
        icon: RiShieldStarLine
      },
      {
        label: 'Warranty and Repair',
        icon: RiPriceTag2Line
      }
    ]
  },
  {
    value: 'versatility',
    title: 'Versatile by Design',
    description:
      'Our pieces are a celebration of versatility, offering a range of styles that are as perfect for a business meeting as they are for a casual brunch. ',
    img: {
      desktop:
        'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/product-specifications-section/clothes-desktop.jpg',
      tablet:
        'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/product-specifications-section/clothes-tablet.jpg',
      mobile:
        'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/product-specifications-section/clothes-mobile.jpg'
    },
    items: [
      {
        label: 'Adaptive Styles',
        icon: RiRainbowLine
      },
      {
        label: 'Functional Fashion',
        icon: RiShirtLine
      },
      {
        label: 'Timeless Aesthetics',
        icon: RiInfinityFill
      },
      {
        label: 'Mix-and-Match Potential',
        icon: RiShapesLine
      }
    ]
  }
]

export default function ProductSpecifications() {
  const [selectedTab, setSeletedTab] = useState<TabValuesType>(specifications[0].value)
  const { title, description, img, items } = specifications.find(
    (spec) => spec.value === selectedTab
  )!

  return (
    <div className='py-12 flex xs:flex-col gap-16'>
      <div className='flex xs:flex-col gap-6'>
        <h4 className='font-medium text-3xl'>Discover timeless elegance</h4>
        <p className='text-lg text-neutral-600'>
          Step into a world where quality meets quintessential charm with our collection. Every
          thread weaves a promise of unparalleled quality, ensuring that each garmet is not just a
          part of your wardrobe, but a piece of art. Here&apos;s the essence of what makes our
          apparel the hallmark for those with an eye for excellence and a heart for the environment.
        </p>
      </div>
      <div className='flex xs:flex-col gap-8'>
        <Tabs setSelectedTab={setSeletedTab} selectedTab={selectedTab} />
        <div className='flex flex-col lg:flex-row gap-8'>
          <Image
            src={img.desktop}
            alt={title + ' image'}
            width={100}
            height={100}
            className='lg:max-w-[367px]'
            layout='responsive'
          />
          <div>
            <h5 className='text-2xl'>{title}</h5>
            <p className='text-neutral-600 mt-2'>{description}</p>
            <div className='grid xs:grid-cols-1 md:grid-cols-2 mt-8 gap-4'>
              {items.map((item, index) => (
                <span className='flex gap-2 items-center' key={index}>
                  <item.icon className='text-indigo-700 shadow rounded-full size-12 p-3' />
                  <label className='text-neutral-600 font-light'>{item.label}</label>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Tabs = ({
  setSelectedTab,
  selectedTab
}: {
  setSelectedTab: React.Dispatch<React.SetStateAction<TabValuesType>>
  selectedTab: TabValuesType
}) => {
  return (
    <div className='w-full flex gap-3 overflow-x-auto border-b-2 border-b-neutral-300'>
      {TABS.map((tab, index) => (
        <span
          key={index}
          onClick={() => setSelectedTab(tab.value)}
          className={clsx(
            selectedTab === tab.value
              ? 'text-indigo-700 border-b-2 border-b-indigo-700'
              : 'text-neutral-600',
            'pb-3 px-2 font-medium'
          )}>
          {tab.text}
        </span>
      ))}
    </div>
  )
}
