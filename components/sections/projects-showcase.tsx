'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Project {
  id: string
  title: string
  category: string
  shortDescription: string
  fullDescription: string
  technologies: string[]
  architecture: string
  deployment: string
  rationale: string
  githubUrl?: string
  liveUrl?: string
  metrics?: { label: string; value: string }[]
  status: 'live' | 'beta' | 'development' | 'archived'
}

const projects: Project[] = [
  {
    id: 'complyr',
    title: 'Complyr',
    category: 'AI Compliance Platform',
    shortDescription: 'Automated compliance management system for regulated Swiss industries.',
    fullDescription: 'A comprehensive compliance automation platform designed specifically for Swiss regulated industries. The system leverages AI to automate policy checks, audit trail generation, and regulatory reporting.',
    technologies: [
      'Next.js 14 (App Router)',
      'TypeScript',
      'PostgreSQL (Supabase)',
      'OpenAI GPT-4 API',
      'Tailwind CSS',
      'Framer Motion',
      'Vercel Edge Functions',
    ],
    architecture: 'Serverless architecture with edge computing for low-latency AI inference. Multi-tenant design with row-level security in PostgreSQL. Event-driven microservices for async processing.',
    deployment: 'Deployed on Vercel with global edge network. Database hosted on Supabase with automated backups. CI/CD via GitHub Actions with automated testing and deployment pipelines.',
    rationale: 'Chose Next.js for its superior developer experience and built-in optimizations. Supabase provides PostgreSQL with real-time subscriptions essential for collaborative features. Edge functions minimize AI API latency.',
    status: 'beta',
    metrics: [
      { label: 'Processing Time', value: '-85%' },
      { label: 'Accuracy', value: '99.2%' },
    ],
  },
  {
    id: 'foundation-backoffice',
    title: 'Foundation Backoffice',
    category: 'Process Automation',
    shortDescription: 'Document processing and workflow automation for a Swiss foundation.',
    fullDescription: 'End-to-end backoffice automation system handling document ingestion, data extraction, approval workflows, and reporting. Reduced manual processing time by 85%.',
    technologies: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Azure Cognitive Services',
      'React',
    ],
    architecture: 'Modular monolith with clear domain boundaries. Async task processing with Celery and Redis. Document processing pipeline with OCR and NLP stages. RESTful API with OpenAPI documentation.',
    deployment: 'Containerized deployment on Azure Container Instances. Managed PostgreSQL on Azure Database. Redis Cache for session management and task queues.',
    rationale: 'Python ecosystem excels at document processing and ML integration. FastAPI provides high performance with automatic API documentation. Azure services chosen for enterprise compliance requirements.',
    status: 'live',
    metrics: [
      { label: 'Cost Reduction', value: '-40%' },
      { label: 'Processing Time', value: '-85%' },
    ],
  },
  {
    id: 'luxury-analytics',
    title: 'Luxury Analytics Dashboard',
    category: 'Data Visualization',
    shortDescription: 'Real-time analytics and reporting for a Swiss luxury brand.',
    fullDescription: 'Interactive analytics platform providing real-time insights into sales, inventory, and customer behavior. Features customizable dashboards and automated report generation.',
    technologies: [
      'React',
      'TypeScript',
      'D3.js',
      'Apache ECharts',
      'Node.js',
      'ClickHouse',
      'GraphQL',
    ],
    architecture: 'Frontend-heavy SPA with GraphQL API layer. Columnar database (ClickHouse) for analytical queries. Real-time data pipeline with WebSocket subscriptions. Modular chart components with D3 primitives.',
    deployment: 'Frontend on Vercel CDN. API server on AWS ECS. ClickHouse cluster on AWS managed service. CloudFront for global content delivery.',
    rationale: 'ClickHouse chosen for sub-second analytical queries on large datasets. D3 provides maximum visualization flexibility. GraphQL reduces over-fetching and enables precise data requirements.',
    status: 'live',
    metrics: [
      { label: 'Query Speed', value: '<100ms' },
      { label: 'Data Volume', value: '10M+ rows' },
    ],
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Website',
    category: 'Personal Project',
    shortDescription: 'This website - a showcase of modern web development techniques.',
    fullDescription: 'A performant, accessible portfolio website featuring advanced CSS techniques, WebGL shaders, and progressive enhancement. Built to demonstrate modern frontend engineering capabilities.',
    technologies: [
      'Next.js 14',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Three.js',
      'WebGL',
      'Vercel',
    ],
    architecture: 'Static site generation with ISR for optimal performance. Component-based architecture with strict TypeScript typing. CSS-in-JS via Tailwind with custom design tokens. Progressive enhancement for accessibility.',
    deployment: 'Static export to Vercel Edge Network. Image optimization via Next.js Image component. Automated Lighthouse CI for performance monitoring.',
    rationale: 'Next.js provides optimal performance metrics out of the box. Static generation ensures fast global load times. WebGL effects progressively enhanced for capable devices.',
    status: 'live',
    metrics: [
      { label: 'Lighthouse', value: '100/100' },
      { label: 'Load Time', value: '<1s' },
    ],
  },
]

function StatusBadge({ status }: { status: Project['status'] }) {
  const styles = {
    live: 'bg-green-500/10 text-green-400 border-green-500/20',
    beta: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    development: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    archived: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  }

  return (
    <span className={cn(
      'px-2.5 py-0.5 rounded-full text-xs font-medium border',
      styles[status]
    )}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

function ProjectCard({ project, isExpanded, onToggle }: { 
  project: Project
  isExpanded: boolean
  onToggle: () => void 
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={cn(
        'group relative rounded-xl border border-border/50 bg-bg-secondary/50 overflow-hidden',
        'hover:border-accent/30 transition-colors duration-300',
        isExpanded && 'border-accent/30'
      )}
    >
      <div className="absolute -inset-[1px] bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      <div className="relative p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-sm text-text-tertiary font-mono">{project.category}</p>
          </div>
          
          <motion.button
            onClick={onToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-tertiary/50 hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            <span>{isExpanded ? 'Less' : 'Details'}</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="m6 9 6 6 6-6" />
            </motion.svg>
          </motion.button>
        </div>

        <p className="text-text-secondary mb-4 leading-relaxed">
          {project.shortDescription}
        </p>

        {project.metrics && (
          <div className="flex flex-wrap gap-3 mb-4">
            {project.metrics.map((metric, index) => (
              <div 
                key={index}
                className="px-3 py-1.5 rounded-lg bg-accent/5 border border-accent/10"
              >
                <span className="text-accent font-mono font-semibold">{metric.value}</span>
                <span className="text-text-tertiary text-xs ml-2">{metric.label}</span>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-border/30 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                    Overview
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2.5 py-1 rounded-md bg-bg-tertiary text-text-secondary text-xs font-mono border border-border/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    Architecture
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {project.architecture}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    Deployment
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {project.deployment}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Why These Choices
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {project.rationale}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-tertiary hover:bg-accent/10 text-text-secondary hover:text-accent transition-colors text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-bg-primary hover:bg-accent/90 transition-colors text-sm font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function ProjectsShowcase() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Selected Projects
          </h2>
          <p className="text-text-secondary max-w-2xl leading-relaxed">
            A collection of projects showcasing technical implementation, architectural decisions, 
            and measurable outcomes. Each entry includes detailed technical specifications.
          </p>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggle={() => handleToggle(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsShowcase
