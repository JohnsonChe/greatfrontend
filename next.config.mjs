/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  onDemandEntries: {
    // Turn off HMR
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vaqybtnqyonvlwtskzmv.supabase.co',
        pathname: '/storage/v1/object/public/e-commerce-track-images/**/**',
        port: ''
      }
    ]
  }
}

export default nextConfig
