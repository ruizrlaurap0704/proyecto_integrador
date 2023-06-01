package DH.grupo14.security;

import DH.grupo14.model.Usuario;
import DH.grupo14.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private IUsuarioRepository usuarioRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Usuario usuario= usuarioRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("El usuario no fue encontrado"));


        return new UserDetailsImpl(usuario);
    }
}
