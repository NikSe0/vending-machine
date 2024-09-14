import type {Maybe} from "@/typings";

export type Product = {
  id: number,
  name: string,
  price: number,
  image: Maybe<string>,
  qty: number
}