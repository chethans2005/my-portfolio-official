import nekoAiScreenshotOne from '../assets/neko-ai-1.png'
import nekoAiScreenshotTwo from '../assets/neko-ai-2.png'
import cliScreenshotOne from '../assets/cli-1.png'
import cliScreenshotTwo from '../assets/cli-2.png'

const defaultScreenshots = [
  {
    src: nekoAiScreenshotOne,
    label: 'Product workspace view',
  },
  {
    src: nekoAiScreenshotTwo,
    label: 'Generated output preview',
  },
]

const projects = [
  {
    id: 'ai-ppt-generator',
    title: 'neko.ai',
    description: 'AI tool that turns prompts into polished slides.',
    technologies: ['Python', 'LLMs', 'FastAPI', 'React'],
    status: 'completed',
    github: 'https://github.com/chethans2005/neko.ai',
    demo: 'https://neko-ai-seven.vercel.app/',
    overview: 'Creates complete decks from prompts with clear structure and flow.',
    problem: 'Manual slide creation is slow and repetitive.',
    solution: 'An LLM pipeline with reusable templates speeds up authoring.',
    screenshots: defaultScreenshots,
  },
  {
    id: 'ai-mesh-generator',
    title: 'messhy.ai',
    description: 'AI system for generating 3D mesh models.',
    technologies: ['Python', 'PyTorch', '3D Processing', 'Node.js'],
    status: 'in-progress',
    github: 'https://github.com/chethans2005/messhy-ai',
    demo: '',
    overview: 'Turns text guidance into 3D mesh candidates for rendering workflows.',
    problem: 'Traditional 3D asset creation is expert-heavy and time-consuming.',
    solution: 'AI generation with cleanup and export tools accelerates asset creation.',
    screenshots: null,
  },
  {
    id: 'automl-system',
    title: 'neko-matic',
    description: 'AutoML pipeline for model selection and tuning.',
    technologies: ['Python', 'scikit-learn', 'MLflow'],
    status: 'in-progress',
    github: 'https://github.com/chethans2005/neko-matic',
    demo: '',
    overview: 'Configurable AutoML stack to benchmark models and tuning in one run.',
    problem: 'Manual model selection and tuning slows experimentation.',
    solution: 'Automates preprocessing, model search, tracking, and reporting.',
    screenshots: null,
  },
  {
    id: 'langbuddy',
    title: 'LangBuddy',
    description: 'Real-time language learning chat platform.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io', 'JWT'],
    status: 'in-progress',
    github: 'https://github.com/chethans2005/LangBuddy',
    demo: '',
    overview: 'Peer-to-peer chat platform connecting users based on language preferences.',
    problem: 'Language learners lack real-time conversational practice with suitable partners.',
    solution: 'Matches users by language tags and enables real-time chat using scalable messaging APIs.',
    screenshots: null,
  },
  {
  id: 'cli-portfolio',
  title: 'CLI Portfolio',
  description: 'Terminal-style interactive developer portfolio.',
  technologies: ['React', 'JavaScript', 'CSS',"three.js, xTerm.js"],
  status: 'completed',
  github: '',
  demo: 'https://cli-portfolio-azure.vercel.app/',
  overview: 'Web-based CLI interface simulating terminal commands to navigate portfolio content.',
  problem: 'Traditional portfolios lack interactivity and uniqueness.',
  solution: 'Implements command-based navigation for projects, skills, and contact information.',
  screenshots: [
    { src: cliScreenshotOne, label: 'Product workspace view' },
    { src: cliScreenshotTwo, label: 'Portfolio' },
  ],
},
{
  id: 'dhcp-system',
  title: 'Custom DHCP Client-Server System',
  description: 'RFC-based DHCP protocol simulation with security features.',
  technologies: ['Python', 'Sockets', 'Networking', 'Cryptography'],
  status: 'completed',
  github: 'https://github.com/chethans2005/Basic-DHCP-Protocol',
  demo: '',
  overview: 'Simulates DHCP protocol including lease management and secure packet handling.',
  problem: 'Understanding and implementing DHCP protocol behavior in real networks is complex.',
  solution: 'Implements full DHCP workflow with lease timers, multi-client handling, and RSA-based packet authentication.',
  screenshots: null,
},
]

export default projects
