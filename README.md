<br />
<div align="center">
<h3 align="center">Todo List manager</h3>

  <p align="center">
    E2E application where users can login and manage their todo list
    <br />
</div>


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

A demo todo list application consists of backend built with node.js and front end web portal build with react.js

### Built With

* [![Node.js][node-shield]][Node-url]
* [![React][react-shield]][react-url]

## Getting Started

The app is dockerized and can be run using docker compose.

### Prerequisites

* Docker
  refer to [![Docker][docker-shield]][docker-url] for installation instructions

* if you are going to work on development you will need npm & node.js (14+)

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```shell
git clone https://github.com/Abdallah-Zidan/todolist-manager.git
```

2. Prepare api environment variables

```sh
cd api 
cp .env.example .env
```

3. update the env variables values with the values suitable for your environment

3. Prepare frontend environment variables

```shell
    cd frontend
    cp .env.example .env
```

4. Run the applications using docker compose (from the root directory)

```shell
docker compose up
```

5. open browser at localhost:8080 or whatever port is mapped in docker-compose.yml

## Usage

The applicaton is very simple to use here is how

1. Todos routes requires authentication so you will be redirected to login page
2. if you set in .env that a demo user should be created then you can use the following credentials to login 
   - user@user.com
   - demopassword

3. Alternatively you can register a new user then login with it to manage your todos 

## Contact

[![LinkedIn][linkedin-shield]][linkedin-url]  [![Gmail][gmail-shield]][gmail-url]

Project Link: [Todo List Manager][repo-url]

[react-url]:https://reactjs.org/

[react-shield]:https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://www.linkedin.com/in/abdallah-zidan/

[product-screenshot]: https://postimg.cc/nj4SsytZ

[node-shield]:https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=

[node-url]:https://nodejs.org/

[docker-shield]:https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white

[docker-url]:https://www.docker.com/

[gmail-shield]:https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white

[gmail-url]:mailto:eng.abdallahzidan@gmail.com

[repo-url]:https://github.com/Abdallah-Zidan/todolist-manager