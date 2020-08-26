const router = require('express').Router();
const user = require('../models/user');

router.post('/', (req, res) => {
    user.create(req.body)
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
})

router.get('/', (req, res) => {
    user.findAll()
        .then((user) => {
            if (!user.length) return res.status(404).send({ err: 'user not found' });
            res.send(user);
        }).catch(err => res.status(500).send(err));
});

router.get('/:userid', (req, res) => {
    user.findOneByUserId(req.params.userid)
        .then((user) => {
            if (!user) return res.status(404).send({ err: 'user not found' });
            res.send(user);
        })
        .catch(err => res.status(500).send(err));
});

router.put('/:userid', (req, res) => {
    user.updateByUserID(req.params.userid, req.body)
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
})

router.delete('/:userid', (req, res) => {
    user.deleteByUserID(req.params.userid)
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
})

module.exports = router;