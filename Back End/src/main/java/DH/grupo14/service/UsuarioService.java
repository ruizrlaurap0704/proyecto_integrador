package DH.grupo14.service;

import DH.grupo14.dto.UsuarioDto;
import DH.grupo14.model.Usuario;
import DH.grupo14.repository.IUsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private IUsuarioRepository iUsuarioRepository;
    @Autowired
    ObjectMapper mapper;


    @Override
    public void crearUsuario(UsuarioDto usuarioDto) {guardarUsuario(usuarioDto);
    }

    private void guardarUsuario(UsuarioDto usuarioDto){
        Usuario usuario = mapper.convertValue(usuarioDto, Usuario.class );
        iUsuarioRepository.save(usuario);
    }



    @Override
    public UsuarioDto modificarUsuario(UsuarioDto usuarioDto) {
        guardarUsuario(usuarioDto);
        return usuarioDto;
    }

    @Override
    public void eliminarUsuario(Long idUsuario) {iUsuarioRepository.deleteById(idUsuario);
    }

    @Override
    public Set<UsuarioDto> getTodos() {
        List<Usuario> usuarios = iUsuarioRepository.findAll();
        Set<UsuarioDto> usuariosDto = new HashSet<>();

        for (Usuario usuario: usuarios){
            usuariosDto.add(mapper.convertValue(usuario,UsuarioDto.class));
        }
        return usuariosDto;
    }

    @Override
    public Optional<Usuario> buscarUsuario(Long idUsuario) {
        Optional<Usuario> usuario = iUsuarioRepository.findById(idUsuario);
        UsuarioDto usuarioDto = null;
        if (usuario.isPresent());
        usuarioDto = mapper.convertValue(usuario,UsuarioDto.class);
        return usuario;
    }

//    @Override
//    public UsuarioDto buscarXEmail(String email) {
//        Optional<Usuario> usuario = iUsuarioRepository.buscarXEmail(email);
//        UsuarioDto usuarioDto = null;
//        if (usuario.isPresent())
//        usuarioDto = mapper.convertValue(usuario,UsuarioDto.class);
//        return usuarioDto;
//
//    }
}
