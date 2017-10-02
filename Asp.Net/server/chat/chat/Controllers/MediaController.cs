using chat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace chat.Controllers
{
    public class MediaController : Controller
    {
        ChatDbContext db = null;
        public MediaController()
        {
            db = new ChatDbContext();
        }
        [HttpPost]
        public string Index()
        {
            if (Request.Files.Count > 0)
            {
                HttpPostedFileBase image1 = Request.Files[0];
                if (image1 != null && image1.ContentLength > 0 && (image1.ContentType.Contains("jpg") || image1.ContentType.Contains("png") || image1.ContentType.Contains("jpeg") || image1.ContentType.Contains("bmp") || image1.ContentType.Contains("gif") || image1.ContentType.Contains("png")))
                {
                    if (!System.IO.Directory.Exists(Server.MapPath("~/Content/Image")))
                        System.IO.Directory.CreateDirectory(Server.MapPath("~/Content/Image"));
                    image1.SaveAs(Server.MapPath("~/Content/Image/") + image1.FileName);
                    return "/Content/Image/" + image1.FileName;
                }
                else
                {
                    return "File ảnh không đúng định dạng";
                }
            }
            else
            {
                return "";
            }
            
        }

        [HttpPost]
        public string Group(int group)
        {
            var u = db.Rooms.Find(group);
            if (Request.Files.Count > 0)
            {
                HttpPostedFileBase image1 = Request.Files[0];
                if (image1 != null && image1.ContentLength > 0 && (image1.ContentType.Contains("jpg") || image1.ContentType.Contains("png") || image1.ContentType.Contains("jpeg") || image1.ContentType.Contains("bmp") || image1.ContentType.Contains("gif") || image1.ContentType.Contains("png")))
                {
                    if (!System.IO.Directory.Exists(Server.MapPath("~/Content/Image")))
                        System.IO.Directory.CreateDirectory(Server.MapPath("~/Content/Image"));
                    image1.SaveAs(Server.MapPath("~/Content/Image/") + image1.FileName);
                    u.Background = "/Content/Image/" + image1.FileName;
                }
            }
            db.Entry(u).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return u.Background;
        }

        [HttpPost]
        public string Avatar(string username)
        {
            var u = db.Users.Find(username);
            if (Request.Files.Count > 0)
            {
                HttpPostedFileBase image1 = Request.Files[0];
                if (image1 != null && image1.ContentLength > 0 && (image1.ContentType.Contains("jpg") || image1.ContentType.Contains("png") || image1.ContentType.Contains("jpeg") || image1.ContentType.Contains("bmp") || image1.ContentType.Contains("gif") || image1.ContentType.Contains("png")))
                {
                    if (!System.IO.Directory.Exists(Server.MapPath("~/Content/Image")))
                        System.IO.Directory.CreateDirectory(Server.MapPath("~/Content/Image"));
                    image1.SaveAs(Server.MapPath("~/Content/Image/") + image1.FileName);
                    u.Avatar = "/Content/Image/" + image1.FileName;
                }
                else
                {
                    return "File ảnh không đúng định dạng";
                }
                
            }
            else
            {
                return "";
            }
            db.Entry(u).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return u.Avatar;

        }
    }
}