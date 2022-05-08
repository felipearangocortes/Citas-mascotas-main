
const imprimir = (...datos) => {
    console.table(datos);
}   

const visualizarCitas = ()=> {
    let citasHTML ='';
    let citas = JSON.parse(localStorage.getItem("citas"));
    
    citas.map(cita => { //por cada cita de citas, se va agregar un div con información
        imprimir(cita); //funcion con Rest, solo para ensañar y debugar
        let {id, mascota, dueno, fecha, hora, sintomas } = cita; //destructuración del objecto cita
        
        citasHTML += `<div class = "cita" >
        <p> Mascota : <span> ${mascota}</span></p>
        <p> Dueño : <span> ${dueno}</span></p>
        <p> Fecha : <span> ${fecha}</span></p>
        <p> Hora : <span> ${hora}</span></p>
        <p> Sintomas : <span> ${sintomas}</span></p>
        
       
        
        <button class = "button eliminar u-full-widht"
                onclick = "eliminarCita('${id}')"> 
                Eliminar cita
        </button>
        
        </div>`;
    });

    document.querySelector("#listado-citas").innerHTML = citasHTML;

    



}

const eliminarCita = (idCita) => {
    let citas = JSON.parse(localStorage.getItem("citas"));

    const nuevasCitas = citas.filter( cita => cita.id !== idCita); 
    //por cada cita, filtro su cita.id y lo comparo con el parametro idCita, el cual me lo pasan

    localStorage.setItem("citas",JSON.stringify(nuevasCitas));
    visualizarCitas();
}



const agregarCita = ()=> {
    let id = uuid.v1();


    let mascota = document.querySelector('#mascota').value;
    let dueno = document.querySelector("#dueno").value;
    let hora = document.querySelector("#hora").value;
    let fecha = document.querySelector("#fecha").value;
    let sintomas = document.querySelector("#sintomas").value;


  if (mascota.trim() == '' || dueno.trim() == '' ||fecha.trim() == '' || sintomas.trim() == '') {
        mostrarError('#msj-error',"Falta rellenar campos");
        return;
    }

    let nuevaCita = {
        id,
        mascota,
        dueno,
        fecha,
        hora,
        sintomas
    }
    let citas = JSON.parse(localStorage.getItem("citas"));

    if (citas) {
        localStorage.setItem("citas",JSON.stringify(citas));
    }

    else {
        localStorage.setItem("citas",JSON.stringify([]));
    }

    citas.push(nuevaCita);
    localStorage.setItem("citas",JSON.stringify(citas));
    document.querySelector("#form").reset();

    visualizarCitas();



    
}   



const mostrarError = (elemento, mensaje) => {
    divError = document.querySelector(elemento);
    divError.innerHTML = `<p class = alerta-error> ${mensaje} </p>`;
    setTimeout(()=>{
        divError.innerHTML ='';
    }, 2000); //Después de 2 segundos, se limpia el aviso de color rojo
}