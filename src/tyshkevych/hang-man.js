import Plugin from '../plugin-system/plugin.class';

import fireStoreHandler from './fire-storage/fire-store-hundler';

export default class hangMan extends Plugin {
    static options = {};

    init() {
        this.initKeyboard();
        this.getRandomWord();
    }

    initKeyboard() {
        const keyboard = this.el.querySelector('.keyboard');
        for (let i = 97; i <= 122; i++) {
            const button = document.createElement('button');
            button.innerText = String.fromCharCode(i);
            keyboard.appendChild(button)
        }
    }

    async getRandomWord() {
        const words = await fireStoreHandler.getDocsByName('words');
        const {word, hint}  = words[Math.floor(Math.random() * words.length)];
    }
}
