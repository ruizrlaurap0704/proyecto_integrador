package DH.grupo14.controller;

import DH.grupo14.dto.CategoriaDto;
import DH.grupo14.model.Categoria;
import DH.grupo14.model.Producto;
import DH.grupo14.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;
import java.util.Collection;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {
    @Autowired
    ICategoriaService iCategoriaService;

    @PostMapping("/crear")
    public ResponseEntity<?> crearCategoria(@RequestBody CategoriaDto categoriaDto){
        iCategoriaService.crearCategoria(categoriaDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/buscar/{idCategoria}")
    public ResponseEntity<?> buscarCategoria(@PathVariable Long idCategoria){
        ResponseEntity response = null;
        if (iCategoriaService.buscarCategoria(idCategoria) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            response = ResponseEntity.ok(iCategoriaService.buscarCategoria(idCategoria));
        } return response;
    }

    @PutMapping("/modificar")
    public ResponseEntity<?> modificarCategoria(@RequestBody CategoriaDto categoriaDto) {
        ResponseEntity response = null;

        if (iCategoriaService.buscarCategoria(categoriaDto.getIdCategoria()) == null) {
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            iCategoriaService.modificarCategoria(categoriaDto);
            response = new ResponseEntity(HttpStatus.OK);
        }
        return response;
    }

    @DeleteMapping("/eliminar/{idCategoria}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Long idCategoria) {
        ResponseEntity response = null;

        if (iCategoriaService.buscarCategoria(idCategoria) == null) {
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            iCategoriaService.eliminarCategoria(idCategoria);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }

    @GetMapping("/list")
    public Set<CategoriaDto> listarCategorias(){
        return iCategoriaService.getTodos();
    }


    @GetMapping("/{idCategoria}/productos")
    public Collection<Producto> buscarProductoPorCategoria(@PathVariable Long idCategoria){
        Optional<Categoria> categoria= iCategoriaService.buscarCategoria(idCategoria);

        if (categoria.isPresent()) {

            Categoria categoria1= categoria.get();
            return categoria1.getProductos();
        }
        return null;
    }

}
