# Codeing Hive Server

## Setup:

1. clone the repo
``` bash
git clone https://github.com/CodeingHive/CodeingHive-Server-main.git
cd CodeingHive-Server-main
```


2. setup repository

> using bash script

```bash
bash run.sh -i
```

> using terminal commands

``` bash
npm i
cp .env.example .env
docker compose up dev-db -d
npx prisma migrate dev --name init
npx prisma migrate deploy
```


3. start the server

> using bash script

```bash
bash run.sh -d

# to start db visual preview
bash run.sh -db
```

> using terminal commands

``` bash
# visit http://localhost:3000 to visualize api's and schema
npm run start:dev

# to start db visual preview
npx prisma studio
```

4. Restart db:

> using bash script

```bash
bash run.sh -r
```

> using terminal commands

``` bash
  docker compose rm dev-db -s -f -v
  docker compose up dev-db -d
  npx prisma migrate dev --name init
  npx prisma migrate deploy
```


## Contributing

All Contributions are appreciated.

## TODO

### MILESTONE-1:


[x] Auth
    - [x] make POST /auth/signup     to   signup
    - [x] make POST /auth/signin     to   signin

[ ] User
    - [ ] make GET /user/:id         to   get user with id: id
    - [ ] make GET /user             to   get all users
    - [ ] make PUT /user/:id         to   update user with id: id
    - [ ] make GET /user?q=          sort query users

[ ] Problem
    - [ ] make GET /problem/:id      to   get problem with id: id
    - [ ] make GET /problem          to   get all problems
    - [ ] make GET /problem?q=       so  rt query problems

[ ] Submission
    - [ ] make GET /submission/:id   to   get submission with id: id
    - [ ] make GET /submission       to   get all submissions
    - [ ] make POST /submission      to   submit a solution
    - [ ] make GET /submission?q=    sort query submissions

[ ] Update schema.prisma



### MILESTONE-2:

[ ] Contest
    - [ ] make GET /contest/:id      to   get contest with id: id
    - [ ] make GET /contest          to   get all contests
    - [ ] make POST /contest         to   create a contest
    - [ ] make PUT /contest/:id      to   update contest with id: id
    - [ ] make GET /contest?q=       sort query contests

[ ] Contest Problem
    - [ ] make GET /contest/:id/problem/:id   to   get contest problem with id: id
    - [ ] make GET /contest/:id/problem       to   get all contest problems
    - [ ] make POST /contest/:id/problem      to   create a contest problem
    - [ ] make PUT /contest/:id/problem/:id   to   update contest problem with id: id
    - [ ] make GET /contest/:id/problem?q=    sort query contest problems
