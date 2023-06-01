package DH.grupo14.repository;

import DH.grupo14.dto.ProductoDto;
import DH.grupo14.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface IProductoRepository extends JpaRepository<Producto, Long> {


    @Query("SELECT p FROM Producto p WHERE (:idCategoria IS NULL OR p.categoria.idCategoria = :idCategoria) AND" +
            "(:idCiudad IS NULL OR p.ciudad.idCiudad = : idCiudad)")

    Set<ProductoDto> buscarFiltrando(
            @Param("idCategoria") Long idCategoria,
            @Param("idCiudad") Long idCiudad
    );

    @Query("SELECT p FROM Producto p ORDER BY RAND() LIMIT 1")
    Set<ProductoDto> buscarRandom();




    //Filtro fechas
    @Query("SELECT distinct p FROM Producto p left join p.reservas re WHERE  re.fechaInicio not between :fechaInicio and :fechaFinal and re.fechaFinal not between :fechaInicio and :fechaFinal or (re is null)")
    Collection<Producto> findProductByDate(@Param("fechaInicio") Date fechaInicio, @Param("fechaFinal") Date fechaFinal);


    //Filtro por ciudad y fechas
    @Query("SELECT distinct p FROM Producto p left join p.reservas re WHERE  re.fechaInicio not between :fechaInicio and :fechaFinal and re.fechaFinal not between :fechaInicio and :fechaFinal and p.ciudad.nombre like :nombre or (re is null and p.ciudad.nombre like :nombre)")
    Collection<Producto> findProductByDateAndCity(@Param("fechaInicio") Date fechaInicio, @Param("fechaFinal") Date fechaFinal, @Param("nombre")String nombre ) ;





}
