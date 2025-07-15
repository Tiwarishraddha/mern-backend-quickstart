import ora from 'ora';

export const createSpinner = (text) => ora({ text, color: 'cyan' });
