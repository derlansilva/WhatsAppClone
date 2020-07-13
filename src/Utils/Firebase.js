const firebase = require('firebase')
require('firebase/firestore')

export default class Firebase {

    constructor(){

        this._config = {
            apiKey: "AIzaSyAYAN8hh8nR-WcRFcGVLSUUmLYu45N-1Ho",
            authDomain: "whatsapp-clone-1df84.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-1df84.firebaseio.com",
            projectId: "whatsapp-clone-1df84",
            storageBucket: "gs://whatsapp-clone-1df84.appspot.com",
            messagingSenderId: "452879521503",

          }

        this.init()
    }

    init(){

        if(!window._initializedFirebase){
            firebase.initializeApp(this._config);


            firebase.firestore().settings({});

            window._initializedFirebase = true
        }
    }


    static db(){

        return firebase.firestore()

    }

    static hd(){

        return firebase.storage()

    }

    initAuth(){

        return new Promise((s , f )=> {

            let provider = new firebase.auth.GoogleAuthProvider()
            
            firebase.auth().signInWithPopup(provider).then(result => {
                
                let token = result.credential.accessToken;
                let user = result.user;

                s({user , token })
            }).catch(err => {
                f(err)
            })
        })

    }
}