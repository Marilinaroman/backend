import ContendorMariadb from "./mariadbConfig.js";

const data = new ContendorMariadb('productos')

const products = [
    {
        timestamp: 12313131233,
        stock: 12,
        nombre: "pollera",
        price: 1000.0,
        url: "https://media.istockphoto.com/photos/horizontal-cropped-image-of-stylish-slim-woman-in-beautiful-yellow-picture-id1089326536?k=20&m=1089326536&s=612x612&w=0&h=rZErz9LROdSBkSC4789ejCS-VSfl5XwwiQIj3dHnI8U=",

    },
    {
        timestamp: 213132123,
        stock: 12,
        nombre: "vestido",
        price: 1.0,
        url: "https://media.istockphoto.com/photos/beauty-fashion-woman-in-black-round-hat-and-leather-raincoat-near-picture-id1353385456?k=20&m=1353385456&s=612x612&w=0&h=_d8Ee16Mp9K8labF46X_EKsa17p1wqqux5lWV8nkRSQ="
    },
    {
        timestamp: 21312313,
        stock: 12,
        nombre: "saco",
        price: 1000.0,
        url: "https://media.istockphoto.com/photos/portrait-stylish-smiling-woman-with-shopping-bags-wearing-blue-faux-picture-id1190136840?k=20&m=1190136840&s=612x612&w=0&h=fYRYWFwYxBkh5NaRNzivGbxS7W7E3qXuLe_QFaCgEkA=",
    },
    {
        timestamp: 12313123,
        stock: 120,
        nombre: "pantalon",
        price: 1000.0,
        url: "https://media.istockphoto.com/photos/funky-female-on-orange-background-picture-id1011190214?k=20&m=1011190214&s=612x612&w=0&h=Yop42Qk_4lEavk8eYBqSzJDh9P4XiX9wgFNO0hVlNp0=",
        
    }
]

let body = {
    timestamp: 11111111,
    stock: 1,
    nombre: "pollera",
    price: 10,
    url: "https://media.istockphoto.com/photos/horizontal-cropped-image-of-stylish-slim-woman-in-beautiful-yellow-picture-id1089326536?k=20&m=1089326536&s=612x612&w=0&h=rZErz9LROdSBkSC4789ejCS-VSfl5XwwiQIj3dHnI8U=",

}
const info = await data.save(body)
console.log(info);