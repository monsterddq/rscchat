using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using backend.Entity;
using backend.DTO;
using backend.Service;
using backend.Utilities;
using Microsoft.AspNetCore.Authorization;

namespace backend.Hubs
{
    [Authorize]
    public class RoomHub : Hub
    {
        private RoomService roomService;
        private UserService userService;
        private MessageService messageService;

        public RoomHub()
        {
            roomService = new RoomService();
            userService = new UserService();
            messageService = new MessageService();
        }


        /// <summary>
        /// Get list room by username from request
        /// </summary>
        /// <param name="username"></param>
        public void FetchListRoom(string username)
        {
            var user = userService.FindOne(username);
            List<RoomDTO> listResult = new List<RoomDTO>();
            if (user == null) Clients.Client(Context.ConnectionId).InvokeAsync(Constant.HubListRoom, listResult);
            ConvertListRoomDTO(user.UserRoom, user, listResult);
            Clients.Client(Context.ConnectionId).InvokeAsync(Constant.HubListRoom, listResult);
        }

        /// <summary>
        /// User create a new group with three option:
        ///     1. Giamdoc
        ///     2. Kythuat
        ///     3. Tuvan
        /// </summary>
        /// <param name="username"></param>
        /// <param name="type"></param>
        public void CreateGroup(string username, string type)
        {
            var user = userService.FindOne(username);
            if (user == null) Clients.Client(Context.ConnectionId).InvokeAsync(Constant.HubCreateRoom, string.Empty);
            var listUserByType = userService.FindBy(w => w.Role == (int)Utility.Room(type)); // get all admin
            // add a new room
            roomService.AddRoomWithUser(new Room()
            {
                Name = user.FullName,
                Status = true,
                Time = DateTime.Now,
                Type = (int)Utility.Room(type),
            }, listUserByType);
            Clients.Client(Context.ConnectionId).InvokeAsync(Constant.Success, string.Empty);
        }

        private void ConvertListRoomDTO(ICollection<UserRoom> list, User user, List<RoomDTO> listResult)
        {
            foreach (var item in user.UserRoom)
            {
                var message = messageService.FindBy(w => w.UserName.Equals(user.UserName)).FirstOrDefault();
                listResult.Add(new RoomDTO()
                {
                    RoomId = item.RoomId,
                    Name = item.Room.Name,
                    NewMessage = message?.Content ?? string.Empty,
                    TimeMessage = message.Time.ToLongTimeString() ?? string.Empty
                });
            }
        }
    }
}