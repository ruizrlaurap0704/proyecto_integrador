package DH.grupo14.controller;

import DH.grupo14.dto.CiudadDto;
import DH.grupo14.model.Ciudad;
import DH.grupo14.model.Producto;
import DH.grupo14.service.ICiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/ciudades")
public class CiudadController {

    @Autowired
    ICiudadService iCiudadService;

    @PostMapping("/crear")
    public ResponseEntity<?> crearCiudad(@RequestBody CiudadDto ciudadDto){
        iCiudadService.creaarCiudad(ciudadDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/buscar/{idCiudad}")
    public ResponseEntity<?> buscarCiudad(@PathVariable Long idCiudad){
        ResponseEntity response = null;
        if(iCiudadService.buscarCiudad(idCiudad) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            response = ResponseEntity.ok(iCiudadService.buscarCiudad(idCiudad));
        } return response;
    }

    @PutMapping("/modificar")
    public ResponseEntity<?> modificarCiudad(@RequestBody CiudadDto ciudadDto){
        ResponseEntity response = null;

        if (iCiudadService.buscarCiudad(ciudadDto.getIdCiudad()) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            iCiudadService.modificarCiudad(ciudadDto);
            response = new ResponseEntity(HttpStatus.OK);
        }
        return response;
    }

    @DeleteMapping("/eliminar/{idCiudad}")
    public ResponseEntity<?> eliminarCiudad(@PathVariable Long idCiudad){
        ResponseEntity response = null;

        if (iCiudadService.buscarCiudad(idCiudad) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            iCiudadService.eliminarCiudad(idCiudad);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }

    @GetMapping("/list")
    public Set<CiudadDto> listarCiudades(){return iCiudadService.getTodos();}

    @GetMapping("/{idCiudad}/productos")
    public Collection<Producto> buscarProductoPorCiudad(@PathVariable Long idCiudad){
        Optional<Ciudad> ciudad= iCiudadService.buscarCiudad(idCiudad);

        if (ciudad.isPresent()) {

            Ciudad ciudad1= ciudad.get();
            return ciudad1.getProductos();
        }
        return null;
    }


}
