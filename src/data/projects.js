import nekoAiScreenshotOne from '../assets/neko-ai-1.png'
import nekoAiScreenshotTwo from '../assets/neko-ai-2.png'

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
]

export default projects
