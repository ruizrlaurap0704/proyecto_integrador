package DH.grupo14.service;

import DH.grupo14.dto.ImagenDto;
import DH.grupo14.model.Imagen;
import DH.grupo14.repository.IImagenRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImagenService implements IImagenService{

    @Autowired
    private IImagenRepository imagenRepository;
    @Autowired
    ObjectMapper mapper;

    @Override
    public Imagen crearImagen(ImagenDto imagenDto) {
        return guardarImagen(imagenDto);
    }

    private Imagen guardarImagen(ImagenDto imagenDto){
        Imagen imagen = mapper.convertValue(imagenDto, Imagen.class);
        return imagenRepository.save(imagen);
    }

    @Override
    public ImagenDto buscarImagen(Long idImagen) {
        Optional<Imagen> imagen = imagenRepository.findById(idImagen);
        ImagenDto imagenDto = null;
        if (imagen.isPresent());
        imagenDto = mapper.convertValue(imagen, ImagenDto.class);
        return imagenDto;
    }

    @Override
    public ImagenDto modificarImagen(ImagenDto imagenDto) {
        guardarImagen(imagenDto);
        return imagenDto;
    }

    @Override
    public void eliminarImagen(Long idImagen) {imagenRepository.deleteById(idImagen);}

    @Override
    public Set<ImagenDto> getTodos() {
        List<Imagen> imagenes = imagenRepository.findAll();
        Set<ImagenDto> imagenDto = new HashSet<>();

        for (Imagen imagen: imagenes){
            imagenDto.add(mapper.convertValue(imagen,ImagenDto.class));
        }
        return imagenDto;
    }


}
