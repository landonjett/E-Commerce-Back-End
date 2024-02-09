const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Handles API requests for the 'tags' endpoint

// Retrieve all tags along with their associated products
router.get('/', (req, res) => {
  Tag.findAll({
    // Includes product data in the response
    include: {
      model: Product,
      // Specifies which product attributes to include
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  // Sends the retrieved data as JSON
  .then(dbTagData => res.json(dbTagData))
  // Catches and sends any errors
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Retrieve a specific tag by ID, including products associated with it
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
  // Sends the found tag data as JSON
  .then(dbTagData => res.json(dbTagData))
  // Catches and sends any errors
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Creates a new tag with the provided name
router.post('/', (req, res) => {
  Tag.create({ tag_name: req.body.tag_name })
  // Sends the created tag data as JSON
  .then(dbTagData => res.json(dbTagData))
  // Catches and sends any errors
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Updates the name of an existing tag by its ID
router.put('/:id', (req, res) => {
  Tag.update(req.body, { where: { id: req.params.id } })
  // Checks if the update was successful and sends the updated data
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({message:'No tag found with this ID'});
      return;
    }
    res.json(dbTagData);
  })
  // Catches and sends any errors
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Deletes a tag by its ID
router.delete('/:id', (req, res) => {
  Tag.destroy({ where: { id: req.params.id } })
  // Confirms deletion or sends a not found message
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({message: 'No tag found with this ID'});
      return;
    }
    res.json(dbTagData);
  })
  // Catches and sends any errors
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
