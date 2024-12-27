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

yargs(hideBin(process.argv))
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
