using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend.Service;
using backend.Entity;
using backend.Utilities;
using Microsoft.AspNetCore.Authorization;
using backend.DTO;
using backend.Hubs;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Room")]
    public class RoomController : BaseController
    {
        protected IHostingEnvironment _hostingEnvironment;
        private RoomService roomService;
        private MessageService messageService;
        private MessageHub messageHub;
        private UserRoomService userRoomService;

        public RoomController(IHostingEnvironment hostingEnvironment)
        {
            roomService = new RoomService();
            messageService = new MessageService();
            messageHub = new MessageHub();
            userRoomService = new UserRoomService();
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        [Authorize]
        public Room Post(string roomtype)
        {
            var user = GetUser();
            var room = new Room()
            {
                Name = string.IsNullOrEmpty(user.FullName) ? user.UserName : user.FullName,
                Status = true,
                Time = DateTime.Now,
                Type = (int)Utility.Room(roomtype)
            };
            try
            {
                if (roomService.HasRoomByUserAndType(user.UserName, room.Type))
                    return roomService.FetchByUserNameAndType(user.UserName, room.Type);
                else
                    return roomService.AddRoomByUser(room, user);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpGet]
        [Authorize]
        public List<(string username, string fullname,string backgournd)> Get(int roomId)
            => userRoomService.FindBy(w => w.RoomId == roomId).Select(w => (username: w.UserName, fullname: w.User.FullName, background: w.Room.Background)).ToList();

        [HttpPut]
        [Authorize]
        public async Task<string> Put(int roomId,string file, string name)
        {
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, $"background/{name}");
            try
            {
                System.IO.File.WriteAllBytes(uploads, Convert.FromBase64String(file.Split(',')[1]));
                var room = roomService.FindOne(roomId);
                room.Background = $"background/{name}";
                roomService.Modify(roomId, room);
                return $"background/{name}";
            }
            catch (Exception)
            {
                return "";
            }
        }
    }
}