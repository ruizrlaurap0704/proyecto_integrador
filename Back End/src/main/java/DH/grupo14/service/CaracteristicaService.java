package DH.grupo14.service;


import DH.grupo14.dto.CaracteristicaDto;
import DH.grupo14.model.Caracteristica;
import DH.grupo14.repository.ICaracteristicaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CaracteristicaService implements ICaracteristicaService{

    @Autowired
    private ICaracteristicaRepository caracteristicaRepository;

    @Autowired
    ObjectMapper mapper;


    @Override
    public Caracteristica crearCaracteristica(CaracteristicaDto caracteristicaDto) { return guardarCaracteristica(caracteristicaDto);}

    private Caracteristica guardarCaracteristica(CaracteristicaDto caracteristicaDto){
        Caracteristica caracteristica = mapper.convertValue(caracteristicaDto, Caracteristica.class);
        return caracteristicaRepository.save(caracteristica);
    }

    @Override
    public CaracteristicaDto buscarCaracteristica(Long idCaracteristica) {
        Optional<Caracteristica> caracteristica = caracteristicaRepository.findById(idCaracteristica);
        CaracteristicaDto caracteristicaDto = null;
        if(caracteristica.isPresent());
        caracteristicaDto = mapper.convertValue(caracteristica, CaracteristicaDto.class);
        return caracteristicaDto;
    }

    @Override
    public CaracteristicaDto modificarCaracteristica(CaracteristicaDto caracteristicaDto) {
        guardarCaracteristica(caracteristicaDto);
        return caracteristicaDto;
    }

    @Override
    public void eliminarCaracteristica(Long idCaracteristica) {caracteristicaRepository.deleteById(idCaracteristica);
    }

    @Override
    public Set<CaracteristicaDto> getTodos() {
        List<Caracteristica> caracteristicas = caracteristicaRepository.findAll();
        Set<CaracteristicaDto> caracteristicaDto = new HashSet<>();

        for (Caracteristica caracteristica: caracteristicas){
            caracteristicaDto.add(mapper.convertValue(caracteristica, CaracteristicaDto.class));
        }
        return caracteristicaDto;
    }
}
