const express = require('express');
const router = express.Router();
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const passport = require("passport");


var post = {
    posts: [{
        "id" : 1,
        "email": "admin",
        "title" : "Car for new",
        "description": "Still new",
        "category": "Car",
        "location": "Oulu",
        "image": [
            "http://localhost:4000/uploads/41c72e7e-0743-425b-ac69-03802c7f3f43-download-(2).jpeg",
            "http://localhost:4000/uploads/41c72e7e-0743-425b-ac69-03802c7f3f43-download-(2).jpeg",
            "http://localhost:4000/uploads/0544fb27-4979-430c-8bd0-af1da840ff07-download.jpeg"
        ],
        "price": "400",
        "dataOfPosting": "01/02/2020",
        "delivery" : "Shipping",
        "SellerOfName": "Anna - 01241325"
    },
    {
        "id" : 2,
        "email": "admin",
        "title" : "Clothing for new",
        "description": "6 months",
        "category": "Clothing",
        "location": "Helsinki",
        "image": [
            "http://localhost:4000/uploads/1d15d8ee-89be-45ad-b946-4cd26c06ce61-download-(1).jpeg",
            "http://localhost:4000/uploads/41c72e7e-0743-425b-ac69-03802c7f3f43-download-(2).jpeg",
            "http://localhost:4000/uploads/0544fb27-4979-430c-8bd0-af1da840ff07-download.jpeg"
        ],
        "price": "200",
        "dataOfPosting": "02/02/2020",
        "delivery" : "Pickup",
        "SellerOfName": "Henkoi - 012413251"
    }]
}

// Get all data

router.get('/', (req, res) => {
    res.json(post.posts)
});

// Get id of single data

router.get('/:id', (req, res) => {
    const resultPost = post.posts.filter(d => {
        if (d.id === req.params.id) {
            return true;
        }
        else if (d.email === req.params.id) {
            return true;
        }
        else if (d.category === req.params.id) {
            return true;
        }
        else if (d.location === req.params.id) {
            return true;
        }
        else if (d.dataOfPosting === req.params.id) {
            return true;
        }
        else {
            return false;
        }

    });
    if (resultPost === undefined) {
        res.sendStatus(404)
    }
    else {
        res.json(resultPost);
    }
})

// Post the single data

const DIR = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post('/', [upload.array('imgCollection', 4), passport.authenticate('jwt', { session: false })], (req, res, next) => {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/uploads/' + req.files[i].filename)
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    var newPost = {
        id: post.posts.length + 1,
        email: req.user.email,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        image: reqFiles,
        price: req.body.price,
        dataOfPosting: today,
        delivery: req.body.delivery,
        SellerOfName: req.body.SellerOfName,
    };


    post.posts.push(newPost);
    res.status(201);
    res.json(newPost)

})

// Delete the single data

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    post.posts = post.posts.filter(post => post.id != req.params.id);
    res.sendStatus(200);
});

// Change the info of the single data

router.put('/:id', [upload.array('imgCollection', 4), passport.authenticate('jwt', { session: false })], (req, res) => {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/uploads/' + req.files[i].filename)
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    post.posts = post.posts.filter(post => post.id !== req.params.id);
    const newPost = {
        id: req.params.id,
        email: req.user.email,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        image: reqFiles,
        price: req.body.price,
        dataOfPosting: today,
        delivery: req.body.delivery,
        SellerOfName: req.body.SellerOfName,
    }
    post.posts.push(newPost);

    res.status(200);
    res.json(newPost);
});







module.exports = router;