(async () => {

    function decodeHtml( html ) {
        var txt       = document.createElement( "textarea" );
        txt.innerHTML = html;
        return txt.value;
    }

    const expandSelector = '[role="treeitem"][aria-expanded="false"] > div.tree-item > span.tree-icon';

    const getClosedTreeItems = () => Array.from( document.querySelectorAll( expandSelector ) );

    const waitForDecidings = () => new Promise( resolve => setTimeout( resolve, 400 ) );

    do {

        const items = getClosedTreeItems();
        for( const item of items ) {
            item.click();
            await waitForDecidings();
        }

    } while( getClosedTreeItems().length > 0 );

    const grabItems = ( listItems, items = [] ) => {
        for( const li of listItems ) {
            const item = {
                id       : li.getAttribute( 'id' ),
                name     : decodeHtml( li.querySelector( 'div.tree-item > span.name' ).innerHTML ),
                children : grabItems( Array.from( li.querySelectorAll( ':scope > ul > li' ) ) ),
                level    : null
            };

            items = [ item, ...items ];
        }
        return items.sort( ( a, b ) => a.name.localeCompare( b.name ) );
    };

    const items = grabItems( document.querySelectorAll( 'ul.tree > li' ) ).sort(
        ( a, b ) => a.name.localeCompare( b.name ) );
    console.log( items );

})();


