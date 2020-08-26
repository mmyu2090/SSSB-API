const router = require('express').Router();
const device = require('../models/device');

router.post('/', (req, res) => {
    device.create(req.body)
        .then(device => res.send(device))
        .catch(err => res.status(500).send(err));
})

router.get('/', (req, res) => {
    device.findAll()
        .then((device) => {
            if (!device.length) return res.status(404).send({ err: 'device not found' });
            res.send(device);
        }).catch(err => res.status(500).send(err));
});

router.get('/:deviceid', (req, res) => {
    device.findOneByOwnerId(req.params.deviceid)
        .then((device) => {
            if (!device) return res.status(404).send({ err: 'device not found' });
            res.send(device);
        })
        .catch(err => res.status(500).send(err));
});

router.get('/danger/:danger', (req, res) => {
    device.findDangerDevice(req.params.danger)
        .then((device) => {
            if (!device.length) return res.status(404).send({ err: 'no device in danger' });
            res.send(device);
        }).catch(err => res.status(500).send(err));
});

router.get('/critical/:critical', (req, res) => {
    device.findCritialDevice(req.params.critical)
        .then((device) => {
            if (!device.length) return res.status(404).send({ err: 'no device in critical' });
            res.send(device);
        }).catch(err => res.status(500).send(err));
})

router.put('/:deviceid', (req, res) => {
    device.updateByDeviceID(req.params.deviceid, req.body)
        .then(device => res.send(device))
        .catch(err => res.status(500).send(err));
})

router.put('/status/:deviceid', (req, res) => {
    device.updateStatus(req.params.deviceid, req.body)
        .then(device => res.send(device))
        .catch(err => res.status(500).send(err));
})

router.delete('/:deviceid', (req, res) => {
    device.deleteByDeviceID(req.params.deviceid)
        .then(device => res.send(device))
        .catch(err => res.status(500).send(err));
})

module.exports = router;