<template>
    <header class="w-full max-w-[1100px] mx-auto px-4 py-2 bg-white mt-4 rounded-full flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center">
            <img src="/logo.png" alt="logo" class="h-12 w-12 inline-block mr-2 rounded-full">
            <span class="text-2xl font-black bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-900 inline-block text-transparent bg-clip-text">UI Community</span>
        </NuxtLink >
        <div class="text-4xl text-gray-700 flex gap-4">
            <NuxtLink to="/help">
                <Icon name="material-symbols-light:help"/>
            </NuxtLink>
            <NuxtLink to="/login">
                <Icon class="cursor-pointer" name="material-symbols:account-circle"/>
            </NuxtLink>
        </div>
    </header>
</template>