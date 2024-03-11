"use strict";
const fs = require("fs");
const readline = require("readline");

let ansString;
if (process.argv.length >= 3) {
  // c,l,w,m are the ones that we focus on
  // c - outputs number of bytes in file
  // l - number of lines in file
  // w - number of words in file
  // m-  number of characters in file
  if (
    ["-c", "-l", "-w", "-m"].includes(process.argv[process.argv.length - 1])
  ) {
    console.log(
      "Unknown option entered. Please enter in format of -options and then file name."
    );
  }
  const filePath = process.argv[process.argv.length - 1];
  const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
  let wordCount = 0;
  let charCount = 0;
  let lineCount = 0;
  let byteCount = 0;
  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    lineCount++;
    wordCount += line.split(" ").length;
    charCount += line.length;
    console.log(line, lineCount, wordCount)
  });
  rl.on("error", () => {
    console.error("Something went wrong");
  });
  byteCount = Math.floor(charCount / 8 + (charCount % 8));
  if (process.argv.length === 3) {
    console.log( lineCount, wordCount)

    ansString = `${lineCount} ${wordCount} ${charCount} ${byteCount} ${
      process.argv[process.argv.length - 1]
    }`;
  } else {
    for (let i = 2; i < process.argv.length - 1; i++) {
      let curr = process.argv[i];
      if (curr === "-w") {
        ansString += wordCount;
      } else if (curr === "-c") {
        ansString += byteCount;
      } else if (curr === "-m") {
        ansString += charCount;
      } else if (curr === "-l") {
        ansString += lineCount;
      }
    }
    ansString += ` ${process.argv[process.argv.length - 1]}`;
  }
  console.log(ansString);
} else {
  console.log("gib file pls");
}
