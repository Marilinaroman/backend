let connection = new Mongo();
let database = connect('localhost:27017/ecommerce')

database.productos.insertMany([
    {
        stock: 12,
        name: "pollera",
        price: 120,
        url: "https://media.istockphoto.com/photos/horizontal-cropped-image-of-stylish-slim-woman-in-beautiful-yellow-picture-id1089326536?k=20&m=1089326536&s=612x612&w=0&h=rZErz9LROdSBkSC4789ejCS-VSfl5XwwiQIj3dHnI8U=",
    },
    {
        stock: 12,
        name: "vestido",
        price: 580,
        url: "https://media.istockphoto.com/photos/beauty-fashion-woman-in-black-round-hat-and-leather-raincoat-near-picture-id1353385456?k=20&m=1353385456&s=612x612&w=0&h=_d8Ee16Mp9K8labF46X_EKsa17p1wqqux5lWV8nkRSQ="
    },
    {
        stock: 12,
        name: "saco",
        price: 900,
        url: "https://media.istockphoto.com/photos/portrait-stylish-smiling-woman-with-shopping-bags-wearing-blue-faux-picture-id1190136840?k=20&m=1190136840&s=612x612&w=0&h=fYRYWFwYxBkh5NaRNzivGbxS7W7E3qXuLe_QFaCgEkA=",
    },
    {
        stock: 12,
        name: "pantalon",
        price: 1280,
        url: "https://media.istockphoto.com/photos/funky-female-on-orange-background-picture-id1011190214?k=20&m=1011190214&s=612x612&w=0&h=Yop42Qk_4lEavk8eYBqSzJDh9P4XiX9wgFNO0hVlNp0=",
    },
    {
        stock: 12,
        name: "buzo",
        price: 1700,
        url: "https://media.istockphoto.com/photos/portrait-of-handsome-afro-man-using-his-mobile-picture-id890698790?k=20&m=890698790&s=612x612&w=0&h=GKcqNopHdjAtKmZ3Vjuj6C5wjIHdbpQy4-AOfNDok7E=",
    },
    {
        stock: 12,
        name: "camisa",
        price: 2300,
        url: "https://media.istockphoto.com/photos/gorgeous-female-brunette-model-in-white-clothes-picture-id1148523276?k=20&m=1148523276&s=612x612&w=0&h=hqW4EVfX20vewtegJ0-BJOeWuvtkY_K6hhlzCU3hYSE=",
        "id": 6
    },
    {
        stock: 12,
        name: "camison",
        price: 2860,
        url: "https://media.istockphoto.com/photos/gorgeous-female-brunette-model-in-white-clothes-picture-id1148523276?k=20&m=1148523276&s=612x612&w=0&h=hqW4EVfX20vewtegJ0-BJOeWuvtkY_K6hhlzCU3hYSE=",
    },
    {
        stock: 12,
        name: "remera",
        price: 3350,
        url: "https://media.istockphoto.com/photos/gorgeous-female-brunette-model-in-white-clothes-picture-id1148523276?k=20&m=1148523276&s=612x612&w=0&h=hqW4EVfX20vewtegJ0-BJOeWuvtkY_K6hhlzCU3hYSE=",
    },
    {
        stock: 12,
        name: "joggins",
        price: 4320,
        url: "https://media.istockphoto.com/photos/gorgeous-female-brunette-model-in-white-clothes-picture-id1148523276?k=20&m=1148523276&s=612x612&w=0&h=hqW4EVfX20vewtegJ0-BJOeWuvtkY_K6hhlzCU3hYSE=",
    },
    {
        stock: 12,
        name: "chomba",
        price: 4990,
        url: "https://media.istockphoto.com/photos/gorgeous-female-brunette-model-in-white-clothes-picture-id1148523276?k=20&m=1148523276&s=612x612&w=0&h=hqW4EVfX20vewtegJ0-BJOeWuvtkY_K6hhlzCU3hYSE=",
    }
])

database.mensajes.insertMany([
    {email:"maru@gmail.com",mensaje:"hola!"},
    {email:"jose@gmail.com",mensaje:"como estas?"},
    {email:"joni@gmail.com",mensaje:"hola!"},
    {email:"fede@gmail.com",mensaje:"bien"},
    {email:"ramiro@gmail.com",mensaje:"hola!"},
    {email:"juana@gmail.com",mensaje:"bien"},
    {email:"sofia@gmail.com",mensaje:"hola!"},
    {email:"camila@gmail.com",mensaje:"bien"},
    {email:"vero@gmail.com",mensaje:"como estas?"},
    {email:"matias@gmail.com",mensaje:"hola!"},
])