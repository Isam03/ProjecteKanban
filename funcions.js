// Objeto columna iniciada
// crea una etiqueta div con un boton con el metodo añadir tarjeta
// boton | Titulo
//clase tarea
class Tarea {
  constructor(id, titulo, titulo_corto, descripcion, color, fecha_creacion, fecha_finalizacion, responsables) {
    this.id = id;
    this.titulo = titulo;
    this.titulo_corto = titulo_corto;
    this.descripcion = descripcion;
    this.color = color;
    this.fecha_creacion = fecha_creacion;
    this.fecha_finalizacion = fecha_finalizacion;
    this.responsables = responsables;
  }
}

class Persona {
  constructor(id, nombre, apellido, usuario) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.nombreUsuario = usuario;
  }
}



function comprovarPersona(id){
    if(this.id == id){
      return true;
    }
    else{
      return false;
    }
  }


let tareas = [];
let responsables = [];




$(function () {
  $("#campoResponsable").selectize({plugins: ['remove_button']});
});

$(function () {
  $("#editCampoResponsable").selectize({plugins: ['remove_button']});
});

if (typeof (Storage) !== "undefined") {
    tareas = JSON.parse(localStorage.getItem("tareas") || "[]");
    const docPadre = document.getElementById("cos");

    for (let tarea of tareas) {
      
      console.log("Fecha inicio: " + tarea.fecha_creacion);
      console.log("Fecha final: " + tarea.fecha_finalizacion);

      let string = "<div id='tarea' class='card text-bg-" + tarea.color + " mb-3' style='max-width: 18rem;'><div class='card-body'><div class='container-fluid'><div class='row row-cols-2'><div class='col'><h5 id='tarea-titulo' class='card-title' data-bs-toggle='tooltip' data-bs-placement='top' title='" + tarea.titulo + "'>" + tarea.titulo_corto + "</h5></div><div class='col'><button type='button' class='btn btn-outline-light' onclick='eliminaTarea(\"" + tarea.id + "\")' ><i class='fa-regular fa-trash-can' aria-label='delete'></i></button><button type='button' class='btn btn-outline-light ms-2' data-bs-toggle='modal' data-bs-target='#editModal' onclick='' disabled><i class='fa-regular fa-pen-to-square' aria-label='delete'></i></button></div></div><p class='card-text'>" + tarea.descripcion + "</p>";
      
      if(tarea.responsables.length > 0){
        for(let i = 0; i < tarea.responsables.length; i++){
          string += "<span class='badge rounded-pill bg-light text-dark me-2'>" + tarea.responsables[i].nombre + " " + tarea.responsables[i].apellido + "</span>";
        }

        string += "</div></div><div class='card-footer'><div class='row row-cols-2'><div class='col'><i class='fa-regular fa-calendar'></i>" + " " + tarea.fecha_creacion + "</div><div class='col'><i class='fa-regular fa-calendar-check'></i>" + " " + tarea.fecha_finalizacion + "</div></div></div>";
      }
      else{

        string += "</div></div><div class='card-footer'><div class='row row-cols-2'><div class='col'><i class='fa-regular fa-calendar'></i>" + " " + tarea.fecha_creacion + "</div><div class='col'><i class='fa-regular fa-calendar-check'></i>" + " " + tarea.fecha_finalizacion + "</div></div></div>";
      }

      // console.log("tarea: " + Object.toString(tarea.responsables));
      console.dir(tarea.responsables);
      docPadre.innerHTML += string;
      
    }
  } else {
    document.write("<div class='alert alert-danger' role='alert'>El navegador no permet localStorage, per tant es incompatible</div>")
}

if (typeof (Storage) !== "undefined") {
    responsables = JSON.parse(localStorage.getItem("personas") || "[]");
    for (let persona of responsables) {
      const raizUsuarios = document.getElementById("personas");
      let string = "<div class='card mb-3'><div class='card-body'><div class='container-fluid'><div class='row row-cols-2'><div class='col'><h5 class='card-title'>" + persona.nombre + " " + persona.apellido + "</h5></div><div class='col d-grid gap-2 d-md-flex justify-content-md-end'><button type='button' class='btn btn-light' onclick='eliminaUsuario(\"" + persona.id + "\")' ><i class='fa-regular fa-trash-can' aria-label='delete'></i></button></div></div><h6 class='card-subtitle mb-2 text-muted'>" + persona.nombreUsuario + "</h6></div></div><br>";
      raizUsuarios.innerHTML += string;
    }
  } else {
    document.write("<div class='alert alert-danger' role='alert'>El navegador no permet localStorage, per tant es incompatible</div>")
}

function eliminaTarea(id) {
  let idx;
  tareas = tareas.filter(tarea => {
    if (tarea.id != id) {
      return tarea;
    }
  })
  actualizarTareas();
}

function eliminaUsuario(id){
  responsables = responsables.filter(resp => {
    if (resp.id != id){
      return resp;
    }
  })
  actualizarUsuarios();
}

function editaUsuario(id){
  tareas = JSON.parse(localStorage.getItem("tareas") || "[]");
  for (let tarea of tareas){
    if(tarea.id == id){
      document.getElementById("editCampoTitulo").value = tarea.titulo;
      document.getElementById("editCampoDescripcion").value = tarea.descripcion;
      document.getElementById("editCampoFechaInicio").value = tarea.fecha_creacion;
      document.getElementById("editCampoFechaInicio").value = tarea.fecha_creacion;
      // document.getElementById("editCampoPrioridad").value = tarea.color;

      document.getElementById("divResponsablesAsignados").innerHTML = "";

      if(tarea.responsables.length > 0){
        
        for(let i = 0; i < tarea.responsables.length; i++){
          var z = document.createElement("div");
          // z.setAttribute("value", selectedItems[i].id);
          // z.setAttribute("class", "btn btn-light border-secondary mt-2 mb-2 me-2");
          z.setAttribute("class", "d-inline-flex mt-1 me-2 p-1 text-dark bg-secondary bg-opacity-10 border border-dark border-opacity-10 rounded-2 ");
          var t = document.createTextNode(tarea.responsables[i].nombre + " " + tarea.responsables[i].apellido);
          // var b = document.createElement("button");
          // b.setAttribute("class", "btn-close btn-close-bg ms-2");
          // b.setAttribute("type", "button");
          // b.setAttribute("onClick", function eliminaresp(){selectedItems = selectedItems.filter(resp => { if (resp.id != selectedItems[i].id){ return resp; }})} ; eliminaresp());
          // b.setAttribute("onClick", "eliminarUsuarioEdit(\"" + tarea.responsables[i].id +  "\",\"" + json.stringify(tarea.responsables) + "\")");
          z.appendChild(t);
          // z.appendChild(b);

          document.getElementById("divResponsablesAsignados").append(z);
          
        }
      }
      else{
        var k = document.createElement("div");
        k.setAttribute("class", "fw-semibold text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-2 mt-2 p-1");
        var y = document.createTextNode("No hay ningun responsable añadido a esta tarea");
        k.appendChild(y);
        document.getElementById("divResponsablesAsignados").append(k);
      }
    }
  }

  var id = tarea.id;
  var titulo = document.getElementById("editCampoTitulo").value;
  var titulo_corto = document.getElementById("editCampoDescripcion").value;
  var descripcion = document.getElementById("editCampoDescripcion").value;
  var prioridad = document.getElementById("editCampoPrioridad").value;
  var fecha_inicio = document.getElementById("editCampoFechaInicio").value;
  var fecha_final = document.getElementById("editCampoFechaFinal").value;
  var responsable = tarea.responsables;

  if(prioridad == "urgente"){
    color = "warning";
  }
  else if(prioridad == "importante"){
    color = "danger";
  }
  else if(prioridad == "alta"){
    color = "primary";
  }
  else if(prioridad == "media"){
    color = "info";
  }
  else if(prioridad == "baja"){
    color = "secondary";
  }

      if(titulo.length > 22){

        titulo_corto = titulo.substring(0,22) + "...";

        creaTarea(id, titulo, titulo_corto, descripcion, color, fecha_inicio, fecha_final, responsable);
        actualizarTareas();
      }
      else{
        creaTarea(id, titulo, titulo_corto, descripcion, color, fecha_inicio, fecha_final, responsable);
        actualizarTareas();
      }

  // añadirTareaLocalStorage(tareas);

}

// function eliminarUsuarioEdit(id, arr){

//     console.log("S'està executant");
//     console.table(arr, ['nombre', 'apellido']);
//     arr = arr.filter(resp => {
//         if (resp.id != id){
          
//           console.log("eliminat")
//           return resp;
//           actualizarTareas();
//           // console.table(selectedItems, ['nombre', 'apellido']);
//         }
//     })
//   };

function creaTarea(id, titulo, titulo_corto, descr, color, fecha_inicio, fecha_final, responsables) {
  tarea = new Tarea(id, titulo, titulo_corto, descr, color, fecha_inicio, fecha_final, responsables);

  tareas.push(tarea);
}

function crearUsuario(id, nombre, apellido, usuario){
  resp = new Persona(id, nombre, apellido, usuario);

  responsables.push(resp);
}



function actualizarUsuarios(){
  document.getElementById("personas").innerHTML = "";
  for (let persona of responsables){
    const raizUsuarios = document.getElementById("personas");

    let string = "<div class='card mb-3'><div class='card-body'><div class='container-fluid'><div class='row row-cols-2'><div class='col'><h5 class='card-title'>" + persona.nombre + " " + persona.apellido + "</h5></div><div class='col d-grid gap-2 d-md-flex justify-content-md-end'><button type='button' class='btn btn-light' onclick='eliminaUsuario(\"" + persona.id + "\")' ><i class='fa-regular fa-trash-can' aria-label='delete'></i></button></div></div><h6 class='card-subtitle mb-2 text-muted'>" + persona.nombreUsuario + "</h6></div></div>";
    raizUsuarios.innerHTML += string;
  }

  añadirPersonaLocalStorage(responsables);
}

function enviaUsuario(){
  var id = uuidv4();
  var nombre = document.getElementById("campoNombre").value;
  var apellido = document.getElementById("campoApellido").value;
  var usuario = document.getElementById("campoUsuario").value;

  crearUsuario(id, nombre, apellido, usuario);
  actualizarUsuarios();
}


function enviaTextos() {
  var id = uuidv4();
  var titulo = document.getElementById("campoTitulo").value;
  var titulo_corto = document.getElementById("campoTitulo").value;
  var descripcion = document.getElementById("campoDescripcion").value;
  var prioridad = document.getElementById("campoPrioridad").value;
  var fecha_inicio = document.getElementById("campoFechaInicio").value;
  var fecha_final = document.getElementById("campoFechaFinal").value;
  // var responsable = document.getElementById("campoResponsable").value;
  var responsable = [];
  for(let opcion of document.getElementById('campoResponsable').options){

    for(let i = 0; i < responsables.length; i++){
      if(opcion.selected){
        if(opcion.value == responsables[i].id){
        responsable.push(responsables[i]);
      }
      }
    }
  }

  if(prioridad == "urgente"){
    color = "warning";
  }
  else if(prioridad == "importante"){
    color = "danger";
  }
  else if(prioridad == "alta"){
    color = "primary";
  }
  else if(prioridad == "media"){
    color = "info";
  }
  else if(prioridad == "baja"){
    color = "secondary";
  }

  if(titulo.length > 22){

    titulo_corto = titulo.substring(0,22) + "...";

    creaTarea(id, titulo, titulo_corto, descripcion, color, fecha_inicio, fecha_final, responsable);
    actualizarTareas();
  }
  else{
    creaTarea(id, titulo, titulo_corto, descripcion, color, fecha_inicio, fecha_final, responsable);
    actualizarTareas();
  }
}

function añadirTareaLocalStorage(value) {
  if (typeof (Storage) !== "undefined") {
    window.localStorage.setItem("tareas", JSON.stringify(value));
  } else {
    document.write("<div class='alert alert-danger' role='alert'>El navegador no permet localStorage, per tant es incompatible</div>")
  }
}

function añadirPersonaLocalStorage(value) {
  if (typeof (Storage) != "undefined") {
    window.localStorage.setItem("personas", JSON.stringify(value));
  }else{
    document.write("<div class='alert alert-danger' role='alert'>El navegador no permet localStorage, per tant es incompatible</div>")
  }
}

// function obtenerTareasGuardadas() {
  
// }

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function actualizarListaPersonasDOM(){

  let seleccioPersones = document.getElementById("campoResponsable").options;
  for(let persona of responsables){
    let opc = document.createElement("option");

    opc.class = "item";
    opc.value = persona.id;
    opc.text = persona.nombreUsuario;

    seleccioPersones.add(opc);

    
  }
}

actualizarListaPersonasDOM();

function actualizarTareas() {
    document.getElementById("cos").innerHTML = "";
    const docPadre = document.getElementById("cos");

  
    for (let tarea of tareas) {

      
      let string = "<div id='tarea' class='card text-bg-" + tarea.color + " mb-3' style='max-width: 18rem;'><div class='card-body'><div class='container-fluid'><div class='row row-cols-2'><div class='col'><h5 id='tarea-titulo' class='card-title' data-bs-toggle='tooltip' data-bs-placement='top' title='" + tarea.titulo + "'>" + tarea.titulo_corto + "</h5></div><div class='col'><button type='button' class='btn btn-outline-light' onclick='eliminaTarea(\"" + tarea.id + "\")' ><i class='fa-regular fa-trash-can' aria-label='delete'></i></button><button type='button' class='btn btn-outline-light ms-2' data-bs-toggle='modal' data-bs-target='#editModal' onclick='' disabled><i class='fa-regular fa-pen-to-square' aria-label='delete'></i></button></div></div><p class='card-text'>" + tarea.descripcion + "</p>";
      if(tarea.responsables.length > 0){
        for(let i = 0; i < tarea.responsables.length; i++){
          string += "<span class='badge rounded-pill bg-light text-dark me-2'>" + tarea.responsables[i].nombre + " " + tarea.responsables[i].apellido + "</span>";
        }

        string += "</div></div><div class='card-footer'><div class='row row-cols-2'><div class='col'><i class='fa-regular fa-calendar'></i>" + " " + tarea.fecha_creacion + "</div><div class='col'><i class='fa-regular fa-calendar-check'></i>" + " " + tarea.fecha_finalizacion + "</div></div></div>";
      }
      else{
        string += "</div></div><div class='card-footer'><div class='row row-cols-2'><div class='col'><i class='fa-regular fa-calendar'></i>" + " " + tarea.fecha_creacion + "</div><div class='col'><i class='fa-regular fa-calendar-check'></i>" + " " + tarea.fecha_finalizacion + "</div></div></div>";
      }

      docPadre.innerHTML += string;
    }
  
  añadirTareaLocalStorage(tareas);
  actualizarListaPersonasDOM()

}