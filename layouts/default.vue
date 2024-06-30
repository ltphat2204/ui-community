<template>
    <div class="bg-gray-200 h-screen w-screen overflow-auto px-4">
        <HeaderNav/>
        <main class="my-8 text-gray-700 max-w-[1100px] mx-auto">
            <slot></slot>
        </main>
    </div>
</template>