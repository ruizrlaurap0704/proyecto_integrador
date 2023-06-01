package DH.grupo14.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class PoliticaDto {

    private Long idPolitica;

    private String norma_casa1;
    private String norma_casa2;
    private String norma_casa3;
    private String salud_seguridad1;
    private String salud_seguridad2;
    private String salud_seguridad3;
    private String politica_cancelacion1;
    private String politica_cancelacion2;
    private String politica_cancelacion3;
}
