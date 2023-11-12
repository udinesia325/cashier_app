import {
    decrementQty,
    deleteProduct,
    incrementQty,
    reset,
    setPay,
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
import { useToast } from "@/shadcn/ui/use-toast";
import { useForm } from "@inertiajs/react";
import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { PiNotePencilFill, PiNotepadBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

function Transaksi() {
    const { table_name, products, total, pay, change } = useSelector(
        (state) => state.transaction
    );
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const dispatch = useDispatch();
    const {
        post,
        setData,
        reset: resetForm,
    } = useForm({
        products: [],
        table_name: "",
        total: 0,
        pay: 0,
        change: 0,
    });
    useEffect(() => {
        setData({ products, table_name, total, pay, change });
    }, [table_name, products, total, pay, change]);
    const handlePost = () => {
        if (products.length == 0) {
            toast({
                description: "Tidak ada produk di daftar pesanan",
            });
            return;
        }
        if(change < 0){
            toast({
                description: "Uang pembayaran tidak cukup",
            });
            return;
        }
        post(route("transaction.store"), {
            onSuccess: () => {
                resetForm();
                dispatch(reset());
                toast({
                    description: "Berhasil di pesan dan disimpan",
                });
                setOpen(false)
            },
        });
    };
    return (
        <div className="hidden col-span-1 row-span-2 border border-x-0 border-b md:grid md:grid-rows-[80px_1fr_100px]">
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
                        className="w-full grid grid-cols-[70px_1fr_60px] items-center p-1 pr-3 border border-primary rounded relative transition-all hover:border-primary/70 hover:bg-gray-100"
                    >
                        {/* clode button */}
                        <IoCloseSharp
                            className="absolute right-1 top-1 text-gray-400 hover:text-black"
                            onClick={() => dispatch(deleteProduct(product))}
                        />
                        {/* end close button */}
                        <img
                            src={`/${product.image}`}
                            alt="teh"
                            className="aspect-square max-h-full"
                        />
                        <div className="pl-2 flex flex-col gap-0">
                            <p className="w-full leading-tight font-semibold text-lg text-slate-700 truncate">
                                {product.name}
                            </p>
                            <span className="leading-tight text-sm text-gray-500">
                                Rp{" "}
                                {Number(
                                    product.qty * product.price
                                ).toLocaleString("id")}{" "}
                                @ {product.price.toLocaleString("id")}
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
                    <button
                        className={cn("bg-white text-primary rounded-3xl py-2 px-6 transition-colors",products.length == 0?"bg-gray-200 cursor-not-allowed":"")}
                        onClick={() => products.length > 0 && setOpen(true)}
                    >
                        Pesan
                    </button>
                </div>
            </div>

            {/* alert bayar pesanan */}
            <AlertDialog open={open} setOpen={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi pesanan</AlertDialogTitle>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="table_name">Nama Meja</Label>
                            <Input
                                type="text"
                                id="table_name"
                                placeholder="Nama Meja"
                                value={table_name}
                                onChange={(e) =>
                                    dispatch(setTableName(e.target.value))
                                }
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="total">Total</Label>
                            <Input
                                type="text"
                                disabled
                                id="total"
                                value={"Rp. " + total.toLocaleString("id")}
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="pay">Bayar</Label>
                            <Input
                                type="number"
                                id="pay"
                                value={pay}
                                onChange={(e) =>
                                    dispatch(setPay(e.target.value))
                                }
                            />
                        </div>
                        <h1
                            className={cn(
                                "my-3 font-semibold",
                                change < 0 ? "text-red-400" : ""
                            )}
                        >
                            Kembali : Rp.{change.toLocaleString("id")}
                        </h1>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpen(false)}>
                            Tutup
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handlePost}
                            className={
                                products.length == 0 || change <0
                                    ? "bg-primary/50 hover:bg-primary/50"
                                    : ""
                            }
                        >
                            Lanjutkan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default React.memo(Transaksi);

function DialogTableName() {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const handleInput = (e) => {
        const value = inputRef.current.value;
        dispatch(setTableName(value));
    };
    const handleReset = () => {
        inputRef.current.value = "";
        dispatch(setTableName(""));
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <PiNotePencilFill className="text-3xl cursor-pointer text-slate-700" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Ubah nama meja</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Input
                            ref={inputRef}
                            value={inputRef.current?.value || ""}
                            onChange={handleInput}
                        />
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
