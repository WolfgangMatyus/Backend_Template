const express = require('express');
const bodyParser = require('body-parser');
const membersRoute = require('../routes/members');
const app = express();

app.use(bodyParser.json());

app.use('/api/v1/members', membersRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
