package DH.grupo14.service;

import DH.grupo14.dto.CategoriaDto;
import DH.grupo14.model.Categoria;

import java.util.Optional;
import java.util.Set;

public interface ICategoriaService {

    void crearCategoria(CategoriaDto categoriaDto);
    Optional<Categoria> buscarCategoria(Long idCategoria);
    CategoriaDto modificarCategoria(CategoriaDto categoriaDto);
    void eliminarCategoria(Long idCategoria);
    Set<CategoriaDto> getTodos();
}
