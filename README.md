## User Authentication and Organisation

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/MdicVqTRHeYVGGSiDanxqY/FxHgmLzv7qtUSWVwtHQm6C/tree/main.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/circleci/MdicVqTRHeYVGGSiDanxqY/FxHgmLzv7qtUSWVwtHQm6C/tree/main)

## Table of Contents

* [About](#user-authentication-and-organisation)
* [Required Features](#required-features)
* [Koyeb Deployment](#koyeb-deployment)
* [Test with Postman](#response-test-with-postman)
* [Technologies Used](#technologies-used)
* [Acknowledgements](#acknowledgements)
* [Author](#author)

## Required Features

* User can register and create a default organisation.
* User can login.
* User can get their own record or user record in organisations they belong to or created.
* User can get all organisations they belong to or created.
* User can get a single organisation record.
* User can create their new organisation.
* Adds a user to a particular organisation.

## Koyeb Deployment

Application was deployed to Koyeb. Base URL - [https://net-danell-tosins-fbe7e13f.koyeb.app/](https://net-danell-tosins-fbe7e13f.koyeb.app/) with API endpoints.

## Test with Postman
* [POST] /auth/register
```
shell
{
    "firstName": "string",
	"lastName": "string",
	"email": "string",
	"password": "string",
	"phone": "string",
}

```
* [POST] /auth/login
```
shell
{,
	"email": "string",
	"password": "string"
}

```
* [GET] /api/users/:id (PROTECTED)
* [GET] /api/organisations (PROTECTED)
* [GET] /api/organisations/:orgId (PROTECTED)
* [POST] /api/organisations (PROTECTED)
* [POST] /api/organisations/:orgId/users (protected)

## Technologies Used

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) for frontend design
* [Node-js](https://nodejs.org/en/) Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.
* [Mocha](https://mochajs.org/) used for setting up tests
* [Chai](https://chaijs.com/) is test assertion library for Javascript
* [CircleCI](https://circleci.com/) is a continuous integration and continuous delivery platform that can be used to implement DevOps practices.
* [Expressjs](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [Koyeb](https://www.koyeb.com/) allows you to deploy resilient applications with zero configuration: we deal with server provisioning, upgrades and failures for you.
* [Cockroachdb](https://cockroachlabs.cloud/) is a distributed database with standard SQL for cloud applications.

## Acknowledgements

* [HNG 11](https://hng.tech/internship)

## Author

* [Alabi Tosin](https://github.com/alatos2)