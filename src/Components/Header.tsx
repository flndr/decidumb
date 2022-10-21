import React        from 'react';
import styled       from '@emotion/styled';
import { observer } from 'mobx-react';

import { Button }       from 'rsuite';
import { useTreeStore } from 'Stores/TreeStore';

const Container = styled.div`
  text-align : right;
  //display         : flex;
  //justify-content : stretch;
  //align-items     : center;
`;

const Link = styled.a<{ on : boolean }>`
  color           : ${ p => p.on ? '#F8F8F8' : ' #868686' };
  cursor          : ${ p => p.on ? 'default' : ' pointer' };
  text-decoration : none;

  &:hover {
    text-decoration : none;
  }
`;

const Sep = styled.span`
  color   : #868686;
  padding : 0 0.25rem;
`;

export const Header = observer( () => {
    
    const treeStore = useTreeStore();
    
    return <Container>
        <h1>Decidumb</h1>
        {/*<div>Zeige <Link on={ true }>alle</Link><Sep>|</Sep><Link on={ false }>ausgewählte</Link></div>*/}
        {/*<div>Autoscroll <Link on={ false }>an</Link><Sep>|</Sep><Link on={ true }>aus</Link></div>*/}
    </Container>
} );
