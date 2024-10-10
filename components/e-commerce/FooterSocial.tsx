import { InstagramSVG, FacebookSVG, GithubSVG, TwitterSVG, YoutubeSVG } from './ui/Socials'

export default function FooterSocial() {
  return (
    <div className='flex flex-col md:flex-row gap-8 py-8 border-t border-neutral-200 lg:justify-between lg:w-full'>
      <p className='text-neutral-500'>© 2024 StyleNest, Inc. All rights reserved.</p>
      <ul className='flex gap-6 text-neutral-400'>
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
    </div>
  )
}
