import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import InputError from "@/Components/InputError";

function Add(props) {
    const { auth, category, type } = props;
    // console.log(props);
    const [file, setFile] = useState();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        price: "",
        image: "",
        category_id: String(category[0].id),
        type_id: String(type[0].id),
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("products.store"));
    };
    const handleInput = (key) => {
        return (e) => setData(key, e.target.value);
    };
    const handleImage = (e) => {
        const image = e.target.files[0];
        setData("image", image);
        setFile(image);
    };
    return (
        <Authenticated user={auth.user}>
            <h1 className="text-3xl font-semibold text-gray-900 mb-10">
                Tambah Produk
            </h1>
            <form
                action=""
                onSubmit={handleSubmit}
                className="max-w-[600px] flex flex-col gap-y-3"
            >
                <div>
                    <label htmlFor="nama">Nama </label>
                    <Input
                        id="nama"
                        type="text"
                        value={data.name}
                        onChange={handleInput("name")}
                    />
                    <InputError message={errors.name} />
                </div>
                <div>
                    <label htmlFor="harga">Harga </label>
                    <Input
                        id="harga"
                        type="number"
                        value={data.price}
                        onChange={handleInput("price")}
                    />
                    <InputError message={errors.price} />
                </div>
                <Select
                    defaultValue={""}
                    onValueChange={(e) => setData("category_id", e)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                        {category.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString()}>
                                {c.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    defaultValue={""}
                    onValueChange={(e) => setData("type_id", e)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Tipe" />
                    </SelectTrigger>
                    <SelectContent>
                        {type.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString()}>
                                {c.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div>
                    <label htmlFor="gambar">Gambar</label>
                    <Input
                        id="gambar"
                        type="file"
                        accept="image/*"
                        value={undefined}
                        onChange={handleImage}
                    />
                    <InputError message={errors.image} />
                    {file ? (
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Gambar Produk"
                            className="w-[90px] h-[90px] my-4"
                        />
                    ) : null}
                </div>
                <div className="flex gap-2">
                    <Button disabled={processing} type="submit">
                        {" "}
                        {processing ? "Memuat" : "Kirim"}
                    </Button>

                    {/* agar tidak tereset saat submit */}
                    <p className="py-2 px-4 bg-red-500 hover:bg-red-400 text-white cursor-pointer rounded-md" onClick={() => reset()}>
                        Reset
                    </p>
                    <Link
                        href={route("products")}
                        className="bg-blue-500 py-2 px-6 text-white font-semibold rounded-md"
                    >
                        Kembali
                    </Link>
                </div>
            </form>
        </Authenticated>
    );
}
export default Add;
