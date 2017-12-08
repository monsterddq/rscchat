using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly RoomService _roomService;
        private readonly MessageService _messageService;
        private readonly MessageHub _messageHub;

        public MessagesController(IHostingEnvironment hostingEnvironment)
        {
            _roomService = new RoomService();
            _messageService = new MessageService();
            _messageHub = new MessageHub();
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        [Route("api/media")]
#pragma warning disable 1998
        public async Task<string> SendMedia(string file, string name)
#pragma warning restore 1998
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
        [HttpGet]
        [Authorize]
        [Route("api/message")]
        public List<Message> Get(RequestHistoryMessage request)
        {
            try
            {
                var room = _roomService.FindOne(request.RoomId); // get room by id
                if (room == null)
                    throw new Exception("Can't find Room by RoomId");
                if (!_messageHub.HasBelongRoom(request.RoomId, request.UserName))
                    throw new Exception("You don't belong this room");
                return _messageService.LimitedWithGetAllByRoom(room.RoomId, request.Limit);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}