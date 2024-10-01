<template>
    <div :class="[{ show: isOpen }, 'modal fade']" @click.self="close">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Thông tin chi tiết sản phẩm</h5>
                    <button type="button" class="close" @click="close">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body" v-if="product">
                    <img :src="product.image" alt="Product image" class="product-img" />
                    <h3 class="limit-text-2">{{ product.name }}</h3>
                    <p class="product-price">Giá: {{ product.price }} VND</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="close">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Product } from '@/types/product.type'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        product: {
            type: Object as PropType<Product | null>,
            required: false
        },
        isOpen: {
            type: Boolean,
            required: true
        }
    },
    emits: ['close'],

    setup(props, { emit }) {
        const close = () => {
            emit('close')
        }

        return {
            close
        }
    }
})
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    display: block;
    overflow: hidden;
    outline: 0;
    background-color: rgba(86, 86, 86, 0.8);
}

.fade {
    opacity: 0;
    transition: opacity 0.15s linear;
}

.show {
    opacity: 1;
}

.modal-dialog {
    top: 50%;
    left: 50%;
    width: 50%;
    height: 60%;
    margin: 0.5rem;
    position: absolute;
    pointer-events: none;
    transform: translate(-50%, -50%);
}

.modal-content {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    outline: 0;
}

.modal-header {
    display: flex;
    padding: 1rem;
    justify-content: space-between;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    border-bottom: 1px solid #e9ecef;

    .close {
        cursor: pointer;
    }
}

.modal-body {
    position: relative;
    padding: 1rem;

    .product-img {
        width: 200px;
        height: 200px;
    }

    .product-price {
        color: red;
        font-size: 16px;
    }
}

.modal-footer {
    display: flex;
    padding: 1rem;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid #e9ecef;
}
</style>
