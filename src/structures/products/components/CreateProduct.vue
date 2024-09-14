<script setup lang="ts">
import {Field, Form, ErrorMessage} from 'vee-validate';
import {ref} from "vue";
import type {Maybe} from "@/typings";
import type {Product} from "@/structures/types";

const simpleSchema = {
  name(value: Maybe<string>) {

    if (value && value.trim()) {
      return true;
    }

    return 'This is required';
  },
  price(value: Maybe<number>) {
    if (typeof value === 'undefined')
      return 'This is required'

    if (value == 0)
      return 'Qty must be greater than 0'

    return true;
  },
  qty(value: Maybe<number>) {
    if (typeof value === 'undefined')
      return 'This is required'

    if (value == 0)
      return 'Qty must be greater than 0'

    return true;
  },
  image(value: Maybe<string>) {
    if (value) {
      return true;
    }

    return 'This is required';
  }
};

const emit = defineEmits(['create', 'cancel'])

const product = ref<Product>({} as Product)

const filePath = ref<Maybe<string>>()

const fileInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files

  if (files && target.value) {
    filePath.value = target.value;
    product.value.image = URL.createObjectURL(files[0])
  }
}

const accept = () => {
  emit('create', product.value)
  product.value = {} as Product
}

const cancel = () => {
  emit('cancel')
  product.value = {} as Product
}

</script>

<template>
  <div>
    <Form @submit="accept" :validation-schema="simpleSchema">
      <div class="field">
        <Field class="field__input"
               type="text"
               name="name"
               v-model="product.name"
               placeholder="Name"/>
        <ErrorMessage name="name" class="error-message"/>
      </div>

      <div class="field">
        <Field class="field__input"
               type="number"
               name="price"
               v-model="product.price"
               placeholder="Price"/>
        <ErrorMessage name="price" class="error-message"/>
      </div>

      <div class="field">
        <Field class="field__input"
               type="number"
               name="qty"
               v-model="product.qty"
               placeholder="Quantity"/>
        <ErrorMessage name="qty" class="error-message"/>
      </div>

      <div class="field">
        <label class="field__file">
          <Field type="file"
                 name="image"
                 accept="image/png, image/jpeg"
                 @input="fileInput"/>
          <span class="field__file__value" v-if="filePath">{{ filePath }}</span>
          <span class="field__file__placeholder" v-else>Thumbnail</span>
        </label>
        <ErrorMessage name="image" class="error-message"/>
      </div>

      <div class="dialog__actions">
        <button class="dialog__btn dialog__btn__cancel" @click.prevent="cancel">Cancel</button>
        <button type="submit" class="dialog__btn dialog__btn__create">Create</button>
      </div>
    </Form>
  </div>
</template>

<style scoped lang="scss">

.field {
  margin-bottom: 4px;

  &__input, &__file {
    display: block;
    max-width: 100%;
    width: 300px;
    height: 36px;
    padding: 2px 8px;
    border: 1px solid #333;
    outline: none;
    font-size: 16px;
  }

  &__file {
    display: flex;
    align-items: center;
    font-size: 16px;

    input {
      display: none;
    }

    &__placeholder {
      font-size: 16px;
      color: rgba(0, 0, 0, .6);
    }

    &__value {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: block;
    }
  }
}

.dialog {
  &__actions {
    padding-top: 16px;
    text-align: right;
  }

  &__btn {
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

.error-message{
  color: #f64a4a;
  font-size: 11px;
}

</style>