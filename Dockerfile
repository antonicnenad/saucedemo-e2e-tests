# Use the official Playwright image as the base image
FROM mcr.microsoft.com/playwright:focal

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Playwright dependencies
RUN npx playwright install-deps

# Install Playwright browsers
RUN npx playwright install

# Command to run tests
CMD ["npm", "test"]
