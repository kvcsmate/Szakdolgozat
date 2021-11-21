import cell from './cell.js';

export default class County
{
    constructor(id,name)
    {
        this.id = id;
        this.cells = new Array(cell);
    }
}

