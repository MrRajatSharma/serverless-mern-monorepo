# 1. Serverless ~~mern~~ monorepo

STILL UNDER DEVELOPMENT

## 1.1. Stack Used
- React
- Node
- Dynamodb
- Serverless
- GraphQL
- Apollo Federation
  
## 1.2. Requirements
- Serverless
- dynamodb-local
- Nodejs
- NPM

## 1.3. Setup

```terminal
$ git clone https://github.com/amazingandyyy/mern.git
$ yarn
$ lerna bootstrap
$ cd ./packages/tweetsService && npm run dynamodb-start && npm run dynamodb-seed
$ cd ./packages/tweetsService && npm run start
$ cd ./packages/apolloFederationGW && npm run start
$ cd ./packages/frontend && npm start
```
Open `http://localhost:4000` and access tweets service throught federation GW


## 1.4. Screenshot
![Screenshot](https://raw.githubusercontent.com/MrRajatSharma/serverless-mern-monorepo/master/packages/frontend/screenshot/Screenshot%20from%202020-08-30%2001-11-11.png)
