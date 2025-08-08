package com.chatapp.repository;

import com.chatapp.model.Role;
import com.chatapp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
   
	Optional<User> findByEmail(String email);
	 List<User> findByCompanyId(String companyId);
	 List<User> findByRole(Role role);
    //Search by partial match in username or email
    List<User> findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(String username, String email);
}

 