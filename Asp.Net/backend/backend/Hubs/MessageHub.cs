using backend.DTO;
using backend.Entity;
using backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Utilities;

namespace backend.Hubs
{
    [Authorize]
    public class MessageHub : Hub
    {
        private MessageService messageService;
        private RoomService roomService;
        private UserService userService;
        public MessageHub() : base()
        {
            messageService = new MessageService();
            roomService = new RoomService();
            userService = new UserService();
        }
        /// <summary>
        /// Create Group ConnectionId when user connected.
        /// </summary>
        /// <returns></returns>
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
            string currentUser = Context?.User?.Claims?.SingleOrDefault(w => w.Type.Equals(ClaimTypes.NameIdentifier)).Value ?? "";
            if (HasBelongRoom(roomId, currentUser))
                Groups.AddAsync(Context.ConnectionId, roomId.ToString());
            return base.OnConnectedAsync();
        }

        

        public void SendMessage(Message message)
        {
            if(!roomService.IsExistsRoomById(message.RoomId))
                throw new Exception("Can't find Room by RoomId");
            if(!userService.IsExistsUserByUsername(message.UserName))
                throw new Exception("Can't find User by Username");
            if(!HasBelongRoom(message.RoomId, message.UserName))
                Clients.Client(Context.ConnectionId).InvokeAsync(Constant.HubFetchMessage, "You don't belong this room.");
            var msg = new Message()
            {
                Content = message.Content,
                RoomId = message.RoomId,
                Time = message.Time,
                UserName = message.UserName
            };
            try
            {
                var result = messageService.Add(msg);
                Clients.Group(message.RoomId.ToString()).InvokeAsync(Constant.HubFetchMessage, result);
            }
            catch (Exception e)
            {
                Clients.Group(message.RoomId.ToString()).InvokeAsync(Constant.HubFetchMessage, "Can't add message.");
                throw new Exception($"Can't add message: {e.Message}");
            }
        }

        /// <summary>
        /// Check user belong specials room
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="username"></param>
        /// <returns></returns>
        public bool HasBelongRoom(int roomId, string username)
        {
            var listUser = roomService.FindOne(roomId).UserRoom.Select(w => w.UserName);
            if (!listUser.Contains(username))
                throw new Exception($"User {username} don't belong room with ID: {roomId} ");
            return true;
        }
    }
}
