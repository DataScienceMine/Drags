class Drags {
    private Containers: HTMLElement[] = [];
    private DraggableObjects: HTMLElement[] = [];
    private DropIn: boolean = false;
    private MetaData: object = {
        Debug: false,
        printFunction: console.log
    };

    constructor (metadata: object) {
        this.MetaData = metadata;
    };

    public SetContainers = function (containersArray: HTMLElement[]) {
        this.Containers = containersArray;
        for(var i:number = 0; i < this.Containers.length; i++) {
            this.Containers[i].ondragenter = this.OnDragEnter.bind(this);
            this.Containers[i].ondragover = this.OnDragOver.bind(this)
            this.Containers[i].ondragleave = this.OnDragLeave.bind(this)
            this.Containers[i].ondrop = this.OnDrop.bind(this);
        }
    }
    private OnDragEnter = function (event) {
        if(this.MetaData.Debug === true)
            this.MetaData.printFunction('Dragging over the ' + event.target.getAttribute('id'));
    };
    private OnDragOver = function (event) {
        return false;
    };
    private OnDragLeave = function (event) {
        if(this.MetaData.Debug === true)
            this.MetaData.printFunction('Leaving the ' + event.target.getAttribute('id'));
    };

    private OnDrop = function (event) {
        event.preventDefault();
        var element_id = event.dataTransfer.getData('text');
        event.target.appendChild(document.getElementById(element_id));
        if(this.MetaData.Debug === true)
            this.MetaData.printFunction('Dropped ' + element_id + ' Over ' + event.target.getAttribute('id'));
        //_(element_id).removeAttribute('draggable');
        document.getElementById(element_id).style.cursor = 'default';
        this.DropIn = true;
    };

    public SetDraggables = function (elements: HTMLElement[]) {
        this.DraggableObjects = elements;
        for(var i:number = 0; i < this.DraggableObjects.length; i++) {
            this.DraggableObjects[i].setAttribute('draggable', true);
            this.DraggableObjects[i].ondragstart = this.StartDrag.bind(this);
            this.DraggableObjects[i].ondragend = this.EndDrag.bind(this);
        }
    };

    private StartDrag = function (event) {
        if(this.MetaData.Debug === true)
            this.MetaData.printFunction('Dragging the ' + event.target.getAttribute('id'));
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('text', event.target.getAttribute('id'));
    };
    private EndDrag = function (event) {
        if(this.DropIn == false){
            if(this.MetaData.Debug === true)
                this.MetaData.printFunction('You let in ' + event.target.getAttribute('id'));
        }
        this.DropIn = false;
    };
};