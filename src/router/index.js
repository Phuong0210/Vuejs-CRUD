import { createWebHistory, createRouter } from "vue-router";
import Product from "@/components/Product";
import InsertProduct from "@/components/InsertProduct";

const routes = [
    {
        path: '/',
        name: 'Product',
        component: Product
    },
    {
        path: '/InsertProduct',
        name: 'InsertProduct',
        component: InsertProduct
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;