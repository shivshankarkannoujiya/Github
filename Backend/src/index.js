import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
    addFile,
    commit,
    initRepo,
    pull,
    push,
    revert,
} from './controllers/gitCommands.controllers.js';
import dotenv from 'dotenv';
import { app } from './app.js';
import { connectDB } from './config/index.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config({
    path: './.env',
});

yargs(hideBin(process.argv))
    .command('start', 'start a new server', {}, startServer)
    .command(
        'init', // command
        'Initialize a new repository', // description
        {}, // parameter: empty during initialization
        initRepo // function to be called
    )
    .command(
        'add <file>',
        'add a file to repository',
        (yargs) => {
            yargs.positional('file', {
                type: 'string',
                describe: 'file to add to staging area',
            });
        },
        (argv) => {
            addFile(argv.file);
        }
    )
    .command(
        'commit <message>',
        'Commit the staged files',
        (yargs) => {
            yargs.positional('message', {
                type: 'string',
                describe: 'Commit message',
            });
        },
        (argv) => {
            commit(argv.message);
        }
    )
    .command('push', 'push commits to remote repository/s3', {}, push)
    .command('pull', 'pull commits from remote repository/s3', {}, pull)
    .command(
        'revert <commitID>',
        'Revert to spefic commit',
        (yargs) => {
            yargs.positional('commitID', {
                type: 'string',
                describe: 'Commit ID to revert to',
            });
        },
        revert
    )
    .demandCommand(1, 'You need at least one command before moving on')
    .help().argv;

const PORT = process.env.PORT || 8000;
function startServer() {
    connectDB()
        .then(() => {
            const httpServer = http.createServer(app);
            const io = new Server(httpServer, {
                cors: {
                    origin: process.env.CORS_ORIGIN,
                    methods: ['GET', 'POST'],
                },
            });

            let user;
            io.on('connection', (socket) => {
                socket.on('JoinRoom', (userId) => {
                    user = userId;
                    console.log(`==========`);
                    console.log(user);
                    console.log(`==========`);
                    socket.join(userId);
                });
            });

            httpServer.listen(PORT, () => {
                console.log(`Server is listening at port: ${PORT}`);
            });
        })
        .catch((error) => {
            console.error('MongoDB connection Error: ', error);
            process.exit(1);
        });
}
