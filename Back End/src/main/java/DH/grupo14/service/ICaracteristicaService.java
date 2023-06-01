package DH.grupo14.service;

import DH.grupo14.dto.CaracteristicaDto;
import DH.grupo14.model.Caracteristica;

import java.util.Set;

public interface ICaracteristicaService {

    Caracteristica crearCaracteristica(CaracteristicaDto caracteristicaDto);

    CaracteristicaDto buscarCaracteristica(Long idCaracteristica);

    CaracteristicaDto modificarCaracteristica(CaracteristicaDto caracteristicaDto);

    void eliminarCaracteristica(Long idCaracteristica);

    Set<CaracteristicaDto> getTodos();

}
