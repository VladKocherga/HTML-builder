const fs = require("fs");
const readLine = require("readline");
const process = require("process");

let streamTwo = new fs.createWriteStream("02-write-file/message.txt", {
  encoding: "utf-8",
});
let inter = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Hello, please enter some text: \n",
});
inter.prompt();

inter.on("line", (input) => {
  input.trim() == "exit" ? inter.close() : streamTwo.write(input + "\n");
});
inter.on("SIGINT", () => {
  inter.close();
});
inter.on("close", () => {
  console.log("the end");
  streamTwo.end();
});
