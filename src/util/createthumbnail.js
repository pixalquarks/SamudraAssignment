import fs from "fs";
import fetch from "node-fetch";
import sharp from "sharp";

const thumbnailFilePath = "./thumbnail.jpeg";

export default async function createThumbnail(url, width, height) {
  const pipeline = sharp();
  pipeline.resize(width, height).pipe(fs.createWriteStream(thumbnailFilePath));
  await fetch(url).then((res) => res.body.pipe(pipeline));
  console.log("done");
}
