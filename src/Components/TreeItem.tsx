import React        from 'react';
import styled       from '@emotion/styled';
import { observer } from 'mobx-react';

import { TreeItem as Item } from 'Models/TreeItem';
import { RenderMode }       from 'Models/RenderMode';
import { useTreeStore }     from 'Stores/TreeStore';
import { SkillLevel }       from 'Components/SkillLevel';

const Zeile = styled.div`
  display         : flex;
  justify-content : stretch;
  align-items     : center;
`;

const Container = styled.div`
  padding : 2px 0;

  &[data-has-children=false]:hover {
    background-color : rgba(255, 255, 255, .075);
  }

  &:focus {
    background-color : rgba(255, 255, 255, .15) !important;
    outline          : 0 none;
  }
`;

const Title = styled.div`
  width       : auto;
  flex-shrink : 1;
  flex-grow   : 1;
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
            const id          = item.id;
            const tabindex    = hasChildren ? -1 : 0;
            const nameList    = [ ...parentNames, item.name ];
            const key         = [ 'lvl', level, 'id', id ].join( '-' );
            
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
                            { !hasChildren && <SkillLevel id={ id }/> }
                        </Zeile>
                        { children }
                    </>;
                    break;
                default:
                    content = <></>
                    break;
            }
            
            return <Container
                data-tree-item-id={ id }
                data-has-children={ hasChildren }
                tabIndex={ tabindex }
                key={ key }>
                { content }
            </Container>;
        } ) }
    </div>
} );
