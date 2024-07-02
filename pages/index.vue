<script setup>
import MockData from '~/utils/mockData.json'
const search = ref('')
const focus = ref(null)
const snippets = ref(MockData)

const handleSearch = async () => {
    const searchQuery = search.value
    const url = `/search?query=${searchQuery}`

    if (searchQuery) {
        await navigateTo(url)
    }
}

onMounted(() => {
    focus.value.focus()
})
</script>

<template>
    <section class="w-full max-w-[800px] mx-auto flex flex-col items-center gap-2 text-center">
        <h1 class="text-4xl md:text-6xl font-bold">UI snippets sharing platform</h1>
        <p class="text-sm md:text-lg">Where you can share your UI snippets with the world.</p>
    </section>
    <section class="mt-8">
        <form @submit.prevent="handleSearch" class="w-full max-w-[800px] mx-auto border border-gray-300 rounded-lg py-2 px-4 bg-white flex items-center">
            <input ref="focus" type="text" placeholder="Search for snippets" class="w-full outline-none bg-transparent" v-model="search">
            <NuxtLink :to="search ? `/search?query=${search}` : ''">
                <Icon class="text-2xl" name="material-symbols:search"/>
            </NuxtLink>
        </form>
    </section>
    <section class="mt-8">
        <h2 class="text-2xl font-bold mb-8">Featured snippets</h2>
        <div class="flex flex-wrap gap-4">
            <SnippetCard v-for="snippet in snippets" :key="snippet.id" :snippet="snippet"/>
        </div>
    </section>
</template>