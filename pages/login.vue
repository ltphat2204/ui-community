<script setup>
import firebaseErrorParser from '~/utils/firebaseErrorParser'
import { signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth"; 
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const email = ref('')
const password = ref('')
const error = ref('')

const isSubmitting = ref(false)
const isSuccessful = ref(false)

const focus = ref(null)

const userStore = useUserStore()

const { $firebaseAuth, $loginMethod } = useNuxtApp()

const handleLogin = async (type, payload) => {
    try {
        isSubmitting.value = true
        const user = await $loginMethod($firebaseAuth, type, payload)
        userStore.setUser(user)
    
        isSubmitting.value = false
        isSuccessful.value = true

        setTimeout(async () => {
            await navigateTo('/')
        }, 500);
    } catch (err) {
        isSubmitting.value = false
        error.value = err
    }
}

onMounted(async () => {
    if (userStore.isLoggedIn) {
        await navigateTo('/')
    }

    focus.value.focus()
})
</script>

<template>
    <form class="w-fit mx-auto bg-white border border-gray-300 rounded-lg py-8 px-16 shadow" @submit.prevent="handleLogin('email', { email, password })">
        <h1 class="text-4xl font-bold">Welcome back</h1>
        <h3 class="text-xl">Login to continue</h3>
        <div class="mt-8 flex flex-col gap-2">
            <label for="email">Email:</label>
            <input ref="focus" placeholder="example@something.com"class="outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 p-2" type="email" id="email" v-model="email">
        </div>
        <div class="mt-4 flex flex-col gap-2">
            <label for="password">Password:</label>
            <input placeholder="your password" class="outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 p-2" type="password" id="password" v-model="password">
        </div>
        <div class="mt-2 text-red-500" v-if="error">{{error}}</div>
        <div class="mt-2">
            <NuxtLink to="/forgot-password" class=" text-sky-700 underline underline-offset-4">Forgot password?</NuxtLink>
        </div>
        <div class="mt-4 w-full">
            <button :disabled="isSubmitting" :class="isSuccessful ? 'bg-emerald-500' : 'bg-gray-700'" class="w-full text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                Login 
                <Icon class="text-2xl" v-if="isSubmitting" name="eos-icons:bubble-loading"/>
                <Icon class="text-2xl" v-if="isSuccessful" name="material-symbols:check-circle"/>
            </button>
        </div>
        <div>
            <p class="mt-4">Don't have an account? <NuxtLink to="/register" class="text-sky-700">Register</NuxtLink></p>
        </div>
        <div class="text-center my-4 overflow-hidden relative before:content-[''] before:absolute before:w-screen before:h-[1px] before:top-1/2 before:right-1/2 before:-translate-x-4 before:bg-gray-400 after:content-[''] after:absolute after:w-screen after:h-[1px] after:top-1/2 after:left-1/2 after:translate-x-4 after:bg-gray-400 bg-white">Or</div>
        <div @click="handleLogin('google')" class="w-full cursor-pointer text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 bg-gray-700">Sign in with <Icon class="text-xl" name="bi:google"/> </div>
        <div @click="handleLogin('github')" class="mt-4 w-full cursor-pointer text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 bg-gray-700">Sign in with <Icon class="text-2xl" name="mdi:github"/> </div>
    </form>
</template>