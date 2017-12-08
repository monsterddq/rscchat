using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using backend.Entity;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using backend.DTO;
using backend.Service;
using backend.Hubs;
using Microsoft.AspNetCore.Hosting;

namespace backend.Controllers
{
    [Produces("application/json")]
    public class MessagesController : BaseController
    {
        protected IHostingEnvironment _hostingEnvironment;
        private RoomService roomService;
        private MessageService messageService;
        private MessageHub messageHub;

        public MessagesController(IHostingEnvironment hostingEnvironment)
        {
            roomService = new RoomService();
            messageService = new MessageService();
            messageHub = new MessageHub();
            _hostingEnvironment = hostingEnvironment;
        }


        [HttpPost]
        [Route("api/media")]
        public async Task<string> SendMedia(string file,string name)
        {

            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, $"uploads/{name}");
            try
            {
                System.IO.File.WriteAllBytes(uploads, Convert.FromBase64String(file.Split(',')[1]));
                return $"/uploads/{name}";
            }
            catch (Exception e)
            {
                return "Can't upload file";
            }
        }

        private bool ValidateImage(IFormFile file)
        {
            if (file.Length < 0) throw new Exception("Length file must than 0kb.");
            if (!file.Headers["Content-type"].Equals("image/png")
               || file.Headers["Content-type"].Equals("image/jpg")
               || file.Headers["Content-type"].Equals("image/jpeg"))
                throw new Exception("Type file is incorrect.");
            return true;
        }

        /// <summary>
        /// Get List message history in room by length
        /// </summary>
        /// <param name="room_id"></param>
        /// <param name="username"></param>
        /// <param name="limit"></param>
        [HttpGet]
        [Authorize]
        [Route("api/message")]
        public List<Message> Get(RequestHistoryMessage request)
        {
            var room = roomService.FindOne(request.RoomId); // get room by id
            if (room == null)
                throw new Exception("Can't find Room by RoomId");
            if (!messageHub.HasBelongRoom(request.RoomId, request.UserName))
                throw new Exception("You don't belong this room");
            return messageService.LimitedWithGetAllByRoom(room.RoomId, request.Limit);

        }
    }
}