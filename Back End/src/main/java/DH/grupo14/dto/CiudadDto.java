package DH.grupo14.dto;

import DH.grupo14.model.Producto;
import lombok.*;

import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

public class CiudadDto {

    private Long idCiudad;
    private String nombre;
    private String codigo_postal;
    private String provincia;


}
