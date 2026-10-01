import CompareSlider from './CompareSlider'
import TicketWalkthrough from './TicketWalkthrough'
import ticketPreview from '../assets/ticket-reviewqueue.webp'
import transistorOriginal from '../assets/anomaly-transistor-original.webp'
import transistorOverlay from '../assets/anomaly-transistor-overlay.webp'
import screwOriginal from '../assets/anomaly-screw-original.webp'
import screwOverlay from '../assets/anomaly-screw-overlay.webp'
import zipperOriginal from '../assets/anomaly-zipper-original.webp'
import zipperOverlay from '../assets/anomaly-zipper-overlay.webp'
import carpetOriginal from '../assets/anomaly-carpet-original.webp'
import carpetOverlay from '../assets/anomaly-carpet-overlay.webp'

const auroc = [
  ['screw', 0.8793],
  ['cable', 0.9494],
  ['capsule', 0.9553],
  ['toothbrush', 0.9611],
  ['pill', 0.9697],
  ['transistor', 0.9779],
  ['wood', 0.9912],
  ['hazelnut', 0.9943],
  ['carpet', 0.9968],
  ['zipper', 0.9971],
  ['bottle', 0.9992],
  ['grid', 1.0],
  ['leather', 1.0],
  ['metal_nut', 1.0],
  ['tile', 1.0],
]

const studies = {
  '/projects/ai-ticket-triage': {
    title: 'AI Ticket Triage',
    lead: 'A support pipeline that reads incoming Gmail tickets, classifies them, drafts a reply, and hands anything it is unsure about to a person.',
    repo: 'https://github.com/dixitdevarshi/ai-ticket-triage',
    image: ticketPreview,
    imageAlt: 'AI Ticket Triage human review dashboard',
    facts: [['94%', 'category accuracy'], ['84%', 'urgency accuracy'], ['50', 'labelled evaluation tickets']],
    sections: [
      { heading: 'The problem', text: 'A support ticket carries several signals at once: what the issue is about, how urgent it is, what an attachment contains, and whether an automated reply is safe to send. I wanted a system that takes on the routine work and still shows a human reviewer where it is unsure.' },
      { heading: 'System design', text: 'Gmail events enter through n8n and reach a FastAPI service. Category and urgency are classified independently, attachments are processed first, and the result feeds a drafted response. Tickets with low or medium confidence go to review, and 10% of high-confidence tickets are spot-checked as well. The React dashboard, the REST API and the MCP server all write corrections to the same PostgreSQL-backed workflow.' },
      { heading: 'Attachments', text: 'Product photos can go to the separate DINOv2 + PatchCore anomaly detector. Screenshots are described with vision, text PDFs are parsed directly, and scanned PDFs fall back to Tesseract OCR. URLs are checked before any normal AI processing, and a flagged link skips automated classification and goes straight to security review.' },
      { custom: 'ticket-walkthrough' },
      { heading: 'Infrastructure', text: 'PostgreSQL and Alembic handle persistence and migrations, Docker Compose runs the local stack, and Prometheus and Grafana monitor the API. Pytest covers parsing and attachment logic, GitHub Actions runs CI, and a local Kubernetes setup shows the same API image being orchestrated without changes.' },
      { heading: 'Where it falls short', text: 'It runs against a test inbox, so it has not handled real customer mail. The anomaly detector only knows the 15 MVTec categories, and OCR is capped to keep the demo responsive. Confidence-based review can still miss a prediction that is confidently wrong; the random spot-check lowers that risk but does not remove it.' },
    ],
    stack: ['FastAPI', 'Claude API', 'PostgreSQL', 'React', 'n8n', 'MCP', 'Docker', 'Prometheus', 'Grafana', 'Pytest'],
  },
  '/projects/visual-anomaly-detection': {
    title: 'Visual Anomaly Detection',
    lead: 'Industrial defect detection that trains on normal images only, then scores new images and highlights where they look wrong.',
    repo: 'https://github.com/dixitdevarshi/visual-anomaly-detection',
    facts: [['0.9781', 'mean AUROC'], ['0.9905', 'mean average precision'], ['15 / 15', 'MVTec AD categories']],
    sections: [
      { heading: 'Learning without defect labels', text: 'In inspection settings, normal examples are easy to collect and examples of every possible defect are not. I built the project around that constraint: training sees defect-free images only, yet at inference the system still has to say whether an image is anomalous and where.' },
      { heading: 'Pipeline', text: 'A frozen DINOv2 ViT-B/14 extracts patch-level features from each image. Features from the normal training images form a memory bank, which is reduced with greedy coreset subsampling. At inference each test patch is compared with its nearest normal feature; large distances mark unfamiliar regions, and the patch scores are upsampled into a spatial heatmap.' },
      { heading: 'Why DINOv2 with PatchCore', text: 'DINOv2 provides strong self-supervised visual features without task-specific fine-tuning, and PatchCore gives a memory-based way to compare a new patch against normal appearance. Splitting representation from scoring means no defective examples are needed anywhere in training.' },
      { custom: 'anomaly-compare' },
      { heading: 'Beyond the notebook', text: 'A FastAPI backend serves anomaly scores and heatmaps to a React interface. Docker Compose runs the frontend, API and MLflow, and MLflow records parameters, per-category metrics and artifacts. The PatchCore implementation has 13 unit tests, with CI on every push.' },
      { heading: 'Scope of the results', text: 'Each MVTec category is scored against normal examples from that same category, so these are benchmark numbers. A new manufacturing line would need its own validation data before anyone relies on them.' },
    ],
    stack: ['PyTorch', 'DINOv2', 'PatchCore', 'FastAPI', 'React', 'MLflow', 'Docker', 'Pytest'],
  },
  '/projects/papermind': {
    title: 'PaperMind',
    lead: 'A multilingual document question-answering system: upload PDFs or scanned pages, ask a question in one language or another, and get an answer with the document name and page it came from.',
    repo: 'https://github.com/dixitdevarshi/PaperMind',
    facts: [['0.8824', 'faithfulness'], ['1.0000', 'context precision'], ['50+', 'embedding languages']],
    sections: [
      { heading: 'What it does', text: 'Question answering gets harder when the material spans languages, file types and several documents. PaperMind lets a user upload PDFs or document images, ask a question in one language or another, and receive an answer grounded in the uploaded material, with the document name and page number attached.' },
      { heading: 'Retrieval pipeline', text: 'PyMuPDF handles text documents, while document images can be processed through a vision path. Text is split with LangChain, embedded locally using paraphrase-multilingual-MiniLM-L12-v2 and stored persistently in ChromaDB. Claude generates the final answer from retrieved context, while conversational memory keeps multi-turn questions coherent.' },
      { heading: 'Choosing chunk size', text: 'I compared chunk sizes of 200, 500, 800 and 1200 characters instead of guessing. A 500-character chunk with 100-character overlap gave the best balance on the demo corpus. I also tested multilingual retrieval directly, including German queries that retrieved German GDPR passages without any translation step.' },
      { heading: 'Evaluation', text: 'A custom embedding-based evaluation used 25 manually written question-answer pairs across four public documents. Answer relevancy reached 0.7636, faithfulness 0.8824, context precision 1.0000 and context recall 0.8800. The point was to check whether retrieval and generation stayed grounded in the source material.' },
      { heading: 'GraphRAG did worse', text: 'I added a graph retrieval layer using spaCy named-entity recognition and NetworkX, updated incrementally as documents are ingested. On the same benchmark, dense vector retrieval beat the graph approach on both single-fact and multi-hop questions. Brittle entity matching was the main bottleneck. I left the negative result in.' },
      { heading: 'Serving and monitoring', text: 'FastAPI serves the backend and PDF.js renders the document viewer. Docker handles packaging, and Prometheus with Grafana track request latency, throughput, error rate and uptime. Selecting text in the viewer lets you ask a question about that selection.' },
      { heading: 'Caveats', text: 'The evaluation corpus is small on purpose: four public demo documents. The scores describe this setup and should not be read as a general RAG benchmark. The graph experiment is also a reminder that a more complex retrieval method does not automatically give better answers.' },
    ],
    stack: ['Claude', 'LangChain', 'ChromaDB', 'FastAPI', 'PyMuPDF', 'PDF.js', 'spaCy', 'NetworkX', 'Docker', 'Prometheus', 'Grafana'],
  },
  '/projects/robojec': {
    title: 'RoboJEC',
    lead: 'A voice interview system that adapts its questions to the person speaking and records structured responses for research.',
    repo: 'https://github.com/dixitdevarshi/RoboJEC',
    facts: [['3', 'interview phases'], ['9', 'core interview questions'], ['2025', 'IEEE ICCCMLA publication']],
    sections: [
      { heading: 'Why an adaptive interview', text: 'A fixed questionnaire collects answers, but it cannot react when someone gives an unexpected profession, misunderstands a question or mentions a new interest. RoboJEC explores a more conversational flow that still keeps the session structured enough to save and analyse afterwards.' },
      { heading: 'How a session runs', text: 'The system first listens for a wake signal, then collects the participant\u2019s name, professional context and experience. It conducts six professional questions, discovers a hobby, and follows with three hobby questions. From the second question onward, Claude receives conversation history and can select or generate a question that fits what has already been said.' },
      { heading: 'Speech stack', text: 'Interview responses are transcribed with faster-whisper running locally on CPU, while short utterances can use Google Speech Recognition. pyttsx3 provides offline text-to-speech, and PyAudio plus SpeechRecognition handle microphone input. NLTK and spaCy support name extraction and hobby parsing.' },
      { heading: 'Adaptive questions', text: 'Profession recognition is Claude-first and returns structured information about whether the participant is a student or professional, their field and role, and whether clarification is needed. A rule-based fallback handles API failure. If a participant asks for clarification, the system can rephrase a question; if they ask for repetition, it repeats the same question.' },
      { heading: 'Engagement and timing', text: 'After each response, simple audio features such as volume, zero-crossing rate and silence ratio feed a 0 to 100 engagement score that picks the question difficulty. The system also records the gap between the end of transcription and the first byte of the next spoken question, which is more precise than coarse wall-clock timing.' },
      { heading: 'Research context', text: 'RoboJEC was developed as part of undergraduate research at Jabalpur Engineering College and is connected to the IEEE ICCCMLA 2025 publication \u201cIntelligent Conversational Brain RoboJEC: A Personality Conversation System.\u201d Interview responses and timing data are stored in CSV and JSON for later analysis.' },
      { heading: 'Constraints', text: 'Parts of the conversation depend on microphone quality, speech recognition accuracy and an external LLM API. The engagement score is a heuristic built from a few audio features and has not been validated as a psychological measure. The interview itself is a research prototype and should not be used as a clinical or hiring assessment.' },
    ],
    stack: ['Python', 'faster-whisper', 'Claude API', 'pyttsx3', 'PyAudio', 'SpeechRecognition', 'spaCy', 'NLTK'],
  },
}

function AnomalyCompare() {
  return (
    <section className="case-section">
      <h2>Four real results</h2>
      <p>
        Each pair below is a genuine held-out test image, not a mockup.
        Drag the handle to reveal the heatmap PatchCore produced for it.
      </p>
      <CompareSlider original={transistorOriginal} overlay={transistorOverlay} alt="Transistor with a burnt component" score="39.63" label="Transistor, burnt component" />
      <CompareSlider original={screwOriginal} overlay={screwOverlay} alt="Screw with tip damage" score="37.99" label="Screw, tip damage" />
      <CompareSlider original={zipperOriginal} overlay={zipperOverlay} alt="Zipper with a broken tooth" score="44.95" label="Zipper, broken tooth" />
      <CompareSlider original={carpetOriginal} overlay={carpetOverlay} alt="Carpet with a pulled thread" score="49.05" label="Carpet, pulled thread" />

      <p className="compare-caption">
        Screw is the hardest of the 15 categories, 0.8793 AUROC against a
        mean of 0.9781, and the example above shows why: the defect is
        small and sits against a low-texture background, so the heatmap
        is fainter than on the other three.
      </p>

      <table className="auroc-table">
        <thead>
          <tr><th>Category</th><th>AUROC</th></tr>
        </thead>
        <tbody>
          {auroc.map(([cat, score]) => (
            <tr key={cat} className={score < 0.95 ? 'is-low' : ''}>
              <td>{cat.replace('_', ' ')}</td>
              <td>{score.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default function CaseStudy({ path }) {
  const study = studies[path]
  if (!study) return null
  return (
    <>
      <header className="case-header">
        <div className="container case-nav">
          <a className="brand" href="/">DD</a>
          <a className="text-link" href="/#projects" onClick={() => sessionStorage.setItem('return-to-projects', '1')}>&larr; Back to projects</a>
        </div>
      </header>
      <main className="case-study">
        <section className="case-hero container">
          <h1>{study.title}</h1>
          <p className="case-lead">{study.lead}</p>
          <div className="case-actions">
            <a className="button button-primary" href={study.repo} target="_blank" rel="noreferrer">View repository</a>
          </div>
        </section>
        {study.image && (
          <div className="container case-visual">
            <img src={study.image} alt={study.imageAlt} />
          </div>
        )}
        <section className="container case-facts" aria-label="Project results">
          {study.facts.map(([value, label]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </section>
        <div className="container case-body">
          <div className="case-sections">
            {study.sections.map((item, i) => {
              if (item.custom === 'ticket-walkthrough') return <TicketWalkthrough key={i} />
              if (item.custom === 'anomaly-compare') return <AnomalyCompare key={i} />
              return (
                <section key={item.heading} className="case-section">
                  <h2>{item.heading}</h2>
                  <p>{item.text}</p>
                </section>
              )
            })}
          </div>
          <aside className="case-stack">
            <p className="case-stack-label">Stack</p>
            {study.stack.map((item) => <span key={item}>{item}</span>)}
          </aside>
        </div>
        <section className="container case-end">
          <p>The code, setup instructions and documentation are in the repository.</p>
          <a className="text-link" href={study.repo} target="_blank" rel="noreferrer">Open on GitHub <span aria-hidden="true">&#8599;</span></a>
        </section>
      </main>
    </>
  )
}
