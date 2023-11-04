import { ActiveSidebarContext, SearchContext } from "@/Layouts/AuthenticatedLayout";
import { addProduct } from "@/features/transaction/transactionSlice";
import { params } from "@/lib/utils";
import { useGetProductsQuery } from "@/services/productApi";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { useContext } from "react";
import { useDispatch } from "react-redux";
function Products() {
    const { activeMenu } = useContext(ActiveSidebarContext);
    const { search } = useContext(SearchContext);
    const { data: products, isLoading } = useGetProductsQuery({category:activeMenu,search});
    const dispatch = useDispatch()
    if (isLoading) {
        return <p>Memuat ...</p>;
    }
    if (products.data.length == 0) {
        return <p className="mt-10 text-center text-gray-500">Tidak ada menu...</p>;
    }
    return (
        <ScrollArea className="h-[85vh] min-h-[400px]">
            <div className="flex flex-wrap gap-4 mt-5">
                {products.data?.map((product, index) => (
                    <div
                        key={index}
                        className="w-[20%] min-w-[165px] basis-1/5 p-2 bg-white rounded-xl cursor-pointer text-center transition-all hover:shadow-md hover:scale-105"
                        onClick={() => dispatch(addProduct(product))}
                    >
                        <img
                            src={`/${product.image}`}
                            alt="esteh"
                            className="rounded-md w-full aspect-square"
                        />
                        <h1 className="text-slate-700 font-bold truncate">
                            {product.name}
                        </h1>
                        <p className="text-sm text-slate-500">Rp. {Number(product.price).toLocaleString('id')}</p>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}

export default Products;
