package DH.grupo14.dto;

import DH.grupo14.model.Ciudad;
import DH.grupo14.model.Rol;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class UsuarioDto {

    private Long idUsuario;
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private String ciudad;

    private Rol rol;

}
