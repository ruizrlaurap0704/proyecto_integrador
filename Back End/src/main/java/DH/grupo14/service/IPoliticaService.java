package DH.grupo14.service;

import DH.grupo14.dto.PoliticaDto;
import DH.grupo14.model.Politica;

import java.util.Set;

public interface IPoliticaService {

    Politica crearPolitica(PoliticaDto politicaDto);

    PoliticaDto buscarPolitica(Long idPolitica);
    PoliticaDto modificarPolitica(PoliticaDto politicaDto);
    void eliminarPolitica(Long idPolitica);
    Set<PoliticaDto> getTodos();

}
