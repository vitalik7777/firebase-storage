import Plugin from '../../plugin-system/plugin.class';
import {
    addDoc
} from 'firebase/firestore'

import fireStoreHandler from './fire-store-hundler';

export default class innitStorage extends Plugin {
    static options = {};

    init() {
        fireStoreHandler.init();

        const addPostForm = document.querySelector('.add-post');
        const removePost = document.querySelector('.remove-post');

        addPostForm.addEventListener('submit', (e) => {
            e.preventDefault();

            addDoc(this.getColRef('post'), {
                content: addPostForm.content.value,
                cat_id: 'shoUBok2olUUzmS71kBC'
            }).then(r => console.log('da'))
        });

        removePost.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        this.drawCategories().then(e => {
            const categories = document.querySelectorAll('.categories span');
            for (const item of categories) {
                item.addEventListener('click', (e) => {
                    this.drawPost(e.target.dataset.id)
                });
            }
        });
    }

    async drawCategories() {
        const result = await fireStoreHandler.getDocsByName('categories');
        for(const res of result) {
            const span = document.createElement('span');
            span.dataset.id = res.id;
            span.innerText = res.name;
            document.querySelector('.categories').appendChild(span);
        }
    }

    async drawPost(catId) {
        let result = await fireStoreHandler.getDocsByName('post');
        result = result.find((item) => item.cat_id === catId);
        document.querySelector('.main-content').innerHTML = result.content;
    }
}
