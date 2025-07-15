import figlet from 'figlet';
import gradient from 'gradient-string';

export function showBanner() {
    console.log(gradient.pastel(figlet.textSync('MERN BACKEND CLI')));
}
