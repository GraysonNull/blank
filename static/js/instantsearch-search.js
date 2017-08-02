const otherSearch = instantsearch({
    appId: '5PHVQPX4AR',
    apiKey: '92575152510e5cdaf7a0df17c446d879',
    indexName: 'help_center_other', 
});

const docsSearch = instantsearch({
    appId: '5PHVQPX4AR',
    apiKey: '92575152510e5cdaf7a0df17c446d879',
    indexName: 'help_center_docs',
});

const searchBox = instantsearch.widgets.searchBox({
    container: '#instantsearch-box'
});

docsSearch.addWidget(searchBox);
otherSearch.addWidget(searchBox);

// NOTE: The hitsperPage option is only available in v1 of instantSearch (currently using)
docsSearch.addWidget(
    instantsearch.widgets.hits({
        container: '#docs-hits',
        hitsPerPage: 5,
        templates: {
            item: function(suggestion) {
                const hasDescription = (suggestion._highlightResult).hasOwnProperty("description");

                return '<h3>' +  suggestion._highlightResult.title.value.replace(/<\/?[^>]+(>|$)/g, "") + '</h3>' + 
                '<p>'+ (hasDescription ? suggestion._highlightResult.description.value : "") + '</p>'
            }
        }
    })
);

otherSearch.addWidget(
    instantsearch.widgets.hits({
        container: '#other-hits',
        hitsPerPage: 5,
        templates: {
            item: function(suggestion) {
                const hasDescription = (suggestion._highlightResult).hasOwnProperty("description");

                return '<h3>' +  suggestion._highlightResult.title.value.replace(/<\/?[^>]+(>|$)/g, "") + '</h3>' + 
                '<p>'+ (hasDescription ? suggestion._highlightResult.description.value : "") + '</p>'
            }
        }    
    })
);

const renderHandler = function() {
    const resultCount = document.getElementById("result-count");
    const searchMade = document.getElementById("search-made")

    const searchBoxValue = document.getElementById("instantsearch-box").value;
    const items = document.getElementsByClassName('ais-hits--item');

    resultCount.innerHTML = items.length;
    
    if(searchBoxValue !== "") {
        searchMade.innerHTML = "for " + searchBoxValue;
    } else {
        searchMade.innerHTML = "";
    }
}

// Only need to listen for both once, then items can be
// counted on one index search
docsSearch.on('render', renderHandler);
otherSearch.once('render', renderHandler);

otherSearch.start();
docsSearch.start();