import fs from 'fs-extra';
import path from 'path';
import { createSpinner } from './spinner.js';
import { success, error, info } from './colors.js';

export const createProject = async (answers) => {
    const source = path.resolve('templates');
    const destination = process.cwd();

    const spinner = createSpinner('Copying project files...').start();
    try {
        await fs.copy(source, destination);
        spinner.succeed(success('Copied project files!'));

        if (!answers.auth) {
            await fs.remove(path.join(destination, 'middleware/authMiddleware.js'));
            await fs.remove(path.join(destination, 'utils/generateToken.js'));
        }

        if (!answers.env) {
            await fs.remove(path.join(destination, '.env'));
        }

        console.log(success('\n✔ Project setup completed!'));
        console.log(info('\nNext steps:\n'));
        console.log('Run `npm install`');
        console.log('Run `npm run dev`\n');
    } catch (err) {
        spinner.fail(error('Failed to copy files.'));
        console.error(err);
    }
};
