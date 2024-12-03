import express from 'express';
import User from './userModel.js';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res, next) => {
    if (req.query.action === 'register') {
        try {
            await User(req.body).save(); 
            res.status(201).json({
                code: 201,
                msg: 'Successfully created new user.',
            });
        } catch (err) {
            next(err); 
        }
    } else {
        try {
            const user = await User.findOne(req.body);
            if (!user) {
                return res.status(401).json({ code: 401, msg: 'Authentication failed' });
            } else {
                return res.status(200).json({
                    code: 200,
                    msg: 'Authentication Successful',
                    token: 'TEMPORARY_TOKEN',
                });
            }
        } catch (err) {
            next(err); 
        }
    }
}));

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

export default router;

