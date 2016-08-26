const defaultResp = (data, statusCode = 200) => ({ data, statusCode });
const errorResp = (message, statusCode = 400) => defaultResp({ error: message }, statusCode);

class BooksController {

  constructor(Books) {
    this.Books = Books;
  }

  getAll() {
    return this.Books.findAll({})
            .then(result => defaultResp(result))
            .catch(error => errorResp(error.message));
  }

  getById(params) {
    return this.Books.findOne({ where: params })
            .then(result => defaultResp(result))
            .catch(error => errorResp(error.message));
  }

  create(data) {
    return this.Books.create(data)
            .then(result => defaultResp(result, 201))
            .catch(error => errorResp(error.message, 422));
  }

  update(data, params) {
    return this.Books.update(data, { where: params })
            .then(result => defaultResp(result))
            .catch(error => errorResp(error.message, 422));
  }

  delete(params) {
    return this.Books.destroy({ where: params })
            .then(result => defaultResp(result, 204))
            .catch(error => errorResp(error.message, 422));
  }

}

export default BooksController;
