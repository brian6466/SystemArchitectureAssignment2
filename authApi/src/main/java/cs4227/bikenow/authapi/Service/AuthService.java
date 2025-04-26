package cs4227.bikenow.authapi.Service;

import cs4227.bikenow.authapi.Entity.UserEntity;
import cs4227.bikenow.authapi.Repository.UserRepository;
import cs4227.bikenow.authapi.Util.JwtUtil;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String login(String email, String password) {
        UserEntity user = userRepository.findByEmail(email);

        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtUtil.generateToken(email, user.getRole());
    }

    public void register(String email, String password) {
        if (userRepository.findByEmail(email) != null) {
            throw new RuntimeException("User already exists");
        }

        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("user");

        userRepository.save(user);
    }

    @PostConstruct
    public void createAdminIfNotExist() {
        if (!userRepository.existsById("admin@example.com")) {
            UserEntity admin = new UserEntity();
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("adminnnn123!!"));
            admin.setRole("admin");
            userRepository.save(admin);
        }
    }
}
