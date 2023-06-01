package DH.grupo14.dto;

import DH.grupo14.model.*;
import lombok.*;

//@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

public class ProductoDto {

    private Long idProducto;
    private String titulo;
    private String descripcion;

    private Categoria categoria;

    private Ciudad ciudad;

    private Imagen imagen;

    private Caracteristica caracteristica;

    private Politica politica;

    public ProductoDto(){    };

    public ProductoDto(String titulo, String descripcion, Categoria categoria, Ciudad ciudad, Imagen imagen, Caracteristica caracteristica, Politica politica) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.ciudad = ciudad;
        this.imagen = imagen;
        this.caracteristica = caracteristica;
        this.politica = politica;
    }
}
