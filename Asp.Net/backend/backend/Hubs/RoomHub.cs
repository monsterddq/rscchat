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
        private UserRoomService userRoomService;

        public RoomHub()
        {
            roomService = new RoomService();
            userService = new UserService();
            messageService = new MessageService();
            userRoomService = new UserRoomService(); 
        }


        /// <summary>
        /// Get list room by username from request
        /// </summary>
        /// <param name="username"></param>
        public void FetchListRoom(string username)
        {
            var user = userService.FindOne(username);
            if (user == null) Clients.Client(Context.ConnectionId).InvokeAsync(Constant.HubListRoom, "Can't find UserName");
            List<UserRoom> list = userRoomService.FindBy(w => w.UserName.Equals(username));
            var listResult = new List<RoomDTO>();
            ConvertListRoomDTO(list, listResult, user);
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

        private void ConvertListRoomDTO(ICollection<UserRoom> list,ICollection<RoomDTO> listResult, User user)
        {
            foreach (var item in list)
            {
                var message = messageService.FindBy(w => w.UserName.Equals(item.UserName)).FirstOrDefault();
                switch (item.Room.Type)
                {
                    case 4:
                        AddRoomDTO(listResult, item, message);
                        break;
                    case 1:
                        if(user.Role == Constant.RoleAdministrator || user.Role == Constant.RoleManager)
                            AddRoomDTO(listResult, item, message);
                        break;
                    case 2:
                        if (user.Role == Constant.RoleAdministrator || user.Role == Constant.RoleTechnical)
                            AddRoomDTO(listResult, item, message);
                        break;
                    case 3:
                        if (user.Role == Constant.RoleAdministrator || user.Role == Constant.RoleAdvisory)
                            AddRoomDTO(listResult, item, message);
                        break;
                    default:
                        break;
                }
            }
        }

        private void AddRoomDTO(ICollection<RoomDTO> listResult,UserRoom item, Message message)
        {
            listResult.Add(new RoomDTO()
            {
                RoomId = item.RoomId,
                Name = item.Room.Name,
                NewMessage = message?.Content ?? string.Empty,
                TimeMessage = message?.Time.ToLongTimeString() ?? string.Empty,
                Type = (string)Utility.Room(item.Room.Type.ToString())
            });
        }
    }
}