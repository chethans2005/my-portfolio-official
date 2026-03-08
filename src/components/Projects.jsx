import { motion as Motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

function Projects({ projects, onOpen }) {
  return (
    <section id="projects" className="section-shell">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-kicker">Projects</p>
        <h3 className="section-title">What I'm Shipping</h3>
        <p className="section-copy projects-desc">
          AI tools, automation engines, and full-stack apps — click any card to dive deeper.
        </p>
      </Motion.div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <Motion.div
            key={project.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
          >
            <ProjectCard project={project} onOpen={onOpen} />
          </Motion.div>
        ))}
      </div>
    </section>
  )
}

export default Projects
