package DH.grupo14.service;

import DH.grupo14.dto.CategoriaDto;
import DH.grupo14.model.Categoria;
import DH.grupo14.repository.ICategoriaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService implements ICategoriaService{
    @Autowired
    private ICategoriaRepository categoriaRepository;
    @Autowired
    ObjectMapper mapper;

    @Override
    public void crearCategoria(CategoriaDto categoriaDto) {guardarCategoria(categoriaDto);}

    private void guardarCategoria(CategoriaDto categoriaDto){
        Categoria categoria = mapper.convertValue(categoriaDto, Categoria.class);
        categoriaRepository.save(categoria);
    }

    @Override
    public Optional<Categoria> buscarCategoria(Long idCategoria) {
        Optional<Categoria> categoria = categoriaRepository.findById(idCategoria);
        CategoriaDto categoriaDto = null;
        if (categoria.isPresent()) ;
        categoriaDto = mapper.convertValue(categoria, CategoriaDto.class);
        return categoria;
    }

    @Override
    public CategoriaDto modificarCategoria(CategoriaDto categoriaDto){
        guardarCategoria(categoriaDto);
        return categoriaDto;
    }

    @Override
    public void eliminarCategoria(Long idCategoria){categoriaRepository.deleteById(idCategoria);}

    @Override
    public Set<CategoriaDto> getTodos(){
        List<Categoria> categorias = categoriaRepository.findAll();
        Set<CategoriaDto> categoriaDto = new HashSet<>();

        for (Categoria categoria: categorias){
            categoriaDto.add(mapper.convertValue(categoria,CategoriaDto.class));
        } return categoriaDto;

    }

}
