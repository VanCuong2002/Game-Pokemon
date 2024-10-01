<template>
    <div class="screen">
        <div
            class="screen__inner"
            :style="{
                width: `${
                    ((((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) / 4 + 16) *
                    Math.sqrt(cardsContext.length)
                }px`
            }"
        >
            <Card
                v-for="(card, index) in cards"
                :key="index"
                ref="cardRefs"
                :ref-for="true"
                :cardsContext="cardsContext"
                :imgBackFaceUrl="`images/${card}.png`"
                :card="{ index, value: card }"
                :rules="rules"
                @onFlip="checkRule($event)"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Card from './Card.vue'
import { defineComponent, ref, nextTick } from 'vue'

export default defineComponent({
    components: {
        Card
    },
    props: {
        cardsContext: {
            type: Array as () => number[],
            default: () => []
        }
    },
    emits: ['onFinish'],
    setup(props, { emit }) {
        const rules = ref<any[]>([])
        const cardRefs = ref<any[]>([])
        const isGameCompleted = ref<boolean>(false)
        const matchedPairs = ref<number>(0)
        const cards = ref([...props.cardsContext])

        const checkGameCompletion = () => {
            if (matchedPairs.value === props.cardsContext.length / 2) {
                setTimeout(() => {
                    emit('onFinish')
                }, 920)
            }
        }

        const checkRule = async (card: { index: number; value: number }) => {
            if (rules.value.length === 2) return false

            if (rules.value.length === 0) {
                rules.value.push(card)
            } else if (rules.value.length === 1) {
                if (rules.value[0].index !== card.index) {
                    rules.value.push(card)
                } else {
                    rules.value = []
                    return false
                }
            }

            if (rules.value.length === 2) {
                await nextTick()
                const firstCardIndex = rules.value[0]?.index
                const secondCardIndex = rules.value[1]?.index

                if (firstCardIndex !== undefined && secondCardIndex !== undefined) {
                    if (rules.value[0].value === rules.value[1].value) {
                        cardRefs.value[firstCardIndex].onEnableModeCard()
                        cardRefs.value[secondCardIndex].onEnableModeCard()
                        matchedPairs.value++
                        rules.value = []

                        checkGameCompletion()
                    } else {
                        setTimeout(() => {
                            cardRefs.value[firstCardIndex].onCloseCard()
                            cardRefs.value[secondCardIndex].onCloseCard()
                            rules.value = []
                        }, 800)
                    }
                } else {
                    console.error('Indices not found for the rules:', rules.value)
                }
            }
        }

        return {
            rules,
            cardRefs,
            checkRule,
            isGameCompleted,
            cards
        }
    }
})
</script>

<style scoped>
.screen {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: var(--dark);
    color: var(--light);
}

.screen__inner {
    width: calc(424px);
    display: flex;
    flex-wrap: wrap;
    margin: 2rem auto;
}
</style>
