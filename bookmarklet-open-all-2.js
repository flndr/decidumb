(async () => {

    const decodeHtml = ( html ) => {
        const txt     = document.createElement( "textarea" );
        txt.innerHTML = html;
        return txt.value;
    };

    const getClosedTreeItems = () => Array.from( document.querySelectorAll(
        '[role="treeitem"][aria-expanded="false"] > div.tree-item > span.tree-icon'
    ) );

    const waitForDecidings = () => new Promise( resolve => setTimeout( resolve, 400 ) );

    do {
        const items = getClosedTreeItems();
        for( const item of items ) {
            item.click();
            await waitForDecidings();
        }
    } while( getClosedTreeItems().length > 0 );

    const grabItems = ( listItems, parentId = null ) => {
        let items = [];
        for( const li of listItems ) {
            const id   = li.getAttribute( 'id' );
            const item = {
                id,
                parentId,
                skillLevel : null,
                name       : decodeHtml( li.querySelector( 'div.tree-item > span.name' ).innerHTML )
            };

            items = [
                ...items,
                item,
                ...grabItems( Array.from( li.querySelectorAll( ':scope > ul > li' ) ), id ),
            ];
        }
        return items.sort( ( a, b ) => a.name.localeCompare( b.name ) );
    };

    // copy and paste the logged object into tree.js
    console.log(
        grabItems( document.querySelectorAll( 'ul.tree > li' ) )
    );

})();


