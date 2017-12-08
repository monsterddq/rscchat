using backend.Entity;
using backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            return base.OnConnectedAsync();
        }

        /// <summary>
        /// Get List message history in room by length
        /// </summary>
        /// <param name="room_id"></param>
        /// <param name="username"></param>
        /// <param name="limit"></param>
        public void FetchHistoryMessage(int room_id, string username, int limit)
        {
            var room = roomService.FindOne(room_id); // get room by id
            if (room == null)
                throw new Exception("Can't find Room by RoomId");
            var list = messageService.LimitedWithGetAllByRoom(room.RoomId, limit);
            Clients.Client(Context.ConnectionId).InvokeAsync("fetchmessagehistory", list);
        }

        public void SendMessage(Message message)
        {
            if(!roomService.IsExistsRoomById(message.RoomId))
                throw new Exception("Can't find Room by RoomId");
            if(!userService.IsExistsUserByUsername(message.UserName))
                throw new Exception("Can't find User by Username");
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
                Clients.Client(Context.ConnectionId).InvokeAsync("fetchmessage", result);
            }
            catch (Exception e)
            {
                throw new Exception($"Can't add message: {e.Message}");
            }
        }
    }
}
