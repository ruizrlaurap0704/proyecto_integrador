package DH.grupo14.service;

import DH.grupo14.dto.CiudadDto;
import DH.grupo14.model.Ciudad;
import DH.grupo14.repository.ICiudadRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CiudadService implements ICiudadService {

    @Autowired
    private ICiudadRepository ciudadRepository;

    @Autowired
    ObjectMapper mapper;
    @Override
    public void creaarCiudad(CiudadDto ciudadDto) {guardarCiudad(ciudadDto);}

    private void guardarCiudad(CiudadDto ciudadDto){
        Ciudad ciudad = mapper.convertValue(ciudadDto, Ciudad.class);
        ciudadRepository.save(ciudad);
    }

    @Override
    public Optional<Ciudad> buscarCiudad(Long idCiudad) {
        Optional<Ciudad> ciudad = ciudadRepository.findById(idCiudad);
        CiudadDto ciudadDto = null;
        if (ciudad.isPresent());
        ciudadDto = mapper.convertValue(ciudad, CiudadDto.class);
        return ciudad;
    }

    @Override
    public CiudadDto modificarCiudad(CiudadDto ciudadDto) {
        guardarCiudad(ciudadDto);
        return ciudadDto;
    }

    @Override
    public void eliminarCiudad(Long idCiudad) {ciudadRepository.deleteById(idCiudad);}

    @Override
    public Set<CiudadDto> getTodos() {
        List<Ciudad> ciudades = ciudadRepository.findAll();
        Set<CiudadDto> ciudadDto = new HashSet<>();
        for(Ciudad ciudad: ciudades){
            ciudadDto.add(mapper.convertValue(ciudad, CiudadDto.class));
        }
        return ciudadDto;
    }
}
