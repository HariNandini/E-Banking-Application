package com.example.bankingbackend.Security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {
	private static final Logger LOGGER = LoggerFactory.getLogger(JwtService.class);

	public static final long JWT_TOKEN_VALIDITY = 1 * 60 * 60;

	private static final String jwtSecret = "244226452948404D635166546A576D5A7134743777217A25432A462D4A614E64";

	private Key getSignKey() {
		byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String generateToken(String userName) {
		Map<String, Object> claims = new HashMap<>();
		return Jwts.builder().setClaims(claims).setSubject(userName).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
				.signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
	}

	public Boolean validateToken(String token, UserDetails userDetails) {
		String username = getUsernameFromToken(token);
		Claims claims = Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
		Boolean isTokenExpired = claims.getExpiration().before(new Date());
		LOGGER.debug("Token is expired: {}", isTokenExpired);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired);
	}

	public String getUsernameFromToken(String token) {
		final Claims claims = Jwts.parserBuilder().setAllowedClockSkewSeconds(360).setSigningKey(getSignKey()).build()
				.parseClaimsJws(token).getBody();
		return claims.getSubject();

	}
}
