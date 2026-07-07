import { useState, useCallback } from 'react'
import type { Lang } from './data/i18n'
import { useLenis } from './hooks/useLenis'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import ProjectCarousel from './components/ProjectCarousel'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StarField from './components/StarField'

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [loaded, setLoaded] = useState(false)

  useLenis()

  const toggleLang = useCallback(() => {
    setLang((l) => (l === 'en' ? 'es' : 'en'))
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <StarField />
      <CustomCursor />

      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s', position: 'relative', zIndex: 1 }}>
        <Navbar lang={lang} onLangToggle={toggleLang} />

        <main>
          <Hero
            lang={lang}
            onScrollToPortfolio={() => scrollTo('#portfolio')}
            onScrollToContact={() => scrollTo('#contact')}
          />
          <About lang={lang} />
          <Skills lang={lang} />
          <ProjectCarousel lang={lang} />
          <Contact lang={lang} />
        </main>

        <Footer lang={lang} />
      </div>
    </>
  )
}
