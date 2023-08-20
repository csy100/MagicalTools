// @ts-nocheck
import router from "@/router";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

router.beforeEach((to: any, from: any, next: any) => {
    nprogress.start();
    next();
});

router.afterEach((from:any, next:any) => {
    nprogress.done();
})