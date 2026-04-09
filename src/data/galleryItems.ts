export type GalleryItem = Readonly<{
  slug: string;
  src: string;
  title: string;
  category: string;
  year: string;
  longDescription: string;
  detailedNarrative: string[];
  phaseBreakdown: ReadonlyArray<{
    phase: string;
    goal: string;
    execution: string;
    output: string;
  }>;
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
  detailedNarrative: [
    `Initial audit exposed disconnects between brand strategy, campaign execution, and reporting logic. Teams were moving fast, but without a shared decision framework, resulting in duplicated effort and inconsistent output quality.`,
    `A mission-control model was then introduced: shared planning cadence, measurable execution checkpoints, and aligned creative/performance feedback loops. This removed guesswork and replaced reactive work with controlled iteration.`,
    `As implementation matured, decisions shifted from opinion-led to evidence-led. The organization gained stronger strategic coherence, faster launch velocity, and a repeatable operating model that can scale with market complexity.`,
  ],
  phaseBreakdown: [
    {
      phase: "Phase 01 - Diagnose",
      goal: "Identify root-cause performance friction across brand, funnel, and operations.",
      execution: "Conducted audits, stakeholder interviews, and baseline data mapping with a unified scoring framework.",
      output: "Priority matrix, risk map, and actionable constraints list for immediate optimization.",
    },
    {
      phase: "Phase 02 - Rebuild",
      goal: "Re-architect strategy, systems, and execution standards for clarity and scale.",
      execution: "Built message architecture, workflow governance, and channel-specific delivery playbooks.",
      output: "Operational playbook, systemized creative framework, and aligned execution roadmap.",
    },
    {
      phase: "Phase 03 - Relaunch",
      goal: "Deploy the new model with measurable outcomes and controlled scaling.",
      execution: "Launched phased campaigns, monitored KPI signals, and optimized through weekly iteration loops.",
      output: "Improved efficiency, stronger conversion reliability, and sustained growth-ready operations.",
    },
  ],
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
    slug: "experience-abu-dhabi",
    src: "/Experience-Abu-Dhabi/1.png",
    title: "Experience Abu Dhabi",
    category: "Destination Campaign",
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
    ...buildCaseStudyDetails("Experience Abu Dhabi", "Destination Campaign"),
  },
  {
    slug: "leisurescapes",
    src: "/Leisurescapes/1.png",
    title: "Leisurescapes",
    category: "Travel Brand",
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
    ...buildCaseStudyDetails("Leisurescapes", "Travel Brand"),
  },
  {
    slug: "pareed-trading",
    src: "/PAREED-TRADING/1.png",
    title: "PAREED TRADING",
    category: "Commerce Identity",
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
    ...buildCaseStudyDetails("PAREED TRADING", "Commerce Identity"),
  },
  {
    slug: "w2w",
    src: "/W2W/1.png",
    title: "W2W",
    category: "Digital Presence",
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
    ...buildCaseStudyDetails("W2W", "Digital Presence"),
  },
  {
    slug: "desertescapes",
    src: "/desertescapes/1.png",
    title: "Desertescapes",
    category: "Adventure Brand",
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
    ...buildCaseStudyDetails("Desertescapes", "Adventure Brand"),
  },
  {
    slug: "leisurescapes-experience",
    src: "/Leisurescapes/2.png",
    title: "Leisurescapes Experience",
    category: "Campaign System",
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
    ...buildCaseStudyDetails("Leisurescapes Experience", "Campaign System"),
  },
  {
    slug: "abu-dhabi-digital-rollout",
    src: "/Experience-Abu-Dhabi/2.png",
    title: "Abu Dhabi Digital Rollout",
    category: "Brand Rollout",
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
    ...buildCaseStudyDetails("Abu Dhabi Digital Rollout", "Brand Rollout"),
  },
];
