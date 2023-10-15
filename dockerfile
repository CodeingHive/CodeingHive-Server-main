# Use the Node.js 18 base image
FROM node:18

# Create a working directory
RUN mkdir /app

# Copy the rest of your application code to the working directory
COPY . ./app

# # Install dependencies
# RUN npm install

# Specify the command to run when the container starts
CMD [ "node", "./app/src/index.ts" ]
