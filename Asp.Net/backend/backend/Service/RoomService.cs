using backend.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Expressions;
using backend.Repository;
using backend.Utilities;

namespace backend.Service
{
    public class RoomService : CommonServiceClass<Room, int>, ICommonService<Room, int>
    {
        private RoomRepository roomRepository;
        private UserRoomRepository userRoomRepository;
        private UserRepository userRepository;

        public RoomService()
        {
            roomRepository = new RoomRepository();
            userRoomRepository = new UserRoomRepository();
            userRepository = new UserRepository();
        }

        public override Room Add(Room obj)
        {
            roomRepository.Add(obj);
            return obj;
        }

        public override List<Room> FindBy(Expression<Func<Room, bool>> predicate)
            => roomRepository.FindBy(predicate).ToList();

        public override Room FindOne(int key) => roomRepository.Find(key);

        public override List<Room> GetAll() => roomRepository.GetAll();

        public override Room Modify(int key, Room obj)
        {
            var room = roomRepository.Find(key);
            if (room == null)
                throw new Exception("Can't find Room by key");
            obj.RoomId = key;
            roomRepository.Modify(obj);
            return obj;
        }

        public override void Remove(int key)
        {
            var room = roomRepository.Find(key);
            if (room == null)
                throw new Exception("Can't find User by key");
            roomRepository.Remove(room);
        }

        private bool IsUniqueUserRoom(int roomId, string username)
            => userRoomRepository.Find((RoomId: roomId, UserName: username)) == null;
        /// <summary>
        /// Check user before insert room
        /// If current user is Users add RoomType : Current User and that admin user room
        /// If current user is Admin add RoomType : Current User
        /// </summary>
        /// <param name="room"></param>
        /// <param name="user"></param>
        public Room AddRoomByUser(Room room, User user)
        {
            var currentUser = userRepository.Find(user.UserName);
            if (currentUser == null)
                throw new Exception("Can't find user by username");
            var listAdminUser = new List<User>
            {
                currentUser
            };
            if (currentUser.Role == Constant.RoleUser)
            {
                listAdminUser.AddRange(userRepository.FindBy(w => w.Role == room.Type)); // add user manage this room
                listAdminUser.AddRange(userRepository.FindBy(w => w.Role == Constant.RoleAdministrator)); // add administrator user
            }
            AddRoomWithUser(room, listAdminUser);
            return room;
        }
        public void AddRoomWithUser(Room obj, List<User> list)
        {
            var room = this.Add(obj);
            foreach (var item in list)
            {
                var user = userRepository.Find(item.UserName);
                if (user == null) continue;
                if (!IsUniqueUserRoom(room.RoomId, item.UserName)) continue;
                userRoomRepository.Add(new UserRoom(item.UserName, room.RoomId));
            }
        }

        public Room FetchByUserNameAndType(string username, int type)
            => roomRepository.FindBy(w => w.Type == type && w.UserRoom.Any(e => e.UserName.Equals(username))).FirstOrDefault();

        private bool IsExistsRoomOfUser(User user)
            => userRoomRepository.FindBy(w => w.UserName.Equals(user.UserName)).Count != Constant.ZERO;

        public bool HasRoomByUserAndType(string username, int type)
        {
            var all = roomRepository.GetAll();
            var obj = roomRepository.FindBy(w => w.Type == type && w.UserRoom.Any(e => e.UserName.Equals(username)));
            return obj.Count != 0;
        }
        //=> roomRepository.FindBy(w => w.Type == type && w.UserRoom.Any(e => e.UserName.Equals(username))).Count != 0;

        public bool IsExistsRoomById(int roomId)
            => roomRepository.Find(roomId) != null;
    }
}