package DH.grupo14.service;

import DH.grupo14.dto.PoliticaDto;
import DH.grupo14.model.Politica;
import DH.grupo14.repository.IPoliticaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PoliticaService implements IPoliticaService{

    @Autowired
    private IPoliticaRepository politicaRepository;

    @Autowired
    ObjectMapper mapper;


    @Override
    public Politica crearPolitica(PoliticaDto politicaDto) {return guardarPolitica(politicaDto);}

    private Politica guardarPolitica(PoliticaDto politicaDto){
        Politica politica = mapper.convertValue(politicaDto, Politica.class);
        return politicaRepository.save(politica);
    }

    @Override
    public PoliticaDto buscarPolitica(Long idPolitica) {
        Optional<Politica> politica = politicaRepository.findById(idPolitica);
        PoliticaDto politicaDto = null;
        if(politica.isPresent());
        politicaDto = mapper.convertValue(politica, PoliticaDto.class);
        return politicaDto;
    }

    @Override
    public PoliticaDto modificarPolitica(PoliticaDto politicaDto) {
        guardarPolitica(politicaDto);
        return politicaDto;
    }

    @Override
    public void eliminarPolitica(Long idPolitica) {politicaRepository.deleteById(idPolitica);
    }

    @Override
    public Set<PoliticaDto> getTodos() {
        List<Politica> politicas= politicaRepository.findAll();
        Set<PoliticaDto> politicaDto = new HashSet<>();
        for (Politica politica: politicas){
            politicaDto.add(mapper.convertValue(politica, PoliticaDto.class));
        }
        return politicaDto;
    }
}
