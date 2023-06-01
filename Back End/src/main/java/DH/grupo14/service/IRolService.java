package DH.grupo14.service;

import DH.grupo14.dto.RolDto;
import DH.grupo14.model.Rol;

import java.util.Set;

public interface IRolService {

    void crearRol(RolDto rolDto);
    RolDto buscarRol (Long idRol);
    RolDto modificarRol (RolDto rolDto);
    void eliminarRol (Long idRol);
    Set<RolDto> getTodos();
}
