import NavBar from './NavBar'
import Hero from './Hero'
import Statistics from './Statistics'
import Team from './Team'
import Contact from './Contact'
import Footer from './Footer'

export default function About() {
  return (
    <>
      <NavBar />
      <main className='bg-gradient-to-b from-gray-50 to-[#d2d6db] px-4'>
        <div className='rounded-lg bg-white shadow-2xl sm:px-3 lg:px-24 gap-8'>
          <Hero />
          <Statistics />
          <Team />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  )
}
