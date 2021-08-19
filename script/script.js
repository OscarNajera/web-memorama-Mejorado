
const cargarImg = document.getElementById('carga-img');
const img = document.getElementById('img');
const verimg = document.getElementById('ver-img');

const rango =  document.getElementById('rango');
const color =  document.getElementById('color');
const fondo =  document.getElementById('fondo');



cargarImg.addEventListener('change', (e) => {
	const  archivos=  e.target.files;
    console.log("s", archivos);
    const fragment =  document.createDocumentFragment();
    for(let archivo of archivos   ){

    	let xfiltro= filtro(archivo.name);               //filtro exclusivo para imagenes
    	if (xfiltro) {
	    	let leerArchivo=new FileReader();            //instanciamos la funcion de lectura de archivo
	    	let img = document.createElement("img");      //creamos el elemento imagen
	    	leerArchivo.readAsDataURL(archivo);         //leeremos cada archivo del bucle
			leerArchivo.addEventListener("load", (e) =>{ //evenmto de escucha hasta que se cargaron Todas las imagenes
				 img.setAttribute('src', e.target.result);
				 console.log('----------',archivo.name)
			} )
			fragment.appendChild(img)					 //se añaden todas las imagenes al fragmento
	    
    	}
    	else{ console.log("archivo no valido");  }


    }
    verimg.appendChild(fragment)					 //se añade el fragmento creado con todas las imagenes (optimizacion)

})


rango.addEventListener("input" , (e)=>{
	console.log(' e = ' ,e.target.value);
	let ancho= e.target.value;
	verimg.style.width = `${ancho}%`;
})


color.addEventListener('input', (e) =>{
	console.log('color = #', e.target.value);
	let  xce=e.target.value;
	fondo.style.backgroundColor = xce;
})

const  filtro = (x)=>{
	
	let formatos= /(\.jpg|\.png|\.bmp|\.gif|\.jpeg|\.svg|\.tiff|\.ico|\.eps|\.svg)/gmi;
	let valida = formatos.test(x);


	return valida
}


 
