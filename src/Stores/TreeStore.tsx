import { makeAutoObservable } from 'mobx';
import { stopPersisting }     from 'mobx-persist-store';

import React             from 'react';
import { FC }            from 'react';
import { useContext }    from 'react';
import { createContext } from 'react';

import { TreeItem }      from 'Models/TreeItem';
import { RenderMode }    from 'Models/RenderMode';
import { SelectedItems } from 'Models/SelectedItems';
import { SkillLevel }    from 'Models/SkillLevel';
import { TreeItemId }    from 'Models/TreeItemId';
import tree              from 'tree'

export class TreeStore {
    
    _tree : TreeItem[] = tree as unknown as TreeItem[];
    
    _selectedItems : SelectedItems = {
        '136104' : SkillLevel.GRUNDKENTNISSE
    };
    
    _renderMode : RenderMode = RenderMode.TREE;
    
    constructor() {
        makeAutoObservable( this );
        
        //makePersistable( this, {
        //    name       : 'decidumb',
        //    storage    : window.localStorage,
        //    properties : [
        //        '_renderMode'
        //    ]
        //} );
    }
    
    stopStore() {
        stopPersisting( this );
    }
    
    get tree() {
        return this._tree;
    }
    
    get selectedItems() {
        return this._selectedItems;
    }
    
    get renderMode() {
        return this._renderMode;
    }
    
    toggleSkill( id : TreeItemId, level : SkillLevel ) {
        if ( this._selectedItems.hasOwnProperty( id ) ) {
            if ( this._selectedItems[ id ] === level ) {
                delete this._selectedItems[ id ];
            } else {
                this._selectedItems = {
                    ...this._selectedItems,
                    [ id ] : level
                }
            }
        } else {
            this._selectedItems = {
                ...this._selectedItems,
                [ id ] : level
            }
        }
        const currentLevel = this._selectedItems[ id ]
    }
    
}

export const TreeStoreContext = createContext<TreeStore>( new TreeStore() );

export const TreeStoreProvider : FC<{
    store : TreeStore,
    children : React.ReactNode
}> = ( { store, children } ) => {
    return (
        <TreeStoreContext.Provider value={ store }>
            { children }
        </TreeStoreContext.Provider>
    );
};

export const useTreeStore = () => {
    return useContext( TreeStoreContext );
}
