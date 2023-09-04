import Plugin from '../../plugin-system/plugin.class';
import {initializeApp} from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    addDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD2phOVDNuEHTJBoQGmBE_NHU5MMZLv-KQ",
    authDomain: "my-storage-be99e.firebaseapp.com",
    projectId: "my-storage-be99e",
    storageBucket: "my-storage-be99e.appspot.com",
    messagingSenderId: "746546208974",
    appId: "1:746546208974:web:92a45ac3b4f032305a309f"
};

export default class innitStorage extends Plugin {
    static options = {};

    init() {
        initializeApp(firebaseConfig);

        this.db = getFirestore();

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

     getColRef(docName) {
        return collection(this.db, docName);
    }


    async getDocsByName(docName) {
        const snapshot = await getDocs(this.getColRef(docName));
        let arr =[];

        for (const doc of snapshot.docs) {
            arr.push({...doc.data(), id: doc.id})
        }
        return arr;
    }

    async drawCategories() {
        const result = await this.getDocsByName('categories');
        for(const res of result) {
            const span = document.createElement('span');
            span.dataset.id = res.id;
            span.innerText = res.name;
            document.querySelector('.categories').appendChild(span);
        }
    }

    async drawPost(catId) {
        let result = await this.getDocsByName('post');
        result = result.find((item) => item.cat_id === catId);
        document.querySelector('.main-content').innerHTML = result.content;
    }
}
