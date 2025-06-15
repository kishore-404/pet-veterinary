// src/Data/Shop_products.ts

import Product_1 from "../assets/images/home/product-img-1.png";
import Product_2 from "../assets/images/home/product-img-2.png";
import Product_3 from "../assets/images/home/product-img-3.png";
import Product_4 from "../assets/images/home/product-img-4.png";
import Product_5 from "../assets/images/home/product-img-5.png";
import Product_6 from "../assets/images/home/product-img-6.png";
import Product_7 from "../assets/images/home/product-img-7.png";

export type ProductType = {
  id:string;
  title: string;
  icon: string;
  price: string;
  description: string;
  brands?: string;
  sub_category?: string;
  sub_title?: string;
};


const Products: ProductType[] = [
  {
    id:"1",
    title: "Toys",
    icon: Product_1,
    price: "$700",
    description: "Handmade toy",
    brands: "PetCo",
    sub_category: "chewable",
    sub_title: "Fun Toy",
  },
  {
     id:"2",
    title: "Collar",
    icon: Product_2,
    price: "$200",
    description: "Durable collar",
    brands: "WoofWear",
    sub_category: "accessory",
    sub_title: "Leather Collar",
  },
  {
     id:"3",
    title: "Toy Ball",
    icon: Product_3,
    price: "$100",
    description: "Colorful ball",
    sub_title: "Play Ball",
  },
  {
     id:"4",
    title: "Rope Toy",
    icon: Product_4,
    price: "$150",
    description: "Strong rope",
  },
  {
     id:"5",
    title: "Chew Toy",
    icon: Product_5,
    price: "$120",
    description: "Safe chewable",
  },
  {
     id:"7",
    title: "Pet Bowl",
    icon: Product_6,
    price: "$250",
    description: "Stainless steel bowl",
  },
  {
     id:"8",
    title: "Brush",
    icon: Product_7,
    price: "$90",
    description: "Soft brush",
  },
];

export default Products;
