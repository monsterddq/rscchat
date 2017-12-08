using backend.Entity;
using backend.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace backend.Service
{
    public class UserRoomService : CommonServiceClass<UserRoom, (int RoomId, string UserName)>,
        ICommonService<UserRoom, (int RoomId, string UserName)>
    {
        private UserRoomRepository userRoomRepository;
        public UserRoomService()
        {
            userRoomRepository= new UserRoomRepository();
        }

        public override UserRoom Add(UserRoom obj)
        {
            if (FindOne((RoomId: obj.RoomId, UserName: obj.UserName)) != null)
                throw new Exception("UserRoom existed");
            return userRoomRepository.Add(obj);
        }

        public override List<UserRoom> FindBy(Expression<Func<UserRoom, bool>> predicate)
            => userRoomRepository.FindBy(predicate);

        public override UserRoom FindOne((int RoomId, string UserName) key)
            => userRoomRepository.Find(key);

        public override List<UserRoom> GetAll()
            => userRoomRepository.GetAll();

        public override UserRoom Modify((int RoomId, string UserName) key, UserRoom obj)
        {
            var userRoom = FindOne(key);
            if (userRoom == null)
                throw new Exception("Can't find UserRoom by RoomId and UserName");
            obj.UserName = key.UserName;
            obj.RoomId = key.RoomId;
            return userRoomRepository.Modify(obj);
        }

        public override void Remove((int RoomId, string UserName) key)
        {
            var userRoom = FindOne(key);
            if (userRoom == null)
                throw new Exception("Can't find UserRoom by RoomId and UserName");
            userRoomRepository.Remove(userRoom);
        }

    }
}
