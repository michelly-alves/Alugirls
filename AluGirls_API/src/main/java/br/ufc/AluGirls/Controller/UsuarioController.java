package br.ufc.AluGirls.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.AluGirls.Model.Usuario;
import br.ufc.AluGirls.Repository.UsuarioRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
	
    @Autowired
    UsuarioRepository usuarioRepository;
	
    @GetMapping
    public List<Usuario> GetAllUsuarios() {
        return (List<Usuario>) usuarioRepository.findAll();
    }
    
    @PostMapping
    public Usuario save(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable("id") int id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
        	throw new RuntimeException("Usuario com ID " + id + " não encontrado.");
        }
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario> getUsuarioByEmail(@PathVariable("email") String email) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable("id") int id, @RequestBody Usuario usuarioDetails) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();
            usuario.setNome(usuarioDetails.getNome());
            usuario.setEmail(usuarioDetails.getEmail());
            usuario.setSenha(usuarioDetails.getSenha());
            usuarioRepository.save(usuario);
            return ResponseEntity.ok(usuario);
        } else {
        	throw new RuntimeException("Usuario com ID " + id + " não encontrado.");
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable("id") int id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
        	throw new RuntimeException("Usuario com ID " + id + " não encontrado.");
        }
    }

      @PostMapping("/login")
public ResponseEntity<?> login(@RequestParam String email, @RequestParam String senha) {
    Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
    if (usuario.isPresent() && usuario.get().getSenha().equals(senha)) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login realizado com sucesso.");
        response.put("usuarioId", usuario.get().getId());
        return ResponseEntity.ok(response);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos.");
    }
}

}
