package DH.grupo14.controller;

import DH.grupo14.dto.ImagenDto;
import DH.grupo14.model.Imagen;
import DH.grupo14.service.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/imagenes")
public class ImagenController {

    @Autowired
    IImagenService iImagenService;

    @PostMapping("/crear")
    public Imagen crearImagen(@RequestBody ImagenDto imagenDto){
        return iImagenService.crearImagen(imagenDto);
    }

    @GetMapping("buscar/{idImagen}")
    public ResponseEntity<?> buscarImagen(@PathVariable Long idImagen){
        ResponseEntity response = null;
        if(iImagenService.buscarImagen(idImagen) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            response = ResponseEntity.ok(iImagenService.buscarImagen(idImagen));
        } return response;
    }

    @PutMapping("modificar")
    public ResponseEntity<?> modificarImagen(@RequestBody ImagenDto imagenDto){
        ResponseEntity response= null;

        if(iImagenService.buscarImagen(imagenDto.getIdImagen()) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else{
            iImagenService.modificarImagen(imagenDto);
            response = new ResponseEntity(HttpStatus.OK);
        }
        return response;
    }

    @DeleteMapping("/eliminar/{idImagen}")
    public ResponseEntity<?> eliminarImagen(@PathVariable Long idImagen){
        ResponseEntity response = null;

        if(iImagenService.buscarImagen(idImagen) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            iImagenService.eliminarImagen(idImagen);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;

    }

    @GetMapping("/list")
    public Set<ImagenDto> listarImagenes(){return iImagenService.getTodos();}




}
