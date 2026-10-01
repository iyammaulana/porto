// Single source of truth for all copy on the site.
// Sourced from the CV, certificates, and the project documents in "referensi project/".
// Follow DESIGN.md: no em dashes in copy, every claim carries a number or a named system.
// Internal system names are intentionally left out. Keep it that way when editing.

export const profile = {
  name: "Norma Irkham Maulana",
  role: "Senior Automation & Software Engineer",
  company: "PT Bank Mega",
  tagline: "100+ UiPath robots in production since 2020.",
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
  summary: string;
  role: string;
  since?: string;
  status: "RUNNING" | "PILOT";
  statusNote?: string;
  // One row in the process registry on the home page.
  registry: { trigger: string; runs: string; result: string };  spec: { label: string; value: string }[];
  results: { measure: string; before?: string; after: string }[];
  context: string;
  built: string[];
  robots?: { name: string; body: string }[];
  logs: { title?: string; steps: { actor: Actor; branch?: string; text: string }[] }[];
  logNote?: string;
  exceptions?: { type: "BUSINESS" | "SYSTEM"; when: string; then: string }[];
  decisions?: { title: string; body: string }[];
  note?: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "dispute-resolution-system",
    title: "Dispute Resolution System",
    kind: "RPA + Web app",
    summary:
      "A maker robot and a checker robot work the bank's dispute tickets on BI-Fast and ATM portals around the clock. People approve every posting in a Laravel web app. The system replaced a 10–15 person manual operation.",
    role: "Individual contributor: process analysis, design, development, maintenance",
    since: "2023",
    status: "RUNNING",
    statusNote: "Lanes released 2023–2025. QR disputes in development.",
    registry: { trigger: "Portal poll + API", runs: "24/7", result: "1 h → 5–10 min" },    spec: [
      { label: "Trigger", value: "Polling third-party portals (incoming), call center API (outgoing)" },
      { label: "Runs", value: "24/7" },
      { label: "Input", value: "Dispute tickets on CIPortal, Artajasa, and Prima. Cases from the call center." },
      { label: "Output", value: "Ticket status and messages on the portal, case records in DRS, postings approved by people" },
      { label: "Robots", value: "Maker, checker, and a terminal robot for AS400" },
      { label: "Build time", value: "About 1 month per dispute lane, 7 weeks for credit card" },
    ],
    results: [
      { measure: "Staff on the dispute desk", before: "10–15", after: "4 (2 makers, 2 approvers)" },
      { measure: "Processing time per transaction", before: "1 h", after: "5–10 min" },
    ],
    context:
      "A dispute starts at the call center, moves to another bank or a card network, waits days for an answer, and ends when money moves in or out of an account. Before this system, 10–15 makers and approvers did every step by hand: checking third-party portals, matching reconciliation data, preparing postings.",
    built: [
      "One system across four lanes: BI-Fast, ATM on two switching networks, credit card, and closed card and service-charge waivers.",
      "The robots that operate the third-party portals, and the web app where human makers and checkers approve postings.",
      "Credit card disputes with separate maker queues, lookups against the card data warehouse to verify each transaction, approver sign-off, and a monitoring stage before the case closes. Communication with Visa keeps part of this lane manual.",
      "Released lane by lane: incoming ATM in 2023, BI-Fast incoming and outgoing in 2024, outgoing ATM and credit card in 2025.",
    ],
    robots: [
      {
        name: "Maker robot",
        body: "Watches CIPortal (BI-Fast), Artajasa, and Prima (ATM) 24/7. Responds to new claims, files outgoing claims, and follows every case until it closes.",
      },
      {
        name: "Checker robot",
        body: "Approves every status change the maker robot makes. It runs on a separate machine, so the portal's dual control holds without a person waiting on it.",
      },
      {
        name: "Terminal robot",
        body: "Files fraud reports (TC40) directly on the AS400 core banking terminal for credit card cases, where no service or API exists.",
      },
    ],
    logs: [
      {
        title: "Incoming: another bank claims against us",
        steps: [
          { actor: "ROBOT", text: "New claim found on the portal" },
          { actor: "ROBOT", text: "Status New → In Progress, approved by the checker robot" },
          { actor: "ROBOT", text: "Message to the claiming bank: under review" },
          { actor: "ROBOT", text: "Transaction data scraped into the DRS database" },
          { actor: "SYSTEM", text: "Lookup against reconciliation data" },
          {
            actor: "ROBOT",
            branch: "MATCH",
            text: "Reply with the credit time, wait for the other bank's answer or the ticket's expiry, set Initiate Completed",
          },
          {
            actor: "HUMAN",
            branch: "UNMATCH",
            text: "Posting to the account through Open API, approved by a maker and a checker",
          },
        ],
      },
      {
        title: "Outgoing: our customer claims",
        steps: [
          { actor: "SYSTEM", text: "Case arrives from the call center API" },
          { actor: "SYSTEM", text: "Lookup against reconciliation data" },
          {
            actor: "SYSTEM",
            branch: "UNMATCH",
            text: "The transfer failed on our side. Flagged as an exception, the case stops in DRS",
          },
          {
            actor: "ROBOT",
            branch: "MATCH",
            text: "Claim filed with the other bank on the portal, approved by the checker robot",
          },
          {
            actor: "ROBOT",
            text: "Follows the ticket until a credit adjustment arrives or the ticket expires",
          },
          { actor: "ROBOT", text: "Outcome written to the DRS database" },
          { actor: "HUMAN", text: "Maker and checker post the credit in DRS" },
          { actor: "SYSTEM", text: "Case closed, status returned to the call center" },
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
        body: "CIPortal, Artajasa, and Prima have no API. The robots sit behind the same internal interface an API integration would use, so the core of DRS (database, business logic, match decisions) works the same whether a counterparty answers through an API or through a robot.",
      },
      {
        title: "The SLA runs at night too",
        body: "Every claim on the portal has a deadline. An expired ticket means a reprimand and a fine for the bank that missed it, so the maker robot picks up new claims at any hour.",
      },
      {
        title: "Cases that last for days",
        body: "An outgoing dispute can wait days for another bank or for Visa. Case state lives in the database and is checked again until the case closes.",
      },
      {
        title: "Six posting paths after approval",
        body: "Each action a maker selects takes the route that fits it. Open API where a service exists, a robot on the AS400 terminal where none does, the call center API for comments, and the database for everything local.",
      },
      {
        title: "People post the money",
        body: "Every step is automated except the debit and credit postings. Those pass a human maker and checker, and for credit card disputes they sit in two separate departments.",
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
    kind: "AI platform",
    summary:
      "Developers at the bank code with Claude Code, and every request goes through a gateway I built. Each developer has their own key, guardrails check what leaves the bank, and requests fail over when a model hits its limit.",
    role: "Gateway developer in a cross-team AI platform initiative",
    status: "PILOT",
    statusNote: "In daily use, rolling out to 200+ users.",
    registry: { trigger: "API request", runs: "On request", result: "~70 developers" },    spec: [
      { label: "Trigger", value: "Every request from Claude Code" },
      { label: "Users", value: "~70 developers, analysts, and testers. Target 200+." },
      { label: "Input", value: "Prompts from Claude Code, authenticated per developer" },
      { label: "Output", value: "Responses from Claude or GLM, usage and token logs per developer" },
      { label: "Models", value: "Claude and GLM. Gemini planned." },
    ],
    results: [
      { measure: "Registered users", after: "~70" },
      { measure: "Models behind one endpoint", after: "2, Gemini next" },
    ],
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
        body: "Early on, a single model took every request and hit its rate limit fast. I added alternative models, and several subscription accounts for the same model so the load spreads across quotas.",
      },
      {
        title: "Debugging across providers",
        body: "Putting Claude Code and GLM behind one gateway surfaced different authentication schemes, Docker networking issues, timeouts, and API format mismatches. I worked through them layer by layer until every provider behaved the same way.",
      },
    ],
    note: "Guardrail logic comes from the IT security team and the servers from the infrastructure team. I built the gateway.",
    stack: ["Bifrost", "Go", "Claude Code", "Claude", "GLM (Z.AI)", "Docker", "ClickHouse", "Langfuse"],
  },
  {
    slug: "core-banking-realtime-integration",
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
      { measure: "Update requests per day", after: "25–50+" },
    ],
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
    ],
    stack: [
      "UiPath (Unattended)",
      "REFramework",
      "Orchestrator API",
      "Queues & queue triggers",
      "Terminal & Citrix automation",
      "REST",
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
    registry: { trigger: "Schedule", runs: "Every 15 min", result: "1–2M tx / day" },    spec: [
      { label: "Trigger", value: "Orchestrator schedule, every 15 minutes" },
      { label: "Runs", value: "24/7" },
      { label: "Input", value: "Host data over SFTP, BI-Fast data from CIPortal" },
      { label: "Output", value: "Match and unmatch results, real-time postings and refunds, Laravel dashboard" },
      { label: "Volume", value: "3,000–4,000+ BI-Fast transactions per pull" },
      { label: "Build time", value: "1–2 months for the BI-Fast module" },
    ],
    results: [
      { measure: "Manual reconciliation automated", after: "85%" },
      { measure: "Transactions per day", after: "1–2M" },
      { measure: "From pull to result on the dashboard", after: "~30 min" },
    ],
    context:
      "Every transaction has two records: one in the bank's host system and one in the external network, which for BI-Fast is Bank Indonesia's. A gap on either side means money to adjust or refund. At one to two million transactions a day, matching by hand is not an option.",
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
        body: "Each pull carries 3,000 to more than 4,000 transactions. The robot is built to finish a batch before the next window opens, so two cycles never run at once.",
      },
    ],
    stack: ["UiPath (Unattended)", "REFramework", "SFTP", "Staging databases", "Laravel", "MySQL", "SQL Server"],
  },
  {
    slug: "visa-mastercard-settlement",
    title: "Visa & Mastercard Settlement",
    kind: "RPA + Web app",
    summary:
      "Robots parse the daily Visa and Mastercard settlement files, reconcile them, and draft the journals. Makers and approvers sign off in a web app I built before anything is posted to the host.",
    role: "Individual contributor: design, RPA and web app development, maintenance",
    since: "2023",
    status: "RUNNING",
    registry: { trigger: "Schedule", runs: "Daily", result: "60 → 10 min" },    spec: [
      { label: "Trigger", value: "Orchestrator schedule" },
      { label: "Runs", value: "Daily" },
      { label: "Input", value: "Unstructured TXT settlement files from card processing" },
      { label: "Output", value: "Reconciled settlement result and journals, posted to host after approval" },
      { label: "Approvals", value: "4 makers and 2 approvers, every day" },
      { label: "Build time", value: "About 1.5 months" },
    ],
    results: [
      { measure: "Visa settlement", before: "60 min", after: "10 min" },
      { measure: "Mastercard settlement", before: "45 min", after: "7 min" },
      { measure: "Staff processing settlement", before: "2–4", after: "1" },
    ],
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
        body: "Transactions and amounts from every source must match before the settlement result is calculated. A mistake shows up before a journal exists.",
      },
      {
        title: "A two-day incident, fixed one layer down",
        body: "The source format changed without notice and the robot failed two days in a row. I rebuilt the TXT-to-datatable transformation so it always produces the same structure, whatever the raw file looks like. Nothing downstream depends on the raw format anymore.",
      },
      {
        title: "People approve financial postings",
        body: "The robot's journals are never posted directly. Makers and approvers review them in the web app first, which keeps segregation of duty on a sensitive accounting process.",
      },
    ],
    stack: [
      "UiPath (Unattended)",
      "REFramework",
      "Orchestrator",
      "Regex",
      "Excel automation",
      "Laravel",
      "Open API & middleware",
      "MySQL",
      "SQL Server",
    ],
  },
  {
    slug: "treasury-journal-automation",
    title: "Treasury Journal Automation",
    kind: "RPA",
    summary:
      "Five robots that calculate and post the daily GL journals for Treasury Operations: retail bond tax, MTM options, securities tax, AFS bonds, and RTGS fees.",
    role: "Individual contributor: process analysis, solution design, development",
    since: "2021",
    status: "RUNNING",
    registry: { trigger: "Schedule", runs: "Daily", result: "30 → 3–5 min" },    spec: [
      { label: "Trigger", value: "Orchestrator schedule" },
      { label: "Runs", value: "Daily" },
      { label: "Input", value: "Transactions from web and desktop applications" },
      { label: "Output", value: "CSV journals posted to core banking over SFTP, Laravel monitoring dashboard" },
      { label: "Robots", value: "Five processes, AFS bonds split across two robots, plus an environment setup robot" },
      { label: "Build time", value: "5–10 working days per process, 15 for AFS bonds" },
    ],
    results: [
      { measure: "Staff", before: "3", after: "1 supervisor" },
      { measure: "Time per journal", before: "30 min", after: "3–5 min" },
      { measure: "AFS bond journal", before: "60 min", after: "5–10 min" },
      { measure: "Human errors", after: "0" },
    ],
    context:
      "Treasury Operations ran its daily journals by hand in Excel. Volumes were tens to hundreds of transactions a day, but every process stacked filters, lookups, and business-rule calculations. Three people spent 30 minutes to an hour per process, every day.",
    built: [
      "Worked through the manual processes with the Treasury Operations team and picked the ones worth automating.",
      "Five robots that share one pipeline from extraction to posting.",
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
        title: "Failures stay out of the numbers",
        body: "In years of production the journal amounts have never been wrong. Every failure so far has been access or environment, such as a changed selector or a blocked account.",
      },
    ],
    stack: ["UiPath (Unattended)", "REFramework", "Git", "Laravel", "MySQL", "SQL Server", "FTP/SFTP"],
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
    registry: { trigger: "Schedule", runs: "Daily", result: ">1 h → ~15 min" },    spec: [
      { label: "Trigger", value: "Orchestrator schedule" },
      { label: "Runs", value: "Daily" },
      { label: "Input", value: "Third-party TXT reports from FTP, a different format per transaction type" },
      { label: "Output", value: "CSV journals to core banking, posting status on a Laravel dashboard" },
      { label: "Scope", value: "10 transaction types: QR, NPG acquiring, interface rejections, credit card payments across channels" },
    ],
    results: [
      { measure: "Time to confirmed posting", before: ">1 h", after: "~15 min" },
      { measure: "Staff", before: "2", after: "1 supervisor" },
    ],
    context:
      "The transaction operations division books GL differences for ten card and payment transaction types. The source is raw TXT reports from third parties, each type in its own format. Two people downloaded, read, mapped, and posted them by hand, for more than an hour a day.",
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
    ],
    stack: ["UiPath (Unattended)", "REFramework", "Orchestrator", "Regex", "Laravel", "MySQL", "SQL Server", "FTP/SFTP"],
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
    registry: { trigger: "Schedule", runs: "Daily", result: "60 → 0–5 min" },    spec: [
      { label: "Trigger", value: "Orchestrator schedule" },
      { label: "Runs", value: "Daily, including weekends and public holidays" },
      { label: "Input", value: "Settlement reports, mostly unstructured TXT" },
      { label: "Output", value: "Transfers and journals posted to the target system, Laravel dashboard" },
      { label: "Channels", value: "Syariah Card, QR, card payments via BCA, BNI, and Mandiri, Mastercard" },
      { label: "Build time", value: "15 working days" },
    ],
    results: [
      { measure: "Time to send data to host", before: "60 min", after: "0–5 min" },
      { measure: "Staff", before: "2", after: "1" },
    ],
    context:
      "This process moves funds between a GL and an account. The amounts come from each channel's settlement report, mostly TXT with little structure. Two people read the reports, worked out the amounts, and created the transfers and journals by hand, about an hour per process.",
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
    ],
    stack: ["UiPath (Unattended)", "REFramework", "Orchestrator", "Regex", "Laravel", "MySQL", "SQL Server"],
  },
  {
    slug: "monitoring-reporting-automation",
    title: "Monitoring & Reporting Automation",
    kind: "RPA",
    summary:
      "Eight robots for OJK regulatory reports and operational monitoring. They pull from web apps, desktop apps, a data warehouse, and SFTP, and send finished reports by email.",
    role: "Individual contributor: process analysis, solution design, development",
    since: "2021",
    status: "RUNNING",
    statusNote: "Went live between 2021 and 2024. All eight still run.",
    registry: { trigger: "Schedule", runs: "3×/day – monthly", result: "15 → 2–3 min" },    spec: [
      { label: "Trigger", value: "Orchestrator schedule" },
      { label: "Runs", value: "From three times a day to monthly" },
      { label: "Input", value: "Web and desktop apps, data warehouse, SFTP, third-party portals" },
      { label: "Output", value: "Excel, PDF, and HTML reports by email. Data to databases and SFTP for other teams." },
      { label: "Robots", value: "8" },
      { label: "Build time", value: "3–5 working days per process" },
    ],
    results: [
      { measure: "OJK report preparation", before: "10–15 min", after: "2–3 min" },
      { measure: "Payment system status checks", after: "3× a day" },
    ],
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
  },
];

export const experience = [
  {
    when: "Nov 2020 – present",
    title: "Senior Automation & Software Engineer",
    org: "PT Bank Mega",
    body: "Design, build, and maintain automation across banking operations: UiPath robots, Laravel web apps, core banking integrations, and the bank's AI gateway. Handle production incidents, root cause analysis, and performance work.",
  },
  {
    when: "May – Sep 2020",
    title: "ICStar RPA Hackathon, 2nd place",
    org: "PT IDStar Cipta Teknologi",
    body: "Built a robot that reconciles third-party Visa transactions. A 2-hour manual process ran in 3–5 minutes, and the 40% human error rate went to zero.",
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
    items: ["PHP (Laravel)", "REST APIs", "JavaScript", "Node.js", "Go", "HTML/CSS", "jQuery"],
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

export const certifications = [
  { when: "Jan 2021", title: "UiPath Certified RPA Associate (UiRPA)", org: "UiPath" },
  { when: "Oct 2020", title: "RPA Training Co-Facilitator", org: "ONE Indonesia × UiPath" },
  { when: "Sep 2020", title: "ICStar Hackathon 2020, 2nd winner", org: "PT IDStar Cipta Teknologi" },
];

// Time compression chart. Minutes drive the bar length (60 min = full width);
// the labels are what the reader sees, taken from each project's results.
export const compression = [
  { slug: "dispute-resolution-system", label: "Dispute, per transaction", manual: 60, auto: 10, manualLabel: "1 h", autoLabel: "5–10 min" },
  { slug: "visa-mastercard-settlement", label: "Visa settlement", manual: 60, auto: 10, manualLabel: "60 min", autoLabel: "10 min" },
  { slug: "gl-difference-journal-automation", label: "GL difference journals", manual: 60, auto: 15, manualLabel: ">1 h", autoLabel: "~15 min" },
  { slug: "fund-disbursement-automation", label: "Fund disbursement, send to host", manual: 60, auto: 5, manualLabel: "60 min", autoLabel: "0–5 min" },
  { slug: "visa-mastercard-settlement", label: "Mastercard settlement", manual: 45, auto: 7, manualLabel: "45 min", autoLabel: "7 min" },
  { slug: "core-banking-realtime-integration", label: "Core banking, customer data update", manual: 30, auto: 10, manualLabel: "30 min", autoLabel: "10 min" },
  { slug: "treasury-journal-automation", label: "Treasury journal", manual: 30, auto: 5, manualLabel: "30 min", autoLabel: "3–5 min" },
  { slug: "monitoring-reporting-automation", label: "OJK regulatory report", manual: 15, auto: 3, manualLabel: "10–15 min", autoLabel: "2–3 min" },
];

// People needed before and after, from each project's results. `manual` and
// `auto` drive the squares (upper end of a range); the labels are what readers see.
export const staffing = [
  { slug: "dispute-resolution-system", label: "Dispute desk", manual: 15, auto: 4, manualLabel: "10–15", autoLabel: "4", note: "2 makers, 2 approvers" },
  { slug: "visa-mastercard-settlement", label: "Visa & Mastercard settlement", manual: 4, auto: 1, manualLabel: "2–4", autoLabel: "1", note: "monitoring" },
  { slug: "treasury-journal-automation", label: "Treasury journals", manual: 3, auto: 1, manualLabel: "3", autoLabel: "1", note: "supervisor" },
  { slug: "gl-difference-journal-automation", label: "GL difference journals", manual: 2, auto: 1, manualLabel: "2", autoLabel: "1", note: "supervisor" },
  { slug: "fund-disbursement-automation", label: "Fund disbursement", manual: 2, auto: 1, manualLabel: "2", autoLabel: "1", note: "monitoring" },
];

export const education = {
  when: "2016–2020",
  title: "B.Eng. Telecommunication Engineering",
  org: "Telkom University",
  body: "GPA 3.66",
};
