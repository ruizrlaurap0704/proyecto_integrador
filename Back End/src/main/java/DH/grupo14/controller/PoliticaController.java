package DH.grupo14.controller;

import DH.grupo14.dto.PoliticaDto;
import DH.grupo14.model.Politica;
import DH.grupo14.service.IPoliticaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.PresentationDirection;
import java.awt.image.ImageProducer;
import java.util.Set;

@RestController
@RequestMapping("/politicas")
public class PoliticaController {

    @Autowired
    IPoliticaService iPoliticaService;

    @PostMapping("/crear")
    public Politica crearPolitica(@RequestBody PoliticaDto politicaDto){
        return iPoliticaService.crearPolitica(politicaDto);
    }

    @GetMapping("/buscar/{idPolitica}")
    public ResponseEntity<?> buscarPolitica(@PathVariable Long idPolitica) {
        ResponseEntity response = null;
        if (iPoliticaService.buscarPolitica(idPolitica) == null) {
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            response = ResponseEntity.ok(iPoliticaService.buscarPolitica(idPolitica));
        } return response;
    }

    @PutMapping("/modificar")
    public ResponseEntity<?>modificarPolitica(@RequestBody PoliticaDto politicaDto){
        ResponseEntity response =null;

        if (iPoliticaService.buscarPolitica(politicaDto.getIdPolitica()) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            iPoliticaService.modificarPolitica(politicaDto);
            response = new ResponseEntity(HttpStatus.OK);
        }
        return response;
    }

    @DeleteMapping("/eliminar/{idPolitica}")
    public ResponseEntity<?> eliminarPolitica(@PathVariable Long idPolitica){
        ResponseEntity response = null;
        if(iPoliticaService.buscarPolitica(idPolitica) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            iPoliticaService.eliminarPolitica(idPolitica);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }

    @GetMapping("/list")
    public Set<PoliticaDto> listarPoliticas(){return iPoliticaService.getTodos();}


}
