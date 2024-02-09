const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Routes for handling product-related operations

// Fetch all products with their categories and tags
router.get('/', (req, res) => {
  Product.findAll({
    attributes: ['id', 'product_name', 'price', 'stock'],
    include: [
      { model: Category, attributes: ['category_name'] },
      { model: Tag, attributes: ['tag_name'] }
    ]
  })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Fetch a single product by its ID with category and tags
router.get('/:id', (req, res) => {
  Product.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'product_name', 'price', 'stock'],
    include: [
      { model: Category, attributes: ['category_name'] },
      { model: Tag, attributes: ['tag_name'] }
    ]
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({message: 'No product found with this id'});
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new product with optional tag associations
router.post('/', (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tagIds: req.body.tagIds
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map(tag_id => ({ product_id: product.id, tag_id }));
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then(productTagIds => res.status(200).json(productTagIds))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update a product's details, including associated tags
router.put('/:id', (req, res) => {
  Product.update(req.body, { where: { id: req.params.id } })
    .then(() => ProductTag.findAll({ where: { product_id: req.params.id } }))
    .then(productTags => {
      const existingTagIds = productTags.map(({ tag_id }) => tag_id);
      const newTags = req.body.tagIds.filter(tag_id => !existingTagIds.includes(tag_id))
                      .map(tag_id => ({ product_id: req.params.id, tag_id }));
      const tagsToRemove = productTags.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                            .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: tagsToRemove } }),
        ProductTag.bulkCreate(newTags),
      ]);
    })
    .then(updatedProductTags => res.json(updatedProductTags))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Delete a product by its ID
router.delete('/:id', (req, res) => {
  Product.destroy({ where: { id: req.params.id } })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({message: 'No product found with this id'});
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
