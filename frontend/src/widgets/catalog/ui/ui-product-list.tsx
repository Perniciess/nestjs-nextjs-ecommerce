import Image from "next/image";
import { useGetProductList } from "../api/use-product-list";

export function UiProductsList({ title }: { title: string }) {
  const { data: products } = useGetProductList();

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      <ul className="flex flex-wrap justify-center gap-4">
        {products?.map((product) => (
          <li
            key={product.product_id}
            className="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <div className="flex h-full flex-col rounded-lg inset-ring-1 inset-ring-zinc-200 shadow-xl hover:shadow-2xl">
              <div className="relative w-full aspect-square rounded-t-lg">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-200">
                    <span className="text-zinc-500">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-4 bg-zinc-950 rounded-b-lg text-white">
                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    {product.brand.brand_name} {product.name}
                  </h2>
                </div>
                <p className="mt-4 text-lg">{product.price} ₽</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
