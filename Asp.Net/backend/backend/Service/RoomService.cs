using backend.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using backend.Repository;
using backend.Utilities;

namespace backend.Service
{
    public class RoomService : CommonServiceClass<Room, int>, ICommonService<Room, int>
    {
        private readonly RoomRepository _roomRepository;
        private readonly UserRoomRepository _userRoomRepository;
        private readonly UserRepository _userRepository;

        public RoomService()
        {
            _roomRepository = new RoomRepository();
            _userRoomRepository = new UserRoomRepository();
            _userRepository = new UserRepository();
        }

        public override Room Add(Room obj)
        {
            _roomRepository.Add(obj);
            return obj;
        }

        public override List<Room> FindBy(Expression<Func<Room, bool>> predicate)
            => _roomRepository.FindBy(predicate).ToList();

        public override Room FindOne(int key) => _roomRepository.Find(key);

        public override List<Room> GetAll() => _roomRepository.GetAll();

        public override Room Modify(int key, Room obj)
        {
            var room = _roomRepository.Find(key);
            if (room == null)
                throw new Exception("Can't find Room by key");
            obj.RoomId = key;
            _roomRepository.Modify(obj);
            return obj;
        }

        public override void Remove(int key)
        {
            var room = _roomRepository.Find(key);
            if (room == null)
                throw new Exception("Can't find User by key");
            _roomRepository.Remove(room);
        }

        private bool IsUniqueUserRoom(int roomId, string username)
            => _userRoomRepository.Find((RoomId: roomId, UserName: username)) == null;

        /// <summary>
        /// Check user before insert room
        /// If current user is Users add RoomType : Current User and that admin user room
        /// If current user is Admin add RoomType : Current User
        /// </summary>
        /// <param name="room"></param>
        /// <param name="user"></param>
        public Room AddRoomByUser(Room room, User user)
        {
            var currentUser = _userRepository.Find(user.UserName);
            if (currentUser == null)
                throw new Exception("Can't find user by username");
            var listAdminUser = new List<User>
            {
                currentUser
            };
            if (currentUser.Role == Constant.RoleUser)
            {
                listAdminUser.AddRange(_userRepository.FindBy(w => w.Role == room.Type)); // add user manage this room
                listAdminUser.AddRange(_userRepository.FindBy(w => w.Role == Constant.RoleAdministrator)); // add administrator user
            }
            AddRoomWithUser(room, listAdminUser);
            return room;
        }

        public void AddRoomWithUser(Room obj, IEnumerable<User> list)
        {
            var room = this.Add(obj);
            foreach (var item in list)
            {
                var user = _userRepository.Find(item.UserName);
                if (user == null) continue;
                if (!IsUniqueUserRoom(room.RoomId, item.UserName)) continue;
                _userRoomRepository.Add(new UserRoom(item.UserName, room.RoomId, 1));
            }
        }

        public Room FetchByUserNameAndType(string username, int type)
            => _roomRepository.FindBy(w => w.Type == type && w.UserRoom.Any(e => e.UserName.Equals(username))).FirstOrDefault();

        private bool IsExistsRoomOfUser(User user)
            => _userRoomRepository.FindBy(w => w.UserName.Equals(user.UserName)).Count != Constant.Zero;

        public bool HasRoomByUserAndType(string username, int type)
            => _roomRepository.FindBy(w => w.Type == type && w.UserRoom.Any(e => e.UserName.Equals(username)) && w.UserRoom.Any(e => e.Status == 1) && w.Status).Count != 0;

        public bool HasRoomByName(string roomName)
            => _roomRepository.FindBy(w => w.Name.Equals(roomName)).Count > 0;
        
        public bool IsExistsRoomById(int roomId)
            => _roomRepository.Find(roomId) != null;
    }
}