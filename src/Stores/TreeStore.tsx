import React                     from 'react';
import { FC }                    from 'react';
import { useContext }            from 'react';
import { createContext }         from 'react';
import { observable }            from 'mobx';
import { get, set, has, remove } from 'mobx';
import { makeAutoObservable }    from 'mobx';
import { makePersistable }       from 'mobx-persist-store';
import { stopPersisting }        from 'mobx-persist-store';

import { TreeItem }      from 'Models/TreeItem';
import { RenderMode }    from 'Models/RenderMode';
import { SelectedItems } from 'Models/SelectedItems';
import { SkillLevel }    from 'Models/SkillLevel';
import { TreeItemId }    from 'Models/TreeItemId';

import tree from 'tree'

export class TreeStore {
    
    _tree : TreeItem[] = tree as unknown as TreeItem[];
    
    _selectedItems : SelectedItems = observable.object( {} );
    
    _renderMode : RenderMode = RenderMode.TREE;
    _isExportImportOpen      = false;
    
    constructor() {
        makeAutoObservable( this );
        
        makePersistable( this, {
            name       : 'skills',
            storage    : window.localStorage,
            properties : [
                '_selectedItems'
            ]
        } );
    }
    
    stopStore() {
        stopPersisting( this );
    }
    
    get tree() {
        return this._tree;
    }
    
    get renderMode() {
        return this._renderMode;
    }
    
    get isExportImportOpen() {
        return this._isExportImportOpen;
    }
    
    toggleSkill( id : TreeItemId, level : SkillLevel ) {
        if ( has( this._selectedItems, id ) ) {
            if ( this._selectedItems[ id ] === level ) {
                remove( this._selectedItems, id );
            } else {
                set( this._selectedItems, id, level );
            }
        } else {
            set( this._selectedItems, id, level );
        }
    }
    
    nextSkillLevel( id : TreeItemId ) {
        if ( has( this._selectedItems, id ) ) {
            if ( this._selectedItems[ id ] === 'ja' ) {
                remove( this._selectedItems, id );
            } else if ( this._selectedItems[ id ] === 4 ) {
                set( this._selectedItems, id, 'ja' );
            } else {
                set( this._selectedItems, id, this._selectedItems[ id ] as number + 1 );
            }
        } else {
            set( this._selectedItems, id, 0 );
        }
    }
    
    previousSkillLevel( id : TreeItemId ) {
        if ( has( this._selectedItems, id ) ) {
            if ( this._selectedItems[ id ] === 'ja' ) {
                set( this._selectedItems, id, 4 );
            } else if ( this._selectedItems[ id ] === 0 ) {
                remove( this._selectedItems, id );
            } else {
                set( this._selectedItems, id, this._selectedItems[ id ] as number - 1 );
            }
        } else {
            set( this._selectedItems, id, 'ja' );
        }
    }
    
    getSkillLevel( id : TreeItemId ) : SkillLevel | null {
        return get( this._selectedItems, id );
    }
    
    has( id : TreeItemId ) : boolean {
        return has( this._selectedItems, id )
    }
    
    exportSelected() : string {
        return JSON.stringify( this._selectedItems )
    }
    
    openExportImport() {
        return this._isExportImportOpen = true;
    }
    
    closeExportImport() {
        return this._isExportImportOpen = false;
    }
    
    toggleExportImport() {
        return this._isExportImportOpen = !this._isExportImportOpen;
    }
    
    importCode( json : string ) {
        const selectedItemsBackup = JSON.parse( JSON.stringify( this._selectedItems ) ) as SelectedItems;
        try {
            this._selectedItems = JSON.parse( json );
        } catch ( e ) {
            this._selectedItems = selectedItemsBackup;
            throw e;
        }
    }
    
    reset() {
        this._selectedItems = {};
    }
}

export const TreeStoreContext = createContext<TreeStore>( new TreeStore() );

export const TreeStoreProvider : FC<{
    store : TreeStore,
    children : React.ReactNode
}> = ( { store, children } ) => (
    <TreeStoreContext.Provider value={ store }>
        { children }
    </TreeStoreContext.Provider>
);

export const useTreeStore = () => {
    return useContext( TreeStoreContext );
}
