import express from 'express';

const app = express();

// Read all files in public folder
app.use(express.static('public'));

// Parse request body data
app.use(express.json());

app.get('/', (req, res) => {
  req.redirect('/index.html');
});

app.get('/todos', (req, res) => {
  res.send([
    { label: 'Learn JS', completed: false },
    { label: 'Learn Node', completed: false },
    { label: 'Learn CSS', completed: false },
  ]);
});

app.post('/hi', (req, res) => {
  // let data = '';

  // req.on('data', info => (data += info));
  // req.on('end', () => {
  //   console.log(data, '>>>>>>>');
  //   res.status(201).send({ status: 'OK' });
  // });
  console.log(req.body, '>>>>>>>');
  res.status(201).send({ status: 'OK' });
});

app.listen(3001);
