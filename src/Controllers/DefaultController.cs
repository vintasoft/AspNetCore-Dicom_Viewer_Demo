using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreDicomViewerDemo.Controllers
{
    public class DefaultController : Controller
    {

        public DefaultController()
        {
        }



        public IActionResult Index()
        {
            return View();
        }

    }
}
