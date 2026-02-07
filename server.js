const http = require('http');
const app = require('./app');         
const connectDB = require('./config/db');
const { port } = require('./config/config');

// connect to db, only after start server
connectDB().then(() => {
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error("Failed to start server:", err);
});
