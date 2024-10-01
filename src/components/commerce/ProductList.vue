<template>
    <h1 class="heading">DANH SÁCH SẢN PHẨM</h1>
    <div class="product-list">
        <div
            v-for="product in products"
            :key="product._id"
            class="product-card"
            @click="openModal(product)"
        >
            <img :src="product.image" alt="Product image" class="product-img" />
            <div class="product-info">
                <h3 class="limit-text-2">{{ product.name }}</h3>
                <p class="product-price">{{ product.price }} VND</p>
            </div>
        </div>
    </div>

    <div class="pagination-wrapper">
        <div class="pagination">
            <button
                class="btn btn-secondary"
                @click="fetchProducts(currentPage - 1)"
                :class="{ disabale: currentPage <= 1 }"
            >
                Prev
            </button>
            <div class="pagination-list">
                <button
                    v-for="page in pages"
                    :key="page"
                    :class="[{ 'btn-primary': page === currentPage }, 'btn']"
                    @click="fetchProducts(page)"
                >
                    {{ page }}
                </button>
            </div>
            <button
                class="btn btn-secondary"
                @click="fetchProducts(currentPage + 1)"
                :class="{ disabale: currentPage >= totalPages }"
            >
                Next
            </button>
        </div>
    </div>

    <Modal
        v-if="isModalOpen"
        :product="selectedProduct"
        :isOpen="isModalOpen"
        @close="closeModal"
    />
</template>

<script lang="ts">
import Modal from './Modal.vue'
import http from '@/composables/http'
import { Product } from '@/types/product.type'
import { defineComponent, ref, onMounted, computed } from 'vue'

export default defineComponent({
    components: { Modal },
    setup() {
        const LIMIT = 20
        const products = ref<Product[]>([])
        const currentPage = ref(1)
        const totalPages = ref(1)
        const isModalOpen = ref(false)
        const selectedProduct = ref<Product | null>(null)

        // Mảng chứa số trang để hiển thị trong pagination
        const pages = computed(() => {
            return Array.from({ length: totalPages.value }, (_, i) => i + 1)
        })

        const fetchProducts = async (page: number = 1) => {
            try {
                const response = await http.get(`/products?page=${page}&limit=${LIMIT}`)

                products.value = response.data.products
                currentPage.value = response.data.pagination.page
                totalPages.value = response.data.pagination.page_size

                // Cuộn trang lên đầu với hiệu ứng mượt mà
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            } catch (error) {
                console.error(error)
            }
        }

        onMounted(() => {
            fetchProducts()
        })

        const openModal = (product: Product) => {
            selectedProduct.value = product
            isModalOpen.value = true
        }

        const closeModal = () => {
            isModalOpen.value = false
            selectedProduct.value = null
        }

        return {
            products,
            currentPage,
            totalPages,
            fetchProducts,
            isModalOpen,
            selectedProduct,
            openModal,
            closeModal,
            pages
        }
    }
})
</script>

<style lang="scss" scoped>
.heading {
    font-size: 30px;
    color: #565656;
    font-weight: 700;
    text-align: center;
    margin-bottom: 40px;
}

.product-list {
    gap: 18px 14px;
    width: 80vw;
    display: flex;
    margin: 0 auto;
    flex-wrap: wrap;

    .product-card {
        flex-grow: 1;
        flex-basis: calc(20% - 14px);
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

        .product-img {
            width: 100%;
        }

        .product-info {
            padding: 8px;

            .product-price {
                font-weight: 600;
                color: red;
            }
        }
    }
}

.pagination-wrapper {
    display: flex;

    .pagination {
        display: flex;
        margin: 20px auto;

        .pagination-list {
            gap: 8px;
            margin: 0 8px;
            display: flex;
        }

        .disabale {
            opacity: 0.65;
            cursor: not-allowed;
        }
    }
}
</style>
