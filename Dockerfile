FROM node:20-bullseye

# Install compilers & runtimes
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    python3 \
    openjdk-17-jdk \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend ./backend

# Install backend dependencies
WORKDIR /app/backend
RUN npm install --omit=dev

# Expose app port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
