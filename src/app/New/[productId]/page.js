import ProductDetailsJSX from "@/app/Components/ProductDetailsJSX";

async function getProduct(id) {
  const res = await fetch(
    `https://6920bdbb512fb4140bde528f.mockapi.io/products/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}
export default async function ProductDetails({ params: paramsPromise }) {
  const params = await paramsPromise;
  const { productId } = params;
  const product = await getProduct(productId);
  return <ProductDetailsJSX product={product} />;
}
