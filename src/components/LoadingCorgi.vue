<template>
    <div class="loading-corgi" v-if="loading">
        <div class="load">
            <ul style="list-style-type:none">
                <li>
                    <div class="string"></div>
                </li>
                <li>
                    <div class="string"></div>
                </li>
                <li>
                    <div class="string"></div>
                </li>
                <li>
                    <div class="string"></div>
                </li>
            </ul>
        </div>
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

.load li {
    background-color: #3949AB;
    position: absolute;
    top: 50%;
    left: 47%;
    width: 20px;
    height: 20px;
    content: "";
    margin: 10px 10px;
    border-radius: 100%;
    transform: translate3d(0px, -30px, 10px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
    animation: loading 0.6s ease-in-out infinite alternate;
}

.string {
    position: absolute;
    width: 3px;
    height: 100vh;
    background: linear-gradient(180deg, transparent, rgba(205, 205, 205, 0.4) 20%, rgba(255, 255, 255, 0.8) 50%, rgba(205, 205, 205, 0.4) 80%, transparent);
    left: 7px;
    top: -100vh;
    transform-origin: bottom;
    animation: stringMove 0.8s ease-in-out infinite alternate;
}

.load li:nth-child(2) {
    background-color: #e74c3c;
    left: 50%;
    animation: loading1 0.6s ease-in-out infinite alternate;
    animation-delay: 0.3s;
}

.load li:nth-child(2) .string {
    animation-delay: 0.3s;
}

.load li:nth-child(3) {
    background-color: #f1c40f;
    left: 53%;
    animation: loading2 0.6s ease-in-out infinite alternate;
    animation-delay: 0.6s;
}

.load li:nth-child(3) .string {
    animation-delay: 0.6s;
}

.load li:nth-child(4) {
    background-color: #2ecc71;
    left: 56%;
    animation: loading3 0.6s ease-in-out infinite alternate;
    animation-delay: 0.9s;
}

.load li:nth-child(4) .string {
    animation-delay: 0.9s;
}

@keyframes loading {
    to {
        transform: translate3d(0, 30px, 10px);
        box-shadow: 0 8px 16px rgba(52, 152, 219, 0.4), 0 4px 8px rgba(52, 152, 219, 0.2);
    }
}

@keyframes loading1 {
    to {
        transform: translate3d(0, 30px, 10px);
        box-shadow: 0 8px 16px rgba(189, 8, 28, 0.4), 0 4px 8px rgba(189, 8, 28, 0.2);
    }
}

@keyframes loading2 {
    to {
        transform: translate3d(0, 30px, 10px);
        box-shadow: 0 8px 16px rgba(243, 156, 18, 0.4), 0 4px 8px rgba(243, 156, 18, 0.2);
    }
}

@keyframes loading3 {
    to {
        transform: translate3d(0, 30px, 10px);
        box-shadow: 0 8px 16px rgba(39, 174, 96, 0.4), 0 4px 8px rgba(39, 174, 96, 0.2);
    }
}

@keyframes stringMove {
    to {
        transform: scaleY(1.4);
    }
}
</style>