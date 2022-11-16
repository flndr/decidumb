import styled                from '@emotion/styled';
import { observer }          from 'mobx-react';
import { MouseEventHandler } from 'react';
import { useState }          from 'react';
import React                 from 'react';
import { Message }           from 'rsuite';
import { Button }            from 'rsuite';

import { useTreeStore } from 'Stores/TreeStore';

const Shadow = styled.div`
  position         : fixed;
  margin           : 0;
  width            : 100%;
  height           : 100%;
  left             : 0;
  right            : 0;
  background-color : rgba(0, 0, 0, 0.8);
  display          : flex;
  justify-content  : center;
  align-items      : center;
  z-index          : 100;
`;

const OverlayBox = styled.div`
  background-color : rgba(255, 255, 255, 0.1);
  padding          : 20px;
  position         : relative;
  border-radius    : 6px;
`;

const CloseBtn = styled( Button )`
  position : absolute;
  right    : 14px;
  top      : 14px;
`;

const Codeschnipsel = styled.textarea`
  display : block;
  width   : 100%;
  color   : rgb(13, 35, 72);
  height  : 200px;
  margin  : 0.5rem 0;
`;

function Overlay() {
    
    const [ json, setJson ]         = useState( "" );
    const [ hasError, setHasError ] = useState( false );
    
    const treeStore = useTreeStore();
    
    const handleImport = () => {
        let failed = false;
        try {
            treeStore.importCode( json );
        } catch ( e ) {
            console.error( e );
            failed = true;
        }
        if ( failed ) {
            setHasError( true );
        } else {
            treeStore.closeExportImport();
        }
    };
    
    return <>
        { treeStore.isExportImportOpen && <Shadow>
            <OverlayBox>
                <CloseBtn onClick={ () => treeStore.closeExportImport() }>x</CloseBtn>
                <h2>Export</h2>
                <p>Der folgende Code beinhaltet deine Skills:</p>
                <p>(Einfach rauskopieren und deinem Teamleiter senden)</p>
                <Codeschnipsel disabled={ true } defaultValue={ treeStore.exportSelected() }/>
                <hr/>
                <h2>Import</h2>
                <p>Hier kannst du Skills importieren:</p>
                <p>(VORSICHT: Überschreibt deine aktuellen Einstellungen!)</p>
                { hasError && <Message type="error">Sorry, hat nicht geklappt. Das war kein gültiger Code.</Message> }
                <Codeschnipsel defaultValue={ '' } onChange={ event => setJson( event.target.value ) }/>
                <Button onClick={ handleImport }>Code/Skills importieren</Button>
            </OverlayBox>
        </Shadow> }
    </>;
}

export default observer( Overlay );
