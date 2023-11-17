#!/bin/bash

OS=$(uname -s)

GREEN='\033[0;32m'
NC='\033[0m'

if [ "$1" == "-i" ]; then
  npm i
  docker compose up dev-db -d
  npx prisma migrate dev --name init
  npx prisma migrate deploy
  cp .env.example .env

  echo -e "${GREEN}Success....${NC}"
  echo -e "${GREEN}Prisma deployed${NC}"
  echo ""
  echo ""
  echo "To Start development server, run bash run.sh -d "
  echo "To recreate the database, deploy Prisma, and start the development server, run bash run.sh -r"
  echo "To start db UI viewer, run bash run.sh -db"
elif [ "$1" == "-d" ]; then

  if [ "$OS" == "Linux" ]; then

    xdg-open http://localhost:3000/api
    npm run start:dev

  elif [ "$OS" == "Darwin" ]; then
    open http://localhost:3000/api
    npm run start:dev

  else
    echo -e "${GREEN}Unsupported operating system${NC}"
    exit 1

  fi

elif [ "$1" == "-db" ]; then
  if [ "$OS" == "Linux" ] || [ "$OS" == "Darwin" ]; then
    npx prisma studio
  else
    echo -e "${GREEN}Unsupported operating system${NC}"
    exit 1
  fi

elif [ "$1" == "-r" ]; then
  docker compose rm dev-db -s -f -v
  docker compose up dev-db -d
  npx prisma migrate dev --name init
  npx prisma migrate deploy

else
  echo "Usage: $0 [-i | -d | -r]"
  echo "  -i: Install dependencies and start the development server"
  echo "  -d: Start the development server"
  echo "  -db: Start db UI viewer"
  echo "  -r: Recreate the database, deploy Prisma, and start the development server"
fi
