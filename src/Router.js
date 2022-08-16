import { createRouter, createWebHistory } from 'vue-router'
import ListProducts from "@/components/phuong/ListProducts";
import HandleProduct from "@/components/phuong/HandleProduct";
import DeletedProducts from "@/components/phuong/DeletedProducts";

const routes = [
    {
        path: '/ListProducts',
        name: 'ListProducts',
        component: ListProducts
    },
    {
        path: '/HandleProduct/:id',
        name: 'HandleProduct',
        component: HandleProduct,
        props: true,
    },
    // {
    //     path: '/SearchByFirstName',
    //     name:'search',
    //     component: Search,
    //     props: true,
    // },
    {
        path: "/DeletedProducts",
        name: "DeletedProducts",
        component: DeletedProducts
    },
    {
        path: '/:catchAll(.*)',
        component: Error
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router