import { ActiveMenuContext } from "@/contexts/ActiveMenuProvider";
import { ProductPageContext } from "@/contexts/ProductPageProvider";
import { SearchContext } from "@/contexts/SearchProvider";
import { addProduct } from "@/features/transaction/transactionSlice";
import { useGetProductsQuery } from "@/services/productApi";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { router } from "@inertiajs/react";
import { useContext, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useDispatch } from "react-redux";

function Products() {
    const { activeMenu } = useContext(ActiveMenuContext);
    const { search } = useContext(SearchContext);
    const { page, setPage } = useContext(ProductPageContext);
    const { data: products, isLoading } = useGetProductsQuery({
        category: activeMenu,
        search,
        page,
    });
    const { current_page = 1, last_page = 1 } = products?.meta || {};

    const dispatch = useDispatch();

    useEffect(() => {
        router.get("/dashboard",{
            category:activeMenu,
            search,
            page
        },{
            preserveState:true
        })
    },[activeMenu,search,page])

    useEffect(() => {
        setPage(current_page || 1);
    }, [products]);

    if (isLoading) {
        return <p>Memuat ...</p>;
    }
    if (products.data.length == 0) {
        return (
            <p className="mt-10 text-center text-gray-500">Tidak ada menu...</p>
        );
    }
    // push state
    const handlePrev = () => {
        if (page == 1) return null;
        setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page == last_page) return null;
        setPage((prev) => prev + 1);
    };
    

    return (
        <ScrollArea className="h-[85vh] min-h-[400px] pb-10 md:pb-0">
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-4 mt-5">
                {products.data?.map((product, index) => (
                    <div
                        key={index}
                        className=" bg-white rounded-xl cursor-pointer text-center transition-all md:w-[20%] md:min-w-[165px] md:basis-1/5 p-2  hover:shadow-md hover:scale-105"
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
                        <p className="text-sm text-slate-500">
                            Rp. {Number(product.price).toLocaleString("id")}
                        </p>
                    </div>
                ))}
            </div>
            <button
                className="bg-primary p-3 text-white rounded-full font-bold mt-5 mb-3 mr-4 disabled:bg-primary/50"
                onClick={handlePrev}
                disabled={current_page == 1}
            >
                <BsChevronLeft />
            </button>
            <button
                className="bg-primary p-3 text-white rounded-full font-bold mt-5 mb-3 disabled:bg-primary/50"
                onClick={handleNext}
                disabled={page == last_page}
            >
                <BsChevronRight />
            </button>
        </ScrollArea>
    );
}

export default Products;

