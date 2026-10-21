const app = require('./app');
const { connectDb } = require('./db');
const { port } = require('./config');

async function start() {
  await connectDb();
  app.listen(port, () => console.log(`AuthMaster lab listening on port ${port}`));
}

start().catch(error => {
  console.error('Startup failed:', error.message);
  process.exit(1);
});
