export const menuList = [
    {
        name: "Home",
        route: "/",

    },
    {
        name: "Songs",
        route: "/songs",
        sub: [
            { name: "Type Beats", route: "/upload", isFirst: true, isLast: false},
            { name: "Drumkits", route: "/upload", isFirst: false, isLast: false},
            { name: "Upload", route: "/upload", isFirst: false, isLast: true},
            
        ]
    },
    {
        name: "Buy Cyrpto",
        route: "/buy-crypto"
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
        name: "Buy Crypto",
        route: "/buy-crypto"
    },
]