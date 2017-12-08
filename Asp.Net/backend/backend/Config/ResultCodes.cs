using System.ComponentModel;

namespace backend.Config
{
    public enum ResultCodes
    {
        [Description("Success")]
        Success = 200,
        [Description("Fatal")]
        Fatal = 999,
        [Description("Data Invalid")]
        DataInvalid = 400,
        
    }
}