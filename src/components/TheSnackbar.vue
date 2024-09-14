<script setup lang="ts">

import useBus, {type SnackbarEvent} from "@/composables/useBus";
import {onMounted, ref} from "vue";
import type {Maybe} from "@/typings";

const bus = useBus();

const isSnackbarOpened = ref<boolean>(false);
const snackbar = ref<SnackbarEvent>({ } as SnackbarEvent);


let timeout: Maybe<number>;
onMounted(() => {
  bus.on('snackbar:open', (event: SnackbarEvent) => {
    isSnackbarOpened.value = true;
    snackbar.value.status = event.status || 500;
    snackbar.value.body = event.body;
    snackbar.value.icon = event.icon;
    if(timeout)
      clearTimeout(timeout)

    timeout = setTimeout(() => isSnackbarOpened.value = false, 1500)
  })
})
</script>

<template>
  <Teleport to="body">
    <div class="snackbar" :class="{'is-opened': isSnackbarOpened}">
      <div class="snackbar__content">
        <div class="snackbar__icon flex-with-center">
          <div v-html="snackbar.icon" v-if="snackbar.icon"/>
          <div class="snackbar__badge"
               v-else
               :class="snackbar.status === 200 ? 'success' : 'error'"/>
        </div>
        <div class="snackbar__body">
          <div v-html="snackbar.body" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.snackbar{
  position: fixed;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  transition: bottom ease-out .350s;
  min-width: 300px;

  &.is-opened{
    bottom: 15px;
    transition: bottom ease-in .350s;
  }

  &__content{
    display: flex;
    padding: 8px 16px;
    background-color: #333;
    border-radius: 4px;
    color: white;
  }

  &__icon{
    margin-right: 16px;
  }

  &__badge{
    width: 8px;
    height: 8px;
    border-radius: 50%;


    &.success{
      background-color: #6fa720;
      box-shadow: 0 0 2px 2px #6fa720;
    }

    &.error{
      background-color: #f84949;
      box-shadow: 0 0 2px 2px #f84949;
    }
  }
}
</style>