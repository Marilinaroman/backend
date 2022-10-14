//plantilla handlebars

const template = Handlebars.compile(
    `<h1>Hola </h1>
    <ul>
        <li>{{nombre}}</li>
    </ul>`
)

//codigo html

const html = template({
    nombre:'marilina'
})

document.getElementById('contenedor').innerHTML = html