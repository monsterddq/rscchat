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

namespace backend.Controllers
{
    public class MessagesController : BaseController
    {
        [HttpPost]
        [Route("/api/media")]
        public string SendMedia(List<IFormFile> files)
        {
            long size = files.Sum(w => w.Length);

            var filePath = $"{Directory.GetCurrentDirectory()}/Upload";
            try
            {
                foreach (var item in files)
                {
                    if (ValidateImage(item))
                    {
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            item.CopyToAsync(stream);
                        }
                    }
                }
                return $"{filePath}/{files[0].FileName}";
            }
            catch (Exception)
            {
                return string.Empty;
                throw new Exception("Can't upload image");
                
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
    }
}