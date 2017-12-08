using backend.Entity;
using backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Utilities;

namespace backend.Hubs
{
    [Authorize]
    public class MessageHub : Hub
    {
        private readonly MessageService _messageService;
        private readonly RoomService _roomService;
        private readonly UserService _userService;

        public MessageHub() : base()
        {
            _messageService = new MessageService();
            _roomService = new RoomService();
            _userService = new UserService();
        }

        public override Task OnConnectedAsync()
        {
            int roomId;
            try
            {
                roomId = int.Parse(Context.Connection.GetHttpContext().Request.Query["roomId"]);
            }
            catch (Exception)
            {
                roomId = 0;
            }
            var currentUser = Context?.User?.Claims?.SingleOrDefault(w => w.Type.Equals(ClaimTypes.NameIdentifier))?.Value ?? "";
            if (HasBelongRoom(roomId, currentUser))
                Groups.AddAsync(Context.ConnectionId, roomId.ToString());
            return base.OnConnectedAsync();
        }

        public void SendMessage(Message message)
        {
            if (!_roomService.IsExistsRoomById(message.RoomId))
                throw new Exception("Can't find Room by RoomId");
            if (!_userService.IsExistsUserByUsername(message.UserName))
                throw new Exception("Can't find User by Username");
            if (!HasBelongRoom(message.RoomId, message.UserName))
                Clients.Client(Context.ConnectionId).InvokeAsync(Constant.HubFetchMessage, "You don't belong this room or this group is closed.");
            var msg = new Message()
            {
                Content = message.Content,
                RoomId = message.RoomId,
                Time = message.Time,
                UserName = message.UserName
            };
            try
            {
                var result = _messageService.Add(msg);
                Clients.Group(message.RoomId.ToString()).InvokeAsync(Constant.HubFetchMessage, result);
            }
            catch (Exception e)
            {
                Clients.Group(message.RoomId.ToString()).InvokeAsync(Constant.HubFetchMessage, "Can't add message.");
                throw new Exception($"Can't add message: {e.Message}");
            }
        }

        public bool HasBelongRoom(int roomId, string username)
        {
            try
            {
                var listUser = _roomService.FindBy(w => w.RoomId == roomId && w.Status == true).FirstOrDefault()?.UserRoom.Where(w => w.Status == 1).Select(w => w.UserName);
                if (!(listUser ?? throw new Exception()).Contains(username))
                    throw new Exception($"User {username} don't belong room with ID: {roomId} ");
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}