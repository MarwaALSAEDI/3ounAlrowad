import airfryer from "@/assets/p-airfryer.png";
import blender from "@/assets/p-blender.png";
import coffee from "@/assets/p-coffee.png";
import mixer from "@/assets/p-mixer.png";
import cookware from "@/assets/p-cookware.png";
import kettle from "@/assets/p-kettle.png";
import dinnerSet from "@/assets/dinner-set.jpg.asset.json";

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  tag?: string;
};

export const products: Product[] = [
  {
    id: "airfryer",
    name: "قلاية هوائية ديجيتال ٦ لتر",
    image: airfryer,
    price: 349,
    oldPrice: 429,
    rating: 4.9,
    reviews: 312,
    tag: "الأكثر مبيعاً",
  },
  {
    id: "coffee",
    name: "ماكينة قهوة إسبريسو احترافية",
    image: coffee,
    price: 899,
    oldPrice: 1150,
    rating: 4.8,
    reviews: 214,
    tag: "خصم ٣٠٪",
  },
  {
    id: "blender",
    name: "خلاط زجاجي عالي القدرة",
    image: blender,
    price: 279,
    rating: 4.7,
    reviews: 168,
  },
  {
    id: "mixer",
    name: "عجانة كهربائية ٥ لتر",
    image: mixer,
    price: 749,
    oldPrice: 849,
    rating: 4.9,
    reviews: 121,
    tag: "جديد",
  },
  {
    id: "cookware",
    name: "طقم أواني جرانيت ١٠ قطع",
    image: cookware,
    price: 599,
    rating: 4.8,
    reviews: 402,
  },
  {
    id: "kettle",
    name: "غلاية كهربائية أبيض وذهبي",
    image: kettle,
    price: 189,
    oldPrice: 239,
    rating: 4.6,
    reviews: 97,
  },
];

export const heroProducts = [
  { id: "airfryer", image: airfryer, label: "قلاية هوائية" },
  { id: "blender", image: blender, label: "خلاط" },
  { id: "coffee", image: coffee, label: "ماكينة قهوة" },
  { id: "mixer", image: mixer, label: "عجانة" },
  { id: "cookware", image: cookware, label: "أواني طهي" },
  { id: "dinner", image: dinnerSet.url, label: "طقم صحون" },
];

export const dinnerSetUrl = dinnerSet.url;
