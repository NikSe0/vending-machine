<script setup lang="ts">

defineProps({
  isOpen: Boolean
})

defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div class="dialog flex-with-center" v-if="isOpen">
      <div class="dialog__content">
        <div class="dialog__title">
          <slot name="title" />

          <button class="dialog__title__close" @click="$emit('close')">
            <span>x</span>
          </button>
        </div>

        <div class="dialog__body">
          <slot name="body" />
        </div>

        <div class="dialog__action">
          <slot name="actions" />
        </div>
      </div>
      <div class="dialog__cover" @click="$emit('close')"/>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>

.dialog{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  &__cover{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(51, 51, 51, .6);
    z-index: 0;
  }

  &__content{
    padding: 16px;
    z-index: 1;
    position: relative;
    border-radius: 4px;
    background-color: white;
  }

  &__title{
    padding: 0 32px 8px 0;
    &__close{
      position: absolute;
      top: 5px;
      right: 5px;
      border: none;
      background-color: transparent;
      font-size: 24px;
      width: 32px;
      height: 32px;
      padding: 0;
      line-height: 0;
      font-weight: 600;
      &:hover{
        background-color: rgba(0, 0, 0, .1);
      }

      &:active{
        background-color: rgba(0, 0, 0, .4);
      }
    }
  }
}
</style>