import { motion as Motion } from 'framer-motion'

const aboutCards = [
  {
    title: 'Core Computer Science',
    content: 'Strong in OOP, DSA, networks, operating systems, and system design.',
  },
  {
    title: 'Engineering & Databases',
    content: 'Builds backend services with SQL, MongoDB, Redis, and Neo4j.',
  },
  {
    title: 'AI as a Specialization',
    content: 'Builds ML features, LLM apps, and Hugging Face workflows.',
  },
]

function About() {
  return (
    <section id="about" className="section-shell">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-kicker">About</p>
        <h3 className="section-title">Software Engineering with Strong Fundamentals</h3>
        <p className="section-copy">
          Software engineer focused on full-stack products with strong CS fundamentals and AI specialization.
        </p>
      </Motion.div>

      <div className="about-grid">
        {aboutCards.map((card, index) => (
          <Motion.article
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.45 }}
            className="feature-card"
          >
            <p className="feature-card-index">0{index + 1}</p>
            <h4 className="about-card-title">{card.title}</h4>
            <p className="about-card-text">{card.content}</p>
          </Motion.article>
        ))}
      </div>
    </section>
  )
}

export default About
