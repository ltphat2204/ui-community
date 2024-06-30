import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"; 
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import firebaseErrorParser from '~/utils/firebaseErrorParser'

const handleLogin = async (auth, type, payload) => {
    try {
        switch (type) {
            case 'email':
                return await handleLoginByEmailAndPassword(auth, payload)
            case 'google':
                return await handleLoginByGoogle(auth)
            case 'github':
                return await handleLoginByGithub(auth)
            default:
                throw new Error('Invalid login type')
        }
    } catch (err) {
        throw err
    }
}

const handleLoginByEmailAndPassword = async (auth, payload) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, payload.email, payload.password)
        return user
    } catch (err) {
        throw firebaseErrorParser[err.code]
    }
}

const handleOAuthLogin = async (auth, provider) => {
    try {
        const { user } = await signInWithPopup(auth, provider)
        return user
    } catch (err) {
        throw firebaseErrorParser[err.code]
    }
}

const handleLoginByGoogle = async (auth) => {
    try {
        const googleProvider = new GoogleAuthProvider();
        return await handleOAuthLogin(auth, googleProvider)
    } catch (err) {
        throw firebaseErrorParser[err.code] || err.message
    }
}

const handleLoginByGithub = async (auth) => {
    try {
        const githubProvider = new GithubAuthProvider();
        return await handleOAuthLogin(auth, githubProvider)
    } catch (err) {
        throw firebaseErrorParser[err.code] || err.message
    }
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            loginMethod: handleLogin
        }
    }
})