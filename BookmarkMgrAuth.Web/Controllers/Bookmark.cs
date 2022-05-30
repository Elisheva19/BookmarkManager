using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookmarkMgrAuth.Data;
using Microsoft.AspNetCore.Authorization;

namespace BookmarkMgrAuth.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private string _connectionString;

        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost]
        [Authorize]

        [Route("addbookmark")]
        public void AddBookmark(Bookmark newbookmark)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.AddBookmark(newbookmark);
        }

        [HttpPost]
        [Authorize]
        [Route("update")]
        public void UpdateBookmark(Update update)
        {
            var repo = new BookmarkRepository(_connectionString);

            repo.UpdateBookmark(update.Id, update.Title);
        }

        [HttpPost]
        [Authorize]
        [Route("deletebookmark")]
        public void DeleteBookmark(Bookmark delete)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.DeleteBookmark(delete);
        }
        [HttpGet]
        [Authorize]
        [Route("getmybookmarks")]
        public List<Bookmark> GetBookmarksbyId()
        {

            var repo = new BookmarkRepository(_connectionString);

            var email = User.Identity.Name;
            int userid = repo.GetByEmail(email).Id;
            return repo.GetBookmarksbyId(userid);
        }

        [HttpGet]
        [Route("topbookmarks")]

        public List<TopBookmark> gettopbookmarks()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetTopBookmarks();

        }
    }
}
