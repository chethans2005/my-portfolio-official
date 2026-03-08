import { motion as Motion } from 'framer-motion'

const STATUS = {
  'completed':   { label: 'Completed',   chip: 'status-chip-completed' },
  'in-progress': { label: 'In Progress', chip: 'status-chip-progress'  },
}

function ProjectCard({ project, onOpen }) {
  const s = STATUS[project.status] || STATUS['in-progress']

  return (
    <Motion.article
      onClick={() => onOpen(project)}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="project-card-shell project-card-compact"
    >
      <div className="project-card-accent" />

      {/* status */}
      <div className="status-row">
        <span className={`status-chip ${s.chip}`}>
          <span className="status-chip-dot" />
          {s.label}
        </span>
      </div>

      {/* title + description */}
      <h4 className="card-title">
        {project.title}
      </h4>
      <p className="card-desc">
        {project.description}
      </p>

      {/* tech chips */}
      <div className="card-chips">
        {project.technologies.map((tech) => (
          <span key={tech} className="chip chip-sm">{tech}</span>
        ))}
      </div>

      {/* CTA */}
      <p className="card-cta">
        View Details
        <svg className="card-cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </p>
    </Motion.article>
  )
}

export default ProjectCard
