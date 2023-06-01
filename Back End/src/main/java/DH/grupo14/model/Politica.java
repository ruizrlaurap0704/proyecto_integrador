package DH.grupo14.model;


import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.internal.bytebuddy.dynamic.loading.InjectionClassLoader;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

@Entity
@Table(name = "politicas")
public class Politica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "idPolitica")

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

//    @OneToOne
//    @JoinColumn(name = "idproducto")
//    private Producto producto;


}




