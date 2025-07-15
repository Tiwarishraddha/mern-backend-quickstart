#!/usr/bin/env node
import { showBanner } from './banner.js';
import { askQuestions } from './questions.js';
import { createProject } from './actions.js';

showBanner();
askQuestions().then(answers => createProject(answers));
