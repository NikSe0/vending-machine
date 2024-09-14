<script setup lang="ts">
import ProductList from "@/structures/products/components/ProductList.vue";
import TheSnackbar from "@/components/TheSnackbar.vue";
import useBus from "@/composables/useBus";

const bus = useBus();

</script>

<template>
  <Suspense>
    <div>
      <div class="text-center">
        <button class="reset-btn" @click="bus.emit('reset', {})">Reset</button>
      </div>
      <div class="container flex-with-center">
        <div class="vending-machine">
          <ProductList />
        </div>
        <TheSnackbar />
      </div>
    </div>
  </Suspense>
</template>

<style lang="scss" scoped>

.container{
  margin: 20px 0;

  @media (max-width: 768px) {
    margin-bottom: 180px;
  }
}

.reset-btn{
  background-color: #f84949;
  color: #fff;
  border: none;
  font-size: 16px;
  padding: 8px 16px;
}

</style>
