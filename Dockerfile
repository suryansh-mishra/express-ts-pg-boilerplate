# Step 1: Set up Postgres 17 container
FROM postgres:17 as postgres

# Set environment variables for Postgres
ENV POSTGRES_PASSWORD=mysecretpassword
ENV POSTGRES_USER=myuser
ENV POSTGRES_DB=mydb

# Expose the Postgres port
EXPOSE 5432

# Step 2: Set up Redis container
FROM redis:latest as redis

# Expose Redis port
EXPOSE 6379

# Step 3: Set up Node.js 22 container
FROM node:22 as myapp

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port for the Node.js server (assuming 3000 here)
EXPOSE 3000

# Run the Node.js server
CMD ["tsx"]
