import dayjs from "dayjs";

class Util {
  removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  capitalizar(texto) {
    const nuevoTexto = texto
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

    return nuevoTexto;
  }

  asignarHoy() {
    return dayjs(new Date()).format("YYYY-MM-DDT10:00:00");
  }

  asignarMañana() {
    let DIA_EN_MS = 24 * 60 * 60 * 1000;
    let manana = new Date(new Date().getTime() + DIA_EN_MS);
    return dayjs(manana).format("YYYY-MM-DDT10:00:00");
  }
}

export default new Util();
