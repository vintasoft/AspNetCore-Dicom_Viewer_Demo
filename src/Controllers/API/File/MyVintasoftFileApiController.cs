using Microsoft.AspNetCore.Hosting;
using Vintasoft.Data;
using Vintasoft.Imaging.AspNetCore.ApiControllers;
using Vintasoft.Imaging.Web.Services;

namespace AspNetCoreDicomViewerDemo.Controllers
{
    /// <summary>
    /// A Web API controller that handles HTTP requests from clients and
    /// allows to manipulate files on server.
    /// </summary>
    public class MyVintasoftFileApiController : VintasoftFileApiController
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="MyVintasoftFileApiController"/> class.
        /// </summary>
        public MyVintasoftFileApiController(IWebHostEnvironment hostingEnvironment)
            : base(hostingEnvironment)
        {
        }



        /// <summary>
        /// Creates the <see cref="MyVintasoftFileWebService"/>
        /// that handles HTTP requests from clients and allows to manipulate files on a server.
        /// </summary>
        /// <returns>The <see cref="MyVintasoftFileWebService"/>
        /// that handles HTTP requests from clients and allows to manipulate files on a server.</returns>
        protected override VintasoftFileWebService CreateWebService(string sessionId)
        {
            IDataStorage storage = CreateSessionDataStorage(sessionId);
            MyVintasoftFileWebService service = new MyVintasoftFileWebService(storage);
            return service;
        }

    }
}