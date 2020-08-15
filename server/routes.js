const express = require('express');
const router = express.Router();
const Trip = require('./controllers/Trip');

// provides list of all vehicles
router.get('/trips', async (req, res, next) => {
    let response = await Trip.get();
    if(response.error)
        response.code = 160;
    res.json({data: response});
});

// create new vehicle entry
router.post('/trips', async (req, res, next) => {

    // get request body into data object
    let data = req.body ? req.body : {};

    // registeration number is not present, return error
    if(!data.registration_number || data.registration_number.length === 0) {
        res.json({
            code: 140,
            error: { message: 'registration_number is required' }
        });
        return;
    }

    // visit_type is not present, return error
    if(!data.visit_type || data.visit_type.length === 0) {
        res.json({
            code: 140,
            error: { message: 'visit_type is required' }
        });
        return;
    }

    // validate the visit_type
    let allowedVisitTypes = ['round-trip','one-way'];
    if(!allowedVisitTypes.includes(data.visit_type)) {
        res.json({
            code: 130,
            error: { message: 'visit_type is invalid' }
        });
        return;
    }

    data.amount = data.visit_type === 'round-trip' ? 200 : 100;

    let response = await Trip.create(data);
    if(response.error)
        response.code = 160;
    res.json({data: response});
});


module.exports = router;