using System.ComponentModel;

namespace backend.Config
{
    public enum Errors
    {
        [Description("Password is not match")]
        PasswordIsNotMatch = 100,
        [Description("User not found")]
        UserNotFound =101,
        [Description("Email is exists")]
        EmailIsExists =102,
        [Description("Phone is exists")]
        PhoneIsExitst =103,
        [Description("Repeat Password is not match")]
        RepeatPasswordIsNotMatch = 104,
        [Description("Fatal Error")]
        FatalError = 999
    }
}