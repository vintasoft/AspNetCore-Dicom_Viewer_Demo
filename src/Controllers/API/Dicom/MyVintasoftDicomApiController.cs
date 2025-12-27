using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Vintasoft.Data;
using Vintasoft.Imaging.Dicom.AspNetCore.ApiControllers;

namespace AspNetCoreDicomViewerDemo.Controllers
{
    /// <summary>
    /// A Web API controller that handles HTTP requests from clients and
    /// allows to work with DICOM images.
    /// </summary>
    public class MyVintasoftDicomApiController : VintasoftDicomApiController
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="MyVintasoftDicomApiController"/> class.
        /// </summary>
        public MyVintasoftDicomApiController(IWebHostEnvironment hostingEnvironment)
            : base(hostingEnvironment)
        {
        }



        #region Methods

        /// <summary>
        /// Returns information about files, which are stored in current HTTP session.
        /// </summary>
        /// <param name="session">Identifier of HTTP session.</param>
        /// <returns>Dictionary that provides a mapping from filename to the file URL.</returns>
        [HttpPost]
        public FilesResponseParams GetCurrentSessionFiles([FromBody] string session)
        {
            FilesResponseParams answer = new FilesResponseParams();
            IDataStorage storage = CreateSessionDataStorage(session);
            if (storage != null)
            {
                List<string> files = new List<string>();
                string[] allFiles = storage.GetKeys();
                for (int i = 0; i < allFiles.Length; i++)
                {
                    files.Add(allFiles[i]);
                }
                answer.files = files.ToArray();
            }
            answer.success = true;
            return answer;
        }

        #endregion

    }
}