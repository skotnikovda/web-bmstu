require('dotenv').config();

const { createAgent } = require('@forestadmin/agent');
const {
  createMongooseDataSource,
} = require('@forestadmin/datasource-mongoose');
const mongoose = require('mongoose');
let connection = mongoose.createConnection('mongodb://127.0.0.1:27017');

// Create your Forest Admin agent
// This must be called BEFORE all other middleware on the app
createAgent({
  authSecret: process.env.FOREST_AUTH_SECRET,
  envSecret: process.env.FOREST_ENV_SECRET,
  isProduction: process.env.NODE_ENV === 'production',
})
  .addDataSource(createMongooseDataSource(connection))
  .mountOnStandaloneServer(3000)
  .start();
