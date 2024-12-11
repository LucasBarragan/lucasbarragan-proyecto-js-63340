let nombreAlumno1 = "";
let notaAlumno1 = 0;

let nombreAlumno2 = "";
let notaAlumno2 = 0;

function agregarAlumno1() {
  let nombreAlumno = prompt("Ingrese el nombre del primer alumno:");
  while (nombreAlumno === "") {
    nombreAlumno = prompt("Por favor, ingrese un nombre válido:");
  }
  
  let notaAlumno = prompt("Ingrese la nota del primer alumno:");
  while (notaAlumno === "" || notaAlumno <= 0 || notaAlumno >= 11) {
    notaAlumno = prompt("Por favor, ingrese una nota válida (entre 1 y 10):");
  }
  
  nombreAlumno1 = nombreAlumno;
  notaAlumno1 = parseInt(notaAlumno);
}

function agregarAlumno2() {
  let nombreAlumno = prompt("Ingrese el nombre del segundo alumno:");
  while (nombreAlumno === "") {
    nombreAlumno = prompt("Por favor, ingrese un nombre válido:");
  }
  
  let notaAlumno = prompt("Ingrese la nota del segundo alumno:");
  while (notaAlumno === "" || notaAlumno <= 0 || notaAlumno >= 11) {
    notaAlumno = prompt("Por favor, ingrese una nota válida (entre 1 y 10):");
  }
  
  nombreAlumno2 = nombreAlumno;
  notaAlumno2 = parseInt(notaAlumno);
}

function calcularNotaFinal() {
  let notaFinal = (notaAlumno1 + notaAlumno2) / 2;
  return notaFinal;
}

function mostrarResultados() {
  let notaFinal = calcularNotaFinal();
  
  console.log("Nota final promedio: " + notaFinal);
  console.log(nombreAlumno1 + ": " + notaAlumno1);
  console.log(nombreAlumno2 + ": " + notaAlumno2);
}

agregarAlumno1();
agregarAlumno2();
mostrarResultados();