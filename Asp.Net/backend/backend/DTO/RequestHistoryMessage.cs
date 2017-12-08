namespace backend.DTO
{
    public class RequestHistoryMessage
    {
        public int RoomId { get; set; } = 0;
        public string UserName { get; set; } = "";
        public int Limit { get; set; } = 20;
    }
}
