import React          from 'react';
import styled         from '@emotion/styled';
import { observer }   from 'mobx-react';
import ArrowLeftIcon  from '@rsuite/icons/ArrowLeft';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import ArrowDownIcon from '@rsuite/icons/ArrowDown';
import ArrowUpIcon from '@rsuite/icons/ArrowUp';

import { Button }       from 'rsuite';
import { useTreeStore } from 'Stores/TreeStore';

const Container = styled.div`
  display         : flex;
  justify-content : space-between;
  align-items     : center;
  padding         : 8px;
  width           : 100%;
`;
export const Header = observer( () => {
    
    const treeStore = useTreeStore();
    
    const ico = { style : { fontSize : "20px" } };
    
    return <Container>
        <h1>Skills</h1>
        <div>
            <div>Tastatur</div>
            <div><ArrowLeftIcon { ...ico }/>/<ArrowRightIcon { ...ico }/> Wert einstellen</div>
            <div><ArrowDownIcon { ...ico }/>/<ArrowUpIcon { ...ico }/> Zeile ändern</div>
        </div>
        <Button onClick={ () => treeStore.toggleExportImport() }>Import/Export</Button>
        <Button onClick={ () => treeStore.reset() }>Reset (DANGER)</Button>
    </Container>
} );
