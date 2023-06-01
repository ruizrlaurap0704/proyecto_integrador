package DH.grupo14.service;

import DH.grupo14.dto.RolDto;
import DH.grupo14.model.Rol;
import DH.grupo14.repository.IRolRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RolService implements IRolService {

    @Autowired
    private IRolRepository rolRepository;
    @Autowired
    ObjectMapper mapper;


    @Override
    public void crearRol(RolDto rolDto) {guardarRol(rolDto);}

    private void guardarRol(RolDto rolDto){
        Rol rol = mapper.convertValue(rolDto, Rol.class);
        rolRepository.save(rol);
    }

    @Override
    public RolDto buscarRol(Long idRol) {
        Optional<Rol> rol = rolRepository.findById(idRol);
        RolDto rolDto = null;
        if(rol.isPresent());
        rolDto = mapper.convertValue(rol, RolDto.class);
        return rolDto;
    }

    @Override
    public RolDto modificarRol(RolDto rolDto) {
        guardarRol(rolDto);
        return rolDto;
    }

    @Override
    public void eliminarRol(Long idRol) {rolRepository.deleteById(idRol);
    }

    @Override
    public Set<RolDto> getTodos() {
        List<Rol> roles = rolRepository.findAll();
        Set<RolDto> rolesDto = new HashSet<>();
        for(Rol rol: roles){
            rolesDto.add(mapper.convertValue(rol, RolDto.class));
        }
        return rolesDto;
    }
}
