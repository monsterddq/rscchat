using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using backend.Service;
using backend.Entity;
using Microsoft.AspNetCore.Authorization;
using backend.Hubs;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Text;
using static backend.Utilities.Utility;

namespace backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Room")]
    public class RoomController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly RoomService _roomService;
        private readonly MessageService _messageService;
        private MessageHub _messageHub;
        private readonly UserRoomService _userRoomService;

        public RoomController(IHostingEnvironment hostingEnvironment)
        {
            _roomService = new RoomService();
            _messageService = new MessageService();
            _messageHub = new MessageHub();
            _userRoomService = new UserRoomService();
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        [Authorize]
        public Room Post(string roomtype,string roomName)
        {
            try
            {
                var user = GetUser();
                var room = new Room()
                {
                    Name = roomName ?? (user?.UserName ?? user?.FullName) ?? string.Empty,
                    Status = true,
                    Time = DateTime.Now,
                    Type = (int) Room(roomtype)
                };
                if (user != null && user.Role == 4)
                {
                    return _roomService.HasRoomByUserAndType(user?.UserName, room.Type)
                        ? _roomService.FetchByUserNameAndType(user?.UserName, room.Type)
                        : _roomService.AddRoomByUser(room, user);
                }
                else
                {
                    if (!_roomService.HasRoomByName(roomName))
                    {
                        return _roomService.AddRoomByUser(room, user);
                    }
                }

                throw new Exception();
            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpGet]
        [Authorize]
        public List<(string username, string fullname, string backgournd)> Get(int roomId)
            => _userRoomService.FindBy(w => w.RoomId == roomId).Select(w =>
                (username: w.UserName, fullname: w.User.FullName, background: w.Background)).ToList();

        [HttpPut]
        [Authorize]
        public string Put(int roomId, string file, string name)
        {
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, $"background/{name}");
            try
            {
                System.IO.File.WriteAllBytes(uploads, Convert.FromBase64String(file.Split(',')[1]));
                var userCurrent = GetUser();
                var userRoom = _userRoomService.FindOne((RoomId: roomId, UserName: userCurrent.UserName));
                if (userRoom == null) return "";
                userRoom.Background = $"background/{name}";
                _userRoomService.Modify((RoomId: roomId, UserName: userCurrent.UserName), userRoom);
                return $"background/{name}";
            }
            catch (Exception)
            {
                return "";
            }
        }

        [HttpPost]
        [Authorize]
        [Route("/api/room/history")]
        public bool History(int roomId)
        {
            try
            {
                var userCurrent = GetUser();
                var q = _messageService.FindBy(w => w.RoomId == roomId).OrderBy(w => w.Time).ToList();
                var ct = new StringBuilder();
                foreach (var item in q)
                {
                    ct.AppendLine(item.UserName);
                    ct.AppendLine($" [{item.Time}] :");
                    if (item.Content.Contains("/uploads/")) ct.AppendLine($"http://localhost:50003{item.Content}");
                    else ct.AppendLine(item.Content + "<br>");
                }

#pragma warning disable 4014
                SendEmailAsync(userCurrent.UserName, $"Nội dung chat trong nhóm", ct.ToString());
#pragma warning restore 4014
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpPut]
        [Authorize]
        [Route("/api/room/leave")]
        public bool Put(int roomId)
        {
            try
            {
                var userCurrent = GetUser();
                var userRooms = _userRoomService.FindBy(w => w.RoomId == roomId);
                if (userRooms.Count == 2)
                {
                    userRooms.ForEach(w =>
                    {
                        w.Status = 0;
                        _userRoomService.Modify((RoomId: w.RoomId, UserName: w.UserName), w);
                    });
                    _messageService.Add(new Message()
                    {
                        UserName = userCurrent.UserName,
                        RoomId = roomId,
                        Content = $"{userCurrent.UserName} - leave room",
                        Time = DateTime.Now
                    });
                }
                else
                {
                    var userRoom = userRooms.FirstOrDefault(w => w.UserName.Equals(userCurrent.UserName));
                    if (userRoom == null) return false;
                    userRoom.Status = 0;
                    _userRoomService.Modify((RoomId: userRoom.RoomId, UserName: userRoom.UserName), userRoom);
                }

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpPut]
        [Authorize(Roles = "0,1,2,3")]
        [Route("/api/room/close")]
        public bool Close(int roomId)
        {
            try
            {
                var room = _roomService.FindOne(roomId);
                if (room == null) return false;
                room.Status = false;
                _roomService.Modify(roomId, room);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}