import { useEffect }         from 'react';
import { observer }          from 'mobx-react';
import React                 from 'react';
import { Divider }           from 'rsuite';
import styled                from '@emotion/styled';
import CodeIcon              from '@rsuite/icons/Code';
import { useTreeStore }      from 'Stores/TreeStore';
import { TreeStoreProvider } from 'Stores/TreeStore';
import { media }             from 'Styles/media';
import { BREAK }             from 'Styles/media';
import { TreeItem }          from './Components/TreeItem';

const Wrapper = styled.div`
  padding   : 0.5rem;
  max-width : 1600px;
  margin    : 0 auto;

  h1 {
    font-size     : 46px;
    line-height   : 46px;
    margin-bottom : 0;
  }


  ${ BREAK.S } {
    padding : 1rem;
  }

  ${ BREAK.L } {
    padding : 1rem;
  }

  ${ BREAK.XL } {
    padding : 2rem;
  }

`;

const Calendars = styled.div`
  display         : flex;
  flex-wrap       : wrap;
  justify-content : stretch;
  align-items     : flex-start;

  h4 {
    margin : 0 0 1rem 0;
  }

  & > div + div {
    margin-top : 1rem;
  }

  ${ BREAK.L } {
    margin : 0 -1rem;

    & > div {
      width   : 50%;
      padding : 1rem;
    }

    & > div + div {
      margin-top : 0;
    }
  }

  ${ BREAK.XL } {
    & > div {
      width : 33.33%;
    }
  }
`;

const BREAK_DEINS = media( 1000 );

const Deins = styled.div`
  ${ BREAK_DEINS } {
    display         : flex;
    justify-content : space-between;
    align-items     : stretch;
  }
`;

const DeinSetup = styled.div`
  margin-top  : 2rem;
  border-top  : 1px solid var(--rs-divider-border);
  padding-top : 2rem;

  & > div + div {
    margin-top : 2rem;
  }

  ${ media( 500 ) } {
    display         : flex;
    justify-content : space-between;


    & > div {
      width : 46%;
    }

    & > div + div {
      margin-top : 0;
    }
  }

  ${ BREAK_DEINS } {
    display     : block;
    width       : 16rem;
    flex-grow   : 0;
    flex-shrink : 0;
    margin-top  : 0;
    border-top  : 0;
    padding-top : 0;

    & > div {
      width : 100%;
    }

    & > div + div {
      margin-top : 2rem;
    }
  }
`;

const DeineTermine = styled.div`
  ${ BREAK_DEINS } {
    width         : auto;
    flex-grow     : 1;
    padding-right : 4rem;
  }
`;

const Header = styled.div`
  display         : flex;
  justify-content : space-between;
  align-items     : center;

  a {
    font-size  : 2rem;
    opacity    : 0.3;
    transition : opacity 500ms ease-in-out;

    &:hover {
      opacity : 0.8;
    }
  }
`;

function App() {
    
    const treeStore = useTreeStore();
    
    useEffect( () => {
        return () => treeStore.stopStore();
    }, [] );
    
    return <>
        <TreeStoreProvider store={ treeStore }>
            
            
            <TreeItem items={ treeStore.tree }/>
        
        
        </TreeStoreProvider>
    </>;
}

export default observer( App );
