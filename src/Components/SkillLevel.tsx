import React        from 'react';
import styled       from '@emotion/styled';
import { observer } from 'mobx-react';

import { useTreeStore }        from 'Stores/TreeStore';
import { SkillLevel as Level } from 'Models/SkillLevel';
import { TreeItemId }          from '../Models/TreeItemId';

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
    id : TreeItemId;
}

export const SkillLevel = observer( ( props : SkillLevelProps ) => {
    
    const treeStore = useTreeStore();
    
    const level = treeStore.getSkillLevel( props.id );
    
    const toggle = ( lvl : Level ) => {
        treeStore.toggleSkill( props.id, lvl )
    };
    
    return <>
        <Numbers>
            { [ 0, 1, 2, 3, 4 ].map( lvl => (
                <span key={ [ 'skill', props.id, lvl ].join( '-' ) }>
                    <Value onClick={ () => toggle( lvl as Level ) }
                           isActive={ level === lvl }>
                        { lvl }
                    </Value>
                    { lvl < 4 && <Seperator>|</Seperator> }
                </span>
            ) ) }
        </Numbers>
        <YesNo>
            <Value isActive={ level === 'ja' }>ja</Value>
            <Seperator>|</Seperator>
            <Value isActive={ false }>nein</Value>
        </YesNo>
    </>
} );
