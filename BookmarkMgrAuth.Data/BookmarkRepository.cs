using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookmarkMgrAuth.Data
{
    public class BookmarkRepository
    {
        public readonly string _connection;
        public BookmarkRepository(string connect)
        {
            _connection = connect;

        }

        public void AddUser(User user, string password)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using var context = new BookmarkDataContext(_connection);
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }
            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }

            return user;

        }
        public User GetByEmail(string email)
        {
            using var context = new BookmarkDataContext(_connection);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }

        public void AddBookmark(Bookmark newbookmark)
        {
            using var context = new BookmarkDataContext(_connection);
            context.Bookmarks.Add(newbookmark);
            context.SaveChanges();
        }

        public void UpdateBookmark(int id, string title)
        {
            using var context = new BookmarkDataContext(_connection);
            context.Database.ExecuteSqlInterpolated($"update Bookmarks  set Title={title}  where id = {id}");
        }

        public void DeleteBookmark(Bookmark delete)
        {

            using var context = new BookmarkDataContext(_connection);
            context.Bookmarks.Remove(delete);
            context.SaveChanges();
        }

        public List<Bookmark> GetBookmarksbyId(int id)
        {
            using var context = new BookmarkDataContext(_connection);
            return context.Bookmarks.Where(b => b.UserId == id).ToList();
        }
        public List<TopBookmark> GetTopBookmarks()
        {
            using var context = new BookmarkDataContext(_connection);
            return context.Bookmarks.GroupBy(b => b.Url).Select(b => new TopBookmark { Url = b.Key, Count = b.Count() }).OrderByDescending(b => b.Count).Take(5).ToList();


        }
    }
}
