using chat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace chat.Controllers
{
    public class AdminController : Controller
    {
        ChatDbContext db = new ChatDbContext();

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Index()
        {
            return View(db.Users.Where(w => w.Role != 1).ToList());
        }

        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(User user)
        {
            if (ModelState.IsValid)
            {
                if (!db.Users.Any(w => w.UserName == user.UserName))
                {
                    user.Avatar = " ";
                    user.Phone = user.UserName.Contains("@") ? " " : user.UserName;
                    user.Password = Utility.Sha512Hash(user.Password);
                    db.Users.Add(user);
                    db.SaveChanges();
                    return Redirect("/admin/index");
                }
                else
                {
                    ViewBag.notify = "Dữ liệu trùng lặp";
                    return View();
                }
            }
            return View();
        }

        public ActionResult Edit(string id)
        {
            return View(db.Users.Find(id));
        }

        [HttpPost]
        public ActionResult Edit(User user)
        {
            var u = db.Users.Find(user.UserName);
            if (!string.IsNullOrEmpty(user.Password))
            {
                u.Password = Utility.Sha512Hash(user.Password);
            }
            u.Role = user.Role;
            u.FullName = user.FullName;
            u.Phone = string.IsNullOrEmpty(user.Phone) ? " " : user.Phone;
            db.SaveChanges();
            return Redirect("/admin/index");
        }

        public ActionResult Delete(string id)
        {
            ViewBag.User = db.Users.Where(w=>w.UserName!=id && w.Role!=1).ToList();
            var u = db.Users.Find(id);
            if (u.Role == 0) return RedirectToAction("Index");
            else return View(u);

        }

        [HttpPost]
        public ActionResult Delete(string username, int option,string user)
        {
            using (var tran = db.Database.BeginTransaction())
            {
                try
                {
                    User u = db.Users.Find(username);
                    if (option == 0)
                    {
                        db.Messages.RemoveRange(db.Messages.Where(w => w.UserName == username).ToList());
                        db.UseRooms.RemoveRange(db.UseRooms.Where(w => w.UserName == username).ToList());
                    }
                    else
                    {
                        db.Messages.Where(w => w.UserName == username).ToList().ForEach(w => ChangeMessage(w.MessageId, user));
                        db.UseRooms.Where(w => w.UserName == username).ToList().ForEach(w => w.UserName = user);
                    }
                    db.Users.Remove(u);
                    db.SaveChanges();
                    tran.Commit();
                    return RedirectToAction("Index");
                }
                catch (Exception)
                {
                    tran.Rollback();
                    return Redirect($"/admin/Delete/{username}");
                }
            }

            
        }

        private void ChangeMessage(int id, string u)
        {
            Message m = db.Messages.Find(id);
            m.UserName = u;
            db.SaveChanges();
        }

        public ActionResult Customer()
        {
            return View(db.Users.Where(w => w.Role == 1).ToList());
        }
    }
}