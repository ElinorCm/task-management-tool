const express = require('express'); 

const router = express.Router(); 

const mainController = require('./controllers/mainController');
const userController = require('./controllers/userController');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController'); 
const errorHandler = require('./errorHandler'); 

router.get('/', mainController.homePage); 

/*--------------- users ---------------*/
router.post('/login', userController.loginAction); 
router.post('/signup', userController.signupAction); 
router.get('/users', userController.all); 

/*--------------- lists ---------------*/
router.get('/lists', listController.getAll);
router.get('/lists/:id', listController.getOne); 
router.post('/lists/create', listController.create);
router.delete('/lists/delete/:id', listController.delete);
router.patch('/lists/update/:id', listController.update); 
router.get('/user/lists', listController.getAllByUserId);
router.get('/user/lists/:id', listController.getOneByUserId);


/*--------------- cards ---------------*/
router.get('/cards', cardController.all);
router.post('/cards/create', cardController.create);
router.delete('/cards/delete/:id', cardController.delete);
router.patch('/cards/update/:id', cardController.updateOne); 
router.get('/cards/:id', cardController.getOne); 
router.get('/lists/:id/cards', cardController.getCardsInList);


/*--------------- tags ---------------*/
router.get('/tags', tagController.all); 
router.post('/tags/create', tagController.create);
router.delete('/tags/delete/:id', tagController.delete);
router.patch('/tags/update/:id', tagController.updateOne); 
router.get('/tags/:id', tagController.getOne); 

/*--------------- gestion 404 ---------------*/
router.use(errorHandler.handleNotFound); 

module.exports = router;