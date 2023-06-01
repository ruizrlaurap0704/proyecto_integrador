package DH.grupo14.controller;

import DH.grupo14.dto.UsuarioDto;
import DH.grupo14.model.Reserva;
import DH.grupo14.model.Usuario;
import DH.grupo14.repository.IUsuarioRepository;
import DH.grupo14.service.IUsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/usuarios")
@AllArgsConstructor
public class  UsuarioController {

    @Autowired
    IUsuarioService iUsuarioService;

    @Autowired
    IUsuarioRepository iUsuarioRepository;

    @PostMapping("/crear")
    public ResponseEntity<?> crearUsuario(@RequestBody UsuarioDto usuarioDto){
        iUsuarioService.crearUsuario(usuarioDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/modificar")
    public ResponseEntity<?> modificarUsuario(@RequestBody UsuarioDto usuarioDto){
        ResponseEntity response = null;
        if (iUsuarioService.buscarUsuario(usuarioDto.getIdUsuario()) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            iUsuarioService.modificarUsuario(usuarioDto);
            response = new ResponseEntity(HttpStatus.OK);
        }
        return response;
    }

    @DeleteMapping("/eliminar/{idUsuario}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long idUsuario) {
        ResponseEntity response = null;

        if (iUsuarioService.buscarUsuario(idUsuario) == null) {
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            iUsuarioService.eliminarUsuario(idUsuario);
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }

    @GetMapping("/list")
    public Set<UsuarioDto> listarUsuarios(){
        return iUsuarioService.getTodos();
    }

    @GetMapping("/{idUsuario}/reservas")
    public Collection<Reserva> buscaReservaPorUsuario(@PathVariable Long idUsuario){
        Optional<Usuario> usuario= iUsuarioService.buscarUsuario(idUsuario);

        if (usuario.isPresent()) {
            Usuario usuario1= usuario.get();
            return usuario1.getReservas();
        }
        return null;
    }

    @GetMapping("/buscar/{idUsuario}")
    public ResponseEntity<?> buscarUsuario(@PathVariable Long idUsuario){
        ResponseEntity response = null;
        if (iUsuarioService.buscarUsuario(idUsuario) == null){
            response = new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            response = ResponseEntity.ok(iUsuarioService.buscarUsuario(idUsuario));
        } return response;
    }

//    @GetMapping("/buscarXEmail/{email}")
//    public ResponseEntity<?> buscarXEmail(@PathVariable String email){
//        ResponseEntity response = null;
//        if (iUsuarioRepository.buscarXEmail(email) == null){
//            response = new ResponseEntity(HttpStatus.NOT_FOUND);
//        }else {
//            response = ResponseEntity.ok(iUsuarioRepository.buscarXEmail(email));
//
//        }return response;
//    }

}
