
const cargarImg = document.getElementById('carga-img');
const img = document.getElementById('img');
const verimg = document.getElementById('ver-img');

const rango =  document.getElementById('rango');
const color =  document.getElementById('color');
const fondo =  document.getElementById('fondo');



cargarImg.addEventListener('change', (e) => {
	const  archivos=  e.target.files;						//variable que contiene lso ficheros
    const fragment =  document.createDocumentFragment();	//variable para realizar fragmento de html y posterior mente incorporarlo (optimizacion)
    const replica = [];										//variable que duplicara el valor de los archivos
    replica.push(...archivos,...archivos);					//se pasan 2 veces el valor de los archivos
    const replicaaleatoria = aleatoriox(replica);			//esta avriable revuelve el contenido de un array		


    for(let archivo of replicaaleatoria   ){

    	let xfiltro= filtro(archivo.name);               //filtro exclusivo para imagenes
    	if (xfiltro) {


	    	let leerArchivo=new FileReader();            //instanciamos la funcion de lectura de archivo


	    									//crearemos las etiquetas que contendran el efeto de carata
	    	let cartaBox= document.createElement("div"); 
	    	let carta= document.createElement("div"); 
	    	let cara= document.createElement("div"); 
	    	let detras= document.createElement("div"); 

			let img = document.createElement("img");     
			let imgf =document.createElement("img");

											//le proporcionamos a las etiquetas sus respectivas clases 
			cartaBox.setAttribute('class', 'carta-box');
			carta.setAttribute('class', 'carta');
			cara.setAttribute('class', 'cara');
			detras.setAttribute('class', 'cara detras');


	    	leerArchivo.readAsDataURL(archivo);         //leeremos el contenido del archivo 

					//evenmto de escucha hasta que se cargaron Todas las imagenes en el cual se asignara el valor de la imagen 
			leerArchivo.addEventListener("load", (e) =>{ 
			img.setAttribute('src', e.target.result);
			img.setAttribute('alt', archivo.name);

			console.log('-nombre del archivo',archivo.name)
			})

											//añadimos las respectivas etiquetas a sus complementos 
			imgf.setAttribute('src', 'https://asturias24.es/wp-content/plugins/pepeTarot/img/carta.png')
			cara.appendChild(imgf);
			detras.appendChild(img);
			carta.appendChild(cara);
			carta.appendChild(detras);
			cartaBox.appendChild(carta);


			fragment.appendChild(cartaBox)					 //se añaden todas las imagenes al fragmento
	    
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



///////////////////////////Funciones

const  filtro = (x)=>{
	
	let formatos= /(\.jpg|\.png|\.bmp|\.gif|\.jpeg|\.svg|\.tiff|\.ico|\.eps|\.svg)/gmi;
	let valida = formatos.test(x);


	return valida
}



////////////////////////////// Random para arrays

const aleatoriox = (e)=>{
	let  mesclado=[];                                       //variable que almacenara el valor aleatorio
	let c = e.length;
	let mescla=e;
	 
 	while(mesclado.length <  c){
 		let r = Math.floor(Math.random() * mescla.length);  //valor random del array
 		mesclado.push(mescla[r]); 							//el valor random siempre se coloca en la primera posicion
 		mescla.splice(r,1);									//el valor extraido se elimina del array lo que provoca que disminulla su tamaño (optimizacion)
 	}
	return mesclado	

} 


 
