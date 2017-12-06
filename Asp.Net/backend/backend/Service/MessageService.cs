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
    public class MessageService : CommonServiceClass<Message, int>, ICommonService<Message, int>
    {
        private MessageRepository messageRepository;
        private RoomRepository roomRepository;

        public MessageService()
        {
            messageRepository = new MessageRepository();
            roomRepository = new RoomRepository();
        }

        public override Message Add(Message obj)
        {
            messageRepository.Add(obj);
            return obj;
        }

        public override List<Message> FindBy(Expression<Func<Message, bool>> predicate)
            => messageRepository.FindBy(predicate);

        public override Message FindOne(int key)
            => messageRepository.Find(key);

        public override List<Message> GetAll()
            => messageRepository.GetAll();

        public override Message Modify(int key, Message obj)
        {
            var message = messageRepository.Find(key);
            if (message == null)
                throw new Exception("Can't find message by key");
            message.Content = obj.Content;
            message.Time = obj.Time;
            messageRepository.Modify(message);
            return message;
        }

        public override void Remove(int key)
        {
            var message = messageRepository.Find(key);
            if (message == null)
                throw new Exception("Can't find message by key");
            messageRepository.Remove(message);
        }

        public List<Message> LimitedWithGetAllByRoom(int roomId, int limit)
        {
            var room = roomRepository.Find(roomId);
            if (room == null)
                throw new Exception("Can't find Room by RoomId");
            return messageRepository.LimitedWithGetAll(Constant.PageStart, limit);
        }
    }
}