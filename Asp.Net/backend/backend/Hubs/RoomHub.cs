using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly RoomService _roomService;
        private readonly UserService _userService;
        private readonly MessageService _messageService;
        private readonly UserRoomService _userRoomService;

        public RoomHub()
        {
            _roomService = new RoomService();
            _userService = new UserService();
            _messageService = new MessageService();
            _userRoomService = new UserRoomService();
        }

        public void FetchListRoom(string username)
        {
            var user = _userService.FindOne(username);
            if (user == null) Clients.Client(Context.ConnectionId).InvokeAsync(Constant.HubListRoom, "Can't find UserName");
            var list = _userRoomService.FindBy(w => w.UserName.Equals(username) && w.Status == 1 && w.Room.Status);
            var listResult = new List<RoomDTO>();
            ConvertListRoomDto(list, listResult, user);
            Clients.Client(Context.ConnectionId).InvokeAsync(Constant.HubListRoom, listResult);
        }

        public void CreateGroup(string username, string type)
        {
            var user = _userService.FindOne(username);
            if (user == null) Clients.Client(Context.ConnectionId).InvokeAsync(Constant.HubCreateRoom, string.Empty);
            var listUserByType = _userService.FindBy(w => w.Role == (int)Utility.Room(type));
            if (user != null)
                _roomService.AddRoomWithUser(new Room()
                {
                    Name = user.FullName,
                    Status = true,
                    Time = DateTime.Now,
                    Type = (int) Utility.Room(type),
                }, listUserByType);
            Clients.Client(Context.ConnectionId).InvokeAsync(Constant.Success, string.Empty);
        }

        private void ConvertListRoomDto(IEnumerable<UserRoom> list, ICollection<RoomDTO> listResult, User user)
        {
            foreach (var item in list)
            {
                var message = _messageService.FindBy(w => w.RoomId == item.RoomId).FirstOrDefault();
                switch (item.Room.Type)
                {
                    case 4:
                        AddRoomDto(listResult, item, message);
                        break;
                    case 1:
                        if (user.Role == Constant.RoleAdministrator || user.Role == Constant.RoleManager)
                            AddRoomDto(listResult, item, message);
                        break;
                    case 2:
                        if (user.Role == Constant.RoleAdministrator || user.Role == Constant.RoleTechnical)
                            AddRoomDto(listResult, item, message);
                        break;
                    case 3:
                        if (user.Role == Constant.RoleAdministrator || user.Role == Constant.RoleAdvisory)
                            AddRoomDto(listResult, item, message);
                        break;
                }
            }
        }

        private static void AddRoomDto(ICollection<RoomDTO> listResult, UserRoom item, Message message)
        {
            listResult.Add(new RoomDTO()
            {
                RoomId = item?.RoomId ?? 0,
                Name = item?.Room.Name ?? "",
                NewMessage = message?.Content ?? string.Empty,
                TimeMessage = message?.Time.ToLongTimeString() ?? string.Empty,
                Type = (string)Utility.Room(item?.Room.Type.ToString() ?? Constant.RoomTypeGeneral)
            });
        }
    }
}