const request = require('supertest');
const {expect, util} = require('chai');
const jwt = require('jsonwebtoken');
const utils = require('../helpers/commons');
const server = require('../index');

let userToken;

describe('User Registration & Organisation Access', () => {
    before(done => {
        request(server)
        .post('/auth/login')
        .send({
            email: "grace@gmail.com",
            password: "12345656"
        })
        .end((err, res) => {
            userToken = res.body.data.accessToken;
            done();
        });
    });
    it('It Should Register User Successfully with Default Organisation', done => {
        request(server)
        .post('/auth/register')
        .set('Authorization', userToken)
        .send({
            firstName: "Jackie",
            lastName: "Chan",
            email: "jackie@gmail.com",
            password: "12345656",
            phone: "07123344569"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          // done();
          setTimeout(done, 5000);
        });
    });
    it('It Should Not Register User Successfully with Default Organisation when first name is missing', done => {
        request(server)
        .post('/auth/register')
        .set('Authorization', userToken)
        .send({
            firstName: "",
            lastName: "Chan",
            email: "jackie@gmail.com",
            password: "12345656",
            phone: "07123344569"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
    it('It Should Not Register User Successfully with Default Organisation when last name is missing', done => {
        request(server)
        .post('/auth/register')
        .set('Authorization', userToken)
        .send({
            firstName: "Jackie",
            lastName: "",
            email: "jackie@gmail.com",
            password: "12345656",
            phone: "07123344569"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
    it('It Should Not Register User Successfully with Default Organisation when email is missing', done => {
        request(server)
        .post('/auth/register')
        .set('Authorization', userToken)
        .send({
            firstName: "Jackie",
            lastName: "Chan",
            email: "",
            password: "12345656",
            phone: "07123344569"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
    it('It Should Not Register User Successfully with Default Organisation when email is not in right format', done => {
        request(server)
        .post('/auth/register')
        .set('Authorization', userToken)
        .send({
            firstName: "Jackie",
            lastName: "Chan",
            email: "jackiegmail.com",
            password: "12345656",
            phone: "07123344569"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
    it('It Should Not Register User Successfully with Default Organisation when password is missing', done => {
        request(server)
        .post('/auth/register')
        .set('Authorization', userToken)
        .send({
            firstName: "Jackie",
            lastName: "Chan",
            email: "jackie@gmail.com",
            password: "",
            phone: "07123344569"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
    it('It Should Not Register User Successfully with Default Organisation when phone is missing', done => {
        request(server)
        .post('/auth/register')
        .set('Authorization', userToken)
        .send({
            firstName: "Jackie",
            lastName: "Chan",
            email: "jackie@gmail.com",
            password: "12345656",
            phone: ""
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
    it('It Should Fail if there’s Duplicate Email or UserId', done => {
        request(server)
        .post('/auth/register')
        .set('Authorization', userToken)
        .send({
            firstName: "Jackie",
            lastName: "Chan",
            email: "jackie@gmail.com",
            password: "12345656",
            phone: "08137733203"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          // done();
          setTimeout(done, 5000);
        });
    });
  });

require('dotenv').config();

  describe('Token Generation & Expiry', () => {
    let oneHourFromNow = Math.floor(Date.now() / 1000) + (60 * 60);
    it('It should not expire before an hour', (done) => {
      jwt.verify(userToken, process.env.SECRET, {clockTimestamp: oneHourFromNow - 1}, (err, decoded) => {
        expect(decoded).to.be.an('object');
        expect(decoded.userId).to.be.ok;
        expect(err).to.be.null;
        done()
      });
    });
    it('It should expire after an hour', (done) => {
      jwt.verify(userToken, process.env.SECRET, {clockTimestamp: oneHourFromNow + 1}, (err, decoded) => {
        expect(err).not.to.be.undefined;
        expect(decoded).to.be.undefined;
        done()
      });
    });
  })


  describe('User Login', () => {
    it('It Should Log the user in successfully when a valid credential is provided', done => {
        request(server)
        .post('/auth/login')
        .send({
            email: "jackie@gmail.com",
            password: "12345656"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
    it('It Should NOT Log the user in successfully when email is missing', done => {
        request(server)
        .post('/auth/login')
        .send({
            email: "",
            password: "12345656"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
    it('It Should NOT Log the user in successfully when a password is missing', done => {
        request(server)
        .post('/auth/login')
        .send({
            email: "jackie@gmail.com",
            password: ""
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
    it('It Should NOT Log the user in successfully when email is not in the right format', done => {
        request(server)
        .post('/auth/login')
        .send({
            email: "jackiegmail.com",
            password: "12345656"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
    it('It Should NOT Log the user in successfully when email is incorrect', done => {
        request(server)
        .post('/auth/login')
        .send({
            email: "jackie12@gmail.com",
            password: "12345656"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
    it('It Should NOT Log the user in successfully when password is incorrect', done => {
        request(server)
        .post('/auth/login')
        .send({
            email: "jackie@gmail.com",
            password: "123456567"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          else {
            const responseData = JSON.parse(res.text);
            expect(responseData).to.be.an('object');
          }
          done();
        });
    });
})