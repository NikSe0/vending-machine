<script setup lang="ts">
import useProduct from "@/structures/products/composables";
import CreateProduct from "@/structures/products/components/CreateProduct.vue";
import {onMounted, ref} from "vue";
import TheDialog from "@/components/TheDialog.vue";
import type {Product} from "@/structures/types";
import useBus from "@/composables/useBus";
import TheAddMoney from "@/components/TheAddMoney.vue";

const isCreateDialogOpened = ref<boolean>(false)
const totalCash = ref<number>(0)
const lastPurchase = ref<number>(0)
const creationIndex = ref<number>(-1)
const bus = useBus();
const {items: products, get, create, update} = useProduct()
await get()

onMounted(() => {
  bus.on('reset', async () => {
    await get()
    lastPurchase.value = 0
    totalCash.value = 0
  })
})

const buy = async (product: Product) => {
  if(!product)
    return

  if (totalCash.value < product.price) {
    bus.emit("snackbar:open", {
      body: `Insufficient funds!`
    })

    return
  }

  if(product.qty > 0){
    edit(product, product.qty - 1)
    bus.emit("snackbar:open", {
      body: `You bought ${product.name} for ${product.price.toFixed(2)}.`,
      status: 200
    })

    lastPurchase.value = totalCash.value - product.price
    totalCash.value = 0
  } else {
    bus.emit("snackbar:open", {
      body: `Not able to purchase ${product.name}!.`,
    })
  }
}

const edit = (product: Product, qty: number = 0) => {
  if (!product)
    return

  product.qty = qty
  update(product)
}

const onCreate = (index: number = 0) => {
  isCreateDialogOpened.value = true
  creationIndex.value = index
}

const add = (product: Product) => {
  isCreateDialogOpened.value = false
  create(product, creationIndex.value)
}

</script>

<template>
  <div>
    <div class="d-flex">
      <div class="flex-item" v-for="(item, index) in products">
        <template v-if="item">
          <div class="product">
            <div class="product__title flex-with-center">
              <img class="product__title__image" :src="item.image || './No-Image-Placeholder.png'" :alt="item.name">
              <div class="product__qty flex-with-center">
                <div class="product__qty__count flex-with-center">x{{item.qty}}</div>
                <button class="product__qty__add flex-with-center" @click="edit(item, item.qty + 1)">+</button>
              </div>
            </div>
            <div class="product__actions">
              <div class="product__actions__price flex-with-center">
                {{ item.price.toFixed(2) }}
              </div>
              <button class="product__actions__buy" @click="buy(item)">
                Buy
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="product">
            <div class="product__create flex-with-center">
              <button class="product__create__action" @click="onCreate(index)">+</button>
            </div>
          </div>
        </template>
      </div>
    </div>

    <TheDialog :is-open="isCreateDialogOpened" @close="isCreateDialogOpened = false">
      <template #title>
        <div class="h6">
          Add product
        </div>
      </template>

      <template #body>
        <CreateProduct @create="add" @cancel="isCreateDialogOpened = false"/>
      </template>
    </TheDialog>

    <TheAddMoney v-model="totalCash" :last-purchase="lastPurchase" @update:last-purchase="lastPurchase = $event"/>
  </div>
</template>

<style lang="scss" scoped>
.test {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-item {
  width: 33.3%;
  margin-bottom: 8px;
  background-color: rgba(51, 51, 51, .6);

  &:nth-child(3n + 2) {
    .product {
      &__actions {
        margin: 0 2px;
      }
    }
  }
}

.product {
  text-align: center;
  height: 100%;

  &__title {
    padding: 8px;
    margin: 0 1px;
    position: relative;

    &__image{
      max-width: 100%;
      height: 160px;
    }
  }

  &__qty {
    position: absolute;
    top: 0;
    right: 0;


    &__count, &__add {
      width: 30px;
      height: 30px;
      color: white;
      border: none;

      background-color: rgba(0, 0, 0, .6);
    }
    &__add{
      margin-left: 2px;
      font-size: 26px;
    }
  }

  &__create {
    width: 100%;
    height: 100%;
    background-color: rgba(51, 51, 51, .6);

    &__action {
      border: none;
      text-align: center;
      width: 50px;
      height: 50px;
      background-color: rgba(51, 51, 51, .7);
      font-size: 40px;
      font-weight: bold;
      color: white;
      border-radius: 4px;

      &:hover {
        background-color: rgba(255, 255, 255, .1);
      }

      &:active {
        background-color: rgba(255, 255, 255, .4);
      }
    }
  }

  &__image {
    width: 60px;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 568px) {
      flex-direction: column;
    }

    &__price, &__buy {
      border-radius: 0 !important;
    }

    &__price {
      color: white;
      display: block;
      background-color: #333;
      padding: 8px 16px;
      flex: 1;
    }

    &__buy {
      flex: 1;
      padding: 8px 16px;
      background: #6fa720;
      border: none;
      display: inline-block;
      text-decoration: none !important;
      color: #d2efa9;
      text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);

      &:hover {
        background-color: rgba(111, 167, 32, .9);
      }

      &:active {
        background-color: rgba(111, 167, 32, .8);
      }
    }
  }
}

.dialog {
  &__actions {
    font-size: 16px;
    background-color: transparent;
    padding: 4px 12px;

    & + & {
      margin-left: 8px;
    }

    &__cancel {
      background-color: transparent;
      border: none;
    }

    &__create {
      border: 1px solid #333;
    }

    &:active {
      background-color: rgba(0, 0, 0, .1);
    }
  }
}
</style>