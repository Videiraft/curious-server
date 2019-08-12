require('dotenv').config();

const app = require('./app');
const db = require('./models');

const { PORT } = process.env;

db.sequelize.sync().then(() => {
  app.listen({ port: PORT }, () => {
    // eslint-disable-next-line no-console
    console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
  });
});
