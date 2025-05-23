import { FileBarChart, Home, Logs, Plus, User, User2, } from 'lucide-react'


export default {
    NAVLINKS: [
        {
            name: "Overview",
            path: "/dashboard",
            icon: Home,
        },
        {
            name: "Transactions",
            path: "/dashboard/transactions",
            icon: Logs
        },
        {
            name: "Add Transaction",
            path: "/dashboard/add-transaction",
            icon: Plus
        },
        {
            name: "Reports",
            path: "/dashboard/reports",
            icon: FileBarChart
        },
        {
            name: "Profile",
            path: "/dashboard/profile",
            icon: User2
        }
    ]
}