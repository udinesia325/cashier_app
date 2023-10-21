import { Head } from '@inertiajs/react';
import cashier_hero from "../../assets/cashier_hero.jpg"
import hero_image  from "../../assets/hero_image.svg"
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <div className='w-screen h-screen flex'>

            <Head title="Welcome" />
           <div className='basis-4/6 flex'>
            <img src={cashier_hero} alt="cashier_machine" className='w-full m-auto'/>
           </div>
           <div className='basis-2/6 px-2 flex flex-col justify-center gap-y-10'>
            <h1 className='text-4xl font-semibold'>Cashier App</h1>
            <p className='leading-snug tracking-wide'>Sebuah solusi perangkat lunak yang dirancang untuk membantu bisnis dalam mengelola proses transaksi penjualan dan manajemen inventaris mereka.</p>
            <a href={route('login')} className='w-fit py-2 px-12 font-semibold text-lg rounded-full bg-primary text-white hover:bg-teal-600'>Masuk</a>
           </div>
        </div>
    );
}
