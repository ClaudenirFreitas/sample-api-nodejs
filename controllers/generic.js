import HttpStatus from 'http-status';

const defaultResp = (data, statusCode = HttpStatus.OK) => ({ data, statusCode });
const errorResp = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResp({ error: message }, statusCode);

class GenericController {

    constructor(model) {
        this.model = model;
    }

    getAll() {
        return this.model.findAll({})
            .then(result => defaultResp(result))
            .catch(error => errorResp(error.message));
    }

    getById(params) {
        return this.model.findOne({ where: params })
            .then(result => defaultResp(result))
            .catch(error => errorResp(error.message));
    }

    create(data) {
        return this.model.create(data)
            .then(result => defaultResp(result, HttpStatus.CREATED))
            .catch(error => errorResp(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    update(data, params) {
        return this.model.update(data, { where: params })
            .then(result => defaultResp(result))
            .catch(error => errorResp(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(params) {
        return this.model.destroy({ where: params })
            .then(result => defaultResp(result, HttpStatus.NO_CONTENT))
            .catch(error => errorResp(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

}

export default GenericController;