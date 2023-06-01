package DH.grupo14.service;

import DH.grupo14.dto.ReservaDto;
import DH.grupo14.model.Reserva;
import DH.grupo14.repository.IReservaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ReservaService implements IReservaService {

    @Autowired
    private IReservaRepository reservaRepository;
    @Autowired
    ObjectMapper mapper;


    @Override
    public void crearReserva(ReservaDto reservaDto) {guardarReserva(reservaDto);}

    private void guardarReserva(ReservaDto reservaDto){
        Reserva reserva = mapper.convertValue(reservaDto, Reserva.class);
        reservaRepository.save(reserva);
    }

    @Override
    public ReservaDto buscarReserva(Long idReserva) {
        Optional<Reserva> reserva = reservaRepository.findById(idReserva);
        ReservaDto reservaDto = null;
        if(reserva.isPresent());
        reservaDto = mapper.convertValue(reserva, ReservaDto.class);
        return reservaDto;
    }

    @Override
    public ReservaDto modificarReserva(ReservaDto reservaDto) {
        guardarReserva(reservaDto);
        return reservaDto;
    }

    @Override
    public void eliminarReserva(Long idReserva) {reservaRepository.deleteById(idReserva);
    }

    @Override
    public Set<ReservaDto> getTodos() {
        List<Reserva> reservas = reservaRepository.findAll();
        Set<ReservaDto> reservaDto = new HashSet<>();
        for(Reserva reserva: reservas){
            reservaDto.add(mapper.convertValue(reserva, ReservaDto.class));
        }
        return reservaDto;
    }
}
