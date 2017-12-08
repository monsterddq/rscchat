using System;
using backend.Config;

namespace backend.DTO
{
    public class Result<T>
    {
        public Result(Enum code, string message, T data)
        {
            Code = code;
            Message = message;
            Data = data;
        }

        public Result()
        {
        }

        public Enum Code { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }
}