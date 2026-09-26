const ticketScreenshot = 'https://raw.githubusercontent.com/dixitdevarshi/ai-ticket-triage/main/docs/screenshots/ReviewQueue.png'

const studies = {
  '/projects/ai-ticket-triage': {
    kicker: 'Case study',
    title: 'AI Ticket Triage',
    lead: 'A human-in-the-loop support pipeline built to automate the routine parts of ticket handling without pretending uncertainty does not exist.',
    repo: 'https://github.com/dixitdevarshi/ai-ticket-triage',
    image: ticketScreenshot,
    imageAlt: 'AI Ticket Triage human review dashboard',
    facts: [['94%', 'category accuracy'], ['84%', 'urgency accuracy'], ['50', 'labelled evaluation tickets']],
    sections: [
      ['The problem', 'Support tickets mix several signals at once: what the issue is about, how time-sensitive it is, what an attachment contains, and whether an automated response is safe. I wanted the system to automate useful work while still making uncertainty visible to a human reviewer.'],
      ['How I approached it', 'Gmail events enter through n8n and reach a FastAPI service. Category and urgency are classified independently, attachments are processed before classification, and the resulting context is used to draft a response. Low or medium confidence tickets are flagged for review, while 10% of high-confidence tickets are also spot-checked. The React dashboard, REST API and MCP server all write corrections to the same PostgreSQL-backed workflow.'],
      ['Multimodal handling', 'Product photos can be routed to the separate DINOv2 + PatchCore anomaly detector, screenshots are described with vision, text PDFs are parsed directly, scanned PDFs fall back to Tesseract OCR, and URLs are checked before normal AI processing. A flagged link bypasses automated classification and goes straight to security review.'],
      ['What changed after evaluation', 'The first urgency prompt systematically overestimated urgency. On the same 50-ticket evaluation set, explicit tier definitions and a default-to-low calibration instruction raised urgency accuracy from 64% to 84%. Category accuracy reached 94%. That feedback loop became a more important part of the project than simply getting the first version running.'],
      ['Engineering around the model', 'The system uses PostgreSQL and Alembic for persistence and migrations, Docker Compose for the local stack, Prometheus and Grafana for API monitoring, pytest for parsing and attachment logic, and GitHub Actions for CI. A local Kubernetes setup demonstrates how the API image can be orchestrated without changing the application image.'],
      ['Limitations', 'This is a portfolio system, not a production help desk. The Gmail integration uses a test inbox, the anomaly detector is limited to the 15 MVTec categories, OCR is capped for demo performance, and confidence-based review cannot guarantee that a confidently wrong prediction will be caught. The random high-confidence spot-check reduces that risk rather than eliminating it.'],
    ],
    stack: ['FastAPI', 'Claude API', 'PostgreSQL', 'React', 'n8n', 'MCP', 'Docker', 'Prometheus', 'Grafana', 'Pytest'],
  },
  '/projects/visual-anomaly-detection': {
    kicker: 'Case study',
    title: 'Visual Anomaly Detection',
    lead: 'Unsupervised industrial defect detection that learns only from normal examples, then scores and localizes visual deviations at inference time.',
    repo: 'https://github.com/dixitdevarshi/visual-anomaly-detection',
    facts: [['0.9781', 'mean AUROC'], ['0.9905', 'mean average precision'], ['15 / 15', 'MVTec AD categories']],
    sections: [
      ['The problem', 'In many inspection settings, normal examples are easy to collect while representative examples of every possible defect are not. I built the project around that constraint: training sees defect-free images only, but inference still needs to say whether an image is anomalous and where the anomaly is.'],
      ['How it works', 'A frozen DINOv2 ViT-B/14 extracts patch-level features from each image. Features from normal training images form a memory bank that is reduced with greedy coreset subsampling. At inference, each test patch is compared with its nearest normal feature. Large distances indicate unfamiliar regions, and the patch scores are upsampled into a spatial heatmap.'],
      ['Why DINOv2 + PatchCore', 'The approach separates representation learning from anomaly scoring. DINOv2 supplies strong self-supervised visual features without task-specific fine-tuning, while PatchCore provides a memory-based way to compare a new patch with normal visual patterns. That keeps the training requirement aligned with the problem: no defective examples are needed.'],
      ['Evaluation', 'The pipeline was evaluated across all 15 MVTec AD categories. The aggregate result is 0.9781 mean AUROC with 0.0316 standard deviation and 0.9905 mean average precision. The repository also includes qualitative heatmaps for defects such as a burnt transistor component, screw tip damage, a broken zipper tooth and a pulled carpet thread.'],
      ['From experiment to application', 'The project is not only a notebook. A FastAPI backend serves anomaly scores and heatmaps to a React interface, Docker Compose runs the frontend, API and MLflow services, and MLflow records parameters, per-category metrics and artifacts. The PatchCore implementation is covered by 13 unit tests with CI on every push.'],
      ['Limitations', 'Each MVTec category uses normal examples from that category, so this is not an arbitrary open-world defect detector. Results are benchmark results on MVTec AD and should not be read as guaranteed performance on a new manufacturing domain without representative validation data.'],
    ],
    stack: ['PyTorch', 'DINOv2', 'PatchCore', 'FastAPI', 'React', 'MLflow', 'Docker', 'Pytest'],
  },
  '/projects/papermind': {
    kicker: 'Case study',
    title: 'PaperMind',
    lead: 'A multilingual document intelligence system for asking grounded questions across PDFs and scanned documents, with source attribution and retrieval experiments that test what actually works.',
    repo: 'https://github.com/dixitdevarshi/PaperMind',
    facts: [['0.8824', 'faithfulness'], ['1.0000', 'context precision'], ['50+', 'embedding languages']],
    sections: [
      ['The problem', 'Document question answering becomes harder when the source material spans languages, file types and multiple documents. PaperMind was built so a user can upload PDFs or document images, ask a question in one language or another, and receive an answer grounded in the uploaded material with the document name and page number attached.'],
      ['Retrieval pipeline', 'PyMuPDF handles text documents, while document images can be processed through a vision path. Text is split with LangChain, embedded locally using paraphrase-multilingual-MiniLM-L12-v2 and stored persistently in ChromaDB. Claude generates the final answer from retrieved context, while conversational memory keeps multi-turn questions coherent.'],
      ['Testing the RAG design', 'Rather than choosing retrieval settings by intuition, I compared chunk sizes of 200, 500, 800 and 1200 characters. A 500-character chunk with 100-character overlap gave the best practical balance for the demo corpus. I also checked multilingual retrieval directly, including German queries retrieving German GDPR passages without a translation step.'],
      ['Evaluation', 'A custom embedding-based evaluation used 25 manually created question-answer pairs across four public documents. Answer relevancy reached 0.7636, faithfulness 0.8824, context precision 1.0000 and context recall 0.8800. The goal was not just to make answers look plausible, but to measure whether retrieval and generation stayed grounded in the source material.'],
      ['GraphRAG experiment', 'I extended the system with a graph retrieval layer using spaCy named-entity recognition and NetworkX. The graph updates incrementally as documents are ingested. On the same benchmark, dense vector retrieval outperformed the graph approach for both single-fact and multi-hop questions. The graph path suffered from brittle entity matching, making entity resolution the main bottleneck rather than hiding the negative result.'],
      ['Engineering around retrieval', 'PaperMind uses FastAPI for the backend, PDF.js for the document viewer, Docker for packaging, and Prometheus plus Grafana for monitoring request latency, throughput, error rate and uptime. The interface also supports selecting text in the PDF viewer and asking a question about that selection.'],
      ['Limitations', 'The evaluation corpus is intentionally small and based on four public demo documents, so the reported scores are evidence for this setup rather than a universal RAG benchmark. The graph experiment also shows that adding a more complex retrieval method does not automatically improve results.'],
    ],
    stack: ['Claude', 'LangChain', 'ChromaDB', 'FastAPI', 'PyMuPDF', 'PDF.js', 'spaCy', 'NetworkX', 'Docker', 'Prometheus', 'Grafana'],
  },
  '/projects/robojec': {
    kicker: 'Case study',
    title: 'RoboJEC',
    lead: 'A voice-based conversational interview system that adapts its questions to the person speaking and records structured responses for research.',
    repo: 'https://github.com/dixitdevarshi/RoboJEC',
    facts: [['3', 'interview phases'], ['9', 'core interview questions'], ['2025', 'IEEE ICCCMLA publication']],
    sections: [
      ['The problem', 'A fixed questionnaire can collect answers, but it cannot naturally adapt when a person gives an unexpected profession, does not understand a question or reveals a new interest. RoboJEC explores a more conversational interview flow while keeping the session structured enough to save and analyse afterwards.'],
      ['Conversation flow', 'The system first listens for a wake signal, then collects the participant’s name, professional context and experience. It conducts six professional questions, discovers a hobby, and follows with three hobby questions. From the second question onward, Claude receives conversation history and can select or generate a question that fits what has already been said.'],
      ['Speech pipeline', 'Interview responses are transcribed with faster-whisper running locally on CPU, while short utterances can use Google Speech Recognition. pyttsx3 provides offline text-to-speech, and PyAudio plus SpeechRecognition handle microphone input. NLTK and spaCy support name extraction and hobby parsing.'],
      ['Adaptive behaviour', 'Profession recognition is Claude-first and returns structured information about whether the participant is a student or professional, their field and role, and whether clarification is needed. A rule-based fallback handles API failure. If a participant asks for clarification, the system can rephrase a question; if they ask for repetition, it repeats the same question.'],
      ['Engagement and timing', 'After each response, simple audio features such as volume, zero-crossing rate and silence ratio contribute to a 0–100 engagement score used to select question difficulty. The system also records the gap between transcription completion and the first byte of the next spoken question, rather than relying only on coarse wall-clock timing.'],
      ['Research context', 'RoboJEC was developed as part of undergraduate research at Jabalpur Engineering College and is connected to the IEEE ICCCMLA 2025 publication “Intelligent Conversational Brain RoboJEC: A Personality Conversation System.” Interview responses and timing data are stored in CSV and JSON for later analysis.'],
      ['Limitations', 'The system depends on microphone quality, speech-recognition performance and an external LLM API for parts of the conversation logic. Its engagement score is a lightweight heuristic from audio features, not a validated psychological measure, and the interview structure is a research prototype rather than a clinical or hiring assessment.'],
    ],
    stack: ['Python', 'faster-whisper', 'Claude API', 'pyttsx3', 'PyAudio', 'SpeechRecognition', 'spaCy', 'NLTK'],
  },

}

export default function CaseStudy({ path }) {
  const study = studies[path]
  if (!study) return null
  return (
    <>
      <header className="case-header">
        <div className="container case-nav">
          <a className="brand" href="/">DD</a>
          <a className="text-link" href="/#projects">Back to projects <span aria-hidden="true">↗</span></a>
        </div>
      </header>
      <main className="case-study">
        <section className="case-hero container">
          <p className="section-kicker">{study.kicker}</p>
          <h1>{study.title}</h1>
          <p className="case-lead">{study.lead}</p>
          <div className="case-actions"><a className="button primary" href={study.repo} target="_blank" rel="noreferrer">View repository</a></div>
        </section>
        {study.image && <div className="container case-visual"><img src={study.image} alt={study.imageAlt} /></div>}
        <section className="container case-facts" aria-label="Project results">
          {study.facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </section>
        <div className="container case-body">
          <div className="case-sections">
            {study.sections.map(([heading, text]) => <section key={heading} className="case-section"><h2>{heading}</h2><p>{text}</p></section>)}
          </div>
          <aside className="case-stack"><p className="section-kicker">Stack</p>{study.stack.map(item => <span key={item}>{item}</span>)}</aside>
        </div>
        <section className="container case-end"><p>Want the implementation details?</p><a className="text-link" href={study.repo} target="_blank" rel="noreferrer">Open the GitHub repository <span aria-hidden="true">↗</span></a></section>
      </main>
    </>
  )
}
