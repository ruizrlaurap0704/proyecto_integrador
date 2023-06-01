package DH.grupo14.controller;

import DH.grupo14.dto.ReservaDto;
import DH.grupo14.service.IReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    IReservaService iReservaService;

    @PostMapping("/crear")
    public ResponseEntity<?> crearReservas(@RequestBody ReservaDto reservaDto){
        iReservaService.crearReserva(reservaDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/buscar/{idReserva}")
    public ResponseEntity<?> buscarReserva(@PathVariable Long idReserva){
        ResponseEntity response = null;
        if (iReservaService.buscarReserva(idReserva) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            response = ResponseEntity.ok(iReservaService.buscarReserva(idReserva));
        } return response;
    }

    @PutMapping("/modificar")
    public ResponseEntity<?> modificarReserva(@RequestBody ReservaDto reservaDto){
        ResponseEntity response = null;

        if (iReservaService.buscarReserva(reservaDto.getIdReserva()) == null) {
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            iReservaService.modificarReserva(reservaDto);
            response = new ResponseEntity(HttpStatus.OK);
        }
        return response;
    }

    @DeleteMapping("/eliminar/{idReserva}")
    public ResponseEntity<?> eliminarReserva(@PathVariable Long idReserva) {
        ResponseEntity response = null;

        if (iReservaService.buscarReserva(idReserva) == null) {
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            iReservaService.eliminarReserva(idReserva);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }

    @GetMapping("/list")
    public Set<ReservaDto> listarReservas(){
        return iReservaService.getTodos();
    }


}
