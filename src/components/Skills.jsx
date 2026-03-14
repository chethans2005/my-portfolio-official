import { motion as Motion } from 'framer-motion'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const skillCategories = [
  {
    label: 'Programming Languages',
    score: 91,
    details: 'Python, Java, JavaScript, C',
  },
  {
    label: 'Core Computer Science',
    score: 90,
    details: 'OOP, DSA, networks, operating systems, system design',
  },
  {
    label: 'Databases',
    score: 88,
    details: 'SQL, MongoDB, Redis, Neo4j, plus modeling and query tuning',
  },
  {
    label: 'Web Development',
    score: 92,
    details: 'JavaScript, React, Node.js, REST APIs, frontend and backend',
  },
  {
    label: 'AI / Machine Learning',
    score: 87,
    details: 'ML, deep learning, LLM apps, Hugging Face, model integration',
  },
  {
    label: 'Tools',
    score: 86,
    details: 'Git, Linux, API integration, debugging, optimization',
  },
]

const labels = skillCategories.map((category) => category.label)
const skillScores = skillCategories.map((category) => category.score)

const data = {
  labels,
  datasets: [
    {
      label: 'Skill Level',
      data: skillScores,
      backgroundColor: 'rgba(56, 189, 248, 0.18)',
      borderColor: 'rgba(139, 92, 246, 0.9)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(56, 189, 248, 1)',
      pointBorderColor: '#0F172A',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(139, 92, 246, 1)',
    },
  ],
}

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    r: {
      angleLines: { color: 'rgba(148, 163, 184, 0.25)' },
      grid: { color: 'rgba(148, 163, 184, 0.22)' },
      pointLabels: {
        color: '#cbd5e1',
        font: {
          size: 12,
          family: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        },
      },
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {
        display: false,
        stepSize: 20,
      },
    },
  },
  maintainAspectRatio: false,
}

function Skills() {
  return (
    <section id="skills" className="section-shell">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-kicker">Skills</p>
        <h3 className="section-title">Technical Skills by Category</h3>
      </Motion.div>

      <div className="skills-grid">
        <Motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass-card radar-container"
        >
          <Radar data={data} options={options} />
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="glass-card"
        >
          <p className="snapshot-kicker">Capability Snapshot</p>
          <h4 className="snapshot-title">Balanced Engineering Coverage</h4>
          <p className="snapshot-desc">
            Strong across CS, full-stack systems, and AI/ML.
          </p>

          <div className="skill-bars">
            {skillCategories.map((category, index) => (
              <div key={category.label}>
                <div className="skill-bar-label">
                  <span>{category.label}</span>
                  <span>{category.score}%</span>
                </div>
                <div className="skill-bar-track">
                  <Motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${category.score}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className="skill-bar-fill"
                  />
                </div>
                <p className="skill-bar-note">{category.details}</p>
              </div>
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  )
}

export default Skills
