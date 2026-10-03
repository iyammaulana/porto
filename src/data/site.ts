// Single source of truth for all copy on the site.
// Sourced from the CV, certificates, and the project documents in "referensi project/".
// Follow DESIGN.md: no em dashes in copy, every claim carries a number or a named system.
// Internal system names are intentionally left out. Keep it that way when editing.

export const profile = {
  name: "Norma Irkham Maulana",
  // Positioning title for the hero and page title. The official title at the
  // bank stays in the Experience entry below.
  role: "RPA and Automation Engineer",
  // Second line under the title: the areas of work, then where.
  specialties: ["UiPath", "Laravel", "API integration", "AI gateway"],
  company: "PT Bank Mega",
  // Hero. The headline is set in page.tsx because "hours" is struck through.
  description:
    "RPA and automation engineer, six years at PT Bank Mega, UiPath Certified. Bank operations are full of work that is repetitive, time-bound, and unforgiving of mistakes: journals, settlements, disputes, regulatory reports. I have been turning that work into automation that runs on its own, from the first walkthrough with the business team to support in production: more than 100 UiPath robots and the Laravel systems that run the operation around them. Ten people on the dispute desk became four. Daily settlements that took an hour and a half take twenty minutes. And about 100 developers, analysts, and testers now use AI at work safely, through the gateway I built.",
  proof: [
    "100+ robots in production",
    "1–2 h → 3–10 min per process",
    "100% process accuracy",
    "2nd place, ICStar RPA Hackathon 2020",
  ],
  focus: [
    "RPA: UiPath, REFramework, Orchestrator",
    "Web apps: Laravel",
    "Core banking: AS400, Open API",
    "AI: Bifrost, Claude Code",
  ],
  // Fact tiles under the hero, one per area of work: large value, small label.
  facts: [
    { value: "100+", label: "robots in production" },
    { value: "250K+", label: "transactions reconciled per day" },
    { value: "~100", label: "users on the AI gateway" },
  ],
  // Soft invitation in the Contact section. No "open to work" wording anywhere on the site.
  contactNote: "Happy to talk about automation.",
  location: "Jakarta, Indonesia",
  email: "normairkhamm@gmail.com",
  linkedin: "https://linkedin.com/in/norma-irkham-maulana",
  linkedinLabel: "linkedin.com/in/norma-irkham-maulana",
  summary: [
    "I build automation for banking operations: unattended UiPath robots, the Laravel web apps where people approve what the robots produce, integrations with core banking, and an AI gateway for the bank's developers.",
    "Over five years that adds up to more than 100 robots in production. Processes that took 1–2 hours by hand now run in 3–10 minutes.",
  ],
};

export type Actor = "ROBOT" | "HUMAN" | "SYSTEM";

export type Project = {
  slug: string;
  title: string;
  kind: "RPA" | "RPA + Web app" | "Integration" | "AI platform";
  // Featured processes lead the home page with role, outcome, and a log excerpt.
  featured?: boolean;
  outcome?: string;
  summary: string;
  role: string;
  since?: string;
  status: "RUNNING" | "PILOT";
  statusNote?: string;
  // One row in the process registry on the home page.
  registry: { trigger: string; runs: string; result: string };  spec: { label: string; value: string }[];
  results: { measure: string; before?: string; after: string }[];
  // How the numbers above were measured, shown under the results.
  resultsNote?: string;
  context: string;
  // Short case-study format for the project page. When present, the page shows
  // only: summary, results, problem, what I built, one flow, hard parts, role, stack.
  story?: {
    problem: string;
    built: { title: string; body: string; icon?: "robot" | "web"; rows?: [string, string][] }[];
    // Optional: one short flow, for systems that really have a single path.
    flow?: { actor: Actor; branch?: string; text: string }[];
    // The process as a chain of stages, drawn left to right.
    pipeline?: { title?: string; stages: string[] };
  };
  // Lanes or modules the system covers, shown as a table.
  lanes?: { lane: string; counterpart: string; released: string }[];
  built?: string[];
  // When set, robots and process log are shown together under this heading.
  logLabel?: string;
  logIntro?: string;
  // A second named part of the system, described in blocks of text or two-column rows.
  part?: { title: string; intro: string; blocks?: { title: string; body?: string; rows?: [string, string][] }[] };
  robots?: { name: string; body: string }[];
  logs: { title?: string; steps: { actor: Actor; branch?: string; text: string }[] }[];
  logNote?: string;
  exceptions?: { type: "BUSINESS" | "SYSTEM"; when: string; then: string }[];
  decisions?: { title: string; body: string }[];
  note?: string;
  stack: string[];
  // Same items as `stack`, grouped for reading. When present, the page shows the groups.
  stackGroups?: { group: string; items: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "dispute-resolution-system",
    featured: true,
    outcome: "Ten people on the dispute desk became four, and a transaction that took an hour takes 10 minutes.",
    title: "Dispute Resolution System",
    kind: "RPA + Web app",
    summary:
      "Dispute handling for BI-Fast, ATM, and credit card in one system. A maker robot and a checker robot work BI-Fast and ATM tickets on third-party portals around the clock. Credit card cases, the largest share, run through maker queues, approval, and automatic posting. It replaced a 10-person manual operation.",
    role: "Individual contributor: process analysis, design, development, maintenance",
    since: "2023",
    status: "RUNNING",
    statusNote: "Lanes released 2023–2025. QR disputes in development.",
    registry: { trigger: "Portal poll + API", runs: "24/7", result: "1 h → 10 min" },    spec: [
      { label: "Trigger", value: "Polling third-party portals (incoming), call center API (outgoing)" },
      { label: "Runs", value: "24/7" },
      { label: "Robots", value: "Maker and checker robots on the portals, and a terminal robot on AS400 for credit card fraud reports" },
      { label: "Build time", value: "About 1 month per dispute lane, 7 weeks for credit card" },
    ],
    results: [
      { measure: "People on the dispute desk", before: "10", after: "4" },
      { measure: "Average time per transaction", before: "1 h", after: "10 min" },
    ],
    story: {
      problem:
        "Ten people handled disputes by hand, about an hour per transaction: open the portal, find the transaction, check it against reconciliation data, update the ticket, prepare the posting. The work was slow and open to human error. Every ticket on the portals also carries a deadline, and a late response means a reprimand and a fine, so claims need an answer faster than a manual team can give.",
      built: [
        {
          title: "Robots (UiPath)",
          icon: "robot",
          body: "Maker and checker robots work the dispute tickets on CIPortal, Artajasa, and Prima around the clock, incoming and outgoing. They pick up new claims, respond or file on the portal, scrape the transaction data, check it against reconciliation data, and follow each ticket to the other bank's final answer. Another robot enters TC40 fraud reports for credit card cases on the AS400 terminal.",
        },
        {
          title: "DRS web application",
          icon: "web",
          body: "A Laravel system for the people who work the cases. For BI-Fast and ATM it gives a dashboard, a list with the full detail of every transaction, and maker and checker posting through Open API. Credit card disputes are resolved entirely in the app: cases arrive from the call center and are verified against the card data warehouse, the maker classifies the case and picks its actions (temporary credit, card flag, fraud report, write-off), the approver signs off, and the system posts to card core banking through Open API, then tracks the case with Visa until it closes.",
        },
      ],
    },
    context:
      "A dispute starts at the call center, moves to another bank or a card network, waits days for an answer, and ends when money moves in or out of an account. Before this system, 10 makers and approvers did every step by hand: checking third-party portals, matching reconciliation data, preparing postings.",
    lanes: [
      { lane: "BI-Fast, incoming and outgoing", counterpart: "CIPortal (Bank Indonesia)", released: "2024" },
      { lane: "ATM transfers and cash withdrawals, incoming and outgoing", counterpart: "Artajasa, Prima", released: "2023, 2025" },
      { lane: "Credit card, denied and disputed transactions", counterpart: "Visa", released: "2025" },
      { lane: "Closed card and service-charge waivers", counterpart: "Call center, core banking", released: "In production" },
      { lane: "QR", counterpart: "", released: "In development" },
    ],
    logLabel: "BI-Fast and ATM disputes",
    logIntro:
      "These lanes run on third-party portals that offer no API, so robots do the portal work and DRS keeps the case state.",
    part: {
      title: "Credit card disputes",
      intro:
        "Credit card is the lane with the most cases. A case comes in from the call center, is verified against the card data warehouse, and goes to one of two maker queues: denied transactions or disputed details. After the approver signs off, the system carries out each action by the route that fits it: Open API for postings to card core banking, a robot on the AS400 terminal for fraud reports that have no API, and the call center API for comments. A monitoring stage then follows the case with Visa until it closes.",
    },
    robots: [
      {
        name: "Maker robot",
        body: "Watches CIPortal (BI-Fast), Artajasa, and Prima (ATM) 24/7. Responds to new claims, files outgoing claims, and follows every case until it closes.",
      },
      {
        name: "Checker robot",
        body: "Approves every status change the maker robot makes. It runs on a separate machine, so the portal's dual control holds without a person waiting on it.",
      },
    ],
    logs: [
      {
        title: "Incoming: another bank claims against us",
        steps: [
          { actor: "ROBOT", text: "New claim found on the portal. Status set to In Progress, approved by the checker robot" },
          { actor: "ROBOT", text: "Claiming bank notified, transaction data scraped into DRS" },
          { actor: "ROBOT", text: "Lookup against reconciliation data" },
          { actor: "ROBOT", branch: "MATCH", text: "Reply with the credit time, close the dispute once the other bank answers" },
          { actor: "SYSTEM", branch: "UNMATCH", text: "Posted to the account once a maker and a checker approve it in the system" },
        ],
      },
      {
        title: "Outgoing: our customer claims",
        steps: [
          { actor: "SYSTEM", text: "Case arrives from the call center and is checked against reconciliation data" },
          { actor: "SYSTEM", branch: "UNMATCH", text: "The transfer failed on our side. Flagged as an exception, the case stops" },
          { actor: "ROBOT", branch: "MATCH", text: "Claim filed with the other bank on the portal, approved by the checker robot" },
          { actor: "ROBOT", text: "Follows the ticket until the other bank's final answer, then scrapes it into DRS" },
          { actor: "SYSTEM", branch: "FAILED", text: "Posted once a maker and a checker approve it. Case closed" },
          { actor: "SYSTEM", branch: "SUCCESSFUL", text: "Case closed, status returned to the call center" },
        ],
      },
    ],
    logNote:
      "ATM disputes through Artajasa and Prima follow the same two logs, for transfers and cash withdrawals.",
    exceptions: [
      {
        type: "BUSINESS",
        when: "Outgoing transaction is unmatched",
        then: "The transfer failed on our side, so nothing is claimed. The case stops in DRS.",
      },
      {
        type: "BUSINESS",
        when: "Ticket expires before the other bank answers",
        then: "The robot stops following it. The portal's SLA closes the case.",
      },
      {
        type: "SYSTEM",
        when: "A portal shows a captcha at login",
        then: "Read with OCR and an AI model, so the 24/7 run signs in without a person.",
      },
    ],
    decisions: [
      {
        title: "Robots as the missing API",
        body: "CIPortal, Artajasa, and Prima have no API. The robots sit behind the same internal interface an API integration would use, so the core of DRS works the same whether a counterparty answers through an API or through a robot.",
      },
      {
        title: "A deadline on every ticket",
        body: "Every ticket carries a deadline, and a late answer means a reprimand and a fine. The robots run unattended around the clock on REFramework: a dropped session or a portal error is retried, a failure sends a Telegram alert, and case state lives in the database, so a restarted robot picks up where it stopped.",
      },
      {
        title: "A captcha at the login",
        body: "One portal puts a captcha on its login. The robot reads it with OCR and an AI model, so an unattended run signs in on its own at any hour.",
      },
    ],
    stack: [
      "UiPath (Unattended)",
      "UiPath Orchestrator",
      "REFramework",
      "Web scraping",
      "OCR",
      "AI integration",
      "Terminal automation (AS400)",
      "Database connection",
      "API & Web Services Integration",
      "Dynamic UI selectors",
      "Laravel",
      "Bootstrap",
      "jQuery",
      "DataTables",
      "AJAX",
      "Chart.js",
      "ApexCharts",
      "Role & permission",
      "REST API integration",
      "Open API & middleware",
      "SQL Server",
      "MySQL",
      "Redis",
      "Data warehouse lookup",
      "Telegram notifications",
      "Cron jobs",
      "Git",
      "GitLab",
      "Nginx",
      "Linux",
    ],
    stackGroups: [
      { group: "Robots", items: ["UiPath (Unattended)","UiPath Orchestrator","REFramework","Web scraping","OCR","AI integration","Terminal automation (AS400)","Database connection","API & Web Services Integration","Dynamic UI selectors"] },
      { group: "Web application", items: ["Laravel","Bootstrap","jQuery","DataTables","AJAX","Chart.js","ApexCharts","Role & permission"] },
      { group: "Integration", items: ["REST API integration","Open API & middleware","Data warehouse lookup","Telegram notifications"] },
      { group: "Data", items: ["SQL Server","MySQL","Redis"] },
      { group: "Infrastructure", items: ["Cron jobs","Git","GitLab","Nginx","Linux"] },
    ],
  },
  {
    slug: "enterprise-ai-gateway",
    featured: true,
    outcome: "98 developers, analysts, and testers use it every day through Claude Code. Rolling out to 200+.",
    title: "Enterprise AI Gateway",
    kind: "AI platform",
    summary:
      "Developers at the bank code with Claude Code, and every request goes through a gateway I built. Each developer has their own key, guardrails check what leaves the bank, and requests fail over when a model hits its limit.",
    role: "Gateway developer in a cross-team AI platform initiative. Guardrail logic comes from the IT security team and the servers from the infrastructure team; the gateway itself is mine.",
    status: "PILOT",
    statusNote: "In daily use, rolling out to 200+ users.",
    registry: { trigger: "API request", runs: "On request", result: "98 users" },    spec: [
      { label: "Trigger", value: "Every request from Claude Code" },
      { label: "Users", value: "98 developers, analysts, and testers. Target 200+." },
      { label: "Input", value: "Prompts from Claude Code, authenticated per developer" },
      { label: "Output", value: "Responses from Claude or GLM, usage and token logs per developer" },
      { label: "Models", value: "Claude (5 accounts) and GLM (2 accounts). Gemini planned." },
    ],
    results: [
      { measure: "Registered users", after: "98" },
      { measure: "Accounts behind one endpoint: 5 Claude, 2 GLM", after: "7" },
    ],
    story: {
      problem:
        "Developers needed AI to make their work easier and faster. If each of them connected straight to a provider, API keys would sit on every laptop, nobody could see who used what, and source code or customer data could leave the bank inside a prompt. Access had to be managed and monitored in one place.",
      built: [
        {
          title: "Gateway on Bifrost",
          body: "Compared LiteLLM and Bifrost during development, chose Bifrost, an open-source LLM gateway, and customized it in Go. Each developer gets a key and a limit in place of shared provider keys. Requests are routed to Claude or GLM (via Z.AI) and balanced across seven accounts, five on Claude and two on GLM, by round robin and latency. Claude Code is pointed at the gateway, so developers keep their normal workflow.",
        },
        {
          title: "Guardrails and observability",
          body: "Every prompt passes the security team's guardrails for PII and prompt injection before it reaches a provider. Usage and tokens per developer land in ClickHouse, read by Langfuse and by the security team's monitoring.",
        },
      ],
    },
    context:
      "Developers wanted Claude Code in their daily work. If each of them connected straight to a provider, API keys would sit on every laptop, nobody could see who used what, and source code or customer data could leave the bank inside a prompt. The gateway sits between Claude Code and every model, so the bank keeps that control and developers keep the tool.",
    built: [
      "Compared LiteLLM and Bifrost during development, chose Bifrost, an open-source LLM gateway, and customized it in Go.",
      "Claude Code pointed at the gateway, so developers work as usual while authentication, limits, and routing happen behind it.",
      "Authentication and limits per developer, replacing shared provider keys.",
      "Routing to Claude or GLM (via Z.AI), balanced across providers and accounts by round robin and latency.",
      "Integration with the security team's guardrail system for PII detection, prompt injection, and content control.",
      "Usage data stored in ClickHouse, read by both Langfuse and the security team's monitoring.",
    ],
    logs: [
      {
        steps: [
          { actor: "HUMAN", text: "Developer sends a prompt from Claude Code" },
          { actor: "SYSTEM", text: "Gateway checks the developer's key and limit" },
          { actor: "SYSTEM", text: "Guardrails scan for PII and prompt injection" },
          { actor: "SYSTEM", text: "Routed to Claude or GLM, balanced across accounts" },
          { actor: "SYSTEM", branch: "LIMIT", text: "Model at its rate limit: sent to another model until the stored reset time" },
          { actor: "SYSTEM", text: "Usage and tokens written to ClickHouse" },
        ],
      },
    ],
    exceptions: [
      {
        type: "SYSTEM",
        when: "A model hits its rate limit",
        then: "Requests move to another model or account. The limit and its reset time are stored, so the limited model is skipped until it resets.",
      },
      {
        type: "BUSINESS",
        when: "A prompt carries PII or an injection attempt",
        then: "Checked by the security team's guardrails before it reaches the provider.",
      },
    ],
    decisions: [
      {
        title: "One model was not enough",
        body: "Early on, a single model took every request and hit its rate limit fast. I added a second provider and more accounts, now five on Claude and two on GLM, so the load spreads across seven quotas instead of one.",
      },
      {
        title: "Fallback that knows the reset time",
        body: "When a model hits its limit, requests move to another model or account. The limit and its reset time are stored, so the limited model is skipped until it actually resets instead of being retried pointlessly.",
      },
      {
        title: "Debugging across providers",
        body: "Putting Claude Code and GLM behind one gateway surfaced different authentication schemes, Docker networking issues, timeouts, and API format mismatches. I worked through them layer by layer until every provider behaved the same way.",
      },
    ],
    note: "Guardrail logic comes from the IT security team and the servers from the infrastructure team. I built the gateway.",
    stack: ["Bifrost", "Go", "Claude Code", "Claude", "GLM (Z.AI)", "Docker", "PostgreSQL", "ClickHouse", "Langfuse"],
    stackGroups: [
      { group: "Gateway", items: ["Bifrost", "Go"] },
      { group: "Models and clients", items: ["Claude Code", "Claude", "GLM (Z.AI)"] },
      { group: "Data and observability", items: ["PostgreSQL", "ClickHouse", "Langfuse"] },
      { group: "Infrastructure", items: ["Docker"] },
    ],
  },
  {
    slug: "core-banking-realtime-integration",
    featured: true,
    outcome: "A customer data update went from 30 minutes by hand to 10, and nobody runs it manually anymore.",
    title: "Core Banking Realtime Integration",
    kind: "Integration",
    summary:
      "Unattended robots that another application calls in real time through the Orchestrator API. They run three operations on an AS400 core banking system that has no API: customer data updates, credit card blocks, and QRIS merchant onboarding.",
    role: "Individual contributor: research, design, RPA development, Orchestrator API integration",
    since: "2023",
    status: "RUNNING",
    registry: { trigger: "API + queue", runs: "On request", result: "30 → 10 min" },    spec: [
      { label: "Trigger", value: "Orchestrator API call from another team's application" },
      { label: "Runs", value: "On request, one queue item per request" },
      { label: "Input", value: "Customer data change, card block, or merchant onboarding request" },
      { label: "Output", value: "Change made on the AS400 terminal, REST callback with success or failure" },
      { label: "Robots", value: "Three, one per operation, each on its own server" },
      { label: "Build time", value: "About 1.5 months, including research" },
    ],
    results: [
      { measure: "Customer data update", before: "30 min", after: "10 min" },
      { measure: "People updating customer data", before: "1", after: "0" },
      { measure: "Update requests per day", after: "25–50+" },
    ],
    story: {
      problem:
        "Another team's application needed three operations on core banking: customer data updates, credit card blocks, and QRIS merchant onboarding. The core banking system runs on AS400 terminals with no API, so staff did them by hand, 25 to 50 update requests a day at about 30 minutes each, even though a card block has to happen at once and a new merchant is waiting to use QRIS.",
      built: [
        {
          title: "Robots on the AS400",
          icon: "robot",
          body: "Three unattended robots on REFramework, one per operation, each on its own server. They sign in to the terminal, run the operation, and report success or failure. A dropped session is retried; invalid data stops the job with a clear reason.",
        },
        {
          title: "Real-time trigger through Orchestrator",
          body: "The calling application starts a robot through the UiPath Orchestrator API. Each request becomes a queue item, a queue trigger picks it up, and the robot sends a REST callback when it finishes, or the application polls the status. No separate API service had to be built.",
        },
      ],
    },
    context:
      "Another team's application needed three sensitive core banking operations. The core banking system runs on AS400 terminals with no native API, so staff did them by hand, even though a card block has to happen fast and a new merchant is waiting to use QRIS.",
    built: [
      "Three unattended robots the application calls through the UiPath Orchestrator API, with no separate API service to build.",
      "Each request becomes a queue item, and a queue trigger starts the robot.",
      "The application tracks progress by polling status, or receives a REST callback from the robot when it finishes.",
    ],
    logs: [
      {
        steps: [
          { actor: "SYSTEM", text: "Application calls the Orchestrator API" },
          { actor: "SYSTEM", text: "Request stored as a queue item" },
          { actor: "SYSTEM", text: "Queue trigger starts the robot" },
          { actor: "ROBOT", text: "Signs in to the AS400 terminal and runs the operation" },
          { actor: "ROBOT", text: "Callback to the application over REST: success or failure" },
        ],
      },
    ],
    exceptions: [
      {
        type: "SYSTEM",
        when: "Terminal session times out or drops",
        then: "Retried automatically.",
      },
      {
        type: "BUSINESS",
        when: "Data not found or invalid",
        then: "Stopped at once. The callback tells the application why.",
      },
    ],
    decisions: [
      {
        title: "Callable at any moment",
        body: "Most robots run on a schedule. These had to start whenever another application asked, so I researched how to trigger jobs through the Orchestrator API and handle status and callbacks before building. That research is most of the 1.5 months.",
      },
      {
        title: "A queue against race conditions",
        body: "Several requests for the same operation can arrive at once. Each one becomes a queue item and the robot handles one at a time per operation. The core system stays safe and the caller still gets a real-time answer.",
      },
      {
        title: "A terminal, not an API",
        body: "AS400 sessions drop and time out in their own ways. Following REFramework, a system exception such as a lost session is retried automatically, while a business exception such as data not found stops at once and tells the application why.",
      },
    ],
    stack: [
      "UiPath (Unattended)",
      "REFramework",
      "Orchestrator API",
      "Queues & queue triggers",
      "Terminal & Citrix automation",
      "REST",
    ],
    stackGroups: [
      { group: "Robots", items: ["UiPath (Unattended)", "REFramework", "Terminal & Citrix automation"] },
      { group: "Integration", items: ["Orchestrator API", "Queues & queue triggers", "REST"] },
    ],
  },
  {
    slug: "visa-mastercard-settlement",
    featured: true,
    outcome: "Daily settlement went from 1.5 hours to 15–20 minutes, and from four people to two.",
    title: "Visa & Mastercard Settlement",
    kind: "RPA + Web app",
    summary:
      "Robots parse the daily Visa and Mastercard settlement files, reconcile them, and draft the journals. Makers and approvers sign off in a web app I built before anything is posted to the host.",
    role: "Individual contributor: design, RPA and web app development, maintenance",
    since: "2023",
    status: "RUNNING",
    registry: { trigger: "Schedule", runs: "Daily", result: "1.5 h → 15–20 min" },    spec: [
      { label: "Trigger", value: "Orchestrator schedule" },
      { label: "Runs", value: "Daily" },
      { label: "Input", value: "Unstructured TXT settlement files from card processing" },
      { label: "Output", value: "Reconciled settlement result and journals, posted to host after approval" },
      { label: "Approvals", value: "Maker and approver sign-off, every day" },
      { label: "Build time", value: "About 1.5 months" },
    ],
    results: [
      { measure: "Daily settlement, Visa and Mastercard", before: "1.5 h", after: "15–20 min" },
      { measure: "People on settlement", before: "4", after: "2" },
    ],
    story: {
      problem:
        "Settlement with Visa and Mastercard sets the bank's financial position against two card networks, at billions of rupiah a day. The files arrive as unstructured TXT, and two to four people worked through them by hand in Excel every day, about an hour for Visa and 45 minutes for Mastercard, on a process where a wrong figure goes straight into the books.",
      pipeline: {
        title: "One day's settlement, from files to accounting posting",
        stages: [
          "Settlement files from Visa and Mastercard, as TXT from card processing",
          "Read, parsing and extraction",
          "Data transformation",
          "Excel processing",
          "Reconciliation across sources",
          "Settlement result calculated",
          "Journal generated and stored in the database",
          "Web dashboard: maker reviews",
          "Approver signs off",
          "Posted to the host through Open API and middleware",
        ],
      },
      built: [
        {
          title: "Robots (UiPath)",
          icon: "robot",
          body: "Robots find the settlement files for the period, check they are complete, parse the records, and clean and consolidate the data. Excel stays in the pipeline as a working step: templates are filled, calculations run, and results checked. The robots then reconcile the sources by reference and amount, calculate the settlement result, and draft the journals.",
        },
        {
          title: "Settlement web application",
          icon: "web",
          body: "A Laravel system on top of the journal database. It shows the status of every settlement file and journal, gives makers and approvers their review and sign-off screens, and posts the approved journals to the host through Open API and middleware.",
        },
      ],
    },
    context:
      "Settlement with Visa and Mastercard sets the bank's financial position against two card networks, at billions of rupiah a day. The files arrive as unstructured TXT. Two to four people processed them by hand in Excel every day.",
    built: [
      "File handling: find the files for the settlement period, check they are complete, parse the records.",
      "Transformation: clean and normalize fields, consolidate files, catch empty, invalid, and duplicate data.",
      "Excel as a working step: fill templates, run the calculations, check the results.",
      "Reconciliation across sources by reference and amount.",
      "A web app on top of the journal database with monitoring and the maker and approver workflow, posting to host through Open API and middleware.",
    ],
    logs: [
      {
        steps: [
          { actor: "SYSTEM", text: "Settlement TXT files arrive from card processing" },
          { actor: "ROBOT", text: "Files located, checked for completeness, parsed" },
          { actor: "ROBOT", text: "Fields cleaned, normalized, consolidated" },
          { actor: "ROBOT", text: "Excel templates filled and calculated" },
          { actor: "ROBOT", text: "Sources reconciled by reference and amount" },
          { actor: "ROBOT", text: "Settlement result calculated, journals written to the database" },
          { actor: "HUMAN", text: "Maker reviews, approver signs off" },
          { actor: "SYSTEM", text: "Posted to host through Open API and middleware" },
        ],
      },
    ],
    exceptions: [
      {
        type: "SYSTEM",
        when: "Settlement files are missing at run time",
        then: "Stops with File Not Found in Orchestrator. Once the data is there, the robot is run again.",
      },
      {
        type: "SYSTEM",
        when: "The source file format changes",
        then: "The transformation layer keeps its output shape, so reconciliation and journals are unaffected.",
      },
      {
        type: "BUSINESS",
        when: "Sources do not match",
        then: "No journal is formed until they reconcile.",
      },
    ],
    decisions: [
      {
        title: "Reconciliation before any journal",
        body: "Transactions and amounts from every source must match before the settlement result is calculated. A mistake shows up before a journal exists, not after it is posted.",
      },
      {
        title: "A two-day incident, fixed one layer down",
        body: "The source format changed without notice and the robot failed two days in a row. I rebuilt the TXT-to-datatable transformation so it always produces the same structure, whatever the raw file looks like. Nothing downstream depends on the raw format anymore.",
      },
      {
        title: "People approve financial postings",
        body: "The robot's journals are never posted directly. A maker and an approver review them in the web app first, which keeps segregation of duty on a sensitive accounting process.",
      },
    ],
    stack: [
      "UiPath (Unattended)",
      "REFramework",
      "Orchestrator",
      "Regex",
      "Exception Handling & Logging",
      "Document Processing (unstructured TXT, XML, Excel, PDF)",
      "Laravel",
      "Bootstrap",
      "jQuery",
      "AJAX",
      "Role & permission",
      "Open API & middleware",
      "MySQL",
      "SQL Server",
    ],
    stackGroups: [
      { group: "Robots", items: ["UiPath (Unattended)", "REFramework", "Orchestrator", "Regex", "Exception Handling & Logging", "Document Processing (unstructured TXT, XML, Excel, PDF)"] },
      { group: "Web application", items: ["Laravel", "Bootstrap", "jQuery", "AJAX", "Role & permission"] },
      { group: "Integration", items: ["Open API & middleware"] },
      { group: "Data", items: ["MySQL", "SQL Server"] },
    ],
  },
  {
    slug: "reconciliation-engine",
    title: "Reconciliation Engine",
    kind: "RPA + Web app",
    summary:
      "A reconciliation engine for BI-Fast, QR, and Biller that acts on its own results. Matched transactions close, and failed ones are posted or refunded automatically.",
    role: "Developer: reconciliation engine across BI-Fast, QR, and Biller",
    since: "2022",
    status: "RUNNING",
    statusNote: "Live since the day BI-Fast launched in Indonesia.",
    registry: { trigger: "Schedule", runs: "Every 15 min", result: "250K+ tx / day" },    spec: [
      { label: "Trigger", value: "Orchestrator schedule, every 15 minutes" },
      { label: "Runs", value: "24/7" },
      { label: "Input", value: "Host data over SFTP, BI-Fast data from CIPortal" },
      { label: "Output", value: "Match and unmatch results, real-time postings and refunds, Laravel dashboard" },
      { label: "Volume", value: "About 200,000 BI-Fast transactions a day, up to 4,000 per pull at peak hours. QRIS and Biller add about 50,000." },
      { label: "Build time", value: "1–2 months for the BI-Fast module" },
    ],
    results: [
      { measure: "Manual reconciliation automated", after: "85%" },
      { measure: "Transactions per day", after: "250K+" },
      { measure: "From pull to result on the dashboard", after: "~30 min" },
    ],
    story: {
      problem:
        "Every transaction has two records: one in the bank's host system and one in the external network, which for BI-Fast is Bank Indonesia's. A gap on either side means money to adjust or refund. At more than 250,000 transactions a day across BI-Fast, QRIS, and Biller, matching by hand is not an option, and BI-Fast was new in Indonesia, so the engine had to work from day one.",
      built: [
        {
          title: "Robots (UiPath)",
          icon: "robot",
          body: "A robot pulls BI-Fast transactions from CIPortal every 15 minutes into a staging database, around the clock, and is built to finish each batch before the next window opens. Two backup robots cover late data: one re-pulls from the last recorded trigger time on its own, the other from a time range a user uploads as a trigger file.",
        },
        {
          title: "Reconciliation engine and dashboard",
          icon: "web",
          body: "An import engine loads host data from SFTP into its own staging database. The two sides are reconciled, matched transactions close, and failed ones are posted in real time or refunded automatically. A Laravel dashboard shows the match and unmatch results about 30 minutes after each pull.",
        },
      ],
    },
    context:
      "Every transaction has two records: one in the bank's host system and one in the external network, which for BI-Fast is Bank Indonesia's. A gap on either side means money to adjust or refund. At more than 250,000 transactions a day across BI-Fast, QRIS, and Biller, matching by hand is not an option.",
    built: [
      "The reconciliation engine for BI-Fast, QR, and Biller.",
      "A robot that pulls BI-Fast transactions from CIPortal into a staging database every 15 minutes.",
      "An import engine that loads host data from SFTP into its own staging database.",
      "Real-time posting and automated refunds for failed transactions.",
      "A Laravel dashboard with match and unmatch results.",
    ],
    logs: [
      {
        steps: [
          { actor: "SYSTEM", text: "Host data lands on SFTP, the import engine loads it into staging" },
          { actor: "ROBOT", text: "Pulls BI-Fast transactions from CIPortal into staging" },
          { actor: "SYSTEM", text: "Both sides reconciled" },
          { actor: "SYSTEM", branch: "MATCH", text: "Transaction closed" },
          { actor: "SYSTEM", branch: "UNMATCH", text: "Posted in real time or refunded automatically" },
          { actor: "SYSTEM", text: "Result on the dashboard about 30 minutes after the pull" },
        ],
      },
    ],
    exceptions: [
      {
        type: "SYSTEM",
        when: "CIPortal data arrives late",
        then: "A backup robot finds the last recorded trigger time and pulls again from there.",
      },
      {
        type: "SYSTEM",
        when: "A gap the first backup misses",
        then: "A user uploads a trigger file to FTP with the exact time range, and a second backup robot pulls it.",
      },
    ],
    decisions: [
      {
        title: "A 15-minute cycle that never overlaps",
        body: "Each pull carries up to 4,000 transactions at peak hours. The robot is built to finish a batch before the next window opens, so two cycles never run at once.",
      },
      {
        title: "Two backup robots for late data",
        body: "Data from CIPortal sometimes arrives late. One backup robot finds the last recorded trigger time and pulls again from there. A second runs from a trigger file a user uploads with the exact time range, for whatever the first one misses.",
      },
    ],
    stack: [
      "UiPath (Unattended)",
      "REFramework",
      "API & Web Services Integration",
      "Data Scraping & Extraction",
      "Database & Shared Folder connection",
      "Telegram integration",
      "Laravel",
      "Bootstrap",
      "jQuery",
      "DataTables",
      "AJAX",
      "Chart.js",
      "ApexCharts",
      "Role & permission",
      "SFTP",
      "Staging databases",
      "MySQL",
      "SQL Server",
      "GitLab CI",
    ],
    stackGroups: [
      { group: "Robots", items: ["UiPath (Unattended)", "REFramework", "API & Web Services Integration", "Data Scraping & Extraction", "Database & Shared Folder connection", "Telegram integration"] },
      { group: "Web application", items: ["Laravel", "Bootstrap", "jQuery", "DataTables", "AJAX", "Chart.js", "ApexCharts", "Role & permission"] },
      { group: "Integration", items: ["SFTP"] },
      { group: "Data", items: ["Staging databases","MySQL","SQL Server"] },
      { group: "Infrastructure", items: ["GitLab CI"] },
    ],
  },
  {
    slug: "treasury-journal-automation",
    title: "Treasury Journal Automation",
    kind: "RPA",
    summary:
      "Six robots that calculate and post the daily GL journals for Treasury Operations: retail bond tax, MTM options, securities tax, AFS bonds by trade date and by settle date, and RTGS fees.",
    role: "Individual contributor: process analysis, solution design, development",
    since: "2021",
    status: "RUNNING",
    registry: { trigger: "Schedule", runs: "Daily", result: "30 → 5 min" },    spec: [
      { label: "Trigger", value: "Orchestrator schedule" },
      { label: "Runs", value: "Daily" },
      { label: "Input", value: "Transactions from web and desktop applications" },
      { label: "Output", value: "CSV journals posted to core banking over SFTP, Laravel monitoring dashboard" },
      { label: "Robots", value: "Six processes, with AFS bonds split into trade date and settle date, plus an environment setup robot" },
      { label: "Build time", value: "5–10 working days per process, 15 for AFS bonds" },
    ],
    results: [
      { measure: "People running the journals", before: "2", after: "0" },
      { measure: "Per process", before: "30 min", after: "5 min" },
      { measure: "AFS bond journal", before: "60 min", after: "5–10 min" },
      { measure: "Human errors", after: "0" },
    ],
    story: {
      problem:
        "Treasury Operations ran the same daily journals by hand, every day: pull the data, work through stacked filters, lookups, and business-rule calculations, then post to core banking. Two people spent 30 minutes to an hour per process, and one slip anywhere in that chain meant a wrong posting. The team needed the time back and the accuracy guaranteed, so people could spend their day on work that needs judgment.",
      pipeline: {
        title: "One journal, from source to posting",
        stages: [
          "Source data: web and desktop apps",
          "Extraction",
          "Filtering and validation",
          "Lookup and matching",
          "Business rules and calculation",
          "Debit and credit mapped to GL",
          "CSV journal generated",
          "Sent to core banking over SFTP",
          "Posting result stored and shown on the dashboard",
        ],
      },
      built: [
        {
          title: "Robots (UiPath)",
          icon: "robot",
          body: "Six robots that share one pipeline: extract from web and desktop sources, filter and validate, look up and match, apply the business rules, map debit and credit to GL, and send the CSV journal to core banking over SFTP. AFS bonds, the most complex, are two of the six, split by trade date and settle date, and a separate setup robot prepares the browser environment before the main run.",
        },
        {
          title: "Monitoring dashboard",
          icon: "web",
          body: "A Laravel dashboard for process status, generated journals, delivery and posting status, errors, and history. Posting is automatic, so the team only monitors here.",
        },
      ],
    },
    context:
      "Treasury Operations ran its daily journals by hand in Excel. Volumes were tens to hundreds of transactions a day, but every process stacked filters, lookups, and business-rule calculations. Two people spent 30 minutes to an hour per process, every day.",
    built: [
      "Worked through the manual processes with the Treasury Operations team and picked the ones worth automating.",
      "Six robots that share one pipeline from extraction to posting.",
      "A Laravel dashboard for process status, journals, delivery and posting status, errors, and history.",
    ],
    logs: [
      {
        steps: [
          { actor: "ROBOT", text: "Extracts transactions from web and desktop sources" },
          { actor: "ROBOT", text: "Filters, validates, looks up, matches" },
          { actor: "ROBOT", text: "Applies business rules and calculates" },
          { actor: "ROBOT", text: "Maps debit and credit to GL, generates CSV" },
          { actor: "ROBOT", text: "Sends the journal to core banking over SFTP" },
          { actor: "SYSTEM", text: "Posting result stored and shown on the dashboard" },
        ],
      },
    ],
    exceptions: [
      {
        type: "SYSTEM",
        when: "A selector changes on a source web app",
        then: "The robot fails with a notification and gets a small fix.",
      },
      {
        type: "SYSTEM",
        when: "The robot's account is blocked on a portal",
        then: "Notification sent and escalated to the admin for a reset.",
      },
      {
        type: "SYSTEM",
        when: "The browser is not in IE mode",
        then: "A separate setup robot configures Edge before the main robot starts.",
      },
    ],
    decisions: [
      {
        title: "Two robots for AFS bonds",
        body: "Where a coupon period falls against the trade date and settle date changes the calculation. That is several branching conditions, so I split the work into two robots, one per date.",
      },
      {
        title: "A setup robot, separate from the business robot",
        body: "One process needs the browser in IE mode. A dedicated robot configures Edge before the main robot starts, instead of mixing environment setup into business logic.",
      },
      {
        title: "Failures stay out of the numbers",
        body: "In years of production the journal amounts have never been wrong. Every failure so far has been access or environment, such as a changed selector or a blocked account, and each one sends a notification.",
      },
    ],
    stack: [
      "UiPath (Unattended)",
      "REFramework",
      "Web scraping",
      "Document Processing (Excel, TXT)",
      "SFTP integration",
      "Laravel",
      "Bootstrap",
      "jQuery",
      "AJAX",
      "Role & permission",
      "MySQL",
      "SQL Server",
      "Git",
    ],
    stackGroups: [
      { group: "Robots", items: ["UiPath (Unattended)", "REFramework", "Web scraping", "Document Processing (Excel, TXT)", "SFTP integration"] },
      { group: "Web application", items: ["Laravel", "Bootstrap", "jQuery", "AJAX", "Role & permission"] },
      { group: "Data", items: ["MySQL", "SQL Server"] },
      { group: "Infrastructure", items: ["Git"] },
    ],
  },
  {
    slug: "gl-difference-journal-automation",
    title: "GL Difference Journal Automation",
    kind: "RPA",
    summary:
      "Robots that parse raw third-party TXT reports for ten card and payment transaction types and post the GL adjustment journals to core banking.",
    role: "Individual contributor: design and development",
    since: "2022",
    status: "RUNNING",
    registry: { trigger: "Schedule", runs: "Daily", result: "1 h → 5 min" },    spec: [
      { label: "Trigger", value: "Orchestrator schedule" },
      { label: "Runs", value: "Daily" },
      { label: "Input", value: "Third-party TXT reports from FTP, a different format per transaction type" },
      { label: "Output", value: "CSV journals to core banking, posting status on a Laravel dashboard" },
      { label: "Scope", value: "10 transaction types: QR, NPG acquiring, interface rejections, credit card payments across channels" },
    ],
    results: [
      { measure: "Daily run, 10 transaction types", before: "1 h", after: "5 min" },
      { measure: "People running it", before: "1", after: "0" },
    ],
    story: {
      problem:
        "The transaction operations division booked GL differences for ten card and payment transaction types by hand, every day: download the third-party TXT reports, read each format, map the values, calculate the adjustment, and post to the host. One person spent about an hour a day on it, and one misread line meant a wrong journal in core banking. The team needed the time back and the posting guaranteed, so people could spend their day on work that needs judgment.",
      pipeline: {
        title: "One transaction type, from report to posting",
        stages: [
          "Third-party TXT reports from FTP",
          "File parsing and pattern identification",
          "Data processing",
          "Filtering and validation",
          "Grouping and matching",
          "Calculation by parameter",
          "Debit and credit GL determined",
          "CSV journal sent to core banking over SFTP",
          "Posting result stored and shown on the dashboard",
        ],
      },
      built: [
        {
          title: "Robots (UiPath)",
          icon: "robot",
          body: "One pipeline for all ten transaction types. Robots download the reports from FTP, parse each by its own pattern with regex, filter and validate, group and match, calculate, set the debit and credit GL, and send the CSV journal to core banking. They run daily through Orchestrator and check the host response about 10 minutes after sending.",
        },
        {
          title: "Monitoring dashboard",
          icon: "web",
          body: "A Laravel dashboard for robot status, parsing results, journals, posting, history, and error details. Posting is automatic, so the team only monitors here.",
        },
      ],
    },
    context:
      "The transaction operations division books GL differences for ten card and payment transaction types. The source is raw TXT reports from third parties, each type in its own format. One person downloaded, read, mapped, and posted them by hand, about an hour a day.",
    built: [
      "One pipeline for all ten transaction types, from TXT report to posting result.",
      "Regex and pattern-based parsing that turns each raw report into a structured datatable.",
      "A Laravel dashboard for robot status, parsing results, journals, posting, history, and error details.",
    ],
    logs: [
      {
        steps: [
          { actor: "ROBOT", text: "Downloads the TXT reports from FTP" },
          { actor: "ROBOT", text: "Parses each report by its own pattern" },
          { actor: "ROBOT", text: "Filters, validates, groups, matches" },
          { actor: "ROBOT", text: "Calculates and sets the debit and credit GL" },
          { actor: "ROBOT", text: "Sends the CSV journal to core banking, about 5 minutes" },
          { actor: "ROBOT", text: "Checks the host response about 10 minutes later" },
          { actor: "SYSTEM", text: "Result on the dashboard" },
        ],
      },
    ],
    exceptions: [
      {
        type: "SYSTEM",
        when: "A third-party report changes format",
        then: "The robot stops with an error and posts nothing.",
      },
      {
        type: "SYSTEM",
        when: "A report has not been delivered yet",
        then: "Stops with File Not Found. The user chases the data and runs the robot again from Orchestrator.",
      },
    ],
    decisions: [
      {
        title: "Ten formats, no shared structure",
        body: "No single format covers the ten reports. For some, I studied the data's pattern first, then reverse-engineered it into a datatable with its own processing logic.",
      },
      {
        title: "Stop rather than post wrong",
        body: "Third parties can change their format at any time. The robot stops on a format it does not recognize. A visible failure in Orchestrator is cheaper than a wrong journal in core banking.",
      },
      {
        title: "Late data is the usual failure",
        body: "Most failures are source files that have not arrived yet. The robot stops with a clear File Not Found, the user chases the data, then runs the robot again from Orchestrator.",
      },
    ],
    stack: [
      "UiPath (Unattended)",
      "REFramework",
      "Orchestrator",
      "Regex",
      "Document Processing (unstructured TXT)",
      "Exception Handling & Logging",
      "Laravel",
      "Bootstrap",
      "jQuery",
      "AJAX",
      "Role & permission",
      "FTP/SFTP",
      "MySQL",
      "SQL Server",
    ],
    stackGroups: [
      { group: "Robots", items: ["UiPath (Unattended)","REFramework","Orchestrator","Regex","Document Processing (unstructured TXT)","Exception Handling & Logging"] },
      { group: "Web application", items: ["Laravel","Bootstrap","jQuery","AJAX","Role & permission"] },
      { group: "Integration", items: ["FTP/SFTP"] },
      { group: "Data", items: ["MySQL","SQL Server"] },
    ],
  },
  {
    slug: "fund-disbursement-automation",
    title: "Fund Disbursement Automation",
    kind: "RPA",
    summary:
      "Robots that read each payment channel's settlement report and create the fund transfers and journals between GL and accounts, every day of the year.",
    role: "Individual contributor: design, development, maintenance",
    since: "2023",
    status: "RUNNING",
    registry: { trigger: "Schedule", runs: "Daily", result: "30 → 5 min" },    spec: [
      { label: "Trigger", value: "Orchestrator schedule" },
      { label: "Runs", value: "Daily, including weekends and public holidays" },
      { label: "Input", value: "Settlement reports, mostly unstructured TXT" },
      { label: "Output", value: "Transfers and journals posted to the target system, Laravel dashboard" },
      { label: "Channels", value: "Syariah Card, QR, card payments via BCA, BNI, and Mandiri, Mastercard" },
      { label: "Build time", value: "15 working days" },
    ],
    results: [
      { measure: "Daily run, 6 transaction types", before: "30 min", after: "5 min" },
      { measure: "People running it", before: "1", after: "0" },
    ],
    story: {
      problem:
        "Fund disbursement for six payment channels ran by hand, every day of the year: read each channel's settlement report, work out the amount by that channel's rule, create the transfer and its journal, and post it. One person spent about 30 minutes a day on it, and a wrong amount moved real money. The team needed the time back and the accuracy guaranteed, so people could spend their day on work that needs judgment.",
      pipeline: {
        title: "One channel, from settlement report to posting",
        stages: [
          "Settlement report, mostly unstructured TXT",
          "Parsing and extraction",
          "Validation",
          "Calculation by the channel's business rule",
          "Transfer transaction and journal formed",
          "Posted to the target system",
          "Exception handling and logging",
          "Monitoring on the dashboard",
        ],
      },
      built: [
        {
          title: "Robots (UiPath)",
          icon: "robot",
          body: "A robot per channel reads the settlement report, parses and validates it, calculates the amount by that channel's rule, builds the transfer and its journal, and posts to the target system. They run every day, including weekends and public holidays, through Orchestrator, with logging that identifies every failed transaction.",
        },
        {
          title: "Monitoring dashboard",
          icon: "web",
          body: "A Laravel dashboard for posting status, next to Orchestrator monitoring. Posting is automatic, so the team only monitors here.",
        },
      ],
    },
    context:
      "This process moves funds between a GL and an account. The amounts come from each channel's settlement report, mostly TXT with little structure. One person read the reports, worked out the amounts, and created the transfers and journals by hand, about 30 minutes a day.",
    built: [
      "Robots for each channel, running every day of the year.",
      "A Laravel dashboard for posting status, alongside Orchestrator monitoring.",
      "Logging so every failed transaction is identified.",
    ],
    logs: [
      {
        steps: [
          { actor: "ROBOT", text: "Reads the channel's settlement report" },
          { actor: "ROBOT", text: "Parses, extracts, validates" },
          { actor: "ROBOT", text: "Calculates the amount by the channel's rule" },
          { actor: "ROBOT", text: "Builds the transfer and its journal" },
          { actor: "ROBOT", text: "Posts to the target system within 0–5 minutes" },
          { actor: "SYSTEM", text: "Confirmation within 0–10 minutes, status on the dashboard" },
        ],
      },
    ],
    exceptions: [
      {
        type: "SYSTEM",
        when: "A report has not been delivered yet",
        then: "Stops with File Not Found in Orchestrator. Run again once the data is ready.",
      },
      {
        type: "BUSINESS",
        when: "Data does not fit the channel's rules",
        then: "The transaction is flagged and logged.",
      },
    ],
    decisions: [
      {
        title: "A different rule per channel",
        body: "Most settlement reports have no fixed structure. The robot recognizes each channel's pattern before it extracts values, validates them, and calculates the transfer by that channel's rule.",
      },
      {
        title: "When input data is not ready",
        body: "The most common failure is a source file that has not been delivered yet. It surfaces as a clear File Not Found in Orchestrator; once the data is ready, the user runs the robot again.",
      },
    ],
    stack: [
      "UiPath (Unattended)",
      "REFramework",
      "Orchestrator",
      "Regex",
      "Document Processing (unstructured TXT)",
      "Exception Handling & Logging",
      "Laravel",
      "Bootstrap",
      "jQuery",
      "AJAX",
      "Role & permission",
      "MySQL",
      "SQL Server",
    ],
    stackGroups: [
      { group: "Robots", items: ["UiPath (Unattended)","REFramework","Orchestrator","Regex","Document Processing (unstructured TXT)","Exception Handling & Logging"] },
      { group: "Web application", items: ["Laravel","Bootstrap","jQuery","AJAX","Role & permission"] },
      { group: "Data", items: ["MySQL","SQL Server"] },
    ],
  },
  {
    slug: "monitoring-reporting-automation",
    title: "Monitoring & Reporting Automation",
    kind: "RPA",
    summary:
      "Eight robots that monitor systems and build daily and monthly reports for Treasury, IT project management, and other teams, three of them regulatory reports for OJK. They pull from web and desktop apps, a data warehouse, SFTP, and third-party portals, and deliver the result by email or into the databases and folders other teams work from.",
    role: "Individual contributor: process analysis, solution design, development",
    since: "2021",
    status: "RUNNING",
    statusNote: "Went live between 2021 and 2024. All eight still run.",
    registry: { trigger: "Schedule", runs: "3×/day – monthly", result: "10 → 3 min" },    spec: [
      { label: "Trigger", value: "Orchestrator schedule" },
      { label: "Runs", value: "From three times a day to monthly" },
      { label: "Input", value: "Web and desktop apps, data warehouse, SFTP, third-party portals" },
      { label: "Output", value: "Excel, PDF, and HTML reports by email. Data to databases and SFTP for other teams." },
      { label: "Robots", value: "8" },
      { label: "Build time", value: "3–5 working days per process" },
    ],
    results: [
      { measure: "Per report", before: "10 min", after: "3 min" },
      { measure: "People preparing reports", before: "1", after: "0" },
      { measure: "Payment system status checks", after: "3× a day" },
    ],
    story: {
      problem:
        "Treasury and IT project management ran a set of recurring monitoring and reporting tasks by hand: check a payment system's status, correct trade dates, pool corporate card transactions, report project progress, pull mutual fund data, and prepare three regulatory reports for OJK. Each one meant logging in somewhere, pulling data, building the report, and sending or filing it, about 10 minutes per report, from three times a day to monthly, with one person doing it all.",
      pipeline: {
        title: "Regulatory report, from source to inbox",
        stages: [
          "Source data: web app, desktop app, file share, data warehouse",
          "Extraction",
          "Lookup, matching and enrichment",
          "Filtering, mapping and validation",
          "Data transformation",
          "Report generated as Excel or PDF in the OJK format",
          "Automated email delivery",
        ],
      },
      built: [
        {
          title: "Robots (UiPath)",
          icon: "robot",
          body: "Eight robots, each one built the same way: pull from its sources, look up and enrich the data, validate and transform it, then email the report or store the data where other teams pick it up.",
          rows: [
            ["Payment system status check", "3 times a day"],
            ["Trade-date correction with an HTML report to trading", "Daily"],
            ["Corporate ride-hailing card pooling for finance and HR", "Daily"],
            ["Project progress from Jira for IT project management", "Daily"],
            ["Mutual fund stamp-duty data from a third-party portal", "Daily"],
            ["Customer bond transactions, for OJK", "Daily"],
            ["Securities-dealer activity (PPE-EBUS), for OJK", "Monthly"],
            ["Intragroup transactions with counterparty matching, for OJK", "Monthly"],
          ],
        },
        {
          title: "Shared notification library",
          body: "One library for Telegram and WhatsApp notifications that every robot reuses, instead of notification logic rewritten in each project.",
        },
      ],
    },
    context:
      "Treasury prepares regulatory reports for OJK and runs a set of operational monitoring tasks next to them. All of it was manual: staff downloaded reports from source systems and saved them to shared folders for other teams.",
    built: [
      "Three OJK reports: daily customer bond transactions, monthly securities-dealer activity, and monthly intragroup transactions with counterparty matching.",
      "Five operational robots: payment system checks three times a day, trade-date corrections with a daily HTML report, corporate ride-hailing transaction pooling, daily project progress from Jira, and mutual fund stamp-duty data.",
      "A notification library for Telegram and WhatsApp that every robot reuses.",
    ],
    logs: [
      {
        steps: [
          { actor: "ROBOT", text: "Pulls from web, desktop apps, the data warehouse, or SFTP" },
          { actor: "ROBOT", text: "Looks up, matches, enriches" },
          { actor: "ROBOT", text: "Validates and transforms" },
          { actor: "ROBOT", text: "Generates the Excel or PDF report in the OJK format" },
          { actor: "ROBOT", text: "Emails it to the team" },
        ],
      },
    ],
    exceptions: [
      {
        type: "BUSINESS",
        when: "OJK changes a report format",
        then: "Only the mapping layer changes. Data fetching and processing stay as they are.",
      },
      {
        type: "SYSTEM",
        when: "A source portal shows a captcha with strike-through noise",
        then: "Tesseract OCR reads it and an LLM checks the reading before submitting.",
      },
    ],
    decisions: [
      {
        title: "Report format separated from data logic",
        body: "Regulatory formats change. The mapping and layout of each report can be adjusted without touching how the data is fetched and processed, so a format change is a small edit, not a rebuild.",
      },
      {
        title: "A distorted captcha, read with OCR plus an LLM",
        body: "One source portal sits behind a captcha with strike-through noise that plain OCR reads poorly. The robot combines Tesseract OCR with an LLM call to check the reading before submitting, which made the daily pull fully unattended.",
      },
      {
        title: "Email is the dashboard",
        body: "These reports did not need a monitoring dashboard. The email is both the result and the status, so the solution stays as small as the problem.",
      },
    ],
    stack: [
      "UiPath (Unattended)",
      "Git",
      "Web scraping",
      "SFTP",
      "Tesseract OCR",
      "LLM API",
      "Excel & PDF automation",
      "Telegram Bot API",
    ],
    stackGroups: [
      { group: "Robots", items: ["UiPath (Unattended)","Web scraping","Tesseract OCR","LLM API","Excel & PDF automation"] },
      { group: "Integration", items: ["SFTP","Telegram Bot API"] },
      { group: "Infrastructure", items: ["Git"] },
    ],
  },
];

export const experience = [
  {
    when: "Nov 2020 – present",
    title: "Senior Automation & Software Engineer",
    org: "PT Bank Mega",
    body: "Joined as a fresh graduate in November 2020 and grew into the senior role. I work with business teams to find manual processes worth automating, then design, build, and run the solution: UiPath robots, the Laravel systems around them, core banking integrations, and the bank's AI gateway. I also handle production incidents, root cause analysis, and performance work.",
    count:
      "More than 100 robots are in production. One process is rarely one robot: disputes alone run separate robots for incoming and outgoing cases, for maker and checker, and for each portal (CIPortal, Artajasa, Prima), next to status checkers and many reporting robots.",
    timeline: [
      { year: "2020", text: "Joined in November as a fresh graduate." },
      { year: "2021", text: "First robots in production: six Treasury journal robots and the first OJK regulatory reports. UiPath certified in January." },
      { year: "2022", text: "BI-Fast reconciliation, live from the day BI-Fast launched in Indonesia. GL difference journals for ten transaction types." },
      { year: "2023", text: "Robots that other applications call in real time through the Orchestrator API. Visa and Mastercard settlement with a maker and approver web app. Fund disbursement. First dispute lane, incoming ATM." },
      { year: "2024", text: "Dispute Resolution System for BI-Fast, incoming and outgoing." },
      { year: "2025", text: "Outgoing ATM disputes and credit card disputes." },
      { year: "Now", text: "AI gateway in daily use by 98 users. QR disputes in development." },
    ],
  },
  {
    when: "May – Sep 2020",
    title: "ICStar RPA Hackathon, 2nd place",
    org: "PT IDStar Cipta Teknologi",
    body: "Built a robot that reconciles third-party Visa transactions. A 2-hour manual process ran in 3–5 minutes, and the 40% human error rate went to zero.",
  },
];

// UiPath in depth: each kind of automation I have shipped, with the process that proves it.
export const depth = [
  {
    capability: "Real-time robots",
    detail: "Robots another application calls through the Orchestrator API. Each request becomes a queue item and a queue trigger starts the job.",
    slug: "core-banking-realtime-integration",
  },
  {
    capability: "Legacy terminals",
    detail: "Terminal and Citrix automation on AS400 core banking, with automatic retries for dropped sessions.",
    slug: "core-banking-realtime-integration",
  },
  {
    capability: "24/7 portal robots",
    detail: "Maker and checker robots on separate machines work third-party portals that offer no API, and follow each case for days.",
    slug: "dispute-resolution-system",
  },
  {
    capability: "High-volume cycles",
    detail: "A pull every 15 minutes, up to 4,000 transactions each at peak hours, built to finish before the next cycle, with two backup robots for late data.",
    slug: "reconciliation-engine",
  },
  {
    capability: "Unstructured files",
    detail: "Regex and pattern parsing for raw TXT reports: ten formats for GL journals, plus Visa and Mastercard settlement files.",
    slug: "gl-difference-journal-automation",
  },
  {
    capability: "Posting with approval",
    detail: "Robots draft the journals. Makers and approvers sign off in a Laravel app before anything reaches the host.",
    slug: "visa-mastercard-settlement",
  },
  {
    capability: "Accounting rules",
    detail: "Branching calculation rules for AFS bonds, split across two robots by trade date and settle date.",
    slug: "treasury-journal-automation",
  },
  {
    capability: "Reporting robots",
    detail: "Eight robots that build OJK and operational reports from web apps, desktop apps, a data warehouse, and SFTP.",
    slug: "monitoring-reporting-automation",
  },
  {
    capability: "Exception handling",
    detail: "REFramework throughout. System exceptions retry, business exceptions stop with a reason, and a changed input format stops the robot before it posts.",
    slug: "gl-difference-journal-automation",
  },
  {
    capability: "AI inside a robot",
    detail: "A distorted captcha read by Tesseract OCR and checked by an LLM, so the daily pull runs unattended.",
    slug: "monitoring-reporting-automation",
  },
  {
    capability: "AI platform",
    detail: "The bank's LLM gateway on Bifrost, customized in Go, used by 98 developers, analysts, and testers from Claude Code.",
    slug: "enterprise-ai-gateway",
  },
];

export const skills = [
  {
    group: "RPA",
    items: ["UiPath", "REFramework", "Orchestrator", "Queues & API triggers", "Terminal & mainframe", "OCR", "Attended & unattended"],
  },
  {
    group: "AI & integration",
    items: ["Bifrost", "Langfuse", "LLM integration", "Prompt engineering", "Claude Code", "OpenAI Codex"],
  },
  {
    group: "Software",
    items: ["PHP (Laravel)", "REST APIs", "JavaScript", "Go", "HTML/CSS", "jQuery"],
  },
  {
    group: "Infrastructure",
    items: ["Docker", "GitLab CI", "Git (GitLab, GitHub)", "Linux (Ubuntu)", "Windows Server", "Nginx", "Apache"],
  },
  {
    group: "Data",
    items: ["SQL Server", "MySQL", "PostgreSQL", "ClickHouse", "Redis"],
  },
];

export const certifications = [
  { when: "Jan 2021", title: "UiPath Certified RPA Associate (UiRPA)", org: "UiPath" },
  { when: "Oct 2020", title: "RPA Training Co-Facilitator", org: "ONE Indonesia × UiPath" },
  { when: "Sep 2020", title: "ICStar Hackathon 2020, 2nd winner", org: "PT IDStar Cipta Teknologi" },
];

// Time compression chart. Minutes drive the bar length (60 min = full width);
// the labels are what the reader sees, taken from each project's results.
export const compression = [
  { slug: "dispute-resolution-system", label: "Dispute Resolution System (BI-Fast, ATM, credit card)", manual: 60, auto: 10, manualLabel: "1 h", autoLabel: "10 min" },
  { slug: "visa-mastercard-settlement", label: "Visa & Mastercard Settlement (per day)", manual: 90, auto: 20, manualLabel: "1.5 h", autoLabel: "15–20 min" },
  { slug: "gl-difference-journal-automation", label: "GL Difference Journals (per day, 10 transaction types)", manual: 60, auto: 5, manualLabel: "1 h", autoLabel: "5 min" },
  { slug: "fund-disbursement-automation", label: "Fund Disbursement (per day, 6 transaction types)", manual: 30, auto: 5, manualLabel: "30 min", autoLabel: "5 min" },
  { slug: "core-banking-realtime-integration", label: "Core banking, customer data update", manual: 30, auto: 10, manualLabel: "30 min", autoLabel: "10 min" },
  { slug: "treasury-journal-automation", label: "Treasury Journal (per process)", manual: 30, auto: 5, manualLabel: "30 min", autoLabel: "5 min" },
  { slug: "monitoring-reporting-automation", label: "Monitoring & Reporting (per report)", manual: 10, auto: 3, manualLabel: "10 min", autoLabel: "3 min" },
];

// People running each process by hand, before and after. Figures given by Norma.
// 0 means nobody runs it anymore; the team only monitors it in the app.
export const staffing = [
  { slug: "dispute-resolution-system", label: "Dispute Resolution System", manual: 10, auto: 4, manualLabel: "10", autoLabel: "4", note: "maker and checker" },
  { slug: "visa-mastercard-settlement", label: "Visa & Mastercard Settlement", manual: 4, auto: 2, manualLabel: "4", autoLabel: "2", note: "maker and checker" },
  { slug: "treasury-journal-automation", label: "Treasury Journal", manual: 2, auto: 0, manualLabel: "2", autoLabel: "0", note: "monitoring only" },
  { slug: "gl-difference-journal-automation", label: "GL Difference Journals", manual: 1, auto: 0, manualLabel: "1", autoLabel: "0", note: "monitoring only" },
  { slug: "fund-disbursement-automation", label: "Fund Disbursement", manual: 1, auto: 0, manualLabel: "1", autoLabel: "0", note: "monitoring only" },
  { slug: "core-banking-realtime-integration", label: "Core Banking, customer data update", manual: 1, auto: 0, manualLabel: "1", autoLabel: "0", note: "monitoring only" },
  { slug: "monitoring-reporting-automation", label: "Monitoring & Reporting", manual: 1, auto: 0, manualLabel: "1", autoLabel: "0", note: "sent automatically" },
];

export const education = {
  when: "2016–2020",
  title: "B.Eng. Telecommunication Engineering",
  org: "Telkom University",
  body: "GPA 3.66",
};
