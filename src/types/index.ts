export type ActionResult = {
  success?: string;
  error: string;
};

export type Tparams = {
  id: string;
};

export type Tedit = {
  params: Tparams;
};

// add tyoe product
export type TProduct = {
  id: number;
  name: string;
  image_url: string;
  price: number;
  category_name: string;
};
