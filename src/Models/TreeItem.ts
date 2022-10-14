import { TreeItemId } from './TreeItemId';

export interface TreeItem {
    id : TreeItemId;
    name : string;
    children : TreeItem[];
}
