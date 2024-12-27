import { promises as fs } from 'fs';
import path from 'path';
import { json } from 'stream/consumers';
import { v4 as uuidv4 } from 'uuid';

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
        );
        console.log('Repository initialized successfully!');
    } catch (error) {
        console.log('Error intializing repository:', error);
    }
};

const addFile = async (filePath) => {
    const repoPath = path.resolve(process.cwd(), '.abhiGit');
    const stagingPath = path.join(repoPath, 'staging');

    try {
        await fs.mkdir(stagingPath, { recursive: true });
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagingPath, fileName));

        console.log(`File ${fileName} added to staging area!`);
    } catch (error) {
        console.log('Error adding file:', error);
    }
};

const commit = async (message) => {
    const repoPath = path.resolve(process.cwd(), '.abhiGit');
    const stagedPath = path.join(repoPath, 'staging');
    const commitsPath = path.join(repoPath, 'commits');

    try {
        const commitID = uuidv4();
        const commitDir = path.join(commitsPath, commitID);
        await fs.mkdir(commitDir, { recursive: true });

        const files = await fs.readdir(stagedPath);
        for (const file of files) {
            await fs.copyFile(
                path.join(stagedPath, file),
                path.join(commitDir, file)
            );
        }

        await fs.writeFile(
            path.join(commitDir, 'commit.json'),
            JSON.stringify({
                message,
                date: new Date().toISOString(),
            })
        );
        console.log(`Commit ${commitID} created with message: ${message}`);
    } catch (error) {
        console.log('Error committing files:', error);
    }
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
