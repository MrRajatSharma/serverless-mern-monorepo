# 1. Serverless mern monorepo

STILL UNDER DEVELOPMENT

## 1.1. Requirements
- Serverless
- dynamodb-local
- Nodejs
- NPM

## 1.2. setup

1. `yarn`
2. `lerna bootstrap`
3. Start dynamodb and seed `cd ./packages/tweetsService && npm run dynamodb-start && npm run dynamodb-seed`
4. `cd ./packages/tweetsService && npm run start`
5. `cd ./packages/apolloFederationGW && npm run start`
6. `cd ./packages/frontend && npm start`
7. Open `http://localhost:4000` and access tweets service throught federation GW


## 1.3. 1.2 Screenshot
![Screenshot](https://raw.githubusercontent.com/MrRajatSharma/serverless-mern-monorepo/master/packages/frontend/screenshot/Screenshot%20from%202020-08-30%2001-11-11.png)
