using System.IO;
using Vintasoft.Data;
using Vintasoft.Imaging.Codecs.Decoders;
using Vintasoft.Imaging.Utils;
using Vintasoft.Imaging.Web.Services;
using Vintasoft.Shared.Web;

namespace AspNetCoreDicomViewerDemo.Controllers
{
    /// <summary>
    /// A platform-independent web service that
    /// handles HTTP requests from clients and allows to manipulate files on a server.
    /// </summary>
    public class MyVintasoftFileWebService : VintasoftFileWebService
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="MyVintasoftFileWebService"/> class.
        /// </summary>
        /// <param name="dataStorage">Data storage that allows to store images in multipage image files.</param>
        public MyVintasoftFileWebService(IDataStorage dataStorage)
            : base(dataStorage)
        {
        }



        /// <summary>
        /// Validates that specified stream can be saved on a server.
        /// </summary>
        /// <param name="responseParams">Response from the server.</param>
        /// <param name="fileStream">Stream with file data.</param>
        /// <returns>
        /// <b>true</b> - file stream contains DICOM file and can be saved on server;
        /// <b>false</b> - file stream cannot be saved on server.
        /// </returns>
        protected override bool FileValidation(WebImageFileResponseParams responseParams, Stream fileStream)
        {
            // get decoder for uploaded file
            using (DecoderBase decoder = AvailableDecoders.CreateDecoder(fileStream))
            {
                // if decoder is not found
                if (decoder == null)
                {
                    responseParams.errorMessage = "Uploaded file is not DICOM file.";
                    responseParams.success = false;
                    return false;
                }
                // if decoder is NOT DICOM decoder
                if (decoder.Name != "Dicom")
                {
                    responseParams.success = false;
                    responseParams.errorMessage = "Uploaded file is not DICOM file.";
                    return false;
                }
            }
            return true;
        }

    }
}