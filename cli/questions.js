import inquirer from 'inquirer';

export const askQuestions = () => {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'auth',
            message: 'Do you want authentication middleware?',
            default: true
        },
        {
            type: 'confirm',
            name: 'env',
            message: 'Do you want .env file example?',
            default: true
        }
    ]);
};
