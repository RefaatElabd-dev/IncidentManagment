const express = require('express');
const auth = require('../middlewares/auth');

const {
    create, 
    login, 
    getAll, 
    editOne, 
    searchUser, 
    getByUserName, 
    removeAcc
} = require('../controllers/user');

const router = express();


router.post('/', async (req, res, next) => {
    const { body } = req;
    create({ ...body })
    .then(result => { debugger; res.json(result)})
    .catch(e => { debugger; next(e)});
});

//login  TODO(Spicify ROLE on Response (Admin/ user))
router.post('/login', async (req, res, next) => {
    const { body } = req;
    try {
        res.json(await login(body));
    } 
    catch (e) {
        next(e);
    }
});

router.use(auth);
//get all Users
router.get('/', async (req, res, next) => {
    try {
        res.json(await getAll());
    } 
    catch (e) {
        next(e);
    }
});

//user self page /Account/mypage
router.get('/mypage', async (req, res, next) => {
    const { user } = req;
    try {
        res.json(user);
    } catch (e) {
        next(e);
    }
});

//get user by userName
router.get('/:username', async (req, res, next) => {
    const { params: { username } } = req;
    try {
        res.json(await getByUserName(username));
    } catch (e) {
        next(e);
    }
});

router.get('/search/:searched', async (req, res, next) => {
    const { params: { searched } } = req;
    try {
        const results = await searchUser(searched);
        res.json(results);
    } catch (e) {
        next(e);
    }
})

// *************************

router.patch('/edit', async (req, res, next) => {
    const { body, user: { id } } = req;
    editOne(id, { ...body } ).then(user => res.json(user)).catch(e => next(e));
});

router.delete('/delete', async (req, res, next) => {
    const { user: { id } } = req;
    try {
        const user = await removeAcc(id);
        console.log(`User: ${user} is Deleted`)

        res.json({ 'status': 'deleted' })
    } catch (e) {
      next(e);
    }
  }); 

module.exports = router;
