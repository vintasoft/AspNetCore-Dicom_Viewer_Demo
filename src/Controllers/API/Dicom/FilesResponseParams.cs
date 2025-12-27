using Vintasoft.Shared.Web;

namespace AspNetCoreDicomViewerDemo.Controllers
{
    /// <summary>
    /// Response from web service (controller/handler).
    /// Contains information about files.
    /// </summary>
    public class FilesResponseParams : WebResponseParamsBase
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="FilesResponseParams"/> class.
        /// </summary>
        public FilesResponseParams():
            base()
        {
        }



        string[] _files;
        /// <summary>
        /// Gets or sets an array of file identifiers.
        /// </summary>
        public string[] files
        {
            get { return _files; }
            set { _files = value; }
        }

    }
}