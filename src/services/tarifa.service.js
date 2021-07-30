import Util from "./util.service";

export default function calcularTarifa(
  distancia,
  tipoEnvio,
  modalidad,
  distrito
) {
  let tarifaBase;
  let tarifa;
  let tarifaSugerida;

  const zonaCobertura = JSON.parse(localStorage.getItem("zonaCobertura")).map(
    (key) => key.distrito.split(" *")[0]
  );
  const regexObj = new RegExp(distrito, "ig");

  const isZonaCobertura = zonaCobertura.find((item) =>
    Util.removeAccents(item).match(regexObj)
  );

  const distanciaBase = 3.75;

  const factorKmBase = 1.3333;
  const factorKmEspecial = 1.45;

  switch (tipoEnvio) {
    case "E-Commerce":
      tarifaBase = 7;
      if (distancia < distanciaBase * 3) {
        tarifa = modalidad === "Con Retorno" ? tarifaBase * 2 : tarifaBase;
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              ) * 2
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              );
        break;
      }
      if (isZonaCobertura) {
        tarifaBase = 7;
        tarifa = modalidad === "Con Retorno" ? tarifaBase * 2 : tarifaBase;
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              ) * 2
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              );
        break;
      }
      if (distancia >= distanciaBase * 3 && distancia < distanciaBase * 3.5) {
        tarifa = modalidad === "Con Retorno" ? 9 * 2 : 9;
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              ) * 2
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              );
        break;
      }
      if (distancia >= distanciaBase * 3.5 && distancia < distanciaBase * 4) {
        tarifa = modalidad === "Con Retorno" ? 12 * 2 : 12;
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              ) * 2
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              );
        break;
      }
      if (distancia >= distanciaBase * 4 && distancia < distanciaBase * 4.5) {
        tarifa = modalidad === "Con Retorno" ? 14 * 2 : 14;
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              ) * 2
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              );
        break;
      }
      if (distancia >= distanciaBase * 4.5 && distancia < distanciaBase * 5) {
        tarifa = modalidad === "Con Retorno" ? 16 * 2 : 16;
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              ) * 2
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              );
        break;
      }
      if (distancia >= distanciaBase * 5 && distancia < distanciaBase * 5.5) {
        tarifa = modalidad === "Con Retorno" ? 18 * 2 : 18;
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              ) * 2
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              );
        break;
      }
      if (distancia >= distanciaBase * 5.5) {
        tarifaBase = 18;
        tarifa =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase * 5.5) * factorKmBase
              ) * 2
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase * 5.5) * factorKmBase
              );
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase * 5.5) * factorKmBase
              ) * 2
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase * 5.5) * factorKmBase
              );
        break;
      }
      break;

    case "Express":
      tarifaBase = 7;
      if (distancia <= distanciaBase) {
        tarifa =
          modalidad === "Con Retorno"
            ? tarifaBase + +Math.ceil(tarifaBase / 2)
            : tarifaBase;
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? tarifaBase + +Math.ceil(tarifaBase / 2)
            : tarifaBase;
        break;
      }

      if (distancia <= 11) {
        tarifaBase = 7;
        tarifa =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              ) +
              +Math.ceil(
                +Math.ceil(
                  tarifaBase + (distancia - distanciaBase) * factorKmBase
                ) / 2
              )
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              );
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              ) +
              +Math.ceil(
                +Math.ceil(
                  tarifaBase + (distancia - distanciaBase) * factorKmBase
                ) / 2
              )
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              );
      } else {
        tarifaBase = 7;
        tarifa =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmEspecial
              ) +
              +Math.ceil(
                +Math.ceil(
                  tarifaBase + (distancia - distanciaBase) * factorKmEspecial
                ) / 2
              )
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmEspecial
              );
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmEspecial
              ) +
              +Math.ceil(
                +Math.ceil(
                  tarifaBase + (distancia - distanciaBase) * factorKmEspecial
                ) / 2
              )
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmEspecial
              );
      }
      break;

    case "EmpresaG":
      tarifaBase = 10;

      if (distancia <= distanciaBase) {
        tarifa =
          modalidad === "Con Retorno"
            ? tarifaBase + +Math.ceil(tarifaBase / 2)
            : tarifaBase;
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? tarifaBase + +Math.ceil(tarifaBase / 2)
            : tarifaBase;
        break;
      }

      if (distancia <= 11) {
        tarifa =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              ) +
              +Math.ceil(
                +Math.ceil(
                  tarifaBase + (distancia - distanciaBase) * factorKmBase
                ) / 2
              )
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              );
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              ) +
              +Math.ceil(
                +Math.ceil(
                  tarifaBase + (distancia - distanciaBase) * factorKmBase
                ) / 2
              )
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              );
      } else {
        tarifa =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmEspecial
              ) +
              +Math.ceil(
                +Math.ceil(
                  tarifaBase + (distancia - distanciaBase) * factorKmEspecial
                ) / 2
              )
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmEspecial
              );
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmEspecial
              ) +
              +Math.ceil(
                +Math.ceil(
                  tarifaBase + (distancia - distanciaBase) * factorKmEspecial
                ) / 2
              )
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmEspecial
              );
      }
      break;

    case "Persona":
      tarifaBase = 10;

      if (distancia <= distanciaBase) {
        tarifa =
          modalidad === "Con Retorno"
            ? tarifaBase + +Math.ceil(tarifaBase / 2)
            : tarifaBase;
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? tarifaBase + +Math.ceil(tarifaBase / 2)
            : tarifaBase;
        break;
      }

      if (distancia <= 11) {
        tarifa =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              ) +
              +Math.ceil(
                +Math.ceil(
                  tarifaBase + (distancia - distanciaBase) * factorKmBase
                ) / 2
              )
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              )(
                (tarifaSugerida = +Math.ceil(
                  tarifaBase + (distancia - distanciaBase) * factorKmBase
                ))
              );
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              ) +
              +Math.ceil(
                +Math.ceil(
                  tarifaBase + (distancia - distanciaBase) * factorKmBase
                ) / 2
              )
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmBase
              );
      } else {
        tarifa =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmEspecial
              ) +
              +Math.ceil(
                +Math.ceil(
                  tarifaBase + (distancia - distanciaBase) * factorKmEspecial
                ) / 2
              )
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmEspecial
              );
        tarifaSugerida =
          modalidad === "Con Retorno"
            ? +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmEspecial
              ) +
              +Math.ceil(
                +Math.ceil(
                  tarifaBase + (distancia - distanciaBase) * factorKmEspecial
                ) / 2
              )
            : +Math.ceil(
                tarifaBase + (distancia - distanciaBase) * factorKmEspecial
              );
      }
      break;
  }

  return { tarifa, tarifaSugerida };
}
