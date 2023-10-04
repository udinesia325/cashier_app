import {
    decrementQty,
    deleteProduct,
    incrementQty,
    setTableName,
} from "@/features/transaction/transactionSlice";
import { cn } from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Input } from "@/shadcn/ui/input";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { PiNotePencilFill, PiNotepadBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";


function Transaksi() {
    const { table_name, products, total } = useSelector(
        (state) => state.transaction
    );
    const dispatch = useDispatch();

    return (
        <div className="col-span-1 row-span-2 border border-x-0 border-b grid grid-rows-[80px_1fr_100px]">
            <div className="row-span-1 border flex justify-between items-center px-1">
                {/* informasi pesanan */}
                <div className="w-1/2 grid grid-cols-[30px_1fr] grid-rows-[20px_20px] gap-x-1 gap-y-[0.2em] ">
                    <PiNotepadBold className="row-span-2 col-span-1 m-auto p-1 text-3xl bg-primary text-white rounded" />
                    <h1 className="font-semibold">Menu Pesanan</h1>
                    <span className="text-sm text-gray-400">
                        Nama Meja : {table_name || "-"}
                    </span>
                </div>

                {/* Menu Edit */}
                <DialogTableName />
                {/* <PiNotePencilFill className="text-3xl cursor-pointer text-slate-700" /> */}
            </div>
            <div className="row-span-1 p-1 flex flex-col gap-y-3">
                {/* kartu Pesanan */}
                {products?.map((product, index) => (
                    <div
                        key={index}
                        className="w-full grid grid-cols-[70px_1fr_60px] items-center p-1 pr-3 border border-primary rounded relative"
                    >
                        {/* clode button */}
                        <IoCloseSharp className="absolute right-1 top-1 text-gray-400 hover:text-black" onClick={()=> dispatch(deleteProduct(product))} />
                        {/* end close button */}
                        <img src={`/${product.image}`} alt="teh" className="aspect-square max-h-full" />
                        <div className="pl-2 flex flex-col gap-0">
                            <p className="w-[100px] leading-tight font-semibold text-lg text-slate-700 truncate">
                                {product.name}
                            </p>
                            <span className="leading-tight text-sm text-gray-500">
                                Rp {product.price.toLocaleString("id")}
                            </span>
                            <br />
                        </div>
                        {/* kontrol quantity */}
                        <div className="flex justify-evenly items-center">
                            <FiMinus
                                className={cn(
                                    "bg-primary p-1 text-2xl text-white rounded cursor-pointer",
                                    product.qty == 1 &&
                                        "bg-primary/50 cursor-not-allowed"
                                )}
                                onClick={() =>
                                    dispatch(decrementQty(product.id))
                                }
                            />
                            <input
                                type="text"
                                value={product.qty}
                                disabled
                                className="w-4 text-center text-slate-700"
                            />
                            <FiPlus
                                className="bg-primary p-1 text-2xl text-white rounded cursor-pointer"
                                onClick={() =>
                                    dispatch(incrementQty(product.id))
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="row-span-1 pb-2">
                <hr className="w-3/4 mx-auto" />
                <div className="w-11/12 mx-auto h-full bg-gradient-to-br from-primary to-teal-500 rounded-3xl flex justify-between items-center px-4">
                    {/* bagian kiri berisi deksripsi singkat */}
                    <div className="flex flex-col text-white">
                        <h1 className="font-semibold opacity-60">
                            {products.length} Item
                        </h1>
                        <span className="font-bold">
                            Rp. {Number(total).toLocaleString("id")}
                        </span>
                    </div>

                    {/* bagian kanan untuk menyelesaikan pembayaran */}
                    <button className="bg-white text-primary rounded-3xl py-2 px-6">
                        Pesan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Transaksi;

function DialogTableName() {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const handleInput = (e) => {
        const value = e.target.value;
        setInput(value);
        dispatch(setTableName(value));
    };
    const handleReset = () => {
        setInput("");
        dispatch(setTableName(""));
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <PiNotePencilFill className="text-3xl cursor-pointer text-slate-700" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Ubah nama meja</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Input value={input} onChange={handleInput} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleReset}>
                        Reset
                    </AlertDialogCancel>
                    <AlertDialogAction>Lanjutkan</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
