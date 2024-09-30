import connection from "../database/db_connection.js";

export const getAllCats = (req, res) => {
    
  const { page = 1, limit = 2 } = req.query;

  let query = `SELECT * FROM cats LIMIT ${(page - 1) * limit}, ${limit}`;

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
};


export const getCatById = (req, res) => {
  const { id } = req.params;

  connection.query('SELECT * FROM cats WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Cat not found');
      return;
    }
    res.json(results[0]);
  });
};

export const searchCatsByAge = (req, res) => {
    
    const { age_lte, age_gte } = req.query;
    const query = 'SELECT * FROM cats WHERE age >= ? AND age <= ?';
    
    connection.query(query, [age_lte,age_gte], (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(results);
    });
  };

export const createCat = (req, res) => {
  const { name, age, breed } = req.body;

  if (!name || !age || !breed) {
    res.status(400).send('All fields (name, age, breed) are required');
    return;
  }

  const query = 'INSERT INTO cats (name, age, breed) VALUES (?, ?, ?)';
  connection.query(query, [name, age, breed], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).json({ id: result.insertId, name, age, breed });
  });
};

export const updateCat = (req, res) => {
  const { id } = req.params;
  const { name, age, breed } = req.body;

  console.log(req.body);
  if (!name || !age || !breed) {
    res.status(400).send('All fields (name, age, breed) are required');
    return;
  }

  const query = 'UPDATE cats SET name = ?, age = ?, breed = ? WHERE id = ?';
  connection.query(query, [name, age, breed, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ id, name, age, breed });
  });
};

export const deleteCat = (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM cats WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: 'Cat deleted successfully' });
  });
};
