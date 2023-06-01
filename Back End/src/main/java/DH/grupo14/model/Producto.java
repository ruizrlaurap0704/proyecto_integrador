package DH.grupo14.model;

//UN PRODUCTO PERTENECE A UNA CATEGORIA.
//UN PRODUCTO PERTENECE A 1 CIUDAD.
//UN PRODUCTO TIENE VARIAS IMAGENES

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import javax.swing.text.StyledEditorKit;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)

    private Long idProducto;
    private String titulo;
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "idCategoria", nullable = false)
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "idCiudad", nullable = false)
    private Ciudad ciudad;


    @OneToOne
    @JoinColumn(name = "idImagen", referencedColumnName = "idImagen")
    private Imagen imagen;

    @OneToOne
    @JoinColumn(name = "idCaracteristica", referencedColumnName = "idCaracteristica")
    private Caracteristica caracteristica;

    @OneToOne
    @JoinColumn(name = "idPolitica", referencedColumnName = "idPolitica")
    private Politica politica;

    @OneToMany(mappedBy = "producto")
    @JsonIgnore
    private Set<Reserva> reservas = new HashSet<>();

//    @OneToMany(mappedBy = "producto")
//    @JsonIgnore
//    private Set<Politica> politicas = new HashSet<>();

//
//    @OneToMany(mappedBy = "producto")
//    @JsonIgnore
//    private Set<Caracteristica> caracteristicas = new HashSet<>();

// @OneToMany(mappedBy = "producto")
//    @JsonIgnore
//    private Set<Imagen> imagenes = new HashSet<>();

//    faltaria DISPONIBILIDAD? NO ME DOY CTA COMO.




}
