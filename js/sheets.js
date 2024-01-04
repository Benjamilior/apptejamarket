console.log("wena")
console.log("wena2")
const hoja = "Verificador";
const rango = "!P:AA";
const SPREADSHEET = "1AKH4V5PwfdXBhPPaUBJbQKwBqBk5fLdi7OCiJHoUnac";
ean_encontrar = 7802420151057;
let turnos;


//Lector de codigo de barra
document.addEventListener("DOMContentLoaded", () => {
	const $resultados = document.querySelector("#resultado");
	Quagga.init({
		inputStream: {
			constraints: {
				width: 1920,
				height: 1080,
			},
			name: "Live",
			type: "LiveStream",
			target: document.querySelector('#contenedor'), // Pasar el elemento del DOM
		},
		decoder: {
			readers: ["ean_reader"]
		}
	}, function (err) {
		if (err) {
			console.log(err);
			return
		}
		console.log("Iniciado correctamente");
		Quagga.start();
	});

	Quagga.onDetected((data) => {
        codigoEscaneado = data.codeResult.code;
		$resultados.textContent = codigoEscaneado;
		// Imprimimos todo el data para que puedas depurar
       
		// console.log(codigo_escaneado);
        console.log(codigoEscaneado);
        
	});
});


//Funcion para traer toda la informacion
async function getTurnos() {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET,
      range: hoja + rango ,
    });
  } catch (err) {
    document.getElementById("content").innerText = err.message;
    console.log(err)
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById("content").innerText = "No values found.";
    console.log("No se encontraron Valores")
    return;
    console.log(range.values)
  }
//Almacenamineto de la Info
  turnos = [];
  range.values.forEach((fila) => {
    if (isNaN(parseInt(fila[0])) || fila[12] !== undefined) return;
    const nuevoTurno = {
      EAN: fila[0],
      nombre_producto: fila[1],
      lider_venta: fila[2],
      lider_compa: fila[3],
      jumbo_venta: fila[4],
      jumbo_compa: fila[5],
      unimarc_venta: fila[6],
      unimarc_compa: fila[7],
      santa_venta: fila[8],
      santa_compa: fila[9],
      eltit_venta: fila[10],
      eltit_compa: fila[11]

    };
    turnos.push(nuevoTurno);
  });
  console.log(turnos)

//Para encontrar el EAN que estoy buscando

  let encontrado = turnos.find(elemento => elemento.EAN == ean_encontrar );
  console.log(encontrado.EAN);
  console.log(encontrado.nombre_producto);
  console.log(encontrado.lider_venta);
  console.log(encontrado[4]);

  const contenedor = document.getElementById("contenido");

 // Crea un nuevo elemento HTML para mostrar el objeto
 const parrafo = document.createElement("p");
 parrafo.textContent = `Nombre: ${encontrado.EAN}, Edad: ${encontrado.nombre_producto}}`;

 // Agrega el elemento al contenedor en el DOM
 contenedor.appendChild(parrafo);

}







// async function editTurno(id, contenido) {
//   const update = [
//     contenido.id,
//     contenido.cliente,
//     contenido.email,
//     contenido.modelo,
//     contenido.problema,
//     new Date().toISOString(),
//     contenido.comentario,
//   ]
//   const filaAEditar = parseInt(id)+1;
//   response = await gapi.client.sheets.spreadsheets.values.update({
//     spreadsheetId: SPREADSHEET,
//     range: `${hoja}!A${filaAEditar}:G${filaAEditar}`,
//     values: [update],
//     valueInputOption:"USER_ENTERED"
//   });
//   return response;
// }
