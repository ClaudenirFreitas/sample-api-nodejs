import winston from 'winston';
import BooksController from '../../../controllers/books';

winston.info('Running tests of units [Books]...');

describe('Controllers:Books', () => {
  describe('Get all books: getAll()', () => {
    it('should return a list of books', () => {
      const Books = {
        findAll: td.function(),
      };
      const expectedResponse = [
        {
          id: 1,
          nome: 'test book',
          created_at: '2016-09-09T23:50:21.66Z',
          updated_at: '2016-09-09T23:50:21.66Z',
        },

      ];

      td.when(Books.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getAll()
                .then(response => {
                  expect(response.data).to.be.eql(expectedResponse);
                });
    });
  });

  describe('Get book: getById()', () => {
    it('should return a book', () => {
      const Books = {
        findOne: td.function(),
      };
      const expectedResponse = {
        id: 1,
        nome: 'test book',
        created_at: '2016-09-09T23:50:21.66Z',
        updated_at: '2016-09-09T23:50:21.66Z',
      };

      td.when(Books.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getById({ id: 1 })
                .then(response => {
                  expect(response.data).to.be.eql(expectedResponse);
                });
    });
  });

  describe('Create book: create()', () => {
    it('should create a book', () => {
      const Books = {
        create: td.function(),
      };
      const requestBody = {
        name: 'Test Book',
      };
      const expectedResponse = {
        id: 1,
        nome: 'test book',
        created_at: '2016-09-09T23:50:21.66Z',
        updated_at: '2016-09-09T23:50:21.66Z',
      };

      td.when(Books.create(requestBody)).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.create(requestBody)
                .then(response => {
                  expect(response.data).to.be.eql(expectedResponse);
                  expect(response.statusCode).to.be.eql(201);
                });
    });
  });

  describe('Update a book: update()', () => {
    it('should update on existing book', () => {
      const Books = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        name: 'Test Book Updated',
      };
      const expectedResponse = {
        id: 1,
        nome: 'test book Updated',
        created_at: '2016-09-09T23:50:21.66Z',
        updated_at: '2016-09-09T23:50:21.66Z',
      };

      td.when(Books.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.update(requestBody, { id: 1 })
                .then(response => {
                  expect(response.data).to.be.eql(expectedResponse);
                  expect(response.statusCode).to.be.eql(200);
                });
    });
  });

  describe('Delete a book: delete()', () => {
    it('should delete a book', () => {
      const Books = {
        destroy: td.function(),
      };

      td.when(Books.destroy({ where: { id: 1 } })).thenResolve({});

      const booksController = new BooksController(Books);
      return booksController.delete({ id: 1 })
                .then(response => {
                  expect(response.statusCode).to.be.eql(204);
                });
    });
  });
});
