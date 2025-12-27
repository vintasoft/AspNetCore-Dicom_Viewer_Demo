var _blockUiDialog;

var _dicomControl;

var _localizer;


// === DICOM control events ===

function __dicomControl_warningOccured(event, eventArgs) {
    // show the error message
    __showErrorMessage(eventArgs.message);
}

function __dicomControl_asyncOperationFailed(event, eventArgs) {
    if (eventArgs.data != null) {
        // show the error message
        __showErrorMessage(eventArgs.data.errorMessage);
    }
}

function __dicomControl_sessionCacheCleared(event, eventArgs) {
    // show message
    alert("Cache is cleared successfully.");
}



// === Open default DICOM file ===

/**
 Opens the DICOM files from current session.
*/
function __openDicomFilesFromCurrentSession() {
    // DICOM service
    var dicomService = Vintasoft.Shared.WebServiceJS.defaultDicomService;


    /**
     Request is executed successully.
     @param {object} data The server response.
     @function @private
    */
    function __successFunc(data) {
        var files = data.files;

        // if current session have files
        if (files != null && files.length > 0) {
            // add DICOM files to the DICOM control
            _dicomControl.addFiles(files);
        }
        else {
            // open the default DICOM file
            __openDefaultDicomFile();
        }
    }

    /**
     Request is failed.
     @param {object} data The server response.
     @function @private
    */
    function __errorFunc(data) {
        __showErrorMessage(data.errorMessage);
    }


    // create a request for getting information about DICOM files, which are stored in current HTTP session
    var request = new Vintasoft.Shared.WebRequestJS("GetCurrentSessionFiles", __successFunc, __errorFunc, { type: 'POST' });
    // send the request
    dicomService.sendRequest(request);
}

/**
 Opens the default DICOM file.
*/
function __openDefaultDicomFile() {
    var fileId = "DicomMprTest.dcm";
    // copy the file from global folder to the session folder
    Vintasoft.Imaging.VintasoftFileAPI.copyFile("UploadedImageFiles/" + fileId, __onCopyFile_success, __onCopyFile_error);
}

/**
 Request for copying of file is executed successfully.
 @param {object} data Information about copied file.
*/
function __onCopyFile_success(data) {
    _dicomControl.addFiles([data.fileId]);
}

/**
 Request for copying of file is failed.
 @param {object} data Information about error.
*/
function __onCopyFile_error(data) {
    alert(data.errorMessage);
}



// === Utils ===

/**
 Blocks the UI. 
 @param {string} text Message that describes why UI is blocked.
*/
function __blockUI(text) {
    _blockUiDialog = new BlockUiDialogJS(text);
}

/**
 Unblocks the UI.
*/
function __unblockUI() {
    if (_blockUiDialog != null) {
        _blockUiDialog.close();
        _blockUiDialog = null;
    }
}

/**
 Shows an error message.
 @param {object} data Information about error.
*/
function __showErrorMessage(data) {
    __unblockUI();
    new ErrorMessageDialogJS(data);
}

/**
 Returns application URL.
*/
function __getApplicationUrl() {
    var applicationUrl = window.location.toString();
    if (applicationUrl[applicationUrl.length - 1] != '/')
        applicationUrl = applicationUrl + '/';
    return applicationUrl;
}

/**
 Returns a value indicating whether application is executing on mobile device.
*/
function __isMobileDevice() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

/**
 Window is resized.
*/
function __window_resize() {
    __changeDemoHeaderVisibility(window.innerHeight < 500)

    _dicomControl.updateUI();
}

/**
 Changes the visibility of demo header.
*/
function __changeDemoHeaderVisibility(hide) {
    var displayStyle = "block";
    var heightStyle = "calc(100% - 60px)";
    if (hide) {
        displayStyle = "none";
        heightStyle = "100%"
    }

    var demoHeader = document.getElementById("demoHeader");
    demoHeader.style.display = displayStyle;

    var dicomViewerControlContainer = document.getElementById("dicomViewerControlContainer");
    dicomViewerControlContainer.style.height = heightStyle;
}

/**
 Shows the DICOM series manager panel.
*/
function __shownDicomSeriesManagerPanel() {
    var items = _dicomControl.get_Items();
    var sidePanel = items.getItemByRegisteredId("sidePanel");
    var seriesManagerPanel = items.getItemByRegisteredId("vsdm-dicomSeriesManagerPanel");
    sidePanel.set_ActivePanel(seriesManagerPanel);
}

/**
 Changes "MeasurementDefaultTickFactors" property in viewer.
*/
function __changeMeasurementDefaultTickFactors(event) {
    // get target viewer
    var viewer = event.target;

    // get string value of enum value
    var unitsOfMeasureString = viewer.get_MeasurementDefaultUnitsOfMeasure().toString();
    switch (unitsOfMeasureString) {
        case "Inches":
            // set the measurement default tick factors
            viewer.set_MeasurementDefaultTickFactors([0.1, 0.5, 1]);
            break;

        case "Centimeters":
            // set the measurement default tick factors
            viewer.set_MeasurementDefaultTickFactors([1, 5, 10]);
            break;

        case "Millimeters":
        case "Pixels":
            // set the measurement default tick factors
            viewer.set_MeasurementDefaultTickFactors([10, 50, 100]);
            break;
    }

    // subscribe once to the "disposed" event of viewer
    Vintasoft.Shared.subscribeToEventOnce(viewer, "disposed", function (event) {
        var viewer = event.target;
        // unsubscribe from the "measurementDefaultUnitsOfMeasureChanged" event
        Vintasoft.Shared.unsubscribeFromEvent(viewer, "measurementDefaultUnitsOfMeasureChanged", __changeMeasurementDefaultTickFactors);
    });
}

/**
 Subscribes to the "measurementDefaultUnitsOfMeasureChanged" events.
*/
function __subscribeToMeasurementDefaultUnitsOfMeasureChangedEvents() {
    var dicomViewerControl = _dicomControl.get_DicomViewerControl()
    // subscribe to the "measurementDefaultUnitsOfMeasureChanged" event of web DICOM viewer control
    Vintasoft.Shared.subscribeToEvent(dicomViewerControl, "measurementDefaultUnitsOfMeasureChanged", __changeMeasurementDefaultTickFactors);

    // subscribe to the "dicomMprControlAdded" event of web DICOM control
    Vintasoft.Shared.subscribeToEvent(_dicomControl, "dicomMprControlAdded", function (event, eventArgs) {
        // get DICOM MPR control from event arguments
        var dicomMprControl = eventArgs.dicomMprControl;

        // get viewers from web DICOM MPR viewer control
        var dicomMprViewerControls = dicomMprControl.get_DicomMprViewerControls();
        // for each web DICOM MPR viewer control
        for (var i = 0; i < dicomMprViewerControls.length; i++) {
            // subscribe to the "measurementDefaultUnitsOfMeasureChanged" event of web DICOM MPR viewer control
            Vintasoft.Shared.subscribeToEvent(dicomMprViewerControls[i], "measurementDefaultUnitsOfMeasureChanged", __changeMeasurementDefaultTickFactors);
        }
    });
}



// === Localization ===

/**
 Creates the dictionary for localization of application UI.
*/
function __createUiLocalizationDictionary() {
    var tempDialogs = [];
    var mprDialog = __createDicomViewerDialogsForLocalization(tempDialogs);

    if (_localizer == null)
        // create UI localizer
        _localizer = new Vintasoft.Shared.VintasoftLocalizationJS();

    var localizationDict = _localizer.getDocumentLocalizationDictionary();
    var localizationDictString = JSON.stringify(localizationDict, null, '\t');
    console.log(localizationDictString);

    mprDialog.hide();
    _dicomControl.get_Items().removeItem(mprDialog);

    var floatingContainer = document.getElementById("dicomViewerControlContainer");
    for (var i = 0; i < tempDialogs.length - 1; i++) {
        floatingContainer.removeChild(tempDialogs[i].get_DomElement());
        delete tempDialogs[i];
    }
}

/**
 Creates the dialogs, which are used in DICOM control, for localization.
*/
function __createDicomViewerDialogsForLocalization(tempDialogs) {
    var floatingContainer = document.getElementById("dicomViewerControlContainer");

    var dicomViewerControl = _dicomControl.get_DicomViewerControl();

    var dicomMetadataDialog = new Vintasoft.Imaging.Dicom.UI.Dialogs.WebUiDicomMetadataDialogJS(dicomViewerControl);
    dicomMetadataDialog.render(floatingContainer);
    tempDialogs.push(dicomMetadataDialog);

    var customDicomVoiLutDialog = new Vintasoft.Imaging.Dicom.UI.Dialogs.WebUiCustomDicomVoiLutDialogJS(dicomViewerControl);
    customDicomVoiLutDialog.render(floatingContainer);
    tempDialogs.push(customDicomVoiLutDialog);

    var mprDialog = new Vintasoft.Imaging.Dicom.UI.Dialogs.WebUiDicomMprDialogJS("tempDicomMprControlContainer", null);
    _dicomControl.get_Items().addItem(mprDialog);
    mprDialog.show();
    return mprDialog;
}

/**
 Enables the localization of application UI.
*/
function __enableUiLocalization() {
    if (_localizer == null)
        // create UI localizer
        _localizer = new Vintasoft.Shared.VintasoftLocalizationJS();

    // if localizer is ready (localizer loaded localization dictionary)
    if (_localizer.get_IsReady()) {
        // localize DOM-elements of web page
        _localizer.localizeDocument();
    }
    // if localizer is NOT ready
    else
        // wait when localizer will be ready
        Vintasoft.Shared.subscribeToEvent(_localizer, "ready", function () {
            // localize DOM-elements of web page
            _localizer.localizeDocument();
        });

    // subscribe to the "dialogShown" event of web DICOM control
    Vintasoft.Shared.subscribeToEvent(_dicomControl, "dialogShown", function (event, data) {
        _localizer.localizeDocument();
    });
}



// === Main ===

/**
 Main function.
*/
function __main() {
    // set the session identifier
    var hiddenSessionFieldElement = document.getElementById('hiddenSessionField');
    Vintasoft.Shared.WebImagingEnviromentJS.set_SessionId(hiddenSessionFieldElement.value);

    // specify web services, which should be used in this demo

    Vintasoft.Shared.WebServiceJS.defaultFileService = new Vintasoft.Shared.WebServiceControllerJS(__getApplicationUrl() + "vintasoft/api/MyVintasoftFileApi");
    Vintasoft.Shared.WebServiceJS.defaultDicomService = new Vintasoft.Shared.WebServiceControllerJS(__getApplicationUrl() + "vintasoft/api/MyVintasoftDicomApi");
    
    var dicomControlSettings = new Vintasoft.Imaging.Dicom.WebDicomControlSettingsJS("dicomViewerControlContainer", "dicomViewerControl");
    _dicomControl = new Vintasoft.Imaging.Dicom.WebDicomControlJS(dicomControlSettings);


    // subscribe to the "warningOccured" event of DICOM control
    Vintasoft.Shared.subscribeToEvent(_dicomControl, "warningOccured", __dicomControl_warningOccured);
    // subscribe to the "asyncOperationFailed" event of DICOM control
    Vintasoft.Shared.subscribeToEvent(_dicomControl, "asyncOperationFailed", __dicomControl_asyncOperationFailed);
    // subscribe to the "sessionCacheCleared" event of DICOM control
    Vintasoft.Shared.subscribeToEvent(_dicomControl, "sessionCacheCleared", __dicomControl_sessionCacheCleared);


    if (__isMobileDevice()) {
        // hide main menu header in fullscreen mode
        _dicomControl.set_ShowMainMenuHeaderInFullscreenMode(false);
        // hide side panel in fullscreen mode
        _dicomControl.set_ShowSidePanelInFullscreenMode(false);
    }

    
    // subscribe to the "resize" event of window
    window.onresize = __window_resize;
    // change the visibility of demo header
    __changeDemoHeaderVisibility(window.innerHeight < 500);
    
    // enable the localization of application UI
    __enableUiLocalization();

    // wait while web page will be loaded
    $(document).ready(function () {
        document.oncontextmenu = function () {
            // specify that context menu of web browser should not be shown
            return false;
        };

        var dicomViewerControl = _dicomControl.get_DicomViewerControl();
        if (dicomViewerControl != null) {
            // set count of images, which can be requested per one request
            dicomViewerControl.set_RequestingImageCount(5);
        }

        // open the DICOM files from current session
        __openDicomFilesFromCurrentSession();

        if (!__isMobileDevice()) {
            // show the DICOM series manager panel
            __shownDicomSeriesManagerPanel();
        }

        __subscribeToMeasurementDefaultUnitsOfMeasureChangedEvents();

        //// create the dictionary for localization of application UI
        //setTimeout(function () {
        //    __createUiLocalizationDictionary();
        //}, 2000);
    });
}



// run main function
__main();
