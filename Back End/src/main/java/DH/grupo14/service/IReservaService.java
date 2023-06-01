package DH.grupo14.service;


import DH.grupo14.dto.ReservaDto;

import java.util.Set;

public interface IReservaService {

    void crearReserva(ReservaDto reservaDto);
    ReservaDto buscarReserva (Long idReserva);
    ReservaDto modificarReserva (ReservaDto reservaDto);
    void eliminarReserva (Long idReserva);
    Set<ReservaDto> getTodos();
}
