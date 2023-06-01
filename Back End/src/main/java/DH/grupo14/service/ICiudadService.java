package DH.grupo14.service;

import DH.grupo14.dto.CiudadDto;
import DH.grupo14.model.Ciudad;

import java.util.Optional;
import java.util.Set;

public interface ICiudadService {

    void creaarCiudad(CiudadDto ciudadDto);

    Optional<Ciudad> buscarCiudad(Long idCiudad);

    CiudadDto modificarCiudad(CiudadDto ciudadDto);

    void eliminarCiudad(Long idCiudad);

    Set<CiudadDto> getTodos();

}