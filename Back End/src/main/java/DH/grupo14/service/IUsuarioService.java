package DH.grupo14.service;

import DH.grupo14.dto.UsuarioDto;
import DH.grupo14.model.Usuario;

import java.util.Optional;
import java.util.Set;

public interface IUsuarioService {

    void crearUsuario(UsuarioDto usuarioDto);
    Optional<Usuario> buscarUsuario (Long idUsuario);
    UsuarioDto modificarUsuario(UsuarioDto usuarioDto);
    void eliminarUsuario (Long idUsuario);
    Set<UsuarioDto> getTodos();


}
