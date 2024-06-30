<script setup>
import { createUserWithEmailAndPassword } from "firebase/auth"
import firebaseErrorParser from '~/utils/firebaseErrorParser'

const email = ref('')
const password = ref('')
const password2 = ref('')
const error = ref('')
const isSubmitting = ref(false)
const isSuccessful = ref(false)

const { $firebaseAuth } = useNuxtApp()

const handleRegister = async () => {
    try {
        if (password.value !== password2.value) {
            error.value = 'Password does not match'
            return
        }

        isSubmitting.value = true
        const { user } = await createUserWithEmailAndPassword ($firebaseAuth, email.value, password.value)

        isSubmitting.value = false
        isSuccessful.value = true

        setTimeout(async () => {
            await navigateTo('/')
        }, 500);
    } catch (err) {
        error.value = firebaseErrorParser[err.code]
    }
}
</script>

<template>
    <form class="w-fit mx-auto bg-white border border-gray-300 rounded-lg py-8 px-16 shadow" @submit.prevent="handleRegister">
        <h1 class="text-4xl font-bold">Join us for free</h1>
        <h3 class="text-xl">Register new account</h3>
        <div class="mt-8 flex flex-col gap-2">
            <label for="email">Email:</label>
            <input required placeholder="example@something.com"class="outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 p-2" type="email" id="email" v-model="email">
        </div>
        <div class="mt-4 flex flex-col gap-2">
            <label for="password">Password:</label>
            <input required placeholder="Your password" class="outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 p-2" type="password" id="password" v-model="password">
        </div>
        <div class="mt-4 flex flex-col gap-2">
            <label for="password">Re-Password:</label>
            <input required placeholder="Retype your password here" class="outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 p-2" type="password" id="password2" v-model="password2">
        </div>
        <div class="mt-2 text-red-500" v-if="error">{{error}}</div>
        <div class="mt-4 w-full">
            <button :disabled="isSubmitting" :class="isSuccessful ? 'bg-emerald-500' : 'bg-gray-700'" class="w-full text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                Register 
                <Icon class="text-2xl" v-if="isSubmitting" name="eos-icons:bubble-loading"/>
                <Icon class="text-2xl" v-if="isSuccessful" name="material-symbols:check-circle"/>
            </button>
        </div>
        <div>
            <p class="mt-4">Already have an account?  <NuxtLink to="/login" class="text-sky-700">Login</NuxtLink></p>
        </div>
    </form>
</template>