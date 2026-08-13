/**
 * Silent Visionary — Dashboard interactivity
 * All data below is synthetic, for demonstration only.
 */

(function () {
  "use strict";

  var API_BASE = location.protocol + "//" + location.hostname + ":3000";
  var CASES = {};

  function loadCases() {
    return fetch(API_BASE + "/api/cases", { credentials: "include" })
      .then(function (res) {
        if (res.status === 401) {
          window.location.href = "login.html";
          return null;
        }
        if (!res.ok) throw new Error("Failed to load case data (" + res.status + ")");
        return res.json();
      })
      .then(function (data) {
        if (!data) return false;
        CASES = data;
        return true;
      })
      .catch(function (err) {
        console.error(err);
        var pill = document.getElementById("case-pill-title");
        if (pill) pill.textContent = "Unable to load case data";
        return false;
      });
  }


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
  var currentCase = "SV-014";
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
    { label: "Initial Report", time: "21:02:11", note: "Dispatch receives a 911 call reporting an armed robbery in progress at a retail location on 5th & Main.", evid: "EVID-2201" },
    { label: "CCTV Capture", time: "21:14:40", note: "Store CCTV shows the suspect entering and brandishing a weapon, twelve minutes after the call.", evid: "EVID-2202" },
    { label: "ALPR Hit", time: "21:16:02", note: "A license-plate reader at 5th & Main captures the suspect vehicle as it leaves the scene.", evid: "EVID-2203" },
    { label: "Cell Tower Correlation", time: "21:17:55", note: "A cell tower ping places a phone in the same sector at the same time as the suspect vehicle's departure.", evid: "EVID-2204" },
    { label: "Street Camera Tracking", time: "21:18:40", note: "A street camera tracks the vehicle heading north toward I-40.", evid: "EVID-2205" },
    { label: "Witness Interview", time: "21:22:10", note: "A witness statement from the store clerk corroborates the sequence and vehicle description.", evid: "EVID-2206" },
    { label: "Vehicle Cross-Reference", time: "—", note: "The suspect vehicle's plate doesn't match any vehicle registered to store employees or recent customers. Flagged for regional ALPR cross-reference — this step remains open.", evid: null, muted: true },
    { label: "Evidence Correlation", time: "—", note: "21 evidence items now resolve into a single chain: the 911 call, store CCTV, an ALPR capture, a cell tower ping, street camera tracking, and a witness statement — all within a 20-minute window.", evid: null },
    { label: "Final Reconstruction", time: "21:22:10", note: "Reconstruction complete. Suspect vehicle description and last known heading are with patrol units — the investigation remains open pending vehicle location.", evid: "EVID-2206" },
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
      '<div><div class="recon-stat-label">Evidence Sources</div><div class="recon-stat-value">21 items</div></div>' +
      '<div><div class="recon-stat-label">Suspect Vehicle</div><div class="recon-stat-value">Partial plate match, unregistered</div></div>' +
      '<div><div class="recon-stat-label">Timeline</div><div class="recon-stat-value">21:02:11&ndash;21:22:10</div></div>' +
      '<div><div class="recon-stat-label">Investigation Path</div><div class="recon-stat-value">911 Call &rarr; CCTV &rarr; ALPR &rarr; Cell Correlation &rarr; Witness Interview</div></div>' +
      '<div><div class="recon-stat-label">Physical Correlations</div><div class="recon-stat-value">ALPR capture, street camera tracking</div></div>' +
      '<div><div class="recon-stat-label">Confidence</div><div class="recon-stat-value">Pending investigator review</div></div>' +
      "</div>" +
      '<div class="recon-summary-questions"><b>Outstanding questions</b><ul>' +
      "<li>Suspect identity remains unconfirmed.</li>" +
      "<li>Vehicle registration cross-reference pending.</li>" +
      "</ul></div>";
    summary.hidden = false;
    if (restartBtn) restartBtn.hidden = false;
    if (typeof summary.scrollIntoView === "function") {
      try {
        summary.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (e) {}
    }
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

  function initLogout() {
    var btn = document.getElementById("logout-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      fetch(API_BASE + "/api/auth/logout", { method: "POST", credentials: "include" }).finally(
        function () {
          window.location.href = "login.html";
        }
      );
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    loadCases().then(function (ok) {
      if (!ok) return;

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
      initLogout();
      startLiveFeed();

      // Safety net: a stuck tooltip (e.g. a missed mouseleave on some
      // trackpads/browsers) should never be able to sit on top of the page
      // and block clicks underneath it.
      document.addEventListener("click", hideStageTooltip, true);
      document.addEventListener("scroll", hideStageTooltip, true);

      selectCase(savedCase && CASES[savedCase] ? savedCase : currentCase);
    });
  });
})();
