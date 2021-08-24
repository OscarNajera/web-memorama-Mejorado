
const cargarImg = document.getElementById('carga-img');
const img = document.getElementById('img');
const verimg = document.getElementById('ver-img');

const rango =  document.getElementById('rango');
const color =  document.getElementById('color');
const fondo =  document.getElementById('fondo');

const verImg= document.getElementById('ver-img');

////////////////////////////////////////////////variables de conteo  
let contadorIntentos=0;
let contadorPuntos=0;
let contadorCartas=0;
let contadorAciertos=0;


///////////////////////////////////////////////Iincio del juego

let enviarN=document.getElementById("enviarN");
let selecIMG=document.getElementById("seleccion-img")
let nombre=document.getElementById("nombre");

enviarN.addEventListener("click" , (e)=>{
	e.preventDefault();

	console.log('coloque un nombre')
	if (nombre.value != "") {
		selecIMG.className ="";
	}else {
		alert('coloque un nombre')
	}
})



////////////////////////////////////////////carga de imagenes inicio 
cargarImg.addEventListener('change', (e) => {
	const  archivos=  e.target.files;						//variable que contiene lso ficheros
    const fragment =  document.createDocumentFragment();	//variable para realizar fragmento de html y posterior mente incorporarlo (optimizacion)
    const replica = [];										//variable que duplicara el valor de los archivos
    replica.push(...archivos,...archivos);					//se pasan 2 veces el valor de los archivos
    const replicaaleatoria = aleatoriox(replica);			//esta avriable revuelve el contenido de un array		

    

    for(let archivo of replicaaleatoria   ){

    	let xfiltro= filtro(archivo.name);                  //filtro exclusivo para imagenes
    	if (xfiltro) {
    		contadorCartas++;

	    	let leerArchivo=new FileReader();               //instanciamos la funcion de lectura de archivo


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

			//console.log('-nombre del archivo',archivo.name)
			})

											//añadimos las respectivas etiquetas a sus complementos 
			imgf.setAttribute('src', 'https://asturias24.es/wp-content/plugins/pepeTarot/img/carta.png')
			imgf.setAttribute('alt', "oculto");
			cara.appendChild(imgf);
			detras.appendChild(img);
			carta.appendChild(cara);
			carta.appendChild(detras);
			cartaBox.appendChild(carta);


			fragment.appendChild(cartaBox)					 //se añaden todas las imagenes al fragmento
	    
    	}
    	else{ //console.log("archivo no valido");
    	  }


    }
    contadorCartas /= 2;


    verimg.appendChild(fragment)					 //se añade el fragmento creado con todas las imagenes (optimizacion)

})


rango.addEventListener("input" , (e)=>{
	//console.log(' e = ' ,e.target.value);
	let ancho= e.target.value; 
	verimg.style.width = `${ancho}%`;
})


color.addEventListener('input', (e) =>{
	//console.log('color = #', e.target.value);
	let  xce=e.target.value;
	fondo.style.backgroundColor = xce;
})



///////////////////////////Funciones

const  filtro = (x)=>{
	
	let formatos= /(\.jpg|\.png|\.bmp|\.gif|\.jpeg|\.svg|\.tiff|\.ico|\.eps|\.svg|\.webp)/gmi;
	let valida = formatos.test(x);
	return valida
}

///carga de imagenes FIN 



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


///////////////////////////////////////////////////Busqueda de pares  

let contador =0;											//contador de clicks en las cartas 1° click muestra una carta 2° muestra y compara con la primera 
let compara=[];												//almacena la informacion delas cartas para posteriormente compararlas
let siguiente=false;										
let cartaEfecto=[];											//Almacena las cartas seleccionadas y les poporciona el efecto de volteo

verImg.addEventListener('click', (e)=>{
    
    
    if (e.target.alt == 'oculto') {

		//console.log(e.target.src)
		e.target.parentElement.parentElement.classList.add('voltear');
		cartaEfecto[contador]=e.target.parentElement.parentElement;

		//console.log("----**",cartaEfecto[contador].innerHTML)

		if(contador ==  0){									//primer click en las cartas 
			compara[contador]=e.target.parentElement.parentElement.childNodes[1].childNodes[0].alt; //busca la informacion del elemento primo
			//console.log('valor 1 = ' + compara[contador]);
			contador++;
		}
		else{
			contadorIntentos++;							
										//segundo click en las cartas

			 
										
			compara[contador]=e.target.parentElement.parentElement.childNodes[1].childNodes[0].alt;	//busca la informacion del elemento primo
			//console.log('valor 1 = ' + compara[contador]);
			contador=0;
			siguiente =comparar(compara[0] , compara[1] );

 			animacion('cargando');
										//valida si son pares si son pares 


			if( siguiente ){	
				contadorAciertos++;
				animacion('par');	
 			
			}
			else {
				const timeoutF = setTimeout(() => {
   				cartaEfecto[0].className ="carta";
 				cartaEfecto[1].className ="carta";

				}, 700);
				
			}
		}

    }else {
    	//console.log('no tiene atributo')
    }

    //////////////////////////////////////////////////////////////////valuacion de puntos
    if(contadorAciertos == contadorCartas){
    	 
    	contadorPuntos=(contadorCartas/contadorIntentos)*1000;
    	console.log(`Tu puntuacion final es ${contadorPuntos}  con ${contadorCartas}  cartas` );
    }
    //console.log(`contador cartas: ${contadorCartas}\ncontador intentos: ${contadorIntentos}\ncontador aciertos: ${contadorAciertos}  `)



});
const comparar=(x , y )=>{

	let tf='';
	if(x == y ){

		//console.log("son iguales");
		tf=true
	}
	else {
		//console.log("no son iguales");
		tf = false
	}
    return tf;
}

//////////////////////////carga de animaciones
 
const animacion=(e)=>{
 	//console.log('Valor es CVF' , e);
	const animacionCVF=document.getElementById('animacionCVF');
	animacionCVF.className ="animacionCVF visible";
 
	const tiempox= setTimeout((x) => {
	    animacionCVF.className ="animacionCVF invisible";
	},700);	

}

////////////////////////////sessionStorage




let informacionP=[];

const guardarPuntuacion= (nombre, cartas, puntos)=>{

	let  score={
	  	 	 nombre: nombre,
	  	 	 cartas: cartas,
	  	 	 puntos: puntos
	}
	informacionP.push(score);

	 localStorage.setItem("puntos", JSON.stringify(informacionP));
}


const obtenerPuntuacion= ()=>{
 	 let getpuntos= localStorage.getItem("puntos");

 	 if(getpuntos == null){
 	 	informacionP=[];

 	 }
 	 else{
 	 	informacionP=JSON.parse(getpuntos)

 	 	for(informacion of informacionP){
 	 		 console.log(informacion.nombre +" "+ informacion.cartas +" "+ informacion.puntos )
 	 	
 	 	}


 	 }

 	 console.log(informacionP)

}



////////////////////puntuacion
obtenerPuntuacion()