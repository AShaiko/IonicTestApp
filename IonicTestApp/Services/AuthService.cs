using System;
using IonicTestApp.Models;
using IonicTestApp.Models.DTOs;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Principal;

namespace IonicTestApp.Services;

public class AuthService : IAuthService
{
    private readonly ApplicationContext _context;
    private readonly IConfiguration _config;

    public AuthService(ApplicationContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public async Task<AuthResponse?> RegisterAsync(UserLoginModel user)
    {
        var existing = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);
        if (existing != null)
            return null;

        var newUser = new User
        {
            Id = Guid.NewGuid(),
            Username = user.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password)
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return GenerateAuthResponse(newUser);
    }

    public async Task<AuthResponse?> LoginAsync(UserLoginModel user)
    {
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);
        if (existingUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, existingUser.PasswordHash))
            return null;

        return GenerateAuthResponse(existingUser);
    }

    public async Task<AuthResponse?> GetUserAsync(ClaimsPrincipal claims)
    {
        if (claims == null ||
            claims.Identity == null ||
            string.IsNullOrEmpty(claims.Identity.Name))
        {
            return null;
        }

        var user = await _context.Users.FirstOrDefaultAsync(us => us.Username == claims.Identity.Name);

        return user != null ? GenerateAuthResponse(user) : null;
    }

    private AuthResponse GenerateAuthResponse(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]!);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            }),
            Expires = DateTime.UtcNow.AddMonths(1),
            Issuer = _config["Jwt:Issuer"],
            Audience = _config["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwt = tokenHandler.WriteToken(token);

        return new AuthResponse
        {
            UserId = user.Id,
            Username = user.Username,
            Token = jwt
        };
    }
}

