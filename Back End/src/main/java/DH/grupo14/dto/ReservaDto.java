package DH.grupo14.dto;

import DH.grupo14.model.Producto;
import DH.grupo14.model.Usuario;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

public class ReservaDto {


    private Long idReserva;
    private String horaComienzoReserva;
    private Date fechaInicio;
    private Date fechaFinal;

    private Usuario usuario;
    private Producto producto;

}