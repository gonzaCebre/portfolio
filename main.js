const grid = new Muuri('.grid', {
    layout: {
      rounding: false //Permite trabajar con porcentajes
    }
}); //Inicializa Muuri en el section 'grid'

window.addEventListener('load', () => { //Cuando la ventana cargue completamente
    grid.refreshItems().layout(); //Metodo de muuri que refresca el layout recalculando los tamaños al cambiar de tamaño de pantalla
    document.getElementById('grid').classList.add('images-charged'); //Va a agregarle una nueva clase para que se muestren con opacidad en 100

    //Enlaces de filtrado
    const enlaces = document.querySelectorAll('#categories a'); //Llama a todos los enlaces dentro de los elementos con id 'categories'
    enlaces.forEach( (elemento) => { //Para cada una de las categorias
        elemento.addEventListener('click', (e) => { //Agrega una escucha en el evento click
            e.preventDefault(); //Previene el comportamiento por defecto
            enlaces.forEach( (enlace) => enlace.classList.remove('active')); //en cada enlace va a eliminar la clase 'active'
            e.target.classList.add('active') //Accede al elemento que fue clickeado y le agrega la clase 'active'
        
            //Filtrado
            const category = e.target.innerHTML.toLowerCase(); //Accede al html del elemento clickeado
            category === 'todos' ? grid.filter('[data-category]') /*Si la categoria es 'todos' */ :  /*Sino*/
            grid.filter(`[data-category="${category}"]`); //  Metodo de muuri que permite mostrar los elementos con cierto atributo que se le diga
        });
    });

    //Listener para la barra de busqueda
    document.querySelector('#search-bar').addEventListener('input', (e) => { //Agrega una escucha a inputs en la barra de busqueda
        const search = e.target.value; //Va a guardar en search el input
        grid.filter((item) => item.getElement().dataset.labels.includes(search) );//si el input incluye el valor del una etiqueta lo va a mostrar
        
    });
    

    //Listener para imagenes
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((element) => {
          
        element.addEventListener('click', ()=> { //Cuando se hace un click sobre la imagen
            const ruta = element.getAttribute('src'); //Obtiene la ruta de las imagenes
            const description = element.parentNode.parentNode.dataset.description; //Obtiene la descripcion de cada imagen
            const title = element.parentNode.parentNode.dataset.title; //Obtiene el titulo de cada imagen
            
            const link = element.getAttribute('link');
            const repositorie = element.getAttribute('repositorie');
            const repo = element.getAttribute('repo');
            const a = element.getAttribute('a');

            overlay.classList.add('active'); //Se activa la clase 'active'
            document.querySelector('#overlay img').src = ruta; //La ruta a la que dirija al clickear va a ser la de la imagen clickeada
            document.querySelector('#overlay .description').innerHTML = description; //La ruta a la que dirija al clickear va a ser la de la imagen clickeada
            document.querySelector('#overlay .title').innerHTML = title; //La ruta a la que dirija al clickear va a ser la de la imagen clickeada
            document.querySelector('#overlay .photo-footer').href = link;
            document.querySelector('#overlay .photo-footer').innerHTML = a;
            document.querySelector('#overlay .repositorie').href = repositorie;
            document.querySelector('#overlay .repositorie').innerHTML = repo;
        })
    }); 

    //Event listener button close
    document.querySelector('#btn-close-popup').addEventListener('click', () => {
        overlay.classList.remove('active'); //Al clickear en el boton, el overlay se cierra
    });

    //Eventlistener del overlay
    overlay.addEventListener('click', (e) => {
        e.target.id === 'overlay' ? overlay.classList.remove('active') : '';
    }); //Si se clickea sobre el overlay se cierra
});