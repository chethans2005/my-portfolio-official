import { useEffect, useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import Particles from 'react-particles'
import { loadSlim } from 'tsparticles-slim'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import ProjectModal from './pages/ProjectModal'
import projects from './data/projects'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [enableDecor, setEnableDecor] = useState(false)

  useEffect(() => {
    const updateDecorPreference = () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches
      const saveData = Boolean(navigator.connection?.saveData)
      setEnableDecor(!(reduceMotion || coarsePointer || saveData))
    }

    updateDecorPreference()

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerQuery = window.matchMedia('(pointer: coarse)')

    reduceMotionQuery.addEventListener('change', updateDecorPreference)
    pointerQuery.addEventListener('change', updateDecorPreference)

    return () => {
      reduceMotionQuery.removeEventListener('change', updateDecorPreference)
      pointerQuery.removeEventListener('change', updateDecorPreference)
    }
  }, [])

  const particlesInit = async (engine) => {
    await loadSlim(engine)
  }

  const particlesOptions = useMemo(
    () => ({
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        color: { value: ['#38BDF8', '#8B5CF6'] },
        links: {
          color: '#334155',
          distance: 130,
          enable: true,
          opacity: 0.35,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'bounce' },
          random: false,
          speed: 1,
          straight: false,
        },
        number: { density: { enable: true, area: 900 }, value: 46 },
        opacity: { value: 0.45 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.55 } },
        },
      },
    }),
    [],
  )

  const scrollTo = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app-wrapper">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <CustomCursor enabled={enableDecor} />
      {enableDecor && <div className="bg-orb bg-orb-one" />}
      {enableDecor && <div className="bg-orb bg-orb-two" />}

      {/* 3D molecule decorations */}
      {enableDecor && (
        <>
          <div className="molecule molecule-1">
            <div className="molecule-bond mb-1" />
            <div className="molecule-bond mb-2" />
            <div className="molecule-bond mb-3" />
            <div className="molecule-bond mb-4" />
            <div className="molecule-node mn-1" />
            <div className="molecule-node mn-2" />
            <div className="molecule-node mn-3" />
            <div className="molecule-node mn-4" />
          </div>
          <div className="molecule molecule-2">
            <div className="molecule-bond mb-1" />
            <div className="molecule-bond mb-2" />
            <div className="molecule-bond mb-3" />
            <div className="molecule-bond mb-4" />
            <div className="molecule-node mn-1" />
            <div className="molecule-node mn-2" />
            <div className="molecule-node mn-3" />
            <div className="molecule-node mn-4" />
          </div>
          <div className="molecule molecule-3">
            <div className="molecule-bond mb-1" />
            <div className="molecule-bond mb-2" />
            <div className="molecule-bond mb-3" />
            <div className="molecule-bond mb-4" />
            <div className="molecule-node mn-1" />
            <div className="molecule-node mn-2" />
            <div className="molecule-node mn-3" />
            <div className="molecule-node mn-4" />
          </div>
          <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="particles-layer" />
        </>
      )}

      <header className="app-header">
        <nav className="navbar-inner">
          <h1 className="navbar-logo">CS<span className="logo-accent">.</span></h1>
          <ul className="navbar-links">
            {['about', 'skills', 'projects', 'contact'].map((id) => (
              <li key={id}>
                <button onClick={() => scrollTo(id)} className="nav-link">
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              </li>
            ))}
            <li>
              <a className="nav-link" href="/resume.pdf" target="_blank" rel="noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-main" id="main-content" tabIndex={-1}>
        <Hero onViewProjects={() => scrollTo('projects')} onContact={() => scrollTo('contact')} resumeHref="/resume.pdf" />

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="section-enter"
        >
          <About />
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="section-enter"
        >
          <Skills />
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="section-enter"
        >
          <Projects projects={projects} onOpen={setSelectedProject} />
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="section-enter"
        >
          <Contact />
        </Motion.div>
      </main>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}

export default App
