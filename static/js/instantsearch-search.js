const otherSearch = instantsearch({
    appId: '5PHVQPX4AR',
    apiKey: '92575152510e5cdaf7a0df17c446d879',
    indexName: 'help_center_other', 
    urlSync: true
});

const docsSearch = instantsearch({
    appId: '5PHVQPX4AR',
    apiKey: '92575152510e5cdaf7a0df17c446d879',
    indexName: 'help_center_docs',
    urlSync: true
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
                return '<h1>' +  suggestion._highlightResult.title.value.replace(/<\/?[^>]+(>|$)/g, "") + '</h1>' + 
                '<p>'+ suggestion. _highlightResult.description.value + '</p>'
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
                return '<h1>' +  suggestion._highlightResult.title.value.replace(/<\/?[^>]+(>|$)/g, "") + '</h1>' + 
                '<p>'+ suggestion. _highlightResult.description.value + '</p>'
            }
        }    
    })
);

otherSearch.start();
docsSearch.start();