package DH.grupo14.service;


import DH.grupo14.dto.ProductoDto;
import DH.grupo14.model.Producto;

import java.util.*;

public interface IProductoService {

    Producto crearProducto(ProductoDto productoDto);
    ProductoDto buscarProducto (Long idProducto);
    ProductoDto modificarProducto (ProductoDto productoDto);
    void eliminarProducto (Long idProducto);
    Set<ProductoDto> getTodos();

    Set<ProductoDto> buscarFiltrando(Long idCategoria, Long idCiudad);

    Set<ProductoDto> buscarRandom();

    //Filtro por ciudad y fechas
    Collection<ProductoDto> findProductByDateAndCity(Date fechaInicio, Date fechaFinal, String nombre );


    //Filtro fechas
    Collection<ProductoDto> findProductByDate(Date fechaInicio, Date fechaFinal);

}
