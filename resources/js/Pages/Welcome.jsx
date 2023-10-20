import { Head } from '@inertiajs/react';
import cashier_machine from "../../assets/cashier_machine.jpg"
import hero_image  from "../../assets/hero_image.svg"
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <div className='w-screen h-screen flex'>

            <Head title="Welcome" />
           <div className='basis-4/6 flex'>
            <img src={hero_image} alt="cashier_machine" className='w-full m-auto'/>
           </div>
           <div className='basis-2/6 px-2 flex flex-col justify-center gap-y-10'>
            <h1 className='text-4xl font-semibold'>Cashier App</h1>
            <p>Kelola semua kebutuhan kasir, perhitungan barang, kelola barang, kelola pengguna dan rekapan bulanan disini</p>
            <a href={route('login')} className='w-fit py-1 px-10 text-lg rounded-md bg-primary text-white'>Masuk</a>
           </div>
        </div>
    );
}
