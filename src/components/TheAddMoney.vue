<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  lastPurchase: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['update:modelValue','update:lastPurchase'])

const coins = [0.01, 0.1, 1, 2, 5]

const add = (value: number) => {
  let total = props.modelValue
  if(total + value < 100){
    total += value
    emit('update:modelValue', total)
  }
}

</script>

<template>
  <div class="money">
    <div class="money__total flex-with-center">
      {{modelValue.toFixed(2)}}
      <div>
        <small>max 100</small>
      </div>
    </div>

    <div class="coins">
      <div class="text-center m-b-2">
        Coins
      </div>
      <div class="coins__list">
        <button class="coins__list__item" v-for="item in coins" @click="add(item)">
          {{item}}
        </button>
      </div>
    </div>

    <div class="money__change flex-with-center">
      <button class="money__change__take"
              :class="{'is-active': lastPurchase}" :disabled="!lastPurchase"
              @click="$emit('update:lastPurchase',0)">
        <span class="text-center m-b-1">
          Take change
        </span>
        {{lastPurchase.toFixed(2)}}
      </button>
    </div>

  </div>
</template>

<style scoped lang="scss">
.money{
  background-color: white;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  display: grid;
  grid-template-areas: "total change" "coins coins";
  box-shadow: 0 -1px 1px #ccc;

  @media (min-width: 768px) {
    width: 80px;
    top: 50%;
    left: auto;
    bottom: auto;
    transform: translateY(-50%);
    box-shadow: -1px 0 2px #ccc;
    grid-template-areas: "total" "coins" "change";
  }

  &__total{
    padding: 12px 4px;
    text-align: center;
    grid-area: total;
    flex-direction: column;
    border-bottom: 1px solid #ccc;

    small{
      opacity: .5;
    }
  }

  &__change{
    grid-area: change;
    flex-direction: row;

    @media (max-width: 767px) {
      border-bottom: 1px solid #ccc;
    }

    @media (min-width: 768px) {
      border-top: 1px solid #ccc;
      flex-direction: column;
    }

    &__take{
      padding: 4px 8px;
      font-size: 16px;
      border: none;
      background-color: #fafafa;
      height: 100%;
      width: 100%;

      &.is-active{
        background: #6fa720;
        color: #d2efa9;
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);

        &:hover{
          background-color: rgba(111, 167, 32, .9);
        }

        &:active{
          background-color: rgba(111, 167, 32, .8);
        }
      }
    }
  }
}

.coins{
  grid-area: coins;
  padding: 12px 4px;
  width: 80%;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 100%;
  }

  &__list{
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 768px) {
      flex-direction: column;
    }

    &__item{
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      background-color: #d6ae4d;
      box-shadow: 0 1px 2px #ccc;
      font-weight: 600;

      &:not(:last-child){
        @media (min-width: 768px) {
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>