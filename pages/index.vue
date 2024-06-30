<script setup>
const search = ref('')

const handleSearch = async () => {
    const searchQuery = search.value
    const url = `/search?query=${searchQuery}`

    if (searchQuery) {
        await navigateTo(url)
    }
}
</script>

<template>
    <section class="w-full max-w-[800px] mx-auto flex flex-col items-center gap-2 text-center">
        <span class="text-xl font-black bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-900 inline-block text-transparent bg-clip-text">UI Community</span>
        <h1 class="text-6xl font-bold">UI snippets sharing platform</h1>
        <p class="text-lg">Where you can share your UI snippets with the world.</p>
    </section>
    <section class="w-full max-w-[1100px] mx-auto mt-8">
        <form @submit.prevent="handleSearch" class="w-full max-w-[800px] mx-auto border border-gray-300 rounded-lg py-2 px-4 bg-white flex items-center">
            <input type="text" placeholder="Search for snippets" class="w-full outline-none bg-transparent" v-model="search">
            <NuxtLink :to="search ? `/search?query=${search}` : ''">
                <Icon class="text-2xl" name="material-symbols:search"/>
            </NuxtLink>
        </form>
    </section>
</template>