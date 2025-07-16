import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { createSpinner } from './spinner.js';
import { success, error, info } from './colors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProject = async (answers) => {
    const destination = process.cwd();
    let source = '';

    if (answers.structure === 'Yes') {
        source = answers.sampleFiles === 'Yes'
            ? path.resolve(__dirname, '..', 'templates', 'full-with-sample')
            : path.resolve(__dirname, '..', 'templates', 'full-empty');
    } else {
        source = path.resolve(__dirname, '..', 'templates');
    }

    const spinner = createSpinner('Copying project files...').start();

    try {
        await fs.copy(source, destination, {
            filter: (src) => {
                const rel = path.relative(source, src);
                if (rel.startsWith('node_modules')) return false;
                if (rel === '.env') return false;
                return true;
            }
        });

        spinner.succeed(success('Copied project files!'));

        // Remove auth-related files if user says no
        if (!answers.auth) {
            await fs.remove(path.join(destination, 'middleware', 'authMiddleware.js'));
            await fs.remove(path.join(destination, 'utils', 'generateToken.js'));
        }

        // ✅ Remove sample files if user says no
        if (!answers.sampleFiles) {
            await fs.remove(path.join(destination, 'models', 'sampleModel.js'));
            await fs.remove(path.join(destination, 'controllers', 'sampleController.js'));
            await fs.remove(path.join(destination, 'routes', 'sampleRoute.js'));
        }

        // Always create an empty .env file
        await fs.writeFile(path.join(destination, '.env'), '');

        console.log(success('\n✔ Project setup completed!'));
        console.log(info('\nNext steps:\n'));
        console.log('Run `npm install`');
        console.log('Run `npm run dev`\n');
    } catch (err) {
        spinner.fail(error('Failed to copy files.'));
        console.error(err);
    }
};
