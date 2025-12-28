// Boilerplate code for each language
const boilerplate = {
  python: `print("Hello, Python!")`,

  c: `#include <stdio.h>

int main() {
    printf("Hello, C!\\n");
    return 0;
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`,

  java: `class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`
};

// DOM elements
const languageSelect = document.getElementById("language");
const codeBox = document.getElementById("code");
const outputBox = document.getElementById("output");

// Load default boilerplate on page load
window.addEventListener("load", () => {
  codeBox.value = boilerplate[languageSelect.value];
  outputBox.textContent = "";
});

// Change boilerplate when language changes
languageSelect.addEventListener("change", () => {
  codeBox.value = boilerplate[languageSelect.value];
  outputBox.textContent = "";
});

// Run code
async function runCode() {
  const code = codeBox.value;
  const language = languageSelect.value;

  // Do NOT clear output immediately (prevents flashing)
  outputBox.textContent = "Running...";

  try {
    const response = await fetch("/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ language, code })
    });

    const result = await response.json();

    // Persist output
    if (result.output) {
      outputBox.textContent = result.output;
    } else if (result.error) {
      outputBox.textContent = result.error;
    } else {
      outputBox.textContent = "No output";
    }

  } catch (err) {
    outputBox.textContent = "Failed to connect to server";
  }
}
