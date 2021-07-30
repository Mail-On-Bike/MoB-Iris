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
}

export default new Util();
