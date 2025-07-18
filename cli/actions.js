import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { createSpinner } from './spinner.js';
import { success, error, info } from './colors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createProject = async (answers) => {
    const destination = process.cwd();
    const source = path.resolve(__dirname, '..', 'templates');

    const spinner = createSpinner('Copying project files...').start();

    try {
        await fs.copy(source, destination, {
            filter: (src) => {
                const rel = path.relative(source, src);
                if (rel.startsWith('node_modules')) return false;
                if (rel === '.env' || rel === '.env.example') return false;
                return true;
            }
        });

        spinner.succeed(success('Copied project files!'));

        // Remove auth-related files if user says no
        if (!answers.auth) {
            await fs.remove(path.join(destination, 'middleware', 'authMiddleware.js'));
            await fs.remove(path.join(destination, 'utils', 'generateToken.js'));
        }

        // Remove sample files if user says no
        if (!answers.sampleFiles) {
            await fs.remove(path.join(destination, 'models', 'sampleModel.js'));
            await fs.remove(path.join(destination, 'controllers', 'sampleController.js'));
            await fs.remove(path.join(destination, 'routes', 'sampleRoute.js'));

            // Also update server.js to remove sample imports
            const serverFilePath = path.join(destination, 'server.js');
            const simpleServerContent = `
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
            `.trim();

            await fs.writeFile(serverFilePath, simpleServerContent);
        
        }

        // If auth is selected, but sample is not selected, write clean middleware
        if (answers.auth) {
            const authFilePath = path.join(destination, 'middleware', 'authMiddleware.js');
            if (!answers.sampleFiles) {
                const cleanAuthMiddleware = `
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
`;
                await fs.writeFile(authFilePath, cleanAuthMiddleware.trim());
            }
        }

        // Always create .env with placeholders
        await fs.writeFile(
            path.join(destination, '.env'),
            'MONGODB_URL = <Enter your URL here>\nPORT = <Enter PORT here>\n'
        );

        console.log(success('\n✔ Project setup completed!'));
        console.log(info('\nNext steps:\n'));
        console.log('Run `npm install`');
        console.log('Run `npm run dev`\n');
    } catch (err) {
        spinner.fail(error('Failed to copy files.'));
        console.error(err);
    }
};
