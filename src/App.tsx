import styled        from '@emotion/styled';
import React         from 'react';
import { Key }       from 'ts-key-enum';
import { observer }  from 'mobx-react';
import { useEffect } from 'react';
import { scroller }  from 'react-scroll';

import { useTreeStore }      from 'Stores/TreeStore';
import { TreeStoreProvider } from 'Stores/TreeStore';
import { TreeItem }          from 'Components/TreeItem';
import { Header }            from 'Components/Header';

const Overlay = styled.div`
  position         : fixed;
  margin           : 10% auto;
  width            : 80%;
  height           : 80%;
  left             : 0;
  right            : 0;
  background-color : white;
  display          : flex;
  justify-content  : center;
  align-items      : center;
`;

const Export = styled.code`
  word-wrap: break-word;
`

function App() {
    
    const treeStore = useTreeStore();
    
    const getAllItems = () => Array.from( document.querySelectorAll(
        '[data-tree-item-id][tabindex="0"]'
    ) ) as HTMLElement[];
    
    const scrollTo = ( name : string ) => scroller.scrollTo( name, {
        offset   : Math.floor( document.documentElement.clientHeight / -4 ),
        duration : 300,
        delay    : 800,
        smooth   : 'easeInOutQuart'
    } );
    
    const keypressHandler = ( event : KeyboardEvent ) => {
        
        if ( ![ Key.ArrowLeft,
                Key.ArrowRight,
                Key.ArrowUp,
                Key.ArrowDown ].includes( event.key as any ) ) {
            return;
        }
        
        event.preventDefault();
        
        const id = document.activeElement?.getAttribute( 'data-tree-item-id' );
        if ( !id ) {
            return;
        }
        
        const allItems = getAllItems();
        const current  = allItems.findIndex( el => el.getAttribute( 'data-tree-item-id' ) === id );
        
        switch ( event.key ) {
            case Key.ArrowLeft:
                treeStore.previousSkillLevel( id );
                break;
            case Key.ArrowRight:
                treeStore.nextSkillLevel( id );
                break;
            case Key.ArrowUp:
                if ( current === 0 ) {
                    return;
                }
                allItems[ current - 1 ].focus();
                //scrollTo( allItems[ current - 1 ]!.getAttribute( 'data-tree-item-id' )! );
                break;
            case Key.ArrowDown:
                if ( current === allItems.length - 1 ) {
                    return;
                }
                allItems[ current + 1 ].focus();
                //scrollTo( allItems[ current + 1 ]!.getAttribute( 'data-tree-item-id' )! );
                break;
        }
    };
    
    useEffect( () => {
        window.addEventListener( "keydown", keypressHandler );
        return () => {
            window.removeEventListener( "keydown", keypressHandler );
            treeStore.stopStore();
        };
    }, [] );
    
    return <>
        <TreeStoreProvider store={ treeStore }>
            <Overlay>
                <textarea>
                    { treeStore.exportSelected() }
                </textarea>
            </Overlay>
            <Header/>
            <TreeItem items={ treeStore.tree }/>
        </TreeStoreProvider>
    </>;
}

export default observer( App );
