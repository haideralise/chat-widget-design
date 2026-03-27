import { createRouter, createWebHistory } from "vue-router";
import middlewarePipeline from "./middlewares/middlewarePipeline";

import AuthRoutes from "./AuthRoutes";
import AgencyRoutes from "./AgencyRoutes";
import WorkspaceRoutes from "./WorkspaceRoutes";

import mwLog from "./middlewares/log.js";
import mwGuest from "./middlewares/Guest";
import mwAuth from "./middlewares/Auth";
import { ACLPlugin } from "@/plugins/ACL";

import { useAuthStore } from "../stores/AuthStore";
import { useAppStore } from "../stores/AppStore";
import { useWorkspaceStore } from "../stores/WorkspaceStore.js";
import { useAgencyStore } from "../stores/AgencyStore.js";

import { setI18nLanguage } from "../plugins/i18n";
import { useI18n } from "vue-i18n";
import VueProgressBar from "@aacassandra/vue3-progressbar";
import { getCurrentInstance } from "vue";

const router = createRouter({
    linkExactActiveClass: "active",
    scrollBehavior: () => ({
        y: 0
    }),
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...AuthRoutes,
        ...AgencyRoutes,
        ...WorkspaceRoutes,
        {
            path: "/",
            redirect: '/login',
            name: "home",
            // component: import("../views/HomeView.vue"),
            // meta: {
            //     middleware: [mwLog, mwGuest],
            //     layout: "simple"
            // },
        },
        {
            path: "/gallery",
            name: "gallery",
            meta: {
                middleware: [mwAuth],
                layout: "default",
            },
            component: () => import(/* webpackChunkName: "group-workspaces" */ "../views/Gallery/MediaGallery.vue"),
        },
        {
            path: "/messenger",
            name: "messenger",
            meta: {
                middleware: [mwAuth],
                layout: "default",
            },
            component: () => import(/* webpackChunkName: "group-workspaces" */ "../views/Messenger/SendMessage.vue"),
        },
        {
            path: "/message",
            name: "message",
            meta: {
                middleware: [mwLog],
                layout: "simple",
            },
            component: () => import(/* webpackChunkName: "group-message" */ "../views/Message/MessageView.vue"),
        },
        {
            path: "/logs",
            name: "logs",
            meta: {
                middleware: [mwAuth],
                layout: "default",
            },
            component: () => import(/* webpackChunkName: "group-testing" */ "../views/User/Log.vue"),
        },
        {
            path: "/test",
            name: "test",
            meta: {
                middleware: [mwLog],
                layout: "simple",
            },
            component: () => import(/* webpackChunkName: "group-testing" */ "../views/TestView.vue"),
        },
        {
            path: "/maintenance",
            name: "maintenance",
            meta: {
                middleware: [mwLog],
                layout: "simple",
            },
            component: () => import(/* webpackChunkName: "group-testing" */ "../views/MaintenanceView.vue"),
        },
        {
            path: "/automation-trigger/:slug",
            name: "automation-trigger",
            meta: {
                middleware: [mwLog],
                layout: "simple",
            },
            component: () => import(/* webpackChunkName: "group-testing" */ "../views/AutomationTriggerView.vue"),
        },
        {
            path: "/elements",
            name: "html-elements",
            meta: {
                middleware: [mwLog],
                layout: "simple",
            },
            component: () => import(/* webpackChunkName: "group-testing" */ "../views/ElementStyles.vue"),
        },

        // Keep this at the end of routes
        {
            path: '/404',
            name: '404',
            meta: {
                layout: "simple",
            },
            component: () => import("../views/Errors/404.vue")
        },
        {
            path: '/suspended',
            name: 'suspended',
            meta: {
                layout: "simple",
            },
            component: () => import("../views/Agency/Suspended.vue")
        },
        {
            path: '/closed',
            name: 'closed',
            meta: {
                layout: "simple",
            },
            component: () => import("../views/Agency/Closed.vue")
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'lost',
            meta: {
                layout: "simple",
            },
            component: () => import("../views/Errors/404.vue")
        },
        {
            path: "/components",
            name: "components",
            component: import("../views/component/index.vue"),
            meta: {

                layout: "default"
            },
        },
    ],
});


router.beforeEach((to, from, next) => {
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const workspaceStore = useWorkspaceStore();
    const agencyStore = useAgencyStore();

    /**
     * LOCALE
     */

    // console.log(to.params.locale);
    if (typeof to.params.locale !== "undefined") {

        const localeParam = to.params.locale;
        // console.log("Localized Route Found " + localeParam)
        /* // use locale if paramsLocale is not in SUPPORT_LOCALES
          if (!SUPPORT_LOCALES.includes(paramsLocale)) {
            return next(`/${locale}`)
          }

          // load locale messages
          if (!i18n.global.availableLocales.includes(paramsLocale)) {
            await loadLocaleMessages(i18n, paramsLocale)
          }*/

        // set i18n language
        //setI18nLanguage(i18n, localeParam)
        //i18n.locale = localeParam;

        //const { t, locale } = useI18n({ useScope: 'global' })
        //console.log(locale);
    }

    /**
     * ACTIVE AGENCY
     * If this is agency mode and agency is not active, redirect to billing
     */

    if (typeof import.meta.env.VITE_MAINTENANCE_MODE !== "undefined" && import.meta.env.VITE_ENV === "production") {
        if (import.meta.env.VITE_MAINTENANCE_MODE === 'true' && to.name !== 'maintenance') {
            return next({
                name: 'maintenance'
            });
        } else if (import.meta.env.VITE_MAINTENANCE_MODE !== 'true' && to.name === 'maintenance') {
            return next({
                name: 'login'
            });
        }
    } else if (authStore.check && appStore.IS_AGENCY_MODE && agencyStore.agency) {
        // If agency is closed, Only billing page is accessible
        if (agencyStore.agency.status === 'CLOSED') {
            if (!["billing", "login"].includes(to.name)) {
                return next({
                    name: 'billing'
                });
            }
        }

        // If agency does not have a subscription or subscription is cancelled, Only billing page is accessible
        if (!agencyStore.agency.subscription || agencyStore.agency.subscription.status == 'cancelled') {
            if (!["billing", "billing-manage", "login"].includes(to.name)) {
                return next({
                    name: 'billing'
                });
            }
        }

    }


    /**
     * LAYOUTS
     */
    const routeWithLayout = to.matched.find(r => r.meta.layout);
    // console.log(routeWithLayout);
    if (routeWithLayout) {
        console.log("Layout:" + routeWithLayout.meta.layout.toLowerCase());
        appStore.layout = routeWithLayout.meta.layout.toLowerCase();
    }

    // Active menu
    appStore.active_menu = to.meta.active_menu || null;

    /**
     * Permissions
     */
    if (to.meta && to.meta.permissions) {

        let route_permissions = [];
        if (Array.isArray(to.meta.permissions)) {
            route_permissions = to.meta.permissions;
        } else {
            route_permissions.concat(to.meta.permissions);
        }
        // const permissions = Array.isArray(route_permissions) ? to.meta.permissions : [to.meta.permissions];
        if (!authStore.check || !ACLPlugin.canAny(route_permissions)) {
            return next({
                name: 'login'
            });
        }
    }

    /**
     * MIDDLEWARE
     */
    if (to.meta && to.meta.middleware && typeof to.meta.middleware !== undefined && to.meta.middleware.length > 0) {
        const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
        const context = {
            to,
            from,
            next,
            appStore,
            authStore,
            agencyStore,
            workspaceStore,
            router,
        }
        return middleware[0]({
            ...context,
            next: middlewarePipeline(context, middleware, 1)
        });
    }


    next();
});

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        // NProgress.start()
    }
    next()
})

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    // NProgress.done()
})

export default router;
