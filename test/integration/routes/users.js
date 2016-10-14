import winston from 'winston';
import jwt from 'jwt-simple';

winston.info('Running tests of integrations [Users]...');

describe('Routes Users', () => {
  const Users = app.datasource.models.User;
  const jwtSecret = app.config.jwtSecret;
  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'user@defaul.com',
    password: 'teste',
  };
  let token;

  beforeEach(done => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create({
        name: 'John',
        email: 'john@gmail.com',
        password: '123456',
      }))
      .then(() => Users.create(defaultUser))
      .then(user => {
        token = jwt.encode({ id: user.id }, jwtSecret);
        done();
      });
  });

  describe('Route GET /users', () => {
    it('should return a list of users', done => {
      request
        .get('/users')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(200);
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);
          done(err);
        });
    });
  });

  describe('Route GET /users/:id', () => {
    it('should return a user', done => {
      request
        .get('/users/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(200);
          expect(res.body.id).to.be.eql(defaultUser.id);
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.email).to.be.eql(defaultUser.email);
          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('should create a users', done => {
      const newUser = {
        name: 'new  User',
        email: 'newuser@test.com',
        password: 'teste',
      };

      request
        .post('/users')
        .set('Authorization', `JWT ${token}`)
        .send(newUser)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(201);
          expect(res.body.id).to.not.be.eql(null);
          expect(res.body.name).to.be.eql(newUser.name);
          expect(res.body.email).to.be.eql(newUser.email);
          done(err);
        });
    });
  });

  describe('Route PUT /users/:id', () => {
    it('should update a user', done => {
      const updatedUser = {
        id: 1,
        name: 'updated  User',
        email: 'updateuser@test.com',
        password: 'teste',
      };

      request
        .put('/users/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedUser)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(200);
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /users/:id', () => {
    it('should delete a user', done => {
      request
        .delete('/users/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
