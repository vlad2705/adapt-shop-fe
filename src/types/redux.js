// @flow
// General Redux types
export type Action = {
  type: string,
  payload: any,
  meta?: any,
}

export type Dispatch = (action: Action) => void

// State shapes
export type ConfigState = {
  apiUrl: string,
  environment: string,
}

export type PictureState = {
  content: ArrayBuffer,
  type: string,
}

export type ProductFilterState = {
  first: number,
  pageSize: number,
  categoryId?: number,
}

export type ProductState = {
  id: number,
  name: string,
  price: number,
  picture: PictureState,
}

export type ProductResponseState = {
  products: Array<ProductState>,
  totalProducts: number,
}

export type ProductDetailState = {
  id: number,
  name: string,
  price: number,
  description: string,
  rating: number,
  pictures: Array<PictureState>,
}

export type CategoryState = {
  id: number,
  name: string,
  children: Array<CategoryState>,
}

export type CartState = {
  id: number,
  product: ProductState,
  quantity: number,
}

export type OrderState = {
  id: number,
  products: Array<CartState>,
  shipping: ShippingState,
}

export type AddressState = {
  address: string,
  postalCode: string,
  city: string,
  country: string,
}

export type ReviewState = {
  rating: number,
  description: string,
}

export type FormState = {
  login: {
    values: LoginState,
  },
  registration: {
    values: RegistrationState,
  },
  review: {
    values: ReviewState,
  },
}

export type RegistrationState = {
  id?: number,
  firstName: string,
  lastName: string,
  phone: string,
  address: AddressState,
  client: LoginState,
}

export type LoginState = {
  email: string,
  password: string,
}

export type ShippingState = {
  id: number,
  name: string,
  cost: number,
}

export type State = {
  cart: Array<CartState>,
  category: ?number,
  categories: Array<CategoryState>,
  config: ConfigState,
  form: FormState,
  order: OrderState,
  products: ProductResponseState,
  product: ProductDetailState,
  review: ReviewState,
  shipping: Array<ShippingState>,
  viewedProducts: ProductResponseState,
  recommendedProducts: ProductResponseState,
  bestSellers: ProductResponseState,
  similarProducts: ProductResponseState,
}
