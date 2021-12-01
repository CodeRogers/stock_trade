/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

<<<<<<< Updated upstream
Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly()
  Route.resource('stocks', 'StocksController').apiOnly()
  Route.put('/users/:id/stocks', 'UserStocksController.addStocks')
  Route.post('/users/pdf', 'UsersController.storeCPF')
  Route.get('documents/download/:id', 'DocumentsController.showDownload')
  Route.resource('documents', 'DocumentsController').apiOnly()
  Route.get('logout', 'LogoutController.index')
}).middleware(['auth'])

Route.post('login', 'LoginController.store')
=======
Route.resource('users', 'UsersController').apiOnly()
Route.resource('options', 'StocksController').apiOnly()
Route.put('users/:id/stocks', 'UserStocksController.addStocks')

// Routes for Docs
Route.post('docs/user/:id', 'UserDocsController.store')
Route.delete('docs/user/:id', 'UserDocsController.destroy')
Route.get('docs/user/:id', 'UserDocsController.show')

//autentication routes
Route.post('user/login', 'UsersController.login')
>>>>>>> Stashed changes
