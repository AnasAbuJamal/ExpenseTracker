import {
    MdOutlineDashboard,
    MdOutlineAccountBalanceWallet,
    MdOutlineShoppingBag,
    MdLogout,
} from "react-icons/md";

export const SIDE_MENU_DATA = [
    {
        label: "Dashboard",
        icon: MdOutlineDashboard,
        path: "/dashboard",
    },
    {
        label: "Income",
        icon: MdOutlineAccountBalanceWallet,
        path: "/income",
    },
    {
        label: "Expense",
        icon: MdOutlineShoppingBag,
        path: "/expense",
    },
    {
        label: "Logout",
        icon: MdLogout,
        path: "/logout",
    },
];