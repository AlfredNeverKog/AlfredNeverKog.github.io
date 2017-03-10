/**
 * Created by albert on 2/16/17.
 */
var dropZone = document.getElementById('dropZone');
var ADD_POINTS = "ADD_P";
var MOVE_POINTS = "MOVE_P";
var PLACE_MOVED_POINT = "MOVE_PLACE";
var mode = ADD_POINTS;
// Optional.   Show the copy icon when dragging over.  Seems to only work for chrome.
dropZone.addEventListener('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
});

// Get file data on drop
dropZone.addEventListener('drop', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files; // Array of all files

    var createReader = function (file) {
        return function () {
            var reader = new FileReader();
            var name = file.name.split(".")[0];
            reader.onload = function(e2) {
                // finished reading file data.
                if(dropObj.dropEvent){
                    dropObj.dropEvent({ name:name,data: e2.target.result });
                }
            };

            reader.readAsDataURL(file); // start reading the file data.
        }

    }
    for (var i=0, file; file=files[i]; i++) {
        if (file.type.match(/image.*/)) {

            console.log('name',name);
            createReader(file)();
        }
    }
});
var dropObj = {
    onDrop : function (cback) {
        dropObj.dropEvent = cback;
    }
};
