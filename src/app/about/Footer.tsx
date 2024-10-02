import {
  YoutubeSVG,
  InstagramSVG,
  FacebookSVG,
  GithubSVG,
  TwitterSVG
} from '@components/e-commerce/ui/Socials'
export default function Footer() {
  return (
    <div className='flex flex-col justify-center items-center sm:py-12 md:py-16 lg:py-24 lg:px-80'>
      <ul className='flex gap-6 text-neutral-600'>
        <li>Features</li>
        <li>Pricing</li>
        <li>About us</li>
        <li>Contact</li>
      </ul>
      <ul className='flex gap-6 text-neutral-400 mt-8'>
        <li>
          <YoutubeSVG />
        </li>
        <li>
          <InstagramSVG />
        </li>
        <li>
          <FacebookSVG />
        </li>
        <li>
          <GithubSVG />
        </li>
        <li>
          <TwitterSVG />
        </li>
      </ul>
      <span className='text-neutral-900 mt-4'>© 2024 Abstractly, Inc. All rights reserved.</span>
    </div>
  )
}
