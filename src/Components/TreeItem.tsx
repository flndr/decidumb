import React           from 'react';
import styled          from '@emotion/styled';
import { observer }    from 'mobx-react';
import { InputNumber } from 'rsuite';

import { TreeItem as Item } from 'Models/TreeItem';
import { useTreeStore }     from 'Stores/TreeStore';
import { RenderMode }       from 'Models/RenderMode';
import { SkillLevel }       from './SkillLevel';

const Zeile = styled.div`
  display         : flex;
  justify-content : stretch;
  align-items     : center;
`;

const Container = styled.div`
  padding : 2px 0;

  &:focus {
    background-color : rgba(255, 255, 255, .1);
    outline          : 0 none;
  }
`;

const Title = styled.div`
  width       : auto;
  flex-shrink : 1;
  flex-grow   : 1;
`;

const YesNo = styled.div`
  width       : 90px;
  flex-shrink : 0;
  flex-grow   : 0;
`;

const Numbers = styled.div`
  width       : 160px;
  flex-shrink : 0;
  flex-grow   : 0;
`;

interface TreeItemProps {
    items : Item[];
    level? : number;
    parentNames? : string[];
}

export const TreeItem = observer( ( props : TreeItemProps ) => {
    
    const treeStore = useTreeStore();
    
    const items       = props.items;
    const level       = props.level || 0;
    const parentNames = props.parentNames || [];
    
    return <div>
        { items.map( item => {
            
            const hasChildren = item.children.length > 0
            const tabindex    = hasChildren ? -1 : 0;
            const nameList    = [ ...parentNames, item.name ];
            const key         = [ 'lvl', level, 'id', item.id ].join( '-' );
            
            let children = <></>;
            if ( hasChildren ) {
                children = <TreeItem
                    items={ item.children }
                    level={ level + 1 }
                    parentNames={ nameList }
                />
            }
            
            let content;
            switch ( treeStore.renderMode ) {
                case RenderMode.BREADCRUMB:
                    content = <>
                        <Zeile>{ nameList.join( ' / ' ) }</Zeile>
                        { children }
                    </>;
                    break;
                case RenderMode.TREE:
                    content = <>
                        <Zeile style={ { paddingLeft : level + 'rem' } }>
                            <Title>{ item.name }</Title>
                            { !hasChildren && <SkillLevel item={ item }/> }
                        </Zeile>
                        { children }
                    </>;
                    break;
                default:
                    content = <></>
                    break;
            }
            
            return <Container tabIndex={ tabindex } key={ key }>
                { content }
            </Container>;
        } ) }
    </div>
} );
