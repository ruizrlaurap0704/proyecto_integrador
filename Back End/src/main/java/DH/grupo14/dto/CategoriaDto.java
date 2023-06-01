package DH.grupo14.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class CategoriaDto {

    private Long idCategoria;
    private String titulo;
    private String descripcion;
    private String url_imagen;


}
