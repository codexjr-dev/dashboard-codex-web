<img src="https://imgur.com/58aRLCO.png" width="100%"></img>

# 🖥️ Projexa

Dashboard to organize and manage the team and the projects of our enterprise.

With the aim of creating **efficient management** and **centralized data collection**, access to **leaders and** other **members** of the junior company, **Projexa** offers an environment for the construction and continuous evolution of a web system, open-source and, mainly, promoted by developers **CodeX Jr.** internals.
The application has a register of members, projects and links, available for viewing by the entire company, as well as management over each one, according to the authorization level of each user.

## 🚀 Starting

These instructions will allow you to get a copy of the project running on your local machine for development and testing purposes.

### 📋 Prerequisites

To run the Backend system, you will need to have Node JS installed.

You can do this accessing this **[link](https://nodejs.org/en/download)**.

### 🔧 Installation

To install, you will need to clone the project, install the dependencies, create a .env file in the project root and add the necessary variables.

First, to clone the project, run:

```shell
git clone https://github.com/codexjr-dev/dashboard-codex-api.git
```

At the project root, install the dependencies by running:

```shell
npm install
```

Also in the project root, add a ".env" file and insert the following variables:

```.env
BD_PROD=<developer database link (MongoDB Atlas)>
BD_DEV=<production database link (MongoDB Atlas)>

PORT=<port on which you want to run the API. Ex: 4444>

SALT_ROUNDS=<integer of your choice>

JWT_SECRET=<jwt password>
```

Perhaps dependencies such as **cors**, **dotenv**, **express**, **nodemon**, **jsonwebtoken** and/or **mongoose** inform you that they need to be installed globally (on your machine).

To do so, just listen to the following commands:

```shell
node i -g <dependence>
```

## ⚙️ Configuring Scripts

Before running, you may need to configure the scripts according to your Operating System.

Change the package.json according to your need:

**Linux**

```json
"scripts": {
   "start": "NODE_ENV=prod node server.js",
   "test": "NODE_ENV=test mocha ./test/integration/*.test.js --timeout 10000 --exit",
   "dev": "NODE_ENV=dev nodemon server.js",
   "debug": "NODE_ENV=dev nodemon --inspect server.js"
}
```

**Windows**

```json
"scripts": {
   "start": "set NODE_ENV=prod node && server.js",
   "test": "set NODE_ENV=test && mocha ./test/integration/*.test.js --timeout 10000 --exit",
   "dev": "set NODE_ENV=dev && nodemon server.js",
   "debug": "set NODE_ENV=dev nodemon && --inspect server.js"
}
```

---

## ✅ Running the System

Execute in production environment:

```shell
npm start
```

Execute in developer environment:

```shell
npm run dev
```

Execute tests, creating a temporary Data Base:

```shell
npm run test
```

## 🛠️ Construído com

The main technologies used were:

- [Vue](https://vuejs.org/) - The JavaScript framework used
- [npm](https://docs.npmjs.com/) - Dependency Manager
- [Axios](https://axios-http.com/) - JavaScript library
- [PugJs](https://pugjs.org/) - Template engine for JavaScript

## 🖇️ Collaboration

Please, read a **[COLLAB.md](https://github.com/codexjr-dev/dashboard-codex-api/blob/main/COLLAB.md)** for details about our code of conduct and the process for submitting requests to us.

## 📌 Versions

- [1.0.0](https://github.com/lucasanthony/tcc-frontend) - [Completion of Course Work - Lucas Anthony](http://dspace.sti.ufcg.edu.br:8080/xmlui/bitstream/handle/riufcg/29267/LUCAS%20ANTHONY%20FERREIRA%20DE%20OLIVEIRA%20-%20TCC%20ARTIGO%20CI%C3%8ANCIA%20DA%20COMPUTA%C3%87%C3%83O%20CEEI%202022.pdf?sequence=1&isAllowed=y).
- [1.2.1](https://github.com/codexjr-dev/dashboard-codex-web/tree/2dce5a8514f3e40d22ab6b2258e13b9c3be90bae) - [Visual identity improvements, correction in confirm password, logoff button added, input hiding in "Enter Password" fields and new roles to "Add User" page.](https://github.com/codexjr-dev/dashboard-codex-web/pull/24).
- [1.2.2](https://github.com/codexjr-dev/dashboard-codex-web/tree/240017003666675188a98c95538c1c9b0796a4de) - [console.log removed, role verifications updates, access to members and new roles to user.](https://github.com/codexjr-dev/dashboard-codex-web/pull/38).
- [1.2.3](https://github.com/codexjr-dev/dashboard-codex-web/tree/1566154a0df4c308f7fc83014f06507c3656b7c7) - [Bug Fixes, System Improvements and Visual Improvements.](https://github.com/codexjr-dev/dashboard-codex-web/pull/80).
- [1.2.4](https://github.com/codexjr-dev/dashboard-codex-web/tree/9ebd1514224e039ba3dce0808aef92645368c688) - [Two new buttons for create and preview project news, and invalid email format notification added.](https://github.com/codexjr-dev/dashboard-codex-web/pull/90)

## ✒️ Authors

<table>
   <tr>
      <td align="center" width="190px" height="160px">
         <img src="https://avatars.githubusercontent.com/u/25506401?v=4" alt="Lucas Anthony Profile Image" width="50"></img>
         </br>
         <a href="https://github.com/lucasanthony">@lucasanthony</a>
         </br>
         <span>Initial Work</span>
      </td>
      <td align="center" width="190px" height="160px">
         <img src="https://avatars.githubusercontent.com/u/34282197?v=4" alt="Gabriel Max Profile Image" width="50"></img>
         </br>
         <a href="https://github.com/ManoMax">@ManoMax</a>
         </br>
         <span>Continuation of Work</span>
      </td>
   </tr>
</table>

- **Lucas Anthony** - _Initial Work_ - [@lucasanthony](https://github.com/lucasanthony)
- **Gabriel Max** - _Subsequent Project Leader_ - [@ManoMax](https://github.com/ManoMax)

You can also see the list of all contributors who participated in this project.

<table>
   <tr>
      <td align="center" width="190px" height="160px">
         <img src="https://avatars.githubusercontent.com/u/100716949?v=4" alt="Ana Rita Profile Image" width="50"></img>
         </br>
         <a href="https://github.com/Anaritamed">@anaritamed</a>
         </br>
         <span>Developer</span>
      </td>
      <td align="center" width="190px" height="160px">
         <img src="https://avatars.githubusercontent.com/u/64997111?v=4" alt="Filipe Luiz Profile Image" width="50"></img>
         </br>
         <a href="https://github.com/FLuiz22">@FLuiz22</a>
         </br>
         <span>Developer</span>
      </td>
      <td align="center" width="190px" height="160px">
         <img src="https://avatars.githubusercontent.com/u/117235880?v=4" alt="Maria Clara Profile Image" width="50"></img>
         </br>
         <a href="https://github.com/maahog">@maahog</a>
         </br>
         <span>Developer</span>
      </td>
      <td align="center" width="190px" height="160px">
         <img src="https://avatars.githubusercontent.com/u/92826048?v=4" alt="Matheus Victor Profile Image" width="50"></img>
         </br>
         <a href="https://github.com/matheusvictoor">@matheusvictoor</a>
         </br>
         <span>Developer</span>
      </td>
   </tr>
   <tr>
      <td align="center" width="190px" height="160px">
         <img src="https://avatars.githubusercontent.com/u/62821027?v=4" alt="Daniele Oliveira Profile Image" width="50"></img>
         </br>
         <a href="https://github.com/danieleolivs">@danieleolivs</a>
         </br>
         <span>UI Design</span>
      </td>
         <td align="center" width="190px" height="160px">
         <img src="https://avatars.githubusercontent.com/u/96065590?v=4" alt="Carlos Lucena Profile Image" width="50"></img>
         </br>
         <a href="https://github.com/carlos-lucenag">@carlos-lucenag</a>
         </br>
         <span>UI Design</span>
      </td>
   </tr>
</table>

## 📄 Licença

This project is under license **GNU General Public License v3.0 (GNU GPLv3)** - see the file [LICENSE.md](https://github.com/codexjr-dev/dashboard-codex-web/blob/main/LICENSE.md) for details.

---

⌨️ with ❤️ by [CodeX Jr.](https://codexjr.com.br/) 😊
