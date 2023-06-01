package DH.grupo14.controller;

import DH.grupo14.dto.CaracteristicaDto;
import DH.grupo14.model.Caracteristica;
import DH.grupo14.service.ICaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicaController {

    @Autowired
    ICaracteristicaService iCaracteristicaService;

    @PostMapping("/crear")
    public Caracteristica crearCaracteristica(@RequestBody CaracteristicaDto caracteristicaDto){
        return iCaracteristicaService.crearCaracteristica(caracteristicaDto);
    }

    @GetMapping("/buscar/{idCaracteristica}")
    public ResponseEntity<?> buscarCaracteristica(@PathVariable Long idCaracteristica){
        ResponseEntity response = null;
        if (iCaracteristicaService.buscarCaracteristica(idCaracteristica) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            response = ResponseEntity.ok(iCaracteristicaService.buscarCaracteristica(idCaracteristica));
        }
        return response;
    }

    @PutMapping("modificar")
    public ResponseEntity<?> modificarCaracteristica(@RequestBody CaracteristicaDto caracteristicaDto) {
        ResponseEntity response = null;

        if (iCaracteristicaService.buscarCaracteristica(caracteristicaDto.getIdCaracteristica()) == null) {
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            iCaracteristicaService.modificarCaracteristica(caracteristicaDto);
            response = new ResponseEntity(HttpStatus.OK);
        }
        return response;
    }

        @DeleteMapping("/eliminar/{idCaracteristica}")
                public ResponseEntity<?> eliminarCaracteristica(@PathVariable Long idCaracteristica){
            ResponseEntity response = null;
            if (iCaracteristicaService.buscarCaracteristica(idCaracteristica) == null){
                response = new ResponseEntity(HttpStatus.NOT_FOUND);
            }else {
                iCaracteristicaService.eliminarCaracteristica(idCaracteristica);
                response = new ResponseEntity(HttpStatus.NO_CONTENT);
            } return response;
        }

        @GetMapping("/list")
    public Set<CaracteristicaDto> LISTARidCaracteristicas(){return iCaracteristicaService.getTodos();
    }

}



