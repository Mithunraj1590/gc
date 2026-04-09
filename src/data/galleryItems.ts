export type GalleryItem = Readonly<{
  slug: string;
  src: string;
  title: string;
  category: string;
  year: string;
  longDescription: string;
  challenge: string;
  objective: string;
  timeline: string;
  modeOfOperation: string[];
  approach: string[];
  outcomes: string[];
  deliverables: string[];
  stack: string[];
  kpis: ReadonlyArray<{
    label: string;
    value: string;
  }>;
}>;

const buildCaseStudyDetails = (title: string, category: string): Omit<GalleryItem, "slug" | "src" | "title" | "category" | "year" | "modeOfOperation" | "approach" | "outcomes"> => ({
  longDescription: `${title} is a full-spectrum transformation case built to prove how disciplined systems outperform one-off campaigns. 
This project combined strategic diagnosis, architecture-level redesign, and execution governance into a single operating model.
The focus was to remove fragmentation, increase organizational clarity, and establish an adaptive growth framework that can sustain change beyond a launch window.
Every phase was measured, stress-tested, and optimized through iterative feedback loops so decisions were based on evidence, not assumptions.
The final system enabled the team to move faster with higher confidence, stronger creative consistency, and measurable commercial impact across key performance layers.`,
  challenge: `${title} faced fragmented execution across channels, inconsistent messaging, and weak feedback loops between strategy and delivery.`,
  objective: `Build a unified ${category.toLowerCase()} operating model that improves decision quality, execution speed, and measurable business outcomes.`,
  timeline: "12-week structured transformation split into Diagnose, Rebuild, and Relaunch phases.",
  deliverables: [
    "Strategic diagnosis report with priority scorecard",
    "Execution playbook aligned to growth stages",
    "Performance dashboard with weekly review protocol",
    "Governance model for cross-team alignment",
  ],
  stack: ["Next.js", "GSAP", "Analytics Instrumentation", "Automation Workflows", "Creative Ops Toolkit"],
  kpis: [
    { label: "Efficiency Gain", value: "+24%" },
    { label: "Execution Speed", value: "+31%" },
    { label: "CAC Improvement", value: "-18%" },
  ],
});

export const galleryItems: GalleryItem[] = [
  {
    slug: "signal-engine",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    title: "Signal Engine",
    category: "Brand Systems",
    year: "2026",
    modeOfOperation: [
      "Weekly diagnostic sprint with stakeholder alignment",
      "Real-time signal tracking dashboard for brand health",
      "Creative and performance teams in one execution loop",
    ],
    approach: [
      "Mapped audience perception gaps across channels",
      "Built a modular messaging architecture by funnel stage",
      "Deployed phased rollout with controlled A/B validation",
    ],
    outcomes: [
      "31% increase in qualified lead volume",
      "22% lower paid CAC after 8 weeks",
      "Clearer positioning consistency across all campaigns",
    ],
    ...buildCaseStudyDetails("Signal Engine", "Brand Systems"),
  },
  {
    slug: "command-panel",
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    title: "Command Panel",
    category: "Interface",
    year: "2025",
    modeOfOperation: [
      "Heuristic UX audits and friction scoring",
      "Prototype test cycles every 72 hours",
      "Cross-functional QA before production rollout",
    ],
    approach: [
      "Prioritized high-friction journeys with loss-risk scoring",
      "Simplified architecture and hierarchy of actions",
      "Introduced conversion prompts at intent peaks",
    ],
    outcomes: [
      "19% improvement in onboarding completion",
      "14% drop in bounce from key landing routes",
      "Faster average task completion time by 27%",
    ],
    ...buildCaseStudyDetails("Command Panel", "Interface"),
  },
  {
    slug: "media-matrix",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    title: "Media Matrix",
    category: "Campaign",
    year: "2026",
    modeOfOperation: [
      "Budget command center with daily pacing controls",
      "Creative testing matrix by audience segment",
      "Automated anomaly alerts for underperforming ad sets",
    ],
    approach: [
      "Segmented audience intent into strategic cohorts",
      "Matched creative variants to channel-native behavior",
      "Scaled only validated winners with guardrails",
    ],
    outcomes: [
      "2.3x ROAS improvement in 60 days",
      "42% increase in campaign consistency score",
      "Reduced waste spend on non-performing placements",
    ],
    ...buildCaseStudyDetails("Media Matrix", "Campaign"),
  },
  {
    slug: "orbit-sequence",
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1400&q=80",
    title: "Orbit Sequence",
    category: "Motion",
    year: "2024",
    modeOfOperation: [
      "Narrative sprints tied to launch milestones",
      "Motion language library and reusable components",
      "Approval pipeline aligned with brand governance",
    ],
    approach: [
      "Defined core visual motifs for recall and continuity",
      "Built modular storyboards for rapid iteration",
      "Mapped motion usage to each funnel stage",
    ],
    outcomes: [
      "Higher content retention across social formats",
      "Improved brand recall in post-campaign surveys",
      "Faster production turnaround via reusable templates",
    ],
    ...buildCaseStudyDetails("Orbit Sequence", "Motion"),
  },
  {
    slug: "vector-grid",
    src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1400&q=80",
    title: "Vector Grid",
    category: "Identity",
    year: "2025",
    modeOfOperation: [
      "Identity audits with consistency scoring",
      "Design system governance and version control",
      "Asset deployment playbook for all teams",
    ],
    approach: [
      "Extracted core brand primitives and rules",
      "Translated principles into scalable visual tokens",
      "Activated system across touchpoints in staged rollout",
    ],
    outcomes: [
      "Unified look-and-feel across all channels",
      "Reduced design production overhead significantly",
      "Higher perceived trust in user testing sessions",
    ],
    ...buildCaseStudyDetails("Vector Grid", "Identity"),
  },
  {
    slug: "fractal-flow",
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    title: "Fractal Flow",
    category: "Digital",
    year: "2026",
    modeOfOperation: [
      "Operational mapping of digital lifecycle",
      "Process instrumentation for performance visibility",
      "Cross-team standups focused on bottleneck removal",
    ],
    approach: [
      "Diagnosed latency points in decision and execution flow",
      "Introduced automation for repetitive workflow stages",
      "Instituted KPI-linked delivery checkpoints",
    ],
    outcomes: [
      "Shorter campaign launch cycle from concept to live",
      "Greater forecasting accuracy for quarterly planning",
      "More stable execution under peak campaign load",
    ],
    ...buildCaseStudyDetails("Fractal Flow", "Digital"),
  },
  {
    slug: "growth-circuit",
    src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1400&q=80",
    title: "Growth Circuit",
    category: "Performance",
    year: "2025",
    modeOfOperation: [
      "Experiment backlog with priority scoring",
      "Weekly growth review and decision cadence",
      "Performance insights fed back into creative planning",
    ],
    approach: [
      "Linked hypotheses to measurable business outcomes",
      "Validated experiments in controlled rollouts",
      "Scaled winning loops into repeatable playbooks",
    ],
    outcomes: [
      "Sustained month-over-month revenue acceleration",
      "Improved efficiency at higher spend levels",
      "Clear operating model for future growth cycles",
    ],
    ...buildCaseStudyDetails("Growth Circuit", "Performance"),
  },
];
