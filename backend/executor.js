const { exec } = require("child_process");
const path = require("path");

function sanitizeError(err) {
  if (!err) return "";
  return err
    .replace(/[A-Z]:\\[^:\n]+/gi, "")
    .replace(/\/app\/[^\s:]+/g, "")
    .trim();
}

function runCode(language, filePath) {
  return new Promise((resolve) => {
    const dir = path.dirname(filePath);
    const file = path.basename(filePath);

    let cmd = "";

    switch (language) {
      case "c":
        cmd = `gcc ${file} -o main && ./main`;
        break;
      case "cpp":
        cmd = `g++ ${file} -o main && ./main`;
        break;
      case "python":
        cmd = `python3 ${file}`;
        break;
      case "java":
        cmd = `javac ${file} && java Main`;
        break;
      default:
        return resolve({ output: "", error: "Unsupported language" });
    }

    exec(cmd, { cwd: dir, timeout: 5000 }, (err, stdout, stderr) => {
      if (err) {
        resolve({ output: "", error: sanitizeError(stderr) });
      } else {
        resolve({ output: stdout, error: "" });
      }
    });
  });
}

module.exports = runCode;
