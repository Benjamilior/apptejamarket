console.log("wena")
console.log("wena2")
const hoja = "Verificador";
const rango = "!P:AA";
const SPREADSHEET = "1AKH4V5PwfdXBhPPaUBJbQKwBqBk5fLdi7OCiJHoUnac";
ean_encontrar = 4066600219514;
let turnos;

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

  let encontrado = turnos.find(elemento => elemento.EAN == ean_encontrar );
  console.log(encontrado);

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
