package DH.grupo14.controller;

import DH.grupo14.dto.ProductoDto;
import DH.grupo14.dto.RolDto;
import DH.grupo14.service.IRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/roles")
public class RolController {

    @Autowired
    IRolService iRolService;

    @PostMapping("/crear")
    public ResponseEntity<?> crearRol(@RequestBody RolDto rolDto){
        iRolService.crearRol(rolDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/buscar/{idRol}")
    public ResponseEntity<?> buscarRol(@PathVariable Long idRol){
        ResponseEntity response = null;
        if (iRolService.buscarRol(idRol) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            response = ResponseEntity.ok(iRolService.buscarRol(idRol));
        } return response;
    }

    @PutMapping("/modificar")
    public ResponseEntity<?> modificarRol(@RequestBody RolDto rolDto){
        ResponseEntity response = null;

        if (iRolService.buscarRol(rolDto.getIdRol()) == null) {
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            iRolService.modificarRol(rolDto);
            response = new ResponseEntity(HttpStatus.OK);
        }
        return response;
    }

    @DeleteMapping("/eliminar/{idRol}")
    public ResponseEntity<?> eliminarRol(@PathVariable Long idRol) {
        ResponseEntity response = null;

        if (iRolService.buscarRol(idRol) == null) {
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            iRolService.eliminarRol(idRol);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }

    @GetMapping("/list")
    public Set<RolDto> listarRoles(){
        return iRolService.getTodos();
    }

}
