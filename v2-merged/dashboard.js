/**
 * Silent Visionary — Dashboard interactivity
 * All data below is synthetic, for demonstration only.
 */

(function () {
  "use strict";

  var CASES = {
    "SV-001": {
      title: "Traffic Signal System Intrusion",
      severity: "critical",
      status: "active",
      twinTitle: "Digital Twin — Traffic Ops Center",
      primaryDevice: "d0",
      evidenceGraph: { entity: "Contractor-019", account: "contractor019@dot.cityops.gov", device: "TRAFFIC-CTRL-14", ip: "10.44.6.112", network: "Outbound :443", external: "185.212.44.6", file: "signal_timing_master.cfg" },
      timeline: {
        ticks: [{ x: 60, label: "18:00" }, { x: 380, label: "20:00" }, { x: 700, label: "21:00" }],
        events: [
          { x: 760, time: "20:42:18", label: "Badge scan — no match", source: "Access Control", type: "physical", evid: "EVID-1039", conf: "Observed Evidence", color: "var(--low)" },
          { x: 800, time: "20:58:04", label: "Authentication attempt failed", source: "IAM", type: "identity", evid: "EVID-1040", conf: "Observed Evidence", color: "var(--ev-correlated)" },
          { x: 840, time: "21:14:07", label: "Badge access — Door D-12, Contractor-019", source: "Access Control", type: "physical", evid: "EVID-1042", conf: "Correlated Evidence", highlight: "top" },
          { x: 880, time: "21:14:19", label: "Suspicious process spawned — powershell.exe", source: "EDR", type: "endpoint", evid: "EVID-1044", conf: "AI Inference", color: "var(--ev-correlated)" },
          { x: 920, time: "21:14:23", label: "Outbound connection — 185.212.44.6:443", source: "Network", type: "network", evid: "EVID-1043", conf: "Correlated Evidence", highlight: "bottom" },
          { x: 960, time: "21:31:02", label: "File access confirmed — signal_timing_master.cfg", source: "Endpoint", type: "file", evid: "EVID-1046", conf: "Observed Evidence", color: "var(--low)" },
          { x: 990, time: "21:44:50", label: "Session terminated", source: "IAM", type: "identity", evid: "EVID-1047", conf: "Observed Evidence", color: "var(--text-faint)" },
        ],
      },
      stream: [
        ["21:14:02", "tag-phys", "Phys", "Movement detected — <b>Traffic Ops Center, Cam 04</b>"],
        ["21:14:07", "tag-phys", "Phys", "Badge access — Door D-12, <b>Contractor-019</b>"],
        ["21:14:12", "tag-endpoint", "Auth", "Login success — <b>TRAFFIC-CTRL-14</b>"],
        ["21:14:19", "tag-endpoint", "Proc", "Suspicious process — <b>powershell.exe</b> (encoded)"],
        ["21:14:23", "tag-net", "Net", "Outbound connection — <b>185.212.44.6:443</b>"],
        ["21:14:31", "tag-file", "File", "File accessed — <b>signal_timing_master.cfg</b>"],
        ["21:14:47", "tag-phys", "Dev", "USB connected — <b>VID_0951&amp;PID_1666</b>"],
      ],
      liveFeed: [
        ["tag-net", "Net", "Beacon check-in — <b>185.212.44.6</b> (interval: 60s)"],
        ["tag-endpoint", "Proc", "New process — <b>rundll32.exe</b> spawned by powershell.exe"],
        ["tag-file", "File", "Registry key modified — <b>Run\\WindowsUpdateSvc</b>"],
        ["tag-net", "Net", "DNS query — <b>update-cdn-secure.net</b>"],
        ["tag-phys", "Phys", "Badge access — Door D-12, <b>Contractor-019</b> (exit)"],
      ],
      intel: [
        ["185.212.44.6", "IP · C2 Infra", "sev-high", "High"],
        ["a1b2c9…944f", "SHA-256 · Loader", "sev-critical", "Critical"],
        ["update-cdn-secure.net", "Domain", "sev-medium", "Medium"],
      ],
      ai: {
        initial: {
          text: 'Initial access occurred at <b>21:14:07</b> via badge credential for <b>Contractor-019</b> at the Traffic Ops Center\'s Door D-12, followed by an authenticated logon to <b>TRAFFIC-CTRL-14</b> five seconds later. The badge event and the logon share the same identity, consistent with a physical-to-digital handoff.',
          conf: "88%", cls: "", refs: "EVID-1042, EVID-1043",
        },
        affected: {
          text: "One traffic-signal controller shows confirmed compromise: <b>TRAFFIC-CTRL-14</b> (initial foothold), with an outbound connection to <b>185.212.44.6</b> suggesting external command-and-control involvement.",
          conf: "74%", cls: "", refs: "EVID-1044",
        },
        summary: {
          text: "SV-001 began with a badge-authenticated physical entry to the Traffic Ops Center, followed by an endpoint login, an encoded PowerShell process, and an outbound connection to a known C2 IP within 21 seconds. 34 evidence items support this reconstruction; actor attribution remains unconfirmed.",
          conf: "Pending", cls: "conclusion", refs: "—",
        },
        anomaly: {
          text: "The PowerShell process at <b>21:14:19</b> used Base64-encoded arguments — uncommon for this contractor's baseline behavior. Flagged as an anomaly, not yet a confirmed conclusion.",
          conf: "66%", cls: "inference", refs: "EVID-1045",
        },
        lateral: {
          text: "No confirmed lateral movement yet — only <b>TRAFFIC-CTRL-14</b> shows compromise indicators so far, though the wider signal network remains under review.",
          conf: "Observed", cls: "observed", refs: "EVID-1042",
        },
        evidence: {
          text: "This case has <b>34</b> evidence items, including endpoint logs, network captures, and physical access records from the Traffic Ops Center.",
          conf: "—", cls: "observed", refs: "—",
        },
      },
      aiFallback: "I can help investigate SV-001. Try asking about the initial access event, affected systems, lateral movement, or a summary of the investigation.",
      attackChain: {
        initial: { status: "correlated", evid: "EVID-1042", note: "Badge access at the Traffic Ops Center's Door D-12 and an authenticated logon to TRAFFIC-CTRL-14 occurred five seconds apart, under the same identity — consistent with a physical-to-digital handoff." },
        execution: { status: "inference", evid: "EVID-1044", note: "An encoded PowerShell process was spawned on TRAFFIC-CTRL-14 immediately after logon." },
        defenseEvasion: { status: "inference", evid: "EVID-1045", note: "The PowerShell process used Base64-encoded arguments — uncommon for this contractor's baseline behavior." },
        collection: { status: "observed", evid: "EVID-1046", note: "File access confirmed on signal_timing_master.cfg, the controller's live signal-timing configuration." },
        exfil: { status: "correlated", evid: "EVID-1043", note: "Outbound connection to 185.212.44.6:443, known command-and-control infrastructure." },
      },
      forensicsArtifacts: [
        { id: "EVID-1042", type: "Access Control Log", source: "Access Control", acquired: "2026-08-09 21:16", hash: "SHA-256 9F2A1C…6E0B", integrity: "Verified", custody: "FIELD-EXAM-03 → EVID-VAULT-02" },
        { id: "EVID-1048", type: "Disk Image", source: "Forensics Lab", acquired: "2026-08-09 22:40", hash: "SHA-256 3B7D44…19FA", integrity: "Verified", custody: "FIELD-EXAM-03 → EVID-VAULT-02" },
        { id: "EVID-1044", type: "Memory Capture", source: "EDR", acquired: "2026-08-09 21:18", hash: "SHA-256 A81E2D…C305", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-1045", type: "Registry Artifact", source: "Endpoint", acquired: "2026-08-09 21:19", hash: "SHA-256 5C9F80…7B21", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-1043", type: "Network Capture (PCAP)", source: "Network", acquired: "2026-08-09 21:20", hash: "SHA-256 4E1F7A…9BD2", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-1046", type: "File System Artifact", source: "Endpoint", acquired: "2026-08-09 21:35", hash: "SHA-256 D027E6…44A8", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-1049", type: "USB / Device History", source: "Endpoint", acquired: "2026-08-09 21:36", hash: "SHA-256 88C1B0…F212", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-1050", type: "Malware Artifact", source: "EDR", acquired: "2026-08-10 08:05", hash: "SHA-256 A1B2C9…944F", integrity: "Verified", custody: "A.RIVERA → EVID-VAULT-02" },
      ],
    },
    "SV-014": {
      title: "5th & Main Armed Robbery",
      severity: "high",
      status: "analysis",
      twinTitle: "Digital Twin — 5th & Main Corridor",
      primaryDevice: "d3",
      evidenceGraph: { entity: "Suspect-01 (Unidentified)", account: "+1 (555) 019-4471", device: "ALPR-UNIT-08", ip: "5th & Main St.", network: "Cell tower ping — Sector 4", external: "I-40 Westbound", file: "ALPR_hit_5thMain_2126.jpg" },
      timeline: {
        ticks: [{ x: 90, label: "21:00" }, { x: 450, label: "21:10" }, { x: 850, label: "21:20" }],
        events: [
          { x: 120, time: "21:02:11", label: "911 call received — armed robbery in progress", source: "Dispatch", type: "identity", evid: "EVID-2201", conf: "Observed Evidence", highlight: "top" },
          { x: 600, time: "21:14:40", label: "Store CCTV — suspect enters, brandishes weapon", source: "CCTV", type: "physical", evid: "EVID-2202", conf: "Observed Evidence", color: "var(--low)" },
          { x: 655, time: "21:16:02", label: "ALPR hit — suspect vehicle, 5th & Main", source: "ALPR Network", type: "physical", evid: "EVID-2203", conf: "Correlated Evidence", color: "var(--ev-correlated)" },
          { x: 730, time: "21:17:55", label: "Cell tower ping — suspect phone, Sector 4", source: "Telecom Records", type: "network", evid: "EVID-2204", conf: "Correlated Evidence", highlight: "bottom" },
          { x: 760, time: "21:18:40", label: "Street camera — suspect flees toward I-40", source: "City Camera Network", type: "physical", evid: "EVID-2205", conf: "AI Inference", color: "var(--gold)" },
          { x: 890, time: "21:22:10", label: "Witness statement recorded — clerk on duty", source: "Field Interview", type: "identity", evid: "EVID-2206", conf: "AI Inference", color: "var(--gold)" },
        ],
      },
      stream: [
        ["21:02:11", "tag-endpoint", "Call", "911 call received — <b>armed robbery in progress</b>"],
        ["21:14:40", "tag-file", "CCTV", "Store CCTV — <b>suspect enters, brandishes weapon</b>"],
        ["21:16:02", "tag-endpoint", "ALPR", "Plate reader hit — <b>suspect vehicle</b>, 5th &amp; Main"],
        ["21:17:55", "tag-net", "Cell", "Cell tower ping — <b>suspect phone</b>, Sector 4"],
        ["21:18:40", "tag-file", "CCTV", "Street camera — <b>suspect flees toward I-40</b>"],
        ["21:22:10", "tag-endpoint", "Wit", "Witness statement recorded — <b>store clerk</b>"],
      ],
      liveFeed: [
        ["tag-net", "Cell", "Second tower ping — <b>suspect phone</b> moving west on I-40"],
        ["tag-file", "CCTV", "New ALPR hit — <b>suspect vehicle</b>, mile marker 12"],
        ["tag-endpoint", "Unit", "Patrol unit dispatched to last known heading"],
      ],
      intel: [
        ["+1 (555) 019-4471", "Phone · Suspect (Unconfirmed)", "sev-high", "High"],
        ["ALPR_hit_5thMain_2126.jpg", "Image · Plate Capture", "sev-medium", "Medium"],
        ["Suspect-01", "Identity · Unidentified", "sev-high", "High"],
      ],
      ai: {
        initial: {
          text: "The incident begins with a 911 call at <b>21:02:11</b> reporting an armed robbery in progress, followed twelve minutes later by store CCTV showing the suspect entering and brandishing a weapon.",
          conf: "71%", cls: "", refs: "EVID-2201",
        },
        affected: {
          text: "One retail location and one suspect vehicle are implicated. No additional locations have been connected to this suspect yet.",
          conf: "80%", cls: "observed", refs: "EVID-2204",
        },
        summary: {
          text: "Suspect-01 entered the store, brandished a weapon, and fled on foot to a waiting vehicle captured by an ALPR unit at 5th & Main. A cell tower ping places a phone in the same sector at the same time, and street cameras track the vehicle heading toward I-40.",
          conf: "Pending", cls: "conclusion", refs: "—",
        },
        anomaly: {
          text: "The suspect vehicle's plate does not match any vehicle registered to store employees or recent customers — flagged for cross-reference against regional ALPR history.",
          conf: "69%", cls: "inference", refs: "EVID-2203",
        },
        lateral: {
          text: "No additional locations connected yet — activity is confined to the 5th & Main corridor and the westbound route onto I-40.",
          conf: "Observed", cls: "observed", refs: "EVID-2204",
        },
        evidence: {
          text: "This case has <b>21</b> evidence items, primarily CCTV footage, ALPR hits, cell tower records, and a witness statement.",
          conf: "—", cls: "observed", refs: "—",
        },
      },
      aiFallback: "I can help investigate SV-014. Try asking about the initial call, the suspect vehicle, the witness statement, or a summary of the investigation.",
      attackChain: {
        initial: { status: "observed", evid: "EVID-2201", note: "911 call received reporting an armed robbery in progress at a retail location on 5th & Main." },
        collection: { status: "observed", evid: "EVID-2202", note: "Store CCTV footage and a witness statement were collected from the scene." },
        exfil: { status: "correlated", evid: "EVID-2205", note: "Suspect fled the scene by vehicle, tracked by street camera and ALPR toward I-40 westbound." },
      },
      forensicsArtifacts: [
        { id: "EVID-2201", type: "911 Call Recording", source: "Dispatch", acquired: "2026-08-09 21:03", hash: "SHA-256 6A20D1…33EC", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-2202", type: "CCTV Footage", source: "Store Camera", acquired: "2026-08-09 21:15", hash: "SHA-256 71FBE0…A902", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-2203", type: "ALPR Capture", source: "ALPR Network", acquired: "2026-08-09 21:17", hash: "SHA-256 0DAC4E…5F18", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-2204", type: "Telecom Tower Record", source: "Telecom Records", acquired: "2026-08-09 21:18", hash: "SHA-256 C63A9F…2D77", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-2207", type: "Street Camera Footage", source: "City Camera Network", acquired: "2026-08-09 21:19", hash: "SHA-256 F4409B…E610", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-2208", type: "Forensic Photograph", source: "Field Exam", acquired: "2026-08-09 21:21", hash: "SHA-256 2B88A7…C034", integrity: "Verified", custody: "FIELD-EXAM-03 → EVID-VAULT-02" },
        { id: "EVID-2206", type: "Witness Statement", source: "Field Interview", acquired: "2026-08-09 21:23", hash: "SHA-256 D91F5C…7A29", integrity: "Verified", custody: "FIELD-EXAM-03 → EVID-VAULT-02" },
      ],
    },
    "SV-009": {
      title: "Missing Person — Riverside District",
      severity: "high",
      status: "review",
      twinTitle: "Digital Twin — Riverside Transit Hub",
      primaryDevice: "d5",
      evidenceGraph: { entity: "Case Subject — J.A.", account: "+1 (555) 044-2210", device: "TRANSIT-GATE-R12", ip: "Riverside Transit Hub", network: "Geolocation ping — 3.2mi radius", external: "Bridge St. Overlook", file: "transit_tap_log_R12.csv" },
      timeline: {
        ticks: [{ x: 60, label: "07:30" }, { x: 400, label: "08:45" }, { x: 900, label: "09:50" }],
        events: [
          { x: 110, time: "07:41:03", label: "Last phone activity — outgoing text", source: "Telecom Records", type: "network", evid: "EVID-3301", conf: "Observed Evidence", highlight: "top" },
          { x: 170, time: "07:48:20", label: "Transit card tap — Riverside Station, inbound", source: "Transit System", type: "physical", evid: "EVID-3302", conf: "Observed Evidence", color: "var(--low)" },
          { x: 420, time: "08:20:15", label: "Public camera sighting — Riverside Ave", source: "City Camera Network", type: "physical", evid: "EVID-3305", conf: "AI Inference", color: "var(--gold)" },
          { x: 918, time: "09:52:14", label: "No further phone or transit activity", source: "Telecom Records", type: "network", evid: "EVID-3303", conf: "Observed Evidence", highlight: "bottom" },
        ],
      },
      stream: [
        ["07:41:03", "tag-net", "Cell", "Last phone activity — <b>outgoing text</b>"],
        ["07:48:20", "tag-phys", "Transit", "Card tap — <b>Riverside Station</b>, inbound"],
        ["08:20:15", "tag-phys", "Cam", "Public camera sighting — <b>Riverside Ave</b>"],
        ["09:52:14", "tag-net", "Cell", "No further phone or transit activity"],
      ],
      liveFeed: [
        ["tag-phys", "Cam", "Camera sweep — <b>Bridge St. Overlook</b>, reviewing footage"],
        ["tag-net", "Cell", "Still no new phone activity — <b>Case Subject J.A.</b>"],
      ],
      intel: [
        ["+1 (555) 044-2210", "Phone · Case Subject", "sev-medium", "Medium"],
        ["Riverside Station", "Transit Access Point", "sev-medium", "Medium"],
      ],
      ai: {
        initial: {
          text: "The last confirmed phone activity for the case subject was an outgoing text at <b>07:41:03</b>, followed seven minutes later by a transit card tap at Riverside Station.",
          conf: "62%", cls: "inference", refs: "EVID-3301",
        },
        affected: {
          text: "No further phone, transit, or financial activity has been observed since 09:52 — investigators are correlating the last public camera sighting with witness canvassing near Bridge St.",
          conf: "90%", cls: "observed", refs: "EVID-3301",
        },
        summary: {
          text: "Movement is confirmed from Riverside Station to Riverside Ave via transit tap and public camera, with no activity since. Currently unresolved.",
          conf: "Pending", cls: "conclusion", refs: "—",
        },
        anomaly: {
          text: "The gap between the last camera sighting and the total absence of any further phone activity is the primary anomaly — investigators are prioritizing the Bridge St. Overlook camera footage next.",
          conf: "58%", cls: "inference", refs: "—",
        },
        evidence: {
          text: "This case has <b>9</b> evidence items, primarily transit records, public camera footage, and telecom records.",
          conf: "—", cls: "observed", refs: "—",
        },
      },
      aiFallback: "I can help investigate SV-009. Try asking about the last known location, phone activity, or a summary of the investigation.",
      attackChain: {
        initial: { status: "inference", evid: "EVID-3301", note: "Last confirmed phone activity for the case subject, followed by a transit card tap at Riverside Station seven minutes later." },
      },
      forensicsArtifacts: [
        { id: "EVID-3301", type: "Telecom Tower Record", source: "Telecom Records", acquired: "2026-08-09 07:42", hash: "SHA-256 1A6C90…D847", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-3302", type: "Transit Tap Log", source: "Transit System", acquired: "2026-08-09 07:49", hash: "SHA-256 7E30B2…5C19", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-3303", type: "Telecom Tower Record", source: "Telecom Records", acquired: "2026-08-09 09:53", hash: "SHA-256 C420F1…8B36", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-3305", type: "Public Camera Footage", source: "City Camera Network", acquired: "2026-08-09 08:21", hash: "SHA-256 60DA27…E9F4", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
      ],
    },
    "SV-022": {
      title: "Hit-and-Run — 5th & Main",
      severity: "high",
      status: "new",
      twinTitle: "Digital Twin — 5th & Main Corridor",
      primaryDevice: "d4",
      evidenceGraph: { entity: "Suspect Vehicle (Fled Scene)", account: "Registration pending", device: "STREETCAM-5THMAIN", ip: "5th & Main St.", network: "ALPR hit — partial plate", external: "Riverside Ave Northbound", file: "collision_photos_5thMain.zip" },
      timeline: {
        ticks: [{ x: 60, label: "14:00" }, { x: 380, label: "14:15" }, { x: 700, label: "14:30" }],
        events: [
          { x: 130, time: "14:02:47", label: "911 call received — pedestrian struck, vehicle fled", source: "Dispatch", type: "identity", evid: "EVID-4401", conf: "Observed Evidence", highlight: "top" },
          { x: 610, time: "14:14:20", label: "Street camera — vehicle impact captured", source: "City Camera Network", type: "physical", evid: "EVID-4402", conf: "Observed Evidence", color: "var(--low)" },
          { x: 660, time: "14:16:05", label: "ALPR hit — partial plate match, northbound", source: "ALPR Network", type: "physical", evid: "EVID-4403", conf: "Correlated Evidence", color: "var(--ev-correlated)" },
          { x: 720, time: "14:21:38", label: "Body shop inquiry — matching front-end damage", source: "Field Interview", type: "identity", evid: "EVID-4404", conf: "AI Inference", highlight: "bottom" },
          { x: 780, time: "14:27:52", label: "Witness statement — vehicle description confirmed", source: "Field Interview", type: "identity", evid: "EVID-4405", conf: "Observed Evidence", color: "var(--gold)" },
        ],
      },
      stream: [
        ["14:02:47", "tag-endpoint", "Call", "911 call received — <b>pedestrian struck, vehicle fled</b>"],
        ["14:14:20", "tag-file", "CCTV", "Street camera — <b>vehicle impact captured</b>"],
        ["14:16:05", "tag-endpoint", "ALPR", "Plate reader hit — <b>partial match</b>, northbound"],
        ["14:21:38", "tag-endpoint", "Tip", "Body shop inquiry — <b>matching front-end damage</b>"],
        ["14:27:52", "tag-endpoint", "Wit", "Witness statement — <b>vehicle description confirmed</b>"],
      ],
      liveFeed: [
        ["tag-net", "ALPR", "Regional ALPR search — <b>widening radius to 15mi</b>"],
        ["tag-endpoint", "Tip", "Second body shop inquiry — <b>cross-referencing</b>"],
      ],
      intel: [
        ["Partial plate — 7XR·••4", "Vehicle · Suspect", "sev-high", "High"],
        ["collision_photos_5thMain.zip", "Image · Impact Evidence", "sev-medium", "Medium"],
      ],
      ai: {
        initial: {
          text: "A 911 call at <b>14:02:47</b> reported a pedestrian struck by a vehicle that fled northbound; street camera footage twelve minutes later confirms the impact and a partial ALPR match.",
          conf: "68%", cls: "", refs: "EVID-4401, EVID-4403",
        },
        affected: {
          text: "One pedestrian victim and one unidentified suspect vehicle are implicated. No additional locations have been connected yet.",
          conf: "77%", cls: "observed", refs: "EVID-4403",
        },
        summary: {
          text: "A vehicle struck a pedestrian at 5th & Main and fled north. Street camera and a partial ALPR match place the vehicle heading toward Riverside Ave; a body shop inquiry for matching front-end damage is being cross-referenced.",
          conf: "Pending", cls: "conclusion", refs: "—",
        },
        anomaly: {
          text: "The body shop inquiry timestamp — just under twenty minutes after impact — is unusually fast, and is being treated as a lead rather than a confirmed connection.",
          conf: "55%", cls: "inference", refs: "EVID-4404",
        },
        evidence: {
          text: "This case has <b>12</b> evidence items, primarily street camera footage, an ALPR capture, and field interview records.",
          conf: "—", cls: "observed", refs: "—",
        },
      },
      aiFallback: "I can help investigate SV-022. Try asking about the 911 call, the suspect vehicle, or a summary of the investigation.",
      attackChain: {
        initial: { status: "observed", evid: "EVID-4401", note: "911 call received reporting a pedestrian struck by a vehicle at 5th & Main." },
        collection: { status: "observed", evid: "EVID-4402", note: "Street camera footage and a witness statement were collected from the scene." },
        exfil: { status: "correlated", evid: "EVID-4403", note: "Suspect vehicle fled the scene, tracked by ALPR heading north toward Riverside Ave." },
      },
      forensicsArtifacts: [
        { id: "EVID-4401", type: "911 Call Recording", source: "Dispatch", acquired: "2026-08-11 14:03", hash: "SHA-256 2F81C4…7A93", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-4402", type: "CCTV Footage", source: "City Camera Network", acquired: "2026-08-11 14:15", hash: "SHA-256 88E20A…B461", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-4403", type: "ALPR Capture", source: "ALPR Network", acquired: "2026-08-11 14:17", hash: "SHA-256 D93F5C…1102", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-4404", type: "Field Interview Log", source: "Field Interview", acquired: "2026-08-11 14:22", hash: "SHA-256 601AE9…FC38", integrity: "Verified", custody: "FIELD-EXAM-03 → EVID-VAULT-02" },
        { id: "EVID-4405", type: "Witness Statement", source: "Field Interview", acquired: "2026-08-11 14:29", hash: "SHA-256 9C74B0…D226", integrity: "Verified", custody: "FIELD-EXAM-03 → EVID-VAULT-02" },
      ],
    },
    "SV-031": {
      title: "Transit Station Assault — Riverside Line",
      severity: "critical",
      status: "active",
      twinTitle: "Digital Twin — Riverside Transit Hub",
      primaryDevice: "d5",
      evidenceGraph: { entity: "Suspect-02 (Unidentified)", account: "Transit card — unregistered", device: "TRANSIT-GATE-R12", ip: "Riverside Transit Hub", network: "Platform camera — Car 3", external: "Bridge St. Exit", file: "transit_cctv_platformB.mp4" },
      timeline: {
        ticks: [{ x: 60, label: "22:00" }, { x: 380, label: "22:10" }, { x: 700, label: "22:20" }],
        events: [
          { x: 140, time: "22:03:15", label: "Dispatch call — assault reported on platform", source: "Dispatch", type: "identity", evid: "EVID-5501", conf: "Observed Evidence", highlight: "top" },
          { x: 600, time: "22:12:40", label: "Platform camera — assault captured, Car 3", source: "Transit CCTV", type: "physical", evid: "EVID-5502", conf: "Observed Evidence", color: "var(--low)" },
          { x: 650, time: "22:13:55", label: "Transit tap correlation — suspect entry, Riverside Station", source: "Transit System", type: "physical", evid: "EVID-5503", conf: "Correlated Evidence", color: "var(--ev-correlated)" },
          { x: 730, time: "22:16:10", label: "Suspect exits via Bridge St. gate", source: "Transit System", type: "physical", evid: "EVID-5504", conf: "Correlated Evidence", highlight: "bottom" },
          { x: 790, time: "22:24:02", label: "Victim statement recorded", source: "Field Interview", type: "identity", evid: "EVID-5505", conf: "Observed Evidence", color: "var(--gold)" },
        ],
      },
      stream: [
        ["22:03:15", "tag-endpoint", "Call", "Dispatch call — <b>assault reported on platform</b>"],
        ["22:12:40", "tag-file", "CCTV", "Platform camera — <b>assault captured, Car 3</b>"],
        ["22:13:55", "tag-endpoint", "Transit", "Tap correlation — <b>suspect entry</b>, Riverside Station"],
        ["22:16:10", "tag-endpoint", "Transit", "Suspect exits via <b>Bridge St. gate</b>"],
        ["22:24:02", "tag-endpoint", "Wit", "Victim statement recorded"],
      ],
      liveFeed: [
        ["tag-file", "CCTV", "Reviewing Bridge St. exit camera — <b>face capture pending</b>"],
        ["tag-endpoint", "Transit", "Cross-referencing unregistered transit card history"],
      ],
      intel: [
        ["Transit card — unregistered", "Identity · Suspect", "sev-high", "High"],
        ["transit_cctv_platformB.mp4", "Video · Assault Footage", "sev-critical", "Critical"],
      ],
      ai: {
        initial: {
          text: "A dispatch call at <b>22:03:15</b> reported an assault on the Riverside Line platform; platform camera footage nine minutes later captures the incident in Car 3.",
          conf: "80%", cls: "", refs: "EVID-5501, EVID-5502",
        },
        affected: {
          text: "One victim and one unidentified suspect are implicated. The suspect's transit card is unregistered, limiting identification to camera and transit-tap correlation.",
          conf: "83%", cls: "observed", refs: "EVID-5503",
        },
        summary: {
          text: "The suspect entered at Riverside Station on an unregistered transit card, assaulted the victim in Car 3, and exited via the Bridge St. gate roughly two minutes later. A victim statement corroborates the timeline.",
          conf: "Pending", cls: "conclusion", refs: "—",
        },
        anomaly: {
          text: "The transit card used has no prior tap history anywhere in the system — consistent with a card purchased specifically for this trip.",
          conf: "71%", cls: "inference", refs: "EVID-5503",
        },
        evidence: {
          text: "This case has <b>16</b> evidence items, primarily platform CCTV, transit tap records, and a victim statement.",
          conf: "—", cls: "observed", refs: "—",
        },
      },
      aiFallback: "I can help investigate SV-031. Try asking about the platform footage, the suspect's transit card, or a summary of the investigation.",
      attackChain: {
        initial: { status: "observed", evid: "EVID-5501", note: "Dispatch call reporting an assault on the Riverside Line platform." },
        collection: { status: "observed", evid: "EVID-5502", note: "Platform CCTV footage and a victim statement were collected." },
        exfil: { status: "correlated", evid: "EVID-5504", note: "Suspect exited the transit system via the Bridge St. gate roughly two minutes after the incident." },
      },
      forensicsArtifacts: [
        { id: "EVID-5501", type: "Dispatch Call Recording", source: "Dispatch", acquired: "2026-08-10 22:04", hash: "SHA-256 4B18E7…2F90", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-5502", type: "Transit CCTV Footage", source: "Transit CCTV", acquired: "2026-08-10 22:13", hash: "SHA-256 A027D3…C815", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-5503", type: "Transit Tap Log", source: "Transit System", acquired: "2026-08-10 22:14", hash: "SHA-256 7F62B1…9E40", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-5504", type: "Transit Tap Log", source: "Transit System", acquired: "2026-08-10 22:17", hash: "SHA-256 0D93C6…4A72", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-5505", type: "Victim Statement", source: "Field Interview", acquired: "2026-08-10 22:25", hash: "SHA-256 E51F2A…B609", integrity: "Verified", custody: "FIELD-EXAM-03 → EVID-VAULT-02" },
      ],
    },
    "SV-018": {
      title: "Signal Depot Copper Theft",
      severity: "medium",
      status: "review",
      twinTitle: "Digital Twin — Traffic Ops Center",
      primaryDevice: "d7",
      evidenceGraph: { entity: "Unknown Intruder", account: "N/A", device: "CAM-TRAFFICOPS-04", ip: "Traffic Ops Center — Signal Depot", network: "Motion event — after hours", external: "Regional Scrap Metal Yard", file: "depot_breach_photos.zip" },
      timeline: {
        ticks: [{ x: 60, label: "02:00" }, { x: 400, label: "02:45" }, { x: 900, label: "08:15" }],
        events: [
          { x: 100, time: "02:11:04", label: "Perimeter fence sensor triggered", source: "Access Control", type: "physical", evid: "EVID-6601", conf: "Observed Evidence", highlight: "top" },
          { x: 160, time: "02:12:30", label: "Motion event — Cam 04, no badge access logged", source: "Physical Security", type: "physical", evid: "EVID-6602", conf: "AI Inference", color: "var(--gold)" },
          { x: 250, time: "02:18:47", label: "Signal cabinet sensor — door opened", source: "Access Control", type: "physical", evid: "EVID-6603", conf: "Correlated Evidence", color: "var(--ev-correlated)" },
          { x: 920, time: "08:15:00", label: "Missing copper wiring reported by maintenance crew", source: "Field Interview", type: "identity", evid: "EVID-6604", conf: "Observed Evidence", highlight: "bottom" },
        ],
      },
      stream: [
        ["02:11:04", "tag-phys", "Phys", "Perimeter fence sensor triggered"],
        ["02:12:30", "tag-phys", "Phys", "Motion event — <b>Cam 04</b>, no badge access logged"],
        ["02:18:47", "tag-phys", "Phys", "Signal cabinet sensor — <b>door opened</b>"],
        ["08:15:00", "tag-endpoint", "Rpt", "Missing copper wiring reported by <b>maintenance crew</b>"],
      ],
      liveFeed: [
        ["tag-phys", "Phys", "Reviewing overnight footage — <b>Cam 04, Cam 07</b>"],
        ["tag-endpoint", "Tip", "Scrap yard tip received — <b>cross-referencing intake log</b>"],
      ],
      intel: [
        ["Cam 04 — Signal Depot", "Access Point", "sev-medium", "Medium"],
        ["Regional Scrap Metal Yard", "Tip · Third-Party Report", "sev-low", "Low"],
      ],
      ai: {
        initial: {
          text: "A perimeter fence sensor triggered at <b>02:11:04</b>, followed by a motion event on Cam 04 with no corresponding badge access — consistent with an unauthorized entry.",
          conf: "64%", cls: "inference", refs: "EVID-6601, EVID-6602",
        },
        affected: {
          text: "One signal cabinet at the Traffic Ops Center depot is confirmed opened without authorization. No traffic-control systems were affected — this remains a physical theft case.",
          conf: "85%", cls: "observed", refs: "EVID-6603",
        },
        summary: {
          text: "An intruder breached the perimeter fence overnight, triggered a motion event with no badge access, and opened a signal cabinet. Missing copper wiring was reported the next morning by the maintenance crew.",
          conf: "Pending", cls: "conclusion", refs: "—",
        },
        anomaly: {
          text: "The six-hour gap between the cabinet door sensor event and the missing-wiring report is the primary anomaly — investigators are reviewing overnight footage from adjacent cameras to close it.",
          conf: "52%", cls: "inference", refs: "—",
        },
        evidence: {
          text: "This case has <b>7</b> evidence items, primarily access-control sensor logs and camera footage.",
          conf: "—", cls: "observed", refs: "—",
        },
      },
      aiFallback: "I can help investigate SV-018. Try asking about the perimeter breach, the signal cabinet, or a summary of the investigation.",
      attackChain: {
        initial: { status: "inference", evid: "EVID-6601", note: "Perimeter fence sensor triggered overnight with no corresponding badge access." },
        collection: { status: "observed", evid: "EVID-6603", note: "Signal cabinet sensor confirms the cabinet door was opened." },
      },
      forensicsArtifacts: [
        { id: "EVID-6601", type: "Access Control Log", source: "Access Control", acquired: "2026-08-08 02:12", hash: "SHA-256 3D71A0…6F84", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-6602", type: "Camera Metadata", source: "Physical Security", acquired: "2026-08-08 02:13", hash: "SHA-256 F209B6…7C15", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-6603", type: "Cabinet Sensor Log", source: "Access Control", acquired: "2026-08-08 02:19", hash: "SHA-256 88AC41…D073", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-6604", type: "Field Interview Log", source: "Field Interview", acquired: "2026-08-08 08:20", hash: "SHA-256 5E92F0…B341", integrity: "Verified", custody: "FIELD-EXAM-03 → EVID-VAULT-02" },
      ],
    },
    "SV-047": {
      title: "Records Management System Intrusion",
      severity: "critical",
      status: "analysis",
      twinTitle: "Digital Twin — SCADA Server Room",
      primaryDevice: "d2",
      evidenceGraph: { entity: "Employee-088 (Compromised Account)", account: "employee088@dot.cityops.gov", device: "SCADA-APP-02", ip: "10.44.2.14", network: "Outbound :443 — anomalous", external: "91.203.44.18", file: "rms_case_index.db" },
      timeline: {
        ticks: [{ x: 60, label: "03:00" }, { x: 380, label: "03:20" }, { x: 700, label: "03:40" }],
        events: [
          { x: 130, time: "03:04:22", label: "VPN login — Employee-088, unrecognized device", source: "IAM", type: "identity", evid: "EVID-7701", conf: "Observed Evidence", highlight: "top" },
          { x: 300, time: "03:09:47", label: "Credential reuse attempt — RMS admin account", source: "IAM", type: "identity", evid: "EVID-7702", conf: "Correlated Evidence", color: "var(--ev-correlated)" },
          { x: 480, time: "03:14:10", label: "Network scan detected — records subnet", source: "Network", type: "network", evid: "EVID-7703", conf: "AI Inference", color: "var(--gold)" },
          { x: 610, time: "03:21:35", label: "Lateral movement — SCADA-APP-02 to RMS-DB-01", source: "EDR", type: "endpoint", evid: "EVID-7704", conf: "Correlated Evidence", highlight: "bottom" },
          { x: 690, time: "03:26:52", label: "Query attempt — CJIS-protected case records", source: "RMS Audit Log", type: "file", evid: "EVID-7705", conf: "Observed Evidence", color: "var(--low)" },
          { x: 760, time: "03:29:18", label: "Access control blocked query — insufficient clearance", source: "Access Control", type: "identity", evid: "EVID-7706", conf: "Observed Evidence", color: "var(--ok)" },
          { x: 820, time: "03:31:44", label: "Session terminated by SOC", source: "IAM", type: "identity", evid: "EVID-7707", conf: "Observed Evidence", color: "var(--text-faint)" },
        ],
      },
      stream: [
        ["03:04:22", "tag-endpoint", "Auth", "VPN login — <b>Employee-088</b>, unrecognized device"],
        ["03:09:47", "tag-endpoint", "Auth", "Credential reuse attempt — <b>RMS admin account</b>"],
        ["03:14:10", "tag-net", "Net", "Network scan detected — <b>records subnet</b>"],
        ["03:21:35", "tag-endpoint", "Proc", "Lateral movement — <b>SCADA-APP-02 → RMS-DB-01</b>"],
        ["03:26:52", "tag-file", "File", "Query attempt — <b>CJIS-protected case records</b>"],
        ["03:29:18", "tag-phys", "Block", "Access control blocked query — <b>insufficient clearance</b>"],
      ],
      liveFeed: [
        ["tag-endpoint", "Auth", "Reviewing Employee-088's device history — <b>no prior VPN use</b>"],
        ["tag-net", "Net", "Cross-referencing 91.203.44.18 against known threat feeds"],
      ],
      intel: [
        ["91.203.44.18", "IP · Suspected Origin", "sev-high", "High"],
        ["Employee-088", "Identity · Compromised Account", "sev-critical", "Critical"],
        ["RMS-DB-01", "System · Records Database", "sev-high", "High"],
      ],
      ai: {
        initial: {
          text: "A VPN login for <b>Employee-088</b> at <b>03:04:22</b> from a device never seen on this account was followed five minutes later by a credential reuse attempt against the RMS administrator account.",
          conf: "82%", cls: "", refs: "EVID-7701, EVID-7702",
        },
        affected: {
          text: "One compromised VPN account and one internal application server (<b>SCADA-APP-02</b>) are implicated, with lateral movement toward the records-management database. No case records were successfully accessed.",
          conf: "79%", cls: "", refs: "EVID-7704",
        },
        summary: {
          text: "A compromised VPN credential was used overnight to scan the records subnet, move laterally from SCADA-APP-02 toward the RMS database, and attempt a query against CJIS-protected case records. Access control blocked the query on insufficient clearance, and the SOC terminated the session two minutes later.",
          conf: "Pending", cls: "conclusion", refs: "—",
        },
        anomaly: {
          text: "The credential-reuse attempt against the RMS admin account — a role Employee-088 has never held — is the clearest signal this session was not the legitimate employee.",
          conf: "76%", cls: "inference", refs: "EVID-7702",
        },
        lateral: {
          text: "Confirmed lateral movement from <b>SCADA-APP-02</b> toward <b>RMS-DB-01</b> on the same internal subnet, though the records query itself was blocked before any data was returned.",
          conf: "Correlated", cls: "", refs: "EVID-7704",
        },
        evidence: {
          text: "This case has <b>19</b> evidence items, including authentication logs, network captures, and the RMS system's own access-control audit trail.",
          conf: "—", cls: "observed", refs: "—",
        },
      },
      aiFallback: "I can help investigate SV-047. Try asking about the initial login, the lateral movement, the blocked query, or a summary of the investigation.",
      attackChain: {
        initial: { status: "observed", evid: "EVID-7701", note: "VPN login for Employee-088 from a device never previously associated with this account." },
        credAccess: { status: "correlated", evid: "EVID-7702", note: "Credential reuse attempt against the RMS administrator account, a role this employee has never held." },
        discovery: { status: "inference", evid: "EVID-7703", note: "A network scan of the records subnet was detected shortly after the credential-reuse attempt." },
        lateral: { status: "correlated", evid: "EVID-7704", note: "Lateral movement confirmed from SCADA-APP-02 toward the RMS database on the same internal subnet." },
        collection: { status: "observed", evid: "EVID-7705", note: "A query was attempted against CJIS-protected case records." },
        exfil: { status: "observed", evid: "EVID-7706", note: "The query was blocked by access control on insufficient clearance — no case data was returned or exfiltrated." },
      },
      forensicsArtifacts: [
        { id: "EVID-7701", type: "Authentication Log", source: "IAM", acquired: "2026-08-12 03:05", hash: "SHA-256 6C40E1…9B27", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-7702", type: "Authentication Log", source: "IAM", acquired: "2026-08-12 03:10", hash: "SHA-256 2A98D4…F615", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-7703", type: "Network Capture (PCAP)", source: "Network", acquired: "2026-08-12 03:15", hash: "SHA-256 D471C0…3E82", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-7704", type: "Memory Capture", source: "EDR", acquired: "2026-08-12 03:22", hash: "SHA-256 91B7A5…C049", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-7705", type: "RMS Audit Log", source: "RMS Audit Log", acquired: "2026-08-12 03:27", hash: "SHA-256 5F03E8…7A16", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-7706", type: "Access Control Log", source: "Access Control", acquired: "2026-08-12 03:30", hash: "SHA-256 C82B49…D501", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
        { id: "EVID-7707", type: "Session Termination Log", source: "IAM", acquired: "2026-08-12 03:32", hash: "SHA-256 0E9F73…B884", integrity: "Verified", custody: "AUTOMATED → EVID-VAULT-02" },
      ],
    },
  };

  var DEVICES = {
    d0: { id: "TRAFFIC-CTRL-14", cx: 190, cy: 175, location: "Traffic Ops Center", user: "Contractor-019", ip: "10.44.6.112", mac: "3C:E1:A4:9F:02:B7", evidence: "27 artifacts", events: "8", accounts: "2", risk: "High" },
    d1: { id: "SIGNAL-DB-01", cx: 55, cy: 65, location: "SCADA Server Room", user: "svc-signaldb", ip: "10.44.2.10", mac: "88:5A:04:B1:1C:9E", evidence: "4 artifacts", events: "1", accounts: "1", risk: "Low" },
    d2: { id: "SCADA-APP-02", cx: 120, cy: 80, location: "SCADA Server Room", user: "svc-scada", ip: "10.44.2.14", mac: "88:5A:04:B1:1C:A2", evidence: "2 artifacts", events: "0", accounts: "1", risk: "Low" },
    d3: { id: "ALPR-UNIT-08", cx: 280, cy: 45, location: "5th & Main Corridor", user: "Suspect-01", ip: "10.44.9.3", mac: "F0:1D:BC:22:4E:6A", evidence: "21 artifacts", events: "5", accounts: "1", risk: "High" },
    d4: { id: "STREETCAM-5THMAIN", cx: 330, cy: 55, location: "5th & Main Corridor", user: "—", ip: "10.44.1.1", mac: "00:1B:44:11:3A:B7", evidence: "3 artifacts", events: "1", accounts: "0", risk: "Low" },
    d5: { id: "TRANSIT-GATE-R12", cx: 60, cy: 175, location: "Riverside Transit Hub", user: "Case Subject — J.A.", ip: "—", mac: "—", evidence: "9 artifacts", events: "1", accounts: "1", risk: "Medium" },
    d6: { id: "TRAFFIC-CTRL-09", cx: 120, cy: 190, location: "Traffic Ops Center", user: "Contractor-044", ip: "10.44.6.44", mac: "3C:E1:A4:9F:03:11", evidence: "1 artifact", events: "0", accounts: "1", risk: "Low" },
    d7: { id: "CAM-TRAFFICOPS-04", cx: 270, cy: 165, location: "Traffic Ops Center", user: "—", ip: "10.44.5.20", mac: "AC:DE:48:00:11:22", evidence: "6 artifacts", events: "2", accounts: "0", risk: "Low" },
  };

  var ROOMS = {
    server: {
      name: "SCADA Server Room", risk: "Low", devices: ["SIGNAL-DB-01", "SCADA-APP-02"],
      note: "2 devices, no active alerts",
    },
    corridor: {
      name: "5th & Main Corridor", risk: "High", devices: ["ALPR-UNIT-08", "STREETCAM-5THMAIN"],
      note: "Street-level ALPR and camera network — flagged in SV-014",
    },
    ops: {
      name: "Traffic Ops Center", risk: "High", devices: ["TRAFFIC-CTRL-14", "TRAFFIC-CTRL-09", "CAM-TRAFFICOPS-04"],
      note: "Primary signal-controller cluster — includes TRAFFIC-CTRL-14",
    },
  };

  var SEARCH_INDEX = [
    { label: "SV-001", type: "Case · Critical", run: function () { selectCase("SV-001"); scrollToPanel("panel-investigations"); } },
    { label: "SV-014", type: "Case · High", run: function () { selectCase("SV-014"); scrollToPanel("panel-investigations"); } },
    { label: "SV-009", type: "Case · High", run: function () { selectCase("SV-009"); scrollToPanel("panel-investigations"); } },
    { label: "SV-022", type: "Case · High", run: function () { selectCase("SV-022"); scrollToPanel("panel-investigations"); } },
    { label: "SV-031", type: "Case · Critical", run: function () { selectCase("SV-031"); scrollToPanel("panel-investigations"); } },
    { label: "SV-018", type: "Case · Medium", run: function () { selectCase("SV-018"); scrollToPanel("panel-investigations"); } },
    { label: "SV-047", type: "Case · Critical", run: function () { selectCase("SV-047"); scrollToPanel("panel-investigations"); } },
    { label: "TRAFFIC-CTRL-14", type: "Device · SV-001", run: function () { selectCase("SV-001"); selectDevice("d0"); scrollToPanel("panel-twin"); } },
    { label: "ALPR-UNIT-08", type: "Device · SV-014", run: function () { selectCase("SV-014"); selectDevice("d3"); scrollToPanel("panel-twin"); } },
    { label: "TRANSIT-GATE-R12", type: "Device · SV-009", run: function () { selectCase("SV-009"); selectDevice("d5"); scrollToPanel("panel-twin"); } },
    { label: "Contractor-019", type: "Identity · SV-001", run: function () { selectCase("SV-001"); scrollToPanel("panel-overview"); } },
    { label: "Suspect-01", type: "Identity · SV-014", run: function () { selectCase("SV-014"); scrollToPanel("panel-overview"); } },
    { label: "Case Subject — J.A.", type: "Identity · SV-009", run: function () { selectCase("SV-009"); scrollToPanel("panel-overview"); } },
    { label: "185.212.44.6", type: "IOC · IP", run: function () { selectCase("SV-001"); selectIntel("185.212.44.6"); } },
    { label: "+1 (555) 019-4471", type: "IOC · Phone", run: function () { selectCase("SV-014"); selectIntel("+1 (555) 019-4471"); } },
    { label: "signal_timing_master.cfg", type: "Evidence · File", run: function () { selectCase("SV-001"); scrollToPanel("panel-overview"); } },
    { label: "EVID-1042", type: "Evidence ID · SV-001", run: function () { selectCase("SV-001"); scrollToPanel("panel-overview"); } },
  ];

  var SEVERITY_COLOR = { critical: "var(--crit)", high: "var(--high)", medium: "var(--med)" };
  var currentCase = "SV-001";
  var currentDevice = "d0";
  var currentZoom = "hours";
  var activeTimelineFilter = "all";

  function scrollToPanel(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectCase(caseId) {
    var data = CASES[caseId];
    if (!data) return;
    currentCase = caseId;
    if (replayTimer) {
      window.clearInterval(replayTimer);
      replayTimer = null;
    }

    document.getElementById("case-pill-id").textContent = caseId;
    document.getElementById("case-pill-title").textContent = data.title;
    document.getElementById("stream-case-label").textContent = caseId;
    var reportsLabel = document.getElementById("reports-case-label");
    if (reportsLabel) reportsLabel.textContent = caseId;
    var automationStatus = document.getElementById("automation-status");
    if (automationStatus) automationStatus.textContent = (document.getElementById("automation-toggle").checked ? "Enabled" : "Disabled") + " for " + caseId;
    document.getElementById("case-pill-dot").style.background = SEVERITY_COLOR[data.severity] || SEVERITY_COLOR.critical;

    document.querySelectorAll(".case-card").forEach(function (card) {
      card.classList.toggle("active", card.getAttribute("data-case") === caseId);
    });

    var streamList = document.getElementById("stream-list");
    streamList.innerHTML = data.stream
      .map(function (row) {
        return (
          '<li><span class="stream-time">' + row[0] + '</span>' +
          '<span class="stream-tag ' + row[1] + '">' + row[2] + "</span>" +
          '<span class="stream-desc">' + row[3] + "</span></li>"
        );
      })
      .join("");

    var intelRows = document.getElementById("intel-rows");
    intelRows.innerHTML = data.intel
      .map(function (row) {
        return (
          '<div class="intel-row" data-ioc="' + row[0] + '">' +
          '<span class="intel-val">' + row[0] + "</span>" +
          '<span class="intel-type">' + row[1] + "</span>" +
          '<span class="sev ' + row[2] + '">' + row[3] + "</span></div>"
        );
      })
      .join("");
    bindIntelRows();

    document.getElementById("twin-panel-title").innerHTML =
      '<svg><use href="#i-cube"/></svg>' + data.twinTitle;

    var eg = data.evidenceGraph;
    if (eg) {
      document.getElementById("eg-case-label").textContent = caseId;
      document.getElementById("eg-entity").textContent = eg.entity;
      document.getElementById("eg-account").textContent = eg.account;
      document.getElementById("eg-device").textContent = eg.device;
      document.getElementById("eg-ip").textContent = eg.ip;
      document.getElementById("eg-network").textContent = eg.network;
      document.getElementById("eg-external").textContent = eg.external;
      document.getElementById("eg-file").textContent = eg.file;
    }

    try {
      window.localStorage.setItem("sv_dashboard_case", caseId);
    } catch (e) {}

    renderTimeline(caseId);
    renderForensicsArtifacts(caseId);
    renderAttackChain(caseId);
    selectDevice(data.primaryDevice);
  }

  var ATTACK_STAGES = [
    { key: "initial", label: "Initial Access" },
    { key: "execution", label: "Execution" },
    { key: "persistence", label: "Persistence" },
    { key: "privesc", label: "Privilege Escalation" },
    { key: "defenseEvasion", label: "Defense Evasion" },
    { key: "credAccess", label: "Credential Access" },
    { key: "discovery", label: "Discovery" },
    { key: "lateral", label: "Lateral Movement" },
    { key: "collection", label: "Collection" },
    { key: "exfil", label: "Exfiltration" },
  ];
  var ATTACK_CONF_LABEL = { observed: "Observed Evidence", correlated: "Correlated Evidence", inference: "AI Inference", none: "No Evidence" };
  var ATTACK_CONF_BADGE_CLASS = { observed: "observed", correlated: "", inference: "inference", none: "" };

  function renderAttackChain(caseId) {
    var data = CASES[caseId];
    var chain = data.attackChain || {};
    var container = document.getElementById("attack-chain");
    if (!container) return;
    container.innerHTML = "";
    var previousStatus = "none";
    ATTACK_STAGES.forEach(function (stage) {
      var entry = chain[stage.key] || { status: "none" };
      var tooltipText = entry.status === "none"
        ? "No supporting evidence identified for this stage."
        : ATTACK_CONF_LABEL[entry.status] + " — " + entry.note;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "attack-stage status-" + entry.status + " line-from-" + previousStatus;
      previousStatus = entry.status;
      btn.setAttribute("data-stage", stage.key);
      btn.innerHTML = '<span class="attack-stage__dot"></span><span class="attack-stage__label">' + stage.label + "</span>";
      btn.addEventListener("click", function () {
        selectAttackStage(stage.key, stage.label);
      });
      btn.addEventListener("mouseenter", function () { showStageTooltip(btn, tooltipText); });
      btn.addEventListener("mouseleave", hideStageTooltip);
      btn.addEventListener("focus", function () { showStageTooltip(btn, tooltipText); });
      btn.addEventListener("blur", hideStageTooltip);
      container.appendChild(btn);
    });
    container.addEventListener("mouseleave", hideStageTooltip);
    var label = document.getElementById("attack-case-label");
    if (label) label.textContent = caseId;
    var detail = document.getElementById("attack-detail");
    if (detail) detail.innerHTML = '<span class="attack-detail-hint">Click a stage for its supporting evidence.</span>';
  }

  function selectAttackStage(key, label) {
    hideStageTooltip();
    var data = CASES[currentCase];
    var entry = (data.attackChain && data.attackChain[key]) || { status: "none" };
    document.querySelectorAll("#attack-chain .attack-stage").forEach(function (b) {
      b.classList.toggle("selected", b.getAttribute("data-stage") === key);
    });
    var detail = document.getElementById("attack-detail");
    if (!detail) return;
    if (entry.status === "none") {
      detail.innerHTML =
        '<div class="attack-detail-title">' + label + "</div>" +
        '<p class="attack-detail-note">No supporting evidence has been identified for this stage in the current dataset.</p>';
    } else {
      detail.innerHTML =
        '<div class="attack-detail-title">' + label + "</div>" +
        '<p class="attack-detail-note">' + entry.note + "</p>" +
        '<div class="attack-detail-meta"><span class="conf-badge ' + ATTACK_CONF_BADGE_CLASS[entry.status] + '">' + ATTACK_CONF_LABEL[entry.status] + "</span>" +
        (entry.evid ? '<span class="ev-refs">' + entry.evid + "</span>" : "") +
        "</div>";
    }
  }

  function showStageTooltip(anchorEl, text) {
    var tip = document.getElementById("stage-tooltip");
    if (!tip || !anchorEl || typeof anchorEl.getBoundingClientRect !== "function") return;
    tip.textContent = text;
    tip.hidden = false;

    var rect = anchorEl.getBoundingClientRect();
    var tipWidth = 220;
    var left = rect.left + rect.width / 2 - tipWidth / 2;
    var minLeft = 8;
    var maxLeft = (window.innerWidth || 1024) - tipWidth - 8;
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    var tipHeight = tip.offsetHeight || 60;
    var top = rect.top - tipHeight - 10;
    if (top < 8) top = rect.bottom + 10;

    tip.style.left = left + "px";
    tip.style.top = top + "px";
    window.requestAnimationFrame(function () {
      tip.classList.add("visible");
    });
  }

  function hideStageTooltip() {
    var tip = document.getElementById("stage-tooltip");
    if (!tip) return;
    tip.classList.remove("visible");
    tip.hidden = true;
  }

  function renderForensicsArtifacts(caseId) {
    var data = CASES[caseId];
    var artifacts = (data && data.forensicsArtifacts) || [];
    var container = document.getElementById("artifact-rows");
    var count = document.getElementById("forensics-count");
    if (!container) return;
    container.innerHTML = artifacts
      .map(function (a) {
        return (
          '<div class="artifact-row" data-artifact="' + a.id + '">' +
          '<span class="artifact-id">' + a.id + "</span>" +
          '<span class="artifact-type">' + a.type + "</span>" +
          '<span class="artifact-source">' + a.source + "</span>" +
          '<span class="artifact-integrity">' + a.integrity + "</span>" +
          "</div>"
        );
      })
      .join("");
    if (count) count.textContent = artifacts.length + " artifact" + (artifacts.length === 1 ? "" : "s");
    document.querySelectorAll("#artifact-rows .artifact-row").forEach(function (row) {
      row.addEventListener("click", function () {
        selectArtifact(row.getAttribute("data-artifact"));
      });
    });
    var detail = document.getElementById("artifact-detail");
    if (detail) detail.innerHTML = '<span class="artifact-detail-hint">Click an artifact for chain of custody and integrity details.</span>';
  }

  function selectArtifact(artifactId) {
    var data = CASES[currentCase];
    var artifacts = (data && data.forensicsArtifacts) || [];
    var artifact = artifacts.filter(function (a) { return a.id === artifactId; })[0];
    if (!artifact) return;
    document.querySelectorAll("#artifact-rows .artifact-row").forEach(function (row) {
      row.classList.toggle("selected", row.getAttribute("data-artifact") === artifactId);
    });
    var detail = document.getElementById("artifact-detail");
    if (!detail) return;
    detail.innerHTML =
      '<div class="artifact-detail-title">' + artifact.id + " — " + artifact.type + "</div>" +
      '<div class="artifact-detail-grid">' +
      '<span><span class="k">Source</span><b>' + artifact.source + "</b></span>" +
      '<span><span class="k">Acquired</span><b>' + artifact.acquired + "</b></span>" +
      '<span><span class="k">Hash</span><b>' + artifact.hash + "</b></span>" +
      '<span><span class="k">Integrity</span><b>' + artifact.integrity + "</b></span>" +
      '<span><span class="k">Chain of Custody</span><b>' + artifact.custody + "</b></span>" +
      "</div>";
  }

  function selectDevice(deviceKey) {
    var d = DEVICES[deviceKey];
    if (!d) return;
    currentDevice = deviceKey;

    document.querySelectorAll(".twin-room").forEach(function (r) { r.classList.remove("selected"); });

    var ring = document.getElementById("twin-pulse-ring");
    var dot = document.getElementById("twin-pulse-dot");
    var label = document.getElementById("twin-pulse-label");
    ring.setAttribute("cx", d.cx);
    ring.setAttribute("cy", d.cy);
    dot.setAttribute("cx", d.cx);
    dot.setAttribute("cy", d.cy);
    dot.setAttribute("data-device", deviceKey);
    label.setAttribute("x", d.cx);
    label.setAttribute("y", d.cy + 25);
    label.textContent = d.id;

    document.getElementById("twin-selected-label").textContent = d.id;
    document.getElementById("twin-id").textContent = d.id;
    document.getElementById("twin-location").textContent = d.location;
    document.getElementById("twin-user").textContent = d.user;
    document.getElementById("twin-ip").textContent = d.ip;
    document.getElementById("twin-mac").textContent = d.mac;
    document.getElementById("twin-evidence").textContent = d.evidence;
    document.getElementById("twin-events").textContent = d.events;
    document.getElementById("twin-accounts").textContent = d.accounts;

    var riskEl = document.getElementById("twin-risk");
    riskEl.textContent = "Risk: " + d.risk;
    riskEl.className = "sev " + (d.risk === "High" ? "sev-critical" : d.risk === "Medium" ? "sev-medium" : "sev-high");
  }

  function selectIntel(iocValue) {
    document.querySelectorAll(".intel-row").forEach(function (row) {
      row.classList.toggle("selected", row.getAttribute("data-ioc") === iocValue);
    });
    scrollToPanel("panel-overview");
  }

  function bindIntelRows() {
    document.querySelectorAll(".intel-row").forEach(function (row) {
      row.addEventListener("click", function () {
        document.querySelectorAll(".intel-row").forEach(function (r) { r.classList.remove("selected"); });
        row.classList.add("selected");
      });
    });
  }

  function matchAI(question) {
    var q = question.toLowerCase();
    var data = CASES[currentCase];
    var key = null;
    if (/initial|first|start|entry/.test(q)) key = "initial";
    else if (/affected|systems|impact/.test(q)) key = "affected";
    else if (/summar/.test(q)) key = "summary";
    else if (/anomal|unusual|strange/.test(q)) key = "anomaly";
    else if (/lateral/.test(q)) key = "lateral";
    else if (/evidence|artifact/.test(q)) key = "evidence";
    else if (/what happened/.test(q)) key = "summary";

    if (key && data.ai[key]) return data.ai[key];
    return { text: data.aiFallback, conf: null, cls: "", refs: null };
  }

  function askAI(question) {
    if (!question || !question.trim()) return;
    var thread = document.getElementById("ai-thread");

    var wrap = document.createElement("div");
    var qEl = document.createElement("div");
    qEl.className = "ai-q";
    qEl.textContent = question;
    wrap.appendChild(qEl);

    var answer = matchAI(question);
    var aEl = document.createElement("div");
    aEl.className = "ai-a";
    aEl.innerHTML = answer.text;

    if (answer.conf) {
      var meta = document.createElement("div");
      meta.className = "ai-meta";
      var badgeLabel = answer.cls === "conclusion" ? "Investigator Conclusion"
        : answer.cls === "inference" ? "AI Inference"
        : answer.cls === "observed" ? "Observed Evidence"
        : "Correlated Evidence";
      meta.innerHTML =
        '<span class="conf-badge ' + (answer.cls || "") + '">' + answer.conf + " · " + badgeLabel + "</span>" +
        (answer.refs && answer.refs !== "—" ? '<span class="ev-refs">' + answer.refs + "</span>" : "");
      aEl.appendChild(meta);
    }

    wrap.appendChild(aEl);
    thread.appendChild(wrap);
    thread.scrollTop = thread.scrollHeight;
  }

  function initSidebarViews() {
    var links = document.querySelectorAll('#app-nav a[data-view]');
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        links.forEach(function (l) { l.classList.remove("active"); });
        link.classList.add("active");
      });
    });
  }

  function initCaseCards() {
    document.querySelectorAll(".case-card").forEach(function (card) {
      card.addEventListener("click", function () {
        pauseAutoRotateForInteraction();
        selectCase(card.getAttribute("data-case"));
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          pauseAutoRotateForInteraction();
          selectCase(card.getAttribute("data-case"));
        }
      });
    });
  }

  var AUTO_ROTATE_INTERVAL = 5000;
  var AUTO_ROTATE_RESUME_DELAY = 15000;
  var autoRotateTimer = null;
  var autoRotateResumeTimer = null;

  function tickAutoRotate() {
    var ids = Object.keys(CASES);
    var next = ids[(ids.indexOf(currentCase) + 1) % ids.length];
    selectCase(next);
  }

  function startAutoRotate() {
    stopAutoRotate();
    autoRotateTimer = window.setInterval(tickAutoRotate, AUTO_ROTATE_INTERVAL);
  }

  function stopAutoRotate() {
    if (autoRotateTimer) {
      window.clearInterval(autoRotateTimer);
      autoRotateTimer = null;
    }
  }

  function pauseAutoRotateForInteraction() {
    stopAutoRotate();
    if (autoRotateResumeTimer) window.clearTimeout(autoRotateResumeTimer);
    autoRotateResumeTimer = window.setTimeout(startAutoRotate, AUTO_ROTATE_RESUME_DELAY);
  }

  function initCaseAutoRotate() {
    startAutoRotate();
  }

  var STATUS_ORDER = ["new", "active", "analysis", "review", "closed"];
  var STATUS_LABEL = { new: "New", active: "Active", analysis: "Analysis", review: "Review", closed: "Closed" };

  function initCaseStatus() {
    document.querySelectorAll(".status-chip").forEach(function (chip) {
      chip.addEventListener("click", function (e) {
        e.stopPropagation();
        var current = chip.getAttribute("data-status");
        var next = STATUS_ORDER[(STATUS_ORDER.indexOf(current) + 1) % STATUS_ORDER.length];
        chip.classList.remove("status-" + current);
        chip.classList.add("status-" + next);
        chip.setAttribute("data-status", next);
        chip.textContent = STATUS_LABEL[next];
        var caseId = chip.closest(".case-card").getAttribute("data-case");
        if (CASES[caseId]) CASES[caseId].status = next;
      });
      chip.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") e.stopPropagation();
      });
    });
  }

  function initTwinNodes() {
    document.querySelectorAll(".twin-node").forEach(function (node) {
      node.addEventListener("click", function (e) {
        e.stopPropagation();
        selectDevice(node.getAttribute("data-device"));
      });
    });
  }

  function selectRoom(roomKey) {
    var room = ROOMS[roomKey];
    if (!room) return;

    document.querySelectorAll(".twin-room").forEach(function (r) {
      r.classList.toggle("selected", r.getAttribute("data-room") === roomKey);
    });

    document.getElementById("twin-selected-label").textContent = room.name;
    document.getElementById("twin-id").textContent = room.name;
    document.getElementById("twin-location").textContent = "Downtown Corridor";
    document.getElementById("twin-user").textContent = room.devices.length + " devices";
    document.getElementById("twin-ip").textContent = "—";
    document.getElementById("twin-mac").textContent = "—";
    document.getElementById("twin-evidence").textContent = room.note;
    document.getElementById("twin-events").textContent = "—";
    document.getElementById("twin-accounts").textContent = room.devices.join(", ");

    var riskEl = document.getElementById("twin-risk");
    riskEl.textContent = "Risk: " + room.risk;
    riskEl.className = "sev " + (room.risk === "High" ? "sev-critical" : room.risk === "Medium" ? "sev-medium" : "sev-high");
  }

  function initTwinRooms() {
    document.querySelectorAll(".twin-room").forEach(function (room) {
      room.addEventListener("click", function () {
        selectRoom(room.getAttribute("data-room"));
      });
      room.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectRoom(room.getAttribute("data-room"));
        }
      });
    });
  }

  function initTimelineZoom() {
    var chips = document.querySelectorAll("#timeline-zoom .zoom-chip");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        currentZoom = chip.getAttribute("data-zoom") || "hours";
        renderTimeline(currentCase);
      });
    });
  }

  function initTimelineFilter() {
    var chips = document.querySelectorAll("#timeline-filter .filter-chip");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        activeTimelineFilter = chip.getAttribute("data-filter") || "all";
        renderTimeline(currentCase);
      });
    });
  }

  function timeToSeconds(t) {
    var p = t.split(":").map(Number);
    return p[0] * 3600 + p[1] * 60 + p[2];
  }

  function secondsToTime(s) {
    s = Math.max(0, Math.round(s));
    var h = Math.floor(s / 3600) % 24, m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
    return pad(h) + ":" + pad(m) + ":" + pad(sec);
  }

  function computeZoomView(data, zoom) {
    var X_MIN = 60, X_MAX = 980;

    if (zoom === "hours") {
      return { events: data.events, ticks: data.ticks, note: null };
    }

    if (zoom === "days" || zoom === "months" || zoom === "years") {
      var wideLabel = zoom === "days" ? "Day view" : zoom === "months" ? "Month view" : "Year view";
      var axisLabels = zoom === "years" ? ["2023", "2024", "2025"] : zoom === "months" ? ["Jun", "Jul", "Aug"] : ["Aug 7", "Aug 8", "Aug 9"];
      var wideMidX = Math.round((X_MIN + X_MAX) / 2);
      var wideTicks = [
        { x: X_MIN + 30, label: axisLabels[0] },
        { x: wideMidX, label: axisLabels[1] },
        { x: X_MAX - 30, label: axisLabels[2] },
      ];
      var lastTime = data.events[data.events.length - 1].time;
      var aggregate = {
        x: X_MAX - 30,
        time: lastTime,
        label: data.events.length + " correlated event" + (data.events.length === 1 ? "" : "s") + " on this date",
        source: "Aggregate",
        evid: "—",
        conf: "Correlated Evidence",
        highlight: null,
        color: "var(--gold)",
        aggregate: true,
      };
      return {
        events: [aggregate],
        ticks: wideTicks,
        note: wideLabel + " — this case's recorded activity spans a single day in this demo (" + data.events.length + " events). Zoom to Hours or below to see them individually.",
      };
    }

    // minutes / seconds: zoom into the cluster around the highlighted events
    var highlighted = data.events.filter(function (e) { return e.highlight; });
    var pool = highlighted.length ? highlighted : data.events;
    var times = pool.map(function (e) { return timeToSeconds(e.time); });
    var minT = Math.min.apply(null, times), maxT = Math.max.apply(null, times);
    var padSec = zoom === "seconds" ? 25 : 600;
    var winStart = minT - padSec, winEnd = maxT + padSec;

    var within = data.events.filter(function (e) {
      var t = timeToSeconds(e.time);
      return t >= winStart && t <= winEnd;
    });
    if (!within.length) within = pool;

    var wTimes = within.map(function (e) { return timeToSeconds(e.time); });
    var wMinT = Math.min.apply(null, wTimes), wMaxT = Math.max.apply(null, wTimes);
    var span = Math.max(wMaxT - wMinT, 1);

    var rescaled = within.map(function (e) {
      var t = timeToSeconds(e.time);
      var frac = within.length === 1 ? 0.5 : (t - wMinT) / span;
      var copy = {};
      for (var k in e) copy[k] = e[k];
      copy.x = Math.round(X_MIN + frac * (X_MAX - X_MIN));
      return copy;
    });

    var tickCount = 3;
    var ticks = [];
    for (var i = 0; i < tickCount; i++) {
      var frac2 = tickCount === 1 ? 0.5 : i / (tickCount - 1);
      ticks.push({
        x: Math.round(X_MIN + frac2 * (X_MAX - X_MIN)),
        label: secondsToTime(wMinT + frac2 * span),
      });
    }

    var zoomWord = zoom === "seconds" ? "Second-level" : "Minute-level";
    return {
      events: rescaled,
      ticks: ticks,
      note: zoomWord + " zoom — showing the " + within.length + " event" + (within.length === 1 ? "" : "s") + " closest to the highlighted activity.",
    };
  }

  function initAI() {
    var input = document.getElementById("ai-input");
    var send = document.getElementById("ai-send");
    function submit() {
      var val = input.value;
      input.value = "";
      askAI(val);
    }
    send.addEventListener("click", submit);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") submit();
    });
    document.querySelectorAll(".ai-suggestion").forEach(function (btn) {
      btn.addEventListener("click", function () {
        askAI(btn.getAttribute("data-q"));
      });
    });
  }

  function initSearch() {
    var input = document.getElementById("search-input");
    var results = document.getElementById("search-results");

    function render(list) {
      if (!list.length) {
        results.innerHTML = '<div class="search-empty">No matches</div>';
      } else {
        results.innerHTML = list
          .slice(0, 8)
          .map(function (item, i) {
            return (
              '<div class="search-result" data-i="' + i + '">' +
              '<span class="rval">' + item.label + "</span>" +
              '<span class="rtype">' + item.type + "</span></div>"
            );
          })
          .join("");
        Array.prototype.forEach.call(results.querySelectorAll(".search-result"), function (el, i) {
          el.addEventListener("click", function () {
            pauseAutoRotateForInteraction();
            list[i].run();
            results.classList.remove("open");
            input.value = "";
          });
        });
      }
      results.classList.add("open");
    }

    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      if (!q) {
        results.classList.remove("open");
        return;
      }
      var matches = SEARCH_INDEX.filter(function (item) {
        return item.label.toLowerCase().indexOf(q) !== -1 || item.type.toLowerCase().indexOf(q) !== -1;
      });
      render(matches);
    });

    document.addEventListener("click", function (e) {
      if (!results.contains(e.target) && e.target !== input) {
        results.classList.remove("open");
      }
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") results.classList.remove("open");
    });
  }

  var SVG_NS = "http://www.w3.org/2000/svg";

  function svgEl(tag, attrs) {
    var el = document.createElementNS(SVG_NS, tag);
    for (var key in attrs) el.setAttribute(key, attrs[key]);
    return el;
  }

  function showTimelineDetail(ev) {
    var detail = document.getElementById("timeline-detail");
    if (!detail) return;
    detail.innerHTML =
      '<div class="timeline-detail-grid">' +
      '<span><span class="k">Time</span><b>' + ev.time + "</b></span>" +
      '<span><span class="k">Event</span><b>' + ev.label + "</b></span>" +
      '<span><span class="k">Source</span><b>' + ev.source + "</b></span>" +
      '<span><span class="k">Evidence</span><b>' + ev.evid + "</b></span>" +
      '<span><span class="k">Confidence</span><b>' + ev.conf + "</b></span>" +
      "</div>";
  }

  function renderTimeline(caseId) {
    var data = CASES[caseId] && CASES[caseId].timeline;
    var ticksGroup = document.getElementById("timeline-ticks");
    var eventsGroup = document.getElementById("timeline-events");
    var countLabel = document.getElementById("timeline-count");
    var detail = document.getElementById("timeline-detail");
    if (!data || !ticksGroup || !eventsGroup) return;

    var view = computeZoomView(data, currentZoom);
    var isAggregateView = view.events.length === 1 && view.events[0].aggregate;
    var shownEvents = (activeTimelineFilter === "all" || isAggregateView)
      ? view.events
      : view.events.filter(function (e) { return e.type === activeTimelineFilter; });

    ticksGroup.innerHTML = "";
    eventsGroup.innerHTML = "";
    if (detail) {
      detail.innerHTML = view.note
        ? '<span class="timeline-detail-hint">' + view.note + "</span>"
        : '<span class="timeline-detail-hint">Click any event marker for details.</span>';
    }
    if (countLabel) countLabel.textContent = shownEvents.length + " event" + (shownEvents.length === 1 ? "" : "s") + (activeTimelineFilter === "all" ? "" : " · " + activeTimelineFilter);

    view.ticks.forEach(function (t) {
      ticksGroup.appendChild(svgEl("line", { x1: t.x, y1: 46, x2: t.x, y2: 58, stroke: "var(--line)", "stroke-width": 1 }));
      var label = svgEl("text", {
        x: t.x, y: 76, "font-family": "var(--font-mono)", "font-size": 9.5,
        fill: "var(--text-faint)", "text-anchor": "middle",
      });
      label.textContent = t.label;
      ticksGroup.appendChild(label);
    });

    shownEvents.forEach(function (ev) {
      if (ev.highlight) {
        var ring = svgEl("circle", { class: "pulse", cx: ev.x, cy: 52, r: 6, fill: "none", stroke: "var(--gold)", "stroke-width": 1.3, color: "var(--gold)" });
        eventsGroup.appendChild(ring);
      }
      if (ev.aggregate) {
        var aggRing = svgEl("circle", { class: "pulse", cx: ev.x, cy: 52, r: 10, fill: "none", stroke: "var(--gold)", "stroke-width": 1.3, color: "var(--gold)" });
        eventsGroup.appendChild(aggRing);
      }
      var dot = svgEl("circle", {
        class: "timeline-event",
        cx: ev.x, cy: 52, r: ev.aggregate ? 9 : (ev.highlight ? 6 : 5),
        fill: ev.aggregate ? "var(--gold)" : (ev.highlight ? "var(--gold)" : (ev.color || "var(--low)")),
      });
      dot.addEventListener("click", function () { showTimelineDetail(ev); });
      eventsGroup.appendChild(dot);

      if (ev.aggregate) {
        eventsGroup.appendChild(svgEl("line", { x1: ev.x, y1: 52, x2: ev.x, y2: 26, stroke: "var(--gold-dim)", "stroke-width": 1 }));
        var aggCallout = svgEl("text", {
          x: ev.x, y: 18, "text-anchor": "middle",
          "font-family": "var(--font-mono)", "font-size": 9, fill: "var(--gold-bright)",
        });
        aggCallout.textContent = ev.label;
        eventsGroup.appendChild(aggCallout);
      } else if (ev.highlight) {
        var side = ev.highlight === "top" ? -1 : 1;
        var lineY2 = ev.highlight === "top" ? 26 : 78;
        eventsGroup.appendChild(svgEl("line", { x1: ev.x, y1: 52, x2: ev.x, y2: lineY2, stroke: "var(--gold-dim)", "stroke-width": 1 }));
        var callout = svgEl("text", {
          x: ev.x, y: ev.highlight === "top" ? 18 : 94, "text-anchor": "middle",
          "font-family": "var(--font-mono)", "font-size": 9, fill: "var(--gold-bright)",
        });
        callout.textContent = ev.time + " — " + ev.label.split(" — ")[0];
        eventsGroup.appendChild(callout);
      }
    });
  }

  function wireWorkflowToggle(toggleId, rowId, statusId, enabledText, disabledText) {
    var toggle = document.getElementById(toggleId);
    var row = document.getElementById(rowId);
    var status = document.getElementById(statusId);
    if (!toggle) return;
    function apply() {
      if (row) row.classList.toggle("disabled", !toggle.checked);
      if (status) status.textContent = toggle.checked ? enabledText : disabledText;
      var label = toggle.closest(".workflow-toggle");
      if (label) {
        label.classList.add("just-changed");
        window.setTimeout(function () { label.classList.remove("just-changed"); }, 600);
      }
    }
    toggle.addEventListener("change", apply);
    apply();
  }

  function initAutomation() {
    wireWorkflowToggle("automation-toggle", "workflow-row-1", "automation-status", "Enabled for " + currentCase, "Disabled for " + currentCase);
    wireWorkflowToggle("automation-toggle-2", "workflow-row-2", "automation-status-2", "Enabled platform-wide", "Disabled platform-wide");
  }

  function initReports() {
    var btn = document.getElementById("generate-report-btn");
    var status = document.getElementById("report-status");
    if (!btn || !status) return;
    btn.addEventListener("click", function () {
      btn.disabled = true;
      status.className = "report-status";
      status.textContent = "Generating report for " + currentCase + "…";
      window.setTimeout(function () {
        status.className = "report-status done";
        status.textContent = "✓ " + currentCase + "_Executive_Summary.pdf ready (simulated — no file was created)";
        btn.disabled = false;
      }, 1400);
    });

    document.querySelectorAll(".rh-link").forEach(function (link) {
      link.addEventListener("click", function () {
        var name = link.getAttribute("data-report");
        status.className = "report-status";
        status.textContent = "Opening " + name + "…";
        link.disabled = true;
        window.setTimeout(function () {
          status.className = "report-status done";
          status.textContent = "✓ " + name + " (simulated preview — no file exists to open)";
          link.disabled = false;
        }, 800);
      });
    });
  }

  function initSettingsToggles() {
    var saved = document.getElementById("settings-saved");
    document.querySelectorAll(".settings-toggle").forEach(function (toggle) {
      toggle.addEventListener("change", function () {
        var label = toggle.closest(".workflow-toggle");
        if (label) {
          label.classList.add("just-changed");
          window.setTimeout(function () { label.classList.remove("just-changed"); }, 600);
        }
        if (saved) {
          var name = toggle.getAttribute("data-setting") || "Setting";
          saved.textContent = "✓ " + name + " " + (toggle.checked ? "enabled" : "disabled") + " — saved.";
          saved.classList.add("flash");
          window.setTimeout(function () { saved.classList.remove("flash"); }, 900);
        }
      });
    });
  }

  var RECON_STAGES = [
    { label: "Physical Event", time: "21:14:02", note: "Movement detected on Traffic Ops Center Camera 04, followed by a badge scan at Door D-12.", evid: "EVID-1042" },
    { label: "Authentication Event", time: "21:14:12", note: "The badge credential for Contractor-019 is followed five seconds later by a successful logon to TRAFFIC-CTRL-14 — same identity, physical to digital.", evid: "EVID-1042" },
    { label: "Endpoint Compromise", time: "21:14:19", note: "An encoded PowerShell process spawns on TRAFFIC-CTRL-14 immediately after logon — uncommon for this contractor's baseline behavior.", evid: "EVID-1044" },
    { label: "Network Activity", time: "21:14:23", note: "An outbound connection opens to 185.212.44.6:443, infrastructure already flagged as command-and-control.", evid: "EVID-1043" },
    { label: "File Activity", time: "21:31:02", note: "File access is confirmed on signal_timing_master.cfg — the live signal-timing configuration for the downtown corridor.", evid: "EVID-1046" },
    { label: "Lateral Movement", time: "—", note: "No confirmed lateral movement — only TRAFFIC-CTRL-14 shows compromise indicators so far. This step remains open.", evid: null, muted: true },
    { label: "Related Physical Event", time: "21:14:47", note: "A USB device connects to TRAFFIC-CTRL-14 minutes after the endpoint compromise — a second physical signal tied to the same session.", evid: null },
    { label: "Evidence Correlation", time: "—", note: "34 evidence items now resolve into a single chain: badge access, endpoint logon, encoded process, outbound C2 connection, and file access — all under one identity, one device, one 30-minute window.", evid: null },
    { label: "Final Reconstruction", time: "21:44:50", note: "Session terminated. The reconstruction is complete, pending investigator confirmation of attacker attribution.", evid: "EVID-1047" },
  ];
  var reconTimer = null;
  var reconRevealIndex = 0;

  function initReconstruction() {
    var launch = document.getElementById("recon-launch");
    var overlay = document.getElementById("recon-overlay");
    var closeBtn = document.getElementById("recon-close");
    var restartBtn = document.getElementById("recon-restart");
    if (!launch || !overlay) return;

    launch.addEventListener("click", function () {
      overlay.hidden = false;
      resetReconSequence();
      startReconSequence();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeReconOverlay);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeReconOverlay();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !overlay.hidden) closeReconOverlay();
    });
    if (restartBtn) {
      restartBtn.addEventListener("click", function () {
        resetReconSequence();
        startReconSequence();
      });
    }
  }

  function closeReconOverlay() {
    var overlay = document.getElementById("recon-overlay");
    if (overlay) overlay.hidden = true;
    if (reconTimer) {
      window.clearInterval(reconTimer);
      reconTimer = null;
    }
  }

  function resetReconSequence() {
    if (reconTimer) {
      window.clearInterval(reconTimer);
      reconTimer = null;
    }
    reconRevealIndex = 0;
    var list = document.getElementById("recon-stage-list");
    if (list) {
      list.innerHTML = RECON_STAGES.map(function (s) {
        return (
          '<li class="recon-stage"><span class="recon-stage__dot' + (s.muted ? " muted" : "") + '"></span>' +
          '<div class="recon-stage__body">' +
          '<div class="recon-stage__head"><span class="recon-stage__label">' + s.label + "</span>" +
          '<span class="recon-stage__time">' + s.time + "</span></div>" +
          '<p class="recon-stage__note">' + s.note + "</p>" +
          (s.evid ? '<div class="recon-stage__meta"><span class="ev-refs">' + s.evid + "</span></div>" : "") +
          "</div></li>"
        );
      }).join("");
    }
    var restartBtn = document.getElementById("recon-restart");
    var summary = document.getElementById("recon-summary");
    var hint = document.getElementById("recon-modal-hint");
    if (restartBtn) restartBtn.hidden = true;
    if (hint) hint.hidden = false;
    if (summary) {
      summary.hidden = true;
      summary.innerHTML = "";
    }
  }

  function startReconSequence() {
    reconRevealIndex = 0;
    revealNextReconStage();
    reconTimer = window.setInterval(revealNextReconStage, 1400);
  }

  function revealNextReconStage() {
    var items = document.querySelectorAll("#recon-stage-list .recon-stage");
    if (reconRevealIndex >= items.length) {
      window.clearInterval(reconTimer);
      reconTimer = null;
      showReconSummary();
      return;
    }
    var item = items[reconRevealIndex];
    if (item) {
      item.classList.add("revealed");
      if (typeof item.scrollIntoView === "function") {
        try {
          item.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } catch (e) {}
      }
    }
    reconRevealIndex++;
  }

  function showReconSummary() {
    var summary = document.getElementById("recon-summary");
    var restartBtn = document.getElementById("recon-restart");
    var hint = document.getElementById("recon-modal-hint");
    if (hint) hint.hidden = true;
    if (!summary) return;
    summary.innerHTML =
      '<div class="recon-summary-title">Reconstruction Complete</div>' +
      '<div class="recon-summary-title big">INCIDENT RECONSTRUCTED</div>' +
      '<div class="recon-summary-grid">' +
      '<div><div class="recon-stat-label">Evidence Sources</div><div class="recon-stat-value">34 items</div></div>' +
      '<div><div class="recon-stat-label">Systems Affected</div><div class="recon-stat-value">TRAFFIC-CTRL-14, external C2 host</div></div>' +
      '<div><div class="recon-stat-label">Timeline</div><div class="recon-stat-value">20:42:18&ndash;21:44:50</div></div>' +
      '<div><div class="recon-stat-label">Attack Path</div><div class="recon-stat-value">Initial Access &rarr; Execution &rarr; Defense Evasion &rarr; Collection &rarr; Exfiltration</div></div>' +
      '<div><div class="recon-stat-label">Physical Correlations</div><div class="recon-stat-value">Badge access, USB device connection</div></div>' +
      '<div><div class="recon-stat-label">Confidence</div><div class="recon-stat-value">Pending investigator review</div></div>' +
      "</div>" +
      '<div class="recon-summary-questions"><b>Outstanding questions</b><ul>' +
      "<li>Actor attribution remains unconfirmed.</li>" +
      "<li>No confirmed lateral movement beyond TRAFFIC-CTRL-14.</li>" +
      "</ul></div>";
    summary.hidden = false;
    if (restartBtn) restartBtn.hidden = false;
  }

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function prefersReducedMotion() {
    try {
      return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      return false;
    }
  }

  function animateCountUp(el, target, opts) {
    if (!el) return;
    opts = opts || {};
    var suffix = opts.suffix || "";
    if (prefersReducedMotion()) {
      el.textContent = target + suffix;
      return;
    }
    var duration = opts.duration || 1200;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    window.requestAnimationFrame(step);
  }

  function initKpiCountUp() {
    animateCountUp(document.getElementById("kpi-active-cases"), 7, { duration: 900 });
    animateCountUp(document.getElementById("kpi-evidence"), 64, { duration: 1400 });
    animateCountUp(document.getElementById("kpi-alerts"), 7, { duration: 1000 });
    animateCountUp(document.getElementById("kpi-confidence"), 78, { duration: 1300, suffix: "%" });
  }

  var liveFeedTimer = null;
  var liveFeedIndex = 0;
  var replayTimer = null;

  function tickLiveFeed() {
    var data = CASES[currentCase];
    if (!data || !data.liveFeed || !data.liveFeed.length) return;

    var row = data.liveFeed[liveFeedIndex % data.liveFeed.length];
    liveFeedIndex++;

    var streamList = document.getElementById("stream-list");
    if (!streamList) return;

    var now = new Date();
    var time = pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());

    var li = document.createElement("li");
    li.className = "stream-new";
    li.innerHTML =
      '<span class="stream-time">' + time + "</span>" +
      '<span class="stream-tag ' + row[0] + '">' + row[1] + "</span>" +
      '<span class="stream-desc">' + row[2] + "</span>";
    streamList.insertBefore(li, streamList.firstChild);

    while (streamList.children.length > 9) {
      streamList.removeChild(streamList.lastChild);
    }
  }

  function startLiveFeed() {
    if (liveFeedTimer) return;
    liveFeedTimer = window.setInterval(tickLiveFeed, 8000);
    var dot = document.getElementById("live-dot");
    if (dot) dot.classList.remove("paused");
    var btn = document.getElementById("live-pause-btn");
    if (btn) {
      btn.innerHTML = '<svg><use href="#i-pause"/></svg>';
      btn.title = "Pause live feed";
    }
  }

  function pauseLiveFeed() {
    if (liveFeedTimer) {
      window.clearInterval(liveFeedTimer);
      liveFeedTimer = null;
    }
    var dot = document.getElementById("live-dot");
    if (dot) dot.classList.add("paused");
    var btn = document.getElementById("live-pause-btn");
    if (btn) {
      btn.innerHTML = '<svg><use href="#i-play"/></svg>';
      btn.title = "Resume live feed";
    }
  }

  function initLiveControls() {
    var pauseBtn = document.getElementById("live-pause-btn");
    if (pauseBtn) {
      pauseBtn.addEventListener("click", function () {
        if (liveFeedTimer) pauseLiveFeed();
        else startLiveFeed();
      });
    }
    var replayBtn = document.getElementById("live-replay-btn");
    if (replayBtn) {
      replayBtn.addEventListener("click", function () {
        replayIncident();
      });
    }
  }

  function replayIncident() {
    var data = CASES[currentCase];
    if (!data || !data.stream) return;
    pauseLiveFeed();
    if (replayTimer) window.clearInterval(replayTimer);

    var streamList = document.getElementById("stream-list");
    if (!streamList) return;
    streamList.innerHTML = "";

    var i = 0;
    replayTimer = window.setInterval(function () {
      if (i >= data.stream.length) {
        window.clearInterval(replayTimer);
        replayTimer = null;
        return;
      }
      var row = data.stream[i];
      var li = document.createElement("li");
      li.className = "stream-new";
      li.innerHTML =
        '<span class="stream-time">' + row[0] + "</span>" +
        '<span class="stream-tag ' + row[1] + '">' + row[2] + "</span>" +
        '<span class="stream-desc">' + row[3] + "</span>";
      streamList.appendChild(li);
      i++;
    }, 550);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var savedCase = null;
    try {
      savedCase = window.localStorage.getItem("sv_dashboard_case");
    } catch (e) {}

    initSidebarViews();
    initCaseCards();
    initCaseStatus();
    initTwinNodes();
    initTwinRooms();
    initTimelineZoom();
    initTimelineFilter();
    initAI();
    initSearch();
    initAutomation();
    initReports();
    initSettingsToggles();
    initLiveControls();
    initReconstruction();
    initKpiCountUp();
    initCaseAutoRotate();
    startLiveFeed();

    // Safety net: a stuck tooltip (e.g. a missed mouseleave on some
    // trackpads/browsers) should never be able to sit on top of the page
    // and block clicks underneath it.
    document.addEventListener("click", hideStageTooltip, true);
    document.addEventListener("scroll", hideStageTooltip, true);

    selectCase(savedCase && CASES[savedCase] ? savedCase : currentCase);
  });
})();
