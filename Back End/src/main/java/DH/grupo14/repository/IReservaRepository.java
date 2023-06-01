package DH.grupo14.repository;

import DH.grupo14.model.Reserva;
import DH.grupo14.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IReservaRepository extends JpaRepository<Reserva, Long> {
}
