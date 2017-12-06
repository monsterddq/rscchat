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

namespace backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Room")]
    public class RoomController : BaseController
    {
        private RoomService roomService;

        public RoomController()
        {
            roomService = new RoomService();
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
                return roomService.AddRoomByUser(room, user);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}