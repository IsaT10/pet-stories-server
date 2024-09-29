import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';
import config from './config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.url as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main().catch((err) => console.log(err));

process.on('unhandledRejection', () => {
  console.log('UnhandledRejection 💥 Shutting Down...');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('UnhandledException 💥 Shutting Down...');
  process.exit(1);
});
