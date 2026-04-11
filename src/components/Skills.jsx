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

const categoryPalette = ['#22d3ee', '#f472b6', '#f59e0b', '#a78bfa', '#34d399', '#60a5fa']

const labels = skillCategories.map((category) => category.label)
const skillScores = skillCategories.map((category) => category.score)

const data = {
  labels,
  datasets: [
    {
      label: 'Skill Level',
      data: skillScores,
      backgroundColor: (context) => {
        const { chart } = context
        const { ctx, chartArea } = chart
        if (!chartArea) {
          return 'rgba(56, 189, 248, 0.2)'
        }
        const gradient = ctx.createLinearGradient(0, chartArea.top, chartArea.right, chartArea.bottom)
        gradient.addColorStop(0, 'rgba(34, 211, 238, 0.34)')
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.18)')
        gradient.addColorStop(1, 'rgba(52, 211, 153, 0.24)')
        return gradient
      },
      borderColor: '#67e8f9',
      borderWidth: 2.5,
      pointBackgroundColor: categoryPalette,
      pointBorderWidth: 2,
      pointBorderColor: '#020617',
      pointRadius: 4.5,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#22d3ee',
    },
    {
      label: 'Reference Line',
      data: new Array(skillCategories.length).fill(75),
      backgroundColor: 'transparent',
      borderColor: 'rgba(148, 163, 184, 0.35)',
      borderDash: [6, 6],
      borderWidth: 1.4,
      pointRadius: 0,
    },
  ],
}

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(2, 6, 23, 0.95)',
      borderColor: 'rgba(148, 163, 184, 0.35)',
      borderWidth: 1,
      titleColor: '#e2e8f0',
      bodyColor: '#cbd5e1',
      padding: 10,
      displayColors: false,
      callbacks: {
        title: (items) => items[0]?.label || '',
        label: (item) => `Confidence: ${item.raw}%`,
      },
    },
  },
  scales: {
    r: {
      angleLines: { color: 'rgba(125, 211, 252, 0.22)' },
      grid: { color: 'rgba(148, 163, 184, 0.18)' },
      pointLabels: {
        color: '#e2e8f0',
        font: {
          size: 11,
          family: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          weight: 600,
        },
      },
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {
        showLabelBackdrop: false,
        color: 'rgba(148, 163, 184, 0.75)',
        z: 10,
        font: {
          size: 10,
        },
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
          className="glass-card radar-shell"
        >
          <div className="radar-container">
            <Radar data={data} options={options} />
          </div>
          <div className="radar-legend">
            {skillCategories.map((category, index) => (
              <div key={category.label} className="radar-legend-item">
                <span className="radar-legend-dot" style={{ backgroundColor: categoryPalette[index] }} />
                <span>{category.label}</span>
              </div>
            ))}
          </div>
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
