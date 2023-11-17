# Codeing Hive Server

Welcome to the Codeing Hive Server repository! This server powers a dynamic platform for coding challenges, contests, and user submissions. Below, you'll find a comprehensive guide to set up the server, contribute to the project, and an overview of the current to-do list.

Feel free to explore, contribute, and make this platform even better! If you have any questions or suggestions, don't hesitate to reach out.

## Table of Contents

- [Setup](#)
- [Start the Server](#)
- [Restart Database](#)
- [Contributing](#)
- [TODO List](#)
  - [Milestone 1](#)
  - [Milestone 2](#)

## Setup

1. **Clone the Repo:**
    ```bash
    git clone https://github.com/CodeingHive/CodeingHive-Server-main.git
    cd CodeingHive-Server-main
    ```

2. **Setup Repository:**
    - Using bash script:
        ```bash
        bash run.sh -i
        ```

    - Using terminal commands:
        ```bash
        npm i
        cp .env.example .env
        docker compose up dev-db -d
        npx prisma migrate dev --name init
        npx prisma migrate deploy
        ```

3. **Start the Server:**
    - Using bash script:
        ```bash
        bash run.sh -d
        # To start db visual preview
        bash run.sh -db
        ```

    - Using terminal commands:
        ```bash
        # Visit http://localhost:3000 to visualize APIs and schema
        npm run start:dev
        # To start db visual preview
        npx prisma studio
        ```

4. **Restart Database:**
    - Using bash script:
        ```bash
        bash run.sh -r
        ```

    - Using terminal commands:
        ```bash
        docker compose rm dev-db -s -f -v
        docker compose up dev-db -d
        npx prisma migrate dev --name init
        npx prisma migrate deploy
        ```

## Contributing

All contributions are appreciated. Whether you're fixing a bug, adding a new feature, or improving documentation, your efforts make a difference. Please refer to the [Contribution Guidelines](CONTRIBUTING.md) for more details.

## TODO List

### MILESTONE-1:

- [x] **Auth**
    - [x] `POST /auth/signup` - Signup
    - [x] `POST /auth/signin` - Signin

- [ ] **User**
    - [ ] `GET /user/:id` - Get user with ID: id
    - [ ] `GET /user` - Get all users
    - [ ] `PUT /user/:id` - Update user with ID: id
    - [ ] `GET /user?q=` - Sort query users

- [ ] **Problem**
    - [ ] `GET /problem/:id` - Get problem with ID: id
    - [ ] `GET /problem` - Get all problems
    - [ ] `GET /problem?q=` - Sort query problems

- [ ] **Submission**
    - [ ] `GET /submission/:id` - Get submission with ID: id
    - [ ] `GET /submission` - Get all submissions
    - [ ] `POST /submission` - Submit a solution
    - [ ] `GET /submission?q=` - Sort query submissions

### MILESTONE-2:

- [ ] **Contest**
    - [ ] `GET /contest/:id` - Get contest with ID: id
    - [ ] `GET /contest` - Get all contests
    - [ ] `POST /contest` - Create a contest
    - [ ] `PUT /contest/:id` - Update contest with ID: id
    - [ ] `GET /contest?q=` - Sort query contests

- [ ] **Contest Problem**
    - [ ] `GET /contest/:id/problem/:id` - Get contest problem with ID: id
    - [ ] `GET /contest/:id/problem` - Get all contest problems
    - [ ] `POST /contest/:id/problem` - Create a contest problem
    - [ ] `PUT /contest/:id/problem/:id` - Update contest problem with ID: id
    - [ ] `GET /contest/:id/problem?q=` - Sort query contest problems

- [ ] Update `schema.prisma`

Happy coding!
