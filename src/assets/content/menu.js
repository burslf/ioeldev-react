export const menuList = [
    {
        name: "Home",
        route: "/",

    },
    {
        name: "Songs",
        route: "/songs",
        sub: [
            { name: "Upload", route: "/upload", isFirst: true, isLast: true}
        ]
    },
    {
        name: "Swap",
        route: "/swap"
    },
]

export const menuListSidebar = [
    {
        name: "Home",
        route: "/",

    },
    {
        name: "Songs",
        route: "/songs",
    },
    {
        name: "Upload",
        route: "/upload",
    },
    {
        name: "Swap",
        route: "/swap"
    },
]