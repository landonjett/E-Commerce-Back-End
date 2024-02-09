const router = require('express').Router();
const { Category, Product } = require('../../models');

// Endpoint for all category-related routes

// GET request to fetch all categories with their related products
router.get('/', (req, res) => {
  // Retrieve all categories and their associated products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbCatData => {
      // Send 404 if no categories are found
      if(!dbCatData) {
        res.status(404).json({message: 'No categories found'});
        return;
      }
      // Respond with the retrieved categories data
      res.json(dbCatData);
    })
    .catch(err => {
      // Log and return any server errors
      console.log(err);
      res.status(500).json(err)
    });
});

// GET request to fetch a single category by its ID along with its related products
router.get('/:id', (req, res) => {
  // Retrieve a specific category by its id
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbCatData => {
      // Send 404 if the category is not found
      if(!dbCatData) {
        res.status(404).json({message: 'No category found with this ID'});
        return;
      }
      // Respond with the found category data
      res.json(dbCatData);
    })
    .catch(err => {
      // Log and return any server errors
      console.log(err);
      res.status(500).json(err)
    });
});

// POST request to create a new category
router.post('/', (req, res) => {
  // Create a new category with the provided name
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCatData => res.json(dbCatData))
    .catch(err => {
      // Log and return any server errors
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT request to update an existing category's name by its ID
router.put('/:id', (req, res) => {
  // Update the category's name where the ID matches
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbCatData => {
      // Send 404 if no category is found with the provided ID
      if (!dbCatData) {
        res.status(404).json({message:'No category found with this ID'});
        return;
      }
      // Respond with the updated category data
      res.json(dbCatData);
    })
    .catch(err => {
      // Log and return any server errors
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE request to remove a category by its ID
router.delete('/:id', (req, res) => {
  // Delete the category where the ID matches
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCatData => {
      // Send 404 if no category is found with the provided ID
      if (!dbCatData){
        res.status(404).json({message: 'No category found with that ID'});
        return;
      }
      // Respond with confirmation of deletion
      res.json(dbCatData);
    })
    .catch(err => {
      // Log and return any server errors
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
