function formatFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  // Ajustamos la fecha a medianoche
  fecha.setHours(0, 0, 0, 0);
  // Formateamos el día, mes y año
  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Mes es 0-indexado
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`; // Formato 'YYYY-MM-DD'
}
