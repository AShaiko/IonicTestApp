using IonicTestApp.Models.DTOs;

namespace IonicTestApp.Services;

public interface IAuthService
{
    Task<AuthResponse?> RegisterAsync(UserLoginModel model);
    Task<AuthResponse?> LoginAsync(UserLoginModel model);
}
