var Drags = /** @class */ (function () {
    function Drags(metadata) {
        this.Containers = [];
        this.DraggableObjects = [];
        this.DropIn = false;
        this.MetaData = {
            Debug: false,
            printFunction: console.log
        };
        this.SetContainers = function (containersArray) {
            this.Containers = containersArray;
            for (var i = 0; i < this.Containers.length; i++) {
                this.Containers[i].ondragenter = this.OnDragEnter.bind(this);
                this.Containers[i].ondragover = this.OnDragOver.bind(this);
                this.Containers[i].ondragleave = this.OnDragLeave.bind(this);
                this.Containers[i].ondrop = this.OnDrop.bind(this);
            }
        };
        this.OnDragEnter = function (event) {
            if (this.MetaData.Debug === true)
                this.MetaData.printFunction('Dragging over the ' + event.target.getAttribute('id'));
        };
        this.OnDragOver = function (event) {
            return false;
        };
        this.OnDragLeave = function (event) {
            if (this.MetaData.Debug === true)
                this.MetaData.printFunction('Leaving the ' + event.target.getAttribute('id'));
        };
        this.OnDrop = function (event) {
            event.preventDefault();
            var element_id = event.dataTransfer.getData('text');
            event.target.appendChild(document.getElementById(element_id));
            if (this.MetaData.Debug === true)
                this.MetaData.printFunction('Dropped ' + element_id + ' Over ' + event.target.getAttribute('id'));
            //_(element_id).removeAttribute('draggable');
            document.getElementById(element_id).style.cursor = 'default';
            this.DropIn = true;
        };
        this.SetDraggables = function (elements) {
            this.DraggableObjects = elements;
            for (var i = 0; i < this.DraggableObjects.length; i++) {
                this.DraggableObjects[i].setAttribute('draggable', true);
                this.DraggableObjects[i].ondragstart = this.StartDrag.bind(this);
                this.DraggableObjects[i].ondragend = this.EndDrag.bind(this);
            }
        };
        this.StartDrag = function (event) {
            if (this.MetaData.Debug === true)
                this.MetaData.printFunction('Dragging the ' + event.target.getAttribute('id'));
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.setData('text', event.target.getAttribute('id'));
        };
        this.EndDrag = function (event) {
            if (this.DropIn == false) {
                if (this.MetaData.Debug === true)
                    this.MetaData.printFunction('You let in ' + event.target.getAttribute('id'));
            }
            this.DropIn = false;
        };
        this.MetaData = metadata;
    }
    ;
    return Drags;
}());
;
