
import type {Product} from "@/structures/types";
import type {Ref} from "vue";
import type {Maybe} from "@/typings";

export interface UseProductInterface {
  get(): Promise<Array<Product>>,
  getById(id: number): Promise<Maybe<Product>>,
  create(data: Product, creationIndex: number): Promise<Array<Maybe<Product>>>,
  update(data: Product): Promise<Maybe<Product> | Error>,
  remove(id: number): Promise<void>,
  items: Ref<Array<Maybe<Product>>>,
  item: Ref<Maybe<Product>>,
}


