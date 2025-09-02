---
{"publish":true,"title":"My Second Brain","created":"2025-07-28","modified":"2025-08-28T08:34:06.068+02:00","cssclasses":"center-images center-titles"}
---


# MY SECOND BRAIN

---

![[meta/assets/matterhorn.png|500]]

Welcome to my second brain, a _Zettelkasten_ of my various interests, including but not limited to robotics, cyber security, programming, or ultra-distance running.

### TAGS

---

`Evaluation Error: SyntaxError: Invalid regular expression: missing /
    at DataviewInlineApi.eval (plugin:dataview:25195:17)
    at evalInContext (plugin:dataview:25196:5)
    at asyncEvalInContext (plugin:dataview:25205:28)
    at DataviewJSRenderer.render (plugin:dataview:25234:13)
    at DataviewJSRenderer.onload (plugin:dataview:24676:10)
    at e.load (app://obsidian.md/app.js:1:1182416)
    at DataviewApi.executeJs (plugin:dataview:25834:14)
    at tryExecuteJs (plugin:quartz-syncer:19764:15)
    at eval (plugin:quartz-syncer:19678:38)
    at eval (plugin:quartz-syncer:20146:54)[\s\S]*?```|\$[\s\S]*?\$|\$\$[\s\S]*?\$\$/g;
    const cleanedText   = text.replace( pattern, '' );
    const matchText     = cleanedText.match( /\S+/g );

    if ( !matchText )
        return 0;

    return matchText.length;
}

/*
    Calculate font text size which is determined by number of backlinks
    and number of words available.
*/

function Generate_FontSize( backlinks, wordCount )
{
    const calcFontSize = Math.sqrt( ( backlinks * weightBacklinks ) + ( wordCount * weightWordCount ) ) * 2.5;
    return Math.round( ( calcFontSize / 100 ) * ( maxFontSize - minFontSize ) + minFontSize );
}

/*
    Generate font color
*/

function Generate_Color( tagName, tagInfo )
{
    if ( tagName == null ) { return "#FFFFFF"; }

    let cntColors       = Object.keys( arrColors ).length;
    const tagWords      = tagName.split(/\W+/g);
    const colorIndex    = Math.floor( Math.random( ) * cntColors );
    const colorID       = dv.pages( tagName ).length;

    if ( bRandomColor === true )
        return arrColors[ Object.keys( arrColors )[ colorIndex ] ];

    return arrColors[ Object.keys( arrColors )[ colorID ] ];
}

/*
    Sort > DESC / ASC

    alphabetize array results
*/

function Sort_DESC( arr )
{
    arr.sort( ( a, b ) => a.id.localeCompare( b.id ) )
    return arr;
}

function Sort_ASC( arr )
{
    arr.sort( ( a, b ) => b.id.localeCompare( a.id ) )
    return arr;
}

/*
    Sort > Shuffle

    randomized array results
*/

function Sort_Shuffle( arr )
{
    for ( let i = arr.length - 1; i > 0; i-- )
    {
        const j                 = Math.floor( Math.random( ) * ( i + 1 ) );
        [ arr[ i ], arr[ j ] ]  = [ arr[ j ], arr[ i ] ];
    }

    return arr;
}

/*
    Create Cloud
*/

const CreateTagCloud = async ( ) =>
{
    const tags      = new Map( );
    const files     = new Map( );

    /*
        Add all .md files to the tags map with their backlinks and word count
    */

    Promise.all( QueryFiles.map( async ( f ) =>
    {
        const file  = f.file
        const blq   = QueryBacklinks( file.path )
        const wcq   = QueryWordcount( file.path )

        if ( file.tags )
        {
            await Promise.all( file.tags.map( async ( tag ) =>
            {
                if ( !tags.has( tag ) )
                    tags.set( tag, { backlinks: 0, wordCount: 0 } );

                const tagInfo       = tags.get( tag );
                const res           = await blq;

                tagInfo.backlinks += res.value.values.length;

                const wc            = await wcq;
                tagInfo.wordCount += wc;
            } ) );
        }

        for ( let i = 0; i < tagsFilter.length; i++ )
        {
            if ( tags.has( tagsFilter[ i ] ) )
                tags.delete( tagsFilter[ i ] );
        }

        const fileInfo          = { backlinks: 0, wordCount: 0 };
        const res               = await blq;
        fileInfo.backlinks      = res.value.values.length;
        const wc                = await wcq;
        fileInfo.wordCount      = wc;

        files.set( file, fileInfo );

})).then( ( ) =>
{
    const data = []

    /*
        Calculate font size and font color.
    */

    let count = 0;
    tags.forEach( ( tagInfo, tagName ) =>
    {
        count++;
        const fontSize      = Generate_FontSize( tagInfo.backlinks, tagInfo.wordCount );
        const color         = Generate_Color( tagName, tagInfo );
        const length        = dv.pages( tagName ).length;

        data.push( { name: `\\${tagName}`, id: tagName, length: length, fontSize, color } );
    });

    /*
        No tags found
    */

	if (count === 0)
	{
		const rootNode = dv.el("div", "🔖 No Tags Found", { cls: "atx-tcv2-results_none" });
		rootNode.setAttribute("style", "text-align:center;");
		return ``;
	}

    /*
        Sorting functions
    */

    const sortOptions =
    {
        1: 'Sort_DESC',
        2: 'Sort_ASC',
        3: 'Sort_Shuffle',
    };

    let funcSort = sortOptions[ sortOption ]

    if ( funcSort === undefined )
        funcSort = sortOptions[ 1 ]

    /*
        Return results
    */

    return eval( funcSort )( data ).map( ( tag ) =>
    {
        return `<div class="atx-tcv2-child atx-tcv2-item-tags"><a class="atx-tcv2-link" href="obsidian://search?query=tag:${encodeURIComponent(tag.id)}" style="font-size:${tag.fontSize}px; color: ${tag.color};">${tag.id}</a><div class="atx-tcv2-counter">${tag.length}</div></div>`;
    } ).join( "" );
    } ).then( res => dv.paragraph( res ) )
    .catch( error =>
    {
        console.error( "Error: " + error );
    } );
}

CreateTagCloud( )
````
