using Microsoft.AspNetCore.Builder;

namespace backend.Middleware
{
    public static class JWTSignalRMiddlewareExtensions
    {
        public static IApplicationBuilder UseJWTSignalRMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JWTSignalRMiddleware>();
        }
    }
}