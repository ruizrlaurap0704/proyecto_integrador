package DH.grupo14.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class CaracteristicaDto {

    private Long idCaracteristica;

    private boolean cocina;
    private boolean televisor;
    private boolean aire_acondicionado;
    private boolean apto_mascotas;
    private boolean estacionamiento_gratuito;
    private boolean pileta;
    private boolean wifi;

}
