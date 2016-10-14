import UsersController from '../controllers/users';

export default (app) => {
  const usersController = new UsersController(app.datasource.models.User);

  app.route('/users')
  .all(app.auth.authenticate())
        .get((req, res) => {
          usersController.getAll()
                .then(response => {
                  res.status(response.statusCode);
                  res.json(response.data);
                })
                .catch(error => {
                  res.status(error.statusCode);
                  res.json(error.data);
                });
        })
        .post((req, res) => {
          usersController.create(req.body)
                .then(response => {
                  res.status(response.statusCode);
                  res.json(response.data);
                })
                .catch(error => {
                  res.status(error.statusCode);
                  res.json(error.data);
                });
        });

  app.route('/users/:id')
  .all(app.auth.authenticate())
        .get((req, res) => {
          usersController.getById(req.params)
                .then(response => {
                  res.status(response.statusCode);
                  res.json(response.data);
                })
                .catch(error => {
                  res.status(error.statusCode);
                  res.json(error.data);
                });
        })
        .put((req, res) => {
          usersController.update(req.body, req.params)
                .then(response => {
                  res.status(response.statusCode);
                  res.json(response.data);
                })
                .catch(error => {
                  res.status(error.statusCode);
                  res.json(error.data);
                });
        })
        .delete((req, res) => {
          usersController.delete(req.params)
                .then(response => {
                  res.sendStatus(response.statusCode);
                })
                .catch(error => {
                  res.status(error.statusCode);
                  res.json(error.data);
                });
        });
};
