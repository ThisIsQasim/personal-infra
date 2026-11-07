const STATE = { DOWNLOAD: 1, PING: 2, UPLOAD: 3 };

const test = new Speedtest();
test.setParameter("getIp_ispInfo", false);
test.setParameter("xhr_ignoreErrors", 0);

const toggle = document.getElementById("toggle");
const status = document.getElementById("status");
const ping = document.getElementById("ping");
const jitter = document.getElementById("jitter");

function reading(id) {
  const root = document.getElementById(id);
  return {
    root,
    number: root.querySelector(".number"),
    unit: root.querySelector(".unit"),
    line: root.querySelector("polyline"),
    area: root.querySelector("polygon"),
    samples: [],
  };
}

const download = reading("download");
const upload = reading("upload");

function formatSpeed(mbps) {
  if (mbps >= 1000) return [(mbps / 1000).toFixed(2), "Gbps"];
  return [mbps.toFixed(mbps < 100 ? 1 : 0), "Mbps"];
}

function formatMs(value) {
  const ms = parseFloat(value);
  return Number.isNaN(ms) ? "-" : `${ms.toFixed(1)} ms`;
}

function drawTrace(target) {
  const peak = Math.max(...target.samples.map((s) => s.mbps), 1);
  const points = target.samples.map((s) => `${s.x * 100},${40 - (s.mbps / peak) * 38}`);
  target.line.setAttribute("points", points.join(" "));
  const last = target.samples[target.samples.length - 1].x * 100;
  target.area.setAttribute("points", `0,40 ${points.join(" ")} ${last},40`);
}

function updateReading(target, value, progress, active) {
  target.root.classList.toggle("active", active);
  if (value === "Fail") {
    target.number.textContent = "-";
    target.unit.textContent = "";
    return;
  }
  const mbps = parseFloat(value);
  if (Number.isNaN(mbps)) return;
  const [number, unit] = formatSpeed(mbps);
  target.root.classList.remove("idle");
  target.number.textContent = number;
  target.unit.textContent = unit;
  const closing = progress === 1 && target.samples.at(-1)?.x < 1;
  if (active || closing) {
    target.samples.push({ x: target.samples.length ? progress : 0, mbps });
    drawTrace(target);
  }
}

function resetReading(target) {
  target.samples = [];
  target.line.removeAttribute("points");
  target.area.removeAttribute("points");
  target.number.textContent = "0";
  target.unit.textContent = "Mbps";
  target.root.classList.add("idle");
  target.root.classList.remove("active");
}

function reset() {
  resetReading(download);
  resetReading(upload);
  ping.textContent = "-";
  jitter.textContent = "-";
  status.textContent = "";
  status.classList.remove("error");
}

test.onupdate = (data) => {
  updateReading(download, data.dlStatus, data.dlProgress, data.testState === STATE.DOWNLOAD);
  updateReading(upload, data.ulStatus, data.ulProgress, data.testState === STATE.UPLOAD);
  ping.textContent = formatMs(data.pingStatus);
  jitter.textContent = formatMs(data.jitterStatus);
  if ([data.dlStatus, data.ulStatus, data.pingStatus].includes("Fail")) {
    status.textContent = "The test could not reach the server.";
    status.classList.add("error");
  }
};

test.onend = (aborted) => {
  toggle.classList.remove("running");
  toggle.textContent = aborted ? "Start" : "Run again";
  download.root.classList.remove("active");
  upload.root.classList.remove("active");
  if (aborted) reset();
};

toggle.addEventListener("click", () => {
  if (test.getState() === 3) {
    test.abort();
    return;
  }
  reset();
  toggle.classList.add("running");
  toggle.textContent = "Stop";
  test.start();
});

function describeNetwork(processedString, org) {
  if (!org) return processedString.includes(" - ") ? "Private network" : "";
  const [, asn, isp] = org.match(/^(AS\d+)\s+(.*)$/) ?? [];
  const provider = asn ? `${isp} (${asn})` : org;
  const distance = processedString.match(/\(([^)]+)\)$/)?.[1];
  if (!distance) return provider;
  const rounded = distance.replace(/\d+/, (km) => Number(km).toLocaleString("en-US"));
  return `${provider}, ${rounded} away`;
}

async function loadConnection() {
  const response = await fetch("backend/getIP?isp=true&distance=km");
  const { processedString, rawIspInfo } = await response.json();
  document.getElementById("ip").textContent = processedString.split(" - ")[0];
  document.getElementById("network").textContent = describeNetwork(processedString, rawIspInfo.org);
  document.getElementById("connection").hidden = false;
}

reset();
loadConnection().catch((error) => console.error("Connection details unavailable:", error));
