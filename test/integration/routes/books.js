import winston from 'winston';
import jwt from 'jwt-simple';

winston.info('Running tests of integrations [Books]...');

describe('Routes books', () => {
  const Books = app.datasource.models.Book;
  const Users = app.datasource.models.User;
  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: 'Default book',
    description: 'Description default Book',
  };

  let token;

  beforeEach(done => {
    Users
            .destroy({ where: {} })
            .then(() => Users.create({
              name: 'John',
              email: 'john@mail.com',
              password: '123456',
            }))
            .then(user => {
              Books
                    .destroy({ where: {} })
                    .then(() => Books.create(defaultBook))
                    .then(() => {
                      token = jwt.encode({ id: user.id }, jwtSecret);
                      done();
                    });
            });
  });

  describe('Route GET /books', () => {
    it('should return a list of books', done => {
      request
                .get('/books')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                  expect(res.statusCode).to.be.eql(200);
                  expect(res.body[0].id).to.be.eql(defaultBook.id);
                  expect(res.body[0].name).to.be.eql(defaultBook.name);
                  done(err);
                });
    });
  });

  describe('Route GET /books/:id', () => {
    it('should return a book', done => {
      request
                .get('/books/1')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                  expect(res.statusCode).to.be.eql(200);
                  expect(res.body.id).to.be.eql(defaultBook.id);
                  expect(res.body.name).to.be.eql(defaultBook.name);
                  done(err);
                });
    });
  });

  describe('Route POST /books', () => {
    it('should create a book', done => {
      const newBook = {
        name: 'new  Book',
        description: 'Description default Book',
      };

      request
                .post('/books')
                .set('Authorization', `JWT ${token}`)
                .send(newBook)
                .end((err, res) => {
                  expect(res.statusCode).to.be.eql(201);
                  expect(res.body.id).to.not.be.eql(null);
                  expect(res.body.name).to.be.eql(newBook.name);
                  done(err);
                });
    });
  });

  describe('Route PUT /books/:id', () => {
    it('should update a book', done => {
      const updatedBook = {
        id: 1,
        name: 'updated  Book',
        description: 'Description default Book',
      };

      request
                .put('/books/1')
                .set('Authorization', `JWT ${token}`)
                .send(updatedBook)
                .end((err, res) => {
                  expect(res.statusCode).to.be.eql(200);
                  expect(res.body).to.be.eql([1]);
                  done(err);
                });
    });
  });

  describe('Route DELETE /books/:id', () => {
    it('should delete a book', done => {
      request
                .delete('/books/1')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                  expect(res.statusCode).to.be.eql(204);
                  done(err);
                });
    });
  });
});
