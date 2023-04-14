import fs from "fs";
import * as aq from "arquero";
const { op } = aq;

// load watch history
const pathToJson = "src/data/full-watch-history.json";
const table = await aq.loadJSON(pathToJson, { autoType: true });

// load list of subscribed channels
const pathToCSV = "src/data/subscriptions.csv";
const subsCSV = fs.readFileSync(pathToCSV, "utf8");
const subs = aq
  .fromCSV(subsCSV)
  .objects()
  .filter((d) => d["Channel Id"]) // filter any null values
  .map((d) => d["Channel Id"]);

// transform watch history data
let data = table
  .derive({
    time: (d) => op.format_date(d.time, true),
  })
  .filter((d) => d.time >= op.format_date("2023-02-03", true))
  .derive({
    title: (d) => op.replace(d.title, "Watched ", ""),
    channelName: (d) => d.subtitles[0].name,
    channelId: (d) =>
      op.replace(d.subtitles[0].url, "https://www.youtube.com/channel/", ""),
    timestamp: (d) => op.slice(d.time, 11, -4),
    date: (d) => op.slice(d.time, 0, 10),
  })
  .derive({ isSubscribed: aq.escape((d) => subs.includes(d.channelId)) })
  .select(
    "title",
    "titleUrl",
    "date",
    "timestamp",
    "channelName",
    "channelId",
    "isSubscribed"
  )
  .toCSV();

fs.writeFileSync("src/data/selected-data.csv", data, "utf8");
