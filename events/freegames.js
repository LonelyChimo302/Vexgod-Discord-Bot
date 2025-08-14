const https = require("https");
const fs = require("fs");
const cron = require("node-cron");
const client = require("../index.js")
const channel = "1261020564730941580"

const { API_KEY } = require("../config.json");
const BASE_URL = "https://api.isthereanydeal.com/deals/v2";
const LIMIT = 100;
const SAVE_FILE = "freebies.json";
const DISCORD_CHAR_LIMIT = 2000;

const ALLOWED_SHOP_IDS = [
  61,  // Steam
  16,  // Epic Games Store
  65,  // Humble Store
  12   // GOG
];

function formatDate(timestamp) {
  if (!timestamp) return null;
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("de-DE", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}

function fetchPage(offset) {
  const shopsParam = ALLOWED_SHOP_IDS.join(",");
  const url = `${BASE_URL}?key=${API_KEY}&limit=${LIMIT}&offset=${offset}&sort=-cut&shops=${shopsParam}&cut_min=100`;
  return new Promise(resolve => {
    https.get(url, res => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          const list = json.list || json.data?.list || [];
          resolve(list);
        } catch (err) {
          console.error("Fehler beim Parsen:", err);
          resolve([]);
        }
      });
    }).on("error", err => {
      console.error("HTTP-Fehler:", err);
      resolve([]);
    });
  });
}

async function fetchAllDeals() {
  let offset = 0, page = 1, allDeals = [];
  while (true) {
    const deals = await fetchPage(offset);
    if (deals.length === 0) break;
    allDeals = allDeals.concat(deals);
    offset += LIMIT; page++;
    await new Promise(r => setTimeout(r, 500));
  }
  return allDeals;
}

function loadOldDeals() {
  if (!fs.existsSync(SAVE_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(SAVE_FILE, "utf8")); }
  catch { return []; }
}

function saveDeals(deals) {
  fs.writeFileSync(SAVE_FILE, JSON.stringify(deals, null, 2), "utf8");
}

function chunkMessage(lines) {
  const chunks = [];
  let current = "";
  lines.forEach(line => {
    if ((current.length + line.length + 1) > DISCORD_CHAR_LIMIT) {
      chunks.push(current);
      current = line;
    } else {
      current += (current ? "\n" : "") + line;
    }
  });
  if (current) chunks.push(current);
  return chunks;
}

async function checkDeals() {
  const allDeals = await fetchAllDeals();

  const todayDeals = allDeals.filter(g => g.deal.cut >= 100);

  const todayTitles = todayDeals.map(g => g.title);
  const oldTitles = loadOldDeals();
  const newDeals = todayDeals.filter(g => !oldTitles.includes(g.title));

  if (newDeals.length > 0) {
    const messageLines = newDeals.map(g => {
      const shop = g.deal.shop?.name || "Unbekannter Shop";
      const endDate = g.deal.expiry ? formatDate(Math.floor(new Date(g.deal.expiry).getTime() / 1000)) : null;
      const link = g.urls?.buy || g.deal.url || "";
      return `## - [${shop}] [**${g.title}**](${link})${endDate ? `\n→ **endet am ${endDate}**\n` : ""}`;
    });

    const chunks = chunkMessage(messageLines);
    chunks.forEach((chunk, idx) => {
      client.channels.cache.get(channel).send(`\n# 📢 Neue Free2Keep-Titel:\n${chunk}\n`);
    });
  } else {
    client.channels.cache.get(channel).send("   Keine neuen kostenlosen Angebote gefunden.");
  }

  saveDeals(todayTitles);
}

cron.schedule("* 16 * * *", () => {
  checkDeals();
});

checkDeals();
