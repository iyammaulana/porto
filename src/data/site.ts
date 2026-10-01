// Single source of truth for all copy on the site.
// Sourced from the CV, certificates, and the project documents in "referensi project/".
// Internal system names are intentionally left out — keep it that way when editing.

export const profile = {
  name: "Norma Irkham Maulana",
  initials: "NIM",
  role: "Senior Automation & Software Engineer",
  location: "Jakarta, Indonesia",
  email: "normairkhamm@gmail.com",
  linkedin: "https://linkedin.com/in/norma-irkham-maulana",
  linkedinLabel: "linkedin.com/in/norma-irkham-maulana",
  summary:
    "RPA & software engineer with 5+ years in banking. I design and ship end-to-end automation — robots, web applications, integrations, and the AI gateway that connects them.",
};

export const metrics = [
  { value: "100+", label: "production-grade robots delivered" },
  { value: "1–2M", label: "transactions reconciled daily" },
  { value: "85%", label: "of manual reconciliation automated" },
  { value: "5+ yrs", label: "building automation in banking" },
];

export type Project = {
  slug: string;
  title: string;
  category: "RPA" | "AI Platform" | "RPA + Web App" | "Integration";
  featured?: boolean;
  summary: string;
  facts: { label: string; value: string }[];
  metrics: { value: string; label: string }[];
  flow: string[];
  // Optional richer detail for the case study page.
  robots?: { name: string; body: string }[];
  flows?: {
    title: string;
    steps: { text: string; actor: "auto" | "human"; branch?: string }[];
  }[];
  flowNote?: string;
  context: string;
  built: string[];
  decisions: { title: string; body: string }[];
  note?: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "dispute-resolution-system",
    title: "Dispute Resolution System",
    category: "RPA + Web App",
    featured: true,
    summary:
      "A maker robot and a checker robot run the bank's dispute desk on third-party portals around the clock, backed by a web app where people approve every movement of money. Replaced a 10–15 person manual operation.",
    facts: [
      { label: "Role", value: "Individual contributor — process analysis, design, development, maintenance" },
      { label: "Status", value: "Rolled out in stages 2023–2025, in production" },
      { label: "Build time", value: "~1 month per dispute lane, ~7 weeks for credit card" },
    ],
    metrics: [
      { value: "10–15 → 4", label: "staff needed: from 10–15 manual to 2 makers + 2 approvers" },
      { value: "1 h → 5–10 min", label: "processing time per transaction" },
      { value: "24/7", label: "maker and checker robots on third-party portals" },
    ],
    flow: [
      "Maker robot detects a new claim on the portal, 24/7",
      "Status updated, approved by the checker robot",
      "Claiming bank notified, transaction scraped into DRS",
      "Looked up against reconciliation data",
      "Match: robot answers and closes · Unmatch: human-approved posting",
    ],
    robots: [
      {
        name: "Maker robot",
        body: "Watches CIPortal (BI-Fast), Artajasa, and Prima (ATM) 24/7. Responds to new claims, files outgoing claims, and follows every case until it closes.",
      },
      {
        name: "Checker robot",
        body: "Approves every status change the maker robot makes, from a separate machine — so the portal's dual control is met without a person waiting on it.",
      },
      {
        name: "Terminal robot",
        body: "Executes fraud reporting (TC40) directly on the AS400 core banking terminal for credit card cases, where no service or API exists.",
      },
    ],
    flows: [
      {
        title: "Incoming — another bank claims against us",
        steps: [
          { actor: "auto", text: "Maker robot detects a new claim on the portal" },
          { actor: "auto", text: "Status New → In Progress, approved by the checker robot" },
          { actor: "auto", text: "Robot messages the claiming bank: we are checking" },
          { actor: "auto", text: "Transaction data scraped into the DRS database" },
          { actor: "auto", text: "Looked up against reconciliation data" },
          {
            actor: "auto",
            branch: "Match",
            text: "Robot replies with the time the funds were credited, waits for the other bank's answer or the ticket's expiry, then sets the dispute to Initiate Completed",
          },
          {
            actor: "human",
            branch: "Unmatch",
            text: "Posting to the account through Open API, approved by a human maker and checker",
          },
        ],
      },
      {
        title: "Outgoing — our customer claims",
        steps: [
          { actor: "auto", text: "Case arrives from the call center through API" },
          { actor: "auto", text: "Looked up against reconciliation data" },
          {
            actor: "auto",
            branch: "Unmatch",
            text: "The transaction did fail on our side — flagged as an exception and the case stops in DRS, nothing to claim",
          },
          {
            actor: "auto",
            branch: "Match",
            text: "Maker robot files the claim with the other bank on the portal, the checker robot approves",
          },
          {
            actor: "auto",
            text: "Robot follows the conversation on the portal until the outcome is known: a credit adjustment from the third party, or the ticket's expiry",
          },
          { actor: "auto", text: "Robot writes the outcome back to the DRS database" },
          {
            actor: "human",
            text: "Human maker and checker post the credit in DRS — the robot only triggers and updates, it never posts",
          },
          { actor: "auto", text: "Case closed, status returned to the call center" },
        ],
      },
    ],
    flowNote:
      "The same two flows run for ATM disputes through Artajasa and Prima — transfers and cash withdrawals, incoming and outgoing.",
    context:
      "A customer dispute never finishes in one system. It starts at the call center, moves to another bank or a card network, waits days for an answer, and only ends when money moves into or out of an account. Before this system, a team of 10–15 makers and approvers did all of it by hand — checking third-party portals, matching reconciliation data, preparing postings.",
    built: [
      "One system across four lanes: BI-Fast, ATM (two switching networks), credit card, and closed card / service-charge waivers.",
      "The robots that operate the third-party portals, and the web application where human makers and checkers approve postings.",
      "Credit card disputes: separate maker queues for denied transactions and disputed details, lookups against the card data warehouse to verify the transaction, then approver sign-off and a second monitoring stage before the case closes. Communication with Visa keeps this lane partly manual.",
      "Delivered lane by lane: incoming ATM (2023), BI-Fast incoming and outgoing (2024), outgoing ATM and credit card (2025). QR disputes are in development.",
    ],
    decisions: [
      {
        title: "Robots as the missing API",
        body: "CIPortal, Artajasa, and Prima offer no API. Robots operate those portals behind the same internal interface an API integration would use, so the core of the system — database, business logic, match decisions — doesn't care whether a counterparty is reached through a real API or a robot.",
      },
      {
        title: "An SLA that doesn't sleep",
        body: "Every claim on the portal carries a deadline. A ticket that expires unanswered means a reprimand and a fine for the bank that missed it, so the maker robot picks up new claims at any hour instead of waiting for office time.",
      },
      {
        title: "A captcha at the front door",
        body: "One of the third-party portals puts a captcha on its login. The robot reads it with OCR combined with an AI model, so it signs in on its own and a 24/7 run never waits for a person to type it in.",
      },
      {
        title: "Cases that live for days",
        body: "An outgoing dispute can wait days for another bank or for Visa. Case state is stored in the database and rechecked until the case is truly closed — a long-running workflow, not a request-response call.",
      },
      {
        title: "Six posting paths after approval",
        body: "Each action a maker selects takes the route that fits it: Open API where a service exists, a robot on the AS400 terminal where none does, the call center API for comments, the database for everything local. No single generic mechanism forced onto all of them.",
      },
      {
        title: "Automation stops where money moves",
        body: "Everything is automated except the debit and credit postings themselves. Those still pass a human maker and checker — for credit card disputes, in two separate departments.",
      },
    ],
    stack: [
      "UiPath (Unattended)",
      "REFramework",
      "Web scraping",
      "OCR",
      "AI integration",
      "Terminal automation (AS400)",
      "Laravel",
      "Bootstrap",
      "jQuery",
      "DataTables",
      "AJAX",
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
  },
  {
    slug: "enterprise-ai-gateway",
    title: "Enterprise AI Gateway",
    category: "AI Platform",
    featured: true,
    summary:
      "Developers at the bank code with Claude Code — and every request they send goes through a gateway I built: one key per developer, guardrails on what leaves the bank, and automatic failover when a model hits its limit.",
    facts: [
      { label: "Role", value: "Gateway developer within a larger, cross-team AI platform initiative" },
      { label: "Status", value: "Pilot in daily use, rolling out to 200+ users" },
      { label: "Used from", value: "Claude Code — by developers, analysts, and testers" },
      { label: "Models", value: "Claude and GLM today; Gemini planned" },
    ],
    metrics: [
      { value: "~70", label: "developers registered and coding through it" },
      { value: "200+", label: "target users: analysts, developers, testers" },
      { value: "1 endpoint", label: "for Claude and GLM, with Gemini next" },
    ],
    flow: [
      "Developer works in Claude Code",
      "Request hits the gateway with the developer's own key",
      "Guardrails check for PII and prompt injection",
      "Routed to Claude or GLM, load balanced across accounts",
      "Model at its limit? Fail over until its reset time",
      "Usage and tokens logged per developer",
    ],
    context:
      "Developers wanted Claude Code in their daily work. Letting each of them connect straight to a provider would mean API keys scattered across laptops, no view of who used what, and source code or customer data leaving the bank inside a prompt with nothing checking it. The gateway sits between Claude Code and every model, so the bank gets that control without taking the tool away.",
    built: [
      "Compared LiteLLM and Bifrost during development, chose Bifrost — an open-source LLM gateway — and customized it in Go.",
      "Claude Code wired to the gateway, so developers keep their normal workflow while authentication, limits, and routing happen behind it.",
      "Authentication and per-developer limits, replacing shared provider keys.",
      "Routing to Claude or GLM (via Z.AI), with load balancing that combines round robin and latency across providers and accounts.",
      "Integration with the security team's guardrail system for PII detection, prompt injection, and content control.",
      "Layered observability: detailed data lands in ClickHouse, and both Langfuse and the security team's monitoring read from that one source.",
    ],
    decisions: [
      {
        title: "One model wasn't enough",
        body: "Early on a single model took every request and hit its rate limit fast. The fix went two ways: add alternative models, and add several subscription accounts for the same model so load is balanced across them instead of resting on one quota.",
      },
      {
        title: "Fallback that knows what time it is",
        body: "Fallback doesn't just switch models when a limit is hit. It stores the limit status and reset time in a database, so a limited model isn't retried pointlessly before it actually resets.",
      },
      {
        title: "Debugging across providers",
        body: "Putting Claude Code and GLM behind one gateway surfaced different authentication schemes, Docker networking issues, timeouts, and API format incompatibilities. Each was resolved layer by layer until every provider behaved consistently.",
      },
    ],
    note: "Part of a cross-team effort: guardrail logic comes from the IT security team and the servers from infrastructure. The gateway is mine.",
    stack: ["Bifrost", "Go", "Claude Code", "Claude", "GLM (Z.AI)", "Docker", "ClickHouse", "Langfuse"],
  },
  {
    slug: "core-banking-realtime-integration",
    title: "Core Banking Realtime Integration",
    category: "Integration",
    featured: true,
    summary:
      "Unattended robots as a real-time bridge between a modern application and an AS400 core banking system with no native API — for customer data updates, credit card blocking, and QRIS merchant onboarding.",
    facts: [
      { label: "Role", value: "Individual contributor — research, design, RPA development, Orchestrator API integration" },
      { label: "Status", value: "In production since 2023" },
      { label: "Build time", value: "~1.5 months, including research" },
    ],
    metrics: [
      { value: "30 → 10 min", label: "customer data update, manual vs robot" },
      { value: "25–50+", label: "update requests handled per day" },
      { value: "Real-time", label: "triggered and tracked by API, no batch wait" },
    ],
    flow: [
      "Calling app sends a request to the Orchestrator API",
      "Queue item created in real time",
      "Queue trigger starts the robot",
      "Robot executes on the AS400 core banking terminal",
      "Callback sent to the app over REST",
    ],
    context:
      "Another team's application needed three sensitive core banking operations: customer data updates, credit card blocking, and QRIS merchant onboarding. The legacy core banking system is terminal-based with no native API, so staff did them by hand — even though a card block has to happen fast and a merchant is waiting on confirmation.",
    built: [
      "Three unattended robots, callable in real time through the UiPath Orchestrator API — no extra API service to build from scratch.",
      "Every request becomes a queue item, and a queue trigger starts the robot automatically.",
      "The calling app tracks progress by polling status, or by receiving a callback the robot sends over REST when it finishes — success or failure.",
      "Each process runs on its own dedicated server.",
    ],
    decisions: [
      {
        title: "Real time, not scheduled",
        body: "Most automation runs on a scheduler. This one had to be callable at any moment from another application, which meant researching how to trigger jobs through the Orchestrator API and handle status and callbacks reliably — the main reason it took longer than a batch project.",
      },
      {
        title: "A queue to prevent race conditions",
        body: "Several requests for the same process can arrive at once. Instead of executing in parallel, each becomes a queue item and the robot handles one transaction at a time per process — safe for a sensitive core system, still real-time from the caller's side.",
      },
      {
        title: "Legacy terminals fail in their own ways",
        body: "AS400 sessions are prone to timeouts. Following REFramework, system exceptions such as a dropped session are retried automatically, while business exceptions such as invalid data stop immediately and report a clear reason.",
      },
    ],
    stack: [
      "UiPath (Unattended)",
      "REFramework",
      "Orchestrator API",
      "Queues & queue triggers",
      "Terminal/Mainframe & Citrix automation",
      "REST",
    ],
  },
  {
    slug: "visa-mastercard-settlement",
    title: "Visa & Mastercard Settlement Automation",
    category: "RPA + Web App",
    featured: true,
    summary:
      "Settlement, reconciliation, and journal automation for two global card networks — from raw TXT files to accounting posting through a maker–approver workflow.",
    facts: [
      { label: "Role", value: "Individual contributor — design, RPA and web application development, maintenance" },
      { label: "Status", value: "In production since 2023, runs daily" },
      { label: "Build time", value: "~1.5 months" },
    ],
    metrics: [
      { value: "1 h → 10 min", label: "Visa settlement processing" },
      { value: "45 → 7 min", label: "Mastercard settlement processing" },
      { value: "2–4 → 1", label: "staff: down to one person monitoring" },
    ],
    flow: [
      "Raw TXT settlement files",
      "Parse, extract, transform",
      "Reconcile across sources",
      "Calculate result, generate journal",
      "Maker reviews, approver signs off",
      "Posted to host via Open API",
    ],
    context:
      "Settlement with Visa and Mastercard is among the most sensitive accounting processes a bank runs — it reflects its financial position against two global card networks, at a scale of billions of rupiah a day. The data arrives as unstructured TXT files and was processed by hand in Excel by 2–4 people: about an hour for Visa and 45 minutes for Mastercard, every day.",
    built: [
      "File handling and parsing: locate the files for the settlement period, validate that they are complete, parse records, and extract the fields needed.",
      "Transformation: clean and normalize fields, consolidate multiple files, and validate empty, invalid, and duplicate data.",
      "Excel as part of the pipeline: fill templates, run the calculations, and validate results before they become the basis for journals.",
      "Reconciliation: match across sources by reference, compare amounts, and separate matched from unmatched records.",
      "A web application I built on top of the journal database: monitoring dashboard plus the maker–approver workflow, then posting to host through Open API and middleware.",
    ],
    decisions: [
      {
        title: "Reconciliation as a gate",
        body: "Transactions and amounts from every source must match before the settlement result is calculated and a journal is formed. Errors are caught before a journal exists, not after.",
      },
      {
        title: "A two-day incident, fixed at the right layer",
        body: "The source format changed without notice and the robot failed two days running. Rather than patch one spot, I reworked the TXT-to-datatable transformation so its output structure stays constant whatever the raw file looks like. Everything downstream stopped depending on the raw format.",
      },
      {
        title: "Human approval on financial posting",
        body: "The robot's output is never posted directly. Four makers and two approvers review it daily in the web application before it goes to host — segregation of duty on a sensitive accounting process.",
      },
      {
        title: "Late data fails visibly",
        body: "When source files aren't there at the scheduled time, the robot stops with a clear File Not Found in Orchestrator, so someone can chase the data and re-run it.",
      },
    ],
    stack: [
      "UiPath (Unattended)",
      "REFramework",
      "Orchestrator",
      "Regex",
      "Excel automation",
      "Web application (Maker–Approver)",
      "Open API & middleware",
      "MySQL",
      "SQL Server",
    ],
  },
  {
    slug: "reconciliation-engine",
    title: "Reconciliation Engine",
    category: "RPA + Web App",
    summary:
      "An automated reconciliation engine for BI-Fast, QR, and Biller transactions that doesn't stop at detection — it posts transactions in real time and refunds failed ones automatically.",
    facts: [
      { label: "Role", value: "Developer — reconciliation engine across BI-Fast, QR, and Biller" },
      { label: "Status", value: "In production since 2022, from the day BI-Fast went live" },
      { label: "Build time", value: "1–2 months (BI-Fast module)" },
    ],
    metrics: [
      { value: "85%", label: "of previously manual reconciliation automated" },
      { value: "1–2M", label: "heterogeneous transactions per day" },
      { value: "Every 15 min", label: "BI-Fast pulls, 24/7, 3,000–4,000+ transactions each" },
    ],
    flow: [
      "Host data → SFTP → import engine → staging",
      "Robot pulls CIPortal every 15 minutes → staging",
      "Both sides reconciled: match / unmatch",
      "Real-time transaction posting",
      "Automated refunds for failed transactions",
      "Results on the dashboard",
    ],
    context:
      "Every transaction has two records: one in the bank's host system and one in the external network — for BI-Fast, Bank Indonesia's. They have to agree, because a gap on either side means money to adjust or refund. At one to two million transactions a day across BI-Fast, QR, and Biller, matching by hand is not realistic.",
    built: [
      "An automated reconciliation engine covering BI-Fast, QR, and Biller transactions.",
      "A robot that pulls BI-Fast transaction data from CIPortal every 15 minutes into a staging database.",
      "An import engine that loads host data from SFTP into its own staging database.",
      "Real-time transaction posting and automated refunds for failed transactions, closing the loop from detection to resolution.",
      "A Laravel dashboard showing matched and unmatched results about 30 minutes after each pull.",
    ],
    decisions: [
      {
        title: "Never overlap a 15-minute cycle",
        body: "With 3,000 to more than 4,000 transactions per pull, the robot is designed to always finish a batch before the next window opens, so cycles never collide.",
      },
      {
        title: "Two backup robots for late data",
        body: "Data from CIPortal sometimes arrives late. One backup robot finds the last recorded trigger time and re-pulls from there automatically. A second runs from a trigger file a user uploads with the exact time range to re-pull — manual control for whatever the first one misses.",
      },
    ],
    stack: ["UiPath (Unattended)", "REFramework", "SFTP", "Staging databases", "Laravel", "MySQL / SQL Server"],
  },
  {
    slug: "treasury-journal-automation",
    title: "Treasury Journal Automation",
    category: "RPA",
    summary:
      "Five robots that calculate and post daily debit/credit GL journals for Treasury Operations — retail bond tax, MTM options, securities tax, AFS bonds, and RTGS fees.",
    facts: [
      { label: "Role", value: "Individual contributor — process analysis, solution design, development" },
      { label: "Status", value: "In production since 2021" },
      { label: "Build time", value: "5–10 working days per process, 15 for AFS bonds" },
    ],
    metrics: [
      { value: "3 → 1", label: "staff: three operators down to one supervisor monitoring" },
      { value: "30 → 3–5 min", label: "per journal (up to 1 h → 5–10 min for AFS bonds)" },
      { value: "0", label: "human errors in the automated processes" },
    ],
    flow: [
      "Extract from web and desktop sources",
      "Filter, validate, look up, match",
      "Apply business rules and calculate",
      "Map debit/credit to GL, generate CSV",
      "Send to core banking over SFTP",
      "Posting result stored, shown on dashboard",
    ],
    context:
      "Treasury Operations ran several daily journaling processes by hand in Excel. Volumes were modest — tens to hundreds of transactions a day — but each process layered filtering, lookups, and business-rule calculations, which made manual work prone to miscalculation and misposting. Three staff spent 30 minutes to an hour per process, every day.",
    built: [
      "Analyzed the manual work with the Treasury Operations team and picked the processes worth automating.",
      "Five UiPath robots following one consistent pipeline from extraction to posting.",
      "A Laravel monitoring dashboard for process status, generated journals, delivery and posting status, errors, and history.",
    ],
    decisions: [
      {
        title: "Two robots for AFS bonds",
        body: "Where a transaction's coupon period sits relative to its trade date and settle date changes the calculation entirely — several branching conditions, not one formula. Splitting it into two robots, one per date, kept it accurate and maintainable.",
      },
      {
        title: "A setup robot, separate from the business robot",
        body: "One process needs the browser in IE mode. A dedicated robot prepares that environment before the main robot runs, instead of mixing environment setup into business logic.",
      },
      {
        title: "Failures stay out of the numbers",
        body: "Every robot has thorough error handling with automatic notifications. In years of production the journal amounts have never been wrong — failures have always been in access or environment, such as a changed selector or a blocked account, never in calculation.",
      },
    ],
    stack: ["UiPath (Unattended)", "REFramework", "Git", "Laravel", "MySQL", "SQL Server", "FTP/SFTP"],
  },
  {
    slug: "gl-difference-journal-automation",
    title: "GL Difference Journal Automation",
    category: "RPA",
    summary:
      "Parsing raw third-party TXT reports for ten card and payment transaction types into GL adjustment journals posted to core banking.",
    facts: [
      { label: "Role", value: "Individual contributor — design and development" },
      { label: "Status", value: "In production since 2022" },
    ],
    metrics: [
      { value: ">1 h → ~15 min", label: "to confirmed posting (~5 min send + ~10 min response check)" },
      { value: "10", label: "transaction types, each with its own parsing pattern" },
      { value: "2 → 1", label: "staff: two operators down to one supervisor" },
    ],
    flow: [
      "Third-party TXT reports from FTP",
      "Parse and identify patterns",
      "Filter, validate, group, match",
      "Calculate, determine debit/credit GL",
      "CSV journal sent to core banking",
      "Posting result shown on dashboard",
    ],
    context:
      "The transaction operations division books GL differences for ten card and payment transaction types — QR, NPG acquiring, interface rejections, and credit card payments across channels. The source is raw, unstructured TXT reports from third parties, each type in a different format. Two staff downloaded, read, mapped, and posted them by hand: more than an hour a day.",
    built: [
      "Ten transaction types automated through one pipeline, from TXT report to posting result.",
      "Regex and pattern-based parsing that turns each raw report into a structured datatable.",
      "Daily scheduled runs through Orchestrator: journals reach the host in about 5 minutes and the host response is checked about 10 minutes later.",
      "A Laravel dashboard covering robot status, parsing results, journals, delivery, posting, history, and error details.",
    ],
    decisions: [
      {
        title: "Ten formats, no shared structure",
        body: "No single format covers all ten reports. For some, the approach was to study the data's pattern first, then reverse-engineer it into a structured datatable with its own processing logic.",
      },
      {
        title: "Fail loudly rather than post wrong",
        body: "The data comes from third parties and can change format at any time. If it does, the robot stops with an error instead of carrying on with a bad parse. That is deliberate: a visible failure in Orchestrator beats a wrong journal hidden in core banking.",
      },
      {
        title: "Late data is the usual failure",
        body: "Most failures are source files that haven't arrived yet. The robot stops with a clear File Not Found, the user chases the data, then re-runs the robot from Orchestrator without waiting for the next schedule.",
      },
    ],
    stack: ["UiPath (Unattended)", "REFramework", "Orchestrator", "Regex", "Laravel", "MySQL", "SQL Server", "FTP/SFTP"],
  },
  {
    slug: "fund-disbursement-automation",
    title: "Fund Disbursement Automation",
    category: "RPA",
    summary:
      "Daily fund transfers and journals built from unstructured settlement reports — card payments, QR, and Mastercard — running every day of the year.",
    facts: [
      { label: "Role", value: "Individual contributor — design, development, maintenance" },
      { label: "Status", value: "In production since 2023" },
      { label: "Build time", value: "15 working days" },
    ],
    metrics: [
      { value: "1 h → 0–5 min", label: "to send data to host, plus 0–10 min to confirmation" },
      { value: "7 days/week", label: "including weekends and public holidays" },
      { value: "2 → 1", label: "staff: two operators down to one person monitoring" },
    ],
    flow: [
      "Settlement reports, mostly unstructured TXT",
      "Parse, extract, validate",
      "Calculate by each channel's business rule",
      "Build transfer transaction and journal",
      "Post to the target system",
      "Logged and monitored",
    ],
    context:
      "Unlike GL-to-GL journaling, this process moves funds between a GL and an account. The amounts come from the settlement report of each payment channel — mostly TXT with little structure. Two staff read the reports, worked out the amounts, and created the transfers and journals by hand: about an hour per process.",
    built: [
      "Robots covering Syariah Card payments, QR, credit card payments through BCA, BNI, and Mandiri, and Mastercard settlement.",
      "Runs every day without exception, tracked in Orchestrator and in a Laravel dashboard I built for posting status.",
      "Exception handling and logging so a failed transaction is always identified, never silently skipped.",
    ],
    decisions: [
      {
        title: "Unstructured reports, a different rule per channel",
        body: "Most settlement reports have no fixed structure. The robot has to recognize each channel's pattern before it can extract the right values, validate them, and calculate the transfer amount by that channel's rule.",
      },
      {
        title: "When input data isn't ready",
        body: "The most common failure is a source file that hasn't been delivered yet. It surfaces as a clear File Not Found in Orchestrator; once the data is ready, the user re-runs the robot.",
      },
    ],
    stack: ["UiPath (Unattended)", "REFramework", "Orchestrator", "Regex", "Laravel", "MySQL", "SQL Server"],
  },
  {
    slug: "monitoring-reporting-automation",
    title: "Monitoring & Reporting Automation",
    category: "RPA",
    summary:
      "Eight robots for regulatory reporting and operational monitoring — pulling from web apps, desktop apps, a data warehouse, and SFTP, and delivering finished reports by email.",
    facts: [
      { label: "Role", value: "Individual contributor — process analysis, solution design, development" },
      { label: "Status", value: "Went live between 2021 and 2024, all still running" },
      { label: "Build time", value: "3–5 working days per process" },
    ],
    metrics: [
      { value: "8", label: "monitoring and reporting robots, daily to monthly" },
      { value: "10–15 → 2–3 min", label: "regulatory report preparation" },
      { value: "3×/day", label: "payment system status checks" },
    ],
    flow: [
      "Web, desktop app, data warehouse, SFTP",
      "Extract",
      "Look up, match, enrich",
      "Validate and transform",
      "Generate Excel / PDF report",
      "Deliver by email",
    ],
    context:
      "Treasury prepares regulatory reports for OJK and runs a set of operational monitoring and reporting tasks alongside them. All of it was manual: staff downloaded reports from source systems and saved the files to shared folders for other teams.",
    built: [
      "Three regulatory reports for OJK: daily customer bond transactions, monthly securities-dealer activity, and monthly intragroup transactions with counterparty matching.",
      "Five operational robots: payment system status checks three times a day, trade-date corrections with a daily HTML report, corporate ride-hailing transaction pooling, daily project progress from Jira, and mutual fund stamp-duty data.",
      "A reusable notification library (Telegram, WhatsApp) shared across robots instead of rewritten for each one.",
    ],
    decisions: [
      {
        title: "Report format separated from data logic",
        body: "Regulatory formats change. The mapping and layout of each report can be adjusted without touching how the data is fetched and processed, so a format change is a small edit, not a rebuild.",
      },
      {
        title: "A distorted captcha, read with OCR plus an LLM",
        body: "One source portal sits behind a captcha with strike-through noise that plain OCR reads poorly. The robot combines Tesseract OCR with an LLM API call to verify the reading before submitting, which made the daily data pull fully unattended.",
      },
      {
        title: "No dashboard where email is enough",
        body: "These reports don't need a separate monitoring dashboard — the automated email is both the result and the status. The solution was kept as small as the problem.",
      },
    ],
    stack: [
      "UiPath (Unattended)",
      "Git",
      "Web scraping",
      "SFTP",
      "Tesseract OCR",
      "LLM API",
      "Excel / PDF automation",
      "Telegram Bot API",
    ],
  },
];

export const principles = [
  {
    title: "Automation stops where money moves",
    body: "Robots speed up every step leading to a decision. The decision that moves funds stays with a human maker and checker.",
    slug: "dispute-resolution-system",
  },
  {
    title: "Fail loudly, never post wrong",
    body: "When an input changes shape, the robot stops with a visible error instead of carrying on. A failed run is cheap; a wrong journal is not.",
    slug: "gl-difference-journal-automation",
  },
  {
    title: "A robot can be the missing API",
    body: "Legacy cores and third-party portals rarely offer an API. A robot behind a clean interface gives the rest of the system one anyway.",
    slug: "core-banking-realtime-integration",
  },
  {
    title: "Isolate what changes",
    body: "Source formats and regulatory layouts shift without warning. Keep them in one layer so everything downstream never notices.",
    slug: "visa-mastercard-settlement",
  },
];

export const stack = [
  {
    group: "RPA",
    items: [
      "UiPath",
      "REFramework",
      "Orchestrator",
      "Queues & API Triggers",
      "Terminal / Mainframe",
      "OCR",
      "Attended & Unattended",
    ],
  },
  {
    group: "AI & Integration",
    items: [
      "Bifrost",
      "Langfuse",
      "LLM Integration",
      "Prompt Engineering",
      "Claude Code",
      "OpenAI Codex",
    ],
  },
  {
    group: "Software",
    items: ["PHP (Laravel)", "RESTful APIs", "JavaScript", "Node.js", "Go", "HTML/CSS", "jQuery"],
  },
  {
    group: "Infrastructure",
    items: ["Docker", "GitLab CI", "GitHub Actions", "Linux (Ubuntu)", "Windows Server", "Nginx", "Apache"],
  },
  {
    group: "Data",
    items: ["SQL Server", "MySQL", "PostgreSQL", "ClickHouse", "Redis"],
  },
];

export const journey = [
  {
    when: "Nov 2020 — Present",
    title: "Senior Automation & Software Engineer",
    org: "PT Bank Mega",
    body: "End-to-end automation combining RPA, web applications, APIs, and AI. Build the AI gateway and keep production systems reliable through incident investigation, root cause analysis, and performance work.",
  },
  {
    when: "Jan 2021",
    title: "UiPath Certified RPA Associate",
    org: "UiPath",
    body: "Certified UiRPA v1.0.",
  },
  {
    when: "Oct 2020",
    title: "RPA Training Co-Facilitator",
    org: "ONE Indonesia × UiPath",
    body: "Co-facilitated a two-day RPA training.",
  },
  {
    when: "May — Sep 2020",
    title: "2nd Place, ICStar RPA Hackathon",
    org: "PT IDStar Cipta Teknologi",
    body: "Built a robot reconciling third-party (Visa) transactions: a 2-hour manual process done in 3–5 minutes, eliminating a 40% human error rate.",
  },
  {
    when: "2016 — 2020",
    title: "B.Eng. Telecommunication Engineering",
    org: "Telkom University",
    body: "GPA 3.66.",
  },
];
