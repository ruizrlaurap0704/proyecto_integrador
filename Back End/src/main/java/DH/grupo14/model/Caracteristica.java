package DH.grupo14.model;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

//RELACION MUCHOS A MUCHOS CON PRODUCTOS
@Entity
@Table(name= "caracteristicas")
public class Caracteristica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "idCaracteristica" )

    private Long idCaracteristica;

    private boolean cocina;
    private boolean televisor;
    private boolean aire_acondicionado;
    private boolean apto_mascotas;
    private boolean estacionamiento_gratuito;
    private boolean pileta;
    private boolean wifi;


//    @OneToOne
//    @JoinColumn(name = "idproducto")
//    private Producto producto;


}
