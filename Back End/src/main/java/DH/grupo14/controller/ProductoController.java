package DH.grupo14.controller;

import DH.grupo14.dto.ProductoDto;
import DH.grupo14.model.Producto;
import DH.grupo14.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    IProductoService iProductoService;

    @PostMapping("/crear")
    public Producto crearProducto(@RequestBody ProductoDto productoDto){
        return iProductoService.crearProducto(productoDto);
    }

    @GetMapping("/buscar/{idProducto}")
    public ResponseEntity<?> buscarProducto(@PathVariable Long idProducto){
        ResponseEntity response = null;
        if(iProductoService.buscarProducto(idProducto) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            response = ResponseEntity.ok(iProductoService.buscarProducto(idProducto));
        } return response;
    }

    @PutMapping("/modificar")
    public ResponseEntity<?> modificarProducto(@RequestBody ProductoDto productoDto) {
        ResponseEntity response = null;

        if (iProductoService.buscarProducto(productoDto.getIdProducto()) == null) {
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            iProductoService.modificarProducto(productoDto);
            response = new ResponseEntity(HttpStatus.OK);
        }
        return response;
    }

    @DeleteMapping("/eliminar/{idProducto}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long idProducto) {
        ResponseEntity response = null;

        if (iProductoService.buscarProducto(idProducto) == null) {
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            iProductoService.eliminarProducto(idProducto);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }

    @GetMapping("/list")
    public Set<ProductoDto> listarProductos(){
        return iProductoService.getTodos();
    }

    @GetMapping("/filtrar")
    public ResponseEntity<Set<ProductoDto>> buscarFiltrando(
            @RequestParam(name = "idCategoria", required = false) Long idCategoria,
            @RequestParam(name = "idCiudad", required = false) Long idCiudad
    ){
        return ResponseEntity.ok(iProductoService.buscarFiltrando(idCategoria, idCiudad));
    }

    @GetMapping("/random")
    public ResponseEntity<Set<ProductoDto>> buscarRandom(){
        return ResponseEntity.ok(iProductoService.buscarRandom());
    }


    //@GetMapping("/listProdPorCiudad/{idCiudad}")
    //public List<Producto> buscarProductoPorCiudad(@PathVariable String idCiudad){
        //  return iProductoService.buscarProductoPorCiudad(nombre);
        //}

    //Filtro por ciudad y fechas
    //EJEMPLO URL products/listcitydate/2021-11-06/2022-08-01/Salta
    @GetMapping("/listarPorFechasYCiudad/{fechaInicio}/{fechaFinal}/{nombre}")
    public Collection<ProductoDto> findProductByCityAndDate(@PathVariable("fechaInicio")
                                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fechaInicio,
                                                            @PathVariable("fechaFinal")
                                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fechaFinal,
                                                            @PathVariable("nombre") String nombre)
    {
        return iProductoService.findProductByDateAndCity(fechaInicio,fechaFinal,nombre);
    }



    //Filtro por fechas
    @GetMapping("/listarPorFechas/{fechaInicio}/{fechaFinal}")
    public Collection<ProductoDto> findProductByDate(@PathVariable("fechaInicio")
                                                    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fechaInicio,
                                                    @PathVariable("fechaFinal")
                                                    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fechaFinal)

    {
        return iProductoService.findProductByDate(fechaInicio,fechaFinal);
    }


    }
