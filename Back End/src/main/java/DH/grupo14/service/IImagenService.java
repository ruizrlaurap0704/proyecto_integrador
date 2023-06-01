package DH.grupo14.service;

import DH.grupo14.dto.ImagenDto;
import DH.grupo14.model.Imagen;

import java.util.Set;

public interface IImagenService {

    Imagen crearImagen(ImagenDto imagenDto);
    ImagenDto buscarImagen (Long idImagen);
    ImagenDto modificarImagen (ImagenDto imagenDto);
    void eliminarImagen (Long idImagen);
    Set<ImagenDto> getTodos();

}