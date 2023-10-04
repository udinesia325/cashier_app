import AuthenticatedLayout, { ActiveSidebarContext } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import teh from "../../assets/esteh.jpg";
import kopi from "../../assets/kopi.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "@/services/productApi";
import { useState } from "react";
import { useEffect } from "react";
import { setProduct } from "@/features/product/ProductSlice";
import { useContext } from "react";
import Products from "@/Components/Staff/Products";

export default function Dashboard({ auth }) {
    // const dispatch = useDispatch()
    // const {data,isLoading,error} = useGetProductsQuery()
    // const productSelector = useSelector(state => state.product)
    // useEffect(() => {
    //     if(data) {
    //         dispatch(setProduct(data.data))
    //     }
    // },[data])
    // console.log({productSelector});
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="w-full mx-auto p-3 ">
                <p className="text-gray-600 text-sm ml-2">Klik item untuk menambahkan ke daftar pesanan.</p>
                <Products />
            </div>
        </AuthenticatedLayout>
    );
}
