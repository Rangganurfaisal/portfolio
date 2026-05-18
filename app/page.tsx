import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

const Divider = () => (
  <div className="max-w-4xl mx-auto px-6">
    <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #243048, transparent)' }} />
  </div>
)

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Experience />
      <Divider />
      <Contact />
      <Footer />
    </>
  )
}
