const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.images.list)
  app.get('/about', auth.isAuthenticated, controllers.home.about)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)

  app.get('/images/add', auth.isAuthenticated, controllers.images.addGet)
  app.post('/images/add', auth.isAuthenticated, controllers.images.addPost)

  app.get('/images/list', controllers.images.list)
  app.get('/images/tag', controllers.images.tag)

  app.get('/profile/:username', auth.isAuthenticated, controllers.users.profile)

  app.get('/images/edit/:id', auth.isInRole('Admin'), controllers.images.editGet)
  app.post('/images/edit/:id', auth.isInRole('Admin'), controllers.images.editPost)

  app.get('/')

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
