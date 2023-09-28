import React from "react";
import { PiNotepadBold, PiNotePencilFill } from "react-icons/pi";
import { BsPlusSquareFill } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import teh from "../../assets/esteh.jpg";
import kopi from "../../assets/kopi.jpg";

const orderData = [
    {
        image: teh,
        name: "Es Teh",
        price: 6000,
        note:"jangan terlalu dingin"
    },
    {
        image: kopi,
        name: "Kopi ",
        price: 9000,
        note:"jangan terlalu manis"
    },
];

function Transaksi() {
    return (
        <div className="col-span-1 row-span-2 border border-x-0 border-b grid grid-rows-[80px_1fr_100px]">
            <div className="row-span-1 border flex justify-between items-center px-1">
                {/* informasi pesanan */}
                <div className="w-1/2 grid grid-cols-[30px_1fr] grid-rows-[20px_20px] gap-x-1 gap-y-[0.2em] ">
                    <PiNotepadBold className="row-span-2 col-span-1 m-auto p-1 text-3xl bg-primary text-white rounded" />
                    <h1 className="font-semibold">Menu Pesanan</h1>
                    <span className="text-sm text-gray-400">Meja No : 1</span>
                </div>

                {/* Menu Edit */}
                <PiNotePencilFill className="text-3xl cursor-pointer text-slate-700" />
            </div>
            <div className="row-span-1 p-1 flex flex-col gap-y-3">
                {/* kartu Pesanan */}
                {orderData.map((data, index) => (
                    <div key={index} className="w-full grid grid-cols-[70px_1fr_60px] items-center p-1 pr-3 border border-primary rounded">
                        <img src={data.image} alt="teh" />
                        <div className="pl-2 flex flex-col gap-0">
                            <p className="w-[100px] leading-tight font-semibold text-lg text-slate-700 truncate">
                                {data.name}
                            </p>
                            <span className="leading-tight text-sm text-gray-500">
                                Rp {data.price.toLocaleString("id")}
                            </span>
                            <br />
                            <span className="leading-tight text-xs text-gray-500">
                                {data.note}
                            </span>
                        </div>
                        {/* kontrol quantity */}
                        <div className="flex justify-evenly items-center">
                            <FiMinus className="bg-primary p-1 text-2xl text-white rounded" />
                            <input
                                type="text"
                                value="1"
                                disabled
                                className="w-4 text-center text-slate-700"
                            />
                            <FiPlus className="bg-primary p-1 text-2xl text-white rounded" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="row-span-1 pb-2">
                <hr className="w-3/4 mx-auto" />
                <div className="w-11/12 mx-auto h-full bg-gradient-to-br from-primary to-teal-500 rounded-3xl flex justify-between items-center px-4">
                    {/* bagian kiri berisi deksripsi singkat */}
                    <div className="flex flex-col text-white">
                        <h1 className="font-semibold opacity-60">5 items</h1>
                        <span className="font-bold">Rp. 80.000</span>
                    </div>

                    {/* bagian kanan untuk menyelesaikan pembayaran */}
                    <button className="bg-white text-primary rounded-3xl py-2 px-6">Pesan</button>
                </div>
            </div>
        </div>
    );
}

export default Transaksi;
