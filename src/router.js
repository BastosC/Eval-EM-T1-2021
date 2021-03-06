import { createRouter, createWebHashHistory } from "vue-router";
import BugList from "./pages/BugList.vue";
import BugAdd from "./pages/BugAdd.vue";
import Signup from "./pages/Signup.vue";
import Login from "./pages/Login.vue";

// Routes
const routes = [
    {
        path: "/list-bugs/todo",
        name: "Liste des bugs de l'utilisateur",
        component: BugList,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/list-bugs/todo",
        name: "Liste des bugs",
        component: BugList,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/list-bugs",
        name: "Liste des bugs",
        component: BugList,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/add-bug/",
        name: "Editer un bugs",
        component: BugAdd,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/signup",
        name: "S'inscrire'",
        component: Signup,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: "/login",
        name: "login'",
        title: "Se connecter'",
        component: Login,
        meta: {
            requiresAuth: false,
        },
    },
];

// Initializer le router
const history = createWebHashHistory();
const router = createRouter({
    history,
    routes,
});

// Vérifier la mémorisation de l'authentification & Redirections
router.beforeEach((to, from, next) => {
    if (localStorage.getItem("token")) {
        if (to.path.includes("/add-bug") || to.path.includes("/list-bugs")) {
            next();
        } else {
            next({ path: "/list-bugs", replace: true });
        }
    } else {
        if (to.path.includes("/login") || to.path.includes("/signup")) {
            next();
        } else {
            next({ path: "/login", replace: true });
        }
    }
});

export default router;
