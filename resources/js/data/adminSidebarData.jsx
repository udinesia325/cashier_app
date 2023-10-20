import { BsFillPieChartFill } from "react-icons/bs";
import { FaUserAlt, FaUsers, FaUserPlus } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { GiShop } from "react-icons/gi";
import { CiShoppingTag } from "react-icons/ci";
import { BiSolidBookBookmark } from "react-icons/bi";

const adminSidebarData = [
    {
        icon: <BsFillPieChartFill />,
        name: "Dashboard",
        href: route("dashboard"),
    },
    {
        type: "collapse",
        name: "Pengguna",
        icon: <FaUserAlt />,
        items: [
            {
                icon: <FaUsers className="text-lg" />,
                name: "Semua Pengguna",
                href: route("admin.user"),
            },
            {
                icon: <FaUserPlus className="text-lg" />,
                name: "Tambah Pengguna",
                href: route("admin.user.add"),
            },
        ],
    },
    {
        type: "collapse",
        name: "Produk",
        icon: <HiMiniShoppingBag />,
        items: [
            {
                icon: <GiShop className="text-lg" />,
                name: "Semua Produk",
                href: route("products"),
            },
            {
                icon: <CiShoppingTag className="text-lg" />,
                name: "Kategori",
                href: route("category"),
            },
        ],
    },
    {
        icon: <BiSolidBookBookmark />,
        name: "Pembukuan",
        href: route("bookeping"),
    },
];

export default adminSidebarData;
