﻿using IonicTestApp.Models;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IonicTestApp.Models.DTOs;
using IonicTestApp.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace IonicTestApp.Controllers;

[ApiController]
public class AuthController : Controller
{
    private readonly IAuthService _authService;
    private readonly Func<ClaimsPrincipal> _claimsFunc;

    public AuthController(IAuthService authService, Func<ClaimsPrincipal> claimsFunc)
    {
        _authService = authService;
        _claimsFunc = claimsFunc;
    }

    [HttpPost("api/[controller]/Register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] UserLoginModel model)
    {
        if (string.IsNullOrWhiteSpace(model.Username) || string.IsNullOrWhiteSpace(model.Password))
            return BadRequest("Username and password are required.");

        var result = await _authService.RegisterAsync(model);
        if (result == null)
            return BadRequest("User already exists.");

        return Ok(result);
    }

    [HttpPost("api/[controller]/Login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] UserLoginModel model)
    {
        if (string.IsNullOrWhiteSpace(model.Username) || string.IsNullOrWhiteSpace(model.Password))
            return BadRequest("Username and password are required.");

        var result = await _authService.LoginAsync(model);
        if (result == null)
            return Unauthorized("Invalid username or password.");

        return Ok(result);
    }

    [Authorize]
    [HttpGet("api/[controller]/CurrentUser")]
    public async Task<ActionResult<AuthResponse>> GetCurrentUser()
    {
        var claims = GetClaims();
        var result = await _authService.GetUserAsync(claims);

        if (result == null)
            return Unauthorized("Can no authorize user");

        return Ok(result);
    }

    private ClaimsPrincipal GetClaims()
    {
        return _claimsFunc?.Invoke() ?? User;
    }
}

