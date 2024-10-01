<template>
    <MainScreen v-if="statusMatch === 'default'" @onStart="onHandleBeforeStart($event)" />
    <InteractScreen
        v-if="statusMatch === 'match'"
        :cardsContext="settings.cardsContext"
        @onFinish="onGetResult"
    />
    <ResultScreen
        v-if="statusMatch === 'result'"
        :timer="timer"
        @onStartAgain="statusMatch = 'default'"
    />
    <p v-if="statusMatch === 'default'" class="copyright">
        game owned by RHP Team in Vue 3 course for begginers
    </p>
</template>

<script lang="ts">
import { shuffled } from '@/utils'
import { defineComponent, ref } from 'vue'
import { Setting } from '@/types/game.type'
import MainScreen from '@/components/mini-game/MainScreen.vue'
import ResultScreen from '@/components/mini-game/ResultScreen.vue'
import InteractScreen from '@/components/mini-game/InteractScreen.vue'

export default defineComponent({
    name: 'MiniGame',

    setup() {
        const timer = ref(0)
        const settings = ref<Setting>({
            totalOfBlocks: 0,
            cardsContext: [],
            startedAt: null
        })
        const statusMatch = ref<'default' | 'match' | 'result'>('default')

        const onHandleBeforeStart = (configs) => {
            settings.value.totalOfBlocks = configs.totalOfBlocks

            const firtCards = Array.from({ length: configs.totalOfBlocks / 2 }, (_, i) => i + 1)
            const secondCards = [...firtCards]
            const cards = [...firtCards, ...secondCards]

            settings.value.cardsContext = shuffled(shuffled(shuffled(cards)))
            settings.value.startedAt = new Date().getTime()

            statusMatch.value = 'match'
        }

        const onGetResult = () => {
            statusMatch.value = 'result'
            timer.value = new Date().getTime() - settings.value.startedAt!
        }

        return { statusMatch, onHandleBeforeStart, settings, timer, onGetResult }
    },
    components: {
        MainScreen,
        InteractScreen,
        ResultScreen
    }
})
</script>

<style lang="scss" scoped>
.copyright {
    position: fixed;
    left: 50%;
    bottom: 1.5rem;
    color: var(--light);
    z-index: 3;
    font-size: 1.5rem;
    transform: translateX(-50%);
}
</style>
