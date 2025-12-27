# VintaSoft ASP.NET Core DICOM Viewer Demo

This ASP.NET Core project uses <a href="https://www.vintasoft.com/vsimaging-dotnet-index.html">VintaSoft Imaging .NET SDK</a>.
The client-side of project uses HTML+JavaScript+CSS. The server-side of project uses ASP.NET Core API controllers.<br />
<br />
The project demonstrates how to view DICOM images, measure DICOM image, view DICOM MPR in ASP.NET Core:
* JavaScript UI control that works in all major HTML5 web browsers
* User interface is compatible with personal computers, tablets and smartphones
* Load existing DICOM files
* View DICOM images
  * Display information about DICOM images, which are sorted by patient, study, series
  * View DICOM images in web DICOM viewer
  * Show DICOM metadata over image in web DICOM viewer
  * Browse DICOM images in web DICOM viewer using mouse
  * Change the window level of DICOM image in web DICOM viewer using mouse
  * Zoom DICOM image in web DICOM viewer using mouse
  * Measure objects (line, polyline, ellipse, angle, cross) on DICOM image in web DICOM viewer using mouse
* View DICOM MPR
  * View reconstructed images
  * Combine 3 image viewers for displaying 3D MPR
  * Combine 2 image viewers for displaying Curved MPR
  * Browse reconstructed images in image viewer using mouse
  * Change the window level of reconstructed image in image viewer using mouse
  * Zoom reconstructed image in image viewer using mouse
  * Measure objects (line, polyline, ellipse, angle) on reconstructed image in image viewer using mouse
* "Standard" dialogs (select VOI LUT type, view DICOM metadata, etc) for Bootstrap and JQuery UI
* User interface can be customized
* User interface is available in 45 languages and can be easily translated into any language* The application UI is localized into 45 languages (Afrikaans, Arabic, Armenian, Azerbaijan, Belarusian, Bulgarian, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, Georgian, German, Greece, Hebrew, Hindi, Hungarian, Italian, Japanese, Kazakh, Korean, Kyrgyz, Latvian, Lithuanian, Norwegian, Portugese, Romanian, Russian, Slovakian, Slovenian, Spanish, Swahili, Swedish, Tajik, Tatar, Turkish, Turkmen, Ukrainian, Uzbek, Vietnamese, Zulu).


## Screenshot
<img src="vintasoft_aspnet.core-dicom_viewer_demo.png" title="VintaSoft ASP.NET Core DICOM Viewer Demo"><br />
<img src="vintasoft_aspnet.core-dicom_viewer_demo-dicom_info.png" title="VintaSoft ASP.NET Core DICOM Viewer Demo - DICOM info"><br />
<img src="vintasoft_aspnet.core-dicom_viewer_demo-dicom_mpr.png" title="VintaSoft ASP.NET Core DICOM Viewer Demo - DICOM MPR"><br />


## Usage
1. Get the 30 day free evaluation license for <a href="https://www.vintasoft.com/vsimaging-dotnet-index.html" target="_blank">VintaSoft Imaging .NET SDK</a> as described here: <a href="https://www.vintasoft.com/docs/vsimaging-dotnet/Licensing-Evaluation.html" target="_blank">https://www.vintasoft.com/docs/vsimaging-dotnet/Licensing-Evaluation.html</a>

2. Update the evaluation license in "src\Startup.cs" file:
   ```
   Vintasoft.Imaging.ImagingGlobalSettings.Register("REG_USER", "REG_EMAIL", "EXPIRATION_DATE", "REG_CODE");
   ```

3. Build the project ("AspNetCoreDicomViewerDemo.Net10.csproj" file) in Visual Studio or using .NET CLI:
   ```
   dotnet build AspNetCoreDicomViewerDemo.Net10.csproj
   ```

4. Run compiled application and try to view DICOM images, measure DICOM image, view DICOM MPR.


## Documentation
VintaSoft Imaging .NET SDK on-line User Guide and API Reference for Web developer is available here: https://www.vintasoft.com/docs/vsimaging-dotnet-web/


## Support
Please visit our <a href="https://myaccount.vintasoft.com/">online support center</a> if you have any question or problem.
