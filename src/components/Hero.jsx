import { motion as Motion } from 'framer-motion'

function Hero({ onViewProjects, onContact }) {
  return (
    <section
      id="hero"
      className="hero-section"
    >
      <div className="hero-grid">
        <Motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hero-left"
        >
          <p className="hero-kicker">software engineer / ai & full stack developer</p>
          <h1 className="hero-name">
            Chethan<span className="hero-name-gradient"> S</span>
          </h1>
          <h2 className="hero-title">Software Engineer | AI &amp; Full Stack Developer</h2>
          <p className="hero-subtitle">
            I build scalable web applications and AI-driven systems with a strong foundation in computer science,
            clean architecture, and production-ready engineering practices.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={onViewProjects}>
              See My Work
            </button>
            <button className="btn-secondary" onClick={onContact}>
              Get In Touch
            </button>
          </div>
        </Motion.div>

        <Motion.aside
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1, duration: 0.65 }}
          className="hero-panel"
        >
          <p className="hero-panel-kicker">Engineering Focus</p>
          <div className="hero-panel-content">
            <div className="hero-feature-row">
              <span className="hero-badge">Core CS</span>
              <p>OOP, DSA, operating systems, computer networks, and system design fundamentals.</p>
            </div>
            <div className="hero-feature-row">
              <span className="hero-badge">Full Stack</span>
              <p>JavaScript, React, Node.js, and REST APIs for scalable frontend and backend systems.</p>
            </div>
            <div className="hero-feature-row">
              <span className="hero-badge">AI/ML</span>
              <p>Machine learning, deep learning, LLM integration, and Hugging Face ecosystem tooling.</p>
            </div>
          </div>
          <div className="hero-metric-grid">
            <div>
              <p className="hero-metric-value">Balanced</p>
              <p className="hero-metric-label">CS + Full Stack + AI</p>
            </div>
            <div>
              <p className="hero-metric-value">Production</p>
              <p className="hero-metric-label">Scalable Engineering</p>
            </div>
          </div>
        </Motion.aside>
      </div>
    </section>
  )
}

export default Hero
