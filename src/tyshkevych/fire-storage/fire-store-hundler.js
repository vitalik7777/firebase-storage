import Plugin from '../../plugin-system/plugin.class';
import {initializeApp} from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD2phOVDNuEHTJBoQGmBE_NHU5MMZLv-KQ",
    authDomain: "my-storage-be99e.firebaseapp.com",
    projectId: "my-storage-be99e",
    storageBucket: "my-storage-be99e.appspot.com",
    messagingSenderId: "746546208974",
    appId: "1:746546208974:web:92a45ac3b4f032305a309f"
};

export default class fireStoreHandler extends Plugin {
    static options = {};

    static init() {
        initializeApp(firebaseConfig);

        this.db = getFirestore();
    }

    static getColRef(docName) {
        return collection(this.db, docName);
    }


    static async getDocsByName(docName) {
        const snapshot = await getDocs(this.getColRef(docName));
        let arr =[];
        for (const doc of snapshot.docs) {
            arr.push({...doc.data(), id: doc.id})
        }
        return arr;
    }

}
