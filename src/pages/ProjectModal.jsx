import { useEffect, useRef } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'

const STATUS = {
  'completed':   { label: 'Completed',   chip: 'status-chip-completed' },
  'in-progress': { label: 'In Progress', chip: 'status-chip-progress'  },
}

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null)

  const screenshots = Array.isArray(project?.screenshots)
    ? project.screenshots.filter((screenshot) => Boolean(screenshot?.src)).slice(0, 2)
    : []

  useEffect(() => {
    if (!project) {
      return undefined
    }

    const previousActive = document.activeElement
    const modalEl = modalRef.current
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ]

    const getFocusable = () =>
      Array.from(modalEl?.querySelectorAll(focusableSelectors.join(',')) || [])

    const focusableElements = getFocusable()
    focusableElements[0]?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const items = getFocusable()
      if (items.length === 0) {
        return
      }

      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previousActive instanceof HTMLElement) {
        previousActive.focus()
      }
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project ? (
        <Motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Motion.div
            initial={{ opacity: 0, scale: 0.92, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 28 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="modal-shell modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            aria-describedby="project-modal-description"
            ref={modalRef}
          >
            {/* Header */}
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-status-row">
                  <span className={`status-chip ${(STATUS[project.status] || STATUS['in-progress']).chip}`}>
                    <span className="status-chip-dot" />
                    {(STATUS[project.status] || STATUS['in-progress']).label}
                  </span>
                </div>
                <h3 id="project-modal-title" className="modal-project-title">{project.title}</h3>
                <p id="project-modal-description" className="modal-project-desc">{project.description}</p>
              </div>
              <button
                className="modal-close"
                onClick={onClose}
                aria-label="Close"
              >
                <svg className="modal-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="modal-divider" />

            {/* Body */}
            <div className="modal-body">
              <div>
                <h4 className="modal-title">Overview</h4>
                <p className="modal-body-text">{project.overview}</p>
              </div>
              <div>
                <h4 className="modal-title">Problem</h4>
                <p className="modal-body-text">{project.problem}</p>
              </div>
              <div>
                <h4 className="modal-title">Solution</h4>
                <p className="modal-body-text">{project.solution}</p>
              </div>
              {screenshots.length > 0 && (
                <div>
                  <h4 className="modal-title">Screenshots</h4>
                  <div className="modal-screenshots">
                    {screenshots.map((screenshot, index) => (
                      <figure key={`${project.id}-screenshot-${index}`} className="modal-screenshot-card">
                        <img
                          className="modal-screenshot-image"
                          src={screenshot.src}
                          alt={`${project.title} screenshot ${index + 1}: ${screenshot.label || 'Preview'}`}
                          loading="lazy"
                        />
                      </figure>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h4 className="modal-title">Tech Stack</h4>
                <div className="modal-chips">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="chip">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-divider" />

            {/* Links */}
            <div className="modal-links">
              {project.github && (
                <a className="project-link" href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  <svg className="icon-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
              )}
              {project.demo && (
                <a className="project-link" href={project.demo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  Live Demo
                </a>
              )}
            </div>
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default ProjectModal
