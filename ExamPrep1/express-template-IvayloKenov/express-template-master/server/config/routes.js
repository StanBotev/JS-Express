const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', auth.isAuthenticated, controllers.home.about)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)

  app.get('/threads/add', auth.isAuthenticated, controllers.threads.addGet)
  app.post('/threads/add', auth.isAuthenticated, controllers.threads.addPost)

  app.get('/threads/addComment', auth.isAuthenticated, controllers.threads.addCommentGet)
  app.post('/threads/addComment', auth.isAuthenticated, controllers.threads.addCommentPost)

  app.get('/threads/list', controllers.threads.list)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
