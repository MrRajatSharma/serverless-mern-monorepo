# 1. Serverless ~~mern~~ monorepo

<p style="
    padding: 1rem;
    border-bottom: 1px solid red;
    background: #fafbfc;
">STILL UNDER DEVELOPMENT</p>

<h2 class="unchanged rich-diff-level-one" style="
    padding: 1rem;
    border-bottom: 1px solid red;
    background: #fafbfc;
">1.1. Stack Used</h2>

- React
- Node
- Dynamodb
- Serverless
- GraphQL
- Apollo Federation
  
<h2 class="unchanged rich-diff-level-one" style="
  padding: 1rem;
  border-bottom: 1px solid red;
  background: #fafbfc;
">1.2. Requirements</h2>

- Serverless
- dynamodb-local
- Nodejs
- NPM

<h2 class="unchanged rich-diff-level-one" style="
  padding: 1rem;
  border-bottom: 1px solid red;
  background: #fafbfc;
">1.3. Setup</h2>

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

<h2 class="unchanged rich-diff-level-one" style="
  padding: 1rem;
  border-bottom: 1px solid red;
  background: #fafbfc;
">1.4. Screenshot</h2>

![Screenshot](https://raw.githubusercontent.com/MrRajatSharma/serverless-mern-monorepo/master/packages/frontend/screenshot/Screenshot%20from%202020-08-30%2001-11-11.png)


### Author
[Rajat Sharma](https://github.com/MrRajatSharma/serverless-mern-monorepo/blob/master/LICENSE)

### License
[MIT](https://github.com/MrRajatSharma/serverless-mern-monorepo/blob/master/LICENSE)