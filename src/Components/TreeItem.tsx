import React                       from 'react';
import styled                      from '@emotion/styled';
import { observer }                from 'mobx-react';
import { StickyContainer, Sticky } from 'react-sticky';

import { Element as ScrollElement } from 'react-scroll';

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
  width         : auto;
  flex-shrink   : 1;
  flex-grow     : 1;
  padding       : 0 8px;
  border-radius : 2px;
  //box-shadow    : 0px 6px 5px 0px rgba(15, 19, 26, 0.78);
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
                    if ( hasChildren ) {
                        content = <StickyContainer>
                            <Zeile style={ { paddingLeft : level + 'rem' } }>
                                <Sticky disableHardwareAcceleration={ false }
                                        topOffset={ ( parentNames.length + 0 ) * -20 }>
                                    { ( { style, isSticky, } ) => (
                                        <Title style={ {
                                            ...style,
                                            //backgroundColor : 'rgba(0,51,140)',
                                            backgroundColor : '#0F131A',
                                            color           : 'white',
                                            width           : '100%',
                                            //boxShadow       : '0px 6px 24px 6px #0F131A',
                                            zIndex : isSticky ? 20 - parentNames.length : 0,
                                            //zIndex          : 10,
                                            marginTop : isSticky
                                                        ? ( parentNames.length * 20 ) + 'px'
                                                        : 0
                                        } }>{ item.name }</Title>
                                    ) }
                                </Sticky>
                            </Zeile>
                            { children }
                        </StickyContainer>;
                    } else {
                        content = <>
                            <Zeile style={ { paddingLeft : level + 'rem' } }>
                                <Title>{ item.name }</Title>
                                <SkillLevel id={ id }/>
                            </Zeile>
                        </>;
                    }
                    break;
                default:
                    content = <></>
                    break;
            }
            
            content = <ScrollElement name={ id }>
                { content }
            </ScrollElement>;
            
            return hasChildren
                   ? <Container data-tree-item-id={ id } data-has-children={ hasChildren } key={ key }>
                       { content }
                   </Container>
                   : <Container data-tree-item-id={ id } data-has-children={ hasChildren } key={ key }
                                tabIndex={ tabindex }>
                       { content }
                   </Container>;
        } ) }
    </div>
} );
