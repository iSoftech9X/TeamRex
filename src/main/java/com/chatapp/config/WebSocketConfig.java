// // // package com.chatapp.config;

// // // import org.springframework.context.annotation.Configuration;
// // // import org.springframework.messaging.simp.config.MessageBrokerRegistry;
// // // import org.springframework.web.socket.config.annotation.*;

// // // @Configuration
// // // @EnableWebSocketMessageBroker 
// // // public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
// // //     @Override
// // //     public void registerStompEndpoints(StompEndpointRegistry registry) {
// // //         registry.addEndpoint("/ws")
// // //              .setAllowedOrigins("http://localhost:5173")
      
// // //                 .withSockJS();
// // //     }
// // //     @Override
// // //     public void configureMessageBroker(MessageBrokerRegistry registry) {
// // //         registry.enableSimpleBroker(
// // //             "/topic", // For public channels
// // //             "/queue"  // For private messages
// // //         );
// // //         registry.setApplicationDestinationPrefixes("/app");
// // //         registry.setUserDestinationPrefix("/user");
// // //     }
// // //     }
// // package com.chatapp.config;

// // import org.springframework.context.annotation.Configuration;
// // import org.springframework.messaging.simp.config.MessageBrokerRegistry;
// // import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
// // import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
// // import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

// // @Configuration
// // @EnableWebSocketMessageBroker 
// // public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    
// //     @Override
// //     public void registerStompEndpoints(StompEndpointRegistry registry) {
// //         registry.addEndpoint("/ws")
// //              .setAllowedOrigins(
// //                  "http://localhost:5173",    // React dev server
// //                  "http://127.0.0.1:5173",     // Alternative localhost
// //                  "http://localhost:3000",     // Optional: React default port
// //                  "ws://localhost:5173"        // WebSocket protocol
// //              )
// //              .setAllowedOriginPatterns("*")   // For broader compatibility
// //              .withSockJS();                   // Fallback for browsers without WS support
// //     }
    
// //     @Override
// //     public void configureMessageBroker(MessageBrokerRegistry registry) {
// //         registry.enableSimpleBroker(
// //             "/topic", // For public channels
// //             "/queue"  // For private messages
// //         );
// //         registry.setApplicationDestinationPrefixes("/app");
// //         registry.setUserDestinationPrefix("/user");
// //     }
// // }

// package com.chatapp.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.messaging.simp.config.MessageBrokerRegistry;
// import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
// import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
// import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

// @Configuration
// @EnableWebSocketMessageBroker 
// public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    
//     @Override
//     public void registerStompEndpoints(StompEndpointRegistry registry) {
//         registry.addEndpoint("/ws")
//              .setAllowedOrigins(
//                  "http://localhost:5173",    // React dev server
//                  "http://127.0.0.1:5173",     // Alternative localhost
//                  "http://localhost:3000",     // Optional: React default port
//                  "ws://localhost:5173"
//                      // WebSocket protocol
//              )
//              .setAllowedOriginPatterns("*")   // For broader compatibility
//              .withSockJS();                   // Fallback for browsers without WS support
//     }
    
//     @Override
//     public void configureMessageBroker(MessageBrokerRegistry registry) {
//         registry.enableSimpleBroker(
//             "/topic", // For public channels
//             "/queue",  // For private messages
//             "/user"    // For user-specific messages (important!)
//         );
//         registry.setApplicationDestinationPrefixes("/app");
//         registry.setUserDestinationPrefix("/user");
//     }
// }
 package com.chatapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
            .setAllowedOrigins(
                "http://localhost:5173", // Local React dev server
                "http://127.0.0.1:5173",
                "http://localhost:3000", // Optional: default React port
                "https://4iwjzbgtmd.eu-central-1.awsapprunner.com" // Deployed frontend URL
            )
            .withSockJS(); // Fallback for older browsers
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker(
            "/topic", // For public chat rooms or notifications
            "/queue", // For point-to-point messaging
            "/user"   // For user-specific destinations
        );
        registry.setApplicationDestinationPrefixes("/app");
        registry.setUserDestinationPrefix("/user");
    }
}
