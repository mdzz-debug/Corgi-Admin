<template>
    <div class="loading-corgi" v-if="loading">
        <img src="/loading.png" alt="Loading Corgi" class="corgi-image" />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    loading: boolean
}>()
</script>

<style scoped>
.loading-corgi {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 999;
    overflow: hidden;
}

.loading-corgi::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 20px;
    background: linear-gradient(90deg, transparent, rgba(66, 185, 131, 0.1), transparent);
    animation: wave 3s infinite linear;
    bottom: 40%;
}

.corgi-image {
    width: 100px;
    height: 100px;
    object-fit: contain;
    animation: crawl 4s infinite linear, bounce 1s infinite ease-in-out;
    margin: 0;
    padding: 0;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

@keyframes crawl {
    0% {
        transform: translateX(-100px) scaleX(1);
    }

    45% {
        transform: translateX(100px) scaleX(1);
    }

    50% {
        transform: translateX(100px) scaleX(-1);
    }

    95% {
        transform: translateX(-100px) scaleX(-1);
    }

    100% {
        transform: translateX(-100px) scaleX(1);
    }
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

@keyframes wave {
    0% {
        transform: translateX(-50%);
    }

    100% {
        transform: translateX(0);
    }
}

.dark .loading-corgi {
    background-color: rgba(0, 0, 0, 0.8);
}

.dark .loading-corgi::before {
    background: linear-gradient(90deg, transparent, rgba(64, 158, 255, 0.1), transparent);
}
</style>