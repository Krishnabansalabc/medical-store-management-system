const Medicine = require('../model/medicine');
const slugify = require('slugify');

exports.create = (req, res) => {
    // console.log(req.body);
    const { title, content, user,date,stock,price } = req.body;
    const slug = slugify(title);
    // validate
    switch (true) {
        case !title:
            return res.status(400).json({ error: 'Medicine Name is required' });
            break;
        case !content:
            return res.status(400).json({ error: 'Usage is required' });
            break;
    }
    // create medicine
    Medicine.create({ title, content, user,date, slug,stock,price }, (err, medicine) => {
        if (err) {
            console.log(err);
            res.status(400).json({ error: "Medicine is already added" });
        }
        res.json(medicine);
    });
};

exports.list = (req, res) => {
    Medicine.find({})
        .limit(10)
        .sort({ createdAt: -1 })
        .exec((err, medicines) => {
            if (err) console.log(err);
            res.json(medicines);
        });
};

exports.read = (req, res) => {
    // console.log(req.pramas.slug)
    const { slug } = req.params;
    Medicine.findOne({ slug }).exec((err, medicine) => {
        if (err) console.log(err);
        res.json(medicine);
    });
};

exports.update = (req, res) => {
    const { slug } = req.params;
    const { title, content, user,date,stock,price } = req.body;
    Medicine.findOneAndUpdate({ slug }, { title, content, user,date,stock,price }, { new: true }).exec((err, medicine) => {
        if (err) console.log(err);
        res.json(medicine);
    });
};

exports.remove = (req, res) => {
    // console.log(req.pramas.slug)
    const { slug } = req.params;
    Medicine.findOneAndRemove({ slug }).exec((err, medicine) => {
        if (err) console.log(err);
        res.json({
            message: 'Medicine Details deleted'
        });
    });
};
