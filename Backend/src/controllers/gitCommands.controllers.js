import { promises as fs } from 'fs';
import path from 'path';


const initRepo = async () => {
    const repoPath = path.resolve(process.cwd(), '.abhiGit');
    const commitsPath = path.join(repoPath, 'commits');

    try {
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(commitsPath, { recursive: true });

        await fs.writeFile(
            path.join(repoPath, 'config.json'),
            JSON.stringify({
                bucket: 'process.env.S3_BUCKET', // TODO: Make changes here
            })
        )
        console.log('Repository initialized successfully!');
    } catch (error) {
        console.log('Error intializing repository:', error);
    }
};


const addFile = async () => {
    console.log('add command called');
};

const commit = async () => {
    console.log('commit command called');
};

const push = async () => {
    console.log('push command called');
};

const pull = async () => {
    console.log('pull command called');
};

const revert = async () => {
    console.log('revert command called');
};

export { initRepo, addFile, commit, push, pull, revert };
