import { motion as Motion } from 'framer-motion'

const aboutCards = [
  {
    title: 'Core Computer Science',
    content: 'Strong grounding in object-oriented programming (Java, C++), data structures and algorithms, computer networks, operating systems, and system design concepts.',
  },
  {
    title: 'Engineering & Databases',
    content: 'Experience designing reliable backend services using SQL, MongoDB, Redis, and Neo4j with practical focus on data modeling, indexing, and query optimization.',
  },
  {
    title: 'AI as a Specialization',
    content: 'Builds ML and deep learning features, integrates LLMs with applications, and develops data pipelines and workflows using the Hugging Face ecosystem.',
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
          I am a software engineer who builds robust full-stack products with a balanced profile across computer science fundamentals,
          scalable web engineering, and AI/ML implementation. AI is an area of specialization, built on top of strong core engineering skills.
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
