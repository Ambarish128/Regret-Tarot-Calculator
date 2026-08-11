package com.regrettarot.gateway.filter;

import com.regrettarot.gateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        super(Config.class);
        this.jwtUtil = jwtUtil;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            // 1. Grab the Authorization header
            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

            // 2. Check if it exists and starts with "Bearer "
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                System.out.println("Gateway Bouncer: Blocked request - Missing or invalid header");
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            // 3. Strip "Bearer " to get the raw token
            String token = authHeader.substring(7);

            try {
                // 4. Validate token and extract claims
                Claims claims = jwtUtil.validateAndExtractClaims(token);
                String userId = claims.getSubject();

                // 5. Inject X-User-Id header for downstream microservices
                ServerWebExchange mutatedExchange = exchange.mutate()
                    .request(r -> r.header("X-User-Id", userId))
                    .build();

                // 6. Let the request pass
                return chain.filter(mutatedExchange);

            } catch (Exception e) {
                // 7. Reject if expired, forged, or invalid
                System.out.println("Gateway Bouncer: Blocked request - " + e.getMessage());
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }
        };
    }

    public static class Config {
        // Empty class required by AbstractGatewayFilterFactory
    }
}
