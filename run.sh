#!/bin/bash

# Check if an option is provided
if [ "$1" == "-i" ]; then
  # Install dependencies and start the development server
  npm i
  docker compose up dev-db -d
  prisma migrate deploy
  npm run start:dev
elif [ "$1" == "-r" ]; then
  # Stop instances at port 3000, remove and recreate the database, deploy Prisma, and start the development server
  docker compose rm dev-db -s -f -v
  docker compose up dev-db -d
  prisma migrate deploy
  npm run start:dev
else
  # If no option is provided, print a usage message
  echo "Usage: $0 [-i | -r]"
  echo "  -i: Install dependencies and start the development server"
  echo "  -r: Stop instances at port 3000, recreate the database, deploy Prisma, and start the development server"
fi
