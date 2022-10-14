import React        from 'react';
import styled       from '@emotion/styled';
import { observer } from 'mobx-react';

import { useTreeStore }        from 'Stores/TreeStore';
import { TreeItem as Item }    from 'Models/TreeItem';
import { SkillLevel as Level } from 'Models/SkillLevel';

const Value = styled.span<{ isActive : boolean }>`
  color  : ${ p => p.isActive ? '#17FF00' : ' #868686' };
  cursor : pointer;
`;

const Seperator = styled.span`
  color   : #868686;
  padding : 0 0.25rem;
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

interface SkillLevelProps {
    item : Item;
}

export const SkillLevel = observer( ( props : SkillLevelProps ) => {
    
    const treeStore = useTreeStore();
    
    const item = props.item;
    
    const level = treeStore.selectedItems[ item.id ];
    
    return <>
        <Numbers>
            <Value onClick={ () => treeStore.toggleSkill( item.id, Level.GRUNDKENTNISSE ) }
                   isActive={ level === Level.GRUNDKENTNISSE }>0</Value>
            <Seperator>|</Seperator>
            <Value onClick={ () => treeStore.toggleSkill( item.id, Level.WENIG_ERFAHRUNG ) }
                   isActive={ level === Level.WENIG_ERFAHRUNG }>1</Value>
            <Seperator>|</Seperator>
            <Value onClick={ () => treeStore.toggleSkill( item.id, Level.VERTIEFTE_KENNTNISSE ) }
                   isActive={ level === Level.VERTIEFTE_KENNTNISSE }>2</Value>
            <Seperator>|</Seperator>
            <Value onClick={ () => treeStore.toggleSkill( item.id, Level.SPEZIALWISSEN ) }
                   isActive={ level === Level.SPEZIALWISSEN }>3</Value>
            <Seperator>|</Seperator>
            <Value onClick={ () => treeStore.toggleSkill( item.id, Level.EXPERTE ) }
                   isActive={ level === Level.EXPERTE }>4</Value>
        </Numbers>
        <YesNo>
            <Value isActive={ !!level }>ja</Value>
            <Seperator>|</Seperator>
            <Value isActive={ false }>nein</Value>
        </YesNo>
    </>
} );
