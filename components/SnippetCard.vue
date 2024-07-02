<script setup>

const { snippet } = defineProps({
    snippet: {
        type: Object,
        required: true
    }
});

const iframeContent = computed(() => {
    return `
    <html>
    <head>
      <style>
        ${snippet.css}
      </style>
    </head>
    <body style="overflow: hidden">
        <div style="width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;">
            ${snippet.html}
        </div>
    </body>
    </html>
    `;
});
</script>

<template>
    <div class="md:basis-1/3 w-1/3 bg-white p-4 rounded-md shadow-md">
      <h2 class="font-semibold text-xl">{{ snippet.title }}</h2>
      <h5 class="font-medium text-base mb-4">{{ snippet.author }}</h5>
      <div class="bg-gray-200 flex items-center justify-center">
        <iframe :srcdoc="iframeContent" frameborder="0" height="300" width="500"></iframe>
      </div>
    </div>
</template>
