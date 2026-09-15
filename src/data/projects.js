const projects = [
  {
    name: 'AI Ticket Triage System',
    description:
      'Automated support ticket pipeline. n8n watches a live Gmail inbox, FastAPI classifies topic and urgency independently via the Claude API and drafts replies, with a React dashboard and MCP server for human review and correction.',
    metricValue: '84%',
    metricLabel: 'urgency accuracy, up from 64%',
    tech: ['n8n', 'FastAPI', 'Claude API', 'PostgreSQL', 'React', 'PyTorch', 'Docker'],
    href: 'https://github.com/dixitdevarshi/ai-ticket-triage',
    details: [
      'n8n monitors a live Gmail inbox; FastAPI classifies topic and urgency independently via the Claude API and drafts replies.',
      'Combines three AI subsystems: a self-trained PatchCore + DINOv2 anomaly model for product photo inspection, Tesseract OCR for scanned documents, and VirusTotal-based link safety checks.',
      'Diagnosed a systematic urgency-estimation bias and built a confidence-based human review and correction feedback loop, improving urgency accuracy from 64% to 84% on a 50-ticket evaluation set.',
      'Containerized with Docker Compose, Alembic migrations, a pytest suite, and GitHub Actions CI, with a React dashboard and MCP server for human review.',
    ],
  },
  {
    name: 'Visual Anomaly Detection',
    description:
      'Unsupervised defect detection using DINOv2 as a frozen backbone and PatchCore memory-bank scoring, with patch-level heatmaps that localize defects on the image. No defect labels required during training.',
    metricValue: '0.9781',
    metricLabel: 'mean AUROC, 15 MVTec AD categories',
    tech: ['PyTorch', 'FastAPI', 'React', 'MLflow', 'Docker'],
    href: 'https://github.com/dixitdevarshi/visual-anomaly-detection',
    details: [
      'DINOv2 ViT-B/14 frozen backbone with PatchCore memory-bank scoring, achieving 0.9781 mean AUROC across all 15 MVTec AD categories with no defect labels required.',
      'Patch-level spatial localization via greedy coreset subsampling and nearest-neighbor distance scoring, producing heatmaps that highlight exact defect locations.',
      'Full-stack deployment: React frontend, FastAPI backend serving base64 heatmap responses, Docker Compose orchestrating all three services with a single command.',
      'MLflow experiment tracking, a Pydantic config model with validated types, 13 pytest unit tests, and CI running automatically on every push.',
    ],
  },
  {
    name: 'PaperMind',
    description:
      'Multi-agent RAG system for document intelligence, with MCP-style tool routing, conversational memory, and a GraphRAG layer benchmarked against standard vector retrieval, retrieving across 50+ languages.',
    metricValue: '0.88',
    metricLabel: 'RAGAS faithfulness score',
    tech: ['LangChain', 'FastAPI', 'ChromaDB', 'Claude API', 'NetworkX', 'Docker'],
    href: 'https://github.com/dixitdevarshi/PaperMind',
    details: [
      'Custom RAGAS evaluation framework on a multilingual ground-truth benchmark: faithfulness 0.88, context precision 1.0, context recall 0.88.',
      'GraphRAG layer built with spaCy NER and NetworkX, benchmarked against standard vector retrieval.',
      'Multi-agent architecture with MCP-style tool routing, agent orchestration, and conversational memory, retrieving across 50+ languages.',
      'FastAPI backend instrumented with Prometheus and Grafana, monitoring p95 latency, throughput, and error rate.',
    ],
  },
  {
    name: 'RoboJEC',
    description:
      'Real-time voice AI assistant with deterministic profession recognition and wake-window filtering. Published at IEEE ICCCMLA 2025. Swapped Whisper large-v3 for faster-whisper to cut response latency.',
    metricValue: '2-4s',
    metricLabel: 'response latency, down from 20-30s',
    tech: ['Python', 'faster-whisper', 'Flask', 'SocketIO'],
    href: 'https://github.com/dixitdevarshi/RoboJEC',
    details: [
      'Real-time voice AI assistant with deterministic profession recognition and wake-window filtering.',
      'Published at IEEE ICCCMLA 2025, co-authored with S. Jain and A. Mishra.',
      'Swapped Whisper large-v3 for faster-whisper, cutting response latency from 20-30 seconds down to 2-4 seconds.',
    ],
  },
]

export default projects