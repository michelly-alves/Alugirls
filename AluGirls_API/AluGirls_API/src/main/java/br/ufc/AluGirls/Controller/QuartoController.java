package br.ufc.AluGirls.Controller;

import java.io.File;
import java.util.List;
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
import org.springframework.web.multipart.MultipartFile;

import br.ufc.AluGirls.Model.Quarto;
import br.ufc.AluGirls.Repository.QuartoRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/quarto")
public class QuartoController {
	
    @Autowired
    QuartoRepository quartoRepository;
	
    @GetMapping
    public List<Quarto> GetAllQuartos() {
        return (List<Quarto>) quartoRepository.findAll();
    }
    
    @PostMapping
    public ResponseEntity<?> save(@RequestBody Quarto quarto) {
        try {
            Quarto savedQuarto = quartoRepository.save(quarto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedQuarto);
        } catch (Exception e) {
            e.printStackTrace();  // Isso ajuda a ver o erro no log
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao cadastrar moradia: " + e.getMessage());
        }
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<Quarto> getQuartoById(@PathVariable("id") int id) {
        Optional<Quarto> quarto = quartoRepository.findById(id);
        if (quarto.isPresent()) {
            return ResponseEntity.ok(quarto.get());
        } else {
        	throw new RuntimeException("Quarto com ID " + id + " não encontrado.");
        }
    }
    
    
    @PutMapping("/{id}")
    public ResponseEntity<Quarto> updateQuarto(@PathVariable("id") int id, @RequestBody Quarto quartoDetails) {
        Optional<Quarto> optionalQuarto = quartoRepository.findById(id);
        if (optionalQuarto.isPresent()) {
            Quarto quarto = optionalQuarto.get();
            quarto.setTitulo(quartoDetails.getTitulo());
            quarto.setPreco(quartoDetails.getPreco());
            quarto.setFotoQuarto(quartoDetails.getFotoQuarto());
            quarto.setEndereco(quartoDetails.getEndereco());
            quartoRepository.save(quarto);
            return ResponseEntity.ok(quarto);
        } else {
        	throw new RuntimeException("Quarto com ID " + id + " não encontrado.");
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuarto(@PathVariable("id") int id) {
        if (quartoRepository.existsById(id)) {
            quartoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
        	throw new RuntimeException("Quarto com ID " + id + " não encontrado.");
        }
    }  

    private static final String UPLOAD_DIR = "c:/";
    
     @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {

        try {
            String filePath = UPLOAD_DIR + file.getOriginalFilename();
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            file.transferTo(new File(filePath));

            Quarto quarto = new Quarto();
            quarto.setFotoQuarto(filePath);
            quartoRepository.save(quarto);

            return ResponseEntity.ok("Imagem salva em: " + filePath);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro: " + e.getMessage());
        }
    }

}

