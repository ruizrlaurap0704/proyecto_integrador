package DH.grupo14.model;

//import DH.grupo14.dto.ProductoDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

//un producto varias IMAGENES.
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

@Entity
@Table(name = "imagenes")
public class Imagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false, name = "idImagen")
    private Long idImagen;
    private String titulo;
    private String url_imagen1;
    private String url_imagen2;
    private String url_imagen3;
    private String url_imagen4;
    private String url_imagen5;

//    @OneToOne
//    @JoinColumn(name = "idproducto")
//    private Producto producto;





}
