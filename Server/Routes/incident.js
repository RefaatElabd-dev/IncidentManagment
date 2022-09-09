const express = require('express');
const router = express();
const auth = require('../middlewares/auth');

const {
    create, 
    getIncidentsByUserID, 
    getAll, 
    editOne, 
    getByName
} = require('../controllers/incident');

// add Incidant
router.post('/', async (req, res, next) => {
    const { body } = req;
    create({ ...body })
    .then(res.json)
    .catch(next);
});
// read All Incidents
router.get('/', async (req, res, next) => {
    try {
        res.json(await getAll());
    } 
    catch (e) {
        next(e);
    }
});
// read all Incidents of custom User   (weak)
router.get('/CurrentUser', auth, async (req, res, next) => {
    try {
        const { user: { id } } = req;
        res.json(await getIncidentsByUserID(id));
    } 
    catch (e) {
        next(e);
    }
});

//read single Incident
router.get('/:name', auth, async (req, res, next) => {
    try {
        const { params: { name } } = req;
        res.json(await getByName(name));
    } 
    catch (e) {
        next(e);
    }
});

// Update Incident
router.patch('/edit/:name', auth, async (req, res, next) => {
    const { body, user: { id } , params: { name }} = req;
    const incident = await getByName(name);
    editOne(incident._id, { ...body } )
    .then(res.json)
    .catch(next);
});

module.exports = router;