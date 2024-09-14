import {ref} from 'vue'
import type {Product} from "@/structures/types";
import axios, {type AxiosResponse} from "axios";
import type {Maybe} from "@/typings";
import type {UseProductInterface} from "@/structures/products/composables/useProduct";

export function useProduct(): UseProductInterface {
  const items = ref<Array<Maybe<Product>>>([])
  const item = ref<Maybe<Product>>({ } as Product)

  const get = async (): Promise<Array<Product>> => {
    return axios.get<any, AxiosResponse<Array<Product>>>('./products.json').then(({data}) => {
      items.value = data
      return data
    })
  }

  const getById = async (id: number):  Promise<Maybe<Product>> => {
    return axios.get<any, AxiosResponse<Array<Product>>>('./products.json').then(({data}) => {
      item.value = data.find((i) => i && i.id === id)

      return item.value
    })
  }

  const create = (data: Product, creationIndex: number): Promise<Array<Maybe<Product>>> => {
    return new Promise((resolve, reject) => {
      if(!items.value[creationIndex])
        items.value[creationIndex] = data

      resolve(items.value)
    })
  }

  const update = (data: Product): Promise<Maybe<Product> | Error> => {
    return new Promise((resolve, reject) => {
      const index = items.value.findIndex((i) => i && i.id === data.id)

      if(~index){
        items.value[index] = items.value[index]?.qty ? data : null

        resolve(items.value[index])
      }

      reject(Error("Can't update product"))
    })
  }

  const remove = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const index = items.value.findIndex((i) => i && i.id === id)

      if(~index){
        items.value.splice(index, 1)
      }

      reject(Error("Can't delete product"))
    })
  }

  return {
    get,
    getById,
    item,
    items,
    create,
    update,
    remove
  }
}

export * from './useProduct';
export default  useProduct;


