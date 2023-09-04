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

initializeApp(firebaseConfig);

const db = getFirestore();

const getColRef = function (docName) {
    return collection(db, docName);
}

const getDocsByName = async function (docName) {
    const snapshot = await getDocs(getColRef(docName));
    let arr =[];

    for (const doc of snapshot.docs) {
        arr.push({...doc.data(), id: doc.id})
    }
    return arr;
}

const addPostForm = document.querySelector('.add-post');
const removePost = document.querySelector('.remove-post');

const drawCategories = async  function () {
    const result = await getDocsByName('categories');
    for(const res of result) {
        const span = document.createElement('span');
        span.dataset.id = res.id;
        span.innerText = res.name;
        document.querySelector('.categories').appendChild(span);
    }
}

const drawPost = async function (catId) {
    let result = await getDocsByName('post');
    result = result.find((item) => item.cat_id === catId);
    document.querySelector('.main-content').innerHTML = result.content;
}
addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(getColRef('post'), {
        content: addPostForm.content.value,
        cat_id: 'shoUBok2olUUzmS71kBC'
    }).then(r => console.log('da'))
});

removePost.addEventListener('submit', (e) => {
    e.preventDefault();
});


drawCategories().then(e => {
    const categories = document.querySelectorAll('.categories span');
    for (const item of categories) {
        item.addEventListener('click', (e) => {
            drawPost(e.target.dataset.id)
        });
    }
});