# 🧠 Online Multi-Language Compiler

An online compiler that supports C, C++, Python, and Java, built using Node.js, Docker, and vanilla HTML/CSS/JavaScript. The system executes user code with security measures including timeout limits and sanitized error messages.

## ✨ Features

- ✅ **Multi-language Support**: C, C++, Python, and Java
- ⏱ **Execution Time Limits**: 5-second timeout per execution
- 🧹 **Automatic Cleanup**: Temporary files deleted after 2 minutes
- 🖥 **Integrated Frontend**: Served directly from backend
- ❌ **Sanitized Errors**: No file paths leaked in error messages
- 🐳 **Dockerized Deployment**: Ready for containerized deployment

## 🛠 Tech Stack

### Backend
- **Node.js** (Express.js)
- **child_process.exec** for code execution
- **UUID** for unique file naming

### Frontend
- **HTML5**
- **CSS3** (Dark theme)
- **Vanilla JavaScript**

### Infrastructure
- **Docker** for containerized deployment
- **Render** (Docker Web Service) compatible

## 📂 Project Structure

```
Compiler/
│
├── backend/
│   ├── server.js          # Express server
│   ├── execute.js         # API route handler
│   ├── executor.js        # Code execution logic
│   ├── package.json       # Dependencies
│   ├── public/            # Frontend files
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   └── temp/              # Temporary code files (gitignored)
│
├── Dockerfile             # Main Dockerfile for deployment
├── .gitignore
└── README.md
```

## 🧪 Supported Languages

| Language | Compiler / Runtime |
|----------|-------------------|
| C        | gcc               |
| C++      | g++               |
| Python   | python3           |
| Java     | javac + java       |

## 🚀 How It Works

1. User writes code in the browser
2. Frontend sends code and language selection to `/execute` API endpoint
3. Backend generates a unique UUID and saves code to a temporary file
4. Code is executed using the appropriate compiler/runtime
5. Output or error is captured and sanitized
6. Temporary files are automatically deleted after 2 minutes
7. Sanitized output is returned to the frontend

## 🔐 Security Measures

- **Timeout Protection**: 5-second execution timeout
- **Error Sanitization**: File paths removed from error messages
- **Automatic Cleanup**: Temporary files deleted after 2 minutes
- **Input Validation**: Language and code validation on API endpoint
- **Isolated Execution**: Code runs in separate process with timeout

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker (optional, for containerized deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Compiler
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Start the server**
   ```bash
   node server.js
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t compiler-app .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 compiler-app
   ```

3. **Access the application**
   ```
   http://localhost:3000
   ```

## 📡 API Endpoints

### POST `/execute`

Execute code in the specified language.

**Request Body:**
```json
{
  "language": "python",
  "code": "print('Hello, World!')"
}
```

**Response:**
```json
{
  "output": "Hello, World!\n",
  "error": ""
}
```

**Supported Languages:**
- `c` - C
- `cpp` - C++
- `python` - Python
- `java` - Java

**Error Response:**
```json
{
  "error": "Language and code required"
}
```

## 🧑‍💻 Usage

1. Select a programming language from the dropdown
2. Write or paste your code in the editor
3. Click the "Run" button
4. View the output or error messages in the output area

### Example Code

**Python:**
```python
print("Hello, Python!")
```

**C:**
```c
#include <stdio.h>

int main() {
    printf("Hello, C!\n");
    return 0;
}
```

**C++:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}
```

**Java:**
```java
class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

## 🔧 Configuration

### Timeout Settings

The execution timeout is set to 5 seconds by default. To modify this, edit `backend/executor.js`:

```javascript
exec(cmd, { cwd: dir, timeout: 5000 }, ...) // Change 5000 to desired milliseconds
```

### Temporary File Cleanup

Temporary files are automatically deleted after 2 minutes. To modify this, edit `backend/execute.js`:

```javascript
setTimeout(() => {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}, 120000); // Change 120000 to desired milliseconds
```

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue in the repository.
